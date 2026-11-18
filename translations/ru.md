<!-- Generated from src/languages/ru.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [العربية](ar.md) | [Deutsch](de.md) | [Español](es.md) | [Français](fr.md) | [Bahasa Indonesia](id.md) | [日本語](ja.md) | [Português](pt.md) | Русский | [Türkçe](tr.md) | [Українська](uk.md) | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

# encrypted-dns-configs

Профили конфигурации для [DNS поверх HTTPS](https://ru.wikipedia.org/wiki/DNS_поверх_HTTPS) и [DNS поверх TLS](https://ru.wikipedia.org/wiki/DNS_поверх_TLS). Подробнее о шифровании DNS — [в статье](https://paulmillr.com/posts/encrypted-dns/). В [руководстве для участников проекта](../CONTRIBUTING.md) описано, как добавить провайдера или обновить сведения о нём.

## Использование

Скачайте HTTPS-профиль из таблицы ниже и установите его.

#### iPhone и iPad

1. Откройте ссылку в Safari и нажмите «Разрешить».
2. Установите профиль в течение 8 минут после скачивания. Откройте «Настройки» и нажмите «Профиль загружен». Профиль также можно найти в разделе «Основные» > «VPN и управление устройством». Затем нажмите «Установить».
    - Если функция «Защита украденного устройства» мешает установить профиль, попробуйте снова в знакомом месте.

#### Mac

1. Имя файла должно заканчиваться на `.mobileconfig`. Если оно заканчивается на `.mobileconfig.txt`, удалите лишнее «.txt». Откройте файл двойным щелчком.
2. Откройте «Системные настройки» > «Основные» > «Управление устройством». В macOS 13 и 14 профиль находится в разделе «Конфиденциальность и безопасность» > «Профили». Откройте профиль двойным щелчком и нажмите «Установить».

#### Переключение профилей

Можно установить несколько профилей и пользоваться одним из них. Выберите нужный профиль. Чтобы использовать DNS сети без шифрования, выберите «Автоматически».

- iPhone и iPad — «Настройки» > «Основные» > «VPN, DNS и управление устройством» > «DNS».
- Mac — «Системные настройки» > «Сеть» > «VPN и фильтры» («Фильтры» в macOS 13 и 14).
- Если после обновления осталась старая версия профиля, удалите её.

#### Проверка работы

- Откройте тестовую страницу выбранного провайдера. Для Cloudflare это [1.1.1.1/help](https://1.1.1.1/help).

#### Ограничения

- По возможности используйте HTTPS. DNS поверх TLS работает через порт 853, который легко заблокировать.
- Некоторые приложения и функции отправляют DNS-запросы в обход профиля. Это касается Firefox в некоторых регионах, App Store и Chrome с включённым параметром «Использовать безопасный DNS-сервер». То же относится к VPN, функции «Частный узел iCloud», Little Snitch, LuLu, устройствам, подключённым в режиме модема, утилитам командной строки вроде `dig` и страницам авторизации в сетях Wi-Fi.
- Если в профиле нет поля `ServerAddresses`, система сначала определит IP-адрес DNS-сервера по его имени с помощью незашифрованного DNS-запроса.

## Провайдеры

Метки рядом со ссылками показывают, что блокирует каждый профиль. Метка *смешанный контент* обозначает сайты, где есть материалы и для взрослых, и для широкой аудитории. При метке *не указано* провайдер не уточняет, какие категории блокирует. Для заблокированных доменов меняется ответ DNS (`имя хоста=IP`). Правила фильтрации могут различаться по странам.

Полный список — в [ALL-PROFILES.md](../ALL-PROFILES.md). Там есть профили для DNS поверх TLS и версии без подписи.

| Провайдер                                | Без фильтрации                                    | С фильтрацией                                                                                                                                                                                                                                                                                                                                                                                       | Примечания                                                                                                                           |
| ---------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [360 Security DNS][360-default]          |                                                   | [Установить][360-default-https-signed] · *не указано*                                                                                                                                                                                                                                                                                                                                               | 🇨🇳 оператор — 360 Digital Security Group                                                                                             |
| [AdGuard DNS][adguard-default]           | [Установить][adguard-nofilter-https-signed]       | [По умолчанию][adguard-default-https-signed] · *реклама*, *трекеры*, *фишинг*<br>[Семейная защита][adguard-family-https-signed] · *вредоносное ПО*, *контент для взрослых*, *реклама*, *трекеры*, *фишинг* ([подробнее][adguard-family])                                                                                                                                                            | 🇷🇺 оператор — AdGuard Software Ltd.                                                                                                  |
| [ADNull DNS][adnull-default]             |                                                   | [Установить][adnull-default-https-signed] · *реклама*, *трекеры*                                                                                                                                                                                                                                                                                                                                    | 🇺🇦 оператор — ADNull. На платных тарифах можно настроить DNS под себя и гибче управлять блокировкой рекламы и фишинговых сайтов      |
| [Aliyun Public DNS][alibaba-default]     | [Установить][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                                                                     | 🇨🇳 оператор — Alibaba Cloud Ltd.                                                                                                     |
| [BeatQuantum DNS][beatquantum-default]   | [Установить][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                                                                     | 🇬🇧 оператор — BeatQuantum Limited. Поддерживает DNSSEC, классический и гибридный обмен ключами, а также постквантовый обмен с ML-KEM |
| [BlahDNS][blahdns-germany]               |                                                   | [Германия][blahdns-germany-https-signed] · *вредоносное ПО*, *реклама*, *трекеры*<br>[Сингапур][blahdns-singapore-https-signed] · *вредоносное ПО*, *реклама*, *трекеры*                                                                                                                                                                                                                            | 🇩🇪 🇸🇬                                                                                                                                |
| [Canadian Shield][canadianshield-family] | [Установить][canadianshield-private-https-signed] | [Семейный фильтр][canadianshield-family-https-signed] · *вредоносное ПО*, *контент для взрослых*, *фишинг*<br>[Защита от угроз][canadianshield-protected-https-signed] · *вредоносное ПО*, *фишинг*                                                                                                                                                                                                 | 🇨🇦 оператор — Канадское управление по регистрации доменов (CIRA)                                                                     |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                                   | [Фильтр контента для взрослых][cleanbrowsing-adult-https-signed] · *вредоносное ПО*, *контент для взрослых*, *фишинг*<br>[Семейный фильтр][cleanbrowsing-family-https-signed] · *вредоносное ПО*, *контент для взрослых*, *фишинг*, *смешанный контент*<br>[Фильтр безопасности][cleanbrowsing-security-https-signed] · *вредоносное ПО*, *фишинг*                                                  | 🇺🇸                                                                                                                                   |
| [Cloudflare 1.1.1.1][cloudflare-default] | [Установить][cloudflare-default-https-signed]     | [Семейный фильтр][cloudflare-family-https-signed] · *вредоносное ПО*, *контент для взрослых*, *фишинг* ([подробнее][cloudflare-family])<br>[Защита от угроз][cloudflare-malware-https-signed] · *вредоносное ПО*, *фишинг*                                                                                                                                                                          | 🇺🇸 оператор — Cloudflare Inc.                                                                                                        |
| [DNS4EU][dns4eu-default]                 | [Установить][dns4eu-default-https-signed]         | [С защитой][dns4eu-malware-https-signed] · *вредоносное ПО*<br>[Блокировка рекламы][dns4eu-protective-ads-https-signed] · *вредоносное ПО*, *реклама*<br>[Детский фильтр][dns4eu-protective-child-https-signed] · *вредоносное ПО*, *контент для взрослых*<br>[Детский фильтр и блокировка рекламы][dns4eu-protective-child-ads-https-signed] · *вредоносное ПО*, *контент для взрослых*, *реклама* | 🇨🇿 оператор — консорциум во главе с Whalebone                                                                                        |
| [DNSPod Public DNS][dnspod-default]      | [Установить][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                                     | 🇨🇳 оператор — DNSPod Inc. (Tencent Cloud)                                                                                            |
| [FDN][fdn-default]                       | [Установить][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                                                                     | 🇫🇷 оператор — French Data Network                                                                                                    |
| [FFMUC-DNS][ffmuc-dns-default]           | [Установить][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                                     | 🇩🇪 оператор — Freifunk München                                                                                                       |
| [Google Public DNS][google-default]      | [Установить][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                                     | 🇺🇸 оператор — Google LLC                                                                                                             |
| [keweonDNS][keweondns-default]           |                                                   | [Установить][keweondns-default-https-signed] · *реклама*, *трекеры*                                                                                                                                                                                                                                                                                                                                 | 🇩🇪 оператор — Aviontex                                                                                                               |
| [OpenDNS][opendns-family]                | [Установить][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *вредоносное ПО*, *контент для взрослых*                                                                                                                                                                                                                                                                                                              | 🇺🇸 оператор — Cisco OpenDNS LLC                                                                                                      |
| [Quad9][quad9-default]                   | [Установить][quad9-nofilter-https-signed]         | [По умолчанию][quad9-default-https-signed] · *вредоносное ПО*<br>[С поддержкой ECS][quad9-ECS-https-signed] · *вредоносное ПО*                                                                                                                                                                                                                                                                      | 🇨🇭 оператор — фонд Quad9                                                                                                             |
| [Tiarap][tiarapp-default]                |                                                   | [Установить][tiarapp-default-https-signed] · *вредоносное ПО*, *реклама*, *трекеры*, *фишинг*                                                                                                                                                                                                                                                                                                       | 🇸🇬 🇺🇸 оператор — Tiarap Inc.                                                                                                         |
| [Wikimedia DNS][wikimedia-default]       | [Установить][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                                     | 🇺🇸 оператор — Фонд Викимедиа. Бета-версия без гарантий доступности                                                                   |

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

