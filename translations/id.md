<!-- Generated from src/languages/id.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [العربية](ar.md) | [Deutsch](de.md) | [Español](es.md) | [Français](fr.md) | Bahasa Indonesia | [日本語](ja.md) | [Português](pt.md) | [Русский](ru.md) | [Türkçe](tr.md) | [Українська](uk.md) | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

# encrypted-dns-configs

Profil konfigurasi untuk [DNS melalui HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) dan [DNS melalui TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). Pelajari cara kerjanya di [artikel tentang DNS terenkripsi](https://paulmillr.com/posts/encrypted-dns/). Untuk menambahkan penyedia atau memperbarui datanya di tabel, lihat [panduan kontribusi](../CONTRIBUTING.md).

## Cara menggunakan profil

Pilih dan unduh salah satu profil HTTPS dari tabel di bawah, lalu ikuti langkah pemasangannya.

#### iPhone dan iPad

1. Buka tautan di Safari, lalu ketuk “Izinkan”.
2. Setelah mengunduh profil, Anda punya waktu 8 menit untuk memasangnya. Buka Pengaturan > Profil Diunduh (atau Pengaturan > Umum > VPN & Manajemen Perangkat), lalu ketuk “Instal”.
    - Jika Anda tidak bisa memasang profil, fitur Perlindungan Perangkat yang Dicuri mungkin mengharuskan Anda berada di lokasi yang dikenal.

#### Mac

1. Pastikan file berekstensi `.mobileconfig`. Jika namanya berakhiran `.mobileconfig.txt`, hapus .txt di bagian akhir. Setelah itu, klik dua kali file untuk membukanya.
2. Buka Pengaturan Sistem > Umum > Manajemen Perangkat. Di macOS 13 dan 14, buka Pengaturan Sistem > Privasi & Keamanan > Profil. Klik dua kali profil, lalu klik “Instal”.

#### Beralih antarprofil

Anda bisa memasang beberapa profil, tetapi hanya satu yang aktif. Pilih profil yang ingin digunakan, atau pilih “Otomatis” untuk memakai DNS jaringan tanpa enkripsi.

- iPhone dan iPad — Pengaturan > Umum > VPN, DNS & Manajemen Perangkat > DNS
- Mac — Pengaturan Sistem > Jaringan > VPN & Filter (di macOS 13 dan 14: Filter)
- Setelah memperbarui profil, hapus versi lama yang masih terpasang.

#### Menguji profil

- Buka halaman uji penyedia DNS Anda, misalnya [1.1.1.1/help](https://1.1.1.1/help) jika Anda memakai Cloudflare.

#### Batasan

- Sebaiknya gunakan HTTPS. DNS melalui TLS memakai port 853, yang mudah diblokir.
- Firefox (di beberapa wilayah), App Store, dan Chrome (saat “Gunakan DNS aman” aktif) tidak memakai DNS terenkripsi dari profil. Hal yang sama berlaku untuk VPN, Relai Pribadi iCloud, Little Snitch, LuLu, perangkat yang terhubung ke Hotspot Pribadi, alat baris perintah seperti `dig`, dan halaman login jaringan Wi-Fi.
- Jika profil tidak mencantumkan `ServerAddresses`, perangkat lebih dulu mengirim kueri DNS tanpa enkripsi untuk mencari alamat IP server DNS berdasarkan nama hostnya.

## Penyedia

Label pada tabel menunjukkan kategori yang diblokir oleh tiap profil. Kategori *konten campuran* mencakup situs yang memadukan konten dewasa dan konten untuk umum. Label *tidak disebutkan* berarti penyedia tidak merinci kategori yang diblokir. Filter mengubah respons DNS (`hostname=IP`) untuk nama host yang diblokir. Aturannya bisa berbeda dari satu negara ke negara lain.

Daftar lengkapnya ada di [ALL-PROFILES.md](../ALL-PROFILES.md), termasuk profil DNS melalui TLS dan versi tanpa tanda tangan.

| Penyedia                                 | Tanpa filter                                  | Dengan filter                                                                                                                                                                                                                                                                                                                                                  | Catatan                                                                                                                                      |
| ---------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]          |                                               | [Instal][360-default-https-signed] · *tidak disebutkan*                                                                                                                                                                                                                                                                                                        | 🇨🇳 Dikelola oleh 360 Digital Security Group                                                                                                  |
| [AdGuard DNS][adguard-default]           | [Instal][adguard-nofilter-https-signed]       | [Bawaan][adguard-default-https-signed] · *iklan*, *pelacakan*, *phishing*<br>[Keluarga][adguard-family-https-signed] · *malware*, *konten dewasa*, *iklan*, *pelacakan*, *phishing* ([rincian][adguard-family])                                                                                                                                                | 🇷🇺 Dikelola oleh AdGuard Software Ltd.                                                                                                       |
| [ADNull DNS][adnull-default]             |                                               | [Instal][adnull-default-https-signed] · *iklan*, *pelacakan*                                                                                                                                                                                                                                                                                                   | 🇺🇦 Dikelola oleh ADNull. Paket berbayar menyediakan DNS yang bisa disesuaikan dan filter lanjutan untuk memblokir iklan serta situs phishing |
| [Aliyun Public DNS][alibaba-default]     | [Instal][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                                | 🇨🇳 Dikelola oleh Alibaba Cloud Ltd.                                                                                                          |
| [BeatQuantum DNS][beatquantum-default]   | [Instal][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                                | 🇬🇧 Dikelola oleh BeatQuantum Limited. Mendukung DNSSEC dan pertukaran kunci dengan metode klasik, hibrida, serta pascakuantum (ML-KEM)       |
| [BlahDNS][blahdns-germany]               |                                               | [Jerman][blahdns-germany-https-signed] · *malware*, *iklan*, *pelacakan*<br>[Singapura][blahdns-singapore-https-signed] · *malware*, *iklan*, *pelacakan*                                                                                                                                                                                                      | 🇩🇪 🇸🇬                                                                                                                                        |
| [Canadian Shield][canadianshield-family] | [Instal][canadianshield-private-https-signed] | [Keluarga][canadianshield-family-https-signed] · *malware*, *konten dewasa*, *phishing*<br>[Terlindungi][canadianshield-protected-https-signed] · *malware*, *phishing*                                                                                                                                                                                        | 🇨🇦 Dikelola oleh Otoritas Pendaftaran Domain Internet Kanada (CIRA)                                                                          |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                               | [Filter konten dewasa][cleanbrowsing-adult-https-signed] · *malware*, *konten dewasa*, *phishing*<br>[Filter keluarga][cleanbrowsing-family-https-signed] · *malware*, *konten dewasa*, *phishing*, *konten campuran*<br>[Filter keamanan][cleanbrowsing-security-https-signed] · *malware*, *phishing*                                                        | 🇺🇸                                                                                                                                           |
| [Cloudflare 1.1.1.1][cloudflare-default] | [Instal][cloudflare-default-https-signed]     | [Keluarga][cloudflare-family-https-signed] · *malware*, *konten dewasa*, *phishing* ([rincian][cloudflare-family])<br>[Keamanan][cloudflare-malware-https-signed] · *malware*, *phishing*                                                                                                                                                                      | 🇺🇸 Dikelola oleh Cloudflare Inc.                                                                                                             |
| [DNS4EU][dns4eu-default]                 | [Instal][dns4eu-default-https-signed]         | [Perlindungan][dns4eu-malware-https-signed] · *malware*<br>[Pemblokiran iklan][dns4eu-protective-ads-https-signed] · *malware*, *iklan*<br>[Perlindungan anak][dns4eu-protective-child-https-signed] · *malware*, *konten dewasa*<br>[Perlindungan anak dan pemblokiran iklan][dns4eu-protective-child-ads-https-signed] · *malware*, *konten dewasa*, *iklan* | 🇨🇿 Dikelola oleh konsorsium yang dipimpin Whalebone                                                                                          |
| [DNSPod Public DNS][dnspod-default]      | [Instal][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                | 🇨🇳 Dikelola oleh DNSPod Inc. (Tencent Cloud)                                                                                                 |
| [FDN][fdn-default]                       | [Instal][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                                | 🇫🇷 Dikelola oleh French Data Network                                                                                                         |
| [FFMUC-DNS][ffmuc-dns-default]           | [Instal][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                | 🇩🇪 Dikelola oleh Freifunk München                                                                                                            |
| [Google Public DNS][google-default]      | [Instal][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                | 🇺🇸 Dikelola oleh Google LLC                                                                                                                  |
| [keweonDNS][keweondns-default]           |                                               | [Instal][keweondns-default-https-signed] · *iklan*, *pelacakan*                                                                                                                                                                                                                                                                                                | 🇩🇪 Dikelola oleh Aviontex                                                                                                                    |
| [OpenDNS][opendns-family]                | [Instal][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *malware*, *konten dewasa*                                                                                                                                                                                                                                                                                       | 🇺🇸 Dikelola oleh Cisco OpenDNS LLC                                                                                                           |
| [Quad9][quad9-default]                   | [Instal][quad9-nofilter-https-signed]         | [Bawaan][quad9-default-https-signed] · *malware*<br>[Dengan ECS][quad9-ECS-https-signed] · *malware*                                                                                                                                                                                                                                                           | 🇨🇭 Dikelola oleh Yayasan Quad9                                                                                                               |
| [Tiarap][tiarapp-default]                |                                               | [Instal][tiarapp-default-https-signed] · *malware*, *iklan*, *pelacakan*, *phishing*                                                                                                                                                                                                                                                                           | 🇸🇬 🇺🇸 Dikelola oleh Tiarap Inc.                                                                                                              |
| [Wikimedia DNS][wikimedia-default]       | [Instal][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                | 🇺🇸 Dikelola oleh Yayasan Wikimedia. Layanan beta, ketersediaannya tidak dijamin                                                              |

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

