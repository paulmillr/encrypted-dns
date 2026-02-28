English | [简体中文](https://github.com/paulmillr/encrypted-dns/blob/master/README.cmn-CN.md) | [繁體中文](https://github.com/paulmillr/encrypted-dns/blob/master/README.cmn-TW.md)

# encrypted-dns-configs

Configuration profiles for [DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) and [DNS over TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). Check out the article for more info: [paulmillr.com/posts/encrypted-dns/](https://paulmillr.com/posts/encrypted-dns/). To add a new provider, or edit an existing one: see [#contributing](#contributing).

## Usage

Install / download profile (`.mobileconfig` file) from a table below. After that:

iPhones, iPads:

1. Open the file by using Safari (other browsers will just download the file and won't ask for installation)
2. Tap on "Allow" button. The profile should download.
3. Go to **System Settings => General => VPN, DNS & Device Management**, select downloaded profile and tap the "Install" button.

Mac:

1. Ensure the downloaded file has proper extension: NAME.mobileconfig, not NAME.mobileconfig.txt.
2. Choose Apple menu > System Settings, click Privacy and Security in the sidebar, then click Profiles on the right.
  You may need to scroll down. You may be asked to supply your password or other information during installation.
3. In the Downloaded section, double-click the profile. Review the profile contents then click Continue, Install or Enroll to install the profile. If an earlier version of a profile is already installed on your Mac, the settings in the updated version replace the previous ones.

## Providers

Censorship (also known as "filtering") means the profile will not send true information about `hostname=IP` relation for some hosts.

| Name                                                                                 | Region | Censorship | Notes                                                                                                     | Install                                                                                          | Install (unsigned)                                                                 |
| ------------------------------------------------------------------------------------ | ------ | ---------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]                                                      | 🇨🇳     | Yes        | Operated by 360 Digital Security Group                                                                    | [HTTPS][360-default-https-signed]                                                                | [HTTPS][360-default-https]                                                         |
| [AdGuard DNS Default][adguard-default]                                               | 🇷🇺     | Yes        | Operated by AdGuard Software Ltd. Blocks ads, tracking & phishing                                         | [HTTPS][adguard-default-https-signed], [TLS][adguard-default-tls-signed]                         | [HTTPS][adguard-default-https], [TLS][adguard-default-tls]                         |
| [AdGuard DNS Family Protection][adguard-family]                                      | 🇷🇺     | Yes        | Operated by AdGuard Software Ltd. Blocks `Default` + malware & adult content                              | [HTTPS][adguard-family-https-signed], [TLS][adguard-family-tls-signed]                           | [HTTPS][adguard-family-https], [TLS][adguard-family-tls]                           |
| [AdGuard DNS Non-filtering][adguard-nofilter]                                        | 🇷🇺     | No         | Operated by AdGuard Software Ltd. Non-filtering                                                           | [HTTPS][adguard-nofilter-https-signed], [TLS][adguard-nofilter-tls-signed]                       | [HTTPS][adguard-nofilter-https], [TLS][adguard-nofilter-tls]                       |
| [Alekberg Encrypted DNS][alekberg-default]                                           | 🇳🇱     | No         | Independent                                                                                               | [HTTPS][alekberg-default-https-signed]                                                           | [HTTPS][alekberg-default-https]                                                    |
| [Aliyun Public DNS][alibaba-default]                                                 | 🇨🇳     | No         | Operated by Alibaba Cloud Ltd.                                                                            | [HTTPS][alibaba-default-https-signed], [TLS][alibaba-default-tls-signed]                         | [HTTPS][alibaba-default-https], [TLS][alibaba-default-tls]                         |
| [BlahDNS CDN Filtered][blahdns-cdn-adblock]                                          | 🇺🇸     | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS][blahdns-cdn-adblock-https-signed]                                                        | [HTTPS][blahdns-cdn-adblock-https]                                                 |
| [BlahDNS CDN Unfiltered][blahdns-cdn-unfiltered]                                     | 🇺🇸     | No         | Independent. Non-filtering                                                                                | [HTTPS][blahdns-cdn-unfiltered-https-signed]                                                     | [HTTPS][blahdns-cdn-unfiltered-https]                                              |
| [BlahDNS Germany][blahdns-germany]                                                   | 🇩🇪     | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS][blahdns-germany-https-signed]                                                            | [HTTPS][blahdns-germany-https]                                                     |
| [BlahDNS Singapore][blahdns-singapore]                                               | 🇸🇬     | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS][blahdns-singapore-https-signed]                                                          | [HTTPS][blahdns-singapore-https]                                                   |
| [Canadian Shield Private][canadianshield-private]                                    | 🇨🇦     | No         | Operated by the Canadian Internet Registration Authority (CIRA)                                           | [HTTPS][canadianshield-private-https-signed], [TLS][canadianshield-private-tls-signed]           | [HTTPS][canadianshield-private-https], [TLS][canadianshield-private-tls]           |
| [Canadian Shield Protected][canadianshield-protected]                                | 🇨🇦     | Yes        | Operated by the Canadian Internet Registration Authority (CIRA). Blocks malware & phishing                | [HTTPS][canadianshield-protected-https-signed], [TLS][canadianshield-protected-tls-signed]       | [HTTPS][canadianshield-protected-https], [TLS][canadianshield-protected-tls]       |
| [Canadian Shield Family][canadianshield-family]                                      | 🇨🇦     | Yes        | Operated by the Canadian Internet Registration Authority (CIRA). Blocks malware, phishing & adult content | [HTTPS][canadianshield-family-https-signed], [TLS][canadianshield-family-tls-signed]             | [HTTPS][canadianshield-family-https], [TLS][canadianshield-family-tls]             |
| [Cleanbrowsing Family Filter][cleanbrowsing-family]                                  | 🇺🇸     | Yes        | Filters malware & adult, mixed content                                                                    | [HTTPS][cleanbrowsing-family-https-signed], [TLS][cleanbrowsing-family-tls-signed]               | [HTTPS][cleanbrowsing-family-https], [TLS][cleanbrowsing-family-tls]               |
| [Cleanbrowsing Adult Filter][cleanbrowsing-adult]                                    | 🇺🇸     | Yes        | Filters malware & adult content                                                                           | [HTTPS][cleanbrowsing-adult-https-signed], [TLS][cleanbrowsing-adult-tls-signed]                 | [HTTPS][cleanbrowsing-adult-https], [TLS][cleanbrowsing-adult-tls]                 |
| [Cleanbrowsing Security Filter][cleanbrowsing-security]                              | 🇺🇸     | Yes        | Filters malware                                                                                           | [HTTPS][cleanbrowsing-security-https-signed], [TLS][cleanbrowsing-security-tls-signed]           | [HTTPS][cleanbrowsing-security-https], [TLS][cleanbrowsing-security-tls]           |
| [Cloudflare 1.1.1.1][cloudflare-default]                                             | 🇺🇸     | No         | Operated by Cloudflare Inc.                                                                               | [HTTPS][cloudflare-default-https-signed], [TLS][cloudflare-default-tls-signed]                   | [HTTPS][cloudflare-default-https], [TLS][cloudflare-default-tls]                   |
| [Cloudflare 1.1.1.1 Security][cloudflare-malware]                                    | 🇺🇸     | Yes        | Operated by Cloudflare Inc. Blocks malware & phishing                                                     | [HTTPS][cloudflare-malware-https-signed]                                                         | [HTTPS][cloudflare-malware-https]                                                  |
| [Cloudflare 1.1.1.1 Family][cloudflare-family]                                       | 🇺🇸     | Yes        | Operated by Cloudflare Inc. Blocks malware, phishing & adult content                                      | [HTTPS][cloudflare-family-https-signed]                                                          | [HTTPS][cloudflare-family-https]                                                   |
| [DNS4EU][dns4eu-default]                                                             | 🇨🇿     | No         | Operated by a consortium lead by Whalebone.                                                               | [HTTPS][dns4eu-default-https-signed], [TLS][dns4eu-default-tls-signed]                           | [HTTPS][dns4eu-default-https], [TLS][dns4eu-default-tls]                           |
| [DNS4EU Protective][dns4eu-malware]                                                  | 🇨🇿     | Yes        | Operated by a consortium lead by Whalebone. Blocks Malware.                                               | [HTTPS][dns4eu-malware-https-signed], [TLS][dns4eu-malware-tls-signed]                           | [HTTPS][dns4eu-malware-https], [TLS][dns4eu-malware-tls]                           |
| [DNS4EU Protective ad-blocking][dns4eu-protective-ads]                               | 🇨🇿     | Yes        | Operated by a consortium lead by Whalebone. Blocks Malware and Ads                                        | [HTTPS][dns4eu-protective-ads-https-signed], [TLS][dns4eu-protective-ads-tls-signed]             | [HTTPS][dns4eu-protective-ads-https], [TLS][dns4eu-protective-ads-tls]             |
| [DNS4EU Protective with child protection][dns4eu-protective-child]                   | 🇨🇿     | Yes        | Operated by a consortium lead by Whalebone. Blocks malware and explicit content.                          | [HTTPS][dns4eu-protective-child-https-signed], [TLS][dns4eu-protective-child-tls-signed]         | [HTTPS][dns4eu-protective-child-https], [TLS][dns4eu-protective-child-tls]         |
| [DNS4EU Protective with child protection & ad-blocking][dns4eu-protective-child-ads] | 🇨🇿     | Yes        | Operated by a consortium lead by Whalebone. Blocks Malware, Ads and explicit content                      | [HTTPS][dns4eu-protective-child-ads-https-signed], [TLS][dns4eu-protective-child-ads-tls-signed] | [HTTPS][dns4eu-protective-child-ads-https], [TLS][dns4eu-protective-child-ads-tls] |
| [DNSPod Public DNS][dnspod-default]                                                  | 🇨🇳     | No         | Operated by DNSPod Inc., a Tencent Cloud Company                                                          | [HTTPS][dnspod-default-https-signed], [TLS][dnspod-default-tls-signed]                           | [HTTPS][dnspod-default-https], [TLS][dnspod-default-tls]                           |
| [FDN][fdn-default]                                                                   | 🇫🇷     | No         | Operated by French Data Network                                                                           | [HTTPS][fdn-default-https-signed], [TLS][fdn-default-tls-signed]                                 | [HTTPS][fdn-default-https], [TLS][fdn-default-tls]                                 |
| [FFMUC-DNS][ffmuc-dns-default]                                                       | 🇩🇪     | No         | FFMUC free DNS servers provided by Freifunk München.                                                      | [HTTPS][ffmuc-dns-default-https-signed], [TLS][ffmuc-dns-default-tls-signed]                     | [HTTPS][ffmuc-dns-default-https], [TLS][ffmuc-dns-default-tls]                     |
| [Google Public DNS][google-default]                                                  | 🇺🇸     | No         | Operated by Google LLC                                                                                    | [HTTPS][google-default-https-signed], [TLS][google-default-tls-signed]                           | [HTTPS][google-default-https], [TLS][google-default-tls]                           |
| [keweonDNS][keweondns-default]                                                       | 🇩🇪     | No         | Operated by Aviontex. Blocks ads & tracking                                                               | [HTTPS][keweondns-default-https-signed], [TLS][keweondns-default-tls-signed]                     | [HTTPS][keweondns-default-https], [TLS][keweondns-default-tls]                     |
| [Mullvad DNS][mullvad-default]                                                       | 🇸🇪     | Yes        | Operated by Mullvad VPN AB                                                                                | [HTTPS][mullvad-default-https-signed]                                                            | [HTTPS][mullvad-default-https]                                                     |
| [Mullvad DNS Adblock][mullvad-adblock]                                               | 🇸🇪     | Yes        | Operated by Mullvad VPN AB. Blocks ads & tracking                                                         | [HTTPS][mullvad-adblock-https-signed]                                                            | [HTTPS][mullvad-adblock-https]                                                     |
| [OpenDNS Standard][opendns-default]                                                  | 🇺🇸     | No         | Operated by Cisco OpenDNS LLC                                                                             | [HTTPS][opendns-default-https-signed]                                                            | [HTTPS][opendns-default-https]                                                     |
| [OpenDNS FamilyShield][opendns-family]                                               | 🇺🇸     | Yes        | Operated by Cisco OpenDNS LLC. Blocks malware & adult content                                             | [HTTPS][opendns-family-https-signed]                                                             | [HTTPS][opendns-family-https]                                                      |
| [Quad9][quad9-default]                                                               | 🇨🇭     | Yes        | Operated by Quad9 Foundation. Blocks malware                                                              | [HTTPS][quad9-default-https-signed], [TLS][quad9-default-tls-signed]                             | [HTTPS][quad9-default-https], [TLS][quad9-default-tls]                             |
| [Quad9 w/ ECS][quad9-ECS]                                                            | 🇨🇭     | Yes        | Operated by Quad9 Foundation. Supports ECS. Blocks malware                                                | [HTTPS][quad9-ECS-https-signed], [TLS][quad9-ECS-tls-signed]                                     | [HTTPS][quad9-ECS-https], [TLS][quad9-ECS-tls]                                     |
| [Quad9 Unfiltered][quad9-nofilter]                                                   | 🇨🇭     | No         | Operated by Quad9 Foundation.                                                                             | [HTTPS][quad9-nofilter-https-signed], [TLS][quad9-nofilter-tls-signed]                           | [HTTPS][quad9-nofilter-https], [TLS][quad9-nofilter-tls]                           |
| [Tiarap][tiarapp-default]                                                            | 🇸🇬 🇺🇸  | Yes        | Operated by Tiarap Inc. Blocks ads, tracking, phising & malware                                           | [HTTPS][tiarapp-default-https-signed], [TLS][tiarapp-default-tls-signed]                         | [HTTPS][tiarapp-default-https], [TLS][tiarapp-default-tls]                         |

