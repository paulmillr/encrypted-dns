<!-- Generated from src/languages/uk.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [العربية](ar.md) | [Deutsch](de.md) | [Español](es.md) | [Français](fr.md) | [Bahasa Indonesia](id.md) | [日本語](ja.md) | [Português](pt.md) | [Русский](ru.md) | [Türkçe](tr.md) | Українська | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

# encrypted-dns-configs

Профілі конфігурації для [DNS через HTTPS](https://uk.wikipedia.org/wiki/DNS_поверх_HTTPS) і [DNS через TLS](https://uk.wikipedia.org/wiki/DNS_поверх_TLS). Докладніше про шифрування DNS — [у статті](https://paulmillr.com/posts/encrypted-dns/). Як додати постачальника або оновити відомості про нього, описано в [посібнику для учасників проєкту](../CONTRIBUTING.md).

## Використання

Завантажте HTTPS-профіль із таблиці нижче й інсталюйте його.

#### iPhone та iPad

1. Відкрийте посилання в Safari й торкніться кнопки «Дозволити».
2. Інсталюйте профіль протягом 8 хвилин після завантаження. Відкрийте «Параметри» й торкніться повідомлення «Профіль викачано» або «Профіль завантажено». Профіль також можна знайти в розділі «Загальні» > «VPN і керування пристроями». Потім торкніться кнопки «Інсталювати».
    - Якщо функція «Захист украденого пристрою» заважає інсталювати профіль, спробуйте ще раз у знайомому місці.

#### Mac

1. Назва файлу має закінчуватися на `.mobileconfig`. Якщо вона закінчується на `.mobileconfig.txt`, приберіть зайве «.txt». Відкрийте файл подвійним клацанням.
2. Відкрийте «Системні параметри» й перейдіть до розділу «Загальні» > «Керування пристроями». У macOS 13 і 14 профіль можна знайти в розділі «Приватність і безпека» > «Профілі». Відкрийте профіль подвійним клацанням і натисніть «Інсталювати».

#### Перемикання профілів

Можна інсталювати кілька профілів і користуватися одним із них. Виберіть потрібний профіль. Щоб користуватися DNS мережі без шифрування, виберіть «Автоматично».

- iPhone та iPad — «Параметри» > «Загальні» > «VPN, DNS і керування пристроями» > «DNS».
- Mac — «Системні параметри» > «Мережа» > «VPN і фільтри» («Фільтри» в macOS 13 і 14).
- Якщо після оновлення залишилася попередня версія профілю, видаліть її.

#### Перевірка роботи

- Відкрийте сторінку перевірки свого постачальника. Для Cloudflare це [1.1.1.1/help](https://1.1.1.1/help).

#### Обмеження

- За можливості користуйтеся HTTPS. DNS через TLS використовує порт 853, який легко заблокувати.
- Деякі програми й функції надсилають DNS-запити в обхід профілю. Це стосується Firefox у деяких регіонах, App Store і Chrome з увімкненим параметром «Використовувати захищений DNS-сервер». Те саме стосується VPN, функції «Приват-реле iCloud», Little Snitch, LuLu, пристроїв, під’єднаних через функцію «Власна точка доступу», утиліт командного рядка на кшталт `dig` і сторінок входу до мереж Wi-Fi.
- Якщо в профілі пропущено поле `ServerAddresses`, система спочатку визначає IP-адресу DNS-сервера за його іменем за допомогою незашифрованого DNS-запиту.

## Постачальники

Позначки біля посилань показують, що блокує кожен профіль. Позначка *змішаний вміст* стосується сайтів, де є як матеріали для дорослих, так і матеріали для широкої аудиторії. Позначка *не зазначено* означає, що постачальник не вказав категорії блокування. Фільтрування змінює відповідь DNS (`ім’я хоста=IP`) для заблокованих доменів. Правила можуть різнитися залежно від країни.

Повний список — у [ALL-PROFILES.md](../ALL-PROFILES.md). Там є профілі для DNS через TLS і версії без підпису.

| Постачальник                             | Без фільтрування                                   | З фільтруванням                                                                                                                                                                                                                                                                                                                                                                       | Примітки                                                                                                                                     |
| ---------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]          |                                                    | [Інсталювати][360-default-https-signed] · *не зазначено*                                                                                                                                                                                                                                                                                                                              | 🇨🇳 оператор — 360 Digital Security Group                                                                                                     |
| [AdGuard DNS][adguard-default]           | [Інсталювати][adguard-nofilter-https-signed]       | [Типовий][adguard-default-https-signed] · *реклама*, *трекери*, *фішинг*<br>[Сімейний захист][adguard-family-https-signed] · *шкідливе ПЗ*, *вміст для дорослих*, *реклама*, *трекери*, *фішинг* ([докладніше][adguard-family])                                                                                                                                                       | 🇷🇺 оператор — AdGuard Software Ltd.                                                                                                          |
| [ADNull DNS][adnull-default]             |                                                    | [Інсталювати][adnull-default-https-signed] · *реклама*, *трекери*                                                                                                                                                                                                                                                                                                                     | 🇺🇦 оператор — ADNull. Платні тарифи дають змогу налаштувати DNS під свої потреби й точніше керувати блокуванням реклами та фішингових сайтів |
| [Aliyun Public DNS][alibaba-default]     | [Інсталювати][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                                                       | 🇨🇳 оператор — Alibaba Cloud Ltd.                                                                                                             |
| [BeatQuantum DNS][beatquantum-default]   | [Інсталювати][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                                                       | 🇬🇧 оператор — BeatQuantum Limited. Підтримує DNSSEC, класичний і гібридний обмін ключами, а також постквантовий обмін із ML-KEM              |
| [BlahDNS][blahdns-germany]               |                                                    | [Німеччина][blahdns-germany-https-signed] · *шкідливе ПЗ*, *реклама*, *трекери*<br>[Сінгапур][blahdns-singapore-https-signed] · *шкідливе ПЗ*, *реклама*, *трекери*                                                                                                                                                                                                                   | 🇩🇪 🇸🇬                                                                                                                                        |
| [Canadian Shield][canadianshield-family] | [Інсталювати][canadianshield-private-https-signed] | [Сімейний фільтр][canadianshield-family-https-signed] · *шкідливе ПЗ*, *вміст для дорослих*, *фішинг*<br>[Захист від загроз][canadianshield-protected-https-signed] · *шкідливе ПЗ*, *фішинг*                                                                                                                                                                                         | 🇨🇦 оператор — Канадська служба реєстрації доменів (CIRA)                                                                                     |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                                    | [Фільтр вмісту для дорослих][cleanbrowsing-adult-https-signed] · *шкідливе ПЗ*, *вміст для дорослих*, *фішинг*<br>[Сімейний фільтр][cleanbrowsing-family-https-signed] · *шкідливе ПЗ*, *вміст для дорослих*, *фішинг*, *змішаний вміст*<br>[Фільтр безпеки][cleanbrowsing-security-https-signed] · *шкідливе ПЗ*, *фішинг*                                                           | 🇺🇸                                                                                                                                           |
| [Cloudflare 1.1.1.1][cloudflare-default] | [Інсталювати][cloudflare-default-https-signed]     | [Сімейний фільтр][cloudflare-family-https-signed] · *шкідливе ПЗ*, *вміст для дорослих*, *фішинг* ([докладніше][cloudflare-family])<br>[Захист від загроз][cloudflare-malware-https-signed] · *шкідливе ПЗ*, *фішинг*                                                                                                                                                                 | 🇺🇸 оператор — Cloudflare Inc.                                                                                                                |
| [DNS4EU][dns4eu-default]                 | [Інсталювати][dns4eu-default-https-signed]         | [Із захистом][dns4eu-malware-https-signed] · *шкідливе ПЗ*<br>[Блокування реклами][dns4eu-protective-ads-https-signed] · *шкідливе ПЗ*, *реклама*<br>[Дитячий фільтр][dns4eu-protective-child-https-signed] · *шкідливе ПЗ*, *вміст для дорослих*<br>[Дитячий фільтр і блокування реклами][dns4eu-protective-child-ads-https-signed] · *шкідливе ПЗ*, *вміст для дорослих*, *реклама* | 🇨🇿 оператор — консорціум на чолі з Whalebone                                                                                                 |
| [DNSPod Public DNS][dnspod-default]      | [Інсталювати][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                       | 🇨🇳 оператор — DNSPod Inc. (Tencent Cloud)                                                                                                    |
| [FDN][fdn-default]                       | [Інсталювати][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                                                       | 🇫🇷 оператор — French Data Network                                                                                                            |
| [FFMUC-DNS][ffmuc-dns-default]           | [Інсталювати][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                       | 🇩🇪 оператор — Freifunk München                                                                                                               |
| [Google Public DNS][google-default]      | [Інсталювати][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                       | 🇺🇸 оператор — Google LLC                                                                                                                     |
| [keweonDNS][keweondns-default]           |                                                    | [Інсталювати][keweondns-default-https-signed] · *реклама*, *трекери*                                                                                                                                                                                                                                                                                                                  | 🇩🇪 оператор — Aviontex                                                                                                                       |
| [OpenDNS][opendns-family]                | [Інсталювати][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *шкідливе ПЗ*, *вміст для дорослих*                                                                                                                                                                                                                                                                                                     | 🇺🇸 оператор — Cisco OpenDNS LLC                                                                                                              |
| [Quad9][quad9-default]                   | [Інсталювати][quad9-nofilter-https-signed]         | [Типовий][quad9-default-https-signed] · *шкідливе ПЗ*<br>[З підтримкою ECS][quad9-ECS-https-signed] · *шкідливе ПЗ*                                                                                                                                                                                                                                                                   | 🇨🇭 оператор — фонд Quad9                                                                                                                     |
| [Tiarap][tiarapp-default]                |                                                    | [Інсталювати][tiarapp-default-https-signed] · *шкідливе ПЗ*, *реклама*, *трекери*, *фішинг*                                                                                                                                                                                                                                                                                           | 🇸🇬 🇺🇸 оператор — Tiarap Inc.                                                                                                                 |
| [Wikimedia DNS][wikimedia-default]       | [Інсталювати][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                       | 🇺🇸 оператор — Фонд Вікімедіа. Бета-версія без гарантій доступності                                                                           |

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

