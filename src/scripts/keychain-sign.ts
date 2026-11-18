import { execFileSync, spawnSync } from 'node:child_process';
import { X509Certificate } from 'node:crypto';
import fs from 'node:fs';
import { X509, pemBlocks } from 'micro-key-producer/x509.js';

// The private key stays in Keychain. Only the selected public certificate is published.
export function keychainIdentity(input: string) {
  if (/\.(cer|crt|pem)$/i.test(input)) {
    const certificate = new X509Certificate(fs.readFileSync(input));
    const ski = X509.extensions(X509.decode(certificate.raw)).find((ext) => ext.ski)?.ski;
    if (!ski?.length)
      throw new Error('certificate has no subject key identifier; use its Keychain name');
    return { certificate, flag: '-Z', value: Buffer.from(ski).toString('hex') };
  }
  const pem = execFileSync('/usr/bin/security', ['find-certificate', '-a', '-p', '-c', input], {
    encoding: 'utf8',
  });
  const certificates = pemBlocks(pem).map((block) => new X509Certificate(block.der));
  if (!certificates.length) throw new Error(`no Keychain certificate matches "${input}"`);
  const [certificate] = certificates;
  if (certificates.some((c) => !c.raw.equals(certificate.raw)))
    throw new Error(
      `multiple Keychain certificates match "${input}"; pass the path to the intended .cer file`
    );
  return { certificate, flag: '-N', value: input };
}

export function signInKeychain(identity: { flag: string; value: string }, xml: string) {
  // Object signing with SHA-256; omit the default S/MIME encryption-key preferences.
  const args = [
    'cms',
    '-S',
    identity.flag,
    identity.value,
    '-H',
    'SHA256',
    '-u',
    '6',
    '-Y',
    'NONE',
  ];
  const result = spawnSync('/usr/bin/security', args, { input: xml });
  if (result.error) throw result.error;
  const diagnostic = result.stderr.toString().trim();
  // security cms can emit a signing error and still exit zero with partial output.
  if (result.status !== 0 || !result.stdout.length || /^security:/im.test(diagnostic)) {
    const reason =
      diagnostic ||
      (result.signal
        ? `signal ${result.signal}`
        : `exit ${result.status}, ${result.stdout.length} output bytes`);
    throw new Error(`Keychain signing failed for "${identity.value}": ${reason}`);
  }
  return result.stdout;
}

export function verifyProfile(
  cms: Buffer,
  xml: string,
  expected: X509Certificate,
  signerFile: string
) {
  // OpenSSL verifies the signature with the embedded signer and returns the signed bytes.
  // Publisher identity is pinned separately to the repository's public certificate.
  const content = execFileSync(
    'openssl',
    ['cms', '-verify', '-binary', '-inform', 'DER', '-noverify', '-signer', signerFile],
    { input: cms, stdio: ['pipe', 'pipe', 'pipe'] }
  );
  const signers = pemBlocks(fs.readFileSync(signerFile, 'utf8'));
  if (signers.length !== 1 || signers[0].tag !== 'CERTIFICATE')
    throw new Error(`expected one signer certificate, got ${signers.length} PEM blocks`);
  const actual = new X509Certificate(signers[0].der);
  if (!actual.raw.equals(expected.raw))
    throw new Error(
      `unexpected profile signer (SHA-256): expected ${expected.fingerprint256}, got ${actual.fingerprint256}`
    );
  if (!content.equals(Buffer.from(xml))) throw new Error('signed content differs from profile');
}
