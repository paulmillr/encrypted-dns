// The health check sends one IN A question for example.com, with transaction ID zero.
export const QUERY = Buffer.from(
  '000001000001000000000000076578616d706c6503636f6d0000010001',
  'hex'
);
export const MAX_DNS_MESSAGE = 65535;

// IN A question for `name` with transaction ID zero (RFC 8484 4.1) and an EDNS(0) OPT record,
// so resolvers can attach Extended DNS Errors (RFC 8914) to their replies.
export function buildQuery(name: string) {
  const labels = name
    .toLowerCase()
    .split('.')
    .map((l) => Buffer.from(l, 'latin1'));
  if (labels.some((l) => !l.length || l.length > 63) || name.length > 253)
    throw new Error(`invalid DNS name: ${name}`);
  const header = Buffer.from('000001000001000000000001', 'hex');
  const qname = Buffer.concat(labels.flatMap((l) => [Buffer.from([l.length]), l]));
  // Root owner, type OPT (41), UDP payload 1232, extended RCODE/version/flags 0, no options.
  const opt = Buffer.from('00' + '0029' + '04d0' + '00000000' + '0000', 'hex');
  return Buffer.concat([header, qname, Buffer.from('0000010001', 'hex'), opt]);
}

function readName(packet: Buffer, start: number) {
  const labels = [];
  let offset = start;
  let next: number | undefined;
  let length = 1;
  // Compression pointers refer to earlier names. Limit expansion work on untrusted replies.
  let pointers = 0;
  while (offset < packet.length) {
    const size = packet[offset++];
    if (size === 0) return { name: labels.join('.'), next: next ?? offset };
    if ((size & 0xc0) === 0xc0) {
      const target = ((size & 0x3f) << 8) | packet.readUInt8(offset);
      if (target < 12 || target >= offset - 1 || ++pointers > 128)
        throw new Error('invalid DNS name pointer');
      next ??= offset + 1;
      offset = target;
      continue;
    }
    length += size + 1;
    if (size > 63 || length > 255 || offset + size > packet.length)
      throw new Error('invalid DNS label');
    // Keep label boundaries even if a label contains a literal dot.
    const label = packet.toString('latin1', offset, offset + size);
    labels.push(label.replace(/[A-Z]/g, (c) => c.toLowerCase()).replace(/[\\.]/g, '\\$&'));
    offset += size;
  }
  throw new Error('truncated DNS name');
}

export type DnsAnswer = {
  // Full RCODE: the 4 header bits plus the 8 extended bits from OPT.
  rcode: number;
  // IPv4 addresses reached from the question name through the answer CNAME chain.
  addresses: string[];
  // Extended DNS Errors (RFC 8914).
  ede: { code: number; text: string }[];
};

// Parses a reply to an IN A question for `qname`. Throws on malformed or mismatched messages.
export function parseResponse(packet: Buffer, qname: string): DnsAnswer {
  if (packet.length < 12 || packet.length > MAX_DNS_MESSAGE) throw new Error('bad DNS length');
  const flags = packet.readUInt16BE(2);
  // Require a standard, untruncated response to transaction ID zero.
  if (packet.readUInt16BE(0) !== 0 || (flags & 0xfa00) !== 0x8000)
    throw new Error('bad DNS response header');
  let rcode = flags & 0xf;
  if (packet.readUInt16BE(4) !== 1) throw new Error('expected one DNS question');
  const question = readName(packet, 12);
  if (question.name !== qname.toLowerCase() || packet.readUInt32BE(question.next) !== 0x00010001)
    throw new Error('DNS question mismatch');

  const answers = packet.readUInt16BE(6);
  const records = answers + packet.readUInt16BE(8) + packet.readUInt16BE(10);
  const aliases = new Map<string, string>();
  const addresses = new Map<string, string[]>();
  const ede: DnsAnswer['ede'] = [];
  let offset = question.next + 4;
  for (let i = 0; i < records; i++) {
    const owner = readName(packet, offset);
    const type = packet.readUInt16BE(owner.next);
    const cls = packet.readUInt16BE(owner.next + 2);
    const size = packet.readUInt16BE(owner.next + 8);
    const data = owner.next + 10;
    offset = data + size;
    if (offset > packet.length) throw new Error('truncated DNS record');
    if (type === 41) {
      rcode |= packet[data - 6] << 4;
      for (let o = data; o < offset; ) {
        if (o + 4 > offset) throw new Error('truncated EDNS option');
        const code = packet.readUInt16BE(o);
        const len = packet.readUInt16BE(o + 2);
        const end = o + 4 + len;
        if (end > offset) throw new Error('truncated EDNS option');
        if (code === 15) {
          if (len < 2) throw new Error('invalid Extended DNS Error');
          ede.push({ code: packet.readUInt16BE(o + 4), text: packet.toString('utf8', o + 6, end) });
        }
        o = end;
      }
    }
    if (i >= answers || cls !== 1) continue;
    if (type === 1) {
      if (size !== 4) throw new Error('invalid A record');
      const list = addresses.get(owner.name) || [];
      list.push(Array.from(packet.subarray(data, offset)).join('.'));
      addresses.set(owner.name, list);
    } else if (type === 5) {
      const target = readName(packet, data);
      if (target.next !== offset) throw new Error('invalid CNAME record');
      aliases.set(owner.name, target.name);
    }
  }
  if (offset !== packet.length) throw new Error('trailing DNS data');
  let owner = question.name;
  for (let i = 0; i <= aliases.size; i++) {
    const found = addresses.get(owner);
    if (found) return { rcode, addresses: found, ede };
    const target = aliases.get(owner);
    if (target === undefined) break;
    owner = target;
  }
  return { rcode, addresses: [], ede };
}

export function checkResponse(packet: Buffer) {
  const { rcode, addresses } = parseResponse(packet, 'example.com');
  if (rcode !== 0)
    throw new Error(rcode < 16 ? 'bad DNS response header' : 'DNS extended response error');
  if (!addresses.length) throw new Error('no matching A answer');
}
