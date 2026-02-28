import { CMS } from 'micro-key-producer/x509.js';
import { deepStrictEqual } from 'node:assert';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const scriptSign = path.join(root, 'scripts', 'sign-single.ts');
const scriptOpenSSL = path.join(root, 'scripts', 'sign-single-openssl.sh');

const opensslUsable = () => {
  try {
    execFileSync('openssl', ['version'], { stdio: 'pipe', encoding: 'utf8' });
  } catch (e) {
    const err = e as NodeJS.ErrnoException;
    if (err.code === 'EPERM' || err.code === 'ENOENT')
      throw new Error(`OpenSSL is required for sign.test.ts (${err.code})`);
    throw e;
  }
};
const openssl = (args: string[], cwd: string) =>
  execFileSync('openssl', args, { cwd, stdio: 'pipe', encoding: 'utf8' });
const genCerts = (dir: string) => {
  const rootKeyEc = path.join(dir, 'root.key.ec.pem');
  const rootKey = path.join(dir, 'root.key.pem');
  const rootPem = path.join(dir, 'root.pem');
  const signerKeyEc = path.join(dir, 'signer.key.ec.pem');
  const signerKey = path.join(dir, 'signer.key.pem');
  const signerCsr = path.join(dir, 'signer.csr.pem');
  const signerPem = path.join(dir, 'signer.pem');
  const chainPem = path.join(dir, 'chain.pem');
  const ext = path.join(dir, 'signer.ext');
  openssl(['ecparam', '-name', 'prime256v1', '-genkey', '-noout', '-out', rootKeyEc], dir);
  openssl(['pkcs8', '-topk8', '-nocrypt', '-in', rootKeyEc, '-out', rootKey], dir);
  openssl(
    [
      'req',
      '-x509',
      '-new',
      '-key',
      rootKeyEc,
      '-sha256',
      '-days',
      '3650',
      '-subj',
      '/CN=Test Root',
      '-out',
      rootPem,
    ],
    dir
  );
  openssl(['ecparam', '-name', 'prime256v1', '-genkey', '-noout', '-out', signerKeyEc], dir);
  openssl(['pkcs8', '-topk8', '-nocrypt', '-in', signerKeyEc, '-out', signerKey], dir);
  openssl(['req', '-new', '-key', signerKey, '-subj', '/CN=Test Signer', '-out', signerCsr], dir);
  fs.writeFileSync(ext, 'basicConstraints=critical,CA:FALSE\nkeyUsage=critical,digitalSignature\n');
  openssl(
    [
      'x509',
      '-req',
      '-in',
      signerCsr,
      '-CA',
      rootPem,
      '-CAkey',
      rootKey,
      '-CAcreateserial',
      '-out',
      signerPem,
      '-days',
      '365',
      '-sha256',
      '-extfile',
      ext,
    ],
    dir
  );
  fs.copyFileSync(rootPem, chainPem);
  return { signerPem, signerKey, chainPem, rootPem };
};
const firstProfile = () => {
  const dir = path.join(root, '..', 'profiles');
  const list = fs
    .readdirSync(dir)
    .filter((x) => x.endsWith('.mobileconfig'))
    .sort();
  if (!list.length) throw new Error(`no profiles found in ${dir}`);
  return path.join(dir, list[0]);
};
const verifyOpenSSL = (signed: string, ca: string, out: string, cwd: string) =>
  openssl(
    [
      'cms',
      '-verify',
      '-binary',
      '-inform',
      'DER',
      '-in',
      signed,
      '-CAfile',
      ca,
      '-purpose',
      'any',
      '-out',
      out,
    ],
    cwd
  );

describe('sign.ts parity', () => {
  it('matches OpenSSL detached content/certs and verifies in both implementations', () => {
    opensslUsable();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'encrypted-dns-sign-parity-'));
    try {
      const { signerPem, signerKey, chainPem, rootPem } = genCerts(dir);
      const profile = firstProfile();
      const tsInput = path.join(dir, 'in.ts.mobileconfig');
      const osInput = path.join(dir, 'in.ossl.mobileconfig');
      fs.copyFileSync(profile, tsInput);
      fs.copyFileSync(profile, osInput);
      execFileSync(
        'node',
        [scriptSign, '--ca', signerPem, '--priv_key', signerKey, '--chain', chainPem, tsInput],
        {
          stdio: 'pipe',
          cwd: dir,
        }
      );
      execFileSync(
        scriptOpenSSL,
        ['--ca', signerPem, '--priv_key', signerKey, '--chain', chainPem, osInput],
        {
          stdio: 'pipe',
          cwd: dir,
        }
      );
      const tsSigned = tsInput.replace(/\.mobileconfig$/, '.signed.mobileconfig');
      const osSigned = osInput.replace(/\.mobileconfig$/, '.signed.mobileconfig');
      const tsDer = fs.readFileSync(tsSigned);
      const osDer = fs.readFileSync(osSigned);
      const tsDetached = CMS.detach(new Uint8Array(tsDer), { allowBER: true });
      const osDetached = CMS.detach(new Uint8Array(osDer), { allowBER: true });
      deepStrictEqual(
        Buffer.from(tsDetached.content).toString('hex'),
        Buffer.from(osDetached.content).toString('hex')
      );
      deepStrictEqual(tsDetached.certs, osDetached.certs);
      const now = Date.now();
      CMS.verify(new Uint8Array(tsDer), { allowBER: true, checkSignatures: true, time: now });
      CMS.verify(new Uint8Array(osDer), { allowBER: true, checkSignatures: true, time: now });
      const outTs = path.join(dir, 'verify.ts.out.mobileconfig');
      const outOs = path.join(dir, 'verify.ossl.out.mobileconfig');
      verifyOpenSSL(tsSigned, rootPem, outTs, dir);
      verifyOpenSSL(osSigned, rootPem, outOs, dir);
      deepStrictEqual(fs.readFileSync(outTs), fs.readFileSync(profile));
      deepStrictEqual(fs.readFileSync(outOs), fs.readFileSync(profile));
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
