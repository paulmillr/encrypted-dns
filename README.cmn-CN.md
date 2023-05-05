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

| 名称                                             | 区域  | 审查 | 备注                                                               | 安装链接                                                                                       |
| ------------------------------------------------ | ----- | ---- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| [360 安全 DNS][360-dns]                          | 🇨🇳    | 是   | 由 360 数字安全集团运营                                            | [HTTPS][360-dns-profile-https]                                                                 |
| [AdGuard DNS 默认][adguard-dns-default]          | 🇷🇺    | 是   | 由 AdGuard 运营，拦截广告、跟踪器和钓鱼网站                        | [HTTPS][adguard-dns-default-profile-https], [TLS][adguard-dns-default-profile-tls]             |
| [AdGuard DNS 家庭保护][adguard-dns-family]       | 🇷🇺    | 是   | 由 AdGuard 运营，除默认规则外，额外拦截恶意软件和成人内容          | [HTTPS][adguard-dns-family-profile-https], [TLS][adguard-dns-family-profile-tls]               |
| [AdGuard DNS 无过滤][adguard-dns-unfiltered]     | 🇷🇺    | 否   | 由 AdGuard 运营，无过滤                                            | [HTTPS][adguard-dns-unfiltered-profile-https], [TLS][adguard-dns-unfiltered-profile-tls]       |
| [Alekberg 加密 DNS][alekberg-dns]                | 🇳🇱    | 否   | 由个人提供                                                         | [HTTPS][alekberg-dns-profile-https]                                                            |
| [阿里云公共 DNS][aliyun-dns]                     | 🇨🇳    | 否   | 由阿里云计算运营                                                   | [HTTPS][aliyun-dns-profile-https], [TLS][aliyun-dns-profile-tls]                               |
| [BlahDNS CDN 过滤][blahdns]                      | 🇺🇸    | 是   | 由个人提供，拦截广告、跟踪器和恶意软件                             | [HTTPS][blahdns-cdn-filtered-profile-https]                                                    |
| [BlahDNS CDN 无过滤][blahdns]                    | 🇺🇸    | 否   | 由个人提供，无过滤                                                 | [HTTPS][blahdns-cdn-unfiltered-profile-https]                                                  |
| [BlahDNS 芬兰][blahdns]                          | 🇫🇮    | 是   | 由个人提供，拦截广告、跟踪器和恶意软件                             | [HTTPS][blahdns-finland-profile-https]                                                         |
| [BlahDNS 德国][blahdns]                          | 🇩🇪    | 是   | 由个人提供，拦截广告、跟踪器和恶意软件                             | [HTTPS][blahdns-germany-profile-https]                                                         |
| [BlahDNS 日本][blahdns]                          | 🇯🇵    | 是   | 由个人提供，拦截广告、跟踪器和恶意软件                             | [HTTPS][blahdns-japan-profile-https]                                                           |
| [BlahDNS 新加坡][blahdns]                        | 🇸🇬    | 是   | 由个人提供，拦截广告、跟踪器和恶意软件                             | [HTTPS][blahdns-singapore-profile-https]                                                       |
| [BlahDNS 瑞士][blahdns]                          | 🇨🇭    | 是   | 由个人提供，拦截广告、跟踪器和恶意软件                             | [TLS][blahdns-switzerland-profile-tls]                                                         |
| [Canadian Shield 隐私][canadian-shield]          | 🇨🇦    | 否   | 由加拿大互联网注册局 (CIRA) 运营                                   | [HTTPS][canadian-shield-private-profile-https], [TLS][canadian-shield-private-profile-tls]     |
| [Canadian Shield 保护][canadian-shield]          | 🇨🇦    | 是   | 由加拿大互联网注册局 (CIRA) 运营，拦截恶意软件和钓鱼网站           | [HTTPS][canadian-shield-protected-profile-https], [TLS][canadian-shield-protected-profile-tls] |
| [Canadian Shield 家庭][canadian-shield]          | 🇨🇦    | 是   | 由加拿大互联网注册局 (CIRA) 运营，拦截恶意软件、钓鱼网站和成人内容 | [HTTPS][canadian-shield-family-profile-https], [TLS][canadian-shield-family-profile-tls]       |
| [Cloudflare 1.1.1.1][cloudflare-dns]             | 🇺🇸    | 否   | 由 Cloudflare 运营                                                 | [HTTPS][cloudflare-dns-profile-https], [TLS][cloudflare-dns-profile-tls]                       |
| [Cloudflare 1.1.1.1 安全][cloudflare-dns-family] | 🇺🇸    | 是   | 由 Cloudflare 运营，拦截恶意软件和钓鱼网站                         | [HTTPS][cloudflare-dns-security-profile-https]                                                 |
| [Cloudflare 1.1.1.1 家庭][cloudflare-dns-family] | 🇺🇸    | 是   | 由 Cloudflare 运营，拦截恶意软件、钓鱼网站和成人内容               | [HTTPS][cloudflare-dns-family-profile-https]                                                   |
| [DNSPod 公共 DNS][dnspod-dns]                    | 🇨🇳    | 否   | 由腾讯云计算旗下 DNSPod 运营                                       | [HTTPS][dnspod-dns-profile-https], [TLS][dnspod-dns-profile-tls]                               |
| [谷歌公共 DNS][google-dns]                       | 🇺🇸    | 否   | 由谷歌运营                                                         | [HTTPS][google-dns-profile-https], [TLS][google-dns-profile-tls]                               |
| [keweonDNS][keweondns]                           | 🇩🇪    | 否   | 由 Aviontex. 拦截广告和跟踪器                                        | [HTTPS][keweondns-profile-https], [TLS][keweondns-profile-tls]                               |
| [Mullvad DNS][mullvad-dns]                       | 🇸🇪    | 是   | 由 Mullvad VPN 运营                                                | [HTTPS][mullvad-dns-profile-https]                                                             |
| [Mullvad DNS 广告过滤][mullvad-dns]              | 🇸🇪    | 是   | 由 Mullvad VPN 运营，拦截广告和跟踪器                              | [HTTPS][mullvad-dns-adblock-profile-https]                                                     |
| [OpenDNS 标准][opendns]                          | 🇺🇸    | 否   | 由思科 OpenDNS 运营                                                | [HTTPS][opendns-standard-profile-https]                                                        |
| [OpenDNS 家庭防护][opendns]                      | 🇺🇸    | 是   | 由思科 OpenDNS 运营，拦截恶意软件和成人内容                        | [HTTPS][opendns-familyshield-profile-https]                                                    |
| [Quad9][quad9]                                   | 🇨🇭    | 是   | 由 Quad9 基金会运营，拦截恶意软件                                  | [HTTPS][quad9-profile-https], [TLS][quad9-profile-tls]                                         |
| [Quad9 ECS][quad9]                               | 🇨🇭    | 是   | 由 Quad9 基金会运营，支持 ECS，拦截恶意软件                        | [HTTPS][quad9-ecs-profile-https], [TLS][quad9-ecs-profile-tls]                                 |
| [Tiarap][tiarap]                                 | 🇸🇬 🇺🇸 | 是   | 由 Tiarap 运营，拦截广告、跟踪器、钓鱼网站和恶意软件               | [HTTPS][tiarap-profile-https], [TLS][tiarap-profile-tls]                                       |

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

