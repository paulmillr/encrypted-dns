#!/usr/bin/env node
import { sha1 } from '@noble/hashes/legacy.js';
import { bytesToHex, concatBytes, hexToBytes, utf8ToBytes } from '@noble/hashes/utils.js';
import { CMS } from 'micro-key-producer/x509.js';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type LangData = {
  code: string;
  name: string;
  table_columns: {
    name: string;
    region: string;
    censorship: string;
    notes: string;
    install_signed: string;
    install_unsigned: string;
  };
  yes: string;
  no: string;
};
type Lang = { code: string; name: string; mdFile: string; data: LangData };
// Per-protocol endpoint configuration used to generate Apple DNSSettings payload.
type Endpoint = {
  ServerURLOrName: string;
  ServerAddresses?: string[];
  signature?: string;
  onDemandRules?: Array<Record<string, unknown>>;
};

// Variant extends provider defaults (names/notes/censorship/region/website) for one profile family slice.
type Variant = {
  names?: Record<string, string>;
  notes?: Record<string, string>;
  consent?: string;
  onDemandRules?: Array<Record<string, unknown>>;
  censorship?: boolean;
  website?: string;
  region?: string | string[];
  ServerAddresses?: string[];
  https?: Endpoint;
  tls?: Endpoint;
};

// Provider-level metadata and a set of variants used for table rows and profile generation.
type Provider = {
  names: Record<string, string>;
  notes?: Record<string, string>;
  consent?: string;
  onDemandRules?: Array<Record<string, unknown>>;
  hidden?: boolean;
  website?: string;
  region?: string | string[];
  censorship?: boolean;
  variants: Record<string, Variant>;
};

// Flattened generated profile entry (provider + variant + protocol) used for plist/sign output.
type Profile = {
  name: string;
  description: string;
  consent?: string;
  onDemanRules?: Array<Record<string, unknown>>;
  protocol: 'https' | 'tls';
  ServerURLOrName: string;
  ServerAddresses?: string[];
  signature?: string;
};
type DnsInput = { protocol: string; server: string; addresses: string[] };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'src');
const PROFILES = path.join(ROOT, 'profiles');
const SIGNED = path.join(ROOT, 'signed');
const CERT = path.join(SRC, 'certificates', 'cert.pem');
const CHAIN = path.join(SRC, 'certificates', 'chain.pem');
const LANGUAGES_DIR = path.join(SRC, 'languages');
const DEFAULT_LANG = 'en';
const OUTPUT_DIR = ROOT;
const REPO_RAW = 'https://github.com/paulmillr/encrypted-dns/raw/master';
const SIGN_OPTS = { extraEntropy: false } as const;
const ROOT_IDENTIFIER = 'com.paulmillr.apple-dns';
const SENTENCE_SEPARATOR: Record<string, string> = {
  en: '. ',
  'cmn-CN': '，',
  'cmn-TW': '，',
};
const REGIONS: Record<string, string> = {
  US: '🇺🇸',
  CN: '🇨🇳',
  RU: '🇷🇺',
  NL: '🇳🇱',
  DE: '🇩🇪',
  CH: '🇨🇭',
  FR: '🇫🇷',
  CA: '🇨🇦',
  SE: '🇸🇪',
  CZ: '🇨🇿',
  EU: '🇪🇺',
  SG: '🇸🇬',
  TW: '🇹🇼',
};

const validateIdent = (v: string, where = 'ident') => {
  if (!/^[A-Za-z0-9-]+$/.test(v)) throw new Error(`${where}: expected [A-Za-z0-9-], got ${v}`);
  return v;
};
const validId = (s: string) => /^[A-Za-z0-9.-]+$/.test(s);
const validHost = (s: string) =>
  /^(?=.{1,253}$)(?!-)(?:[A-Za-z0-9-]{1,63}\.)*[A-Za-z0-9-]{1,63}$/.test(s) && !s.includes('..');
const splitCsv = (s: string) =>
  s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
