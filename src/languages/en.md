<%LANGUAGES%>

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

<%PROVIDERS_TABLE%>

<%PROVIDERS_LINKS%>
