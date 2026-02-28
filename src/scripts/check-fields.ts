#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

type Seen = { count: number; where: string[] };

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const DIR = path.join(ROOT, 'src');
const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith('.json'))
  .sort();
const showWhere = process.argv.includes('--where');

const add = (map: Map<string, Seen>, key: string, where: string) => {
  const cur = map.get(key);
  if (cur) {
    cur.count++;
    cur.where.push(where);
    return;
  }
  map.set(key, { count: 1, where: [where] });
};

const walk = (v: unknown, prefix: string, where: string, map: Map<string, Seen>) => {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return;
  for (const [k, val] of Object.entries(v)) {
    const p = prefix ? `${prefix}.${k}` : k;
    add(map, p, where);
    if (!val || typeof val !== 'object' || Array.isArray(val)) continue;
    walk(val, p, where, map);
  }
};

const providerFields = new Map<string, Seen>();
const variantFields = new Map<string, Seen>();
const endpointFields = new Map<string, Seen>();
let totalVariants = 0;
let totalEndpoints = 0;

for (const f of files) {
  const full = path.join(DIR, f);
  const p = JSON.parse(fs.readFileSync(full, 'utf8')) as Record<string, unknown>;
  for (const [k, val] of Object.entries(p)) {
    if (k === 'variants') continue;
    add(providerFields, k, f);
    if (!val || typeof val !== 'object' || Array.isArray(val)) continue;
    walk(val, k, f, providerFields);
  }
  const variants = p.variants;
  if (!variants || typeof variants !== 'object' || Array.isArray(variants)) continue;
  for (const variant of Object.values(variants as Record<string, unknown>)) {
    if (!variant || typeof variant !== 'object' || Array.isArray(variant)) continue;
    const variantObj = variant as Record<string, unknown>;
    totalVariants++;
    for (const [k, val] of Object.entries(variantObj)) {
      if (k === 'https' || k === 'tls') continue;
      add(variantFields, k, f);
      if (!val || typeof val !== 'object' || Array.isArray(val)) continue;
      walk(val, k, f, variantFields);
    }
    for (const proto of ['https', 'tls'] as const) {
      const cfg = variantObj[proto];
      if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) continue;
      totalEndpoints++;
      // Intentionally ignore variant name in field path: aggregate by endpoint shape only.
      walk(cfg, '', `${f}:${proto}`, endpointFields);
    }
  }
}

const print = (title: string, map: Map<string, Seen>, total: number, showWhereArg: boolean) => {
  console.log(`\n${title}`);
  const rows = Array.from(map.entries());
  const groups = new Map<string, Array<[string, Seen]>>();
  for (const row of rows) {
    const root = row[0].split('.')[0];
    const cur = groups.get(root);
    if (cur) {
      cur.push(row);
      continue;
    }
    groups.set(root, [row]);
  }
  const order = Array.from(groups.keys()).sort((a, b) => {
    const ca = map.get(a)?.count || 0;
    const cb = map.get(b)?.count || 0;
    if (cb !== ca) return cb - ca;
    return a.localeCompare(b);
  });
  for (const root of order) {
    const list = groups.get(root) || [];
    list.sort((a, b) => {
      if (a[0] === root && b[0] !== root) return -1;
      if (b[0] === root && a[0] !== root) return 1;
      if (b[1].count !== a[1].count) return b[1].count - a[1].count;
      return a[0].localeCompare(b[0]);
    });
    for (const [field, info] of list) {
      const indent = field === root ? '' : '  ';
      const label = field === root ? field : field.slice(root.length + 1);
      const pct = total ? Math.round((info.count / total) * 100) : 0;
      console.log(`${indent}${label} -> ${info.count}/${total} (${pct}%)`);
      if (showWhereArg) for (const w of info.where) console.log(`    ${w}`);
    }
  }
};

console.log(`providers: ${files.length}`);
print('provider-fields', providerFields, files.length, showWhere);
print('variant-fields', variantFields, totalVariants, showWhere);
print('endpoint-fields(https/tls)', endpointFields, totalEndpoints, showWhere);
