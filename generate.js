#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const LANGUAGES_DIR = path.join(__dirname, 'languages');
const PROVIDERS_PATH = path.join(__dirname, 'providers');
const DEFAULT_LANG = 'en';
const OUTPUT_DIR = __dirname;
const REPO_RAW = 'https://github.com/paulmillr/encrypted-dns/raw/master';

const REGIONS = {
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

const providerFile = (p, https, signed) => {
  const postfix = (p, https) => {
    if (https) {
      if (p.doh && p.doh !== true) return `doh${p.doh}`;
      if (p.doh) return 'doh';
      return 'https';
    } else {
      if (p.doh && p.doh !== true) return `dot${p.doh}`;
      if (p.doh) return 'dot';
      return 'tls';
    }
  };
  const name = p.name || p.id;
  return `${signed ? 'signed' : 'profiles'}/${name}-${postfix(p, https)}.mobileconfig`;
};

const languages = fs
  .readdirSync(LANGUAGES_DIR)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => {
    const p = path.join(LANGUAGES_DIR, f);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    return {
      code: data.code,
      name: data.name,
      mdFile: p.replace('.json', '.md'),
      jsonFile: p,
      data: data,
    };
  });

const providers = fs
  .readdirSync(PROVIDERS_PATH)
  .sort()
  .map((i) => JSON.parse(fs.readFileSync(`${PROVIDERS_PATH}/${i}`)))
  .map((i) => {
    const unsigned = {
      https: !!i.https || fs.existsSync(providerFile(i, true)),
      tls: !!i.tls || fs.existsSync(providerFile(i, false)),
    };
    const signed = {
      https: unsigned.https && fs.existsSync(providerFile(i, true, true)),
      tls: unsigned.tls && fs.existsSync(providerFile(i, false, true)),
    };
    return { ...i, formats: { unsigned, signed } };
  });

const FULLWIDTH_PATTERN =
  /[\u1100-\u115F\u2329\u232A\u2E80-\u303E\u3040-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE6F\uFF00-\uFF60\uFFE0-\uFFE6]/u;
function chrWidth(str) {
  let width = 0;
  for (const char of str) width += FULLWIDTH_PATTERN.test(char) || REGIONS[char] ? 2 : 1;
  return width;
}
const padEnd = (s, len, chr) => `${s}${chr.repeat(Math.max(0, len - chrWidth(s)))}`;

const genTable = (rows) => {
  // first row is header
  const widths = rows[0].map((i) => 0);
  // Collect cell widths
  for (const r of rows) {
    for (let i = 0; i < r.length; i++) widths[i] = Math.max(widths[i], chrWidth(r[i]));
  }
  let table = '';
  rows.forEach((r, i) => {
    const cells = r.map((c, j) => padEnd(c, widths[j], ' ')).join(' | ');
    table += `| ${cells} |\n`;
    if (i === 0) table += `| ${r.map((c, j) => padEnd('', widths[j], '-')).join(' | ')} |\n`;
  });
  return table;
};

