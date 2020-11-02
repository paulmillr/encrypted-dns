# encrypted-dns-configs
Configuration profiles for [DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) and [DNS over TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). 

Check out the article for more info: [paulmillr.com/posts/encrypted-dns/](https://paulmillr.com/posts/encrypted-dns/)

## Installation

To make settings work across all apps in iOS 14 & MacOS Big Sur, you’ll need to install configuration profile. This profile would tell operating system to use DOH / DOT. Note: it’s not enough to simply set server IPs in System Preferences — you need to install a profile.

On iOS, after installation, go to system **Settings => General => Profile**, select downloaded profile and click “Install” button.

## Docs

To verify resolver IPs and hostnames, compare mobileconfig files to the following documentation.

- Alibaba https://www.alidns.com/faqs/#dns-safe
- AdGuard https://adguard.com/en/adguard-dns/overview.html#instruction
- Cloudflare https://developers.cloudflare.com/1.1.1.1/dns-over-https
- Google https://developers.google.com/speed/public-dns/docs/secure-transports
- OpenDNS https://support.opendns.com/hc/en-us/articles/360038086532

Internal workings of the profiles are described on [developer.apple.com](https://developer.apple.com/documentation/devicemanagement/dnssettings).
