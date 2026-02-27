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

| Name                                                                                 | Region | Censorship | Notes                                                                                                     | Install                                                                                                          | Install (unsigned)                                                                                 |
| ------------------------------------------------------------------------------------ | ------ | ---------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-dns]                                                          | 🇨🇳     | Yes        | Operated by 360 Digital Security Group                                                                    | [HTTPS][360-dns-profile-https-signed]                                                                            | [HTTPS][360-dns-profile-https]                                                                     |
| [AdGuard DNS Default][adguard-dns-default]                                           | 🇷🇺     | Yes        | Operated by AdGuard Software Ltd. Blocks ads, tracking & phishing                                         | [HTTPS][adguard-dns-default-profile-https-signed], [TLS][adguard-dns-default-profile-tls-signed]                 | [HTTPS][adguard-dns-default-profile-https], [TLS][adguard-dns-default-profile-tls]                 |
| [AdGuard DNS Family Protection][adguard-dns-family]                                  | 🇷🇺     | Yes        | Operated by AdGuard Software Ltd. Blocks `Default` + malware & adult content                              | [HTTPS][adguard-dns-family-profile-https-signed], [TLS][adguard-dns-family-profile-tls-signed]                   | [HTTPS][adguard-dns-family-profile-https], [TLS][adguard-dns-family-profile-tls]                   |
| [AdGuard DNS Non-filtering][adguard-dns-unfiltered]                                  | 🇷🇺     | No         | Operated by AdGuard Software Ltd. Non-filtering                                                           | [HTTPS][adguard-dns-unfiltered-profile-https-signed], [TLS][adguard-dns-unfiltered-profile-tls-signed]           | [HTTPS][adguard-dns-unfiltered-profile-https], [TLS][adguard-dns-unfiltered-profile-tls]           |
| [Alekberg Encrypted DNS][alekberg-dns]                                               | 🇳🇱     | No         | Independent                                                                                               | [HTTPS][alekberg-dns-profile-https-signed]                                                                       | [HTTPS][alekberg-dns-profile-https]                                                                |
| [Aliyun Public DNS][aliyun-dns]                                                      | 🇨🇳     | No         | Operated by Alibaba Cloud Ltd.                                                                            | [HTTPS][aliyun-dns-profile-https-signed], [TLS][aliyun-dns-profile-tls-signed]                                   | [HTTPS][aliyun-dns-profile-https], [TLS][aliyun-dns-profile-tls]                                   |
| [BlahDNS CDN Filtered][blahdns]                                                      | 🇺🇸     | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS][blahdns-cdn-filtered-profile-https-signed]                                                               | [HTTPS][blahdns-cdn-filtered-profile-https]                                                        |
| [BlahDNS CDN Unfiltered][blahdns]                                                    | 🇺🇸     | No         | Independent. Non-filtering                                                                                | [HTTPS][blahdns-cdn-unfiltered-profile-https-signed]                                                             | [HTTPS][blahdns-cdn-unfiltered-profile-https]                                                      |
| [BlahDNS Germany][blahdns]                                                           | 🇩🇪     | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS][blahdns-germany-profile-https-signed]                                                                    | [HTTPS][blahdns-germany-profile-https]                                                             |
| [BlahDNS Singapore][blahdns]                                                         | 🇸🇬     | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS][blahdns-singapore-profile-https-signed]                                                                  | [HTTPS][blahdns-singapore-profile-https]                                                           |
| [Canadian Shield Private][canadian-shield]                                           | 🇨🇦     | No         | Operated by the Canadian Internet Registration Authority (CIRA)                                           | [HTTPS][canadian-shield-private-profile-https-signed], [TLS][canadian-shield-private-profile-tls-signed]         | [HTTPS][canadian-shield-private-profile-https], [TLS][canadian-shield-private-profile-tls]         |
| [Canadian Shield Protected][canadian-shield]                                         | 🇨🇦     | Yes        | Operated by the Canadian Internet Registration Authority (CIRA). Blocks malware & phishing                | [HTTPS][canadian-shield-protected-profile-https-signed], [TLS][canadian-shield-protected-profile-tls-signed]     | [HTTPS][canadian-shield-protected-profile-https], [TLS][canadian-shield-protected-profile-tls]     |
| [Canadian Shield Family][canadian-shield]                                            | 🇨🇦     | Yes        | Operated by the Canadian Internet Registration Authority (CIRA). Blocks malware, phishing & adult content | [HTTPS][canadian-shield-family-profile-https-signed], [TLS][canadian-shield-family-profile-tls-signed]           | [HTTPS][canadian-shield-family-profile-https], [TLS][canadian-shield-family-profile-tls]           |
| [Cleanbrowsing Family Filter][cleanbrowsing]                                         | 🇺🇸     | Yes        | Filters malware & adult, mixed content                                                                    | [HTTPS][cleanbrowsing-family-https-signed], [TLS][cleanbrowsing-family-tls-signed]                               | [HTTPS][cleanbrowsing-family-https], [TLS][cleanbrowsing-family-tls]                               |
| [Cleanbrowsing Adult Filter][cleanbrowsing]                                          | 🇺🇸     | Yes        | Filters malware & adult content                                                                           | [HTTPS][cleanbrowsing-adult-https-signed], [TLS][cleanbrowsing-adult-tls-signed]                                 | [HTTPS][cleanbrowsing-adult-https], [TLS][cleanbrowsing-adult-tls]                                 |
| [Cleanbrowsing Security Filter][cleanbrowsing]                                       | 🇺🇸     | Yes        | Filters malware                                                                                           | [HTTPS][cleanbrowsing-security-https-signed], [TLS][cleanbrowsing-security-tls-signed]                           | [HTTPS][cleanbrowsing-security-https], [TLS][cleanbrowsing-security-tls]                           |
| [Cloudflare 1.1.1.1][cloudflare-dns]                                                 | 🇺🇸     | No         | Operated by Cloudflare Inc.                                                                               | [HTTPS][cloudflare-dns-profile-https-signed], [TLS][cloudflare-dns-profile-tls-signed]                           | [HTTPS][cloudflare-dns-profile-https], [TLS][cloudflare-dns-profile-tls]                           |
| [Cloudflare 1.1.1.1 Security][cloudflare-dns-family]                                 | 🇺🇸     | Yes        | Operated by Cloudflare Inc. Blocks malware & phishing                                                     | [HTTPS][cloudflare-dns-security-profile-https-signed]                                                            | [HTTPS][cloudflare-dns-security-profile-https]                                                     |
| [Cloudflare 1.1.1.1 Family][cloudflare-dns-family]                                   | 🇺🇸     | Yes        | Operated by Cloudflare Inc. Blocks malware, phishing & adult content                                      | [HTTPS][cloudflare-dns-family-profile-https-signed]                                                              | [HTTPS][cloudflare-dns-family-profile-https]                                                       |
| [DNS4EU][dns4eu]                                                                     | 🇨🇿     | No         | Operated by a consortium lead by Whalebone.                                                               | [HTTPS][dns4eu-profile-https-signed], [TLS][dns4eu-profile-tls-signed]                                           | [HTTPS][dns4eu-profile-https], [TLS][dns4eu-profile-tls]                                           |
| [DNS4EU Protective][dns4eu-malware]                                                  | 🇨🇿     | Yes        | Operated by a consortium lead by Whalebone. Blocks Malware.                                               | [HTTPS][dns4eu-profile-malware-https-signed], [TLS][dns4eu-profile-malware-tls-signed]                           | [HTTPS][dns4eu-profile-malware-https], [TLS][dns4eu-profile-malware-tls]                           |
| [DNS4EU Protective ad-blocking][dns4eu-protective-ads]                               | 🇨🇿     | Yes        | Operated by a consortium lead by Whalebone. Blocks Malware and Ads                                        | [HTTPS][dns4eu-profile-protective-ads-https-signed], [TLS][dns4eu-profile-protective-ads-tls-signed]             | [HTTPS][dns4eu-profile-protective-ads-https], [TLS][dns4eu-profile-protective-ads-tls]             |
| [DNS4EU Protective with child protection][dns4eu-protective-child]                   | 🇨🇿     | Yes        | Operated by a consortium lead by Whalebone. Blocks malware and explicit content.                          | [HTTPS][dns4eu-profile-protective-child-https-signed], [TLS][dns4eu-profile-protective-child-tls-signed]         | [HTTPS][dns4eu-profile-protective-child-https], [TLS][dns4eu-profile-protective-child-tls]         |
| [DNS4EU Protective with child protection & ad-blocking][dns4eu-protective-child-ads] | 🇨🇿     | Yes        | Operated by a consortium lead by Whalebone. Blocks Malware, Ads and explicit content                      | [HTTPS][dns4eu-profile-protective-child-ads-https-signed], [TLS][dns4eu-profile-protective-child-ads-tls-signed] | [HTTPS][dns4eu-profile-protective-child-ads-https], [TLS][dns4eu-profile-protective-child-ads-tls] |
| [DNSPod Public DNS][dnspod-dns]                                                      | 🇨🇳     | No         | Operated by DNSPod Inc., a Tencent Cloud Company                                                          | [HTTPS][dnspod-dns-profile-https-signed], [TLS][dnspod-dns-profile-tls-signed]                                   | [HTTPS][dnspod-dns-profile-https], [TLS][dnspod-dns-profile-tls]                                   |
| [FDN][fdn-dns]                                                                       | 🇫🇷     | No         | Operated by French Data Network                                                                           | [HTTPS][fdn-https-signed], [TLS][fdn-tls-signed]                                                                 | [HTTPS][fdn-https], [TLS][fdn-tls]                                                                 |
| [FFMUC-DNS][ffmucdns]                                                                | 🇩🇪     | No         | FFMUC free DNS servers provided by Freifunk München.                                                      | [HTTPS][ffmuc-profile-https-signed], [TLS][ffmuc-profile-tls-signed]                                             | [HTTPS][ffmuc-profile-https], [TLS][ffmuc-profile-tls]                                             |
| [Google Public DNS][google-dns]                                                      | 🇺🇸     | No         | Operated by Google LLC                                                                                    | [HTTPS][google-dns-profile-https-signed], [TLS][google-dns-profile-tls-signed]                                   | [HTTPS][google-dns-profile-https], [TLS][google-dns-profile-tls]                                   |
| [keweonDNS][keweondns]                                                               | 🇩🇪     | No         | Operated by Aviontex. Blocks ads & tracking                                                               | [HTTPS][keweondns-profile-https-signed], [TLS][keweondns-profile-tls-signed]                                     | [HTTPS][keweondns-profile-https], [TLS][keweondns-profile-tls]                                     |
| [Mullvad DNS][mullvad-dns]                                                           | 🇸🇪     | Yes        | Operated by Mullvad VPN AB                                                                                | [HTTPS][mullvad-dns-profile-https-signed]                                                                        | [HTTPS][mullvad-dns-profile-https]                                                                 |
| [Mullvad DNS Adblock][mullvad-dns]                                                   | 🇸🇪     | Yes        | Operated by Mullvad VPN AB. Blocks ads & tracking                                                         | [HTTPS][mullvad-dns-adblock-profile-https-signed]                                                                | [HTTPS][mullvad-dns-adblock-profile-https]                                                         |
| [OpenDNS Standard][opendns]                                                          | 🇺🇸     | No         | Operated by Cisco OpenDNS LLC                                                                             | [HTTPS][opendns-standard-profile-https-signed]                                                                   | [HTTPS][opendns-standard-profile-https]                                                            |
| [OpenDNS FamilyShield][opendns]                                                      | 🇺🇸     | Yes        | Operated by Cisco OpenDNS LLC. Blocks malware & adult content                                             | [HTTPS][opendns-familyshield-profile-https-signed]                                                               | [HTTPS][opendns-familyshield-profile-https]                                                        |
| [Quad9][quad9]                                                                       | 🇨🇭     | Yes        | Operated by Quad9 Foundation. Blocks malware                                                              | [HTTPS][quad9-profile-https-signed], [TLS][quad9-profile-tls-signed]                                             | [HTTPS][quad9-profile-https], [TLS][quad9-profile-tls]                                             |
| [Quad9 w/ ECS][quad9]                                                                | 🇨🇭     | Yes        | Operated by Quad9 Foundation. Supports ECS. Blocks malware                                                | [HTTPS][quad9-ecs-profile-https-signed], [TLS][quad9-ecs-profile-tls-signed]                                     | [HTTPS][quad9-ecs-profile-https], [TLS][quad9-ecs-profile-tls]                                     |
| [Quad9 Unfiltered][quad9]                                                            | 🇨🇭     | No         | Operated by Quad9 Foundation.                                                                             | [HTTPS][quad9-profile-unfiltered-https-signed], [TLS][quad9-profile-unfiltered-tls-signed]                       | [HTTPS][quad9-profile-unfiltered-https], [TLS][quad9-profile-unfiltered-tls]                       |
| [Tiarap][tiarap]                                                                     | 🇸🇬 🇺🇸  | Yes        | Operated by Tiarap Inc. Blocks ads, tracking, phising & malware                                           | [HTTPS][tiarap-profile-https-signed], [TLS][tiarap-profile-tls-signed]                                           | [HTTPS][tiarap-profile-https], [TLS][tiarap-profile-tls]                                           |

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
- `node scripts/sign-single.ts --ca cert.pem --priv_key key.pem [--chain chain.pem] path.mobileconfig` - sings single mobileconfig
- `node scripts/sign-single-openssl.ts --ca cert.pem --priv_key key.pem [--chain chain.pem] path.mobileconfig` Sign one `.mobileconfig` using OpenSSL.
    - Uses `-nosmimecap` to match local CMS signing policy.
