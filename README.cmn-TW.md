[English](https://github.com/paulmillr/encrypted-dns/) | [简体中文](https://github.com/paulmillr/encrypted-dns/blob/master/README.cmn-CN.md) | 繁體中文

# 加密 DNS 配置

[DNS over HTTPS](https://zh.wikipedia.org/zh-tw/DNS_over_HTTPS) 和 [DNS over TLS](https://zh.wikipedia.org/zh-tw/DNS_over_TLS) 的設定描述檔。查看這篇文章以獲取更多訊息：[paulmillr.com/posts/encrypted-dns/](https://paulmillr.com/posts/encrypted-dns/) 以及有關[提交新描述檔](#提交新描述檔)的訊息。

### 注意事項

根據 [Google 這篇文章](https://security.googleblog.com/2022/07/dns-over-http3-in-android.html)的介紹，DoH 似乎比 DoT 的性能更優。

從 iOS 和 iPadOS 15.5 開始，為了簡化咖啡館、飯店、機場等公共場所 Wi-Fi 的身份認證，蘋果將這些 Wi-Fi 的[強制網路門戶](https://zh.wikipedia.org/zh-tw/%E5%BC%BA%E5%88%B6%E9%97%A8%E6%88%B7)加入到了加密 DNS 豁免清單中。這是個好消息，但還有一些其他問題我們無法修復，只有等蘋果來解決：

- 無法啟用加密 DNS：[Little Snitch & Lulu](https://github.com/paulmillr/encrypted-dns/issues/13)、[VPN](https://github.com/paulmillr/encrypted-dns/issues/18)
- 部分流量繞過加密 DNS：[終端機和 App Store](https://github.com/paulmillr/encrypted-dns/issues/22)、[Chrome 瀏覽器](https://github.com/paulmillr/encrypted-dns/issues/19)

如果你需要更進一步的隱私保護，請查看[使用 Tor 網路的加密 DNS](https://github.com/alecmuffett/dohot)。

## 供應商

「`審查=是`」意味著描述檔不會發送某些主機「`主機名=IP`」關係的真實訊息。

| 名稱                                             | 區域  | 審查 | 備註                                                             | 安裝連結                                                                                       |
| ------------------------------------------------ | ----- | ---- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [360 安全 DNS][360-dns]                          | 🇨🇳    | 是   | 由 360 數字安全集團運營                                          | [HTTPS][360-dns-profile-https]                                                                 |
| [AdGuard DNS 默認][adguard-dns-default]          | 🇷🇺    | 是   | 由 AdGuard 運營，攔截廣告、跟蹤器和釣魚網站                      | [HTTPS][adguard-dns-default-profile-https], [TLS][adguard-dns-default-profile-tls]             |
| [AdGuard DNS 家庭保護][adguard-dns-family]       | 🇷🇺    | 是   | 由 AdGuard 運營，除默認規則外，額外攔截惡意軟體和成人內容        | [HTTPS][adguard-dns-family-profile-https], [TLS][adguard-dns-family-profile-tls]               |
| [AdGuard DNS 無過濾][adguard-dns-unfiltered]     | 🇷🇺    | 否   | 由 AdGuard 運營，無攔截                                          | [HTTPS][adguard-dns-unfiltered-profile-https], [TLS][adguard-dns-unfiltered-profile-tls]       |
| [Alekberg 加密 DNS][alekberg-dns]                | 🇳🇱    | 否   | 由個人提供                                                       | [HTTPS][alekberg-dns-profile-https]                                                            |
| [阿里雲公共 DNS][aliyun-dns]                     | 🇨🇳    | 否   | 由阿里雲計算運營                                                 | [HTTPS][aliyun-dns-profile-https], [TLS][aliyun-dns-profile-tls]                               |
| [BlahDNS CDN 過濾][blahdns]                      | 🇺🇸    | 是   | 由個人提供，攔截廣告、跟蹤器和惡意軟體                           | [HTTPS][blahdns-cdn-filtered-profile-https]                                                    |
| [BlahDNS CDN 無過濾][blahdns]                    | 🇺🇸    | 否   | 由個人提供，無過濾                                               | [HTTPS][blahdns-cdn-unfiltered-profile-https]                                                  |
| [BlahDNS 芬蘭][blahdns]                          | 🇫🇮    | 是   | 由個人提供，攔截廣告、跟蹤器和惡意軟體                           | [HTTPS][blahdns-finland-profile-https]                                                         |
| [BlahDNS 德國][blahdns]                          | 🇩🇪    | 是   | 由個人提供，攔截廣告、跟蹤器和惡意軟體                           | [HTTPS][blahdns-germany-profile-https]                                                         |
| [BlahDNS 日本][blahdns]                          | 🇯🇵    | 是   | 由個人提供，攔截廣告、跟蹤器和惡意軟體                           | [HTTPS][blahdns-japan-profile-https]                                                           |
| [BlahDNS 新加坡][blahdns]                        | 🇸🇬    | 是   | 由個人提供，攔截廣告、跟蹤器和惡意軟體                           | [HTTPS][blahdns-singapore-profile-https]                                                       |
| [BlahDNS 瑞士][blahdns]                          | 🇨🇭    | 是   | 由個人提供，攔截廣告、跟蹤器和惡意軟體                           | [TLS][blahdns-switzerland-profile-tls]                                                         |
| [Canadian Shield 隱私][canadian-shield]          | 🇨🇦    | 否   | 由加拿大網路註冊局 (CIRA) 運營                                   | [HTTPS][canadian-shield-private-profile-https], [TLS][canadian-shield-private-profile-tls]     |
| [Canadian Shield 保護][canadian-shield]          | 🇨🇦    | 是   | 由加拿大網路註冊局 (CIRA) 運營，攔截惡意軟體和釣魚網站           | [HTTPS][canadian-shield-protected-profile-https], [TLS][canadian-shield-protected-profile-tls] |
| [Canadian Shield 家庭][canadian-shield]          | 🇨🇦    | 是   | 由加拿大網路註冊局 (CIRA) 運營，攔截惡意軟體、釣魚網站和成人內容 | [HTTPS][canadian-shield-family-profile-https], [TLS][canadian-shield-family-profile-tls]       |
| [Cloudflare 1.1.1.1][cloudflare-dns]             | 🇺🇸    | 否   | 由 Cloudflare 運營                                               | [HTTPS][cloudflare-dns-profile-https], [TLS][cloudflare-dns-profile-tls]                       |
| [Cloudflare 1.1.1.1 安全][cloudflare-dns-family] | 🇺🇸    | 是   | 由 Cloudflare 運營，攔截惡意軟體和釣魚網站                       | [HTTPS][cloudflare-dns-security-profile-https]                                                 |
| [Cloudflare 1.1.1.1 家庭][cloudflare-dns-family] | 🇺🇸    | 是   | 由 Cloudflare 運營，攔截惡意軟體、釣魚網站和成人內容             | [HTTPS][cloudflare-dns-family-profile-https]                                                   |
| [DNSPod 公共 DNS][dnspod-dns]                    | 🇨🇳    | 否   | 由騰訊雲計算旗下 DNSPod 運營                                     | [HTTPS][dnspod-dns-profile-https], [TLS][dnspod-dns-profile-tls]                               |
| [Google 公共 DNS][google-dns]                    | 🇺🇸    | 否   | 由 Google 運營                                                   | [HTTPS][google-dns-profile-https], [TLS][google-dns-profile-tls]                               |
| [Mullvad DNS][mullvad-dns]                       | 🇸🇪    | 是   | 由 Mullvad VPN 運營                                              | [HTTPS][mullvad-dns-profile-https]                                                             |
| [Mullvad DNS 廣告過濾][mullvad-dns]              | 🇸🇪    | 是   | 由 Mullvad VPN 運營，攔截廣告和跟蹤器                            | [HTTPS][mullvad-dns-adblock-profile-https]                                                     |
| [OpenDNS 標準][opendns]                          | 🇺🇸    | 否   | 由思科 OpenDNS 運營                                              | [HTTPS][opendns-standard-profile-https]                                                        |
| [OpenDNS 家庭防護][opendns]                      | 🇺🇸    | 是   | 由思科 OpenDNS 運營，攔截惡意軟體和成人內容                      | [HTTPS][opendns-familyshield-profile-https]                                                    |
| [Quad9][quad9]                                   | 🇨🇭    | 是   | 由 Quad9 基金會運營，攔截惡意軟體                                | [HTTPS][quad9-profile-https], [TLS][quad9-profile-tls]                                         |
| [Quad9 ECS][quad9]                               | 🇨🇭    | 是   | 由 Quad9 基金會運營，支持 ECS，攔截惡意軟體                      | [HTTPS][quad9-ecs-profile-https], [TLS][quad9-ecs-profile-tls]                                 |
| [Tiarap][tiarap]                                 | 🇸🇬 🇺🇸 | 是   | 由 Tiarap 運營，攔截廣告、跟蹤器、釣魚網站和惡意軟體             | [HTTPS][tiarap-profile-https], [TLS][tiarap-profile-tls]                                       |

## 安裝

要使設置在 **iOS**、**iPadOS** 和 **macOS** 中所有的應用程式上生效，你需要安裝設定描述檔。此文件將指引操作系統使用 DoH 或 DoT。注意：僅在系統 Wi-Fi 設定中設置 DNS 伺服器 IP 是不夠的——你需要安裝描述檔。

iOS / iPadOS：使用 Safari 瀏覽器（其他瀏覽器只會下載該文件，不會彈出安裝提示）打開 GitHub 上的 mobileconfig 文件，然後點擊「允許」按鈕，描述檔將完成下載。打開 **系統設定 => 一般 => VPN、DNS 與裝置管理**，選擇已下載的描述檔並點擊「安裝」按鈕。

macOS [（官方文檔）](https://support.apple.com/zh-tw/guide/mac-help/mh35561/)：

1. 下載並保存描述檔，將其重命名為 `NAME.mobileconfig`，而不是 txt 之類的副檔名。
2. 選擇「蘋果」選單 >「系統設定」，按一下側邊欄中的「隱私權和安全性」，然後按一下右側的「描述檔」。（你可能需要向下捲動。）
   安裝期間，系統可能會要求你提供密碼或其他資訊。
3. 在「已下載」區域中，按兩下描述檔。
4. 檢視描述檔內容然後按一下「繼續」、「安裝」或「註冊」來安裝描述檔。

   若 Mac 上已安裝描述檔的較早版本，則以上版本中的設定會取代先前的設定。

## 範圍

這條[額外選項](https://github.com/paulmillr/encrypted-dns/issues/22)似乎可以讓描述文件在系統全域範圍生效。如果有興趣嘗試，請將下面的內容添加到 mobileconfig 文件中：

```xml
<key>PayloadScope</key>
<string>System</string>
```

## 簽署版描述檔

在 `signed` 文件夾中，存放了*稍微過時的*簽署版描述檔。這些描述檔已由 [@Candygoblen123](https://github.com/Candygoblen123) 簽署，因此當你安裝時，介面上會有「已驗證」的提示，此舉還可確保這些描述檔未被篡改。但由於這些描述檔是交由第三方簽署的，因此可能會稍微落後於未簽署的版本。

[備註]: <> (我們建議安裝簽署版的描述檔，因為數位簽章可以確保文件在下載時沒有被修改。)

如要驗證 DNS 解析器的 IP 和主機名，請將描述檔內容與其官方網站的文檔進行比對，描述檔內部結構和屬性在[蘋果開發人員網站](https://developer.apple.com/documentation/devicemanagement/dnssettings)上有詳細講解。如要驗證簽署版的描述檔，請將其下載到本地後用文字編輯器打開，因為 GitHub 會將簽署版描述檔視為二進位檔案而無法直接查看。

## 提交新描述檔

描述檔本質上是文字檔案，將現有的描述檔複製一份並修改其 UUID 即可，請確保在本 README 文件中更新描述檔的相關訊息。

隨機 UUID 除了可以通過網站在線生成，還有很多其他獲取方法：

- 在瀏覽器中按下 `F12` 打開“開發人員工具”，在主控台中執行這段程式碼

```javascript
crypto.randomUUID();
```

- 在 macOS / Linux 終端機中執行此指令

```sh
# 適用於 macOS 和 Linux
uuidgen

# 適用於 Linux
cat /proc/sys/kernel/random/uuid
```

- 在 Powershell 中執行此指令

```powershell
New-Guid
```

[360-dns]: https://sdns.360.net/dnsPublic.html
[360-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/360-https.mobileconfig
[adguard-dns-default]: https://adguard-dns.io/kb/zh-TW/general/dns-providers/#default
[adguard-dns-default-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-https.mobileconfig
[adguard-dns-default-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-default-tls.mobileconfig
[adguard-dns-family]: https://adguard-dns.io/kb/zh-TW/general/dns-providers/#family-protection
[adguard-dns-family-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-https.mobileconfig
[adguard-dns-family-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/adguard-family-tls.mobileconfig
[adguard-dns-unfiltered]: https://adguard-dns.io/kb/zh-TW/general/dns-providers/#non-filtering
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
[google-dns]: https://developers.google.com/speed/public-dns/docs/secure-transports?hl=zh-tw
[google-dns-profile-https]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-https.mobileconfig
[google-dns-profile-tls]: https://github.com/paulmillr/encrypted-dns/raw/master/profiles/google-tls.mobileconfig
[mullvad-dns]: https://mullvad.net/zh-hant/help/dns-over-https-and-dns-over-tls/
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
