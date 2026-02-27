#!/usr/bin/env node
import { CMS } from 'micro-key-producer/x509.js';
import { createHash } from 'node:crypto';
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

type Lang = {
  code: string;
  name: string;
  mdFile: string;
  jsonFile: string;
  data: LangData;
};

type RuleParam = { DomainAction: string; Domains: string[] };
type Rule = {
  Action: string;
  InterfaceTypeMatch?: string;
  SSIDMatch?: string[];
  ActionParameters?: RuleParam[];
};
type DnsCfg = {
  protocol: string;
  server: string;
  addresses: string[];
};
type DnsInput = {
  protocol: string;
  server: string;
  addresses: string[];
};
type DnsValidateOpts = { requireTlsAddresses?: boolean };

type PayloadCfg = {
  description?: string;
  displayName: string;
  identifier: string;
  uuid: string;
  type?: string;
  version?: number;
  organization?: string;
  prohibitDisablement?: boolean;
};

type TopCfg = {
  description: string;
  displayName: string;
  identifier: string;
  removalDisallowed?: boolean;
  scope?: string;
  type?: string;
  uuid: string;
  version?: number;
  organization?: string;
  consentTextDefault?: string;
};

type CertCfg = {
  fileName: string;
  data: string;
  displayName: string;
  identifier: string;
  uuid: string;
  type?: string;
  version?: number;
};

export type ProfileCfg = {
  // Controls plist string escaping; kept for compatibility with old provider entries.
  escapeXML?: boolean;
  // Naming inputs used to derive PayloadDisplayName / top display fields when explicit fields are absent.
  name?: string;
  fullName?: string;
  // Explicit top payload display name fallback when top.displayName is not set.
  topName?: string;
  // DNS endpoint (DoH URL or DoT hostname) and optional resolver IP hints for Apple DNSSettings payload.
  ServerURLOrName?: string;
  ServerAddresses?: string[];
  // Inner payload fields (com.apple.dnsSettings.managed) shown in UI and used for stable ids.
  PayloadDisplayName?: string;
  PayloadDescription?: string;
  PayloadIdentifier?: string;
  PayloadUUID?: string;
  PayloadType?: string;
  PayloadVersion?: number;
  // Apple DNS payload flag: true prevents user from toggling DNS settings off in UI.
  ProhibitDisablement?: boolean;
  // Optional Apple consent text block; used by some providers for privacy-policy notice.
  ConsentTextDefault?: string;
  // Structured variants used by CLI/tests; normalize() supports both structured and flat forms.
  dns?: DnsCfg;
  payload?: PayloadCfg;
  // Structured top-level configuration payload; if absent, built from defaults + topName.
  top?: TopCfg;
  // Optional on-demand match rules (template use-case).
  onDemandRules?: Rule[];
  // Optional additional certificate payloads embedded into profile.
  certificates?: CertCfg[];
  // Compact detached signature (hex). Generator rebuilds attached CMS signed/*.mobileconfig from this.
  signature?: string;
};

type Provider = {
  // Provider metadata for README table + generated links.
  id: string;
  profile: string;
  // Optional naming defaults consumed by providerFile()/normalize().
  name?: string;
  fullName?: string;
  ServerAddresses?: string[];
  // Optional output filename override (template provider).
  file?: string;
  // Hidden providers are excluded from README provider table.
  hidden?: boolean;
  website?: string;
  region?: string | string[];
  censorship?: boolean;
  // Localized labels and notes used in README rendering.
  names: Record<string, string>;
  notes: Record<string, string>;
  // Per-protocol profile definitions.
  https?: ProfileCfg;
  tls?: ProfileCfg;
  formats?: {
    unsigned: { https: boolean; tls: boolean };
    signed: { https: boolean; tls: boolean };
  };
  sourceFile?: string;
};
type ProviderFileInfo = Pick<Provider, 'file' | 'name' | 'id'>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Moved under scripts/: resolve repo-root data paths explicitly.
const ROOT_DIR = path.join(__dirname, '..');
const CERTS_DIR = path.join(ROOT_DIR, 'certs');
const CERT_PEM_FILE = path.join(CERTS_DIR, 'cert.pem');
const CHAIN_PEM_FILE = path.join(CERTS_DIR, 'chain.pem');
// Shared CMS algorithm parameters for repo signing/building.
// We intentionally omit signingTime and S/MIME capabilities for stable, minimal signed attributes.
export const SIGN_OPTS = { extraEntropy: false } as const; // Deterministic signatures
const LANGUAGES_DIR = path.join(ROOT_DIR, 'src-languages');
const PROVIDERS_PATH = path.join(ROOT_DIR, 'src');
const DEFAULT_LANG = 'en';
const OUTPUT_DIR = ROOT_DIR;
const REPO_RAW = 'https://github.com/paulmillr/encrypted-dns/raw/master';
const outPath = (p: string) => path.join(ROOT_DIR, p);

