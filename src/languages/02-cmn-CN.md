<%LANGUAGES%>

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
2. 选择苹果菜单 > “系统设置”，在侧边栏中点击“隐私与安全性”，然后点击右侧的“描述文件”。
  你可能需要向下滚动。安装过程中你可能会被要求提供密码或者其他信息。
3. 在“已下载”部分，双击描述文件。检查描述文件的内容，然后点击“继续”、“安装”或“注册”来安装描述文件。如果你的 Mac 上已经安装了一个旧版本的描述文件，新版本中的设置将覆盖旧版本。

## 供应商

“审查”（也称为“过滤”）意味着该描述文件对于某些主机不会发送关于“`主机名=IP`”关系的真实信息。

<%PROVIDERS_TABLE%>

## 已知问题

1. 某些应用和协议会忽略加密 DNS：
      - 特定地区的 Firefox，所有地区的 App Store。[更多信息](https://github.com/paulmill/encrypted-dns/issues/22)
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

<%PROVIDERS_LINKS%>
