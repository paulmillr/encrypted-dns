<!-- Generated from src/languages/zh-CN.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [العربية](ar.md) | [Deutsch](de.md) | [Español](es.md) | [Français](fr.md) | [Bahasa Indonesia](id.md) | [日本語](ja.md) | [Português](pt.md) | [Русский](ru.md) | [Türkçe](tr.md) | [Українська](uk.md) | 简体中文 | [繁體中文](zh-TW.md)

# 加密 DNS 配置描述文件

本项目提供 [DNS over HTTPS](https://zh.wikipedia.org/wiki/DNS_over_HTTPS) 和 [DNS over TLS](https://zh.wikipedia.org/wiki/DNS_over_TLS) 的配置描述文件。想了解这两种协议如何工作，可以阅读[加密 DNS 介绍](https://paulmillr.com/posts/encrypted-dns/)（英文）。如需添加服务商或更新现有配置，请参阅[贡献指南](../CONTRIBUTING.md)（英文）。

## 使用方法

从下表选取一个 HTTPS 描述文件，下载后按对应设备的步骤安装。

#### iPhone、iPad

1. 在 Safari 中打开链接，轻点“允许”。
2. 下载后须在 8 分钟内完成安装。打开“设置”中的“已下载描述文件”，或前往“设置” > “通用” > “VPN与设备管理”找到刚下载的描述文件，然后轻点“安装”。
    - 如果开启了“失窃设备保护”，可能需要在家里等熟悉的地点才能安装。

#### Mac

1. 如果文件名以 `.mobileconfig.txt` 结尾，删掉末尾的 .txt。然后双击 `.mobileconfig` 文件。
2. 在“系统设置”中，前往“通用” > “设备管理”。如果使用 macOS 13 或 14，则前往“隐私与安全性” > “描述文件”。双击已下载的描述文件，再点按“安装”。

#### 切换描述文件

可以安装多个描述文件，但一次只能启用一个。前往下方对应的设置页面，选择要使用的描述文件。如要使用当前网络提供的未加密 DNS，请选“自动”。

- iPhone、iPad：“设置” > “通用” > “VPN、DNS与设备管理” > “DNS”
- Mac：“系统设置” > “网络” > “VPN与过滤条件”（macOS 13 或 14 中为“过滤条件”）
- 更新描述文件后，请移除旧版本。

#### 检查是否生效

- 打开所用 DNS 服务商的测试页面。如果使用 Cloudflare，可以访问 [1.1.1.1/help](https://1.1.1.1/help) 查看是否生效。

#### 限制

- 建议优先使用 HTTPS。DNS over TLS 用的是容易被封锁的 853 端口。
- 在部分地区，Firefox 不会使用描述文件指定的加密 DNS。App Store、开启“使用安全 DNS”的 Chrome、VPN、iCloud 专用代理、Little Snitch、LuLu、连接到个人热点的设备、`dig` 等命令行工具，以及 Wi-Fi 登录页面也不会采用这项设置。
- 如果描述文件未指定 `ServerAddresses`，设备会先用未加密的 DNS 查询 DNS 服务器的 IP 地址。

## DNS 服务商

标签说明每个描述文件会拦截哪些内容。标有“*混合内容网站*”的描述文件也会拦截同时含有成人内容和普通内容的网站。“*类别未注明*”表示服务商没有列出拦截类别。过滤会改变被拦截域名的 DNS 解析结果（`域名 → IP 地址`）。拦截范围可能因国家而异。

所有描述文件（包括 DNS over TLS 和未签名版本）都列在 [ALL-PROFILES.md](../ALL-PROFILES.md)。

| 服务商                                   | 无过滤                                      | 有过滤                                                                                                                                                                                                                                                                                                              | 备注                                                                                            |
| ---------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [360 安全 DNS][360-default]              |                                             | [安装][360-default-https-signed] · *类别未注明*                                                                                                                                                                                                                                                                     | 🇨🇳 由 360 数字安全集团运营                                                                      |
| [AdGuard DNS][adguard-default]           | [安装][adguard-nofilter-https-signed]       | [默认][adguard-default-https-signed] · *广告*, *跟踪器*, *网络钓鱼*<br>[家庭保护][adguard-family-https-signed] · *恶意软件*, *成人内容*, *广告*, *跟踪器*, *网络钓鱼* ([详情][adguard-family])                                                                                                                      | 🇷🇺 由 AdGuard Software Ltd. 运营                                                                |
| [ADNull DNS][adnull-default]             |                                             | [安装][adnull-default-https-signed] · *广告*, *跟踪器*                                                                                                                                                                                                                                                              | 🇺🇦 由 ADNull 运营。付费套餐可自定义 DNS 设置，并提供更完善的广告拦截和网络钓鱼防护              |
| [阿里云公共 DNS][alibaba-default]        | [安装][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                     | 🇨🇳 由 Alibaba Cloud Ltd. 运营                                                                   |
| [BeatQuantum DNS][beatquantum-default]   | [安装][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                     | 🇬🇧 由 BeatQuantum Limited 运营。支持 DNSSEC，密钥交换可采用传统、混合或基于 ML-KEM 的后量子方案 |
| [BlahDNS][blahdns-germany]               |                                             | [德国][blahdns-germany-https-signed] · *恶意软件*, *广告*, *跟踪器*<br>[新加坡][blahdns-singapore-https-signed] · *恶意软件*, *广告*, *跟踪器*                                                                                                                                                                      | 🇩🇪 🇸🇬                                                                                           |
| [Canadian Shield][canadianshield-family] | [安装][canadianshield-private-https-signed] | [家庭版][canadianshield-family-https-signed] · *恶意软件*, *成人内容*, *网络钓鱼*<br>[安全防护][canadianshield-protected-https-signed] · *恶意软件*, *网络钓鱼*                                                                                                                                                     | 🇨🇦 由加拿大互联网注册管理机构（CIRA）运营                                                       |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                             | [成人内容过滤][cleanbrowsing-adult-https-signed] · *恶意软件*, *成人内容*, *网络钓鱼*<br>[家庭过滤][cleanbrowsing-family-https-signed] · *恶意软件*, *成人内容*, *网络钓鱼*, *混合内容网站*<br>[安全过滤][cleanbrowsing-security-https-signed] · *恶意软件*, *网络钓鱼*                                             | 🇺🇸                                                                                              |
| [Cloudflare 1.1.1.1][cloudflare-default] | [安装][cloudflare-default-https-signed]     | [家庭版][cloudflare-family-https-signed] · *恶意软件*, *成人内容*, *网络钓鱼* ([详情][cloudflare-family])<br>[安全][cloudflare-malware-https-signed] · *恶意软件*, *网络钓鱼*                                                                                                                                       | 🇺🇸 由 Cloudflare Inc. 运营                                                                      |
| [DNS4EU][dns4eu-default]                 | [安装][dns4eu-default-https-signed]         | [安全防护][dns4eu-malware-https-signed] · *恶意软件*<br>[广告拦截][dns4eu-protective-ads-https-signed] · *恶意软件*, *广告*<br>[儿童上网保护][dns4eu-protective-child-https-signed] · *恶意软件*, *成人内容*<br>[儿童上网保护＋广告拦截][dns4eu-protective-child-ads-https-signed] · *恶意软件*, *成人内容*, *广告* | 🇨🇿 由 Whalebone 牵头的联盟运营                                                                  |
| [DNSPod 公共 DNS][dnspod-default]        | [安装][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                     | 🇨🇳 由 DNSPod Inc.（腾讯云）运营                                                                 |
| [FDN][fdn-default]                       | [安装][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                     | 🇫🇷 由 French Data Network 运营                                                                  |
| [FFMUC-DNS][ffmuc-dns-default]           | [安装][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                     | 🇩🇪 由 Freifunk München 运营                                                                     |
| [Google 公共 DNS][google-default]        | [安装][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                     | 🇺🇸 由 Google LLC 运营                                                                           |
| [keweonDNS][keweondns-default]           |                                             | [安装][keweondns-default-https-signed] · *广告*, *跟踪器*                                                                                                                                                                                                                                                           | 🇩🇪 由 Aviontex 运营                                                                             |
| [OpenDNS][opendns-family]                | [安装][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *恶意软件*, *成人内容*                                                                                                                                                                                                                                                | 🇺🇸 由 Cisco OpenDNS LLC 运营                                                                    |
| [Quad9][quad9-default]                   | [安装][quad9-nofilter-https-signed]         | [默认][quad9-default-https-signed] · *恶意软件*<br>[支持 ECS][quad9-ECS-https-signed] · *恶意软件*                                                                                                                                                                                                                  | 🇨🇭 由 Quad9 基金会运营                                                                          |
| [Tiarap][tiarapp-default]                |                                             | [安装][tiarapp-default-https-signed] · *恶意软件*, *广告*, *跟踪器*, *网络钓鱼*                                                                                                                                                                                                                                     | 🇸🇬 🇺🇸 由 Tiarap Inc. 运营                                                                       |
| [Wikimedia DNS][wikimedia-default]       | [安装][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                     | 🇺🇸 由维基媒体基金会运营。服务仍在测试阶段，不保证始终可用                                       |

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