const validateDnsInput = (x: DnsInput, where: string) => {
  const protocol = x.protocol.toUpperCase();
  if (protocol !== 'HTTPS' && protocol !== 'TLS')
    throw new Error(`${where}: expected protocol HTTPS|TLS, got ${x.protocol}`);
  if (!x.server.trim()) throw new Error(`${where}: server is required`);
  if (protocol === 'HTTPS') {
    let url: URL;
    try {
      url = new URL(x.server);
    } catch {
      throw new Error(`${where}: https server must be a valid URL, got: ${x.server}`);
    }
    if (url.protocol !== 'https:')
      throw new Error(`${where}: https server URL must use https://, got: ${x.server}`);
  } else if (!validHost(x.server))
    throw new Error(`${where}: tls server must be a hostname, got: ${x.server}`);
  for (const ip of x.addresses)
    if (!net.isIP(ip)) throw new Error(`${where}: invalid IP address: ${ip}`);
  if (protocol === 'TLS' && x.addresses.length === 0)
    throw new Error(`${where}: tls requires at least one IP in addresses`);
};
const validateLangMap = (
  m: Record<string, string> | undefined,
  where: string,
  requireEn: boolean
) => {
  if (!m) {
    if (requireEn) throw new Error(`${where}: missing map`);
    return;
  }
  if (typeof m !== 'object') throw new Error(`${where}: expected object`);
  if (requireEn) {
    if (typeof m.en !== 'string' || !m.en.trim()) throw new Error(`${where}: missing non-empty en`);
  }
  for (const k in m) {
    if (k === 'en') continue;
    if (typeof m[k] !== 'string' || !m[k].trim())
      throw new Error(`${where}.${k}: expected non-empty string`);
  }
};
const mergeText = (base: string | undefined, extra: string | undefined, joiner: string) => {
  const a = base ? base.trim() : '';
  const b = extra ? extra.trim() : '';
  if (a && b) {
    if ((joiner === '. ' || joiner === '。') && /[.!?。！？]$/.test(a)) return `${a} ${b}`;
    if (joiner === '，' && /[，。！？]$/.test(a)) return `${a}${b}`;
    return `${a}${joiner}${b}`;
  }
  return a || b || '';
};
const mergeMap = (
  base: Record<string, string> | undefined,
  extra: Record<string, string> | undefined,
  joiner: string | Record<string, string>
) => {
  const out: Record<string, string> = {};
  const keys = new Set<string>();
  keys.add(DEFAULT_LANG);
  if (base) for (const k in base) keys.add(k);
  if (extra) for (const k in extra) keys.add(k);
  for (const k of keys) {
    const b = base ? base[k] || base[DEFAULT_LANG] : undefined;
    const e = extra ? extra[k] || extra[DEFAULT_LANG] : undefined;
    const j = typeof joiner === 'string' ? joiner : joiner[k] || joiner[DEFAULT_LANG] || '. ';
    const merged = mergeText(b, e, j);
    if (merged) out[k] = merged;
  }
  return Object.keys(out).length ? out : undefined;
};
const regionList = (region: string | string[] | undefined): string[] =>
  Array.isArray(region) ? region : region ? [region] : [];
const formatFlags = (region: string | string[] | undefined): string =>
  regionList(region)
    .map((x) => REGIONS[x] || x)
    .filter(Boolean)
    .join(' ');
