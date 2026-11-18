<!-- Generated from src/languages/zh-TW.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [Deutsch](de.md) | [Español](es.md) | [Français](fr.md) | [日本語](ja.md) | [Русский](ru.md) | [Türkçe](tr.md) | [Українська](uk.md) | [简体中文](zh-CN.md) | 繁體中文

# 加密 DNS 設定描述檔

本專案提供 [DNS over HTTPS](https://zh.wikipedia.org/zh-tw/DNS_over_HTTPS) 和 [DNS over TLS](https://zh.wikipedia.org/zh-tw/DNS_over_TLS) 的設定描述檔。想了解這兩種通訊協定的運作方式，可以閱讀[加密 DNS 介紹](https://paulmillr.com/posts/encrypted-dns/)（英文）。若要新增服務提供者或修改現有設定，請參閱[貢獻指南](../CONTRIBUTING.md)（英文）。

## 使用方式

從下表選擇一個 HTTPS 描述檔，下載後依下方對應裝置的步驟安裝。

#### iPhone、iPad

1. 在 Safari 中開啟連結，點一下「允許」。
2. 下載後請在 8 分鐘內完成安裝。開啟「設定」中的「已下載描述檔」，或到「設定」>「一般」>「VPN與裝置管理」找到剛下載的描述檔，再點一下「安裝」。
    - 如果已開啟「遭竊裝置防護」，可能要在住家等熟悉地點才能安裝。

#### Mac

1. 如果檔名是以 `.mobileconfig.txt` 結尾，請刪掉最後的 .txt，再按兩下 `.mobileconfig` 檔案。
2. 開啟「系統設定」>「一般」>「裝置管理」。如果使用 macOS 13 或 14，請改到「隱私權與安全性」>「描述檔」。按兩下已下載的描述檔，再按一下「安裝」。

#### 切換描述檔

你可以安裝多個描述檔，一次只能啟用其中一個。到下方對應的設定頁面，選擇要使用的描述檔。若要使用目前網路提供的未加密 DNS，請選「自動」。

- iPhone、iPad：「設定」>「一般」>「VPN、DNS與裝置管理」>「DNS」
- Mac：「系統設定」>「網路」>「VPN與過濾條件」（macOS 13 或 14 中為「過濾條件」）
- 更新描述檔後，請移除舊版本。

#### 檢查是否生效

- 到 DNS 服務提供者的測試頁面確認設定是否生效。如果使用 Cloudflare，可以開啟 [1.1.1.1/help](https://1.1.1.1/help)。

#### 限制

- 建議優先使用 HTTPS。DNS over TLS 使用容易被封鎖的 853 連接埠。
- 在部分地區，Firefox 不會使用描述檔指定的加密 DNS。App Store、開啟「使用安全 DNS」的 Chrome、VPN、iCloud 私密轉送、Little Snitch、LuLu、連上個人熱點的裝置、`dig` 等命令列工具，以及 Wi-Fi 登入頁面也不會套用這項設定。
- 如果描述檔未指定 `ServerAddresses`，裝置會先透過未加密的 DNS 查詢 DNS 伺服器的 IP 位址。

## DNS 服務提供者

標籤說明各描述檔會封鎖哪些內容。標有「*混合內容網站*」的描述檔也會封鎖同時包含成人內容和一般內容的網站。「*類別未註明*」表示服務提供者沒有列出封鎖類別。過濾會改變遭封鎖網域的 DNS 解析結果（`網域名稱 → IP 位址`）。封鎖範圍可能因國家而異。

所有描述檔（包含 DNS over TLS 和未簽署的版本）都列在 [ALL-PROFILES.md](../ALL-PROFILES.md)。

| 服務提供者                               | 無過濾                                      | 有過濾                                                                                                                                                                                                                                                                                                              | 備註                                                                                                |
| ---------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [360 安全 DNS][360-default]              |                                             | [安裝][360-default-https-signed] · *類別未註明*                                                                                                                                                                                                                                                                     | 🇨🇳 由 360 數位安全集團營運                                                                          |
| [AdGuard DNS][adguard-default]           | [安裝][adguard-nofilter-https-signed]       | [預設][adguard-default-https-signed] · *廣告*, *追蹤器*, *網路釣魚*<br>[家庭保護][adguard-family-https-signed] · *惡意軟體*, *成人內容*, *廣告*, *追蹤器*, *網路釣魚* ([詳細資訊][adguard-family])                                                                                                                  | 🇷🇺 由 AdGuard Software Ltd. 營運                                                                    |
| [ADNull DNS][adnull-default]             |                                             | [安裝][adnull-default-https-signed] · *廣告*, *追蹤器*                                                                                                                                                                                                                                                              | 🇺🇦 由 ADNull 營運。付費方案可自訂 DNS 設定，並提供進階的廣告封鎖與網路釣魚防護功能                  |
| [阿里雲公用 DNS][alibaba-default]        | [安裝][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                     | 🇨🇳 由 Alibaba Cloud Ltd. 營運                                                                       |
| [BeatQuantum DNS][beatquantum-default]   | [安裝][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                     | 🇬🇧 由 BeatQuantum Limited 營運。支援 DNSSEC，金鑰交換可採用傳統、混合或以 ML-KEM 為基礎的後量子方案 |
| [BlahDNS][blahdns-germany]               |                                             | [德國][blahdns-germany-https-signed] · *惡意軟體*, *廣告*, *追蹤器*<br>[新加坡][blahdns-singapore-https-signed] · *惡意軟體*, *廣告*, *追蹤器*                                                                                                                                                                      | 🇩🇪 🇸🇬                                                                                               |
| [Canadian Shield][canadianshield-family] | [安裝][canadianshield-private-https-signed] | [家庭版][canadianshield-family-https-signed] · *惡意軟體*, *成人內容*, *網路釣魚*<br>[安全防護][canadianshield-protected-https-signed] · *惡意軟體*, *網路釣魚*                                                                                                                                                     | 🇨🇦 由加拿大網際網路註冊管理機構（CIRA）營運                                                         |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                             | [成人內容過濾][cleanbrowsing-adult-https-signed] · *惡意軟體*, *成人內容*, *網路釣魚*<br>[家庭過濾][cleanbrowsing-family-https-signed] · *惡意軟體*, *成人內容*, *網路釣魚*, *混合內容網站*<br>[安全過濾][cleanbrowsing-security-https-signed] · *惡意軟體*, *網路釣魚*                                             | 🇺🇸                                                                                                  |
| [Cloudflare 1.1.1.1][cloudflare-default] | [安裝][cloudflare-default-https-signed]     | [家庭版][cloudflare-family-https-signed] · *惡意軟體*, *成人內容*, *網路釣魚* ([詳細資訊][cloudflare-family])<br>[安全][cloudflare-malware-https-signed] · *惡意軟體*, *網路釣魚*                                                                                                                                   | 🇺🇸 由 Cloudflare Inc. 營運                                                                          |
| [DNS4EU][dns4eu-default]                 | [安裝][dns4eu-default-https-signed]         | [安全防護][dns4eu-malware-https-signed] · *惡意軟體*<br>[廣告封鎖][dns4eu-protective-ads-https-signed] · *惡意軟體*, *廣告*<br>[兒童上網防護][dns4eu-protective-child-https-signed] · *惡意軟體*, *成人內容*<br>[兒童上網防護＋廣告封鎖][dns4eu-protective-child-ads-https-signed] · *惡意軟體*, *成人內容*, *廣告* | 🇨🇿 由 Whalebone 主導的聯盟營運                                                                      |
| [DNSPod 公用 DNS][dnspod-default]        | [安裝][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                     | 🇨🇳 由 DNSPod Inc.（騰訊雲）營運                                                                     |
| [FDN][fdn-default]                       | [安裝][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                     | 🇫🇷 由 French Data Network 營運                                                                      |
| [FFMUC-DNS][ffmuc-dns-default]           | [安裝][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                     | 🇩🇪 由 Freifunk München 營運                                                                         |
| [Google 公用 DNS][google-default]        | [安裝][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                     | 🇺🇸 由 Google LLC 營運                                                                               |
| [keweonDNS][keweondns-default]           |                                             | [安裝][keweondns-default-https-signed] · *廣告*, *追蹤器*                                                                                                                                                                                                                                                           | 🇩🇪 由 Aviontex 營運                                                                                 |
| [OpenDNS][opendns-family]                | [安裝][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *惡意軟體*, *成人內容*                                                                                                                                                                                                                                                | 🇺🇸 由 Cisco OpenDNS LLC 營運                                                                        |
| [Quad9][quad9-default]                   | [安裝][quad9-nofilter-https-signed]         | [預設][quad9-default-https-signed] · *惡意軟體*<br>[支援 ECS][quad9-ECS-https-signed] · *惡意軟體*                                                                                                                                                                                                                  | 🇨🇭 由 Quad9 基金會營運                                                                              |
| [Tiarap][tiarapp-default]                |                                             | [安裝][tiarapp-default-https-signed] · *惡意軟體*, *廣告*, *追蹤器*, *網路釣魚*                                                                                                                                                                                                                                     | 🇸🇬 🇺🇸 由 Tiarap Inc. 營運                                                                           |
| [Wikimedia DNS][wikimedia-default]       | [安裝][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                     | 🇺🇸 由維基媒體基金會營運。服務仍在測試階段，不保證能隨時使用                                         |

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

