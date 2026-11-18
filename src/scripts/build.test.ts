import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { it } from 'node:test';
import { fillOperator, genProfile, type Profile } from './build.ts';

const profile: Profile = {
  protocol: 'https',
  name: 'Example',
  description: 'Example resolver',
  ServerURLOrName: 'HTTPS://dns.example/dns-query{?dns}',
};

it('validates on-demand rule dictionaries and preserves SSIDs and DNS URI templates', () => {
  const render = (onDemandRules: Profile['onDemandRules']) =>
    genProfile('example', { ...profile, onDemandRules });
  const xml = render([
    { Action: 'Disconnect', SSIDMatch: ['A & B'] },
    {
      Action: 'EvaluateConnection',
      ActionParameters: [{ Domains: ['local'], DomainAction: 'NeverConnect' }],
    },
  ]);
  assert.ok(xml.includes('https://dns.example/dns-query{?dns}'));
  assert.ok(xml.includes('<string>A &amp; B</string>'));
  assert.throws(() => render([{ Action: 'Connect', 'unknown&field': true }]), /unknown field/);
  assert.throws(() => render([{ Action: 'Connect', SSIDMatch: [{}] }]), /SSIDMatch/);
  assert.throws(
    () =>
      render([
        {
          Action: 'EvaluateConnection',
          ActionParameters: [
            { Domains: ['local'], DomainAction: 'NeverConnect', extra: 'unexpected' },
          ],
        },
      ]),
    /unknown field/
  );
});

it('preserves signed downloads through clean builds and fails safely when the pin is missing', () => {
  const root = path.resolve(import.meta.dirname, '../..');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-build-test-'));
  const modules = path.join(import.meta.dirname, 'node_modules');
  try {
    fs.cpSync(path.join(root, 'src'), path.join(dir, 'src'), {
      recursive: true,
      filter: (file) => file !== path.join(root, 'src/certificates') && file !== modules,
    });
    fs.symlinkSync(modules, path.join(dir, 'src/scripts/node_modules'), 'dir');
    fs.mkdirSync(path.join(dir, 'signed'));
    const rel = 'signed/google-default-https.mobileconfig';
    const original = fs.readFileSync(path.join(root, rel));
    const signed = path.join(dir, rel);
    fs.writeFileSync(signed, original);
    const build = () => execFileSync(process.execPath, ['src/scripts/build.ts'], { cwd: dir });
    build();
    const readme = path.join(dir, 'README.md');
    const translatedReadme = path.join(dir, 'translations', 'zh-CN.md');
    const release = fs.readFileSync(readme, 'utf8');
    const translatedRelease = fs.readFileSync(translatedReadme, 'utf8');
    assert.ok(release.includes(rel));
    assert.ok(release.includes('[Install][google-default-https-signed]'));
    assert.ok(release.includes('(translations/zh-CN.md)'));
    const adguard = release.split('\n').find((line) => line.startsWith('| [AdGuard DNS]'));
    assert.ok(adguard);
    const [, , uncensored, other, notes] = adguard.split('|');
    assert.equal(notes.trim(), '🇷🇺 by AdGuard Software Ltd.');
    assert.equal(uncensored.trim(), '[Install][adguard-nofilter-https]');
    assert.ok(other.includes('[Default (unsigned)][adguard-default-https] · *ads*, *tracking*'));
    assert.ok(other.includes('[Family (unsigned)][adguard-family-https] · *malware*, *adult*'));
    assert.doesNotMatch(release, /-tls(?:-signed)?\]/);
    // ALL-PROFILES.md lists every protocol, signed and unsigned, and defines every link it uses.
    const all = fs.readFileSync(path.join(dir, 'ALL-PROFILES.md'), 'utf8');
    assert.ok(
      all.includes(
        '  - HTTPS `https://dns.google/dns-query` · [signed][google-default-https-signed] · [unsigned][google-default-https]'
      )
    );
    assert.ok(all.includes('  - TLS `dns.google` · [unsigned][google-default-tls]'));
    // Glossary: one row per language, English as the header, then the provider sections.
    const glossary = all.split('\n## ')[0];
    for (const row of ['English | signed | unsigned', '简体中文 | 已签名 | 未签名'])
      assert.match(glossary.replace(/ +/g, ' '), new RegExp(`\\| ${row} \\|`), row);
    const defined = new Set([...all.matchAll(/^\[([^\]]+)\]: /gm)].map((m) => m[1]));
    for (const [, ref] of all.matchAll(/\]\[([^\]]+)\]/g)) assert.ok(defined.has(ref), ref);
    assert.ok(release.includes('[ALL-PROFILES.md](ALL-PROFILES.md)'));
    assert.ok(translatedRelease.includes('[English](../README.md)'));
    assert.ok(translatedRelease.includes('[ALL-PROFILES.md](../ALL-PROFILES.md)'));
    assert.ok(translatedRelease.includes('[安装][adguard-nofilter-https]'));
    assert.ok(
      translatedRelease.includes(
        '[家庭保护 (未签名)][adguard-family-https] · *恶意软件*, *成人内容*'
      )
    );
    assert.doesNotMatch(translatedRelease, /-tls(?:-signed)?\]/);
    fs.unlinkSync(path.join(dir, 'src/profile-signer.pem'));
    const failed = spawnSync(process.execPath, ['src/scripts/build.ts'], {
      cwd: dir,
      encoding: 'utf8',
    });
    assert.equal(failed.status, 1);
    assert.match(failed.stderr, /without src\/profile-signer\.pem/);
    assert.equal(fs.readFileSync(readme, 'utf8'), release);
    execFileSync('npm', ['--prefix', 'src/scripts', 'run', 'build:clean'], { cwd: dir });
    assert.deepEqual(fs.readFileSync(signed), original);
    assert.ok(!fs.existsSync(translatedReadme));
    fs.copyFileSync(
      path.join(root, 'src/profile-signer.pem'),
      path.join(dir, 'src/profile-signer.pem')
    );
    build();
    assert.equal(fs.readFileSync(readme, 'utf8'), release);
    assert.equal(fs.readFileSync(translatedReadme, 'utf8'), translatedRelease);
    assert.deepEqual(fs.readFileSync(signed), original);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Each language has its own README template. Translators may word things freely, but the
