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

| Name                                                                                                                                                  | Country | Censorship | Notes                                                                                                     | Install button                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [360 Security DNS](https://sdns.360.net/dnsPublic.html)                                                                                               | 🇨🇳      | Yes        | Operated by 360 Digital Security Group                                                                    | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/360-https.mobileconfig)                                                                                                                                       |
| [AdGuard DNS Default](https://adguard-dns.io/kb/general/dns-providers/#default)                                                                       | 🇷🇺      | Yes        | Operated by AdGuard Software Ltd. Blocks ads, tracking & phishing                                         | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-tls.mobileconfig)                   |
| [AdGuard DNS Family Protection](https://adguard-dns.io/kb/general/dns-providers/#family-protection)                                                   | 🇷🇺      | Yes        | Operated by AdGuard Software Ltd. Blocks `Default` + malware & adult content                              | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-tls.mobileconfig)                     |
| [AdGuard DNS Non-filtering](https://adguard-dns.io/kb/general/dns-providers/#non-filtering)                                                           | 🇷🇺      | No         | Operated by AdGuard Software Ltd. Non-filtering                                                           | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-tls.mobileconfig)                 |
| [Alekberg Encrypted DNS](https://alekberg.net)                                                                                                        | 🇳🇱      | No         | Independent                                                                                               | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alekberg-https.mobileconfig)                                                                                                                                  |
| [Aliyun Public DNS](https://www.alidns.com/)                                                                                                          | 🇨🇳      | Yes        | Operated by Alibaba Cloud Ltd.                                                                            | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-tls.mobileconfig)                                   |
| [BlahDNS CDN Filtered](https://blahdns.com/)                                                                                                          | 🇺🇸      | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-adblock-doh1.mobileconfig)                                                                                                                        |
| [BlahDNS CDN Unfiltered](https://blahdns.com/)                                                                                                        | 🇺🇸      | No         | Independent. Non-filtering                                                                                | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-unfiltered-doh1.mobileconfig)                                                                                                                     |
| [BlahDNS Finland](https://blahdns.com/)                                                                                                               | 🇫🇮      | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-finland-doh.mobileconfig)                                                                                                                             |
| [BlahDNS Germany](https://blahdns.com/)                                                                                                               | 🇩🇪      | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-germany-doh.mobileconfig)                                                                                                                             |
| [BlahDNS Japan](https://blahdns.com/)                                                                                                                 | 🇯🇵      | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-japan-doh.mobileconfig)                                                                                                                               |
| [BlahDNS Singapore](https://blahdns.com/)                                                                                                             | 🇸🇬      | Yes        | Independent. Blocks ads, tracking & malware                                                               | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-singapore-doh.mobileconfig)                                                                                                                           |
| [BlahDNS Swiss](https://blahdns.com/)                                                                                                                 | 🇨🇭      | Yes        | Independent. Blocks ads, tracking & malware                                                               | [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-switzerland-dot.mobileconfig)                                                                                                                           |
| [Canadian Shield Private](https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses)   | 🇨🇦      | No         | Operated by the Canadian Internet Registration Authority (CIRA)                                           | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-tls.mobileconfig)     |
| [Canadian Shield Protected](https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses) | 🇨🇦      | Yes        | Operated by the Canadian Internet Registration Authority (CIRA). Blocks malware & phishing                | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-tls.mobileconfig) |
| [Canadian Shield Family](https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses)    | 🇨🇦      | Yes        | Operated by the Canadian Internet Registration Authority (CIRA). Blocks malware, phishing & adult content | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-tls.mobileconfig)       |
| [Cloudflare 1.1.1.1](https://developers.cloudflare.com/1.1.1.1/encryption/)                                                                           | 🇺🇸      | No         | Operated by Cloudflare Inc.                                                                               | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-tls.mobileconfig)                             |
| [Cloudflare 1.1.1.1 Malware](https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families)                                                      | 🇺🇸      | Yes        | Operated by Cloudflare Inc. Blocks malware & phishing                                                     | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-malware-https.mobileconfig)                                                                                                                        |
| [Cloudflare 1.1.1.1 Family](https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families)                                                       | 🇺🇸      | Yes        | Operated by Cloudflare Inc. Blocks malware, phishing & adult content                                      | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-family-https.mobileconfig)                                                                                                                         |
| [DNSPod Public DNS](https://www.dnspod.com/products/public.dns)                                                                                       | 🇨🇳      | Yes        | Operated by DNSPod Inc, a Tencent Cloud Company                                                           | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-tls.mobileconfig)                                     |
| [Google Public DNS](https://developers.google.com/speed/public-dns/docs/secure-transports)                                                            | 🇺🇸      | No         | Operated by Google LLC                                                                                    | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-tls.mobileconfig)                                     |
| [Mullvad](https://mullvad.net/help/dns-over-https-and-dns-over-tls/)                                                                                  | 🇸🇪      | Yes        | Operated by Mullvad VPN AB                                                                                | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-doh.mobileconfig)                                                                                                                                     |
| [Mullvad w/ ad blocking](https://mullvad.net/help/dns-over-https-and-dns-over-tls/)                                                                   | 🇸🇪      | Yes        | Operated by Mullvad VPN AB. Blocks ads & tracking                                                         | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-adblock-doh.mobileconfig)                                                                                                                             |
| [OpenDNS Standard](https://support.opendns.com/hc/articles/360038086532)                                                                              | 🇺🇸      | No         | Operated by Cisco OpenDNS LLC                                                                             | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-https.mobileconfig)                                                                                                                                   |
| [OpenDNS FamilyShield](https://support.opendns.com/hc/articles/360038086532)                                                                          | 🇺🇸      | Yes        | Operated by Cisco OpenDNS LLC. Blocks malware & adult content                                             | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-family-https.mobileconfig)                                                                                                                            |
| [Quad9](https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/)                                                                                  | 🇨🇭      | Yes        | Operated by CleanerDNS Inc. Blocks malware                                                                | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-tls.mobileconfig)                                       |
| [Quad9 w/ ECS support](https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/)                                                                   | 🇨🇭      | Yes        | Operated by CleanerDNS Inc. Supports ECS. Blocks malware                                                  | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-tls.mobileconfig)                               |
| [Tiarap](https://doh.tiar.app)                                                                                                                        | 🇸🇬 🇺🇸   | Yes        | Operated by Tiarap Inc. Blocks ads, tracking, phising & malware                                           | [HTTPS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-https.mobileconfig), [TLS](https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-tls.mobileconfig)                                   |

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

In the `signed` folder, we have _slightly outdated_ signed versions of the profiles in this repository. These profiles have been signed by [@Candygoblen123](https://github.com/Candygoblen123) so that when you install the profiles, they will have a verified check box on the installation screen. It also ensures that these profiles have not been tampered with. However, since they were signed by a third party, they may lag behind their unsigned counterparts a little.

[comment]: <> (We recommend that you install a signed profile instead of an unsigned profile because it ensures that it was not modified while it was downloading.)

To verify resolver IPs and hostnames, compare mobileconfig files to their documentation URLs. Internal workings of the profiles are described on [developer.apple.com](https://developer.apple.com/documentation/devicemanagement/dnssettings). In order to verify signed mobileconfigs, you will need to download them to your computer and open them in a text editor, because signing profiles makes GitHub think that they are binary files.

## Contributing a new profile

Profiles are basically text files. Copy an existing one and change its UUID, make sure you update README with new profile's info.

In addition to generating online, there are many other ways to generate a random UUID:

- Press `F12` to open DevTools in the browser, run this code in the console

```javascript
crypto.randomUUID();
```

- Run these command in the macOS / Linux terminal

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
