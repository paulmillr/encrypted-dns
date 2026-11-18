#!/usr/bin/env node
// Differential censorship check: resolve commonly censored domains through every profile's DoH
// endpoint and compare with unfiltered baseline resolvers. A difference only counts as blocking
// when the baselines agree and the answer is NXDOMAIN / REFUSED / empty, a sinkhole address,
// tagged with a blocking Extended DNS Error, or an address whose TLS certificate is not valid for
// the domain while a baseline address's is (so CDN geo-routing is not mistaken for tampering).
// Results depend on where this runs: some blocks apply only to clients in certain countries.
//
// Usage: node src/scripts/check-censorship.ts [provider-substring]
//   --list global,cn,ru  Citizen Lab test-lists (names, or local CSV / one-host-per-line files)
//   --limit 100          domains per run, spread evenly across categories
//   --all-categories     also test categories that filtering profiles block by design
//   --json out.json      write raw results
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import tls from 'node:tls';
import { parseArgs } from 'node:util';

import { buildQuery, parseResponse, type DnsAnswer } from './dns-response.ts';
import { dohClient, TIMEOUT } from './dns-transport.ts';

const SRC = path.join(import.meta.dirname, '..');
const LISTS = 'https://raw.githubusercontent.com/citizenlab/test-lists/master/lists/';
// Unfiltered resolvers whose consensus is the reference answer.
const BASELINES = ['07-cloudflare default', '12-google default', '16-quad9 nofilter'];
// Adult, dating, drugs, hacking, extremism: family and security profiles block these on purpose.
const FILTERED_BY_DESIGN = ['PORN', 'PROV', 'DATE', 'XED', 'ALDR', 'HACK', 'MILX', 'HATE'];
// RFC 8914: Blocked, Censored, Filtered, Prohibited.
const BLOCKING_EDE: Record<number, string> = {
  15: 'Blocked',
  16: 'Censored',
  17: 'Filtered',
  18: 'Prohibited',
};
const RCODES: Record<number, string> = { 2: 'SERVFAIL', 3: 'NXDOMAIN', 5: 'REFUSED' };
const PER_RESOLVER = 8;

const { values: opts, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    list: { type: 'string', default: 'global' },
    limit: { type: 'string', default: '100' },
    'all-categories': { type: 'boolean', default: false },
    json: { type: 'string' },
  },
});
const limit = Number(opts.limit);
if (!Number.isInteger(limit) || limit < 1) throw new Error('--limit must be a positive integer');

// Rows are `url,category_code,...` (Citizen Lab CSV) or a bare host per line.
const loadList = async (name: string) => {
  const text = fs.existsSync(name)
    ? fs.readFileSync(name, 'utf8')
    : await fetch(`${LISTS}${encodeURIComponent(name)}.csv`).then((r) => {
        if (!r.ok) throw new Error(`list ${name}: HTTP ${r.status}`);
        return r.text();
      });
  const rows: { host: string; category: string }[] = [];
  for (const line of text.split(/\r?\n/).slice(text.startsWith('url,') ? 1 : 0)) {
    const [raw, category = '-'] = line.split(',').map((x) => x.trim().replace(/^"|"$/g, ''));
    if (!raw) continue;
    try {
      // URL parsing lowercases and punycode-encodes the host.
      const host = new URL(raw.includes('://') ? raw : `http://${raw}`).hostname.replace(/\.$/, '');
      if (!net.isIP(host.replace(/^\[|\]$/g, '')) && host.includes('.'))
        rows.push({ host, category });
    } catch {}
  }
  return rows;
};

// Round-robin across categories, so a small limit still covers news, VPNs, social media, etc.
const pickDomains = (rows: { host: string; category: string }[]) => {
  const byCategory = new Map<string, { host: string; category: string }[]>();
  const seen = new Set<string>();
  for (const row of rows) {
    if (seen.has(row.host)) continue;
    if (!opts['all-categories'] && FILTERED_BY_DESIGN.includes(row.category)) continue;
    seen.add(row.host);
    byCategory.set(row.category, [...(byCategory.get(row.category) || []), row]);
  }
  const out: { host: string; category: string }[] = [];
  for (let i = 0; out.length < limit; i++) {
    const before = out.length;
    for (const list of byCategory.values())
      if (i < list.length && out.length < limit) out.push(list[i]);
    if (out.length === before) break;
  }
  return out;
};