// layout must match English so that sections and steps can't silently go missing.
const templateShape = (md: string) => {
  const shape: string[] = [];
  let section = 'start';
  let counts = { links: 0, code: 0 };
  const flush = () => shape.push(`${section}: ${counts.links} links, ${counts.code} code`);
  let prevBlank = true;
  for (const line of md.split('\n')) {
    const heading = /^(#+) /.exec(line);
    if (heading) {
      flush();
      section = `h${heading[1].length} #${shape.length}`;
      counts = { links: 0, code: 0 };
    } else if (/^<%\w+%>$/.test(line.trim())) shape.push(line.trim());
    else if (/^\s*\d+\. /.test(line)) shape.push(`ol${/^\s*/.exec(line)![0].length}`);
    else if (/^\s*- /.test(line)) shape.push(`ul${/^\s*/.exec(line)![0].length}`);
    else if (line.trim() && prevBlank) shape.push('p');
    counts.links += (line.match(/\]\(/g) || []).length;
    counts.code += (line.match(/`[^`]+`/g) || []).length;
    prevBlank = !line.trim();
  }
  flush();
  return shape;
};

it('keeps every language README template structured like English', () => {
  const dir = path.resolve(import.meta.dirname, '../languages');
  const templates = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort();
  const english = 'en.md';
  const expected = templateShape(fs.readFileSync(path.join(dir, english), 'utf8'));
  for (const file of templates)
    assert.deepEqual(
      templateShape(fs.readFileSync(path.join(dir, file), 'utf8')),
      expected,
      `${file} differs from ${english} in headings, lists, paragraphs, links or code spans`
    );
});

it('fills the operator into each language template, without spaces next to CJK names', () => {
  assert.equal(fillOperator('by {operator}', 'Quad9 Foundation'), 'by Quad9 Foundation');
  assert.equal(fillOperator('由 {operator} 运营', 'Google LLC'), '由 Google LLC 运营');
  assert.equal(fillOperator('由 {operator} 运营', '维基媒体基金会'), '由维基媒体基金会运营');
  assert.equal(fillOperator('由 {operator} 运营', '360 数字安全集团'), '由 360 数字安全集团运营');
  assert.equal(
    fillOperator('{operator} が運営', 'DNSPod Inc.（Tencent Cloud）'),
    'DNSPod Inc.（Tencent Cloud）が運営'
  );
});

it('rejects language files that do not match en.json', () => {
  const root = path.resolve(import.meta.dirname, '../..');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-lang-test-'));
  const modules = path.join(import.meta.dirname, 'node_modules');
  try {
    fs.cpSync(path.join(root, 'src'), path.join(dir, 'src'), {
      recursive: true,
      filter: (file) => file !== modules,
    });
    fs.symlinkSync(modules, path.join(dir, 'src/scripts/node_modules'), 'dir');
    const file = path.join(dir, 'src/languages/de.json');
    const de = JSON.parse(fs.readFileSync(file, 'utf8'));
    delete de.operated_by;
    de.filter_tags.ads = ' ';
    de.extra = 'x';
    fs.writeFileSync(file, JSON.stringify(de));
    const res = spawnSync(process.execPath, ['src/scripts/build.ts'], {
      cwd: dir,
      encoding: 'utf8',
    });
    assert.notEqual(res.status, 0);
    assert.match(res.stderr, /de\.json: missing operated_by/);
    assert.match(res.stderr, /de\.json: filter_tags\.ads must be non-empty text/);
    assert.match(res.stderr, /de\.json: unknown key extra/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
