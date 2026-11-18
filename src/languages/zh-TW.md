<%LANGUAGES%>

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

<%PROVIDERS_TABLE%>

<%PROVIDERS_LINKS%>
