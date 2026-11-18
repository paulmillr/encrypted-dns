#!/usr/bin/env node
import { sha1 } from '@noble/hashes/legacy.js';
import { bytesToHex, concatBytes, utf8ToBytes } from '@noble/hashes/utils.js';
import { X509Certificate } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { keychainIdentity, signInKeychain, verifyProfile } from './keychain-sign.ts';

const FILTER_TAGS = ['malware', 'adult', 'ads', 'tracking', 'phishing', 'mixed content'] as const;
type FilterTag = (typeof FILTER_TAGS)[number];
type FilterLabels = Record<FilterTag | 'unspecified', string>;
type TableText = string | Record<string, string>;

type LangData = {
  code: string;
  name: string;
  table_columns: {
    provider: string;
    unfiltered: string;
    filtered: string;
    notes: string;
  };
  install: string;
  default_profile: string;
  details: string;
  filter_tags: FilterLabels;
  // Who runs a provider, e.g. "by {operator}" or "由 {operator} 运营". Must contain {operator}.
  operated_by: string;
  // Plain words. The table shows `unsigned` in parentheses after a link: "Family (unsigned)".
  signed: string;
  unsigned: string;
  // Joins provider and variant notes, e.g. ". " in English, "，" in Chinese.
  sentence_separator: string;
};
type Lang = { code: string; name: string; mdFile: string; data: LangData };
// Per-protocol endpoint configuration used to generate Apple DNSSettings payload.
type Endpoint = {
  ServerURLOrName: string;
  ServerAddresses?: string[];
  onDemandRules?: Array<Record<string, unknown>>;
};

// Variant extends provider defaults (names/notes/censorship/region/website) for one profile family slice.
type Variant = {
  names?: Record<string, string>;
  // Optional shorter name for the provider table, e.g. "Family" for "Family Protection".
  tableName?: TableText;
  notes?: Record<string, string>;
  consent?: string;
  onDemandRules?: Array<Record<string, unknown>>;
  censorship?: boolean;
  filters?: FilterTag[];
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
  // Who runs the provider: a name, or a map when the name is translated (e.g. "Wikimedia Foundation").
  // The table shows it through each language's `operated_by` template.
  operator?: TableText;
  // Extra information for the table, after the operator: e.g. "Beta service, no availability guarantees".
  tableNote?: TableText;
  consent?: string;
  onDemandRules?: Array<Record<string, unknown>>;
  hidden?: boolean;
  website?: string;
  region?: string | string[];
  censorship?: boolean;
  filters?: FilterTag[];
  variants: Record<string, Variant>;
};