const REGIONS: Record<string, string> = {
  US: '🇺🇸',
  CN: '🇨🇳',
  RU: '🇷🇺',
  NL: '🇳🇱',
  DE: '🇩🇪',
  SG: '🇸🇬',
  CA: '🇨🇦',
  FR: '🇫🇷',
  CH: '🇨🇭',
  SE: '🇸🇪',
  CZ: '🇨🇿',
};

const escapeXMLText = (s: string) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
export const validId = (s: string) => /^[A-Za-z0-9.-]+$/.test(s);
export const validHost = (s: string) =>
  /^(?=.{1,253}$)(?!-)(?:[A-Za-z0-9-]{1,63}\.)*[A-Za-z0-9-]{1,63}$/.test(s) && !s.includes('..');
export const splitCsv = (s: string) =>
  s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
const bad = (where: string, msg: string): never => {
  throw new Error(`${where}: ${msg}`);
};
const validateDnsInputFor = (
  x: DnsInput,
  where: string,
  protocol: 'https' | 'tls',
  opts: DnsValidateOpts = {}
) => {
  const requireTlsAddresses =
    opts.requireTlsAddresses !== undefined ? opts.requireTlsAddresses : true;
  if (!x.server.trim()) bad(where, 'server is required');
  if (protocol === 'https') {
    let url: URL;
    try {
      url = new URL(x.server);
    } catch {
      bad(where, `https server must be a valid URL, got: ${x.server}`);
    }
    if (url.protocol !== 'https:')
      bad(where, `https server URL must use https://, got: ${x.server}`);
  } else if (!validHost(x.server)) bad(where, `tls server must be a hostname, got: ${x.server}`);
  for (const ip of x.addresses) if (!net.isIP(ip)) bad(where, `invalid IP address: ${ip}`);
  if (requireTlsAddresses && protocol === 'tls' && x.addresses.length === 0)
    bad(where, 'tls requires at least one IP in --addresses');
};
export const validateDnsInput = (x: DnsInput, where: string, opts: DnsValidateOpts = {}) => {
  const protocol = x.protocol.toLowerCase();
  if (protocol !== 'https' && protocol !== 'tls')
    bad(where, `protocol: expected https|tls, got ${x.protocol}`);
  validateDnsInputFor(x, where, protocol, opts);
};
export const validateProfileInput = (
  x: ProfileCfg,
  where: string,
  expectedProtocol?: 'https' | 'tls'
) => {
  const dns = x.dns || {
    protocol: expectedProtocol || '',
    server: x.ServerURLOrName || '',
    addresses: x.ServerAddresses || [],
  };
  if (expectedProtocol)
    validateDnsInputFor(dns, where, expectedProtocol, { requireTlsAddresses: false });
  else validateDnsInput(dns, where);
  const payloadId = x.payload?.identifier || x.PayloadIdentifier;
  const topId = x.top?.identifier;
  const scope = x.top?.scope;
  if (payloadId && !validId(payloadId))
    bad(where, `payload identifier must match [A-Za-z0-9.-], got: ${payloadId}`);
  if (topId && !validId(topId))
    bad(where, `top payload identifier must match [A-Za-z0-9.-], got: ${topId}`);
  if (scope && scope !== 'System' && scope !== 'User')
    bad(where, `scope: expected System|User, got ${scope}`);
};

const certData = (src: string) =>
  src
    .replace(/-----BEGIN CERTIFICATE-----/g, '')
    .replace(/-----END CERTIFICATE-----/g, '')
    .replace(/\s/g, '');