const getVariants = (name: string, provider: Provider): Record<string, Variant> => {
  validateIdent(name, `provider (${name})`);
  const out: Record<string, Variant> = {};
  for (const variantName in provider.variants) {
    validateIdent(variantName, `${name}.variants.${variantName}`);
    const variant = provider.variants[variantName];
    out[variantName] = {
      names: mergeMap(provider.names, variant.names, ' '),
      notes: mergeMap(provider.notes, variant.notes, SENTENCE_SEPARATOR),
      consent: variant.consent !== undefined ? variant.consent : provider.consent,
      onDemandRules:
        variant.onDemandRules !== undefined ? variant.onDemandRules : provider.onDemandRules,
      censorship: variant.censorship !== undefined ? variant.censorship : provider.censorship,
      website: variant.website || provider.website,
      region: variant.region !== undefined ? variant.region : provider.region,
      ServerAddresses: variant.ServerAddresses,
      https: variant.https,
      tls: variant.tls,
    };
  }
  return out;
};
const getProfiles = (name: string, variant: Variant): Record<string, Profile> => {
  validateIdent(name, `profile prefix (${name})`);
  const out: Record<string, Profile> = {};
  const add = (protocol: 'https' | 'tls', endpoint: Endpoint | undefined) => {
    if (!endpoint) return;
    const key = `${name}-${protocol}`;
    validateIdent(key, `profiles.${key}`);
    const profileName = (variant.names && variant.names.en) || name;
    const note = (variant.notes && variant.notes.en) || '';
    const noteLine = note ? (/[.!?]$/.test(note.trim()) ? note.trim() : `${note.trim()}.`) : '';
    const flags = formatFlags(variant.region);
    const profileDescription = `Configures device to use ${profileName} over ${protocol.toUpperCase()}
${noteLine}
Server location: ${flags}.
Filtering: ${variant.censorship ? 'yes' : 'no'}`;
    out[key] = {
      name: profileName,
      description: profileDescription,
      consent: variant.consent,
      onDemanRules:
        endpoint.onDemandRules !== undefined ? endpoint.onDemandRules : variant.onDemandRules,
      protocol,
      ServerURLOrName: endpoint.ServerURLOrName,
      ServerAddresses: endpoint.ServerAddresses || variant.ServerAddresses,
      signature: endpoint.signature,
    };
  };
  add('https', variant.https);
  add('tls', variant.tls);
  return out;
};
const uuidV5 = (seed: string) => {
  // UUID v5 is defined as SHA-1(namespace || name) with v5/variant bits set
  // (RFC 4122 / RFC 9562). This is used here for stable deterministic IDs,
  // not as a cryptographic integrity primitive.
  const ns = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x10, 0x9d, 0xad, 0x11, 0xd1, 0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8,
  ]);
  const out = sha1(concatBytes(ns, utf8ToBytes(seed))).subarray(0, 16);
  out[6] = (out[6] & 0x0f) | 0x50; // byte 6 high nibble = 0101 (version 5), low nibble keeps hash entropy
  out[8] = (out[8] & 0x3f) | 0x80; // byte 8 high bits = 10 (RFC 4122/9562 variant), low 6 bits keep hash entropy
  const s = bytesToHex(out);
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20, 32)}`.toUpperCase();
};
const escapeXML = (s: string) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
type PlistNode = string | number | boolean | PlistNode[] | Record<string, PlistNode | undefined>;
const plistNode = (x: PlistNode, level: number): string => {
  const pad = '\t'.repeat(level);
  if (typeof x === 'string') return `${pad}<string>${escapeXML(x)}</string>\n`;
  if (typeof x === 'number') return `${pad}<integer>${x}</integer>\n`;
  if (typeof x === 'boolean') return `${pad}<${x ? 'true' : 'false'}/>\n`;
  if (Array.isArray(x)) {
    let out = `${pad}<array>\n`;
    for (const i of x) out += plistNode(i, level + 1);
    return `${out}${pad}</array>\n`;
  }
  let out = `${pad}<dict>\n`;
  for (const [k, v] of Object.entries(x)) {
    if (v === undefined) continue;
    out += `${pad}\t<key>${k}</key>\n`;
    out += plistNode(v, level + 1);
  }
  return `${out}${pad}</dict>\n`;
};
const genProfile = (name: string, profile: Profile): string => {
  const key = name;
  const p = profile;
  const title = p.name;
  const proto = p.protocol.toUpperCase();
  const display = `${title} Encrypted DNS over ${proto}`;
  const rel = `${key}.mobileconfig`;
  const payloadUUID = uuidV5(`${ROOT_IDENTIFIER}::payload::0::${rel}`);
  const payloadId = `com.apple.dnsSettings.managed.${payloadUUID.toLowerCase()}`;
  const topUUID = uuidV5(`${ROOT_IDENTIFIER}::root::${rel}`);
  const topId = ROOT_IDENTIFIER;
  const serverKey = p.ServerURLOrName.startsWith('https://') ? 'ServerURL' : 'ServerName';
  const dns: Record<string, PlistNode> = { DNSProtocol: proto };
  if (p.ServerAddresses && p.ServerAddresses.length) dns.ServerAddresses = p.ServerAddresses;
  dns[serverKey] = p.ServerURLOrName;
  const payload: Record<string, PlistNode> = {
    DNSSettings: dns,
    ...(p.onDemanRules ? { OnDemandRules: p.onDemanRules as PlistNode } : {}),
    PayloadDescription: `Configures device to use ${display}`,
    PayloadDisplayName: display,
    PayloadIdentifier: payloadId,
    PayloadType: 'com.apple.dnsSettings.managed',
    PayloadUUID: payloadUUID,
    PayloadVersion: 1,
    ProhibitDisablement: false,
  };
  const root: Record<string, PlistNode> = {
    PayloadContent: [payload],
    PayloadDescription: p.description,
    ...(p.consent ? { ConsentText: { default: p.consent } } : {}),
    PayloadDisplayName: display,
    PayloadIdentifier: topId,
    PayloadRemovalDisallowed: false,
    PayloadScope: 'System',
    PayloadType: 'Configuration',
    PayloadUUID: topUUID,
    PayloadVersion: 1,
  };
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
${plistNode(root, 0)}</plist>
`;
};
const fromSig = (s: string) => {
  const txt = s.trim();
  if (!/^[0-9a-f]+$/i.test(txt) || txt.length % 2) throw new Error(`bad signature hex`);
  return hexToBytes(txt);
};
const FULLWIDTH =
  /[\u1100-\u115F\u2329\u232A\u2E80-\u303E\u3040-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE6F\uFF00-\uFF60\uFFE0-\uFFE6]/u;