// Flattened generated profile entry (provider + variant + protocol) used for plist/sign output.
type Profile = {
  name: string;
  description: string;
  consent?: string;
  onDemandRules?: Array<Record<string, unknown>>;
  protocol: 'https' | 'tls';
  ServerURLOrName: string;
  ServerAddresses?: string[];
};
type DnsInput = { protocol: string; server: string; addresses: string[] };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'src');
const PROFILES = path.join(ROOT, 'profiles');
const SIGNED = path.join(ROOT, 'signed');
const KEYCHAIN_CERT = path.join(SRC, 'profile-signer.pem');
const LANGUAGES_DIR = path.join(SRC, 'languages');
const DEFAULT_LANG = 'en';
const TRANSLATIONS_DIR = 'translations';
const ALL_PROFILES = 'ALL-PROFILES.md';
const REPO_RAW = 'https://github.com/paulmillr/encrypted-dns/raw/master';
const ROOT_IDENTIFIER = 'com.paulmillr.apple-dns';
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
  UA: '🇺🇦',
  GB: '🇬🇧',
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
const validateServer = (protocolName: string, server: string, where: string) => {
  const protocol = protocolName.toUpperCase();
  if (protocol !== 'HTTPS' && protocol !== 'TLS')
    throw new Error(`${where}: expected protocol HTTPS|TLS, got ${protocolName}`);
  if (!server.trim()) throw new Error(`${where}: server is required`);
  if (protocol === 'HTTPS') {
    let url: URL;
    try {
      url = new URL(server);
    } catch {
      throw new Error(`${where}: https server must be a valid URL, got: ${server}`);
    }
    if (url.protocol !== 'https:')
      throw new Error(`${where}: https server URL must use https://, got: ${server}`);
    // URL.href percent-encodes braces in paths, which changes DNS URI template expressions.
    if (server.includes('{') && /^https:\/\//i.test(server.trim()))
      return server.trim().replace(/^https:/i, 'https:');
    return url.href;
  }
  if (!validHost(server))
    throw new Error(`${where}: tls server must be a hostname, got: ${server}`);
  return server;
};
const validateDnsInput = (x: DnsInput, where: string) => {
  validateServer(x.protocol, x.server, where);
  for (const ip of x.addresses)
    if (!net.isIP(ip)) throw new Error(`${where}: invalid IP address: ${ip}`);
  if (x.protocol.toUpperCase() === 'TLS' && x.addresses.length === 0)
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
      notes: mergeMap(
        provider.notes,
        variant.notes,
        Object.fromEntries(languages.map((l) => [l.code, l.data.sentence_separator]))
      ),
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
      onDemandRules:
        endpoint.onDemandRules !== undefined ? endpoint.onDemandRules : variant.onDemandRules,
      protocol,
      ServerURLOrName: endpoint.ServerURLOrName,
      ServerAddresses: endpoint.ServerAddresses || variant.ServerAddresses,
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
const stringList = (v: unknown) => Array.isArray(v) && v.every((s) => typeof s === 'string');
const ruleDictionary = (v: unknown, keys: string[], where: string): Record<string, unknown> => {
  if (!v || typeof v !== 'object' || Array.isArray(v))
    throw new Error(`${where}: expected dictionary`);
  for (const key of Object.keys(v))
    if (!keys.includes(key)) throw new Error(`${where}: unknown field ${key}`);
  return v as Record<string, unknown>;
};
const validateOnDemandRules = (rules: unknown, profile: string) => {
  if (!Array.isArray(rules)) throw new Error(`${profile}: OnDemandRules must be an array`);
  const matchLists = ['DNSDomainMatch', 'DNSServerAddressMatch', 'SSIDMatch'];
  const keys = [
    'Action',
    'ActionParameters',
    'InterfaceTypeMatch',
    'URLStringProbe',
    ...matchLists,
  ];
  for (const [index, value] of rules.entries()) {
    const where = `${profile}.OnDemandRules[${index}]`;
    const rule = ruleDictionary(value, keys, where);
    if (!['Connect', 'Disconnect', 'EvaluateConnection'].includes(rule.Action as string))
      throw new Error(`${where}: invalid Action`);
    for (const key of matchLists)
      if (key in rule && !stringList(rule[key]))
        throw new Error(`${where}.${key}: expected strings`);
    if (
      'InterfaceTypeMatch' in rule &&
      !['Ethernet', 'WiFi', 'Cellular'].includes(rule.InterfaceTypeMatch as string)
    )
      throw new Error(`${where}: invalid InterfaceTypeMatch`);
    if ('URLStringProbe' in rule && typeof rule.URLStringProbe !== 'string')
      throw new Error(`${where}.URLStringProbe: expected string`);
    if (!('ActionParameters' in rule)) continue;
    if (rule.Action !== 'EvaluateConnection' || !Array.isArray(rule.ActionParameters))
      throw new Error(`${where}: ActionParameters requires EvaluateConnection and an array`);
    for (const [i, item] of rule.ActionParameters.entries()) {
      const location = `${where}.ActionParameters[${i}]`;
      const parameter = ruleDictionary(item, ['DomainAction', 'Domains'], location);
      if (
        !['NeverConnect', 'ConnectIfNeeded'].includes(parameter.DomainAction as string) ||
        !stringList(parameter.Domains)
      )
        throw new Error(`${location}: expected a valid DomainAction and a list of Domains`);
    }
  }
};
const escapeXML = (s: string) => {
  if (/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/u.test(s))
    throw new Error('Invalid XML character in profile');
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
};
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
    out += `${pad}\t<key>${escapeXML(k)}</key>\n`;
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
  // Unique per profile: the OS replaces an installed profile that has the same top-level identifier.
  const topId = `${ROOT_IDENTIFIER}.${key}`;
  const serverKey = proto === 'HTTPS' ? 'ServerURL' : 'ServerName';
  const dns: Record<string, PlistNode> = { DNSProtocol: proto };
  if (p.ServerAddresses && p.ServerAddresses.length) dns.ServerAddresses = p.ServerAddresses;
  dns[serverKey] = validateServer(proto, p.ServerURLOrName, key);
  if (p.onDemandRules !== undefined) validateOnDemandRules(p.onDemandRules, key);
  const payload: Record<string, PlistNode> = {
    DNSSettings: dns,
    ...(p.onDemandRules ? { OnDemandRules: p.onDemandRules as PlistNode } : {}),
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
// [path, value] for every leaf of a language file, e.g. ['filter_tags.ads', 'Werbung'].
const leaves = (value: unknown, prefix = ''): [string, unknown][] =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? Object.entries(value).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k))
    : [[prefix, value]];
// Every language file must have exactly the keys of en.json, each a non-empty string,
// so adding a string to en.json is enough to make the build ask every translation for it.
const validateLanguages = (files: [string, unknown][]) => {
  const english = files.find(([name]) => name === `${DEFAULT_LANG}.json`);
  if (!english) throw new Error(`missing ${DEFAULT_LANG}.json in src/languages`);
  const expected = leaves(english[1]).map(([key]) => key);
  const problems: string[] = [];
  for (const [name, data] of files) {
    const actual = new Map(leaves(data));
    for (const key of expected) {
      const value = actual.get(key);
      if (value === undefined) problems.push(`${name}: missing ${key}`);
      else if (typeof value !== 'string' || !value.trim())
        problems.push(`${name}: ${key} must be non-empty text`);
    }
    for (const key of actual.keys())
      if (!expected.includes(key)) problems.push(`${name}: unknown key ${key}`);
    const operatedBy = actual.get('operated_by');
    if (typeof operatedBy === 'string' && !operatedBy.includes('{operator}'))
      problems.push(`${name}: operated_by must contain {operator}`);
  }
  if (problems.length) throw new Error(`Invalid language files:\n${problems.join('\n')}`);
};
const languageFiles = fs
  .readdirSync(LANGUAGES_DIR)
  .filter((name) => name.endsWith('.json'))
  .map((name): [string, unknown] => [
    name,
    JSON.parse(fs.readFileSync(path.join(LANGUAGES_DIR, name), 'utf8')),
  ]);
validateLanguages(languageFiles);
const languages: Lang[] = languageFiles
  .map(([name, json]) => {
    const data = json as LangData;
    return {
      code: data.code,
      name: data.name,
      mdFile: path.join(LANGUAGES_DIR, name.replace('.json', '.md')),
      data,
    };
  })
  .sort((a, b) => {
    const defaultFirst = Number(b.code === DEFAULT_LANG) - Number(a.code === DEFAULT_LANG);
    return defaultFirst || a.code.localeCompare(b.code, DEFAULT_LANG);
  });

const validateFilters = (filters: FilterTag[] | undefined, where: string) => {
  if (filters === undefined) return;
  if (
    !Array.isArray(filters) ||
    !filters.length ||
    filters.some((tag) => !FILTER_TAGS.includes(tag))
  )
    throw new Error(`${where}: expected one or more of ${FILTER_TAGS.join(', ')}`);
};

const validateTableText = (value: TableText | undefined, where: string, allowEmpty: boolean) => {
  if (value === undefined) return;
  const values =
    typeof value === 'string'
      ? [value]
      : value && typeof value === 'object' && !Array.isArray(value)
        ? Object.values(value)
        : [];
  if (
    !values.length ||
    values.some((text) => typeof text !== 'string' || (!allowEmpty && !text.trim()))
  )
    throw new Error(`${where}: expected text or a map of localized text`);
};

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
      validateTableText(provider.operator, `${file}.operator`, false);
      validateTableText(provider.tableNote, `${file}.tableNote`, false);
      if (provider.consent !== undefined && typeof provider.consent !== 'string')
        throw new Error(`${file}: consent must be string`);
      validateLangMap(provider.names, `${file}.names`, true);
      validateLangMap(provider.notes, `${file}.notes`, false);
      validateFilters(provider.filters, `${file}.filters`);
      if (!provider.variants || typeof provider.variants !== 'object')
        throw new Error(`${file}: missing variants`);
      for (const k in provider.variants) {
        validateIdent(k, `${file}.variants.${k}`);
        const v = provider.variants[k];
        if (!v || typeof v !== 'object') throw new Error(`${file}.variants.${k}: expected object`);
        if (v.consent !== undefined && typeof v.consent !== 'string')
          throw new Error(`${file}.variants.${k}.consent: expected string`);
        validateTableText(v.tableName, `${file}.variants.${k}.tableName`, false);
        validateLangMap(v.names, `${file}.variants.${k}.names`, k !== 'default');
        validateLangMap(v.notes, `${file}.variants.${k}.notes`, false);
        validateFilters(v.filters, `${file}.variants.${k}.filters`);
      }
      return [slug, provider] as const;
    })
);
type TableRow = {
  id: string;
  providerId: string;
  variantId: string;
  profileBase: string;
  hidden: boolean;
  website?: string;
  names: Record<string, string>;
  region: string[];
  censorship: boolean;
  unsigned: { https: boolean; tls: boolean };
  signed: { https: boolean; tls: boolean };
};
let tableRows: TableRow[] = [];
const PROTOCOLS = [
  ['https', 'HTTPS'],
  ['tls', 'TLS'],
] as const;
const installLink = (row: TableRow, label: string, unsigned = '') => {
  const id = `${row.profileBase}-https`;
  if (row.signed.https) return `[${label}][${id}-signed]`;
  return `[${unsigned ? `${label} (${unsigned})` : label}][${id}]`;
};

