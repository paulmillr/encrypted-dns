#!/usr/bin/env node
// Live check: every ServerAddress of every profile must answer a DNS query for its
// ServerURL (DoH, HTTP/2 POST) or ServerName (DoT), with a certificate valid for that name.
// Usage: node src/scripts/check-endpoints.ts [provider-slug-substring]
import fs from 'node:fs';
import http2 from 'node:http2';
import net from 'node:net';
import path from 'node:path';
import tls from 'node:tls';

const SRC = path.join(import.meta.dirname, '..');
const TIMEOUT = 10_000;
// example.com. IN A, recursion desired
const QUERY = Buffer.concat([
  Buffer.from([0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]),
  Buffer.from('\x07example\x03com\x00', 'latin1'),
  Buffer.from([0, 1, 0, 1]),
]);
const check = (b: Buffer) => {
  if (b.length < 12 || !(b[2] & 0x80)) throw new Error('not a DNS response');
  if (b[3] & 0x0f) throw new Error(`rcode ${b[3] & 0x0f}`);
  if (!b.readUInt16BE(6)) throw new Error('empty answer');
};

const dot = (name: string, ip?: string) =>
  new Promise<void>((resolve, reject) => {
    const s = tls.connect({ host: ip || name, port: 853, servername: name });
    let buf = Buffer.alloc(0);
    s.on('error', reject);
    s.on('close', () => reject(new Error('closed without answer')));
    s.on('secureConnect', () => {
      const len = Buffer.alloc(2);
      len.writeUInt16BE(QUERY.length);
      s.write(Buffer.concat([len, QUERY]));
    });
    s.on('data', (d) => {
      buf = Buffer.concat([buf, d]);
      if (buf.length < 2 || buf.length < 2 + buf.readUInt16BE(0)) return;
      try {
        check(buf.subarray(2));
        resolve();
      } catch (e) {
        reject(e);
      }
      s.destroy();
    });
  });

const doh = (url: string, ip?: string) =>
  new Promise<void>((resolve, reject) => {
    const u = new URL(url);
    const socket = tls.connect({
      host: ip || u.hostname,
      port: 443, // Apple ignores a custom port in ServerURL
      servername: u.hostname,
      ALPNProtocols: ['h2'],
    });
    socket.on('error', reject); // keeps the real cause (cert / route), not a generic stream cancel
    const c = http2.connect(u.origin, { createConnection: () => socket });
    c.on('error', reject);
    const r = c.request({
      ':method': 'POST',
      ':path': u.pathname + u.search,
      'content-type': 'application/dns-message',
      'content-length': QUERY.length,
      accept: 'application/dns-message',
    });
    const chunks: Buffer[] = [];
    let status = 0;
    r.on('error', reject);
    r.on('response', (h) => (status = Number(h[':status'])));
    r.on('data', (d) => chunks.push(d));
    r.on('end', () => {
      c.destroy();
      try {
        if (status !== 200) throw new Error(`HTTP ${status}`);
        check(Buffer.concat(chunks));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
    r.end(QUERY);
  });

const withTimeout = (p: Promise<void>) =>
  Promise.race([
    p,
    new Promise<void>((_, reject) => setTimeout(() => reject(new Error('timeout')), TIMEOUT)),
  ]);

const filter = process.argv[2] || '';
const jobs: Promise<string>[] = [];
for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith('.json') && f.includes(filter))) {
  const provider = JSON.parse(fs.readFileSync(path.join(SRC, file), 'utf8'));
  if (provider.hidden) continue;
  for (const [variantName, variant] of Object.entries<any>(provider.variants)) {
    for (const proto of ['https', 'tls'] as const) {
      const endpoint = variant[proto];
      if (!endpoint) continue;
      const ips: (string | undefined)[] = endpoint.ServerAddresses || variant.ServerAddresses || [];
      // No ServerAddresses: the OS bootstraps the hostname through the network's own DNS.
      for (const ip of ips.length ? ips : [undefined]) {
        const label = `${file} ${variantName} ${proto} ${endpoint.ServerURLOrName} @ ${ip || 'system DNS'}`;
        const run = proto === 'https' ? doh : dot;
        jobs.push(
          withTimeout(run(endpoint.ServerURLOrName, ip)).then(
            () => `ok   ${label}`,
            (e) =>
              // An IPv6 address on a network without IPv6 says nothing about the resolver.
              ip && net.isIPv6(ip) && ['ENETUNREACH', 'EHOSTUNREACH'].includes(e.code)
                ? `skip ${label}: no IPv6 route`
                : `FAIL ${label}: ${e.code || e.message}`
          )
        );
      }
    }
  }
}
const results = (await Promise.all(jobs)).sort();
console.log(results.join('\n'));
const failed = results.filter((r) => r.startsWith('FAIL')).length;
console.log(`\n${results.length} endpoints, ${failed} failed`);
process.exit(failed ? 1 : 0);
