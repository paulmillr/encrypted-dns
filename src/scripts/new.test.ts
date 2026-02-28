import { deepStrictEqual } from 'node:assert';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const NEW = path.join(ROOT, 'src', 'scripts', 'new.ts');

const run = (args: string[], input = '', cwd?: string) => {
  const res = spawnSync('node', [NEW, ...args], {
    cwd: cwd || ROOT,
    input,
    encoding: 'utf8',
  });
  if (res.status !== 0)
    throw new Error(`new.ts failed (${res.status}):\n${res.stdout}\n${res.stderr}`);
  return res;
};
const runRaw = (args: string[], input = '', cwd?: string) =>
  spawnSync('node', [NEW, ...args], {
    cwd: cwd || ROOT,
    input,
    encoding: 'utf8',
  });

type PtyRes = {
  code: number | null;
  signal: NodeJS.Signals | null;
  sent: number;
  outTail: string;
  errTail: string;
};
const runPtyFlow = async (
  argv: string[],
  cwd: string,
  answers: string[],
  opts: { timeoutMs?: number } = {}
): Promise<PtyRes> => {
  const timeoutMs = opts.timeoutMs || 15000;
  const cmd = argv.map((a) => JSON.stringify(a)).join(' ');
  const p = spawn('bash', ['-lc', cmd], {
    cwd,
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  let sent = 0;
  let out = '';
  let err = '';
  const send = () => {
    if (sent >= answers.length) return;
    if (!p.stdin.writable) return;
    p.stdin.write(`${answers[sent++]}\n`);
    if (sent === answers.length) p.stdin.end();
  };
  p.stdout.on('data', (d) => {
    out += d.toString();
    if (/(?:\]: |: )$/.test(out)) send();
  });
  p.stderr.on('data', (d) => {
    err += d.toString();
  });
  return await new Promise<PtyRes>((resolve, reject) => {
    const timer = setTimeout(() => {
      p.kill('SIGKILL');
      reject(
        new Error(
          `PTY interactive flow timed out\nstdout:\n${out.slice(-800)}\nstderr:\n${err.slice(-800)}`
        )
      );
    }, timeoutMs);
    p.on('error', (e) => {
      clearTimeout(timer);
      reject(e);
    });
    p.on('exit', (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal, sent, outTail: out.slice(-800), errTail: err.slice(-800) });
    });
  });
};

const EXPECT_ARGS = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>PayloadContent</key>
\t<array>
\t\t<dict>
\t\t\t<key>DNSSettings</key>
\t\t\t<dict>
\t\t\t\t<key>DNSProtocol</key>
\t\t\t\t<string>HTTPS</string>
\t\t\t\t<key>ServerAddresses</key>
\t\t\t\t<array>
\t\t\t\t\t<string>1.1.1.1</string>
\t\t\t\t\t<string>1.0.0.1</string>
\t\t\t\t</array>
\t\t\t\t<key>ServerURL</key>
\t\t\t\t<string>https://dns.example.test/dns-query</string>
\t\t\t</dict>
\t\t\t<key>PayloadDescription</key>
\t\t\t<string>Configures device to use Args DNS Encrypted DNS over HTTPS</string>
\t\t\t<key>PayloadDisplayName</key>
\t\t\t<string>Args DNS Encrypted DNS over HTTPS</string>
\t\t\t<key>PayloadIdentifier</key>
\t\t\t<string>com.apple.dnsSettings.managed.a25bcc3b-655b-58d4-b883-dce8ca57b701</string>
\t\t\t<key>PayloadType</key>
\t\t\t<string>com.apple.dnsSettings.managed</string>
\t\t\t<key>PayloadUUID</key>
\t\t\t<string>A25BCC3B-655B-58D4-B883-DCE8CA57B701</string>
\t\t\t<key>PayloadVersion</key>
\t\t\t<integer>1</integer>
\t\t\t<key>ProhibitDisablement</key>
\t\t\t<false/>
\t\t</dict>
\t</array>
\t<key>PayloadDescription</key>
\t<string>Args top description</string>
\t<key>PayloadDisplayName</key>
\t<string>Args DNS Encrypted DNS over HTTPS</string>
\t<key>PayloadIdentifier</key>
\t<string>com.paulmillr.apple-dns</string>
\t<key>PayloadRemovalDisallowed</key>
\t<false/>
\t<key>PayloadScope</key>
\t<string>System</string>
\t<key>PayloadType</key>
\t<string>Configuration</string>
\t<key>PayloadUUID</key>
\t<string>A41DCCF5-F126-5CF4-83A3-76151FDA864F</string>
\t<key>PayloadVersion</key>
\t<integer>1</integer>
</dict>
</plist>
`;
const EXPECT_INTERACTIVE = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>PayloadContent</key>
\t<array>
\t\t<dict>
\t\t\t<key>DNSSettings</key>
\t\t\t<dict>
\t\t\t\t<key>DNSProtocol</key>
\t\t\t\t<string>HTTPS</string>
\t\t\t\t<key>ServerAddresses</key>
\t\t\t\t<array>
\t\t\t\t\t<string>1.1.1.1</string>
\t\t\t\t\t<string>1.0.0.1</string>
\t\t\t\t</array>
\t\t\t\t<key>ServerURL</key>
\t\t\t\t<string>https://dns.interactive.test/dns-query</string>
\t\t\t</dict>
\t\t\t<key>PayloadDescription</key>
\t\t\t<string>Configures device to use Interactive DNS Encrypted DNS over HTTPS</string>
\t\t\t<key>PayloadDisplayName</key>
\t\t\t<string>Interactive DNS Encrypted DNS over HTTPS</string>
\t\t\t<key>PayloadIdentifier</key>
\t\t\t<string>com.apple.dnsSettings.managed.da5947a2-98fc-5296-a77b-ad12511af53e</string>
\t\t\t<key>PayloadType</key>
\t\t\t<string>com.apple.dnsSettings.managed</string>
\t\t\t<key>PayloadUUID</key>
\t\t\t<string>DA5947A2-98FC-5296-A77B-AD12511AF53E</string>
\t\t\t<key>PayloadVersion</key>
\t\t\t<integer>1</integer>
\t\t\t<key>ProhibitDisablement</key>
\t\t\t<false/>
\t\t</dict>
\t</array>
\t<key>PayloadDescription</key>
\t<string>Adds the Interactive DNS to Big Sur and iOS 14 based systems</string>
\t<key>PayloadDisplayName</key>
\t<string>Interactive DNS Encrypted DNS over HTTPS</string>
\t<key>PayloadIdentifier</key>
\t<string>com.paulmillr.apple-dns</string>
\t<key>PayloadRemovalDisallowed</key>
\t<false/>
\t<key>PayloadScope</key>
\t<string>System</string>
\t<key>PayloadType</key>
\t<string>Configuration</string>
\t<key>PayloadUUID</key>
\t<string>24F6FD9B-B466-5565-9896-6F398ADD8741</string>
\t<key>PayloadVersion</key>
\t<integer>1</integer>
</dict>
</plist>
`;

