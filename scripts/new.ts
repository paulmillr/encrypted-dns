#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';
import {
  deterministicUuid,
  generateSingle,
  splitCsv,
  validId,
  validateDnsInput,
  type ProfileCfg,
} from './build.ts';
import { signFile } from './sign-single.ts';

type Proto = 'https' | 'tls';

type Input = {
  name: string;
  organizationName: string;
  profileIdentifier: string;
  protocol: Proto;
  server: string;
  addresses: string[];
  certs: string[];
  out: string;
  description: string;
  topDescription: string;
  prohibitDisablement: boolean;
  scope: string;
  ca?: string;
  priv_key?: string;
  chain?: string;
};
type PartialInput = Partial<Input>;

const usage = () => {
  console.error(`usage:
  node scripts/new.ts --name <name> --protocol <https|tls> --server <url-or-host> --addresses <ip1,ip2,...> [--organization <name>] [--profile-identifier <id>] [--certs <path1.pem,path2.pem,...>] [--out <file.mobileconfig>] [--description <text>] [--top-description <text>] [--prohibit-disablement <true|false>] [--scope <System|User|...>] [--ca <cert.pem> --priv_key <key.pem> [--chain <chain.pem>]]

notes:
  - if no args are passed, interactive mode starts
  - --addresses may be empty only for https
  - --prohibit-disablement: true prevents users from disabling encrypted DNS
  - --scope: System applies to all users, User applies to current user
  - PayloadRemovalDisallowed is fixed to false (same as dns-profile-generator UI flow)`);
};

const die = (msg: string): never => {
  throw new Error(msg);
};
const parseBool = (v: string, name: string) => {
  if (v === 'true') return true;
  if (v === 'false') return false;
  return die(`${name}: expected true|false, got ${v}`);
};
const parseYesNo = (v: string, name: string) => {
  const x = v.toLowerCase();
  if (x === 'yes' || x === 'y') return true;
  if (x === 'no' || x === 'n') return false;
  return die(`${name}: expected yes|no, got ${v}`);
};
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'dns-profile';
const validate = (x: Input): Input => {
  if (!x.name.trim()) die('name is required');
  if (!x.profileIdentifier.trim()) die('profile-identifier is required');
  if (!validId(x.profileIdentifier))
    die(`profile-identifier must match [A-Za-z0-9.-], got: ${x.profileIdentifier}`);
  if (!x.out.trim()) die('out is required');
  if (x.scope !== 'System' && x.scope !== 'User')
    die(`scope: expected System|User, got ${x.scope}`);
  validateDnsInput({ protocol: x.protocol, server: x.server, addresses: x.addresses }, 'cli input');
  for (const f of x.certs) if (!fs.existsSync(f)) die(`missing file: ${f}`);
  if ((x.ca && !x.priv_key) || (!x.ca && x.priv_key))
    die('signing requires both --ca and --priv_key');
  if (x.chain && (!x.ca || !x.priv_key)) die('--chain requires both --ca and --priv_key');
  if (x.ca && !fs.existsSync(x.ca)) die(`missing file: ${x.ca}`);
  if (x.priv_key && !fs.existsSync(x.priv_key)) die(`missing file: ${x.priv_key}`);
  if (x.chain && !fs.existsSync(x.chain)) die(`missing file: ${x.chain}`);
  if (!x.out.endsWith('.mobileconfig')) x.out = `${x.out}.mobileconfig`;
  return x;
};
const withDefaults = (x: PartialInput): Input => {
  const name = x.name || 'DNS profile';
  const protocol = x.protocol || 'https';
  return {
    name,
    protocol,
    server: x.server || '',
    addresses: x.addresses || [],
    certs: x.certs || [],
    organizationName: x.organizationName || '',
    out: x.out || `${slug(name)}-${protocol}.mobileconfig`,
    profileIdentifier: x.profileIdentifier || 'com.example.dns',
    description: x.description || `Configures device to use ${name}`,
    topDescription: x.topDescription || `Adds ${name} to Big Sur and iOS 14 based systems`,
    prohibitDisablement: x.prohibitDisablement !== undefined ? x.prohibitDisablement : false,
    scope: x.scope || 'System',
    ca: x.ca,
    priv_key: x.priv_key,
    chain: x.chain,
  };
};

