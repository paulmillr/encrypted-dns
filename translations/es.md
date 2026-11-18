<!-- Generated from src/languages/es.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [Deutsch](de.md) | Español | [Français](fr.md) | [日本語](ja.md) | [Русский](ru.md) | [Türkçe](tr.md) | [Українська](uk.md) | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

# encrypted-dns-configs

Perfiles de configuración para [DNS sobre HTTPS](https://es.wikipedia.org/wiki/DNS_mediante_HTTPS) y [DNS sobre TLS](https://es.wikipedia.org/wiki/DNS_mediante_TLS). Consulta el [artículo sobre DNS cifrado](https://paulmillr.com/posts/encrypted-dns/) para saber más. La [guía de contribución](../CONTRIBUTING.md) explica cómo añadir un proveedor o actualizar su ficha.

## Uso

Descarga un perfil HTTPS de la tabla de proveedores e instálalo.

#### iPhone y iPad

1. Abre el enlace en Safari y toca «Permitir».
2. Instala el perfil dentro de los 8 minutos posteriores a la descarga. Abre «Ajustes» («Configuración» en Latinoamérica) y toca «Perfil descargado». También puedes buscarlo en «General» > «VPN y gestión de dispositivos» («Admón. de dispositivos y VPN» en Latinoamérica). Después toca «Instalar».
    - Si la protección antirrobo del iPhone impide la instalación, inténtalo de nuevo desde un lugar conocido.

#### Mac

1. El nombre del archivo debe terminar en `.mobileconfig`. Si termina en `.mobileconfig.txt`, quita el «.txt» del final. Abre el archivo con un doble clic.
2. Abre «Ajustes del Sistema» > «General» > «Gestión de dispositivos». En Latinoamérica, la ruta es «Configuración del Sistema» > «General» > «Administración de dispositivos». En macOS 13 y 14, busca el perfil en «Privacidad y seguridad» > «Perfiles». Haz doble clic en el perfil y selecciona «Instalar».

#### Cambiar de perfil

Puedes instalar varios perfiles y usar uno a la vez. Selecciona el perfil que quieras usar. Si prefieres el DNS sin cifrar de la red, elige «Automático».

- iPhone y iPad — En «Ajustes» > «General» > «VPN, DNS y gestión de dispositivos», toca «DNS». En Latinoamérica, entra en «Configuración» > «General» y busca «DNS» en el menú de administración de dispositivos y VPN.
- Mac — En «Ajustes del Sistema» («Configuración del Sistema» en Latinoamérica), abre «Red» > «VPN y filtros». En macOS 13 y 14, selecciona «Filtros».
- Si la versión anterior del perfil sigue instalada después de actualizarlo, elimínala.

#### Comprobar que funciona

- Abre la página de prueba de tu proveedor. La de Cloudflare es [1.1.1.1/help](https://1.1.1.1/help).

#### Limitaciones

- Usa HTTPS siempre que puedas. El DNS sobre TLS usa el puerto 853, que las redes pueden bloquear fácilmente.
- Algunas apps y funciones usan su propio DNS o el de la red. Esto ocurre con Firefox en algunas regiones, con App Store y con Chrome si está activada la opción «Usar DNS seguro». También pueden omitir el perfil las VPN, Relay privado de iCloud (Retransmisión privada en Latinoamérica), Little Snitch, LuLu, los dispositivos conectados a tu Punto de acceso personal (Compartir Internet en Latinoamérica), las herramientas de línea de comandos como `dig` y las páginas de inicio de sesión de las redes wifi.
- Si el perfil omite `ServerAddresses`, el sistema primero resuelve el nombre del servidor DNS mediante una consulta sin cifrar.

## Proveedores

Las etiquetas indican qué tipos de dominios bloquea cada perfil. *contenido mixto* se refiere a los sitios que combinan material para adultos con material apto para todo público. La etiqueta *sin especificar* indica que el proveedor no detalla qué bloquea. En los dominios bloqueados, el filtro altera la respuesta DNS (`nombre de host=IP`). Las reglas pueden variar según el país.

En [ALL-PROFILES.md](../ALL-PROFILES.md) están todos los perfiles, incluidos los de DNS sobre TLS y las versiones sin firmar.

| Proveedor                                | Sin filtrado                                    | Con filtrado                                                                                                                                                                                                                                                                                                                                                                             | Notas                                                                                                                                  |
| ---------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]          |                                                 | [Instalar][360-default-https-signed] · *sin especificar*                                                                                                                                                                                                                                                                                                                                 | 🇨🇳 a cargo de 360 Digital Security Group                                                                                               |
| [AdGuard DNS][adguard-default]           | [Instalar][adguard-nofilter-https-signed]       | [Predeterminado][adguard-default-https-signed] · *anuncios*, *rastreadores*, *phishing*<br>[Protección familiar][adguard-family-https-signed] · *malware*, *contenido para adultos*, *anuncios*, *rastreadores*, *phishing* ([detalles][adguard-family])                                                                                                                                 | 🇷🇺 a cargo de AdGuard Software Ltd.                                                                                                    |
| [ADNull DNS][adnull-default]             |                                                 | [Instalar][adnull-default-https-signed] · *anuncios*, *rastreadores*                                                                                                                                                                                                                                                                                                                     | 🇺🇦 a cargo de ADNull. Los planes de pago permiten personalizar el DNS y ofrecen filtros avanzados contra anuncios y sitios de phishing |
| [Aliyun Public DNS][alibaba-default]     | [Instalar][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                                                          | 🇨🇳 a cargo de Alibaba Cloud Ltd.                                                                                                       |
| [BeatQuantum DNS][beatquantum-default]   | [Instalar][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                                                          | 🇬🇧 a cargo de BeatQuantum Limited. DNSSEC. Admite el intercambio de claves clásico e híbrido, así como el poscuántico mediante ML-KEM  |
| [BlahDNS][blahdns-germany]               |                                                 | [Alemania][blahdns-germany-https-signed] · *malware*, *anuncios*, *rastreadores*<br>[Singapur][blahdns-singapore-https-signed] · *malware*, *anuncios*, *rastreadores*                                                                                                                                                                                                                   | 🇩🇪 🇸🇬                                                                                                                                  |
| [Canadian Shield][canadianshield-family] | [Instalar][canadianshield-private-https-signed] | [Protección familiar][canadianshield-family-https-signed] · *malware*, *contenido para adultos*, *phishing*<br>[Con protección][canadianshield-protected-https-signed] · *malware*, *phishing*                                                                                                                                                                                           | 🇨🇦 a cargo de la Autoridad Canadiense de Registro de Internet (CIRA)                                                                   |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                                 | [Filtro de contenido para adultos][cleanbrowsing-adult-https-signed] · *malware*, *contenido para adultos*, *phishing*<br>[Filtro familiar][cleanbrowsing-family-https-signed] · *malware*, *contenido para adultos*, *phishing*, *contenido mixto*<br>[Filtro de seguridad][cleanbrowsing-security-https-signed] · *malware*, *phishing*                                                | 🇺🇸                                                                                                                                     |
| [Cloudflare 1.1.1.1][cloudflare-default] | [Instalar][cloudflare-default-https-signed]     | [Protección familiar][cloudflare-family-https-signed] · *malware*, *contenido para adultos*, *phishing* ([detalles][cloudflare-family])<br>[Filtro de seguridad][cloudflare-malware-https-signed] · *malware*, *phishing*                                                                                                                                                                | 🇺🇸 a cargo de Cloudflare Inc.                                                                                                          |
| [DNS4EU][dns4eu-default]                 | [Instalar][dns4eu-default-https-signed]         | [Con protección][dns4eu-malware-https-signed] · *malware*<br>[Bloqueo de anuncios][dns4eu-protective-ads-https-signed] · *malware*, *anuncios*<br>[Control parental][dns4eu-protective-child-https-signed] · *malware*, *contenido para adultos*<br>[Control parental y bloqueo de anuncios][dns4eu-protective-child-ads-https-signed] · *malware*, *contenido para adultos*, *anuncios* | 🇨🇿 a cargo de un consorcio liderado por Whalebone                                                                                      |
| [DNSPod Public DNS][dnspod-default]      | [Instalar][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                          | 🇨🇳 a cargo de DNSPod Inc. (Tencent Cloud)                                                                                              |
| [FDN][fdn-default]                       | [Instalar][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                                                          | 🇫🇷 a cargo de French Data Network                                                                                                      |
| [FFMUC-DNS][ffmuc-dns-default]           | [Instalar][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                          | 🇩🇪 a cargo de Freifunk München                                                                                                         |
| [Google Public DNS][google-default]      | [Instalar][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                          | 🇺🇸 a cargo de Google LLC                                                                                                               |
| [keweonDNS][keweondns-default]           |                                                 | [Instalar][keweondns-default-https-signed] · *anuncios*, *rastreadores*                                                                                                                                                                                                                                                                                                                  | 🇩🇪 a cargo de Aviontex                                                                                                                 |
| [OpenDNS][opendns-family]                | [Instalar][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *malware*, *contenido para adultos*                                                                                                                                                                                                                                                                                                        | 🇺🇸 a cargo de Cisco OpenDNS LLC                                                                                                        |
| [Quad9][quad9-default]                   | [Instalar][quad9-nofilter-https-signed]         | [Predeterminado][quad9-default-https-signed] · *malware*<br>[Con ECS][quad9-ECS-https-signed] · *malware*                                                                                                                                                                                                                                                                                | 🇨🇭 a cargo de la Fundación Quad9                                                                                                       |
| [Tiarap][tiarapp-default]                |                                                 | [Instalar][tiarapp-default-https-signed] · *malware*, *anuncios*, *rastreadores*, *phishing*                                                                                                                                                                                                                                                                                             | 🇸🇬 🇺🇸 a cargo de Tiarap Inc.                                                                                                           |
| [Wikimedia DNS][wikimedia-default]       | [Instalar][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                          | 🇺🇸 a cargo de la Fundación Wikimedia. Servicio en fase beta, sin garantía de disponibilidad                                            |

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

