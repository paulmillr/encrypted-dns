#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { genProfile, splitCsv, validateDnsInput } from './build.ts';
import { signFile } from './sign-single.ts';

type Proto = 'https' | 'tls';

type Input = {
  name: string;
  protocol: Proto;
  server: string;
  addresses?: string[];
  out: string;
  description: string;
  ca?: string;
  priv_key?: string;
  chain?: string;
};
type PartialInput = Partial<Input>;

const usage = () => {
  console.error(`usage:
  new.ts --name <name> --protocol <https|tls> --server <url-or-host> --addresses <ip1,ip2,...> [--out <file.mobileconfig>] [--description <text>] [--ca <cert.pem> --priv_key <key.pem> [--chain <chain.pem>]]

notes:
  - if no args are passed, interactive mode starts
  - --addresses may be empty only for https
  - profile identifier is derived from output file name (same key scheme as build.ts)`);
};

const die = (msg: string): never => {
  throw new Error(msg);
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
  if (!x.out.trim()) die('out is required');
  validateDnsInput(
    { protocol: x.protocol, server: x.server, addresses: x.addresses || [] },
    'cli input'
  );
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
    addresses: x.addresses,
    out: x.out || `${slug(name)}-${protocol}.mobileconfig`,
    description: x.description || `Adds the ${name} to Big Sur and iOS 14 based systems`,
    ca: x.ca,
    priv_key: x.priv_key,
    chain: x.chain,
  };
};

const parseArgs = (argv: string[]): PartialInput => {
  if (!argv.length) return {};
  const out: Record<string, string> = {};
  const allowed = new Set([
    'name',
    'protocol',
    'server',
    'addresses',
    'out',
    'description',
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
  return {
    name: out.name,
    protocol,
    server: out.server,
    addresses: out.addresses !== undefined ? splitCsv(out.addresses) : undefined,
    description: out.description,
    out: out.out,
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
      (await retry('Provider name', '', (v) => {
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
    const name = await retry('Provider name', '', (v) => {
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
    const description = await q(
      'Profile description',
      `Adds the ${name} to Big Sur and iOS 14 based systems`
    );
    const out = await q('Output file', `${slug(name)}-${protocol}.mobileconfig`);
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
      description,
      out,
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
  const out = path.resolve(cfg.out);
  const outFile = path.basename(out);
  const key = outFile.endsWith('.mobileconfig')
    ? outFile.slice(0, -'.mobileconfig'.length)
    : outFile;
  if (!/^[A-Za-z0-9-]+$/.test(key))
    throw new Error(`output file stem must match [A-Za-z0-9-], got: ${key}`);
  const xml = genProfile(key, {
    name: cfg.name,
    description: cfg.description,
    protocol: cfg.protocol,
    ServerURLOrName: cfg.server,
    ServerAddresses: cfg.addresses,
  });
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