const asProfile = (x: Input): ProfileCfg => ({
  dns: {
    protocol: x.protocol.toUpperCase(),
    server: x.server,
    addresses: x.addresses,
  },
  PayloadDisplayName: x.name,
  PayloadDescription: x.description,
  PayloadIdentifier: `${x.profileIdentifier}.dns`,
  PayloadUUID: deterministicUuid(x.profileIdentifier, 'payload', 'cli', 0),
  ProhibitDisablement: x.prohibitDisablement,
  top: {
    displayName: x.name,
    description: x.topDescription,
    identifier: x.profileIdentifier,
    uuid: deterministicUuid(x.profileIdentifier, 'root', 'cli'),
    removalDisallowed: false,
    scope: x.scope,
    organization: x.organizationName || undefined,
  },
  certificates: x.certs.map((f, i) => {
    const data = fs.readFileSync(f, 'utf8');
    const name = path.basename(f).replace(/\.(pem|cer|crt)$/i, '');
    return {
      fileName: path.basename(f),
      data,
      displayName: name || `Certificate ${i + 1}`,
      identifier: `${x.profileIdentifier}.cert.${i}`,
      uuid: deterministicUuid(x.profileIdentifier, 'payload', 'cert', i + 1),
    };
  }),
  escapeXML: true,
});

const parseArgs = (argv: string[]): PartialInput => {
  if (!argv.length) return {};
  const out: Record<string, string> = {};
  const allowed = new Set([
    'name',
    'organization',
    'profile-identifier',
    'protocol',
    'server',
    'addresses',
    'certs',
    'out',
    'description',
    'top-description',
    'prohibit-disablement',
    'scope',
    'ca',
    'priv_key',
    'chain',
  ]);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) die(`unexpected arg: ${a}`);
    const k = a.slice(2);
    if (!allowed.has(k)) die(`unknown option: --${k}`);
    const v = argv[i + 1];
    if (!v || v.startsWith('--')) die(`missing value for --${k}`);
    out[k] = v;
    i++;
  }
  const protocol = out.protocol as Proto | undefined;
  const name = out.name;
  return {
    name,
    organizationName: out.organization,
    profileIdentifier: out['profile-identifier'],
    protocol,
    server: out.server,
    addresses: out.addresses !== undefined ? splitCsv(out.addresses) : undefined,
    certs: out.certs !== undefined ? splitCsv(out.certs) : undefined,
    description: out.description,
    topDescription: out['top-description'],
    out: out.out,
    prohibitDisablement: out['prohibit-disablement']
      ? parseBool(out['prohibit-disablement'], 'prohibit-disablement')
      : undefined,
    scope: out.scope,
    ca: out.ca,
    priv_key: out.priv_key,
    chain: out.chain,
  };
};

const askRequired = async (seed: PartialInput = {}): Promise<PartialInput> => {
  const rl = createInterface({ input, output });
  const q = async (prompt: string, def = '') => {
    const txt = await rl.question(def ? `${prompt} [${def}]: ` : `${prompt}: `);
    return txt.trim() || def;
  };
  const retry = async <T>(prompt: string, def: string, parse: (v: string) => T): Promise<T> => {
    let err = '';
    while (true) {
      try {
        const label = err ? `${prompt} (error: ${err})` : prompt;
        return parse(await q(label, def));
      } catch (e) {
        err = (e as Error).message;
      }
    }
  };
  try {
    const name =
      seed.name ||
      (await retry('Display name', '', (v) => {
        if (!v) throw new Error('name is required');
        return v;
      }));
    const protocol =
      seed.protocol ||
      (await retry<Proto>('Protocol (https|tls)', 'https', (v) => {
        const x = v.toLowerCase();
        if (x !== 'https' && x !== 'tls') throw new Error(`protocol: expected https|tls, got ${v}`);
        return x as Proto;
      }));
    const server =
      seed.server ||
      (await retry(
        protocol === 'https' ? 'Server URL (https://...)' : 'Server hostname',
        '',
        (v) => {
          if (!v) throw new Error('server is required');
          validateDnsInput({ protocol, server: v, addresses: [] }, 'Server');
          return v;
        }
      ));
    const addresses =
      seed.addresses ||
      (await retry<string[]>(
        'Server addresses (comma-separated IPs, optional for https)',
        '',
        (v) => {
          const arr = splitCsv(v);
          validateDnsInput({ protocol, server, addresses: arr }, 'Server addresses');
          return arr;
        }
      ));
    return {
      ...seed,
      name,
      protocol,
      server,
      addresses,
    };
  } finally {
    rl.close();
  }
};