const resolvers: { label: string; url: string; ip?: string }[] = [];
for (const file of fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith('.json'))
  .sort()) {
  const provider = JSON.parse(fs.readFileSync(path.join(SRC, file), 'utf8'));
  if (provider.hidden) continue;
  for (const [variantName, variant] of Object.entries<any>(provider.variants)) {
    if (!variant.https) continue;
    const ips: string[] = variant.https.ServerAddresses || variant.ServerAddresses || [];
    // IPv4 so a host without an IPv6 route can still run the check.
    resolvers.push({
      label: `${file.replace(/\.json$/, '')} ${variantName}`,
      url: variant.https.ServerURLOrName,
      ip: ips.find((ip) => net.isIPv4(ip)),
    });
  }
}
const filter = positionals[0] || '';
const baselines = BASELINES.map((label) => {
  const r = resolvers.find((r) => r.label === label);
  if (!r) throw new Error(`baseline ${label} not found in src/*.json`);
  return r;
});
const targets = resolvers.filter((r) => r.label.includes(filter));
if (!targets.length) throw new Error(`No resolvers match "${filter}"`);

const rows = (await Promise.all(opts.list.split(',').map(loadList))).flat();
const domains = pickDomains(rows);

// Runs fn over items with at most `n` in flight.
const pool = async <T, R>(items: T[], n: number, fn: (item: T) => Promise<R>) => {
  const out: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker));
  return out;
};

type Result = DnsAnswer | { error: string };
const resolveAll = async (resolver: { url: string; ip?: string }) => {
  const client = dohClient(resolver.url, resolver.ip);
  const ask = (host: string): Promise<Result> =>
    client.query(buildQuery(host)).then(
      (packet) => parseResponse(packet, host),
      (e) => ({ error: e.code || e.message })
    );
  try {
    const results = await pool(domains, PER_RESOLVER, (d) => ask(d.host));
    // One retry for transient failures (timeouts, GOAWAY races, rate limits).
    for (const [i, r] of results.entries())
      if ('error' in r) results[i] = await ask(domains[i].host);
    return results;
  } finally {
    client.close();
  }
};

// Whether `ip` presents a certificate valid for `host`; cached since baselines share answers.
const tlsCache = new Map<string, Promise<'valid' | 'invalid' | 'unreachable'>>();
let tlsActive = 0;
const tlsQueue: (() => void)[] = [];
const tlsCheck = (ip: string, host: string) => {
  const key = `${ip} ${host}`;
  let p = tlsCache.get(key);
  if (!p) {
    p = (async () => {
      if (tlsActive >= 32) await new Promise<void>((r) => tlsQueue.push(r));
      tlsActive++;
      try {
        return await new Promise<'valid' | 'invalid' | 'unreachable'>((resolve) => {
          const socket = tls.connect({
            host: ip,
            port: 443,
            servername: host,
            rejectUnauthorized: false,
            signal: AbortSignal.timeout(TIMEOUT),
          });
          // With rejectUnauthorized off, `authorized` still covers both chain and hostname.
          socket.once('secureConnect', () => {
            resolve(socket.authorized ? 'valid' : 'invalid');
            socket.destroy();
          });
          socket.once('error', () => {
            resolve('unreachable');
            socket.destroy();
          });
        });
      } finally {
        tlsActive--;
        tlsQueue.shift()?.();
      }
    })();
    tlsCache.set(key, p);
  }
  return p;
};

const SINKHOLES = new net.BlockList();
for (const [net_, prefix] of [
  ['0.0.0.0', 8],
  ['10.0.0.0', 8],
  ['100.64.0.0', 10],
  ['127.0.0.0', 8],
  ['169.254.0.0', 16],
  ['172.16.0.0', 12],
  ['192.168.0.0', 16],
  ['198.18.0.0', 15],
] as const)
  SINKHOLES.addSubnet(net_, prefix, 'ipv4');

