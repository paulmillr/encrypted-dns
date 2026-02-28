#!/usr/bin/env node
import { bytesToHex } from '@noble/hashes/utils.js';
import { CMS } from 'micro-key-producer/x509.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SIGN_OPTS, genProfile, getProfiles, getVariants, type Provider } from './build.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'src');
const CERT_PEM = path.join(SRC, 'certificates', 'cert.pem');
const CHAIN_PEM = path.join(SRC, 'certificates', 'chain.pem');
const DEFAULT_PRIVKEY_PEM = path.join(SRC, 'certificates', 'privkey.pem');
const USAGE = `sign.ts [path/to/privkey.pem]
expects:
- certificates/cert.pem
- certificates/chain.pem
- certificates/privkey.pem (default; OR specify path in first arg)`;

const loadFiles = () =>
  fs
    .readdirSync(SRC)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((file) => {
      const m = /^(\d+)-(.+)\.json$/.exec(file);
      if (!m) throw new Error(`bad provider file name: ${file} (expected NN-slug.json)`);
      const ord = Number(m[1]);
      if (!Number.isSafeInteger(ord)) throw new Error(`bad numeric prefix in ${file}`);
      return { file, ord, slug: m[2] };
    })
    .sort((a, b) => a.ord - b.ord || a.slug.localeCompare(b.slug));

const main = () => {
  const privkeyPem = process.argv[2] || DEFAULT_PRIVKEY_PEM;
  for (const fp of [privkeyPem, CERT_PEM, CHAIN_PEM])
    if (!fs.existsSync(fp)) throw new Error(USAGE);
  const key = fs.readFileSync(privkeyPem, 'utf8');
  const cert = fs.readFileSync(CERT_PEM, 'utf8');
  const chain = fs.readFileSync(CHAIN_PEM, 'utf8');
  const enc = new TextEncoder();
  let updated = 0;
  for (const { file, slug } of loadFiles()) {
    const full = path.join(SRC, file);
    const provider = JSON.parse(fs.readFileSync(full, 'utf8')) as Provider;
    const variants = getVariants(slug, provider);
    let changed = false;
    for (const [variantName, variant] of Object.entries(variants)) {
      const base = `${slug}-${variantName}`;
      const profiles = getProfiles(base, variant);
      for (const [profileName, profile] of Object.entries(profiles)) {
        const xml = genProfile(profileName, profile);
        const compact = CMS.compact.sign(enc.encode(xml), cert, key, SIGN_OPTS);
        const signed = CMS.compact.build(enc.encode(xml), compact, cert, chain, SIGN_OPTS);
        CMS.verify(signed, { allowBER: true, checkSignatures: true, time: Date.now() });
        const sigHex = bytesToHex(compact);
        const protocol = profile.protocol;
        if (!provider.variants[variantName][protocol]) continue;
        if (provider.variants[variantName][protocol]!.signature !== sigHex) {
          provider.variants[variantName][protocol]!.signature = sigHex;
          changed = true;
        }
      }
    }
    if (!changed) continue;
    fs.writeFileSync(full, `${JSON.stringify(provider, undefined, 4)}\n`);
    updated++;
    console.log(`Updated ${file}`);
  }
  console.log(`Updated providers: ${updated}`);
};

main();