const askFull = async (): Promise<PartialInput> => {
  const rl = createInterface({ input, output });
  const q = async (prompt: string, def = '') => {
    const txt = await rl.question(def ? `${prompt} [${def}]: ` : `${prompt}: `);
    return txt.trim() || def;
  };
  const retry = async <T>(prompt: string, def: string, parse: (v: string) => T): Promise<T> => {
    let err = '';
    while (true) {
      try {
        const label = err ? `${prompt} (error: ${err})` : prompt;
        return parse(await q(label, def));
      } catch (e) {
        err = (e as Error).message;
      }
    }
  };
  try {
    const name = await retry('Display name', '', (v) => {
      if (!v) throw new Error('name is required');
      return v;
    });
    const protocol = await retry<Proto>('Protocol (https|tls)', 'https', (v) => {
      const x = v.toLowerCase();
      if (x !== 'https' && x !== 'tls') throw new Error(`protocol: expected https|tls, got ${v}`);
      return x as Proto;
    });
    const server = await retry(
      protocol === 'https' ? 'Server URL (https://...)' : 'Server hostname',
      '',
      (v) => {
        if (!v) throw new Error('server is required');
        validateDnsInput({ protocol, server: v, addresses: [] }, 'Server');
        return v;
      }
    );
    const addresses = await retry<string[]>(
      'Server addresses (comma-separated IPs, optional for https)',
      '',
      (v) => {
        const arr = splitCsv(v);
        validateDnsInput({ protocol, server, addresses: arr }, 'Server addresses');
        return arr;
      }
    );
    const sign = await retry<boolean>('Sign profile? (yes/no)', 'no', (v) => parseYesNo(v, 'sign'));
    const organizationName = await q('Organization name (optional)');
    const profileIdentifier = await retry('Profile identifier', 'com.example.dns', (v) => {
      if (!validId(v)) throw new Error(`profile-identifier must match [A-Za-z0-9.-], got: ${v}`);
      return v;
    });
    const out = await q('Output file', `${slug(name)}-${protocol}.mobileconfig`);
    const prohibitDisablement = await retry<boolean>(
      'Prohibit disabling encrypted DNS? (true|false)',
      'false',
      (v) => parseBool(v.toLowerCase(), 'ProhibitDisablement')
    );
    const scope = await retry<string>('Payload scope (System|User)', 'System', (v) => {
      const x = v[0]?.toUpperCase() + v.slice(1).toLowerCase();
      if (x !== 'System' && x !== 'User') throw new Error(`scope: expected System|User, got ${v}`);
      return x;
    });
    let ca = '';
    let priv_key = '';
    let chain = '';
    if (sign) {
      ca = await retry<string>('Signer cert path', '', (v) => {
        if (!v) throw new Error('signer cert path is required');
        if (!fs.existsSync(v)) throw new Error(`missing file: ${v}`);
        return v;
      });
      priv_key = await retry<string>('Signer private key path', '', (v) => {
        if (!v) throw new Error('signer private key path is required');
        if (!fs.existsSync(v)) throw new Error(`missing file: ${v}`);
        return v;
      });
      chain = await retry<string>('Signer chain path (optional)', '', (v) => {
        if (!v) return '';
        if (!fs.existsSync(v)) throw new Error(`missing file: ${v}`);
        return v;
      });
    }
    return {
      name,
      protocol,
      server,
      addresses,
      organizationName,
      profileIdentifier,
      out,
      prohibitDisablement,
      scope,
      ca: ca || undefined,
      priv_key: priv_key || undefined,
      chain: chain || undefined,
    };
  } finally {
    rl.close();
  }
};

const main = async () => {
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv.includes('-h')) {
    usage();
    return;
  }
  const parsed = parseArgs(argv);
  const cfg = validate(withDefaults(argv.length ? await askRequired(parsed) : await askFull()));
  const xml = generateSingle(asProfile(cfg));
  const out = path.resolve(cfg.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, xml);
  console.log(out);
  if (cfg.ca && cfg.priv_key)
    console.log(signFile({ ca: cfg.ca, priv_key: cfg.priv_key, chain: cfg.chain, input: out }));
};

main().catch((e) => {
  console.error((e as Error).message || e);
  process.exit(1);
});