## 范围

这条[额外选项](https://github.com/paulmillr/encrypted-dns/issues/22)似乎可以让描述文件在系统全局范围生效。如果有兴趣尝试，请将下面的内容添加到 mobileconfig 文件中：

```xml
<key>PayloadScope</key>
<string>System</string>
```

## 签名版描述文件

在 `signed` 文件夹中，存放了*稍微过时的*签名版描述文件。这些描述文件已由 [@Candygoblen123](https://github.com/Candygoblen123) 签名，因此当你安装时，界面上会有“已验证”的提示，此举还可确保这些描述文件未被篡改。但由于这些描述文件是交由第三方签名的，因此可能会稍微落后于未签名的版本。

[备注]: <> (我们建议安装签名版的描述文件，因为数字签名可以确保文件在下载时没有被修改。)

如要验证 DNS 解析器的 IP 和主机名，请将描述文件内容与其官方网站的文档进行比对，描述文件内部结构和属性在[苹果开发者网站](https://developer.apple.com/documentation/devicemanagement/dnssettings)上有详细讲解。如要验证签名版的描述文件，请将其下载到本地后用文本编辑器打开，因为 GitHub 会将签名版描述文件视为二进制文件而无法直接查看。

## 提交新描述文件

描述文件本质上是文本文件，将现有的描述文件复制一份并修改其 UUID 即可，请确保在本 README 文件中更新描述文件的相关信息。

随机 UUID 除了可以通过网站在线生成，还有很多其他获取方法：

- 在浏览器中按下 `F12` 打开“开发人员工具”，在控制台中运行这段代码

```javascript
crypto.randomUUID();
```

- 在 macOS / Linux 终端中运行此命令

```sh
# 适用于 macOS 和 Linux
uuidgen

# 适用于 Linux
cat /proc/sys/kernel/random/uuid
```

- 在 Powershell 中运行此命令

```powershell
New-Guid
```

[360-dns]: https://sdns.360.net/dnsPublic.html
[360-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/360-https.mobileconfig
[adguard-dns-default]: https://adguard-dns.io/kb/zh-CN/general/dns-providers/#default
[adguard-dns-default-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-https.mobileconfig
[adguard-dns-default-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-tls.mobileconfig
[adguard-dns-family]: https://adguard-dns.io/kb/zh-CN/general/dns-providers/#family-protection
[adguard-dns-family-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-https.mobileconfig
[adguard-dns-family-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-tls.mobileconfig
[adguard-dns-unfiltered]: https://adguard-dns.io/kb/zh-CN/general/dns-providers/#non-filtering
[adguard-dns-unfiltered-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-https.mobileconfig
[adguard-dns-unfiltered-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-nofilter-tls.mobileconfig
[alekberg-dns]: https://alekberg.net
[alekberg-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alekberg-https.mobileconfig
[aliyun-dns]: https://www.alidns.com/
[aliyun-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-https.mobileconfig
[aliyun-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/alibaba-tls.mobileconfig
[blahdns]: https://blahdns.com/
[blahdns-cdn-filtered-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-adblock-doh1.mobileconfig
[blahdns-cdn-unfiltered-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-cdn-unfiltered-doh1.mobileconfig
[blahdns-finland-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-finland-doh.mobileconfig
[blahdns-germany-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-germany-doh.mobileconfig
[blahdns-japan-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-japan-doh.mobileconfig
[blahdns-singapore-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-singapore-doh.mobileconfig
[blahdns-switzerland-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/blahdns-switzerland-dot.mobileconfig
[canadian-shield]: https://www.cira.ca/cybersecurity-services/canadian-shield/configure/summary-cira-canadian-shield-dns-resolver-addresses
[canadian-shield-private-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-https.mobileconfig
[canadian-shield-private-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-private-tls.mobileconfig
[canadian-shield-protected-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-https.mobileconfig
[canadian-shield-protected-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-protected-tls.mobileconfig
[canadian-shield-family-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-https.mobileconfig
[canadian-shield-family-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/canadianshield-family-tls.mobileconfig
[cloudflare-dns]: https://developers.cloudflare.com/1.1.1.1/encryption/
[cloudflare-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-https.mobileconfig
[cloudflare-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-tls.mobileconfig
[cloudflare-dns-family]: https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families
[cloudflare-dns-security-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-malware-https.mobileconfig
[cloudflare-dns-family-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/cloudflare-family-https.mobileconfig
[dnspod-dns]: https://www.dnspod.cn/products/publicdns
[dnspod-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-https.mobileconfig
[dnspod-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/dnspod-tls.mobileconfig
[google-dns]: https://developers.google.com/speed/public-dns/docs/secure-transports?hl=zh-cn
[google-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-https.mobileconfig
[google-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-tls.mobileconfig
[keweondns]: https://forum.xda-developers.com/t/keweondns-info-facts-and-what-is-keweon-actually.4576651/
[keweondns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-doh.mobileconfig
[keweondns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/keweondns-dot.mobileconfig
[mullvad-dns]: https://mullvad.net/zh-hans/help/dns-over-https-and-dns-over-tls/
[mullvad-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-doh.mobileconfig
[mullvad-dns-adblock-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/mullvad-adblock-doh.mobileconfig
[opendns]: https://support.opendns.com/hc/articles/360038086532
[opendns-standard-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-https.mobileconfig
[opendns-familyshield-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/opendns-family-https.mobileconfig
[quad9]: https://www.quad9.net/news/blog/doh-with-quad9-dns-servers/
[quad9-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-https.mobileconfig
[quad9-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-tls.mobileconfig
[quad9-ecs-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-https.mobileconfig
[quad9-ecs-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/quad9-ECS-tls.mobileconfig
[tiarap]: https://doh.tiar.app
[tiarap-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-https.mobileconfig
[tiarap-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/tiarapp-tls.mobileconfig
