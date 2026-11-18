<%LANGUAGES%>

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

<%PROVIDERS_TABLE%>

<%PROVIDERS_LINKS%>
