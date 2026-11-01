[English](https://github.com/paulmillr/encrypted-dns/) | 简体中文 | [繁體中文](https://github.com/paulmillr/encrypted-dns/blob/master/README.cmn-TW.md)

# 加密 DNS 配置

[DNS over HTTPS](https://zh.wikipedia.org/wiki/DNS_over_HTTPS) 和 [DNS over TLS](https://zh.wikipedia.org/wiki/DNS_over_TLS) 的配置描述文件。查看这篇文章以获取更多信息：[paulmillr.com/posts/encrypted-dns/](https://paulmillr.com/posts/encrypted-dns/) 以及有关[提交新描述文件](#提交新描述文件)的信息。

### 注意事项

根据[谷歌这篇文章](https://security.googleblog.com/2022/07/dns-over-http3-in-android.html)的介绍，DoH 似乎比 DoT 的性能更优。

从 iOS 和 iPadOS 15.5 开始，为了简化咖啡厅、宾馆、机场等公共场所无线网络的身份认证，苹果将这些无线网络的[强制登录门户](https://zh.wikipedia.org/wiki/%E5%BC%BA%E5%88%B6%E9%97%A8%E6%88%B7)加入到了加密 DNS 排除规则中。这是个好消息，但还有一些其他问题我们无法修复，只有等苹果来解决：

- 无法启用加密 DNS：[Little Snitch & Lulu](https://github.com/paulmillr/encrypted-dns/issues/13)、[VPN](https://github.com/paulmillr/encrypted-dns/issues/18)
- 部分流量绕过加密 DNS：[终端和 App Store](https://github.com/paulmillr/encrypted-dns/issues/22)、[Chrome 浏览器](https://github.com/paulmillr/encrypted-dns/issues/19)

如果你需要更进一步的隐私保护，请查看[使用 Tor 网络的加密 DNS](https://github.com/alecmuffett/dohot)。

## 供应商

“`审查=是`”表示描述文件不会发送某些主机“`主机名=IP`”关系的真实信息。

| 名称                                                                                 | 区域  | 审查 | 备注                                                                                                                            | 安装                                                                                             | 安装 (未签名)                                                                      |
| ------------------------------------------------------------------------------------ | ----- | ---- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [360 安全 DNS][360-default]                                                          | 🇨🇳    | 是   | 由 360 数字安全集团运营                                                                                                         | [HTTPS][360-default-https-signed]                                                                | [HTTPS][360-default-https]                                                         |
| [AdGuard DNS 默认][adguard-default]                                                  | 🇷🇺    | 是   | 由 AdGuard 运营，拦截广告、跟踪器和钓鱼网站                                                                                     | [HTTPS][adguard-default-https-signed], [TLS][adguard-default-tls-signed]                         | [HTTPS][adguard-default-https], [TLS][adguard-default-tls]                         |
| [AdGuard DNS 家庭保护][adguard-family]                                               | 🇷🇺    | 是   | 由 AdGuard 运营，除默认规则外，额外拦截恶意软件和成人内容                                                                       | [HTTPS][adguard-family-https-signed], [TLS][adguard-family-tls-signed]                           | [HTTPS][adguard-family-https], [TLS][adguard-family-tls]                           |
| [AdGuard DNS 无过滤][adguard-nofilter]                                               | 🇷🇺    | 否   | 由 AdGuard 运营，无过滤                                                                                                         | [HTTPS][adguard-nofilter-https-signed], [TLS][adguard-nofilter-tls-signed]                       | [HTTPS][adguard-nofilter-https], [TLS][adguard-nofilter-tls]                       |
| [Alekberg 加密 DNS][alekberg-default]                                                | 🇳🇱    | 否   | 由个人提供                                                                                                                      | [HTTPS][alekberg-default-https-signed]                                                           | [HTTPS][alekberg-default-https]                                                    |
| [阿里云公共 DNS][alibaba-default]                                                    | 🇨🇳    | 否   | 由阿里云计算运营                                                                                                                | [HTTPS][alibaba-default-https-signed], [TLS][alibaba-default-tls-signed]                         | [HTTPS][alibaba-default-https], [TLS][alibaba-default-tls]                         |
| [BlahDNS CDN 过滤][blahdns-cdn-adblock]                                              | 🇺🇸    | 是   | 由个人提供，拦截广告、跟踪器和恶意软件                                                                                          | [HTTPS][blahdns-cdn-adblock-https-signed]                                                        | [HTTPS][blahdns-cdn-adblock-https]                                                 |
| [BlahDNS CDN 无过滤][blahdns-cdn-unfiltered]                                         | 🇺🇸    | 否   | 由个人提供，无过滤                                                                                                              | [HTTPS][blahdns-cdn-unfiltered-https-signed]                                                     | [HTTPS][blahdns-cdn-unfiltered-https]                                              |
| [BlahDNS 德国][blahdns-germany]                                                      | 🇩🇪    | 是   | 由个人提供，拦截广告、跟踪器和恶意软件                                                                                          | [HTTPS][blahdns-germany-https-signed]                                                            | [HTTPS][blahdns-germany-https]                                                     |
| [BlahDNS 新加坡][blahdns-singapore]                                                  | 🇸🇬    | 是   | 由个人提供，拦截广告、跟踪器和恶意软件                                                                                          | [HTTPS][blahdns-singapore-https-signed]                                                          | [HTTPS][blahdns-singapore-https]                                                   |
| [Canadian Shield 私人][canadianshield-private]                                       | 🇨🇦    | 否   | 由加拿大互联网注册管理局 (CIRA) 运营                                                                                            | [HTTPS][canadianshield-private-https-signed], [TLS][canadianshield-private-tls-signed]           | [HTTPS][canadianshield-private-https], [TLS][canadianshield-private-tls]           |
| [Canadian Shield 保护][canadianshield-protected]                                     | 🇨🇦    | 是   | 由加拿大互联网注册管理局 (CIRA) 运营，拦截恶意软件和钓鱼网站                                                                    | [HTTPS][canadianshield-protected-https-signed], [TLS][canadianshield-protected-tls-signed]       | [HTTPS][canadianshield-protected-https], [TLS][canadianshield-protected-tls]       |
| [Canadian Shield 家庭][canadianshield-family]                                        | 🇨🇦    | 是   | 由加拿大互联网注册管理局 (CIRA) 运营，拦截恶意软件、钓鱼和成人内容                                                              | [HTTPS][canadianshield-family-https-signed], [TLS][canadianshield-family-tls-signed]             | [HTTPS][canadianshield-family-https], [TLS][canadianshield-family-tls]             |
| [Cleanbrowsing 家庭过滤器][cleanbrowsing-family]                                     | 🇺🇸    | 是   | 过滤恶意软件、成人内容和混合内容                                                                                                | [HTTPS][cleanbrowsing-family-https-signed], [TLS][cleanbrowsing-family-tls-signed]               | [HTTPS][cleanbrowsing-family-https], [TLS][cleanbrowsing-family-tls]               |
| [Cleanbrowsing 成人过滤器][cleanbrowsing-adult]                                      | 🇺🇸    | 是   | 过滤恶意软件和成人内容                                                                                                          | [HTTPS][cleanbrowsing-adult-https-signed], [TLS][cleanbrowsing-adult-tls-signed]                 | [HTTPS][cleanbrowsing-adult-https], [TLS][cleanbrowsing-adult-tls]                 |
| [Cleanbrowsing 安全过滤器][cleanbrowsing-security]                                   | 🇺🇸    | 是   | 过滤恶意软件                                                                                                                    | [HTTPS][cleanbrowsing-security-https-signed], [TLS][cleanbrowsing-security-tls-signed]           | [HTTPS][cleanbrowsing-security-https], [TLS][cleanbrowsing-security-tls]           |
| [Cloudflare 1.1.1.1][cloudflare-default]                                             | 🇺🇸    | 否   | 由 Cloudflare 公司运营                                                                                                          | [HTTPS][cloudflare-default-https-signed], [TLS][cloudflare-default-tls-signed]                   | [HTTPS][cloudflare-default-https], [TLS][cloudflare-default-tls]                   |
| [Cloudflare 1.1.1.1 安全][cloudflare-malware]                                        | 🇺🇸    | 是   | 由 Cloudflare 公司运营，拦截恶意软件和钓鱼网站                                                                                  | [HTTPS][cloudflare-malware-https-signed]                                                         | [HTTPS][cloudflare-malware-https]                                                  |
| [Cloudflare 1.1.1.1 家庭][cloudflare-family]                                         | 🇺🇸    | 是   | 由 Cloudflare 公司运营，拦截恶意软件、钓鱼和成人内容                                                                            | [HTTPS][cloudflare-family-https-signed]                                                          | [HTTPS][cloudflare-family-https]                                                   |
| [DNS4EU][dns4eu-default]                                                             | 🇨🇿    | 否   | Operated by a consortium lead by Whalebone.                                                                                     | [HTTPS][dns4eu-default-https-signed], [TLS][dns4eu-default-tls-signed]                           | [HTTPS][dns4eu-default-https], [TLS][dns4eu-default-tls]                           |
| [DNS4EU Protective][dns4eu-malware]                                                  | 🇨🇿    | 是   | Operated by a consortium lead by Whalebone. Blocks Malware.                                                                     | [HTTPS][dns4eu-malware-https-signed], [TLS][dns4eu-malware-tls-signed]                           | [HTTPS][dns4eu-malware-https], [TLS][dns4eu-malware-tls]                           |
| [DNS4EU Protective ad-blocking][dns4eu-protective-ads]                               | 🇨🇿    | 是   | Operated by a consortium lead by Whalebone. Blocks Malware and Ads                                                              | [HTTPS][dns4eu-protective-ads-https-signed], [TLS][dns4eu-protective-ads-tls-signed]             | [HTTPS][dns4eu-protective-ads-https], [TLS][dns4eu-protective-ads-tls]             |
| [DNS4EU Protective with child protection][dns4eu-protective-child]                   | 🇨🇿    | 是   | Operated by a consortium lead by Whalebone. Blocks malware and explicit content.                                                | [HTTPS][dns4eu-protective-child-https-signed], [TLS][dns4eu-protective-child-tls-signed]         | [HTTPS][dns4eu-protective-child-https], [TLS][dns4eu-protective-child-tls]         |
| [DNS4EU Protective with child protection & ad-blocking][dns4eu-protective-child-ads] | 🇨🇿    | 是   | Operated by a consortium lead by Whalebone. Blocks Malware, Ads and explicit content                                            | [HTTPS][dns4eu-protective-child-ads-https-signed], [TLS][dns4eu-protective-child-ads-tls-signed] | [HTTPS][dns4eu-protective-child-ads-https], [TLS][dns4eu-protective-child-ads-tls] |
| [DNSPod 公共 DNS][dnspod-default]                                                    | 🇨🇳    | 否   | 由腾讯公司 DNSPod 运营                                                                                                          | [HTTPS][dnspod-default-https-signed], [TLS][dnspod-default-tls-signed]                           | [HTTPS][dnspod-default-https], [TLS][dnspod-default-tls]                           |
| [FDN][fdn-default]                                                                   | 🇫🇷    | 否   | 由法国数据网络运营                                                                                                              | [HTTPS][fdn-default-https-signed], [TLS][fdn-default-tls-signed]                                 | [HTTPS][fdn-default-https], [TLS][fdn-default-tls]                                 |
| [FFMUC-DNS][ffmuc-dns-default]                                                       | 🇩🇪    | 否   | FFMUC free DNS servers provided by Freifunk München.                                                                            | [HTTPS][ffmuc-dns-default-https-signed], [TLS][ffmuc-dns-default-tls-signed]                     | [HTTPS][ffmuc-dns-default-https], [TLS][ffmuc-dns-default-tls]                     |
| [Google 公共 DNS][google-default]                                                    | 🇺🇸    | 否   | 由谷歌公司运营                                                                                                                  | [HTTPS][google-default-https-signed], [TLS][google-default-tls-signed]                           | [HTTPS][google-default-https], [TLS][google-default-tls]                           |
| [keweonDNS][keweondns-default]                                                       | 🇩🇪    | 否   | 由 Aviontex 运营，拦截广告和跟踪器                                                                                              | [HTTPS][keweondns-default-https-signed], [TLS][keweondns-default-tls-signed]                     | [HTTPS][keweondns-default-https], [TLS][keweondns-default-tls]                     |
| [Mullvad DNS][mullvad-default]                                                       | 🇸🇪    | 是   | 由 Mullvad VPN AB 运营                                                                                                          | [HTTPS][mullvad-default-https-signed]                                                            | [HTTPS][mullvad-default-https]                                                     |
| [Mullvad DNS 广告拦截][mullvad-adblock]                                              | 🇸🇪    | 是   | 由 Mullvad VPN AB 运营，拦截广告和跟踪器                                                                                        | [HTTPS][mullvad-adblock-https-signed]                                                            | [HTTPS][mullvad-adblock-https]                                                     |
| [OpenDNS 标准版][opendns-default]                                                    | 🇺🇸    | 否   | 由思科 OpenDNS 运营                                                                                                             | [HTTPS][opendns-default-https-signed]                                                            | [HTTPS][opendns-default-https]                                                     |
| [OpenDNS 家庭盾][opendns-family]                                                     | 🇺🇸    | 是   | 由思科 OpenDNS 运营，拦截恶意软件和成人内容                                                                                     | [HTTPS][opendns-family-https-signed]                                                             | [HTTPS][opendns-family-https]                                                      |
| [Quad9][quad9-default]                                                               | 🇨🇭    | 是   | 由 Quad9 基金会运营，拦截恶意软件                                                                                               | [HTTPS][quad9-default-https-signed], [TLS][quad9-default-tls-signed]                             | [HTTPS][quad9-default-https], [TLS][quad9-default-tls]                             |
| [Quad9 带 ECS][quad9-ECS]                                                            | 🇨🇭    | 是   | 由 Quad9 基金会运营，支持 ECS，拦截恶意软件                                                                                     | [HTTPS][quad9-ECS-https-signed], [TLS][quad9-ECS-tls-signed]                                     | [HTTPS][quad9-ECS-https], [TLS][quad9-ECS-tls]                                     |
| [Quad9 无过滤][quad9-nofilter]                                                       | 🇨🇭    | 否   | 由 Quad9 基金会运营                                                                                                             | [HTTPS][quad9-nofilter-https-signed], [TLS][quad9-nofilter-tls-signed]                           | [HTTPS][quad9-nofilter-https], [TLS][quad9-nofilter-tls]                           |
| [Tiarap][tiarapp-default]                                                            | 🇸🇬 🇺🇸 | 是   | 由 Tiarap 公司运营，拦截广告、跟踪器、钓鱼和恶意软件                                                                            | [HTTPS][tiarapp-default-https-signed], [TLS][tiarapp-default-tls-signed]                         | [HTTPS][tiarapp-default-https], [TLS][tiarapp-default-tls]                         |
| [ADNull DNS][adnull-default]                                                         | 🇺🇦    | 是   | Public DNS operated by ADNull. Blocks ads & tracking. Paid plans offer personalized DNS with advanced ad and phishing blocking. | [HTTPS][adnull-default-https-signed]                                                             | [HTTPS][adnull-default-https]                                                      |
| [BeatQuantum DNS][beatquantum-default]                                               | 🇬🇧    | 否   | Operated by BeatQuantum Limited. Non-filtering, no logs, DNSSEC. Classical, hybrid & post-quantum (ML-KEM) key exchange         |                                                                                                  | [HTTPS][beatquantum-default-https], [TLS][beatquantum-default-tls]                 |

## 安装

要使设置在 **iOS**、**iPadOS** 和 **macOS** 中所有的应用程序上生效，你需要安装配置描述文件。此文件将指引操作系统使用 DoH 或 DoT。注意：只在系统无线局域网设置中设置 DNS 服务器 IP 是不够的——你需要安装描述文件。

iOS / iPadOS：使用 Safari 浏览器（其他浏览器只会下载该文件，不会弹出安装提示）打开 GitHub 上的 mobileconfig 文件，然后点击“允许”按钮，描述文件将完成下载。打开 **系统设置 => 通用 => VPN、DNS 与设备管理**，选择已下载的描述文件并点击“安装”按钮。

macOS [（官方文档）](https://support.apple.com/zh-cn/guide/mac-help/mh35561/)：

1. 下载并保存描述文件，将其重命名为 `NAME.mobileconfig`，而不是 txt 之类的扩展名。
2. 选取苹果菜单 >“系统设置”，点按边栏中的“隐私和安全性” ，然后点按右侧的“描述文件”。（你可能需要向下滚动。）
   安装期间，系统可能会要求你提供密码或其他信息。
3. 在“已下载”部分中，连按描述文件。
4. 检查描述文件内容，然后点按“继续”、“安装”或“注册”以安装描述文件。

   如果 Mac 上已安装了较早版本的描述文件，其设置将替换为更新版本中的设置。

[360-default]: https://sdns.360.net/dnsPublic.html
[360-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/360-default-https.mobileconfig
[adguard-default]: https://adguard-dns.io/kb/general/dns-providers/#default
[adguard-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-https.mobileconfig
[adguard-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-tls.mobileconfig
[adguard-family]: https://adguard-dns.io/kb/general/dns-providers/#family-protection
[adguard-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-https.mobileconfig
[adguard-family-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-tls.mobileconfig
[adguard-nofilter]: https://adguard-dns.io/kb/general/dns-providers/#non-filtering
[adguard-nofilter-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-https.mobileconfig
[adguard-nofilter-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-tls.mobileconfig
[alekberg-default]: https://alekberg.net
[alekberg-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alekberg-default-https.mobileconfig
[alibaba-default]: https://www.alidns.com/
[alibaba-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-default-https.mobileconfig
[alibaba-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-default-tls.mobileconfig
[blahdns-cdn-adblock]: https://blahdns.com/
[blahdns-cdn-adblock-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-adblock-https.mobileconfig
[blahdns-cdn-unfiltered]: https://blahdns.com/
[blahdns-cdn-unfiltered-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-unfiltered-https.mobileconfig
[blahdns-germany]: https://blahdns.com/
[blahdns-germany-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-germany-https.mobileconfig
[blahdns-singapore]: https://blahdns.com/
[blahdns-singapore-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-singapore-https.mobileconfig
[canadianshield-private]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadianshield-private-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-https.mobileconfig
[canadianshield-private-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-tls.mobileconfig
[canadianshield-protected]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadianshield-protected-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-https.mobileconfig
[canadianshield-protected-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-tls.mobileconfig
[canadianshield-family]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadianshield-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-https.mobileconfig
[canadianshield-family-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-tls.mobileconfig
[cleanbrowsing-family]: https://cleanbrowsing.org/filters/
[cleanbrowsing-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-family-https.mobileconfig
[cleanbrowsing-family-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-family-tls.mobileconfig
[cleanbrowsing-adult]: https://cleanbrowsing.org/filters/
[cleanbrowsing-adult-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-adult-https.mobileconfig
[cleanbrowsing-adult-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-adult-tls.mobileconfig
[cleanbrowsing-security]: https://cleanbrowsing.org/filters/
[cleanbrowsing-security-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-security-https.mobileconfig
[cleanbrowsing-security-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cleanbrowsing-security-tls.mobileconfig
[cloudflare-default]: https://developers.cloudflare.com/1.1.1.1/encryption/
[cloudflare-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-default-https.mobileconfig
[cloudflare-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-default-tls.mobileconfig
[cloudflare-malware]: https://developers.cloudflare.com/1.1.1.1/encryption/
[cloudflare-malware-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-malware-https.mobileconfig
[cloudflare-family]: https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families
[cloudflare-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-family-https.mobileconfig
[dns4eu-default]: https://www.joindns4.eu/for-public
[dns4eu-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-default-https.mobileconfig
[dns4eu-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-default-tls.mobileconfig
[dns4eu-malware]: https://www.joindns4.eu/for-public
[dns4eu-malware-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-malware-https.mobileconfig
[dns4eu-malware-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-malware-tls.mobileconfig
[dns4eu-protective-ads]: https://www.joindns4.eu/for-public
[dns4eu-protective-ads-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-ads-https.mobileconfig
[dns4eu-protective-ads-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-ads-tls.mobileconfig
[dns4eu-protective-child]: https://www.joindns4.eu/for-public
[dns4eu-protective-child-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-https.mobileconfig
[dns4eu-protective-child-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-tls.mobileconfig
[dns4eu-protective-child-ads]: https://www.joindns4.eu/for-public
[dns4eu-protective-child-ads-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-ads-https.mobileconfig
[dns4eu-protective-child-ads-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dns4eu-protective-child-ads-tls.mobileconfig
[dnspod-default]: https://www.dnspod.com/products/public.dns
[dnspod-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-default-https.mobileconfig
[dnspod-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-default-tls.mobileconfig
[fdn-default]: https://www.fdn.fr/actions/dns/
[fdn-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/fdn-default-https.mobileconfig
[fdn-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/fdn-default-tls.mobileconfig
[ffmuc-dns-default]: https://ffmuc.net/wiki/knb:dohdot_en
[ffmuc-dns-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/ffmuc-dns-default-https.mobileconfig
[ffmuc-dns-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/ffmuc-dns-default-tls.mobileconfig
[google-default]: https://developers.google.com/speed/public-dns/docs/secure-transports
[google-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-default-https.mobileconfig
[google-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-default-tls.mobileconfig
[keweondns-default]: https://forum.xda-developers.com/t/keweondns-info-facts-and-what-is-keweon-actually.4576651/
[keweondns-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-default-https.mobileconfig
[keweondns-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-default-tls.mobileconfig
[mullvad-default]: https://mullvad.net/help/dns-over-https-and-dns-over-tls/
[mullvad-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-default-https.mobileconfig
[mullvad-adblock]: https://mullvad.net/help/dns-over-https-and-dns-over-tls/
[mullvad-adblock-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-adblock-https.mobileconfig
[opendns-default]: https://support.opendns.com/hc/articles/360038086532
[opendns-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-default-https.mobileconfig
[opendns-family]: https://support.opendns.com/hc/articles/360038086532
[opendns-family-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-family-https.mobileconfig
[quad9-default]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-default-https.mobileconfig
[quad9-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-default-tls.mobileconfig
[quad9-ECS]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-ECS-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-https.mobileconfig
[quad9-ECS-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-tls.mobileconfig
[quad9-nofilter]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-nofilter-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-nofilter-https.mobileconfig
[quad9-nofilter-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-nofilter-tls.mobileconfig
[tiarapp-default]: https://doh.tiar.app
[tiarapp-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-default-https.mobileconfig
[tiarapp-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-default-tls.mobileconfig
[adnull-default]: https://adnull.com
[adnull-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adnull-default-https.mobileconfig
[beatquantum-default]: https://beatquantum.com/stamps
[beatquantum-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/beatquantum-default-https.mobileconfig
[beatquantum-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/beatquantum-default-tls.mobileconfig
[360-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/360-default-https.mobileconfig
[adguard-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-default-https.mobileconfig
[adguard-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-default-tls.mobileconfig
[adguard-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-family-https.mobileconfig
[adguard-family-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-family-tls.mobileconfig
[adguard-nofilter-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-nofilter-https.mobileconfig
[adguard-nofilter-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-nofilter-tls.mobileconfig
[alekberg-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alekberg-default-https.mobileconfig
[alibaba-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alibaba-default-https.mobileconfig
[alibaba-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alibaba-default-tls.mobileconfig
[blahdns-cdn-adblock-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-cdn-adblock-https.mobileconfig
[blahdns-cdn-unfiltered-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-cdn-unfiltered-https.mobileconfig
[blahdns-germany-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-germany-https.mobileconfig
[blahdns-singapore-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/blahdns-singapore-https.mobileconfig
[canadianshield-private-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-private-https.mobileconfig
[canadianshield-private-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-private-tls.mobileconfig
[canadianshield-protected-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-protected-https.mobileconfig
[canadianshield-protected-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-protected-tls.mobileconfig
[canadianshield-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-family-https.mobileconfig
[canadianshield-family-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/canadianshield-family-tls.mobileconfig
[cleanbrowsing-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-family-https.mobileconfig
[cleanbrowsing-family-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-family-tls.mobileconfig
[cleanbrowsing-adult-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-adult-https.mobileconfig
[cleanbrowsing-adult-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-adult-tls.mobileconfig
[cleanbrowsing-security-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-security-https.mobileconfig
[cleanbrowsing-security-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cleanbrowsing-security-tls.mobileconfig
[cloudflare-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-default-https.mobileconfig
[cloudflare-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-default-tls.mobileconfig
[cloudflare-malware-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-malware-https.mobileconfig
[cloudflare-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/cloudflare-family-https.mobileconfig
[dns4eu-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-default-https.mobileconfig
[dns4eu-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-default-tls.mobileconfig
[dns4eu-malware-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-malware-https.mobileconfig
[dns4eu-malware-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-malware-tls.mobileconfig
[dns4eu-protective-ads-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-ads-https.mobileconfig
[dns4eu-protective-ads-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-ads-tls.mobileconfig
[dns4eu-protective-child-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-https.mobileconfig
[dns4eu-protective-child-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-tls.mobileconfig
[dns4eu-protective-child-ads-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-ads-https.mobileconfig
[dns4eu-protective-child-ads-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dns4eu-protective-child-ads-tls.mobileconfig
[dnspod-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dnspod-default-https.mobileconfig
[dnspod-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/dnspod-default-tls.mobileconfig
[fdn-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/fdn-default-https.mobileconfig
[fdn-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/fdn-default-tls.mobileconfig
[ffmuc-dns-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/ffmuc-dns-default-https.mobileconfig
[ffmuc-dns-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/ffmuc-dns-default-tls.mobileconfig
[google-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/google-default-https.mobileconfig
[google-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/google-default-tls.mobileconfig
[keweondns-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/keweondns-default-https.mobileconfig
[keweondns-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/keweondns-default-tls.mobileconfig
[mullvad-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/mullvad-default-https.mobileconfig
[mullvad-adblock-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/mullvad-adblock-https.mobileconfig
[opendns-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-default-https.mobileconfig
[opendns-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/opendns-family-https.mobileconfig
[quad9-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-default-https.mobileconfig
[quad9-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-default-tls.mobileconfig
[quad9-ECS-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-ECS-https.mobileconfig
[quad9-ECS-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-ECS-tls.mobileconfig
[quad9-nofilter-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-nofilter-https.mobileconfig
[quad9-nofilter-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/quad9-nofilter-tls.mobileconfig
[tiarapp-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/tiarapp-default-https.mobileconfig
[tiarapp-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/tiarapp-default-tls.mobileconfig
[adnull-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adnull-default-https.mobileconfig
