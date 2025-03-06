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

<%PROVIDERS_LINKS%>