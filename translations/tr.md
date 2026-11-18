<!-- Generated from src/languages/tr.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [Deutsch](de.md) | [Español](es.md) | [Français](fr.md) | [日本語](ja.md) | [Русский](ru.md) | Türkçe | [Українська](uk.md) | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

# encrypted-dns-configs

Bu depo, [HTTPS üzerinden DNS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) ve [TLS üzerinden DNS](https://en.wikipedia.org/wiki/DNS_over_TLS) için yapılandırma profilleri içerir. Bu yöntemlerin nasıl çalıştığını [şifreli DNS yazısında](https://paulmillr.com/posts/encrypted-dns/) okuyabilirsiniz. Yeni bir sağlayıcı eklemek veya mevcut bir sağlayıcının ayarlarını güncellemek için [katkı kılavuzunu](../CONTRIBUTING.md) inceleyin.

## Kullanım

Aşağıdaki tablodan bir HTTPS profili indirip yükleyin.

#### iPhone ve iPad

1. Bağlantıyı Safari’de açın ve “İzin Ver” düğmesine dokunun.
2. Profili indirdikten sonra yüklemek için 8 dakikanız var. Ayarlar’da “Profil İndirildi” seçeneğine dokunun. Profili Ayarlar > Genel > VPN ve Aygıt Yönetimi bölümünden de açabilirsiniz. Ardından “Yükle” düğmesine dokunun.
    - Çalınan Aygıt Koruması açıksa profili yüklemek için ev veya iş yeri gibi iPhone’un tanıdığı bir konumda olmanız gerekebilir.

#### Mac

1. Dosya adı `.mobileconfig.txt` ile bitiyorsa sondaki .txt uzantısını kaldırın. Ardından `.mobileconfig` dosyasına çift tıklayın.
2. Sistem Ayarları > Genel > Aygıt Yönetimi’ni açın. macOS 13 ve 14’te Sistem Ayarları > Gizlilik ve Güvenlik > Profiller yolunu izleyin. Profile çift tıklayın ve “Yükle” düğmesini tıklayın.

#### Profil değiştirme

Birden fazla profil yükleyebilirsiniz. Aynı anda yalnızca biri etkin olabilir. Kullanmak istediğiniz profili aşağıdaki menüden seçin. Ağın şifresiz DNS hizmetini kullanmak için “Otomatik” seçeneğine geçin.

- iPhone ve iPad: Ayarlar > Genel > VPN, DNS ve Aygıt Yönetimi > DNS
- Mac: Sistem Ayarları > Ağ > VPN ve Filtreler (macOS 13 ve 14’te Filtreler)
- Profili güncelledikten sonra eski sürüm hâlâ yüklüyse kaldırın.

#### Profili test etme

- Sağlayıcınızın test sayfasını açın. Cloudflare kullanıyorsanız [1.1.1.1/help](https://1.1.1.1/help) sayfasına gidin.

#### Sınırlamalar

- HTTPS’yi tercih edin. TLS üzerinden DNS, kolayca engellenebilen 853 numaralı portu kullanır.
- Firefox bazı bölgelerde profilin şifreli DNS ayarlarını kullanmaz. App Store, “Güvenli DNS kullan” ayarı açık olan Chrome, VPN’ler, iCloud Özel Geçişi, Little Snitch, LuLu, Kişisel Erişim Noktası’na bağlı aygıtlar, `dig` gibi komut satırı araçları ve Wi-Fi oturum açma sayfaları da bu ayarları kullanmaz.
- Profilde `ServerAddresses` yoksa aygıt, DNS sunucusunun IP adresini öğrenmek için önce şifresiz bir DNS sorgusu yapar.

## Sağlayıcılar

Etiketler her profilin neleri engellediğini gösterir. Bir profilde *karma içerikli siteler* etiketi varsa hem yetişkinlere hem de genel kitleye yönelik içerik barındıran siteler de engellenir. Sağlayıcı hangi kategorileri engellediğini açıklamıyorsa tabloda *kategori belirtilmemiş* yazar. Filtreleme, engellenen alan adları için verilen DNS yanıtını (`hostname=IP` eşleşmesini) değiştirir. Engellenen siteler ülkeye göre değişebilir.

TLS üzerinden DNS profilleri ve imzasız sürümler dâhil tüm profilleri [ALL-PROFILES.md](../ALL-PROFILES.md) dosyasında bulabilirsiniz.

| Sağlayıcı                                | Filtresiz                                    | Filtreli                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Notlar                                                                                                                                                                      |
| ---------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]          |                                              | [Yükle][360-default-https-signed] · *kategori belirtilmemiş*                                                                                                                                                                                                                                                                                                                                                                                                 | 🇨🇳 360 Digital Security Group tarafından işletilir                                                                                                                          |
| [AdGuard DNS][adguard-default]           | [Yükle][adguard-nofilter-https-signed]       | [Varsayılan][adguard-default-https-signed] · *reklam*, *izleyiciler*, *kimlik avı*<br>[Aile][adguard-family-https-signed] · *kötü amaçlı yazılım*, *yetişkinlere yönelik içerik*, *reklam*, *izleyiciler*, *kimlik avı* ([ayrıntılar][adguard-family])                                                                                                                                                                                                       | 🇷🇺 AdGuard Software Ltd. tarafından işletilir                                                                                                                               |
| [ADNull DNS][adnull-default]             |                                              | [Yükle][adnull-default-https-signed] · *reklam*, *izleyiciler*                                                                                                                                                                                                                                                                                                                                                                                               | 🇺🇦 ADNull tarafından işletilir. Ücretli planlarla DNS ayarlarını özelleştirebilir, reklamları ve kimlik avı sitelerini engellemek için gelişmiş filtreler kullanabilirsiniz |
| [Aliyun Public DNS][alibaba-default]     | [Yükle][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 🇨🇳 Alibaba Cloud Ltd. tarafından işletilir                                                                                                                                  |
| [BeatQuantum DNS][beatquantum-default]   | [Yükle][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 🇬🇧 BeatQuantum Limited tarafından işletilir. DNSSEC desteği sunar. Anahtar değişimi için klasik, hibrit ve kuantum sonrası (ML-KEM) yöntemleri destekler                    |
| [BlahDNS][blahdns-germany]               |                                              | [Almanya][blahdns-germany-https-signed] · *kötü amaçlı yazılım*, *reklam*, *izleyiciler*<br>[Singapur][blahdns-singapore-https-signed] · *kötü amaçlı yazılım*, *reklam*, *izleyiciler*                                                                                                                                                                                                                                                                      | 🇩🇪 🇸🇬                                                                                                                                                                       |
| [Canadian Shield][canadianshield-family] | [Yükle][canadianshield-private-https-signed] | [Aile][canadianshield-family-https-signed] · *kötü amaçlı yazılım*, *yetişkinlere yönelik içerik*, *kimlik avı*<br>[Korumalı][canadianshield-protected-https-signed] · *kötü amaçlı yazılım*, *kimlik avı*                                                                                                                                                                                                                                                   | 🇨🇦 Kanada İnternet Kayıt Kurumu (CIRA) tarafından işletilir                                                                                                                 |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                              | [Yetişkinlere yönelik içerik filtresi][cleanbrowsing-adult-https-signed] · *kötü amaçlı yazılım*, *yetişkinlere yönelik içerik*, *kimlik avı*<br>[Aile filtresi][cleanbrowsing-family-https-signed] · *kötü amaçlı yazılım*, *yetişkinlere yönelik içerik*, *kimlik avı*, *karma içerikli siteler*<br>[Güvenlik filtresi][cleanbrowsing-security-https-signed] · *kötü amaçlı yazılım*, *kimlik avı*                                                         | 🇺🇸                                                                                                                                                                          |
| [Cloudflare 1.1.1.1][cloudflare-default] | [Yükle][cloudflare-default-https-signed]     | [Aile][cloudflare-family-https-signed] · *kötü amaçlı yazılım*, *yetişkinlere yönelik içerik*, *kimlik avı* ([ayrıntılar][cloudflare-family])<br>[Güvenlik][cloudflare-malware-https-signed] · *kötü amaçlı yazılım*, *kimlik avı*                                                                                                                                                                                                                           | 🇺🇸 Cloudflare Inc. tarafından işletilir                                                                                                                                     |
| [DNS4EU][dns4eu-default]                 | [Yükle][dns4eu-default-https-signed]         | [Güvenlik][dns4eu-malware-https-signed] · *kötü amaçlı yazılım*<br>[Reklam engelleme][dns4eu-protective-ads-https-signed] · *kötü amaçlı yazılım*, *reklam*<br>[Çocuklar için içerik filtresi][dns4eu-protective-child-https-signed] · *kötü amaçlı yazılım*, *yetişkinlere yönelik içerik*<br>[Çocuklar için içerik filtresi + reklam engelleme][dns4eu-protective-child-ads-https-signed] · *kötü amaçlı yazılım*, *yetişkinlere yönelik içerik*, *reklam* | 🇨🇿 Whalebone liderliğindeki bir konsorsiyum tarafından işletilir                                                                                                            |
| [DNSPod Public DNS][dnspod-default]      | [Yükle][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 🇨🇳 DNSPod Inc. (Tencent Cloud) tarafından işletilir                                                                                                                         |
| [FDN][fdn-default]                       | [Yükle][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 🇫🇷 French Data Network tarafından işletilir                                                                                                                                 |
| [FFMUC-DNS][ffmuc-dns-default]           | [Yükle][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 🇩🇪 Freifunk München tarafından işletilir                                                                                                                                    |
| [Google Public DNS][google-default]      | [Yükle][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 🇺🇸 Google LLC tarafından işletilir                                                                                                                                          |
| [keweonDNS][keweondns-default]           |                                              | [Yükle][keweondns-default-https-signed] · *reklam*, *izleyiciler*                                                                                                                                                                                                                                                                                                                                                                                            | 🇩🇪 Aviontex tarafından işletilir                                                                                                                                            |
| [OpenDNS][opendns-family]                | [Yükle][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *kötü amaçlı yazılım*, *yetişkinlere yönelik içerik*                                                                                                                                                                                                                                                                                                                                                           | 🇺🇸 Cisco OpenDNS LLC tarafından işletilir                                                                                                                                   |
| [Quad9][quad9-default]                   | [Yükle][quad9-nofilter-https-signed]         | [Varsayılan][quad9-default-https-signed] · *kötü amaçlı yazılım*<br>[ECS destekli][quad9-ECS-https-signed] · *kötü amaçlı yazılım*                                                                                                                                                                                                                                                                                                                           | 🇨🇭 Quad9 Vakfı tarafından işletilir                                                                                                                                         |
| [Tiarap][tiarapp-default]                |                                              | [Yükle][tiarapp-default-https-signed] · *kötü amaçlı yazılım*, *reklam*, *izleyiciler*, *kimlik avı*                                                                                                                                                                                                                                                                                                                                                         | 🇸🇬 🇺🇸 Tiarap Inc. tarafından işletilir                                                                                                                                      |
| [Wikimedia DNS][wikimedia-default]       | [Yükle][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 🇺🇸 Wikimedia Vakfı tarafından işletilir. Hizmet beta aşamasında. Kesintisiz çalışacağı garanti edilmiyor                                                                    |

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

