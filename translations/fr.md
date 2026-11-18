<!-- Generated from src/languages/fr.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [العربية](ar.md) | [Deutsch](de.md) | [Español](es.md) | Français | [Bahasa Indonesia](id.md) | [日本語](ja.md) | [Português](pt.md) | [Русский](ru.md) | [Türkçe](tr.md) | [Українська](uk.md) | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

# encrypted-dns-configs

Profils de configuration pour le [DNS via HTTPS](https://fr.wikipedia.org/wiki/DNS_over_HTTPS) et le [DNS via TLS](https://fr.wikipedia.org/wiki/DNS_over_TLS). Pour en savoir plus, consultez [l’article sur le DNS chiffré](https://paulmillr.com/posts/encrypted-dns/). Le [guide de contribution](../CONTRIBUTING.md) explique comment ajouter un fournisseur ou mettre sa fiche à jour.

## Utilisation

Téléchargez un profil HTTPS depuis le tableau ci-dessous, puis installez-le.

#### iPhone et iPad

1. Ouvrez le lien dans Safari et touchez « Autoriser ».
2. Installez le profil dans les 8 minutes qui suivent son téléchargement. Ouvrez « Réglages » et touchez « Profil téléchargé ». Vous pouvez aussi retrouver le profil dans « Général » > « VPN et gestion de l’appareil ». Touchez ensuite « Installer ».
    - Si la protection en cas de vol de l’appareil bloque l’installation, réessayez depuis un lieu familier.

#### Mac

1. Le nom du fichier doit se terminer par `.mobileconfig`. S’il se termine par `.mobileconfig.txt`, retirez le « .txt » final. Double-cliquez sur le fichier pour l’ouvrir.
2. Ouvrez « Réglages Système » > « Général » > « Gestion de l’appareil ». Sous macOS 13 et 14, le profil se trouve dans « Confidentialité et sécurité » > « Profils ». Double-cliquez sur le profil, puis cliquez sur « Installer ».

#### Changer de profil

Vous pouvez installer plusieurs profils et en utiliser un à la fois. Sélectionnez le profil voulu. Pour revenir au DNS non chiffré du réseau, choisissez « Automatique ».

- iPhone et iPad — « Réglages » > « Général » > « VPN, DNS et gestion de l’appareil » > « DNS ».
- Mac — « Réglages Système » > « Réseau » > « VPN et filtres » (« Filtres » sous macOS 13 et 14).
- Si l’ancienne version du profil est toujours installée après la mise à jour, supprimez-la.

#### Vérifier le fonctionnement

- Ouvrez la page de test de votre fournisseur. Pour Cloudflare, rendez-vous sur [1.1.1.1/help](https://1.1.1.1/help).

#### Limites

- Privilégiez HTTPS. Les réseaux peuvent facilement bloquer le port 853 utilisé pour le DNS via TLS.
- Certaines apps et fonctions utilisent leurs propres réglages DNS ou ceux du réseau. C’est le cas de Firefox dans certaines régions, de l’App Store et de Chrome lorsque l’option « Utiliser un DNS sécurisé » est activée. Les VPN, le Relais privé iCloud, Little Snitch, LuLu, les appareils connectés via le partage de connexion, les outils en ligne de commande comme `dig` et les portails de connexion des réseaux Wi-Fi peuvent aussi contourner le profil.
- Si le champ `ServerAddresses` est absent, l’appareil commence par chercher l’adresse IP du serveur DNS à partir de son nom d’hôte. Cette première requête DNS est envoyée en clair.

## Fournisseurs

Les catégories affichées à côté des liens indiquent ce que bloque chaque profil. *contenu mixte* désigne les sites qui mêlent du contenu pour adultes et du contenu tout public. La mention *non précisé* indique que le fournisseur ne détaille pas les catégories bloquées. Pour les domaines bloqués, le filtrage change la réponse DNS (`nom d’hôte=IP`). Les règles peuvent varier d’un pays à l’autre.

La liste complète figure dans [ALL-PROFILES.md](../ALL-PROFILES.md), avec les profils DNS via TLS et les versions non signées.

| Fournisseur                                        | Sans filtrage                                    | Avec filtrage                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Remarques                                                                                                                                                            |
| -------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]                    |                                                  | [Installer][360-default-https-signed] · *non précisé*                                                                                                                                                                                                                                                                                                                                                                                                          | 🇨🇳 par 360 Digital Security Group                                                                                                                                    |
| [AdGuard DNS][adguard-default]                     | [Installer][adguard-nofilter-https-signed]       | [Par défaut][adguard-default-https-signed] · *publicités*, *traqueurs*, *hameçonnage*<br>[Protection familiale][adguard-family-https-signed] · *logiciels malveillants*, *contenu pour adultes*, *publicités*, *traqueurs*, *hameçonnage* ([détails][adguard-family])                                                                                                                                                                                          | 🇷🇺 par AdGuard Software Ltd.                                                                                                                                         |
| [ADNull DNS][adnull-default]                       |                                                  | [Installer][adnull-default-https-signed] · *publicités*, *traqueurs*                                                                                                                                                                                                                                                                                                                                                                                           | 🇺🇦 par ADNull. Les offres payantes permettent de personnaliser le DNS et donnent accès à des options avancées pour bloquer les publicités et les sites d’hameçonnage |
| [Aliyun Public DNS][alibaba-default]               | [Installer][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 🇨🇳 par Alibaba Cloud Ltd.                                                                                                                                            |
| [BeatQuantum DNS][beatquantum-default]             | [Installer][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 🇬🇧 par BeatQuantum Limited. Prend en charge DNSSEC, les échanges de clés classiques et hybrides, ainsi que les échanges post-quantiques avec ML-KEM                  |
| [BlahDNS][blahdns-germany]                         |                                                  | [Allemagne][blahdns-germany-https-signed] · *logiciels malveillants*, *publicités*, *traqueurs*<br>[Singapour][blahdns-singapore-https-signed] · *logiciels malveillants*, *publicités*, *traqueurs*                                                                                                                                                                                                                                                           | 🇩🇪 🇸🇬                                                                                                                                                                |
| [Bouclier canadien de CIRA][canadianshield-family] | [Installer][canadianshield-private-https-signed] | [Famille][canadianshield-family-https-signed] · *logiciels malveillants*, *contenu pour adultes*, *hameçonnage*<br>[Protégé][canadianshield-protected-https-signed] · *logiciels malveillants*, *hameçonnage*                                                                                                                                                                                                                                                  | 🇨🇦 par l’Autorité canadienne pour les enregistrements Internet (CIRA)                                                                                                |
| [Cleanbrowsing][cleanbrowsing-adult]               |                                                  | [Filtre de contenu pour adultes][cleanbrowsing-adult-https-signed] · *logiciels malveillants*, *contenu pour adultes*, *hameçonnage*<br>[Filtre familial][cleanbrowsing-family-https-signed] · *logiciels malveillants*, *contenu pour adultes*, *hameçonnage*, *contenu mixte*<br>[Filtre de sécurité][cleanbrowsing-security-https-signed] · *logiciels malveillants*, *hameçonnage*                                                                         | 🇺🇸                                                                                                                                                                   |
| [Cloudflare 1.1.1.1][cloudflare-default]           | [Installer][cloudflare-default-https-signed]     | [Filtre familial][cloudflare-family-https-signed] · *logiciels malveillants*, *contenu pour adultes*, *hameçonnage* ([détails][cloudflare-family])<br>[Filtre de sécurité][cloudflare-malware-https-signed] · *logiciels malveillants*, *hameçonnage*                                                                                                                                                                                                          | 🇺🇸 par Cloudflare Inc.                                                                                                                                               |
| [DNS4EU][dns4eu-default]                           | [Installer][dns4eu-default-https-signed]         | [Avec protection][dns4eu-malware-https-signed] · *logiciels malveillants*<br>[Blocage des publicités][dns4eu-protective-ads-https-signed] · *logiciels malveillants*, *publicités*<br>[Contrôle parental][dns4eu-protective-child-https-signed] · *logiciels malveillants*, *contenu pour adultes*<br>[Contrôle parental et blocage des publicités][dns4eu-protective-child-ads-https-signed] · *logiciels malveillants*, *contenu pour adultes*, *publicités* | 🇨🇿 par un consortium sous la direction de Whalebone                                                                                                                  |
| [DNSPod Public DNS][dnspod-default]                | [Installer][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 🇨🇳 par DNSPod Inc. (Tencent Cloud)                                                                                                                                   |
| [FDN][fdn-default]                                 | [Installer][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 🇫🇷 par French Data Network                                                                                                                                           |
| [FFMUC-DNS][ffmuc-dns-default]                     | [Installer][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 🇩🇪 par Freifunk München                                                                                                                                              |
| [Google Public DNS][google-default]                | [Installer][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 🇺🇸 par Google LLC                                                                                                                                                    |
| [keweonDNS][keweondns-default]                     |                                                  | [Installer][keweondns-default-https-signed] · *publicités*, *traqueurs*                                                                                                                                                                                                                                                                                                                                                                                        | 🇩🇪 par Aviontex                                                                                                                                                      |
| [OpenDNS][opendns-family]                          | [Installer][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *logiciels malveillants*, *contenu pour adultes*                                                                                                                                                                                                                                                                                                                                                                 | 🇺🇸 par Cisco OpenDNS LLC                                                                                                                                             |
| [Quad9][quad9-default]                             | [Installer][quad9-nofilter-https-signed]         | [Par défaut][quad9-default-https-signed] · *logiciels malveillants*<br>[Avec ECS][quad9-ECS-https-signed] · *logiciels malveillants*                                                                                                                                                                                                                                                                                                                           | 🇨🇭 par la fondation Quad9                                                                                                                                            |
| [Tiarap][tiarapp-default]                          |                                                  | [Installer][tiarapp-default-https-signed] · *logiciels malveillants*, *publicités*, *traqueurs*, *hameçonnage*                                                                                                                                                                                                                                                                                                                                                 | 🇸🇬 🇺🇸 par Tiarap Inc.                                                                                                                                                |
| [Wikimedia DNS][wikimedia-default]                 | [Installer][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 🇺🇸 par la Wikimedia Foundation. Service en bêta, sans garantie de disponibilité                                                                                      |

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

