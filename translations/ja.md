<!-- Generated from src/languages/ja.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | [Deutsch](de.md) | [Español](es.md) | [Français](fr.md) | 日本語 | [Русский](ru.md) | [Türkçe](tr.md) | [Українська](uk.md) | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

# encrypted-dns-configs

[DNS over HTTPS](https://ja.wikipedia.org/wiki/DNS_over_HTTPS) と [DNS over TLS](https://ja.wikipedia.org/wiki/DNS_over_TLS) を使うための構成プロファイルを配布しています。仕組みは[暗号化 DNS の解説記事](https://paulmillr.com/posts/encrypted-dns/)で紹介しています。プロバイダを追加したり設定を変更したりする手順は、[コントリビューションガイド](../CONTRIBUTING.md)をご覧ください。

## 使い方

下の表から HTTPS プロファイルをダウンロードしてインストールします。

#### iPhone、iPad

1. Safari でリンクを開き、「許可」をタップします。
2. ダウンロード後 8 分以内に、「設定」の「プロファイルがダウンロードされました」からプロファイルを開き、「インストール」をタップします。「設定」＞「一般」＞「VPNとデバイス管理」からもプロファイルを開けます。
    - インストールできない場合は、「盗難デバイスの保護」が影響していることがあります。自宅などの「よく知っている場所」で試してください。

#### Mac

1. ファイル名が `.mobileconfig.txt` で終わっている場合は、末尾が `.mobileconfig` になるように直します。ファイルをダブルクリックします。
2. 「システム設定」＞「一般」＞「デバイス管理」を開きます。macOS 13〜14 では「プライバシーとセキュリティ」＞「プロファイル」を開きます。プロファイルをダブルクリックして「インストール」をクリックします。

#### プロファイルの切り替え

プロファイルは複数インストールできます。有効にできるのは一度に 1 つです。以下の画面で使いたいプロファイルを選びます。接続先のネットワークが提供する暗号化されていない DNS を使うには、「自動」を選びます。

- iPhone、iPad：「設定」＞「一般」＞「VPN、DNS、およびデバイス管理」＞「DNS」
- Mac：「システム設定」＞「ネットワーク」＞「VPNとフィルタ」（macOS 13〜14 では「フィルタ」）
- プロファイルを更新したら、古いものが残っていれば削除します。

#### 動作確認

- 利用しているプロバイダのテストページを開きます。Cloudflare を使っている場合は、[1.1.1.1/help](https://1.1.1.1/help) で確認できます。

#### 制限事項

- HTTPS をおすすめします。DNS over TLS が使う 853 番ポートは、ネットワーク側で遮断しやすいためです。
- 一部の地域での Firefox、App Store、「セキュア DNS を使用する」をオンにした Chrome、VPN、iCloudプライベートリレー、Little Snitch、LuLu、インターネット共有で接続した端末、`dig` などのコマンドラインツール、Wi-Fi のログイン画面では、プロファイルで指定した DNS が使われません。
- プロファイルに `ServerAddresses` の指定がない場合は、まず DNS サーバーのホスト名から IP アドレスを調べます。この問い合わせには暗号化されていない DNS が使われます。

## プロバイダ

タグは各プロファイルのブロック対象を示します。*成人向け・一般向けの混在* は、成人向けと一般向けのコンテンツを両方掲載しているサイトもブロックすることを示します。*対象カテゴリの記載なし* は、プロバイダがブロック対象のカテゴリを明記していない場合に表示されます。DNS フィルタリングでは、ブロック対象のホスト名を問い合わせたときの応答（`hostname=IP`）が変わります。ブロック対象は国によって異なることがあります。

DNS over TLS 用や署名なしのものも含め、すべてのプロファイルを [ALL-PROFILES.md](../ALL-PROFILES.md) にまとめています。

| プロバイダ                               | フィルタリングなし                                  | フィルタリングあり                                                                                                                                                                                                                                                                                                                                      | 備考                                                                                                                   |
| ---------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]          |                                                     | [インストール][360-default-https-signed] · *対象カテゴリの記載なし*                                                                                                                                                                                                                                                                                     | 🇨🇳 360 Digital Security Group が運営                                                                                   |
| [AdGuard DNS][adguard-default]           | [インストール][adguard-nofilter-https-signed]       | [デフォルト][adguard-default-https-signed] · *広告*, *トラッキング*, *フィッシング*<br>[ファミリー][adguard-family-https-signed] · *マルウェア*, *成人向け*, *広告*, *トラッキング*, *フィッシング* ([詳細][adguard-family])                                                                                                                            | 🇷🇺 AdGuard Software Ltd. が運営                                                                                        |
| [ADNull DNS][adnull-default]             |                                                     | [インストール][adnull-default-https-signed] · *広告*, *トラッキング*                                                                                                                                                                                                                                                                                    | 🇺🇦 ADNull が運営。有料プランでは DNS の設定をカスタマイズでき、広告やフィッシングのブロック機能も強化されます          |
| [Aliyun Public DNS][alibaba-default]     | [インストール][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                         | 🇨🇳 Alibaba Cloud Ltd. が運営                                                                                           |
| [BeatQuantum DNS][beatquantum-default]   | [インストール][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                         | 🇬🇧 BeatQuantum Limited が運営。DNSSEC に対応。鍵交換には従来方式、ハイブリッド方式、耐量子方式（ML-KEM）を利用できます |
| [BlahDNS][blahdns-germany]               |                                                     | [ドイツ][blahdns-germany-https-signed] · *マルウェア*, *広告*, *トラッキング*<br>[シンガポール][blahdns-singapore-https-signed] · *マルウェア*, *広告*, *トラッキング*                                                                                                                                                                                  | 🇩🇪 🇸🇬                                                                                                                  |
| [Canadian Shield][canadianshield-family] | [インストール][canadianshield-private-https-signed] | [ファミリー][canadianshield-family-https-signed] · *マルウェア*, *成人向け*, *フィッシング*<br>[セキュリティ][canadianshield-protected-https-signed] · *マルウェア*, *フィッシング*                                                                                                                                                                     | 🇨🇦 カナダインターネット登録機関（CIRA）が運営                                                                          |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                                     | [成人向けサイトの制限][cleanbrowsing-adult-https-signed] · *マルウェア*, *成人向け*, *フィッシング*<br>[ファミリー][cleanbrowsing-family-https-signed] · *マルウェア*, *成人向け*, *フィッシング*, *成人向け・一般向けの混在*<br>[セキュリティ][cleanbrowsing-security-https-signed] · *マルウェア*, *フィッシング*                                     | 🇺🇸                                                                                                                     |
| [Cloudflare 1.1.1.1][cloudflare-default] | [インストール][cloudflare-default-https-signed]     | [ファミリー][cloudflare-family-https-signed] · *マルウェア*, *成人向け*, *フィッシング* ([詳細][cloudflare-family])<br>[セキュリティ][cloudflare-malware-https-signed] · *マルウェア*, *フィッシング*                                                                                                                                                   | 🇺🇸 Cloudflare Inc. が運営                                                                                              |
| [DNS4EU][dns4eu-default]                 | [インストール][dns4eu-default-https-signed]         | [セキュリティ][dns4eu-malware-https-signed] · *マルウェア*<br>[広告ブロック][dns4eu-protective-ads-https-signed] · *マルウェア*, *広告*<br>[子ども向けフィルター][dns4eu-protective-child-https-signed] · *マルウェア*, *成人向け*<br>[子ども向けフィルター＋広告ブロック][dns4eu-protective-child-ads-https-signed] · *マルウェア*, *成人向け*, *広告* | 🇨🇿 Whalebone が主導するコンソーシアムが運営                                                                            |
| [DNSPod Public DNS][dnspod-default]      | [インストール][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                         | 🇨🇳 DNSPod Inc.（Tencent Cloud）が運営                                                                                  |
| [FDN][fdn-default]                       | [インストール][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                         | 🇫🇷 French Data Network が運営                                                                                          |
| [FFMUC-DNS][ffmuc-dns-default]           | [インストール][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                         | 🇩🇪 Freifunk München が運営                                                                                             |
| [Google Public DNS][google-default]      | [インストール][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                         | 🇺🇸 Google LLC が運営                                                                                                   |
| [keweonDNS][keweondns-default]           |                                                     | [インストール][keweondns-default-https-signed] · *広告*, *トラッキング*                                                                                                                                                                                                                                                                                 | 🇩🇪 Aviontex が運営                                                                                                     |
| [OpenDNS][opendns-family]                | [インストール][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *マルウェア*, *成人向け*                                                                                                                                                                                                                                                                                  | 🇺🇸 Cisco OpenDNS LLC が運営                                                                                            |
| [Quad9][quad9-default]                   | [インストール][quad9-nofilter-https-signed]         | [デフォルト][quad9-default-https-signed] · *マルウェア*<br>[ECS 対応][quad9-ECS-https-signed] · *マルウェア*                                                                                                                                                                                                                                            | 🇨🇭 Quad9 Foundation が運営                                                                                             |
| [Tiarap][tiarapp-default]                |                                                     | [インストール][tiarapp-default-https-signed] · *マルウェア*, *広告*, *トラッキング*, *フィッシング*                                                                                                                                                                                                                                                     | 🇸🇬 🇺🇸 Tiarap Inc. が運営                                                                                               |
| [Wikimedia DNS][wikimedia-default]       | [インストール][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                         | 🇺🇸 ウィキメディア財団が運営。ベータ版のため、稼働は保証されません                                                      |

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