## Known issues

1. Some apps and protocols will ignore encrypted-dns:
      - Firefox in specific regions, App Store in all regions. [More info](https://github.com/paulmillr/encrypted-dns/issues/22)
      - iCloud Private Relay, VPN clients
      - Little Snitch, LuLu
      - DNS-related CLI tools: `host`, `dig`, `nslookup` etc.
2. [Wi-Fi captive portals](https://en.wikipedia.org/wiki/Captive_portal) in cafes, hotels, airports are exempted by Apple from eDNS rules; to simplify authentication - this is ok
3. TLS DNS is easier for providers to block, because it uses non-standard port 853.
  [More info](https://security.googleblog.com/2022/07/dns-over-http3-in-android.html)
4. e-dns over TOR could be better privacy-wise, but we don't have this for now.

## Contributing

- **To add / edit a profile:** edit json files in `src` directory.
- **To verify resolver IPs / hostnames:** compare mobileconfig files to their original websites (open files in a text editor).
- Check out [developer.apple.com](https://developer.apple.com/documentation/devicemanagement/dnssettings) for more docs.
- **On demand activation:** You can optionally exclude some trusted Wi-Fi networks where you don't want to use encrypted DNS. To do so, add your SSIDs in the [OnDemandRules](https://github.com/paulmillr/encrypted-dns/blob/master/profiles/template-on-demand.mobileconfig#L22-L38) section inside the `PayloadContent` dictionary of a profile.

### Scripts

- `npm run build` - re-build profiles, signed profiles, READMEs
- `npm run sign` - re-sign all profiles (updates `signature` field) using an ECC SSL certificate.
    - Signing is done using [key-producer](https://github.com/paulmillr/micro-key-producer)
    - Let's Encrypt free certificates are OK, but [expire in 45 days](https://letsencrypt.org/2026/02/24/rate-limits-45-day-certs).
    - Expects following files to be present in `certs` subdirectory:

    ```
    `privkey.pem`  : the private key for your certificate.
    `fullchain.pem`: the certificate file used in most server software.
    `chain.pem`    : used for OCSP stapling in Nginx >=1.3.7.
    `cert.pem`
    ```

- `npm run new` - interactively creates new profile from CLI options. Can also be ran with flags.
    - `scripts/new.test.ts` includes CLI snapshot tests and a PTY interactive flow test.
    - PTY test runs by default; set `NEW_TEST_PTY=0` to opt out.
- `src/scripts/sign-single.ts --ca cert.pem --priv_key key.pem [--chain chain.pem] path.mobileconfig` - sings single mobileconfig
- `src/scripts/sign-single-openssl.ts --ca cert.pem --priv_key key.pem [--chain chain.pem] path.mobileconfig` Sign one `.mobileconfig` using OpenSSL.
    - Uses `-nosmimecap` to match local CMS signing policy.
- `src/scripts/detach.ts signed.mobileconfig` - detach CMS signature from signed profile and print PEM to stdout.
- `npm run test` - Parity check for `sign-single.ts` vs `sign-single-openssl.sh`.
    - Generates temporary test root/signer certificates and keys via OpenSSL.
    - Signs the same profile with `scripts/sign.ts` and `scripts/sign_openssl.sh`.
    - Verifies detached content and embedded certificate set parity.

[360-default]: https://sdns.360.net/dnsPublic.html
[360-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/360-default-https.mobileconfig
[adguard-default]: https://adguard-dns.io/kb/general/dns-providers/#default
[adguard-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-https.mobileconfig
[adguard-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-tls.mobileconfig
[adguard-family]: https://adguard-dns.io/kb/general/dns-providers/#family-protection
[adguard-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-https.mobileconfig
[adguard-family-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-tls.mobileconfig
[adguard-nofilter]: https://adguard-dns.io/kb/general/dns-providers/#non-filtering
[adguard-nofilter-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-https.mobileconfig
[adguard-nofilter-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-tls.mobileconfig
[alekberg-default]: https://alekberg.net
[alekberg-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alekberg-default-https.mobileconfig
[alibaba-default]: https://www.alidns.com/
[alibaba-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-default-https.mobileconfig
[alibaba-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-default-tls.mobileconfig
[blahdns-cdn-adblock]: https://blahdns.com/
[blahdns-cdn-adblock-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-adblock-https.mobileconfig
[blahdns-cdn-unfiltered]: https://blahdns.com/
[blahdns-cdn-unfiltered-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-unfiltered-https.mobileconfig
[blahdns-germany]: https://blahdns.com/
[blahdns-germany-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-germany-https.mobileconfig
[blahdns-singapore]: https://blahdns.com/
[blahdns-singapore-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-singapore-https.mobileconfig
[canadianshield-private]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadianshield-private-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-https.mobileconfig
[canadianshield-private-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-tls.mobileconfig
[canadianshield-protected]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadianshield-protected-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-https.mobileconfig
[canadianshield-protected-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-tls.mobileconfig
[canadianshield-family]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadianshield-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-https.mobileconfig
[canadianshield-family-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-tls.mobileconfig
[cleanbrowsing-family]: https://cleanbrowsing.org/filters/
[cleanbrowsing-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-family-https.mobileconfig
[cleanbrowsing-family-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-family-tls.mobileconfig
[cleanbrowsing-adult]: https://cleanbrowsing.org/filters/
[cleanbrowsing-adult-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-adult-https.mobileconfig
[cleanbrowsing-adult-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-adult-tls.mobileconfig
[cleanbrowsing-security]: https://cleanbrowsing.org/filters/
[cleanbrowsing-security-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-security-https.mobileconfig
[cleanbrowsing-security-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-security-tls.mobileconfig
[cloudflare-default]: https://developers.cloudflare.com/1.1.1.1/encryption/
[cloudflare-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-default-https.mobileconfig
[cloudflare-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-default-tls.mobileconfig
[cloudflare-malware]: https://developers.cloudflare.com/1.1.1.1/encryption/
[cloudflare-malware-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-malware-https.mobileconfig
[cloudflare-family]: https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families
[cloudflare-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-family-https.mobileconfig
[dns4eu-default]: https://www.joindns4.eu/for-public
[dns4eu-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-default-https.mobileconfig
[dns4eu-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-default-tls.mobileconfig
[dns4eu-malware]: https://www.joindns4.eu/for-public
[dns4eu-malware-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-malware-https.mobileconfig
[dns4eu-malware-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-malware-tls.mobileconfig
[dns4eu-protective-ads]: https://www.joindns4.eu/for-public
[dns4eu-protective-ads-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-ads-https.mobileconfig
[dns4eu-protective-ads-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-ads-tls.mobileconfig
[dns4eu-protective-child]: https://www.joindns4.eu/for-public
[dns4eu-protective-child-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-https.mobileconfig
[dns4eu-protective-child-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-tls.mobileconfig
[dns4eu-protective-child-ads]: https://www.joindns4.eu/for-public
[dns4eu-protective-child-ads-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-ads-https.mobileconfig
[dns4eu-protective-child-ads-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-ads-tls.mobileconfig
[dnspod-default]: https://www.dnspod.com/products/public.dns
[dnspod-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-default-https.mobileconfig
[dnspod-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-default-tls.mobileconfig
[fdn-default]: https://www.fdn.fr/actions/dns/
[fdn-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/fdn-default-https.mobileconfig
[fdn-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/fdn-default-tls.mobileconfig
[ffmuc-dns-default]: https://ffmuc.net/wiki/knb:dohdot_en
[ffmuc-dns-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/ffmuc-dns-default-https.mobileconfig
[ffmuc-dns-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/ffmuc-dns-default-tls.mobileconfig
[google-default]: https://developers.google.com/speed/public-dns/docs/secure-transports
[google-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-default-https.mobileconfig
[google-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-default-tls.mobileconfig
[keweondns-default]: https://forum.xda-developers.com/t/keweondns-info-facts-and-what-is-keweon-actually.4576651/
[keweondns-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-default-https.mobileconfig
[keweondns-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-default-tls.mobileconfig
[mullvad-default]: https://mullvad.net/help/dns-over-https-and-dns-over-tls/
[mullvad-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-default-https.mobileconfig
[mullvad-adblock]: https://mullvad.net/help/dns-over-https-and-dns-over-tls/
[mullvad-adblock-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-adblock-https.mobileconfig
[opendns-default]: https://support.opendns.com/hc/articles/360038086532
[opendns-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-default-https.mobileconfig
[opendns-family]: https://support.opendns.com/hc/articles/360038086532
[opendns-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-family-https.mobileconfig
[quad9-default]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-default-https.mobileconfig
[quad9-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-default-tls.mobileconfig
[quad9-ECS]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-ECS-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-https.mobileconfig
[quad9-ECS-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-tls.mobileconfig
[quad9-nofilter]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-nofilter-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-nofilter-https.mobileconfig
[quad9-nofilter-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-nofilter-tls.mobileconfig
[tiarapp-default]: https://doh.tiar.app
[tiarapp-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-default-https.mobileconfig
[tiarapp-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-default-tls.mobileconfig
[360-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/360-default-https.mobileconfig
[adguard-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-default-https.mobileconfig
[adguard-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-default-tls.mobileconfig
[adguard-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-family-https.mobileconfig
[adguard-family-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-family-tls.mobileconfig
[adguard-nofilter-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-nofilter-https.mobileconfig
[adguard-nofilter-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-nofilter-tls.mobileconfig
[alekberg-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alekberg-default-https.mobileconfig
[alibaba-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alibaba-default-https.mobileconfig
[alibaba-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alibaba-default-tls.mobileconfig
[blahdns-cdn-adblock-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-cdn-adblock-https.mobileconfig
[blahdns-cdn-unfiltered-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-cdn-unfiltered-https.mobileconfig
[blahdns-germany-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-germany-https.mobileconfig
[blahdns-singapore-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-singapore-https.mobileconfig
[canadianshield-private-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-private-https.mobileconfig
[canadianshield-private-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-private-tls.mobileconfig
[canadianshield-protected-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-protected-https.mobileconfig
[canadianshield-protected-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-protected-tls.mobileconfig
[canadianshield-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-family-https.mobileconfig
[canadianshield-family-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-family-tls.mobileconfig
[cleanbrowsing-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-family-https.mobileconfig
[cleanbrowsing-family-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-family-tls.mobileconfig
[cleanbrowsing-adult-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-adult-https.mobileconfig
[cleanbrowsing-adult-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-adult-tls.mobileconfig
[cleanbrowsing-security-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-security-https.mobileconfig
[cleanbrowsing-security-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-security-tls.mobileconfig
[cloudflare-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-default-https.mobileconfig
[cloudflare-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-default-tls.mobileconfig
[cloudflare-malware-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-malware-https.mobileconfig
[cloudflare-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-family-https.mobileconfig
[dns4eu-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-default-https.mobileconfig
[dns4eu-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-default-tls.mobileconfig
[dns4eu-malware-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-malware-https.mobileconfig
[dns4eu-malware-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-malware-tls.mobileconfig
[dns4eu-protective-ads-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-ads-https.mobileconfig
[dns4eu-protective-ads-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-ads-tls.mobileconfig
[dns4eu-protective-child-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-https.mobileconfig
[dns4eu-protective-child-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-tls.mobileconfig
[dns4eu-protective-child-ads-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-ads-https.mobileconfig
[dns4eu-protective-child-ads-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-ads-tls.mobileconfig
[dnspod-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dnspod-default-https.mobileconfig
[dnspod-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dnspod-default-tls.mobileconfig
[fdn-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/fdn-default-https.mobileconfig
[fdn-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/fdn-default-tls.mobileconfig
[ffmuc-dns-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/ffmuc-dns-default-https.mobileconfig
[ffmuc-dns-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/ffmuc-dns-default-tls.mobileconfig
[google-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/google-default-https.mobileconfig
[google-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/google-default-tls.mobileconfig
[keweondns-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/keweondns-default-https.mobileconfig
[keweondns-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/keweondns-default-tls.mobileconfig
[mullvad-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/mullvad-default-https.mobileconfig
[mullvad-adblock-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/mullvad-adblock-https.mobileconfig
[opendns-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-default-https.mobileconfig
[opendns-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-family-https.mobileconfig
[quad9-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-default-https.mobileconfig
[quad9-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-default-tls.mobileconfig
[quad9-ECS-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-ECS-https.mobileconfig
[quad9-ECS-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-ECS-tls.mobileconfig
[quad9-nofilter-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-nofilter-https.mobileconfig
[quad9-nofilter-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-nofilter-tls.mobileconfig
[tiarapp-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/tiarapp-default-https.mobileconfig
[tiarapp-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/tiarapp-default-tls.mobileconfig

