<!-- Generated from src/languages/pt.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [العربية](ar.md) | [Deutsch](de.md) | [Español](es.md) | [Français](fr.md) | [Bahasa Indonesia](id.md) | [日本語](ja.md) | Português | [Русский](ru.md) | [Türkçe](tr.md) | [Українська](uk.md) | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

# encrypted-dns-configs

Perfis de configuração para [DNS sobre HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) e [DNS sobre TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). Saiba mais no [artigo sobre DNS criptografado](https://paulmillr.com/posts/encrypted-dns/). Para incluir um provedor na lista ou atualizar uma entrada, consulte o [guia de contribuição](../CONTRIBUTING.md).

## Como usar

Escolha um perfil HTTPS na tabela abaixo, baixe o arquivo e siga as instruções de instalação.

#### iPhone e iPad

1. Abra o link no Safari e toque em “Permitir”.
2. Você tem 8 minutos após o download para instalar o perfil. Acesse Ajustes > Perfil Baixado (ou Ajustes > Geral > VPN e Gerenciamento de Dispositivos) e toque em “Instalar”.
    - Se a instalação for recusada, a Proteção de Dispositivo Roubado pode exigir que você esteja em um local conhecido.

#### Mac

1. O arquivo deve ter a extensão `.mobileconfig`. Se o nome terminar em `.mobileconfig.txt`, remova o .txt do final. Em seguida, abra o arquivo com um clique duplo.
2. Vá até Ajustes do Sistema > Geral > Gerenciamento de Dispositivos. No macOS 13 e 14, o caminho é Ajustes do Sistema > Privacidade e Segurança > Perfis. Clique duas vezes no perfil e depois em “Instalar”.

#### Alternar entre perfis

Você pode instalar vários perfis, mas só um fica ativo por vez. Selecione o perfil que deseja usar ou escolha “Automático” para usar o DNS não criptografado da rede.

- iPhone e iPad — Ajustes > Geral > VPN, DNS e Gerenciamento de Dispositivos > DNS
- Mac — Ajustes do Sistema > Rede > VPN e Filtros (no macOS 13 e 14: Filtros)
- Depois de atualizar um perfil, remova as cópias antigas.

#### Testar o perfil

- Abra a página de teste do seu provedor. Se você usa a Cloudflare, acesse [1.1.1.1/help](https://1.1.1.1/help).

#### Limitações

- Prefira HTTPS. O DNS sobre TLS usa a porta 853, que é fácil de bloquear.
- O Firefox (em algumas regiões), a App Store e o Chrome (com “Usar DNS seguro” ativado) ignoram o DNS criptografado do perfil. O mesmo vale para VPNs, a Retransmissão Privada do iCloud, Little Snitch, LuLu, dispositivos conectados ao Acesso Pessoal, ferramentas de linha de comando como `dig` e páginas de login de redes Wi-Fi.
- Quando o perfil não inclui `ServerAddresses`, o sistema primeiro faz uma consulta DNS sem criptografia para resolver o nome do servidor.

## Provedores

As categorias na tabela mostram o que cada perfil bloqueia. A categoria *conteúdo misto* abrange sites que publicam conteúdo adulto junto com conteúdo para o público em geral. A indicação *não especificado* aparece quando o provedor não informa as categorias de bloqueio. O filtro altera a resposta DNS (`hostname=IP`) para os domínios bloqueados. As regras podem variar conforme o país.

A lista completa está em [ALL-PROFILES.md](../ALL-PROFILES.md) e inclui os perfis de DNS sobre TLS e as versões sem assinatura.

| Provedor                                 | Sem filtro                                      | Com filtro                                                                                                                                                                                                                                                                                                                                                               | Observações                                                                                                                   |
| ---------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]          |                                                 | [Instalar][360-default-https-signed] · *não especificado*                                                                                                                                                                                                                                                                                                                | 🇨🇳 Operador: 360 Digital Security Group                                                                                       |
| [AdGuard DNS][adguard-default]           | [Instalar][adguard-nofilter-https-signed]       | [Padrão][adguard-default-https-signed] · *anúncios*, *rastreamento*, *phishing*<br>[Família][adguard-family-https-signed] · *malware*, *conteúdo adulto*, *anúncios*, *rastreamento*, *phishing* ([detalhes][adguard-family])                                                                                                                                            | 🇷🇺 Operador: AdGuard Software Ltd.                                                                                            |
| [ADNull DNS][adnull-default]             |                                                 | [Instalar][adnull-default-https-signed] · *anúncios*, *rastreamento*                                                                                                                                                                                                                                                                                                     | 🇺🇦 Operador: ADNull. Os planos pagos incluem DNS personalizado e filtros avançados para bloquear anúncios e sites de phishing |
| [Aliyun Public DNS][alibaba-default]     | [Instalar][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                                          | 🇨🇳 Operador: Alibaba Cloud Ltd.                                                                                               |
| [BeatQuantum DNS][beatquantum-default]   | [Instalar][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                                          | 🇬🇧 Operador: BeatQuantum Limited. Suporte a DNSSEC e troca de chaves clássica, híbrida e pós-quântica (ML-KEM)                |
| [BlahDNS][blahdns-germany]               |                                                 | [Alemanha][blahdns-germany-https-signed] · *malware*, *anúncios*, *rastreamento*<br>[Singapura][blahdns-singapore-https-signed] · *malware*, *anúncios*, *rastreamento*                                                                                                                                                                                                  | 🇩🇪 🇸🇬                                                                                                                         |
| [Canadian Shield][canadianshield-family] | [Instalar][canadianshield-private-https-signed] | [Família][canadianshield-family-https-signed] · *malware*, *conteúdo adulto*, *phishing*<br>[Protegido][canadianshield-protected-https-signed] · *malware*, *phishing*                                                                                                                                                                                                   | 🇨🇦 Operador: Autoridade Canadense de Registro de Domínios (CIRA)                                                              |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                                 | [Filtro de conteúdo adulto][cleanbrowsing-adult-https-signed] · *malware*, *conteúdo adulto*, *phishing*<br>[Filtro familiar][cleanbrowsing-family-https-signed] · *malware*, *conteúdo adulto*, *phishing*, *conteúdo misto*<br>[Filtro de segurança][cleanbrowsing-security-https-signed] · *malware*, *phishing*                                                      | 🇺🇸                                                                                                                            |
| [Cloudflare 1.1.1.1][cloudflare-default] | [Instalar][cloudflare-default-https-signed]     | [Família][cloudflare-family-https-signed] · *malware*, *conteúdo adulto*, *phishing* ([detalhes][cloudflare-family])<br>[Segurança][cloudflare-malware-https-signed] · *malware*, *phishing*                                                                                                                                                                             | 🇺🇸 Operador: Cloudflare Inc.                                                                                                  |
| [DNS4EU][dns4eu-default]                 | [Instalar][dns4eu-default-https-signed]         | [Proteção][dns4eu-malware-https-signed] · *malware*<br>[Bloqueio de anúncios][dns4eu-protective-ads-https-signed] · *malware*, *anúncios*<br>[Proteção infantil][dns4eu-protective-child-https-signed] · *malware*, *conteúdo adulto*<br>[Proteção infantil e bloqueio de anúncios][dns4eu-protective-child-ads-https-signed] · *malware*, *conteúdo adulto*, *anúncios* | 🇨🇿 Operador: consórcio liderado pela Whalebone                                                                                |
| [DNSPod Public DNS][dnspod-default]      | [Instalar][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                          | 🇨🇳 Operador: DNSPod Inc. (Tencent Cloud)                                                                                      |
| [FDN][fdn-default]                       | [Instalar][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                                          | 🇫🇷 Operador: French Data Network                                                                                              |
| [FFMUC-DNS][ffmuc-dns-default]           | [Instalar][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                          | 🇩🇪 Operador: Freifunk München                                                                                                 |
| [Google Public DNS][google-default]      | [Instalar][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                          | 🇺🇸 Operador: Google LLC                                                                                                       |
| [keweonDNS][keweondns-default]           |                                                 | [Instalar][keweondns-default-https-signed] · *anúncios*, *rastreamento*                                                                                                                                                                                                                                                                                                  | 🇩🇪 Operador: Aviontex                                                                                                         |
| [OpenDNS][opendns-family]                | [Instalar][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *malware*, *conteúdo adulto*                                                                                                                                                                                                                                                                                               | 🇺🇸 Operador: Cisco OpenDNS LLC                                                                                                |
| [Quad9][quad9-default]                   | [Instalar][quad9-nofilter-https-signed]         | [Padrão][quad9-default-https-signed] · *malware*<br>[Com ECS][quad9-ECS-https-signed] · *malware*                                                                                                                                                                                                                                                                        | 🇨🇭 Operador: Fundação Quad9                                                                                                   |
| [Tiarap][tiarapp-default]                |                                                 | [Instalar][tiarapp-default-https-signed] · *malware*, *anúncios*, *rastreamento*, *phishing*                                                                                                                                                                                                                                                                             | 🇸🇬 🇺🇸 Operador: Tiarap Inc.                                                                                                   |
| [Wikimedia DNS][wikimedia-default]       | [Instalar][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                          | 🇺🇸 Operador: Fundação Wikimedia. Serviço em fase beta, sem garantia de disponibilidade                                        |

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

