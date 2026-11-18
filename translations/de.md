<!-- Generated from src/languages/de.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | Deutsch | [Español](es.md) | [Français](fr.md) | [日本語](ja.md) | [Русский](ru.md) | [Türkçe](tr.md) | [Українська](uk.md) | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

# encrypted-dns-configs

Konfigurationsprofile für [DNS über HTTPS](https://de.wikipedia.org/wiki/DNS_over_HTTPS) und [DNS über TLS](https://de.wikipedia.org/wiki/DNS_over_TLS). Mehr dazu findest du im [Artikel über verschlüsseltes DNS](https://paulmillr.com/posts/encrypted-dns/). In [CONTRIBUTING.md](../CONTRIBUTING.md) steht, wie du Anbieter hinzufügst oder vorhandene Einträge änderst.

## Verwendung

Lade ein HTTPS-Profil aus der folgenden Tabelle herunter und installiere es.

#### iPhone und iPad

1. Öffne den Link in Safari und tippe auf „Zulassen“.
2. Installiere das Profil innerhalb von 8 Minuten nach dem Download. Öffne dazu die Einstellungen und tippe auf „Profil geladen“. Alternativ findest du das Profil unter „Allgemein“ > „VPN und Geräteverwaltung“. Tippe anschließend auf „Installieren“.
    - Falls der Schutz für gestohlene Geräte die Installation verhindert, versuche es an einem vertrauten Ort erneut.

#### Mac

1. Der Dateiname muss auf `.mobileconfig` enden. Falls er auf `.mobileconfig.txt` endet, entferne das zusätzliche „.txt“. Öffne die Datei per Doppelklick.
2. Gehe zu „Systemeinstellungen“ > „Allgemein“ > „Geräteverwaltung“. Unter macOS 13 und 14 findest du das Profil in den Systemeinstellungen unter „Datenschutz & Sicherheit“ > „Profile“. Öffne das Profil per Doppelklick und klicke auf „Installieren“.

#### Profil wechseln

Du kannst mehrere Profile installieren und jeweils eines davon verwenden. Wähle das gewünschte Profil aus. Mit „Automatisch“ nutzt du den unverschlüsselten DNS-Dienst des Netzwerks.

- iPhone und iPad: „Einstellungen“ > „Allgemein“ > „VPN, DNS und Geräteverwaltung“ > „DNS“.
- Mac: „Systemeinstellungen“ > „Netzwerk“ > „VPN & Filter“ (unter macOS 13 und 14 „Filter“).
- Lösche nach einem Update die alte Version des Profils, falls sie noch installiert ist.

#### Funktion prüfen

- Öffne die Testseite deines Anbieters. Bei Cloudflare ist das [1.1.1.1/help](https://1.1.1.1/help).

#### Einschränkungen

- Verwende möglichst HTTPS. DNS über TLS nutzt Port 853, den Netzwerke leicht sperren können.
- Manche Apps und Funktionen nutzen eigene DNS-Einstellungen oder die des Netzwerks. Das gilt für Firefox in einigen Regionen, den App Store und Chrome mit aktivierter Option „Sicheres DNS verwenden“. Auch VPNs, iCloud Privat-Relay, Little Snitch, LuLu, Geräte am persönlichen Hotspot, Kommandozeilenprogramme wie `dig` und WLAN-Anmeldeseiten können das Profil umgehen.
- Fehlt in einem Profil `ServerAddresses`, wird der Hostname des DNS-Servers zuerst per unverschlüsselter DNS-Abfrage aufgelöst.

## Anbieter

Die Filterkategorien neben den Installationslinks zeigen, welche Arten von Domains der DNS-Dienst sperrt. *gemischte Inhalte* kennzeichnet Websites mit Inhalten für Erwachsene und für ein allgemeines Publikum. Bei *nicht angegeben* nennt der Anbieter keine Filterkategorien. Für blockierte Hostnamen ändert sich die DNS-Antwort (`Hostname=IP`). Welche Domains der Anbieter sperrt, kann vom Land abhängen.

In [ALL-PROFILES.md](../ALL-PROFILES.md) findest du alle Profile, darunter Profile für DNS über TLS und Versionen ohne Signatur.

| Anbieter                                 | Ungefiltert                                         | Gefiltert                                                                                                                                                                                                                                                                                                                                                                            | Hinweise                                                                                                                               |
| ---------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]          |                                                     | [Installieren][360-default-https-signed] · *nicht angegeben*                                                                                                                                                                                                                                                                                                                         | 🇨🇳 von der 360 Digital Security Group                                                                                                  |
| [AdGuard DNS][adguard-default]           | [Installieren][adguard-nofilter-https-signed]       | [Standard][adguard-default-https-signed] · *Werbung*, *Tracking*, *Phishing*<br>[Familienschutz][adguard-family-https-signed] · *Schadsoftware*, *Inhalte für Erwachsene*, *Werbung*, *Tracking*, *Phishing* ([Details][adguard-family])                                                                                                                                             | 🇷🇺 von AdGuard Software Ltd.                                                                                                           |
| [ADNull DNS][adnull-default]             |                                                     | [Installieren][adnull-default-https-signed] · *Werbung*, *Tracking*                                                                                                                                                                                                                                                                                                                  | 🇺🇦 von ADNull. Die kostenpflichtigen Tarife bieten anpassbare DNS-Einstellungen und zusätzliche Filter für Werbung und Phishing        |
| [Aliyun Public DNS][alibaba-default]     | [Installieren][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                                                      | 🇨🇳 von Alibaba Cloud Ltd.                                                                                                              |
| [BeatQuantum DNS][beatquantum-default]   | [Installieren][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                                                      | 🇬🇧 von BeatQuantum Limited. DNSSEC. Klassischer und hybrider Schlüsselaustausch sowie quantenresistenter Schlüsselaustausch mit ML-KEM |
| [BlahDNS][blahdns-germany]               |                                                     | [Deutschland][blahdns-germany-https-signed] · *Schadsoftware*, *Werbung*, *Tracking*<br>[Singapur][blahdns-singapore-https-signed] · *Schadsoftware*, *Werbung*, *Tracking*                                                                                                                                                                                                          | 🇩🇪 🇸🇬                                                                                                                                  |
| [Canadian Shield][canadianshield-family] | [Installieren][canadianshield-private-https-signed] | [Familienschutz][canadianshield-family-https-signed] · *Schadsoftware*, *Inhalte für Erwachsene*, *Phishing*<br>[Geschützt][canadianshield-protected-https-signed] · *Schadsoftware*, *Phishing*                                                                                                                                                                                     | 🇨🇦 von der Canadian Internet Registration Authority (CIRA)                                                                             |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                                     | [Filter für nicht jugendfreie Inhalte][cleanbrowsing-adult-https-signed] · *Schadsoftware*, *Inhalte für Erwachsene*, *Phishing*<br>[Familienfilter][cleanbrowsing-family-https-signed] · *Schadsoftware*, *Inhalte für Erwachsene*, *Phishing*, *gemischte Inhalte*<br>[Sicherheitsfilter][cleanbrowsing-security-https-signed] · *Schadsoftware*, *Phishing*                       | 🇺🇸                                                                                                                                     |
| [Cloudflare 1.1.1.1][cloudflare-default] | [Installieren][cloudflare-default-https-signed]     | [Familienschutz][cloudflare-family-https-signed] · *Schadsoftware*, *Inhalte für Erwachsene*, *Phishing* ([Details][cloudflare-family])<br>[Sicherheitsfilter][cloudflare-malware-https-signed] · *Schadsoftware*, *Phishing*                                                                                                                                                        | 🇺🇸 von Cloudflare Inc.                                                                                                                 |
| [DNS4EU][dns4eu-default]                 | [Installieren][dns4eu-default-https-signed]         | [Schutzfilter][dns4eu-malware-https-signed] · *Schadsoftware*<br>[Werbefilter][dns4eu-protective-ads-https-signed] · *Schadsoftware*, *Werbung*<br>[Kinderschutz][dns4eu-protective-child-https-signed] · *Schadsoftware*, *Inhalte für Erwachsene*<br>[Kinderschutz + Werbefilter][dns4eu-protective-child-ads-https-signed] · *Schadsoftware*, *Inhalte für Erwachsene*, *Werbung* | 🇨🇿 von einem Konsortium unter der Leitung von Whalebone                                                                                |
| [DNSPod Public DNS][dnspod-default]      | [Installieren][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                      | 🇨🇳 von DNSPod Inc. (Tencent Cloud)                                                                                                     |
| [FDN][fdn-default]                       | [Installieren][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                                                      | 🇫🇷 von French Data Network                                                                                                             |
| [FFMUC-DNS][ffmuc-dns-default]           | [Installieren][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                      | 🇩🇪 von Freifunk München                                                                                                                |
| [Google Public DNS][google-default]      | [Installieren][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                      | 🇺🇸 von Google LLC                                                                                                                      |
| [keweonDNS][keweondns-default]           |                                                     | [Installieren][keweondns-default-https-signed] · *Werbung*, *Tracking*                                                                                                                                                                                                                                                                                                               | 🇩🇪 von Aviontex                                                                                                                        |
| [OpenDNS][opendns-family]                | [Installieren][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *Schadsoftware*, *Inhalte für Erwachsene*                                                                                                                                                                                                                                                                                              | 🇺🇸 von Cisco OpenDNS LLC                                                                                                               |
| [Quad9][quad9-default]                   | [Installieren][quad9-nofilter-https-signed]         | [Standard][quad9-default-https-signed] · *Schadsoftware*<br>[Mit ECS][quad9-ECS-https-signed] · *Schadsoftware*                                                                                                                                                                                                                                                                      | 🇨🇭 von der Quad9 Foundation                                                                                                            |
| [Tiarap][tiarapp-default]                |                                                     | [Installieren][tiarapp-default-https-signed] · *Schadsoftware*, *Werbung*, *Tracking*, *Phishing*                                                                                                                                                                                                                                                                                    | 🇸🇬 🇺🇸 von Tiarap Inc.                                                                                                                  |
| [Wikimedia DNS][wikimedia-default]       | [Installieren][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                      | 🇺🇸 von der Wikimedia Foundation. Betaversion ohne Verfügbarkeitsgarantie                                                               |

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

