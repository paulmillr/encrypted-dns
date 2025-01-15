English | [简体中文](https://github.com/paulmillr/encrypted-dns/blob/master/README.cmn-CN.md) | [繁體中文](https://github.com/paulmillr/encrypted-dns/blob/master/README.cmn-TW.md)

# encrypted-dns-configs

Configuration profiles for [DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) and [DNS over TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). Check out the article for more info: [paulmillr.com/posts/encrypted-dns/](https://paulmillr.com/posts/encrypted-dns/) and info about [contributing a new profile](#contributing-a-new-profile).

### Caveats

DoH seems to work faster & better than DoT judging from the [Google's article](https://security.googleblog.com/2022/07/dns-over-http3-in-android.html).

Starting from iOS & iPadOS 15.5, [Wi-Fi captive portals](https://en.wikipedia.org/wiki/Captive_portal) in cafes, hotels, airports are exempted by Apple from eDNS rules; to simplify authentication. This is good news. There are still some other issues; we can't fix them, only Apple can:

- eDNS gets disabled: [Little Snitch & Lulu](https://github.com/paulmillr/encrypted-dns/issues/13), [VPN](https://github.com/paulmillr/encrypted-dns/issues/18)
- Some traffic is exempt from eDNS: [Terminal / App Store](https://github.com/paulmillr/encrypted-dns/issues/22), [Chrome](https://github.com/paulmillr/encrypted-dns/issues/19)

If you need even more privacy, check out [encrypted-dns over TOR](https://github.com/alecmuffett/dohot).

## Providers

`Censorship=yes` means the profile will not send true information about `hostname=IP` relation for some hosts.

| Name                                                 | Region | Censorship | Notes                                                                                                     | Install (Signed - Recommended)                                                                               | Install (unsigned) button                                                                      |
| ---------------------------------------------------- | ------ | ---------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-dns]                          | 🇨🇳     | Yes        | Operated by 360 Digital Security Group                                                                    | [HTTPS][360-dns-profile-https-signed]                                                                        | [HTTPS][360-dns-profile-https]                                                                 |
| [AdGuard DNS Default][adguard-dns-default]           | 🇷🇺     | Yes        | Operated by AdGuard Software Ltd. Blocks ads, tracking & phishing                                         | [HTTPS][adguard-dns-default-profile-https-signed], [TLS][adguard-dns-default-profile-tls-signed]             | [HTTPS][adguard-dns-default-profile-https], [TLS][adguard-dns-default-profile-tls]             |
| [AdGuard DNS Family Protection][adguard-dns-family]  | 🇷🇺     | Yes        | Operated by AdGuard Software Ltd. Blocks `Default` + malware & adult content                              | [HTTPS][adguard-dns-family-profile-https-signed], [TLS][adguard-dns-family-profile-tls-signed]               | [HTTPS][adguard-dns-family-profile-https], [TLS][adguard-dns-family-profile-tls]               |
| [AdGuard DNS Non-filtering][adguard-dns-unfiltered]  | 🇷🇺     | No         | Operated by AdGuard Software Ltd. Non-filtering                                                           | [HTTPS][adguard-dns-unfiltered-profile-https-signed], [TLS][adguard-dns-unfiltered-profile-tls-signed]       | [HTTPS][adguard-dns-unfiltered-profile-https], [TLS][adguard-dns-unfiltered-profile-tls]       |
| [Alekberg Encrypted DNS][alekberg-dns]               | 🇳🇱     | No         | Independent                                                                                               | [HTTPS][alekberg-dns-profile-https-signed]                                                                   | [HTTPS][alekberg-dns-profile-https]                                                            |
| [Aliyun Public DNS][aliyun-dns]                      | 🇨🇳     | No         | Operated by Alibaba Cloud Ltd.                                                                            | [HTTPS][aliyun-dns-profile-https-signed], [TLS][aliyun-dns-profile-tls-signed]                               | [HTTPS][aliyun-dns-profile-https], [TLS][aliyun-dns-profile-tls]                               |
| [Archuser.org PubHole][archuser]                     | 🇺🇸     | Yes        | Independent. Blocks ads, tracking, and supports OpenNIC Domains.                                          | [HTTPS][archuser-https-signed], [TLS][archuser-tls-signed]                                                   | [HTTPS][archuser-https], [TLS][archuser-tls]
| [BlahDNS CDN Filtered][blahdns]                      | 🇺🇸     | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS][blahdns-cdn-filtered-profile-https-signed]                                                           | [HTTPS][blahdns-cdn-filtered-profile-https]                                                    |
| [BlahDNS CDN Unfiltered][blahdns]                    | 🇺🇸     | No         | Independent. Non-filtering                                                                                | [HTTPS][blahdns-cdn-unfiltered-profile-https-signed]                                                         | [HTTPS][blahdns-cdn-unfiltered-profile-https]                                                  |
| [BlahDNS Germany][blahdns]                           | 🇩🇪     | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS][blahdns-germany-profile-https-signed]                                                                | [HTTPS][blahdns-germany-profile-https]                                                         |
| [BlahDNS Singapore][blahdns]                         | 🇸🇬     | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS][blahdns-singapore-profile-https-signed]                                                              | [HTTPS][blahdns-singapore-profile-https]                                                       |
| [Canadian Shield Private][canadian-shield]           | 🇨🇦     | No         | Operated by the Canadian Internet Registration Authority (CIRA)                                           | [HTTPS][canadian-shield-private-profile-https-signed], [TLS][canadian-shield-private-profile-tls-signed]     | [HTTPS][canadian-shield-private-profile-https], [TLS][canadian-shield-private-profile-tls]     |
| [Canadian Shield Protected][canadian-shield]         | 🇨🇦     | Yes        | Operated by the Canadian Internet Registration Authority (CIRA). Blocks malware & phishing                | [HTTPS][canadian-shield-protected-profile-https-signed], [TLS][canadian-shield-protected-profile-tls-signed] | [HTTPS][canadian-shield-protected-profile-https], [TLS][canadian-shield-protected-profile-tls] |
| [Canadian Shield Family][canadian-shield]            | 🇨🇦     | Yes        | Operated by the Canadian Internet Registration Authority (CIRA). Blocks malware, phishing & adult content | [HTTPS][canadian-shield-family-profile-https-signed], [TLS][canadian-shield-family-profile-tls-signed]       | [HTTPS][canadian-shield-family-profile-https], [TLS][canadian-shield-family-profile-tls]       |
| [Cloudflare 1.1.1.1][cloudflare-dns]                 | 🇺🇸     | No         | Operated by Cloudflare Inc.                                                                               | [HTTPS][cloudflare-dns-profile-https-signed], [TLS][cloudflare-dns-profile-tls-signed]                       | [HTTPS][cloudflare-dns-profile-https], [TLS][cloudflare-dns-profile-tls]                       |
| [Cloudflare 1.1.1.1 Security][cloudflare-dns-family] | 🇺🇸     | Yes        | Operated by Cloudflare Inc. Blocks malware & phishing                                                     | [HTTPS][cloudflare-dns-security-profile-https-signed]                                                        | [HTTPS][cloudflare-dns-security-profile-https]                                                 |
| [Cloudflare 1.1.1.1 Family][cloudflare-dns-family]   | 🇺🇸     | Yes        | Operated by Cloudflare Inc. Blocks malware, phishing & adult content                                      | [HTTPS][cloudflare-dns-family-profile-https-signed]                                                          | [HTTPS][cloudflare-dns-family-profile-https]                                                   |
| [DNSPod Public DNS][dnspod-dns]                      | 🇨🇳     | No         | Operated by DNSPod Inc., a Tencent Cloud Company                                                          | [HTTPS][dnspod-dns-profile-https-signed], [TLS][dnspod-dns-profile-tls-signed]                               | [HTTPS][dnspod-dns-profile-https], [TLS][dnspod-dns-profile-tls]                               |
| [Google Public DNS][google-dns]                      | 🇺🇸     | No         | Operated by Google LLC                                                                                    | [HTTPS][google-dns-profile-https-signed], [TLS][google-dns-profile-tls-signed]                               | [HTTPS][google-dns-profile-https], [TLS][google-dns-profile-tls]                               |
| [keweonDNS][keweondns]                               | 🇩🇪     | No         | Operated by Aviontex. Blocks ads & tracking                                                               | [HTTPS][keweondns-profile-https-signed], [TLS][keweondns-profile-tls-signed]                                 | [HTTPS][keweondns-profile-https], [TLS][keweondns-profile-tls]                                 |
| [Mullvad DNS][mullvad-dns]                           | 🇸🇪     | Yes        | Operated by Mullvad VPN AB                                                                                | [HTTPS][mullvad-dns-profile-https-signed]                                                                    | [HTTPS][mullvad-dns-profile-https]                                                             |
| [Mullvad DNS Adblock][mullvad-dns]                   | 🇸🇪     | Yes        | Operated by Mullvad VPN AB. Blocks ads & tracking                                                         | [HTTPS][mullvad-dns-adblock-profile-https-signed]                                                            | [HTTPS][mullvad-dns-adblock-profile-https]                                                     |
| [OpenDNS Standard][opendns]                          | 🇺🇸     | No         | Operated by Cisco OpenDNS LLC                                                                             | [HTTPS][opendns-standard-profile-https-signed]                                                               | [HTTPS][opendns-standard-profile-https]                                                        |
| [OpenDNS FamilyShield][opendns]                      | 🇺🇸     | Yes        | Operated by Cisco OpenDNS LLC. Blocks malware & adult content                                             | [HTTPS][opendns-familyshield-profile-https-signed]                                                           | [HTTPS][opendns-familyshield-profile-https]                                                    |
| [Quad9][quad9]                                       | 🇨🇭     | Yes        | Operated by Quad9 Foundation. Blocks malware                                                              | [HTTPS][quad9-profile-https-signed], [TLS][quad9-profile-tls-signed]                                         | [HTTPS][quad9-profile-https], [TLS][quad9-profile-tls]                                         |
| [Quad9 w/ ECS][quad9]                                | 🇨🇭     | Yes        | Operated by Quad9 Foundation. Supports ECS. Blocks malware                                                | [HTTPS][quad9-ecs-profile-https-signed], [TLS][quad9-ecs-profile-tls-signed]                                 | [HTTPS][quad9-ecs-profile-https], [TLS][quad9-ecs-profile-tls]                                 |
| [Tiarap][tiarap]                                     | 🇸🇬 🇺🇸  | Yes        | Operated by Tiarap Inc. Blocks ads, tracking, phising & malware                                           | [HTTPS][tiarap-profile-https-signed], [TLS][tiarap-profile-tls-signed]                                       | [HTTPS][tiarap-profile-https], [TLS][tiarap-profile-tls]                                       |

## Installation

To make settings work across all apps in **iOS**, **iPadOS** & **macOS**, you'll need to install configuration profile. This profile would tell operating system to use DoH / DoT. Note: it's not enough to simply set server IPs in System Preferences — you need to install a profile.

iOS / iPadOS: Open the mobileconfig file in GitHub by using Safari (other browsers will just download the file and won't ask for installation), and then click/tap on "Allow" button. The profile should download. Go to **System Settings => General => VPN, DNS & Device Management**, select downloaded profile and tap the "Install" button.

macOS [(official docs)](https://support.apple.com/guide/mac-help/mh35561/):

1. Download and save the profile. After save, rename it to be in format: `NAME.mobileconfig`, not NAME.txt, or so
2. Choose Apple menu > System Settings, click Privacy and Security in the sidebar, then click Profiles on the right. (You may need to scroll down.)
   You may be asked to supply your password or other information during installation.
3. In the Downloaded section, double-click the profile.
4. Review the profile contents then click Continue, Install or Enroll to install the profile.

   If an earlier version of a profile is already installed on your Mac, the settings in the updated version replace the previous ones.

## Scope

There seems to be an [additional option](https://github.com/paulmillr/encrypted-dns/issues/22) that allows to use system-wide profiles. To try it, add this to mobileconfig file:

```xml
<key>PayloadScope</key>
<string>System</string>
```

## Signed Profiles

In the `signed` folder we have signed versions of the profiles in this repository. These profiles have been signed by [@Xernium](https://github.com/Xernium) so that when you install the profiles, 
they will have a verified check box on the installation screen. It also ensures that these profiles have not been tampered with. However, since they were signed by a third party, they may lag behind their unsigned counterparts a little.
The signature is valid until `2025-11-02`

Previous signatures by:
[@Xernium](https://github.com/Xernium), replaced at `2024-11-01`   
   
[@Candygoblen123](https://github.com/Candygoblen123), replaced at `2023-11-29`

[comment]: <> (We recommend that you install a signed profile instead of an unsigned profile because it ensures that it was not modified while it was downloading.)

To verify resolver IPs and hostnames, compare mobileconfig files to their documentation URLs. Internal workings of the profiles are described on [developer.apple.com](https://developer.apple.com/documentation/devicemanagement/dnssettings). In order to verify signed mobileconfigs, you will need to download them to your computer and open them in a text editor, because signing profiles makes GitHub think that they are binary files.

## Contributing a new profile

Profiles are basically text files. Copy an existing one and change its UUID, make sure you update README with new profile's info.

In addition to generating online, there are many other ways to generate a random UUID:

- Press `F12` to open DevTools in the browser, run this code in the console

```javascript
crypto.randomUUID();
```

- Run these commands in the macOS / Linux terminal

```sh
# Works both in macOS & Linux
uuidgen

# Works in Linux
cat /proc/sys/kernel/random/uuid
```

- Run this cmdlet in Powershell

```powershell
New-Guid
```

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
[archuser]: https://pubhole.archuser.org
[archuser-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/archuser-https.mobileconfig
[archuser-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/archuser-tls.mobileconfig
[blahdns]: https://blahdns.com/
[blahdns-cdn-filtered-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-adblock-doh1.mobileconfig
[blahdns-cdn-unfiltered-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-unfiltered-doh1.mobileconfig
[blahdns-finland-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-finland-doh.mobileconfig
[blahdns-germany-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-germany-doh.mobileconfig
[blahdns-japan-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-japan-doh.mobileconfig
[blahdns-singapore-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-singapore-doh.mobileconfig
[blahdns-switzerland-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-switzerland-dot.mobileconfig
[canadian-shield]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadian-shield-private-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-https.mobileconfig
[canadian-shield-private-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-tls.mobileconfig
[canadian-shield-protected-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-https.mobileconfig
[canadian-shield-protected-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-tls.mobileconfig
[canadian-shield-family-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-https.mobileconfig
[canadian-shield-family-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-tls.mobileconfig
[cloudflare-dns]: https://developers.cloudflare.com/1.1.1.1/encryption/
[cloudflare-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-https.mobileconfig
[cloudflare-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-tls.mobileconfig
[cloudflare-dns-family]: https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families
[cloudflare-dns-security-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-malware-https.mobileconfig
[cloudflare-dns-family-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-family-https.mobileconfig
[dnspod-dns]: https://www.dnspod.com/products/public.dns
[dnspod-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-https.mobileconfig
[dnspod-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-tls.mobileconfig
[google-dns]: https://developers.google.com/speed/public-dns/docs/secure-transports
[google-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-https.mobileconfig
[google-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-tls.mobileconfig
[keweondns]: https://forum.xda-developers.com/t/keweondns-info-facts-and-what-is-keweon-actually.4576651/
[keweondns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-doh.mobileconfig
[keweondns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-dot.mobileconfig
[mullvad-dns]: https://mullvad.net/help/dns-over-https-and-dns-over-tls/
[mullvad-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-doh.mobileconfig
[mullvad-dns-adblock-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-adblock-doh.mobileconfig
[opendns]: https://support.opendns.com/hc/articles/360038086532
[opendns-standard-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-https.mobileconfig
[opendns-familyshield-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-family-https.mobileconfig
[quad9]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-https.mobileconfig
[quad9-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-tls.mobileconfig
[quad9-ecs-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-https.mobileconfig
[quad9-ecs-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-tls.mobileconfig
[tiarap]: https://doh.tiar.app
[tiarap-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-https.mobileconfig
[tiarap-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-tls.mobileconfig
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
[archuser-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/archuser-https.mobileconfig
[archuser-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/archuser-tls.mobileconfig
[blahdns-cdn-filtered-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-cdn-adblock-doh1.mobileconfig
[blahdns-cdn-unfiltered-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-cdn-unfiltered-doh1.mobileconfig
[blahdns-finland-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-finland-doh.mobileconfig
[blahdns-germany-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-germany-doh.mobileconfig
[blahdns-japan-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-japan-doh.mobileconfig
[blahdns-singapore-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-singapore-doh.mobileconfig
[blahdns-switzerland-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-switzerland-dot.mobileconfig
[canadian-shield-private-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-private-https.mobileconfig
[canadian-shield-private-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-private-tls.mobileconfig
[canadian-shield-protected-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-protected-https.mobileconfig
[canadian-shield-protected-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-protected-tls.mobileconfig
[canadian-shield-family-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-family-https.mobileconfig
[canadian-shield-family-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-family-tls.mobileconfig
[cloudflare-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-https.mobileconfig
[cloudflare-dns-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-tls.mobileconfig
[cloudflare-dns-security-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-malware-https.mobileconfig
[cloudflare-dns-family-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-family-https.mobileconfig
[dnspod-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dnspod-https.mobileconfig
[dnspod-dns-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dnspod-tls.mobileconfig
[google-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/google-https.mobileconfig
[google-dns-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/google-tls.mobileconfig
[keweondns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/keweondns-doh.mobileconfig
[keweondns-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/keweondns-dot.mobileconfig
[mullvad-dns-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/mullvad-doh.mobileconfig
[mullvad-dns-adblock-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/mullvad-adblock-doh.mobileconfig
[opendns-standard-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-https.mobileconfig
[opendns-familyshield-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-family-https.mobileconfig
[quad9-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-https.mobileconfig
[quad9-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-tls.mobileconfig
[quad9-ecs-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-ECS-https.mobileconfig
[quad9-ecs-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-ECS-tls.mobileconfig
[tiarap-profile-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/tiarapp-https.mobileconfig
[tiarap-profile-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/tiarapp-tls.mobileconfig