const filterTags = (provider: Provider, variant: Variant, labels?: FilterLabels) =>
  (variant.filters ?? provider.filters ?? ['unspecified'])
    .map((tag) => `*${labels?.[tag] ?? tag}*`)
    .join(', ');

const tableText = (value: TableText | undefined, code: string) =>
  typeof value === 'string' ? value : (value?.[code] ?? value?.[DEFAULT_LANG]);

// Puts the operator into a language's template. Chinese and Japanese don't put spaces between
// words, so the template's space is dropped next to a CJK name: "由 Google LLC 运营" but
// "由维基媒体基金会运营".
const CJK = /[\u3000-\u9fff\uff00-\uffef]/;
const fillOperator = (template: string, operator: string) =>
  template.replace(
    /( ?)\{operator\}( ?)/,
    (_, before: string, after: string) =>
      `${CJK.test(operator[0]) ? '' : before}${operator}${CJK.test(operator.at(-1)!) ? '' : after}`
  );

const providerTable = ({ code, data }: Lang) => {
  const providers = Map.groupBy(
    tableRows.filter((row) => !row.hidden && row.unsigned.https),
    (row) => row.providerId
  );
  const { provider: providerColumn, unfiltered, filtered, notes: notesColumn } = data.table_columns;
  const table = [[providerColumn, unfiltered, filtered, notesColumn]];
  for (const [id, rows] of providers) {
    const provider = PROVIDERS[id];
    const home = rows.find((row) => row.website === provider.website) || rows[0];
    const grouped = rows.length > 1;
    const names = grouped ? provider.names : home.names;
    const providerName = names[code] ?? names.en;
    const name = home.website ? `[${providerName}][${home.id}]` : providerName;
    const regions = rows.map((row) => formatFlags(row.region));
    const sharedRegion = regions.every((region) => region === regions[0]) ? regions[0] : '';
    const uncensored: string[] = [];
    const other: string[] = [];
    for (const row of rows) {
      const variant = provider.variants[row.variantId];
      const variantName =
        tableText(variant.tableName ?? variant.names, code) ?? data.default_profile;
      const website =
        row.website && row.website !== home.website ? ` ([${data.details}][${row.id}])` : '';
      if (row.censorship) {
        const link = installLink(row, grouped ? variantName : data.install, data.unsigned);
        other.push(`${link} · ${filterTags(provider, variant, data.filter_tags)}${website}`);
      } else {
        uncensored.push(installLink(row, data.install));
      }
    }
    // "by Quad9 Foundation", plus any extra information. Short fragments, no trailing period.
    const operator = tableText(provider.operator, code);
    const note = [
      operator && fillOperator(data.operated_by, operator),
      tableText(provider.tableNote, code),
    ]
      .filter(Boolean)
      .join(data.sentence_separator);
    // Variant names already say where each server is, so flags alone are enough here.
    const flags = sharedRegion || [...new Set(regions.filter(Boolean))].join(' ');
    const notes = [flags, note].filter(Boolean).join(' ');
    table.push([name, uncensored.join('<br>'), other.join('<br>'), notes]);
  }
  return genTable(table).trim();
};

