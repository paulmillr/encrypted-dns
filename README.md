<!-- Generated from src/languages/en.md by npm --prefix src/scripts run build. Edit that file instead. -->
English | [Deutsch](translations/de.md) | [Español](translations/es.md) | [Français](translations/fr.md) | [日本語](translations/ja.md) | [Русский](translations/ru.md) | [Türkçe](translations/tr.md) | [Українська](translations/uk.md) | [简体中文](translations/zh-CN.md) | [繁體中文](translations/zh-TW.md)

# encrypted-dns-configs

Configuration profiles for [DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) and [DNS over TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). Check out the article for more info: [paulmillr.com/posts/encrypted-dns/](https://paulmillr.com/posts/encrypted-dns/). To add a new provider, or edit an existing one: see [CONTRIBUTING.md](CONTRIBUTING.md).

## Usage

Download an HTTPS profile from the table below, then install it.

#### iPhone, iPad

1. Open the link in Safari and tap Allow.
2. Within 8 minutes, open Settings > Profile Downloaded (or General > VPN & Device Management) and tap Install.
    - If installation is refused, Stolen Device Protection may require a familiar location.

#### Mac

1. Make sure the file ends in `.mobileconfig`, not `.mobileconfig.txt`, and double-click it.
2. Open System Settings > General > Device Management (macOS 13–14: Privacy & Security > Profiles), double-click the profile and click Install.

#### Switching profiles

Several profiles can be installed; one is active. Choose it, or "Automatic" for the network's unencrypted DNS:

- iPhone, iPad: Settings > General > VPN, DNS & Device Management > DNS
- Mac: System Settings > Network > VPN & Filters (macOS 13–14: Filters)
- After updating a profile, remove any older copy.

#### Checking it works

- Open your provider's test page, e.g. [1.1.1.1/help](https://1.1.1.1/help) for Cloudflare.

#### Limitations

- Prefer HTTPS: DNS over TLS uses port 853, which is easy to block.
- These skip encrypted DNS: Firefox in some regions, the App Store, Chrome with "Use secure DNS" on, VPNs, iCloud Private Relay, Little Snitch, LuLu, Personal Hotspot devices, CLI tools like `dig`, and Wi-Fi sign-in pages.
- Profiles without `ServerAddresses` look up the resolver's hostname over unencrypted DNS first.

## Providers

Tags show what each profile blocks. *mixed content* blocks sites that mix adult and general content; *unspecified* means the provider lists no categories. Filtering changes the `hostname=IP` answer for blocked hosts and can differ by country.

All profiles, including DNS over TLS and unsigned versions: [ALL-PROFILES.md](ALL-PROFILES.md).

| Provider                                 | Unfiltered                                     | Filtered                                                                                                                                                                                                                                                                                                      | Notes                                                                                        |
| ---------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]          |                                                | [Install][360-default-https-signed] · *unspecified*                                                                                                                                                                                                                                                           | 🇨🇳 by 360 Digital Security Group                                                             |
| [AdGuard DNS][adguard-default]           | [Install][adguard-nofilter-https-signed]       | [Default][adguard-default-https-signed] · *ads*, *tracking*, *phishing*<br>[Family][adguard-family-https-signed] · *malware*, *adult*, *ads*, *tracking*, *phishing* ([details][adguard-family])                                                                                                              | 🇷🇺 by AdGuard Software Ltd.                                                                  |
| [ADNull DNS][adnull-default]             |                                                | [Install][adnull-default-https-signed] · *ads*, *tracking*                                                                                                                                                                                                                                                    | 🇺🇦 by ADNull. Paid plans add personalized DNS and advanced ad and phishing blocking          |
| [Aliyun Public DNS][alibaba-default]     | [Install][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                               | 🇨🇳 by Alibaba Cloud Ltd.                                                                     |
| [BeatQuantum DNS][beatquantum-default]   | [Install][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                               | 🇬🇧 by BeatQuantum Limited. DNSSEC. Classical, hybrid, and post-quantum (ML-KEM) key exchange |
| [BlahDNS][blahdns-germany]               |                                                | [Germany][blahdns-germany-https-signed] · *malware*, *ads*, *tracking*<br>[Singapore][blahdns-singapore-https-signed] · *malware*, *ads*, *tracking*                                                                                                                                                          | 🇩🇪 🇸🇬                                                                                        |
| [Canadian Shield][canadianshield-family] | [Install][canadianshield-private-https-signed] | [Family][canadianshield-family-https-signed] · *malware*, *adult*, *phishing*<br>[Protected][canadianshield-protected-https-signed] · *malware*, *phishing*                                                                                                                                                   | 🇨🇦 by Canadian Internet Registration Authority (CIRA)                                        |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                                | [Adult][cleanbrowsing-adult-https-signed] · *malware*, *adult*, *phishing*<br>[Family][cleanbrowsing-family-https-signed] · *malware*, *adult*, *phishing*, *mixed content*<br>[Security][cleanbrowsing-security-https-signed] · *malware*, *phishing*                                                        | 🇺🇸                                                                                           |
| [Cloudflare 1.1.1.1][cloudflare-default] | [Install][cloudflare-default-https-signed]     | [Family][cloudflare-family-https-signed] · *malware*, *adult*, *phishing* ([details][cloudflare-family])<br>[Security][cloudflare-malware-https-signed] · *malware*, *phishing*                                                                                                                               | 🇺🇸 by Cloudflare Inc.                                                                        |
| [DNS4EU][dns4eu-default]                 | [Install][dns4eu-default-https-signed]         | [Protective][dns4eu-malware-https-signed] · *malware*<br>[Ad-blocking][dns4eu-protective-ads-https-signed] · *malware*, *ads*<br>[Child protection][dns4eu-protective-child-https-signed] · *malware*, *adult*<br>[Child + ad-blocking][dns4eu-protective-child-ads-https-signed] · *malware*, *adult*, *ads* | 🇨🇿 by a Whalebone-led consortium                                                             |
| [DNSPod Public DNS][dnspod-default]      | [Install][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                               | 🇨🇳 by DNSPod Inc. (Tencent Cloud)                                                            |
| [FDN][fdn-default]                       | [Install][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                               | 🇫🇷 by French Data Network                                                                    |
| [FFMUC-DNS][ffmuc-dns-default]           | [Install][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                               | 🇩🇪 by Freifunk München                                                                       |
| [Google Public DNS][google-default]      | [Install][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                               | 🇺🇸 by Google LLC                                                                             |
| [keweonDNS][keweondns-default]           |                                                | [Install][keweondns-default-https-signed] · *ads*, *tracking*                                                                                                                                                                                                                                                 | 🇩🇪 by Aviontex                                                                               |
| [OpenDNS][opendns-family]                | [Install][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *malware*, *adult*                                                                                                                                                                                                                                              | 🇺🇸 by Cisco OpenDNS LLC                                                                      |
| [Quad9][quad9-default]                   | [Install][quad9-nofilter-https-signed]         | [Default][quad9-default-https-signed] · *malware*<br>[w/ ECS][quad9-ECS-https-signed] · *malware*                                                                                                                                                                                                             | 🇨🇭 by Quad9 Foundation                                                                       |
| [Tiarap][tiarapp-default]                |                                                | [Install][tiarapp-default-https-signed] · *malware*, *ads*, *tracking*, *phishing*                                                                                                                                                                                                                            | 🇸🇬 🇺🇸 by Tiarap Inc.                                                                         |
| [Wikimedia DNS][wikimedia-default]       | [Install][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                               | 🇺🇸 by Wikimedia Foundation. Beta service, no availability guarantees                         |

[360-default]: https://sdns.360.net/dnsPublic.html
[adguard-default]: https://adguard-dns.io/kb/general/dns-providers/#default
[adguard-family]: https://adguard-dns.io/kb/general/dns-providers/#family-protection
[adguard-nofilter]: https://adguard-dns.io/kb/general/dns-providers/#non-filtering
[adnull-default]: https://adnull.com
[alibaba-default]: https://www.alidns.com/
[beatquantum-default]: https://beatquantum.com/stamps
[blahdns-germany]: https://blahdns.com/
[blahdns-singapore]: https://blahdns.com/
[canadianshield-family]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadianshield-private]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadianshield-protected]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[cleanbrowsing-adult]: https://cleanbrowsing.org/filters/
[cleanbrowsing-family]: https://cleanbrowsing.org/filters/
[cleanbrowsing-security]: https://cleanbrowsing.org/filters/
[cloudflare-default]: https://developers.cloudflare.com/1.1.1.1/encryption/
[cloudflare-family]: https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families
[cloudflare-malware]: https://developers.cloudflare.com/1.1.1.1/encryption/
[dns4eu-default]: https://www.joindns4.eu/for-public
[dns4eu-malware]: https://www.joindns4.eu/for-public
[dns4eu-protective-ads]: https://www.joindns4.eu/for-public
[dns4eu-protective-child]: https://www.joindns4.eu/for-public
[dns4eu-protective-child-ads]: https://www.joindns4.eu/for-public
[dnspod-default]: https://www.dnspod.com/products/public.dns
[fdn-default]: https://www.fdn.fr/actions/dns/
[ffmuc-dns-default]: https://ffmuc.net/wiki/knb:dohdot_en
[google-default]: https://developers.google.com/speed/public-dns/docs/secure-transports
[keweondns-default]: https://forum.xda-developers.com/t/keweondns-info-facts-and-what-is-keweon-actually.4576651/
[opendns-family]: https://support.opendns.com/hc/articles/360038086532
[opendns-default]: https://support.opendns.com/hc/articles/360038086532
[quad9-default]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-nofilter]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-ECS]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[tiarapp-default]: https://doh.tiar.app
[wikimedia-default]: https://meta.wikimedia.org/wiki/Wikimedia_DNS
[360-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/360-default-https.mobileconfig
[adguard-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-default-https.mobileconfig
[adguard-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-family-https.mobileconfig
[adguard-nofilter-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-nofilter-https.mobileconfig
[adnull-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adnull-default-https.mobileconfig
[alibaba-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alibaba-default-https.mobileconfig
[beatquantum-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/beatquantum-default-https.mobileconfig
[blahdns-germany-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-germany-https.mobileconfig
[blahdns-singapore-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-singapore-https.mobileconfig
[canadianshield-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-family-https.mobileconfig
[canadianshield-private-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-private-https.mobileconfig
[canadianshield-protected-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-protected-https.mobileconfig
[cleanbrowsing-adult-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-adult-https.mobileconfig
[cleanbrowsing-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-family-https.mobileconfig
[cleanbrowsing-security-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-security-https.mobileconfig
[cloudflare-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-default-https.mobileconfig
[cloudflare-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-family-https.mobileconfig
[cloudflare-malware-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-malware-https.mobileconfig
[dns4eu-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-default-https.mobileconfig
[dns4eu-malware-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-malware-https.mobileconfig
[dns4eu-protective-ads-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-ads-https.mobileconfig
[dns4eu-protective-child-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-https.mobileconfig
[dns4eu-protective-child-ads-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-ads-https.mobileconfig
[dnspod-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dnspod-default-https.mobileconfig
[fdn-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/fdn-default-https.mobileconfig
[ffmuc-dns-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/ffmuc-dns-default-https.mobileconfig
[google-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/google-default-https.mobileconfig
[keweondns-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/keweondns-default-https.mobileconfig
[opendns-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-family-https.mobileconfig
[opendns-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-default-https.mobileconfig
[quad9-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-default-https.mobileconfig
[quad9-nofilter-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-nofilter-https.mobileconfig
[quad9-ECS-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-ECS-https.mobileconfig
[tiarapp-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/tiarapp-default-https.mobileconfig
[wikimedia-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/wikimedia-default-https.mobileconfig