const UUID_DNS_NS = new Uint8Array([
  0x6b, 0xa7, 0xb8, 0x10, 0x9d, 0xad, 0x11, 0xd1, 0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8,
]);
const hex = (b: Uint8Array) => Buffer.from(b).toString('hex');
const uuidFormat = (b: Uint8Array, upper: boolean) => {
  const s = hex(b);
  const out = `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20, 32)}`;
  return upper ? out.toUpperCase() : out.toLowerCase();
};
const uuidV5 = (seed: string, upper: boolean) => {
  const msg = Buffer.from(seed, 'utf8');
  const h = createHash('sha1').update(Buffer.from(UUID_DNS_NS)).update(msg).digest();
  const out = new Uint8Array(h.subarray(0, 16));
  out[6] = (out[6] & 0x0f) | 0x50;
  out[8] = (out[8] & 0x3f) | 0x80;
  return uuidFormat(out, upper);
};
export const deterministicUuid = (
  rootIdentifier: string,
  tag: 'root' | 'payload',
  rel: string,
  i?: number
) => {
  if (tag === 'root') return uuidV5(`${rootIdentifier}::root::${rel}`, true);
  return uuidV5(`${rootIdentifier}::payload::${i || 0}::${rel}`, true);
};
const deterministicPayloadIdentifier = (rootIdentifier: string, rel: string, i = 0) =>
  `com.apple.dnsSettings.managed.${uuidV5(`${rootIdentifier}::payload::${i}::${rel}`, false)}`;

export const providerFile = (p: ProviderFileInfo, https: boolean, signed?: boolean) => {
  if (p.file) return `${signed ? 'signed' : 'profiles'}/${p.file}`;
  const postfix = (_pr: ProviderFileInfo, isHttps: boolean) => (isHttps ? 'https' : 'tls');
  const name = p.name || p.id;
  return `${signed ? 'signed' : 'profiles'}/${name}-${postfix(p, https)}.mobileconfig`;
};

const languages: Lang[] = fs
  .readdirSync(LANGUAGES_DIR)
  .filter((f: string) => f.endsWith('.json'))
  .sort()
  .map((f: string) => {
    const p = path.join(LANGUAGES_DIR, f);
    const data = JSON.parse(fs.readFileSync(p, 'utf8')) as LangData;
    return {
      code: data.code,
      name: data.name,
      mdFile: p.replace('.json', '.md'),
      jsonFile: p,
      data,
    };
  });

const providers: Provider[] = fs
  .readdirSync(PROVIDERS_PATH)
  .sort()
  .map((name: string) => {
    const sourceFile = path.join(PROVIDERS_PATH, name);
    const p = JSON.parse(fs.readFileSync(sourceFile, 'utf8')) as Provider;
    const unsigned = { https: !!p.https, tls: !!p.tls };
    const signed = {
      https: !!p.https?.signature || fs.existsSync(outPath(providerFile(p, true, true))),
      tls: !!p.tls?.signature || fs.existsSync(outPath(providerFile(p, false, true))),
    };
    return { ...p, sourceFile, formats: { unsigned, signed } };
  });

const generateSigned = () => {
  for (const p of providers) {
    if (!p.formats) continue;
    p.formats.signed.https = fs.existsSync(outPath(providerFile(p, true, true)));
    p.formats.signed.tls = fs.existsSync(outPath(providerFile(p, false, true)));
  }
};

const FULLWIDTH_PATTERN =
  /[\u1100-\u115F\u2329\u232A\u2E80-\u303E\u3040-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE6F\uFF00-\uFF60\uFFE0-\uFFE6]/u;
