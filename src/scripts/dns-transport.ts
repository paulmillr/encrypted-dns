import { once } from 'node:events';
import http2 from 'node:http2';
import tls from 'node:tls';

import { MAX_DNS_MESSAGE } from './dns-response.ts';

export const TIMEOUT = 10_000;

// DoH (RFC 8484, HTTP/2 POST) client. Queries share one session, reconnecting after GOAWAY or errors.
// `ip` pins the connection to a ServerAddress; the certificate is still verified for the URL host.
export function dohClient(url: string, ip?: string) {
  const u = new URL(url);
  let current:
    | { session: http2.ClientHttp2Session; streams: Set<http2.ClientHttp2Stream> }
    | undefined;
  const connect = () => {
    if (current && !current.session.closed && !current.session.destroyed) return current;
    const streams = new Set<http2.ClientHttp2Stream>();
    const session = http2.connect(u.origin, {
      createConnection: () =>
        tls.connect({
          host: ip || u.hostname,
          port: 443,
          servername: u.hostname,
          ALPNProtocols: ['h2'],
        }),
    });
    session.on('error', (err) => {
      for (const s of streams) s.destroy(err);
    });
    return (current = { session, streams });
  };
  const query = async (message: Buffer) => {
    const signal = AbortSignal.timeout(TIMEOUT);
    const { session, streams } = connect();
    // Awaiting the connection first keeps socket errors (ENETUNREACH, cert mismatch) intact;
    // a request queued on a failing session would only report ERR_HTTP2_STREAM_CANCEL.
    if (session.connecting) await once(session, 'connect', { signal });
    const request = session.request(
      {
        ':method': 'POST',
        ':path': u.pathname + u.search,
        'content-type': 'application/dns-message',
        accept: 'application/dns-message',
        'content-length': message.length,
      },
      { signal }
    );
    // Errors are surfaced through `once` / the body iterator; this only prevents a crash in between.
    request.on('error', () => {});
    streams.add(request);
    try {
      const response = once(request, 'response', { signal });
      request.end(message);
      const [headers] = await response;
      if (headers[':status'] !== 200) throw new Error('HTTP ' + headers[':status']);
      if (headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/dns-message')
        throw new Error('expected application/dns-message');
      const chunks: Buffer[] = [];
      let received = 0;
      for await (const chunk of request) {
        received += chunk.length;
        if (received > MAX_DNS_MESSAGE) throw new Error('oversized DNS response');
        chunks.push(chunk);
      }
      return Buffer.concat(chunks, received);
    } finally {
      streams.delete(request);
      request.destroy();
    }
  };
  const close = () => current?.session.destroy();
  return { query, close };
}
