# encrypted-dns-configs
Configuration profiles for [DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) and [DNS over TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). 

Check out the article for more info: [paulmillr.com/posts/encrypted-dns/](https://paulmillr.com/posts/encrypted-dns/)

## Installation

To make settings work across all apps in **iOS 14** & **MacOS Big Sur**, you’ll need to install configuration profile. This profile would tell operating system to use DOH / DOT. Note: it’s not enough to simply set server IPs in System Preferences — you need to install a profile.

To install, simply open the file in GitHib, and then click/tap on "Raw". The profile should download. On macOS, doubble click on the downloaded file to open it in settings, and approve instalation. On iOS, go to **System Settings => General => Profile**, select downloaded profile and tap the “Install” button.

## Signed Profiles

In the signed folder, we have signed versions of the profiles in this repository. These profiles have been signed by @Candygoblen123 so that when you install the profiles, they will have a verified check box on the installation screen. It also ensures that these profiles have not been tampered with. However, since they were signed by a third party, they may lag behind their unsigned counterparts a little. 

We recommend that you install a signed profile instead of an unsigned profile because it ensures that it was not modified while it was downloading. 

## Providers

- [🇷🇺 AdGuard](https://adguard.com/en/adguard-dns/overview.html#instruction)
- [🇳🇱 Alekberg](https://alekberg.net)
- [🇨🇳 Alibaba](https://www.alidns.com/)
- [🇨🇦 Canadian Shield](https://www.cira.ca/cybersecurity-services/canadian-shield) - Operated by the Canadian Internet Registration Authority (CIRA)
- [🇺🇸 Cloudflare](https://developers.cloudflare.com/1.1.1.1/dns-over-https)
- 🇨🇳 DNSPod
- [🇺🇸 Google](https://developers.google.com/speed/public-dns/docs/secure-transports)
- [🇺🇸 OpenDNS](https://support.opendns.com/hc/en-us/articles/360038086532)
- [🇺🇸 Quad9](https://www.quad9.net/doh-quad9-dns-servers/) — Filters malicious domains. Operated by CleanerDNS, Inc. 
- [🇸🇬🇺🇸 Tiar.app](https://doh.tiar.app) — "Privacy-first DNS provider". Filters some domains. Server is located in SG, hosted on Digital Ocean

To verify resolver IPs and hostnames, compare mobileconfig files to their documentation URLs. Internal workings of the profiles are described on [developer.apple.com](https://developer.apple.com/documentation/devicemanagement/dnssettings). In order to verify signed mobileconfigs, you will need to download them to your computer and open them in a text editor, because signing profiles makes GitHub think that they are binary files. 