// ALL-PROFILES.md is shared by every language, so it avoids prose: names, flags, profile IDs
// (file names), server addresses, filter tags, and links labelled by domain or signed/unsigned.
//   ## AdGuard DNS 🇷🇺
//   [adguard-dns.io][adguard-default]
//   - `adguard-family` · Family Protection · *malware*, *adult* · [adguard-dns.io][adguard-family]
//     - HTTPS `https://dns-family.adguard.com/dns-query` · [signed][…] · [unsigned][…]
// The only words in ALL-PROFILES.md, translated: English is the header row.
const signedGlossary = () => {
  const row = (lang: Lang) => [lang.name, lang.data.signed, lang.data.unsigned];
  const english = languages.find((lang) => lang.code === DEFAULT_LANG)!;
  return genTable([row(english), ...languages.filter((lang) => lang !== english).map(row)]).trim();
};

const allProfilesDoc = () => {
  const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');
  const providers = Map.groupBy(
    tableRows.filter((row) => !row.hidden),
    (row) => row.providerId
  );
  const out: string[] = [signedGlossary()];
  for (const [id, rows] of providers) {
    const provider = PROVIDERS[id];
    const home = rows.find((row) => row.website === provider.website) || rows[0];
    const grouped = rows.length > 1;
    const providerName = grouped ? provider.names.en : home.names.en;
    const flags = [...new Set(rows.map((row) => formatFlags(row.region)).filter(Boolean))];
    const lines: string[] = [];
    // Unfiltered first, matching the README table.
    const ordered = [...rows.filter((r) => !r.censorship), ...rows.filter((r) => r.censorship)];
    for (const row of ordered) {
      const variant = provider.variants[row.variantId];
      const parts = [`\`${row.profileBase}\``];
      if (variant.names?.en) parts.push(variant.names.en);
      if (row.censorship) parts.push(filterTags(provider, variant));
      if (row.website && row.website !== home.website)
        parts.push(`[${host(row.website)}][${row.id}]`);
      lines.push(`- ${parts.join(' · ')}`);
      for (const [proto, protoLabel] of PROTOCOLS) {
        const server = variant[proto]?.ServerURLOrName;
        const downloads = [
          row.signed[proto] ? `[signed][${row.profileBase}-${proto}-signed]` : '',
          row.unsigned[proto] ? `[unsigned][${row.profileBase}-${proto}]` : '',
        ].filter(Boolean);
        if (server && downloads.length)
          lines.push(`  - ${protoLabel} \`${server}\` · ${downloads.join(' · ')}`);
      }
    }
    out.push(
      `## ${[providerName, ...flags].join(' ')}`,
      home.website ? `[${host(home.website)}][${home.id}]` : '',
      lines.join('\n')
    );
  }
  return out.filter(Boolean).join('\n\n');
};