const chrWidth = (str: string) => {
  let width = 0;
  for (const c of str) width += FULLWIDTH_PATTERN.test(c) || REGIONS[c] ? 2 : 1;
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

const TAGS: Record<string, (lang: Lang) => string> = {
  LANGUAGES: (currentLang: Lang) =>
    languages
      .map((lang) => {
        if (lang.code === currentLang.code) return lang.name;
        return `[${lang.name}](https://github.com/paulmillr/encrypted-dns/${lang.code === DEFAULT_LANG ? '' : `blob/master/README.${lang.code}.md`})`;
      })
      .join(' | '),
  PROVIDERS_TABLE: (currentLang: Lang) => {
    const rows: string[][] = [
      [
        currentLang.data.table_columns.name,
        currentLang.data.table_columns.region,
        currentLang.data.table_columns.censorship,
        currentLang.data.table_columns.notes,
        currentLang.data.table_columns.install_signed,
        currentLang.data.table_columns.install_unsigned,
      ],
    ];
    const sorted = Array.from(providers)
      .filter((p) => !p.hidden)
      .sort((a, b) => a.id.localeCompare(b.id));
    for (const provider of sorted) {
      const name = provider.names[currentLang.code] || provider.names[DEFAULT_LANG];
      const note = provider.notes[currentLang.code] || provider.notes[DEFAULT_LANG];
      const censorship = provider.censorship ? currentLang.data.yes : currentLang.data.no;
      const regionEmoji = (
        Array.isArray(provider.region) ? provider.region : [provider.region || '']
      )
        .map((r) => REGIONS[r] || '')
        .join(' ')
        .trim();
      const unsignedLinks: string[] = [];
      if (provider.formats?.unsigned?.https)
        unsignedLinks.push(`[HTTPS][${provider.profile}-https]`);
      if (provider.formats?.unsigned?.tls) unsignedLinks.push(`[TLS][${provider.profile}-tls]`);
      const signedLinks: string[] = [];
      if (provider.formats?.signed?.https)
        signedLinks.push(`[HTTPS][${provider.profile}-https-signed]`);
      if (provider.formats?.signed?.tls) signedLinks.push(`[TLS][${provider.profile}-tls-signed]`);
      rows.push([
        `[${name}][${provider.id}]`,
        regionEmoji,
        censorship,
        note,
        signedLinks.join(', '),
        unsignedLinks.join(', '),
      ]);
    }
    return genTable(rows).trim();
  },
  PROVIDERS_LINKS: (_currentLang: Lang) => {
    let res = '';
    const addLink = (p: Provider, https: boolean, signed?: boolean) => {
      const file = providerFile(p, https, signed);
      if (!fs.existsSync(outPath(file))) throw new Error(`missing: ${file}`);
      res += `[${p.profile}-${https ? 'https' : 'tls'}${signed ? '-signed' : ''}]: ${REPO_RAW}/${file}\n`;
    };
    for (const p of providers) {
      if (p.hidden) continue;
      if (p.website) res += `[${p.id}]: ${p.website}\n`;
      if (p.formats?.unsigned?.https) addLink(p, true);
      if (p.formats?.unsigned?.tls) addLink(p, false);
    }
    for (const p of providers) {
      if (p.hidden) continue;
      if (p.formats?.signed?.https) addLink(p, true, true);
      if (p.formats?.signed?.tls) addLink(p, false, true);
    }
    return res;
  },
};

const processTemplate = (templateContent: string, lang: Lang) => {
  let content = templateContent;
  for (const [tag, handler] of Object.entries(TAGS)) {
    const tagPattern = new RegExp(`<%${tag}%>`, 'g');
    if (content.match(tagPattern)) content = content.replace(tagPattern, handler(lang));
  }
  return content;
};

const generateReadmes = () => {
  for (const lang of languages) {
    if (!fs.existsSync(lang.mdFile)) throw new Error(`Template file not found: ${lang.mdFile}`);
    const tpl = fs.readFileSync(lang.mdFile, 'utf8');
    const processed = processTemplate(tpl, lang);
    const out = lang.code === DEFAULT_LANG ? 'README.md' : `README.${lang.code}.md`;
    fs.writeFileSync(path.join(OUTPUT_DIR, out), processed, 'utf8');
    console.log(`Generated ${out}`);
  }
};

type NormalizeOpts = {
  expectedProtocol?: 'https' | 'tls';
  serverAddresses?: string[];
  fullName?: string;
};
const normalize = (
  x: ProfileCfg,
  rel: string,
  opts: NormalizeOpts = {}
): Required<Pick<ProfileCfg, 'dns' | 'payload' | 'top' | 'onDemandRules' | 'certificates'>> & {
  escapeXML: boolean;
  signature?: string;
} => {
  const escapeXML = x.escapeXML !== undefined ? x.escapeXML : true;
  const protocolDefault = opts.expectedProtocol ? opts.expectedProtocol.toUpperCase() : '';
  const rootIdentifier = x.top?.identifier || 'com.paulmillr.apple-dns';
  const defaultPayloadDesc = (name: string) => `Configures device to use ${name}`;
  const defaultTopDesc = (name: string) => `Adds the ${name} to Big Sur and iOS 14 based systems`;
  const proto = (x.dns?.protocol || protocolDefault).toUpperCase();
  const fullNameRaw = x.fullName || opts.fullName || '';
  const fullNameWithProto = (() => {
    if (!fullNameRaw) return '';
    if (/ over (HTTPS|TLS)$/.test(fullNameRaw)) return fullNameRaw;
    if (proto === 'HTTPS' || proto === 'TLS') return `${fullNameRaw} over ${proto}`;
    return fullNameRaw;
  })();
  const baseName = x.PayloadDisplayName || fullNameWithProto || x.name || '';
  const topName = x.top?.displayName || x.topName || baseName;
  const fullName = fullNameRaw || topName || baseName;
  // Mixed-shape input (e.g. CLI `new.ts`) may provide only `dns` and flat payload/top fields.
  // Only treat as fully-structured mode when all three nested blocks are present.
  if (x.payload && x.top && x.dns) {
    const dns = x.dns || {
      protocol: protocolDefault,
      server: x.ServerURLOrName || '',
      addresses: x.ServerAddresses !== undefined ? x.ServerAddresses : opts.serverAddresses || [],
    };
    return {
      dns,
      payload: x.payload!,
      top: x.top!,
      onDemandRules: x.onDemandRules || [],
      certificates: x.certificates || [],
      escapeXML,
      signature: x.signature,
    };
  }
  return {
    dns: x.dns || {
      protocol: protocolDefault,
      server: x.ServerURLOrName || '',
      addresses: x.ServerAddresses !== undefined ? x.ServerAddresses : opts.serverAddresses || [],
    },
    payload: {
      description: x.PayloadDescription || defaultPayloadDesc(x.name || baseName),
      displayName: baseName,
      identifier: x.PayloadIdentifier || deterministicPayloadIdentifier(rootIdentifier, rel, 0),
      uuid: x.PayloadUUID || deterministicUuid(rootIdentifier, 'payload', rel, 0),
      type: x.PayloadType || 'com.apple.dnsSettings.managed',
      version: x.PayloadVersion || 1,
      organization: undefined,
      prohibitDisablement: x.ProhibitDisablement !== undefined ? x.ProhibitDisablement : false,
    },
    top: {
      description: x.top?.description || defaultTopDesc(fullName),
      displayName: x.top?.displayName || topName,
      identifier: rootIdentifier,
      removalDisallowed: x.top?.removalDisallowed !== undefined ? x.top.removalDisallowed : false,
      scope: x.top?.scope || 'System',
      type: x.top?.type || 'Configuration',
      uuid: x.top?.uuid || deterministicUuid(rootIdentifier, 'root', rel),
      version: x.top?.version || 1,
      organization: x.top?.organization,
      consentTextDefault: x.top?.consentTextDefault || x.ConsentTextDefault,
    },
    onDemandRules: x.onDemandRules || [],
    certificates: x.certificates || [],
    escapeXML,
    signature: x.signature,
  };
};

type PlistData = { TAG: 'data'; data: string };
type PlistNode =
  | string
  | number
  | boolean
  | PlistData
  | PlistNode[]
  | Record<string, PlistNode | undefined>;
const plistData = (x: string): PlistData => ({ TAG: 'data', data: x });
const isPlistData = (x: PlistNode): x is PlistData =>
  typeof x === 'object' && !Array.isArray(x) && (x as PlistData).TAG === 'data';
const plistNode = (x: PlistNode, level: number, esc: (s: string) => string): string => {
  const pad = '	'.repeat(level);
  if (typeof x === 'string') return `${pad}<string>${esc(x)}</string>\n`;
  if (typeof x === 'number') return `${pad}<integer>${x}</integer>\n`;
  if (typeof x === 'boolean') return `${pad}<${x ? 'true' : 'false'}/>\n`;
  if (Array.isArray(x)) {
    let out = `${pad}<array>\n`;
    for (const i of x) out += plistNode(i, level + 1, esc);
    return `${out}${pad}</array>\n`;
  }
  if (isPlistData(x)) return `${pad}<data>${x.data}</data>\n`;
  let out = `${pad}<dict>\n`;
  for (const [k, v] of Object.entries(x)) {
    if (v === undefined) continue;
    out += `${pad}	<key>${k}</key>\n`;
    out += plistNode(v, level + 1, esc);
  }
  return `${out}${pad}</dict>\n`;
};
const plistDoc = (root: PlistNode, rootLevel: number, esc: (s: string) => string) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
${plistNode(root, rootLevel, esc)}</plist>
`;
const dnsNode = (d: DnsCfg): Record<string, PlistNode> => ({
  DNSProtocol: d.protocol,
  ...(d.addresses.length ? { ServerAddresses: d.addresses } : {}),
  [d.server.startsWith('https://') ? 'ServerURL' : 'ServerName']: d.server,
});
const rulesNode = (rules: Rule[]): PlistNode[] =>
  rules.map((r) => ({
    Action: r.Action,
    ...(r.InterfaceTypeMatch ? { InterfaceTypeMatch: r.InterfaceTypeMatch } : {}),
    ...(r.SSIDMatch && r.SSIDMatch.length ? { SSIDMatch: r.SSIDMatch } : {}),
    ...(r.ActionParameters && r.ActionParameters.length
      ? {
          ActionParameters: r.ActionParameters.map((p) => ({
            DomainAction: p.DomainAction,
            Domains: p.Domains,
          })),
        }
      : {}),
  }));
const certNodes = (certs: CertCfg[]): PlistNode[] =>
  certs.map((c) => ({
    PayloadCertificateFileName: c.fileName,
    PayloadContent: plistData(certData(c.data)),
    PayloadDisplayName: c.displayName,
    PayloadIdentifier: c.identifier,
    PayloadType: c.type || 'com.apple.security.pem',
    PayloadUUID: c.uuid,
    PayloadVersion: c.version || 1,
  }));
const renderProfile = (cfg: ReturnType<typeof normalize>) => {
  const p = cfg.payload;
  const t = cfg.top;
  const esc = cfg.escapeXML ? escapeXMLText : (s: string) => s;
  const entry = (k: string, v: PlistNode | undefined): [string, PlistNode] | undefined =>
    v === undefined ? undefined : [k, v];
  const obj = (xs: Array<[string, PlistNode] | undefined>): Record<string, PlistNode> =>
    Object.fromEntries(xs.filter(Boolean) as [string, PlistNode][]);
  const payload = obj([
    ['DNSSettings', dnsNode(cfg.dns)],
    entry('OnDemandRules', cfg.onDemandRules.length ? rulesNode(cfg.onDemandRules) : undefined),
    ['PayloadDescription', p.description || ''],
    ['PayloadDisplayName', p.displayName],
    entry('PayloadOrganization', p.organization),
    ['PayloadIdentifier', p.identifier],
    ['PayloadType', p.type || 'com.apple.dnsSettings.managed'],
    ['PayloadUUID', p.uuid],
    ['PayloadVersion', p.version || 1],
    entry('ProhibitDisablement', p.prohibitDisablement),
  ]);
  const payloadContent: PlistNode = [payload, ...certNodes(cfg.certificates)];
  const root = obj([
    ['PayloadContent', payloadContent],
    ['PayloadDescription', t.description],
    entry('ConsentText', t.consentTextDefault ? { default: t.consentTextDefault } : undefined),
    ['PayloadDisplayName', t.displayName],
    entry('PayloadOrganization', t.organization),
    ['PayloadIdentifier', t.identifier],
    entry('PayloadRemovalDisallowed', t.removalDisallowed),
    entry('PayloadScope', t.scope),
    ['PayloadType', t.type || 'Configuration'],
    ['PayloadUUID', t.uuid],
    ['PayloadVersion', t.version || 1],
  ]);
  return plistDoc(root, 0, esc);
};

export const generateSingle = (x: ProfileCfg) => {
  const cfg = normalize(x, '');
  return renderProfile(cfg);
};
export const normalizeProfile = (x: ProfileCfg, rel: string, opts: NormalizeOpts = {}) =>
  normalize(x, rel, opts);
export const generateForRel = (x: ProfileCfg, rel: string, opts: NormalizeOpts = {}) => {
  const cfg = normalize(x, rel, opts);
  return renderProfile(cfg);
};
const generateSingleRel = (x: ProfileCfg, rel: string, opts: NormalizeOpts = {}) => {
  return generateForRel(x, rel, opts);
};
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

const toBytes = (s: string): Uint8Array => new Uint8Array(Buffer.from(s, 'utf8'));
const fromHex = (s: string): Uint8Array => new Uint8Array(Buffer.from(s, 'hex'));
const fromSignature = (s: string): Uint8Array => {
  const txt = s.trim();
  if (/^[0-9a-f]+$/i.test(txt) && txt.length % 2 === 0) return fromHex(txt);
  throw new Error('expected compact signature in lowercase/uppercase hex');
};
let signerMaterialCache: { cert: string; chain: string } | undefined;
const signerMaterial = (): { cert: string; chain: string } => {
  if (signerMaterialCache) return signerMaterialCache;
  if (!fs.existsSync(CERT_PEM_FILE)) throw new Error(`missing signer cert: ${CERT_PEM_FILE}`);
  if (!fs.existsSync(CHAIN_PEM_FILE)) throw new Error(`missing signer chain: ${CHAIN_PEM_FILE}`);
  signerMaterialCache = {
    cert: fs.readFileSync(CERT_PEM_FILE, 'utf8'),
    chain: fs.readFileSync(CHAIN_PEM_FILE, 'utf8'),
  };
  return signerMaterialCache;
};
const verifyDetached = (
  p: Provider,
  protocol: 'https' | 'tls',
  parsed: ProfileCfg,
  content: Uint8Array
) => {
  if (!parsed.signature) return;
  const compactSig = fromSignature(parsed.signature);
  const mat = signerMaterial();
  const signed = CMS.compact.build(content, compactSig, mat.cert, mat.chain, SIGN_OPTS);
  try {
    CMS.verify(signed, { allowBER: true, checkSignatures: true, time: Date.now() });
  } catch (e) {
    throw new Error(`${p.id}/${protocol}: signature verify failed (${(e as Error).message})`);
  }
};
const signedFromDetached = (
  p: Provider,
  protocol: 'https' | 'tls',
  isHttps: boolean,
  parsed: ProfileCfg,
  content: Uint8Array
) => {
  if (!parsed.signature) return;
  const compactSig = fromSignature(parsed.signature);
  const mat = signerMaterial();
  const out = providerFile(p, isHttps, true);
  const full = outPath(out);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  const signed = CMS.compact.build(content, compactSig, mat.cert, mat.chain, SIGN_OPTS);
  fs.writeFileSync(full, signed);
  console.log(`Generated ${out}`);
};

const generateConfigs = () => {
  const generate = (
    file: string,
    parsed?: ProfileCfg,
    where?: string,
    expectedProtocol?: 'https' | 'tls',
    defaults: { serverAddresses?: string[]; fullName?: string } = {}
  ): Uint8Array | undefined => {
    if (!parsed) return;
    const input = withDefaults(parsed, defaults);
    validateProfileInput(input, where || file, expectedProtocol);
    const rel = file.startsWith('profiles/') ? file.slice('profiles/'.length) : file;
    const raw = generateSingleRel(input, rel, {
      expectedProtocol,
      serverAddresses: defaults.serverAddresses,
      fullName: defaults.fullName,
    });
    const out = outPath(file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, raw);
    console.log(`Generated ${file}`);
    return toBytes(raw);
  };
  for (const p of providers) {
    if (p.formats?.unsigned?.https) {
      const content = generate(
        providerFile(p, true),
        p.https,
        `${p.sourceFile || `provider:${p.id}`}:https`,
        'https',
        { serverAddresses: p.ServerAddresses, fullName: p.fullName }
      );
      if (content && p.https) {
        verifyDetached(p, 'https', p.https, content);
        signedFromDetached(p, 'https', true, p.https, content);
      }
    }
    if (p.formats?.unsigned?.tls) {
      const content = generate(
        providerFile(p, false),
        p.tls,
        `${p.sourceFile || `provider:${p.id}`}:tls`,
        'tls',
        { serverAddresses: p.ServerAddresses, fullName: p.fullName }
      );
      if (content && p.tls) {
        verifyDetached(p, 'tls', p.tls, content);
        signedFromDetached(p, 'tls', false, p.tls, content);
      }
    }
  }
};

const main = () => {
  generateConfigs();
  generateSigned();
  generateReadmes();
};
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) main();
