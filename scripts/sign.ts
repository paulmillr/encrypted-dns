#!/usr/bin/env node
import { CMS } from 'micro-key-producer/x509.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  generateForRel,
  providerFile,
  SIGN_OPTS,
  validateProfileInput,
  type ProfileCfg,
} from './build.ts';

type Provider = {
  id: string;
  name?: string;
  file?: string;
  fullName?: string;
  ServerAddresses?: string[];
  https?: ProfileCfg;
  tls?: ProfileCfg;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const PROVIDERS = path.join(ROOT, 'src');
const CERT_PEM = path.join(ROOT, 'certs', 'cert.pem');
const CHAIN_PEM = path.join(ROOT, 'certs', 'chain.pem');
const PRIVKEY_PEM = path.join(ROOT, 'certs', 'privkey.pem');
const USAGE = `node sign.ts expects following files to exist:

* ${path.relative(ROOT, CERT_PEM)}: pubkey certificate
* ${path.relative(ROOT, CHAIN_PEM)}: pubkey certificate chain
* ${path.relative(ROOT, PRIVKEY_PEM)}: PRIVATE key used to sign requests (never share this)
`;

const withDefaults = (
  cfg: ProfileCfg,
  defaults: { serverAddresses?: string[]; fullName?: string } = {}
): ProfileCfg => {
  const needAddrs = !!defaults.serverAddresses;
  const needFullName = !!defaults.fullName;
  if (!needAddrs && !needFullName) return cfg;
  let out = cfg;
  if (needFullName && out.fullName === undefined) out = { ...out, fullName: defaults.fullName };
  if (!needAddrs) return out;
  if (out.dns) {
    if (out.dns.addresses !== undefined) return out;
    return { ...out, dns: { ...out.dns, addresses: defaults.serverAddresses } };
  }
  if (out.ServerAddresses !== undefined) return out;
  return { ...out, ServerAddresses: defaults.serverAddresses };
};

const main = () => {
  [PRIVKEY_PEM, CERT_PEM, CHAIN_PEM].forEach(filepath => {
    if (!fs.existsSync(filepath)) throw new Error(USAGE);
  });

  const key = fs.readFileSync(PRIVKEY_PEM, 'utf8');
  const cert = fs.readFileSync(CERT_PEM, 'utf8');
  const chain = fs.readFileSync(CHAIN_PEM, 'utf8');
  const files = fs
    .readdirSync(PROVIDERS)
    .filter((f) => f.endsWith('.json'))
    .sort();
  const enc = new TextEncoder();
  let updated = 0;

  for (const fileName of files) {
    const full = path.join(PROVIDERS, fileName);
    const provider = JSON.parse(fs.readFileSync(full, 'utf8')) as Provider;
    let changed = false;
    for (const protocol of ['https', 'tls'] as const) {
      const src = provider[protocol];
      if (!src) continue;
      const input = withDefaults(src, {
        serverAddresses: provider.ServerAddresses,
        fullName: provider.fullName,
      });
      validateProfileInput(input, `${fileName}:${protocol}`, protocol);
      const relPath = providerFile(provider, protocol === 'https').replace(/^profiles\//, '');
      const raw = generateForRel(input, relPath, {
        expectedProtocol: protocol,
        serverAddresses: provider.ServerAddresses,
        fullName: provider.fullName,
      });
      const content = enc.encode(raw);
      const compact = CMS.compact.sign(content, cert, key, SIGN_OPTS);
      const signed = CMS.compact.build(content, compact, cert, chain, SIGN_OPTS);
      CMS.verify(signed, { allowBER: true, checkSignatures: true, time: Date.now() });
      const sigHex = Buffer.from(compact).toString('hex');
      if (src.signature !== sigHex) {
        src.signature = sigHex;
        changed = true;
      }
    }
    if (!changed) continue;
    fs.writeFileSync(full, `${JSON.stringify(provider, undefined, 4)}\n`);
    updated++;
    console.log(`Updated ${fileName}`);
  }
  console.log(`${updated} mobileconfig files updated`);
  console.log(`signing done`);
};

main();