// Reference-style link definitions for ALL-PROFILES.md: websites plus every profile file.
const allProfilesLinks = () => {
  let out = '';
  for (const r of tableRows.filter((x) => !x.hidden)) {
    if (r.website) out += `[${r.id}]: ${r.website}\n`;
    for (const [proto] of PROTOCOLS) {
      const file = `${r.profileBase}-${proto}.mobileconfig`;
      if (r.signed[proto])
        out += `[${r.profileBase}-${proto}-signed]: ${REPO_RAW}/signed/${file}\n`;
      if (r.unsigned[proto]) out += `[${r.profileBase}-${proto}]: ${REPO_RAW}/profiles/${file}\n`;
    }
  }
  return out;
};

const readmeFile = (code: string) =>
  code === DEFAULT_LANG ? 'README.md' : `${TRANSLATIONS_DIR}/${code}.md`;
const tags: Record<string, (lang: Lang) => string> = {
  LANGUAGES: (lang) =>
    languages
      .map((x) => {
        if (x.code === lang.code) return x.name;
        const link = path.posix.relative(
          path.posix.dirname(readmeFile(lang.code)),
          readmeFile(x.code)
        );
        return `[${x.name}](${link})`;
      })
      .join(' | '),
  PROVIDERS_TABLE: providerTable,
  PROVIDERS_LINKS: () => {
    let out = '';
    // Unsigned links are only referenced from the table when no signed profile exists.
    for (const r of tableRows.filter((x) => !x.hidden)) {
      if (r.website) out += `[${r.id}]: ${r.website}\n`;
      if (r.unsigned.https && !r.signed.https)
        out += `[${r.profileBase}-https]: ${REPO_RAW}/profiles/${r.profileBase}-https.mobileconfig\n`;
    }
    for (const r of tableRows.filter((x) => !x.hidden)) {
      if (r.signed.https)
        out += `[${r.profileBase}-https-signed]: ${REPO_RAW}/signed/${r.profileBase}-https.mobileconfig\n`;
    }
    return out;
  },
};
// Notes without a translation fall back to English in that language's README.
// Names are skipped: most are brand names that stay the same in every language.
// Lists table notes that show in English in another language's README. Notes are prose, so
// a plain string or a map without that language counts. Operators and variant names are
// proper names: maps only override the languages where the name differs, so they're not listed.
const warnUntranslated = () => {
  for (const lang of languages) {
    if (lang.code === DEFAULT_LANG) continue;
    const missing = Object.entries(PROVIDERS)
      .filter(([, p]) => !p.hidden && p.tableNote !== undefined)
      .filter(([, p]) => typeof p.tableNote === 'string' || p.tableNote![lang.code] === undefined)
      .map(([slug]) => `${slug}.tableNote`);
    if (missing.length)
      console.warn(
        `warning: ${lang.code}: ${missing.length} notes fall back to English: ${missing.join(', ')}`
      );
  }
};
const build = (selector: string | undefined, scratch: string) => {
  const outputs = new Map<string, string | Uint8Array>();
  const identity = selector ? keychainIdentity(selector) : undefined;
  const pinned =
    identity?.certificate ??
    (fs.existsSync(KEYCHAIN_CERT)
      ? new X509Certificate(fs.readFileSync(KEYCHAIN_CERT))
      : undefined);
  if (
    pinned &&
    (Date.now() < Date.parse(pinned.validFrom) || Date.now() > Date.parse(pinned.validTo))
  )
    throw new Error('profile signing certificate outside its validity period');
  if (identity) outputs.set(KEYCHAIN_CERT, identity.certificate.toString());
  tableRows = [];
  if (!fs.existsSync(PROFILES)) fs.mkdirSync(PROFILES);
  if (!fs.existsSync(SIGNED)) fs.mkdirSync(SIGNED);
  for (const [providerName, provider] of Object.entries(PROVIDERS)) {
    const variants = getVariants(providerName, provider);
    for (const [variantName, variant] of Object.entries(variants)) {
      const base = `${providerName}-${variantName}`;
      const all = getProfiles(base, variant);
      const row: TableRow = {
        id: base,
        providerId: providerName,
        variantId: variantName,
        profileBase: base,
        hidden: !!provider.hidden,
        website: variant.website,
        names: variant.names || { en: base },
        region: regionList(variant.region),
        censorship: !!variant.censorship,
        unsigned: { https: false, tls: false },
        signed: { https: false, tls: false },
      };
      for (const [profileName, profile] of Object.entries(all)) {
        const xml = genProfile(profileName, profile);
        const profilePath = path.join(PROFILES, `${profileName}.mobileconfig`);
        outputs.set(profilePath, xml);
        const signedPath = path.join(SIGNED, `${profileName}.mobileconfig`);
        if (pinned && (identity || fs.existsSync(signedPath))) {
          const der = identity ? signInKeychain(identity, xml) : fs.readFileSync(signedPath);
          try {
            verifyProfile(der, xml, pinned, path.join(scratch, 'signer.pem'));
          } catch (cause) {
            throw new Error(`Invalid signed/${profileName}.mobileconfig`, { cause });
          }
          outputs.set(signedPath, der);
        }
        row.unsigned[profile.protocol] = true;
        row.signed[profile.protocol] = outputs.has(signedPath);
      }
      tableRows.push(row);
    }
  }
  const byName = new Intl.Collator(DEFAULT_LANG, { sensitivity: 'base', numeric: true });
  tableRows.sort((a, b) => byName.compare(a.names.en, b.names.en) || byName.compare(a.id, b.id));
  for (const lang of languages) {
    const tpl = fs.readFileSync(lang.mdFile, 'utf8');
    let out = tpl;
    for (const [k, fn] of Object.entries(tags))
      out = out.replace(new RegExp(`<%${k}%>`, 'g'), fn(lang));
    const source = path.relative(ROOT, lang.mdFile);
    const header = `<!-- Generated from ${source} by npm --prefix src/scripts run build. Edit that file instead. -->\n`;
    outputs.set(path.join(ROOT, readmeFile(lang.code)), header + out);
  }
  outputs.set(
    path.join(ROOT, ALL_PROFILES),
    [
      `<!-- Generated by npm --prefix src/scripts run build from src/*.json. Do not edit. -->`,
      allProfilesDoc(),
      allProfilesLinks(),
    ].join('\n\n')
  );
  // Finish signing and verification before replacing any release files.
  // Without the pinned certificate, existing signed profiles can't be verified, so don't touch them.
  if (!pinned && fs.readdirSync(SIGNED).some((name) => name.endsWith('.mobileconfig')))
    throw new Error('Cannot verify existing signed profiles without src/profile-signer.pem');
  fs.mkdirSync(path.join(ROOT, TRANSLATIONS_DIR), { recursive: true });
  for (const [file, content] of outputs) fs.writeFileSync(file, content);
  for (const dir of [PROFILES, SIGNED]) {
    for (const file of fs.readdirSync(dir)) {
      const target = path.join(dir, file);
      if (file.endsWith('.mobileconfig') && !outputs.has(target)) fs.unlinkSync(target);
    }
  }
  console.log(`providers: ${Object.keys(PROVIDERS).length}`);
  warnUntranslated();
  console.log(`rows: ${tableRows.length}`);
};

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== '--keychain' || !args[1].trim()))
    throw new Error('usage: build.ts [--keychain "certificate name or .cer path"]');
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-build-'));
  try {
    build(args[1], scratch);
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true });
  }
}

export { fillOperator, genProfile, splitCsv, validateDnsInput, validateServer, validId };
export type { Profile, Provider, Variant };
