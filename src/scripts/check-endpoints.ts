#!/usr/bin/env node
// Live check: every ServerAddress of every profile must answer a DNS query for its
// ServerURL (DoH, HTTP/2 POST) or ServerName (DoT), with a certificate valid for that name.
// Usage: node src/scripts/check-endpoints.ts [provider-slug-substring]
import { once } from 'node:events';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import tls from 'node:tls';

import { checkResponse, MAX_DNS_MESSAGE, QUERY } from './dns-response.ts';
import { dohClient, TIMEOUT } from './dns-transport.ts';

const SRC = path.join(import.meta.dirname, '..');
const dot = async (name: string, ip?: string) => {
  const socket = tls.connect({
    host: ip || name,
    port: 853,
    servername: name,
    signal: AbortSignal.timeout(TIMEOUT),
  });
  try {
    await once(socket, 'secureConnect');
    const length = Buffer.alloc(2);
    length.writeUInt16BE(QUERY.length);
    socket.write(Buffer.concat([length, QUERY]));
    const chunks: Buffer[] = [];
    let received = 0;
    let frameLength: number | undefined;
    for await (const chunk of socket) {
      chunks.push(chunk);
      received += chunk.length;
      if (received < 2) continue;
      if (frameLength === undefined) {
        const prefix = chunks.length === 1 ? chunk : Buffer.concat(chunks, 2);
        frameLength = 2 + prefix.readUInt16BE(0);
      }
      if (received >= frameLength) {
        checkResponse(Buffer.concat(chunks, frameLength).subarray(2));
        return;
      }
    }
    throw new Error('closed without a complete DNS frame');
  } finally {
    socket.destroy();
  }
};

const doh = async (url: string, ip?: string) => {
  const client = dohClient(url, ip);
  try {
    checkResponse(await client.query(QUERY));
  } finally {
    client.close();
  }
};

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
          run(endpoint.ServerURLOrName, ip).then(
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
const skipped = results.filter((r) => r.startsWith('skip')).length;
console.log(
  `\n${results.length} endpoints, ${results.length - failed - skipped} passed, ${failed} failed, ${skipped} skipped`
);
if (!results.length) console.error('No matching endpoints');
process.exitCode = failed || skipped === results.length ? 1 : 0;
