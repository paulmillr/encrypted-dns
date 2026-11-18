import assert from 'node:assert/strict';
import { it } from 'node:test';
import { buildQuery, checkResponse, parseResponse, QUERY } from './dns-response.ts';

const header = Buffer.from(QUERY);
header.writeUInt16BE(0x8180, 2);
header.writeUInt16BE(1, 6);
const record = Buffer.from('c00c000100010000003c0004c0000201', 'hex');
const answer = Buffer.concat([header, record]);

it('accepts a compressed IN A answer for the query and follows CNAME answers', () => {
  checkResponse(answer);
  const cname = Buffer.from('c00c000500010000003c00070465646765c00c', 'hex');
  const aliasA = Buffer.from(record);
  aliasA.writeUInt16BE(0xc000 | (header.length + 12));
  const chain = Buffer.concat([header, cname, aliasA]);
  chain.writeUInt16BE(2, 6);
  checkResponse(chain);
});

it('rejects an incomplete record, mismatched question, and unrelated answer', () => {
  assert.throws(() => checkResponse(header.subarray(0, 12)));
  assert.throws(() => checkResponse(answer.subarray(0, -1)));
  const wrongQuestion = Buffer.from(answer);
  wrongQuestion[13] = 120;
  assert.throws(() => checkResponse(wrongQuestion));
  const unrelated = Buffer.from(answer);
  unrelated.writeUInt16BE(0xc014, header.length); // com.
  assert.throws(() => checkResponse(unrelated));
});

it('rejects a mismatched ID, truncated response, and short additional section', () => {
  for (const [offset, value] of [
    [0, 1],
    [2, 0x8380],
    [10, 1],
  ]) {
    const message = Buffer.from(answer);
    message.writeUInt16BE(value, offset);
    assert.throws(() => checkResponse(message));
  }
});

it('builds an A query with an EDNS(0) OPT record', () => {
  assert.equal(
    buildQuery('Example.com').toString('hex'),
    '000001000001000000000001076578616d706c6503636f6d000001000100002904d0000000000000'
  );
  assert.throws(() => buildQuery('a..b'));
  assert.throws(() => buildQuery('x'.repeat(64) + '.com'));
});

it('parses addresses, NXDOMAIN and Extended DNS Errors', () => {
  assert.deepEqual(parseResponse(answer, 'example.com'), {
    rcode: 0,
    addresses: ['192.0.2.1'],
    ede: [],
  });
  // NXDOMAIN with OPT carrying EDE 16 "Censored" + text "court".
  const nx = Buffer.from(QUERY);
  nx.writeUInt16BE(0x8183, 2);
  nx.writeUInt16BE(1, 10);
  const opt = Buffer.from('00002904d000000000000b000f0007001063' + '6f757274', 'hex');
  assert.deepEqual(parseResponse(Buffer.concat([nx, opt]), 'example.com'), {
    rcode: 3,
    addresses: [],
    ede: [{ code: 16, text: 'court' }],
  });
  assert.throws(() => parseResponse(Buffer.concat([nx, opt.subarray(0, -1)]), 'example.com'));
  assert.throws(() => checkResponse(Buffer.concat([nx, opt])));
  assert.throws(() => parseResponse(answer, 'example.org'));
});