const chrWidth = (str: string) => {
  let width = 0;
  for (const c of str) width += FULLWIDTH.test(c) || REGIONS[c] ? 2 : 1;
  return width;
};
const padEnd = (s: string, len: number, chr: string) =>
  `${s}${chr.repeat(Math.max(0, len - chrWidth(s)))}`;
const genTable = (rows: string[][]) => {
  const widths = rows[0].map(() => 0);
  for (const r of rows)
    for (let i = 0; i < r.length; i++) widths[i] = Math.max(widths[i], chrWidth(r[i]));
  let table = '';
  rows.forEach((r, i) => {
    const cells = r.map((c, j) => padEnd(c, widths[j], ' ')).join(' | ');
    table += `| ${cells} |\n`;
    if (i === 0) table += `| ${r.map((_, j) => padEnd('', widths[j], '-')).join(' | ')} |\n`;
  });
  return table;
};
const languages: Lang[] = fs
  .readdirSync(LANGUAGES_DIR)
  .filter((name) => name.endsWith('.json'))
  .sort()
  .map((name) => {
    const data = JSON.parse(fs.readFileSync(path.join(LANGUAGES_DIR, name), 'utf8')) as LangData;
    return {
      code: data.code,
      name: data.name,
      mdFile: path.join(LANGUAGES_DIR, name.replace('.json', '.md')),
      data,
    };
  });