- `node scripts/detach.ts signed.mobileconfig` - detach CMS signature from signed profile and print PEM to stdout.
- `node test/sign-single.test.ts` - Parity check for `sign-single.ts` vs `sign-single-openssl.sh`.
    - Runs under `npm run test`.
    - Generates temporary test root/signer certificates and keys via OpenSSL.
    - Signs the same profile with `scripts/sign.ts` and `scripts/sign_openssl.sh`.
    - Verifies detached content and embedded certificate set parity.

[360-dns]: https://sdns.360.net/dnsPublic.html
[360-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/360-https.mobileconfig
[adguard-dns-default]: https://adguard-dns.io/kb/general/dns-providers/#default
[adguard-dns-default-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-https.mobileconfig
[adguard-dns-default-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-tls.mobileconfig
[adguard-dns-family]: https://adguard-dns.io/kb/general/dns-providers/#family-protection
[adguard-dns-family-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-https.mobileconfig
[adguard-dns-family-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-tls.mobileconfig
[adguard-dns-unfiltered]: https://adguard-dns.io/kb/general/dns-providers/#non-filtering
[adguard-dns-unfiltered-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-https.mobileconfig
[adguard-dns-unfiltered-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-tls.mobileconfig
[alekberg-dns]: https://alekberg.net
[alekberg-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alekberg-https.mobileconfig
[aliyun-dns]: https://www.alidns.com/
[aliyun-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-https.mobileconfig
[aliyun-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-tls.mobileconfig
[blahdns]: https://blahdns.com/
[blahdns-cdn-filtered-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-adblock-https.mobileconfig
[blahdns-cdn-unfiltered-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-unfiltered-https.mobileconfig
[blahdns-germany-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-germany-https.mobileconfig
[blahdns-singapore-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-singapore-https.mobileconfig
[canadian-shield]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadian-shield-private-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-https.mobileconfig
[canadian-shield-private-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-tls.mobileconfig
[canadian-shield-protected-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-https.mobileconfig
[canadian-shield-protected-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-tls.mobileconfig
[canadian-shield-family-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-https.mobileconfig
[canadian-shield-family-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-tls.mobileconfig
[cleanbrowsing]: https://cleanbrowsing.org/filters/
[cleanbrowsing-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-family-https.mobileconfig
[cleanbrowsing-family-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-family-tls.mobileconfig
[cleanbrowsing-adult-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-adult-https.mobileconfig
[cleanbrowsing-adult-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-adult-tls.mobileconfig
[cleanbrowsing-security-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-security-https.mobileconfig
[cleanbrowsing-security-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-security-tls.mobileconfig
[cloudflare-dns]: https://developers.cloudflare.com/1.1.1.1/encryption/
[cloudflare-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-https.mobileconfig
[cloudflare-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-tls.mobileconfig
[cloudflare-dns-security-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-malware-https.mobileconfig
[cloudflare-dns-family]: https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families
[cloudflare-dns-family-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-family-https.mobileconfig
[dnspod-dns]: https://www.dnspod.com/products/public.dns
[dnspod-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-https.mobileconfig
[dnspod-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-tls.mobileconfig
[fdn-dns]: https://www.fdn.fr/actions/dns/
[fdn-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/fdn-https.mobileconfig
[fdn-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/fdn-tls.mobileconfig
[google-dns]: https://developers.google.com/speed/public-dns/docs/secure-transports
[google-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-https.mobileconfig
[google-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-tls.mobileconfig
[keweondns]: https://forum.xda-developers.com/t/keweondns-info-facts-and-what-is-keweon-actually.4576651/
[keweondns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-https.mobileconfig
[keweondns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-tls.mobileconfig
[mullvad-dns]: https://mullvad.net/help/dns-over-https-and-dns-over-tls/
[mullvad-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-https.mobileconfig
[mullvad-dns-adblock-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-adblock-https.mobileconfig
[opendns]: https://support.opendns.com/hc/articles/360038086532
[opendns-standard-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-https.mobileconfig
[opendns-familyshield-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-family-https.mobileconfig
[quad9]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-https.mobileconfig
[quad9-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-tls.mobileconfig
[quad9-ecs-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-https.mobileconfig
[quad9-ecs-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-tls.mobileconfig
[quad9-profile-unfiltered-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-nofilter-https.mobileconfig
[quad9-profile-unfiltered-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-nofilter-tls.mobileconfig
[tiarap]: https://doh.tiar.app
[tiarap-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-https.mobileconfig
[tiarap-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-tls.mobileconfig
[dns4eu]: https://www.joindns4.eu/for-public
[dns4eu-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-https.mobileconfig
[dns4eu-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-tls.mobileconfig
[dns4eu-malware]: https://www.joindns4.eu/for-public
[dns4eu-profile-malware-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-malware-https.mobileconfig
[dns4eu-profile-malware-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-malware-tls.mobileconfig
[dns4eu-protective-ads]: https://www.joindns4.eu/for-public
[dns4eu-profile-protective-ads-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-ads-https.mobileconfig
[dns4eu-profile-protective-ads-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-ads-tls.mobileconfig
[dns4eu-protective-child]: https://www.joindns4.eu/for-public
[dns4eu-profile-protective-child-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-https.mobileconfig
[dns4eu-profile-protective-child-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-tls.mobileconfig
[dns4eu-protective-child-ads]: https://www.joindns4.eu/for-public
[dns4eu-profile-protective-child-ads-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-ads-https.mobileconfig
[dns4eu-profile-protective-child-ads-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-ads-tls.mobileconfig
[ffmucdns]: https://ffmuc.net/wiki/knb:dohdot_en
[ffmuc-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/ffmucdns-https.mobileconfig
[ffmuc-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/ffmucdns-tls.mobileconfig
[360-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/360-https.mobileconfig
[adguard-dns-default-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-default-https.mobileconfig
[adguard-dns-default-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-default-tls.mobileconfig
[adguard-dns-family-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-family-https.mobileconfig
[adguard-dns-family-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-family-tls.mobileconfig
[adguard-dns-unfiltered-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-nofilter-https.mobileconfig
[adguard-dns-unfiltered-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-nofilter-tls.mobileconfig
[alekberg-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alekberg-https.mobileconfig
[aliyun-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alibaba-https.mobileconfig
[aliyun-dns-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alibaba-tls.mobileconfig
[blahdns-cdn-filtered-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-cdn-adblock-https.mobileconfig
[blahdns-cdn-unfiltered-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-cdn-unfiltered-https.mobileconfig
[blahdns-germany-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-germany-https.mobileconfig
[blahdns-singapore-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-singapore-https.mobileconfig
[canadian-shield-private-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-private-https.mobileconfig
[canadian-shield-private-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-private-tls.mobileconfig
[canadian-shield-protected-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-protected-https.mobileconfig
[canadian-shield-protected-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-protected-tls.mobileconfig
[canadian-shield-family-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-family-https.mobileconfig
[canadian-shield-family-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-family-tls.mobileconfig
[cleanbrowsing-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-family-https.mobileconfig
[cleanbrowsing-family-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-family-tls.mobileconfig
[cleanbrowsing-adult-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-adult-https.mobileconfig
[cleanbrowsing-adult-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-adult-tls.mobileconfig
[cleanbrowsing-security-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-security-https.mobileconfig
[cleanbrowsing-security-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-security-tls.mobileconfig
[cloudflare-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-https.mobileconfig
[cloudflare-dns-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-tls.mobileconfig
[cloudflare-dns-security-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-malware-https.mobileconfig
[cloudflare-dns-family-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-family-https.mobileconfig
[dnspod-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dnspod-https.mobileconfig
[dnspod-dns-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dnspod-tls.mobileconfig
[fdn-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/fdn-https.mobileconfig
[fdn-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/fdn-tls.mobileconfig
[google-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/google-https.mobileconfig
[google-dns-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/google-tls.mobileconfig
[keweondns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/keweondns-https.mobileconfig
[keweondns-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/keweondns-tls.mobileconfig
[mullvad-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/mullvad-https.mobileconfig
[mullvad-dns-adblock-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/mullvad-adblock-https.mobileconfig
[opendns-standard-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-https.mobileconfig
[opendns-familyshield-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-family-https.mobileconfig
[quad9-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-https.mobileconfig
[quad9-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-tls.mobileconfig
[quad9-ecs-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-ECS-https.mobileconfig
[quad9-ecs-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-ECS-tls.mobileconfig
[quad9-profile-unfiltered-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-nofilter-https.mobileconfig
[quad9-profile-unfiltered-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-nofilter-tls.mobileconfig
[tiarap-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/tiarapp-https.mobileconfig
[tiarap-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/tiarapp-tls.mobileconfig
[dns4eu-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-https.mobileconfig
[dns4eu-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-tls.mobileconfig
[dns4eu-profile-malware-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-malware-https.mobileconfig
[dns4eu-profile-malware-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-malware-tls.mobileconfig
[dns4eu-profile-protective-ads-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-ads-https.mobileconfig
[dns4eu-profile-protective-ads-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-ads-tls.mobileconfig
[dns4eu-profile-protective-child-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-https.mobileconfig
[dns4eu-profile-protective-child-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-tls.mobileconfig
[dns4eu-profile-protective-child-ads-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-ads-https.mobileconfig
[dns4eu-profile-protective-child-ads-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-ads-tls.mobileconfig
[ffmuc-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/ffmucdns-https.mobileconfig
[ffmuc-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/ffmucdns-tls.mobileconfig

