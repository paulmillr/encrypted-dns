<%LANGUAGES%>

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

<%PROVIDERS_TABLE%>

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

<%PROVIDERS_LINKS%>