const PROVIDERS: Record<string, Provider> = Object.fromEntries(
  fs
    .readdirSync(SRC)
    .filter((f) => f.endsWith('.json'))
    .map((file) => {
      const m = /^(\d+)-(.+)\.json$/.exec(file);
      if (!m) throw new Error(`bad provider file name: ${file} (expected NN-slug.json)`);
      const ord = Number(m[1]);
      if (!Number.isSafeInteger(ord)) throw new Error(`bad numeric prefix in ${file}`);
      const slug = validateIdent(m[2], `file slug (${file})`);
      return { file, ord, slug };
    })
    .sort((a, b) => a.ord - b.ord || a.slug.localeCompare(b.slug))
    .map(({ file, slug }) => {
      const src = path.join(SRC, file);
      const provider = JSON.parse(fs.readFileSync(src, 'utf8')) as Provider;
      if (!provider || typeof provider !== 'object') throw new Error(`${file}: expected object`);
      if (!provider.names || typeof provider.names !== 'object')
        throw new Error(`${file}: missing names`);
      if (provider.notes !== undefined && typeof provider.notes !== 'object')
        throw new Error(`${file}: notes must be object`);
      if (provider.consent !== undefined && typeof provider.consent !== 'string')
        throw new Error(`${file}: consent must be string`);
      validateLangMap(provider.names, `${file}.names`, true);
      validateLangMap(provider.notes, `${file}.notes`, false);
      if (!provider.variants || typeof provider.variants !== 'object')
        throw new Error(`${file}: missing variants`);
      for (const k in provider.variants) {
        validateIdent(k, `${file}.variants.${k}`);
        const v = provider.variants[k];
        if (!v || typeof v !== 'object') throw new Error(`${file}.variants.${k}: expected object`);
        if (v.consent !== undefined && typeof v.consent !== 'string')
          throw new Error(`${file}.variants.${k}.consent: expected string`);
        validateLangMap(v.names, `${file}.variants.${k}.names`, k !== 'default');
        validateLangMap(v.notes, `${file}.variants.${k}.notes`, false);
      }
      return [slug, provider] as const;
    })
);
type TableRow = {
  id: string;
  profileBase: string;
  hidden: boolean;
  website?: string;
  names: Record<string, string>;
  notes: Record<string, string>;
  region: string[];
  censorship: boolean;
  unsigned: { https: boolean; tls: boolean };
  signed: { https: boolean; tls: boolean };
};
let tableRows: TableRow[] = [];
const tags: Record<string, (lang: Lang) => string> = {
  LANGUAGES: (lang) =>
    languages
      .map((x) => {
        if (x.code === lang.code) return x.name;
        return `[${x.name}](https://github.com/paulmillr/encrypted-dns/${x.code === DEFAULT_LANG ? '' : `blob/master/README.${x.code}.md`})`;
      })
      .join(' | '),
  PROVIDERS_TABLE: (lang) => {
    const mat: string[][] = [
      [
        lang.data.table_columns.name,
        lang.data.table_columns.region,
        lang.data.table_columns.censorship,
        lang.data.table_columns.notes,
        lang.data.table_columns.install_signed,
        lang.data.table_columns.install_unsigned,
      ],
    ];
    for (const r of tableRows.filter((x) => !x.hidden)) {
      const name = r.names[lang.code] || r.names[DEFAULT_LANG] || r.id;
      const note = r.notes[lang.code] || r.notes[DEFAULT_LANG] || '';
      const region = r.region
        .map((x) => REGIONS[x] || '')
        .join(' ')
        .trim();
      const c = r.censorship ? lang.data.yes : lang.data.no;
      const s: string[] = [];
      if (r.signed.https) s.push(`[HTTPS][${r.profileBase}-https-signed]`);
      if (r.signed.tls) s.push(`[TLS][${r.profileBase}-tls-signed]`);
      const u: string[] = [];
      if (r.unsigned.https) u.push(`[HTTPS][${r.profileBase}-https]`);
      if (r.unsigned.tls) u.push(`[TLS][${r.profileBase}-tls]`);
      mat.push([`[${name}][${r.id}]`, region, c, note, s.join(', '), u.join(', ')]);
    }
    return genTable(mat).trim();
  },
  PROVIDERS_LINKS: () => {
    let out = '';
    for (const r of tableRows.filter((x) => !x.hidden)) {
      if (r.website) out += `[${r.id}]: ${r.website}\n`;
      if (r.unsigned.https)
        out += `[${r.profileBase}-https]: ${REPO_RAW}/profiles/${r.profileBase}-https.mobileconfig\n`;
      if (r.unsigned.tls)
        out += `[${r.profileBase}-tls]: ${REPO_RAW}/profiles/${r.profileBase}-tls.mobileconfig\n`;
    }
    for (const r of tableRows.filter((x) => !x.hidden)) {
      if (r.signed.https)
        out += `[${r.profileBase}-https-signed]: ${REPO_RAW}/signed/${r.profileBase}-https.mobileconfig\n`;
      if (r.signed.tls)
        out += `[${r.profileBase}-tls-signed]: ${REPO_RAW}/signed/${r.profileBase}-tls.mobileconfig\n`;
    }
    return out;
  },
};
const main = () => {
  tableRows = [];
  const enc = new TextEncoder();
  const signerMaterial =
    fs.existsSync(CERT) && fs.existsSync(CHAIN)
      ? { cert: fs.readFileSync(CERT, 'utf8'), chain: fs.readFileSync(CHAIN, 'utf8') }
      : undefined;
  if (!fs.existsSync(PROFILES)) fs.mkdirSync(PROFILES);
  if (!fs.existsSync(SIGNED)) fs.mkdirSync(SIGNED);
  for (const [providerName, provider] of Object.entries(PROVIDERS)) {
    const variants = getVariants(providerName, provider);
    for (const [variantName, variant] of Object.entries(variants)) {
      const base = `${providerName}-${variantName}`;
      const all = getProfiles(base, variant);
      const row: TableRow = {
        id: base,
        profileBase: base,
        hidden: !!provider.hidden,
        website: variant.website,
        names: variant.names || { en: base },
        notes: variant.notes || { en: '' },
        region: regionList(variant.region),
        censorship: !!variant.censorship,
        unsigned: { https: false, tls: false },
        signed: { https: false, tls: false },
      };
      for (const [profileName, profile] of Object.entries(all)) {
        const xml = genProfile(profileName, profile);
        const profilePath = path.join(PROFILES, `${profileName}.mobileconfig`);
        fs.writeFileSync(profilePath, xml);
        console.log(`Generated profiles/${profileName}.mobileconfig`);
        let hasSigned = false;
        if (profile.signature) {
          const compact = fromSig(profile.signature);
          if (!signerMaterial) {
            console.log(
              `WARN missing cert/chain; skipping signed/${profileName}.mobileconfig (need certificates/cert.pem + certificates/chain.pem)`
            );
            row.unsigned[profile.protocol] = true;
            row.signed[profile.protocol] = false;
            continue;
          }
          const der = CMS.compact.build(
            enc.encode(xml),
            compact,
            signerMaterial.cert,
            signerMaterial.chain,
            SIGN_OPTS
          );
          CMS.verify(der, { allowBER: true, checkSignatures: true, time: Date.now() });
          fs.writeFileSync(path.join(SIGNED, `${profileName}.mobileconfig`), der);
          console.log(`Generated signed/${profileName}.mobileconfig`);
          hasSigned = true;
        }
        row.unsigned[profile.protocol] = true;
        row.signed[profile.protocol] = hasSigned;
      }
      tableRows.push(row);
    }
  }
  for (const lang of languages) {
    const tpl = fs.readFileSync(lang.mdFile, 'utf8');
    let out = tpl;
    for (const [k, fn] of Object.entries(tags))
      out = out.replace(new RegExp(`<%${k}%>`, 'g'), fn(lang));
    const file = lang.code === DEFAULT_LANG ? 'README.md' : `README.${lang.code}.md`;
    fs.writeFileSync(path.join(OUTPUT_DIR, file), out, 'utf8');
    console.log(`Generated ${file}`);
  }
  console.log(`providers: ${Object.keys(PROVIDERS).length}`);
  console.log(`rows: ${tableRows.length}`);
};

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main();
}

export { genProfile, getProfiles, getVariants, SIGN_OPTS, splitCsv, validateDnsInput, validId };
export type { Profile, Provider, Variant };