const TAGS = {
  // Language selection header
  LANGUAGES: (currentLang) => {
    return languages
      .map((lang) => {
        if (lang.code === currentLang.code) return lang.name;
        return `[${lang.name}](https://github.com/paulmillr/encrypted-dns/${
          lang.code === DEFAULT_LANG ? '' : `blob/master/README.${lang.code}.md`
        })`;
      })
      .join(' | ');
  },
  PROVIDERS_TABLE: (currentLang) => {
    const rows = [
      // header
      [
        currentLang.data.table_columns.name,
        currentLang.data.table_columns.region,
        currentLang.data.table_columns.censorship,
        currentLang.data.table_columns.notes,
        currentLang.data.table_columns.install_signed,
        currentLang.data.table_columns.install_unsigned,
      ],
    ];
    const sorted = Array.from(providers).sort((a, b) => a.id.localeCompare(b.id));
    for (const provider of sorted) {
      const name = provider.names[currentLang.code] || provider.names[DEFAULT_LANG];
      const note = provider.notes[currentLang.code] || provider.notes[DEFAULT_LANG];
      const censorship = provider.censorship ? currentLang.data.yes : currentLang.data.no;
      const regionEmoji = (Array.isArray(provider.region) ? provider.region : [provider.region])
        .map((r) => REGIONS[r])
        .join(' ');
      const unsignedLinks = [];
      if (provider.formats.unsigned && provider.formats.unsigned.https)
        unsignedLinks.push(`[HTTPS][${provider.profile}-https]`);
      if (provider.formats.unsigned && provider.formats.unsigned.tls)
        unsignedLinks.push(`[TLS][${provider.profile}-tls]`);
      const signedLinks = [];
      if (provider.formats.signed && provider.formats.signed.https)
        signedLinks.push(`[HTTPS][${provider.profile}-https-signed]`);
      if (provider.formats.signed && provider.formats.signed.tls)
        signedLinks.push(`[TLS][${provider.profile}-tls-signed]`);
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
  PROVIDERS_LINKS: (currentLang) => {
    let res = '';
    const addLink = (p, https, signed) => {
      const file = providerFile(p, https, signed);
      if (!fs.existsSync(`./${file}`)) throw new Error('missing: ' + file);
      res += `[${p.profile}-${https ? 'https' : 'tls'}${
        signed ? '-signed' : ''
      }]: ${REPO_RAW}/${file}\n`;
    };
    for (const p of providers) {
      if (p.website) res += `[${p.id}]: ${p.website}\n`;
      if (p.formats.unsigned.https) addLink(p, true);
      if (p.formats.unsigned.tls) addLink(p, false);
    }
    // signed
    for (const p of providers) {
      if (p.formats.signed.https) addLink(p, true, true);
      if (p.formats.signed.tls) addLink(p, false, true);
    }
    return res;
  },
};

function processTemplate(templateContent, lang) {
  let content = templateContent;
  for (const [tag, handler] of Object.entries(TAGS)) {
    const tagPattern = new RegExp(`<%${tag}%>`, 'g');
    if (content.match(tagPattern)) content = content.replace(tagPattern, handler(lang));
  }
  return content;
}

function generateReadmes() {
  for (const lang of languages) {
    if (!fs.existsSync(lang.mdFile)) throw new Error(`Template file not found: ${lang.mdFile}`);
    const tpl = fs.readFileSync(lang.mdFile, 'utf8');
    const processed = processTemplate(tpl, lang);
    const out = lang.code === DEFAULT_LANG ? 'README.md' : `README.${lang.code}.md`;
    fs.writeFileSync(path.join(OUTPUT_DIR, out), processed, 'utf8');
    console.log(`Generated ${out}`);
  }
}

function generateSingle(x) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>DNSSettings</key>
			<dict>
				<key>DNSProtocol</key>
				<string>${x.DNSProtocol}</string>
				<key>ServerAddresses</key>
				<array>
${x.ServerAddresses.map((i) => `\t\t\t\t\t<string>${i}</string>`).join('\n')}
				</array>
				<key>${!x.ServerURLOrName.startsWith('https://') ? 'ServerName' : 'ServerURL'}</key>
				<string>${x.ServerURLOrName}</string>
			</dict>
			<key>PayloadDescription</key>
			<string>Configures device to use ${x.name}</string>
			<key>PayloadDisplayName</key>
			<string>${x.PayloadDisplayName}</string>
			<key>PayloadIdentifier</key>
			<string>${x.PayloadIdentifier}</string>
			<key>PayloadType</key>
			<string>com.apple.dnsSettings.managed</string>
			<key>PayloadUUID</key>
			<string>${x.PayloadUUID}</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
			<key>ProhibitDisablement</key>
			<false/>
		</dict>
	</array>
	<key>PayloadDescription</key>
	<string>Adds the ${x.fullName} to Big Sur and iOS 14 based systems</string>
	<key>PayloadDisplayName</key>
	<string>${x.topName}</string>
	<key>PayloadIdentifier</key>
	<string>com.paulmillr.apple-dns</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadScope</key>
	<string>System</string>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>${x.TopPayloadUUID}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>
`;
}

function generateConfigs() {
  function generate(file, parsed) {
    if (!parsed) return;
    fs.writeFileSync(file, generateSingle(parsed));
    console.log(`Generated ${file}`);
  }
  for (const p of providers) {
    if (p.formats.unsigned.https) generate(providerFile(p, true), p.https);
    if (p.formats.unsigned.tls) generate(providerFile(p, false), p.tls);
  }
}
// Small utility to rewrite config structure
function patchConfigs() {
  for (const f of fs.readdirSync(`./providers/`)) {
    const path = `./providers/${f}`;
    const json = JSON.parse(fs.readFileSync(path, 'utf8'));
    fs.writeFileSync(path, JSON.stringify(json, null, 4));
  }
}

function main() {
  //patchConfigs();
  generateReadmes();
  generateConfigs();
}
main();