type Verdict = { kind: 'ok' | 'blocked' | 'inconclusive' | 'error'; reason: string };
const classifyAnswer = async (
  host: string,
  r: DnsAnswer,
  reference: string[],
  blockPages: Map<string, number>
): Promise<Verdict> => {
  if (r.rcode === 2) return { kind: 'inconclusive', reason: 'SERVFAIL' };
  if (r.rcode !== 0) return { kind: 'blocked', reason: RCODES[r.rcode] || `RCODE ${r.rcode}` };
  if (!r.addresses.length) return { kind: 'blocked', reason: 'no A records' };
  const sinkhole = r.addresses.find((ip) => SINKHOLES.check(ip, 'ipv4'));
  if (sinkhole) return { kind: 'blocked', reason: `sinkhole ${sinkhole}` };
  const other = r.addresses.find((ip) => !reference.includes(ip));
  if (!other) return { kind: 'ok', reason: '' };
  // A different address is normal for CDNs; it is genuine if it holds a valid certificate.
  const mine = await tlsCheck(other, host);
  if (mine === 'valid') return { kind: 'ok', reason: '' };
  const shared = blockPages.get(other);
  if (shared)
    return { kind: 'blocked', reason: `block page ${other} (used for ${shared} domains)` };
  // A wrong certificate is evidence; a timeout alone is not (CDN edges can be flaky).
  const theirs = await Promise.all(reference.slice(0, 2).map((ip) => tlsCheck(ip, host)));
  if (mine === 'invalid' && theirs.includes('valid'))
    return { kind: 'blocked', reason: `forged ${other} (TLS invalid, baseline valid)` };
  return { kind: 'inconclusive', reason: `differs ${other} (TLS ${mine})` };
};
const classify = async (
  host: string,
  r: Result,
  reference: string[],
  blockPages: Map<string, number>
): Promise<Verdict> => {
  if ('error' in r) return { kind: 'error', reason: r.error };
  const verdict = await classifyAnswer(host, r, reference, blockPages);
  const ede = r.ede.find((e) => BLOCKING_EDE[e.code]);
  if (!ede) return verdict;
  const tag = `EDE ${ede.code} ${BLOCKING_EDE[ede.code]}${ede.text ? `: ${ede.text}` : ''}`;
  // A blocking EDE next to a genuine answer is odd but is not a block.
  if (verdict.kind === 'ok') return { kind: 'inconclusive', reason: `real answer, but ${tag}` };
  return { kind: 'blocked', reason: `${tag}; ${verdict.reason}` };
};

console.log(
  `Censorship check ${new Date().toISOString().slice(0, 10)}: ${domains.length} domains from ` +
    `${opts.list}, ${targets.length} resolvers, baselines: ${BASELINES.join(', ')}`
);
const baseResults = await Promise.all(baselines.map(resolveAll));
// A domain is a reference only if every baseline that answered resolved it.
const reference = domains.map((_, i) => {
  const answered = baseResults.map((b) => b[i]).filter((r): r is DnsAnswer => !('error' in r));
  if (!answered.length || answered.some((r) => r.rcode !== 0 || !r.addresses.length))
    return undefined;
  return [...new Set(answered.flatMap((r) => r.addresses))];
});
const live = domains.flatMap((d, i) => (reference[i] ? [{ ...d, reference: reference[i] }] : []));
console.log(
  `${live.length} domains resolve consistently on all baselines; the rest are skipped.\n`
);

// Block pages: one address that a resolver returns for several domains and baselines never do.
const findBlockPages = (results: Result[]) => {
  const uses = new Map<string, number>();
  results.forEach((r, i) => {
    if ('error' in r || !reference[i]) return;
    for (const ip of new Set(r.addresses))
      if (!reference[i].includes(ip)) uses.set(ip, (uses.get(ip) || 0) + 1);
  });
  return new Map([...uses].filter(([, n]) => n >= 3));
};

const report = await Promise.all(
  targets.map(async (resolver) => {
    const results = await resolveAll(resolver);
    const blockPages = findBlockPages(results);
    const verdicts = await Promise.all(
      domains.map(async (d, i) =>
        reference[i]
          ? { ...d, ...(await classify(d.host, results[i], reference[i], blockPages)) }
          : undefined
      )
    );
    return { ...resolver, verdicts: verdicts.filter((v) => v !== undefined) };
  })
);

const count = (r: (typeof report)[number], kind: Verdict['kind']) =>
  r.verdicts.filter((v) => v.kind === kind).length;
report.sort((a, b) => count(b, 'blocked') - count(a, 'blocked') || a.label.localeCompare(b.label));
const width = Math.max(...report.map((r) => r.label.length));
for (const r of report) {
  const counts = (['ok', 'blocked', 'inconclusive', 'error'] as const)
    .map((k) => [k, count(r, k)] as const)
    .filter(([k, n]) => n || k === 'ok')
    .map(([k, n]) => `${n} ${k}`)
    .join(', ');
  console.log(`${r.label.padEnd(width)}  ${counts}`);
  for (const v of r.verdicts.filter((v) => v.kind === 'blocked' || v.kind === 'inconclusive'))
    console.log(
      `    ${v.kind === 'blocked' ? 'BLOCK' : '?    '} ${v.category.padEnd(5)} ${v.host}  ${v.reason}`
    );
}
const errors = report.reduce((n, r) => n + count(r, 'error'), 0);
if (errors) console.log(`\n${errors} queries failed twice; see --json for details.`);
if (opts.json) {
  const data = {
    date: new Date().toISOString(),
    lists: opts.list,
    baselines: BASELINES,
    live,
    report,
  };
  fs.writeFileSync(opts.json, JSON.stringify(data, null, 2) + '\n');
  console.log(`Raw results written to ${opts.json}`);
}
