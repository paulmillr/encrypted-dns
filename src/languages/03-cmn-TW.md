<%LANGUAGES%>

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

<%PROVIDERS_TABLE%>

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

<%PROVIDERS_LINKS%>