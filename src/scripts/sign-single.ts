#!/usr/bin/env node
import { CMS } from 'micro-key-producer/x509.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SIGN_OPTS } from './build.ts';

export type SignArgs = { ca: string; priv_key: string; chain?: string; input: string };

const usage = () => {
  console.error(
    'usage: node sign-single.ts --ca <cert.pem> --priv_key <key.pem> [--chain <chain.pem>] <path.mobileconfig>'
  );
  process.exit(1);
};

const parse = (argv: string[]): SignArgs => {
  const args: Record<string, string> = {};
  const rest: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) {
      rest.push(a);
      continue;
    }
    const k = a.slice(2);
    const v = argv[++i];
    if (!v || v.startsWith('--')) usage();
    args[k] = v;
  }
  if (!args.ca || !args.priv_key || rest.length !== 1) usage();
  return { ca: args.ca, priv_key: args.priv_key, chain: args.chain, input: rest[0] };
};

export const outPath = (file: string) =>
  file.endsWith('.mobileconfig')
    ? file.slice(0, -'.mobileconfig'.length) + '.signed.mobileconfig'
    : `${file}.signed.mobileconfig`;

export const signFile = (a: SignArgs): string => {
  for (const f of [a.ca, a.priv_key, a.input])
    if (!fs.existsSync(f)) throw new Error(`missing file: ${f}`);
  if (a.chain && !fs.existsSync(a.chain)) throw new Error(`missing file: ${a.chain}`);
  const content = new Uint8Array(fs.readFileSync(a.input));
  const cert = fs.readFileSync(a.ca, 'utf8');
  const key = fs.readFileSync(a.priv_key, 'utf8');
  const chain = a.chain ? fs.readFileSync(a.chain, 'utf8') : '';
  const compact = CMS.compact.sign(content, cert, key, SIGN_OPTS);
  const signed = CMS.compact.build(content, compact, cert, chain, SIGN_OPTS);
  const out = outPath(a.input);
  fs.writeFileSync(out, signed);
  return out;
};

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const out = signFile(parse(process.argv.slice(2)));
  console.log(out);
}
