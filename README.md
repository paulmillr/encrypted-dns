# encrypted-dns-configs
Configuration profiles for [DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) and [DNS over TLS](https://en.wikipedia.org/wiki/DNS_over_TLS).

Check out the article for more info: [paulmillr.com/posts/encrypted-dns/](https://paulmillr.com/posts/encrypted-dns/)

## Installation

To make settings work across all apps in iOS & MacOS, you’ll need to install configuration profile. This profile would tell operating system to use DOH / DOT. Note: it’s not enough to simply set server IPs in System Preferences — you need to install a profile.

On iOS, after installation, go to system **Settings => General => Profile**, select downloaded profile and click “Install” button.
