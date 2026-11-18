[English](https://github.com/paulmillr/encrypted-dns/) | 简体中文 | [繁體中文](https://github.com/paulmillr/encrypted-dns/blob/master/README.cmn-TW.md)

# 加密 DNS 配置

[DNS over HTTPS](https://zh.wikipedia.org/wiki/DNS_over_HTTPS) 和 [DNS over TLS](https://zh.wikipedia.org/wiki/DNS_over_TLS) 的配置描述文件。查看这篇文章以获取更多信息：[paulmillr.com/posts/encrypted-dns/](https://paulmillr.com/posts/encrypted-dns/)。要添加一个新的供应商，或者修改已有的供应商：见 [#参与贡献](#参与贡献)。

## 使用方法

从下表中安装 / 下载描述文件（`.mobileconfig` 文件），然后：

iPhone 和 iPad：

1. 使用 Safari 打开文件（其他浏览器可能会只下载文件而不提示安装）
2. 点击“允许”按钮，描述文件随即下载。
3. 打开 **系统设置 => 通用 => VPN与设备管理**，选择下载的描述文件并点击“安装”按钮。

Mac：

1. 确保下载的文件具有正确的扩展名：NAME.mobileconfig，而非 NAME.mobileconfig.txt。
2. 选择苹果菜单 > “系统设置”，在侧边栏中点击“通用”，然后点击“设备管理”（macOS 13 和 14：“隐私与安全性” > “描述文件”）。
  你可能需要向下滚动。安装过程中你可能会被要求提供密码或者其他信息。
3. 在“已下载”部分，双击描述文件。检查描述文件的内容，然后点击“继续”、“安装”或“注册”来安装描述文件。如果你的 Mac 上已经安装了一个旧版本的描述文件，新版本中的设置将覆盖旧版本。

## 供应商

“审查”（也称为“过滤”）意味着该描述文件对于某些主机不会发送关于“`主机名=IP`”关系的真实信息。

| 名称                                                                                 | 区域  | 审查 | 备注                                                                                                                            | 安装                                                                                             | 安装 (未签名)                                                                      |
| ------------------------------------------------------------------------------------ | ----- | ---- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [360 安全 DNS][360-default]                                                          | 🇨🇳    | 是   | 由 360 数字安全集团运营                                                                                                         |                                                                                                  | [HTTPS][360-default-https]                                                         |
| [AdGuard DNS 默认][adguard-default]                                                  | 🇷🇺    | 是   | 由 AdGuard 运营，拦截广告、跟踪器和钓鱼网站                                                                                     | [HTTPS][adguard-default-https-signed], [TLS][adguard-default-tls-signed]                         | [HTTPS][adguard-default-https], [TLS][adguard-default-tls]                         |
| [AdGuard DNS 家庭保护][adguard-family]                                               | 🇷🇺    | 是   | 由 AdGuard 运营，除默认规则外，额外拦截恶意软件和成人内容                                                                       | [HTTPS][adguard-family-https-signed], [TLS][adguard-family-tls-signed]                           | [HTTPS][adguard-family-https], [TLS][adguard-family-tls]                           |
| [AdGuard DNS 无过滤][adguard-nofilter]                                               | 🇷🇺    | 否   | 由 AdGuard 运营，无过滤                                                                                                         | [HTTPS][adguard-nofilter-https-signed], [TLS][adguard-nofilter-tls-signed]                       | [HTTPS][adguard-nofilter-https], [TLS][adguard-nofilter-tls]                       |
| [Alekberg 加密 DNS][alekberg-default]                                                | 🇳🇱    | 否   | 由个人提供                                                                                                                      |                                                                                                  | [HTTPS][alekberg-default-https]                                                    |
| [阿里云公共 DNS][alibaba-default]                                                    | 🇨🇳    | 否   | 由阿里云计算运营                                                                                                                | [HTTPS][alibaba-default-https-signed], [TLS][alibaba-default-tls-signed]                         | [HTTPS][alibaba-default-https], [TLS][alibaba-default-tls]                         |
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
| [FDN][fdn-default]                                                                   | 🇫🇷    | 否   | 由法国数据网络运营                                                                                                              |                                                                                                  | [HTTPS][fdn-default-https], [TLS][fdn-default-tls]                                 |
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
| [Wikimedia DNS][wikimedia-default]                                                   | 🇺🇸    | 否   | Operated by the Wikimedia Foundation. Beta service, no availability guarantees                                                  |                                                                                                  | [HTTPS][wikimedia-default-https], [TLS][wikimedia-default-tls]                     |

## 已知问题

1. 某些应用和协议会忽略加密 DNS：
      - 特定地区的 Firefox，所有地区的 App Store。[更多信息](https://github.com/paulmillr/encrypted-dns/issues/22)
      - iCloud 专用代理，VPN 客户端
      - Little Snitch，LuLu
      - DNS 相关的命令行工具：`host`，`dig`，`nslookup` 等。
2. 咖啡馆、酒店、机场的 [Wi-Fi 强制门户](https://zh.wikipedia.org/wiki/强制门户) 被苹果从加密 DNS 规则中排除；为了简化认证流程——这是合理的
3. TLS DNS 更容易被供应商屏蔽，因为它使用非标准的 853 端口。
  [更多信息](https://security.googleblog.com/2022/07/dns-over-http3-in-android.html)
4. 基于 TOR 的加密 DNS 可能在隐私方面更好，但我们目前尚无此功能。

## 参与贡献

- **添加 / 编辑一个描述文件：** 编辑 `src` 目录下的 json 文件。
- **验证解析器的 IP / 主机名：** 比较 mobileconfig 文件与它们的原始网站（在文本编辑器中打开文件）。
- 访问 [developer.apple.com](https://developer.apple.com/documentation/devicemanagement/dnssettings) 查看更多文档。
- **按需激活：** 你可以选择排除一些不想使用加密 DNS 的受信任 Wi-Fi 网络。为此，在描述文件的 `PayloadContent` 字典下的 [OnDemandRules](https://github.com/paulmillr/encrypted-dns/blob/master/profiles/template-on-demand-default-https.mobileconfig#L22-L38) 字段中添加你的 SSID。

### 脚本

- `npm run build` - 重新构建描述文件、已签名描述文件和 README
- `npm run sign` - 使用 ECC SSL 证书重新签名所有描述文件（更新 `signature` 字段）。
    - 签名通过 [key-producer](https://github.com/paulmillr/micro-key-producer) 完成
    - 可以使用 Let's Encrypt 免费证书，但[会在45天内过期](https://letsencrypt.org/2026/02/24/rate-limits-45-day-certs)。
    - `certs` 子目录下需要包含以下文件:

    ```
    `privkey.pem`  : 你的证书的私钥。
    `fullchain.pem`: 大多数服务器软件中使用的证书文件。
    `chain.pem`    : 在 Nginx >=1.3.7 中用于 OCSP Stapling。
    `cert.pem`
    ```

- `npm run new` - 通过命令行交互创建新的描述文件。也可以带参数运行。
    - `scripts/new.test.ts` 包含命令行快照测试和 PTY 交互流程测试。
    - PTY 测试默认运行；设置 `NEW_TEST_PTY=0` 可跳过。
- `src/scripts/sign-single.ts --ca cert.pem --priv_key key.pem [--chain chain.pem] path.mobileconfig` - 签名单个 mobileconfig
- `src/scripts/sign-single-openssl.ts --ca cert.pem --priv_key key.pem [--chain chain.pem] path.mobileconfig` 使用 OpenSSL 签名单个 `.mobileconfig`。
    - 使用 `-nosmimecap` 以匹配本地 CMS 签名策略。
- `src/scripts/detach.ts signed.mobileconfig` - 从已签名的描述文件中分离出 CMS 签名并将 PEM 打印到标准输出.
- `npm run test` - 对于 `sign-single.ts` 和 `sign-single-openssl.sh` 进行一致性检查。
    - 通过 OpenSSL 生成临时的测试根/签名者证书。
    - 使用 `scripts/sign.ts` 和 `scripts/sign_openssl.sh` 签名同一描述文件。
    - 验证分离出的内容与嵌入式证书集的一致性。

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
[wikimedia-default]: https://meta.wikimedia.org/wiki/Wikimedia_DNS
[wikimedia-default-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/wikimedia-default-https.mobileconfig
[wikimedia-default-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/wikimedia-default-tls.mobileconfig
[adguard-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-default-https.mobileconfig
[adguard-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-default-tls.mobileconfig
[adguard-family-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-family-https.mobileconfig
[adguard-family-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-family-tls.mobileconfig
[adguard-nofilter-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-nofilter-https.mobileconfig
[adguard-nofilter-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/adguard-nofilter-tls.mobileconfig
[alibaba-default-https-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alibaba-default-https.mobileconfig
[alibaba-default-tls-signed]: https://github.com/paulmillr/encrypted-dns/raw/master/signed/alibaba-default-tls.mobileconfig
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