describe('new.ts', () => {
  it('args flow generates expected profile shape', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-new-args-'));
    try {
      const out = path.join(dir, 'args.mobileconfig');
      run(
        [
          '--name',
          'Args DNS',
          '--protocol',
          'https',
          '--server',
          'https://dns.example.test/dns-query',
          '--addresses',
          '1.1.1.1,1.0.0.1',
          '--description',
          'Args top description',
          '--out',
          out,
        ],
        '',
        dir
      );
      const got = fs.readFileSync(out, 'utf8');
      deepStrictEqual(got, EXPECT_ARGS);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('uses deterministic UUIDs for same output filename', () => {
    const aDir = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-new-det-a-'));
    const bDir = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-new-det-b-'));
    try {
      const outA = path.join(aDir, 'same.mobileconfig');
      const outB = path.join(bDir, 'same.mobileconfig');
      const args = [
        '--name',
        'Det DNS',
        '--protocol',
        'https',
        '--server',
        'https://dns.det.test/dns-query',
        '--addresses',
        '1.1.1.1',
      ];
      run([...args, '--out', outA], '', aDir);
      run([...args, '--out', outB], '', bDir);
      deepStrictEqual(fs.readFileSync(outA, 'utf8'), fs.readFileSync(outB, 'utf8'));
    } finally {
      fs.rmSync(aDir, { recursive: true, force: true });
      fs.rmSync(bDir, { recursive: true, force: true });
    }
  });

  it('fails on invalid https server URL', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-new-retry-'));
    try {
      const res = runRaw(
        [
          '--name',
          'Retry DNS',
          '--protocol',
          'https',
          '--server',
          'bad-url',
          '--addresses',
          '1.1.1.1',
        ],
        '',
        dir
      );
      deepStrictEqual(res.status, 1);
      deepStrictEqual(fs.readdirSync(dir).filter((x) => x.endsWith('.mobileconfig')).length, 0);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('appends .mobileconfig when output has no extension', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-new-ext-'));
    try {
      const outNoExt = path.join(dir, 'noext');
      const res = run(
        [
          '--name',
          'NoExt DNS',
          '--protocol',
          'https',
          '--server',
          'https://dns.noext.test/dns-query',
          '--addresses',
          '1.1.1.1',
          '--out',
          outNoExt,
        ],
        '',
        dir
      );
      deepStrictEqual(res.status, 0);
      deepStrictEqual(fs.existsSync(`${outNoExt}.mobileconfig`), true);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('full interactive flow', async () => {
    if (process.env.NEW_TEST_PTY === '0') return;
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-new-pty-'));
    try {
      const out = path.join(dir, 'interactive.mobileconfig');
      const answers = [
        'Interactive DNS',
        'https',
        'https://dns.interactive.test/dns-query',
        '1.1.1.1,1.0.0.1',
        'no',
        'Adds the Interactive DNS to Big Sur and iOS 14 based systems',
        out,
      ];
      const res = await runPtyFlow(['node', NEW], dir, answers);
      deepStrictEqual(res.code, 0);
      deepStrictEqual(res.signal, null);
      deepStrictEqual(res.sent, answers.length);
      deepStrictEqual(fs.existsSync(out), true);
      const xml = fs.readFileSync(out, 'utf8');
      deepStrictEqual(xml, EXPECT_INTERACTIVE);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
