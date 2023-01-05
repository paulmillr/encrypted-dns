## Providers

| Name               | Filtered? | Source Link                                                                                  | Anycast | Install                                        |
| ------------------ | --------- | -------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------- |
| Adguard Default    | Yah       | [Here] (https://adguard-dns.io/en/public-dns.html) https://adguard-dns.io/en/public-dns.html | Yah     | [HTTPS](HTTPS-LINK-HERE), [TLS](TLS-LINK-HERE) |
| Adguard Family     | Yah       | [Here] (https://adguard-dns.io/en/public-dns.html) https://adguard-dns.io/en/public-dns.html | Yah     | [HTTPS](HTTPS-LINK-HERE), [TLS](TLS-LINK-HERE) |
| Adguard Unfiltered | Nah       | [Here] (https://adguard-dns.io/en/public-dns.html) https://adguard-dns.io/en/public-dns.html | Yah     | [HTTPS](HTTPS-LINK-HERE), [TLS](TLS-LINK-HERE) |
| Njalla             | Nah       | [Here] (https://dns.njal.la/) https://dns.njal.la/                                           | Nah     | [HTTPS](HTTPS-LINK-HERE), [TLS](TLS-LINK-HERE) |

## Installation Guide

To make settings work in **iOS** & **MacOS**, you’ll need to install a configuration profile. This profile would tell operating system to use DoH or DoT. Note: it’s not enough to simply set server IPs in System Preferences — you need to install a profile, unfortunately.

To install, simply open the file in GitHub by using Safari (other browsers will just download the file and won't ask for installation), and then click/tap on install button. The profile should download. On macOS, double click on the downloaded file to open it in settings, and approve instalation.

For **iOS** go to **Settings => General => Profile**, select downloaded profile and tap the “Install” button. You can manage your DNS servers from **Settings => General => VPN, DNS, & Device Management => DNS**. To remove, go to VPN, DNS, & Device Management and click on a profile and click "Remove Profile"

For **iOS**
Seek a DNS provider from the list and click either HTTPS or TLS using Safari and click allow when given a prompt that states "XXXX." The profile will now install.

For **MacOS**

## Contributing a new profile

Profiles are basically text files. Copy using the template for best results and change its UUID, for example, by generating a new one ["online"](https://www.uuidgenerator.net/). Make sure you update README with new profile's info.

#### Note: This is forked from Paul Miller's repo: https://github.com/paulmillr/encrypted-dns

#### Notes: DoH ("DNS over HTTPS) will run your queries over port 443; DoT ("DNS over TLS") will run your queries over port 853.
