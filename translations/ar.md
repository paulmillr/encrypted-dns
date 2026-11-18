<!-- Generated from src/languages/ar.md by npm --prefix src/scripts run build. Edit that file instead. -->
[English](../README.md) | العربية | [Deutsch](de.md) | [Español](es.md) | [Français](fr.md) | [Bahasa Indonesia](id.md) | [日本語](ja.md) | [Português](pt.md) | [Русский](ru.md) | [Türkçe](tr.md) | [Українська](uk.md) | [简体中文](zh-CN.md) | [繁體中文](zh-TW.md)

<div lang="ar" dir="rtl">

# encrypted-dns-configs

ملفات تعريف لإعداد [DNS عبر HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) أو [DNS عبر TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). اقرأ [هذا المقال عن DNS المشفّر](https://paulmillr.com/posts/encrypted-dns/) لمعرفة المزيد. لإضافة مزوّد خدمة أو تحديث بيانات أحد المزوّدين في الجدول، راجع [دليل المساهمة](../CONTRIBUTING.md).

## طريقة الاستخدام

نزّل أحد ملفات تعريف HTTPS من الجدول أدناه ثم ثبّته.

#### iPhone وiPad

1. افتح الرابط في Safari واضغط على «السماح».
2. أمامك 8 دقائق من وقت التنزيل لتثبيت الملف. انتقل إلى «الإعدادات» > «تم تنزيل ملف التعريف» (أو «الإعدادات» > «عام» > «VPN وإدارة الأجهزة»)، ثم اضغط على «تثبيت».
    - إذا تعذّر تثبيت الملف، فقد تشترط ميزة «حماية الجهاز المسروق» أن تكون في مكان مألوف.

#### Mac

1. تأكّد من أن الملف يحمل امتداد `.mobileconfig`. إذا انتهى اسمه بـ `.mobileconfig.txt`، فاحذف الامتداد الأخير. ثم افتح الملف بالنقر عليه مرتين.
2. انتقل إلى «إعدادات النظام» > «عام» > «إدارة الأجهزة». في macOS 13 و14، انتقل إلى «إعدادات النظام» > «الخصوصية والأمن» > «ملفات التعريف». انقر مرتين على ملف التعريف، ثم انقر على «تثبيت».

#### التبديل بين ملفات التعريف

يمكنك تثبيت عدة ملفات تعريف وتفعيل ملف واحد في كل مرة. حدّد الملف الذي تريد تفعيله، أو اختر «تلقائي» لاستخدام DNS غير المشفّر الذي توفّره الشبكة.

- iPhone وiPad — «الإعدادات» > «عام» > «VPN وDNS وإدارة الأجهزة» > «DNS»
- Mac — «إعدادات النظام» > «الشبكة» > «VPN وعوامل التصفية» (في macOS 13 و14: «عوامل التصفية»)
- بعد تحديث ملف تعريف، أزل أي نسخة قديمة منه.

#### اختبار ملف التعريف

- افتح صفحة الاختبار الخاصة بمزوّد الخدمة. إذا كنت تستخدم Cloudflare، فانتقل إلى [1.1.1.1/help](https://1.1.1.1/help).

#### القيود

- يُفضّل استخدام HTTPS، إذ يسهل حجب المنفذ 853 الذي يستخدمه DNS عبر TLS.
- يتجاوز ما يلي إعدادات DNS المشفّر في ملف التعريف: Firefox في بعض المناطق، وApp Store، وChrome عند تفعيل «استخدام نظام أسماء النطاقات (DNS) الآمن»، واتصالات VPN، وميزة «ترحيل iCloud الخاص»، وتطبيقا Little Snitch وLuLu، والأجهزة المتصلة بنقطة الاتصال الشخصية، وأدوات سطر الأوامر مثل `dig`، وصفحات تسجيل الدخول إلى شبكات Wi-Fi.
- إذا لم يتضمّن ملف التعريف حقل `ServerAddresses`، يرسل الجهاز أولًا استعلام DNS غير مشفّر لمعرفة عنوان IP المقابل لاسم الخادم.

## المزوّدون

توضّح التصنيفات في الجدول ما يحظره كل ملف تعريف. يشمل تصنيف *محتوى مختلط* المواقع التي تجمع بين محتوى للبالغين ومحتوى موجّه للجميع. ويظهر تصنيف *غير محدّد* إذا لم يذكر المزوّد فئات الحظر. عند حظر نطاق، تتغيّر نتيجة استعلام DNS عنه (`hostname=IP`). وقد تختلف قواعد الحظر من بلد إلى آخر.

تجد القائمة الكاملة في [ALL-PROFILES.md](../ALL-PROFILES.md)، بما فيها ملفات تعريف DNS عبر TLS والنسخ غير الموقّعة.

| المزوّد                                  | بلا تصفية                                    | مع تصفية                                                                                                                                                                                                                                                                                                                                                             | ملاحظات                                                                                                          |
| ---------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [360 Security DNS][360-default]          |                                              | [تثبيت][360-default-https-signed] · *غير محدّد*                                                                                                                                                                                                                                                                                                                      | 🇨🇳 بإدارة 360 Digital Security Group                                                                             |
| [AdGuard DNS][adguard-default]           | [تثبيت][adguard-nofilter-https-signed]       | [افتراضي][adguard-default-https-signed] · *إعلانات*، *تتبّع*، *تصيّد احتيالي*<br>[عائلي][adguard-family-https-signed] · *برمجيات خبيثة*، *محتوى للبالغين*، *إعلانات*، *تتبّع*، *تصيّد احتيالي* ([التفاصيل][adguard-family])                                                                                                                                          | 🇷🇺 بإدارة AdGuard Software Ltd.                                                                                  |
| [ADNull DNS][adnull-default]             |                                              | [تثبيت][adnull-default-https-signed] · *إعلانات*، *تتبّع*                                                                                                                                                                                                                                                                                                            | 🇺🇦 بإدارة ADNull. توفّر الباقات المدفوعة خدمة DNS مخصّصة وخيارات متقدّمة لحجب الإعلانات ومواقع التصيّد الاحتيالي |
| [Aliyun Public DNS][alibaba-default]     | [تثبيت][alibaba-default-https-signed]        |                                                                                                                                                                                                                                                                                                                                                                      | 🇨🇳 بإدارة Alibaba Cloud Ltd.                                                                                     |
| [BeatQuantum DNS][beatquantum-default]   | [تثبيت][beatquantum-default-https-signed]    |                                                                                                                                                                                                                                                                                                                                                                      | 🇬🇧 بإدارة BeatQuantum Limited. يدعم DNSSEC وتبادل المفاتيح التقليدي والهجين وما بعد الكمّي (ML-KEM)              |
| [BlahDNS][blahdns-germany]               |                                              | [ألمانيا][blahdns-germany-https-signed] · *برمجيات خبيثة*، *إعلانات*، *تتبّع*<br>[سنغافورة][blahdns-singapore-https-signed] · *برمجيات خبيثة*، *إعلانات*، *تتبّع*                                                                                                                                                                                                    | 🇩🇪 🇸🇬                                                                                                            |
| [Canadian Shield][canadianshield-family] | [تثبيت][canadianshield-private-https-signed] | [عائلي][canadianshield-family-https-signed] · *برمجيات خبيثة*، *محتوى للبالغين*، *تصيّد احتيالي*<br>[محمي][canadianshield-protected-https-signed] · *برمجيات خبيثة*، *تصيّد احتيالي*                                                                                                                                                                                 | 🇨🇦 بإدارة الهيئة الكندية لتسجيل نطاقات الإنترنت (CIRA)                                                           |
| [Cleanbrowsing][cleanbrowsing-adult]     |                                              | [تصفية محتوى البالغين][cleanbrowsing-adult-https-signed] · *برمجيات خبيثة*، *محتوى للبالغين*، *تصيّد احتيالي*<br>[تصفية عائلية][cleanbrowsing-family-https-signed] · *برمجيات خبيثة*، *محتوى للبالغين*، *تصيّد احتيالي*، *محتوى مختلط*<br>[تصفية أمنية][cleanbrowsing-security-https-signed] · *برمجيات خبيثة*، *تصيّد احتيالي*                                      | 🇺🇸                                                                                                               |
| [Cloudflare 1.1.1.1][cloudflare-default] | [تثبيت][cloudflare-default-https-signed]     | [عائلي][cloudflare-family-https-signed] · *برمجيات خبيثة*، *محتوى للبالغين*، *تصيّد احتيالي* ([التفاصيل][cloudflare-family])<br>[الأمان][cloudflare-malware-https-signed] · *برمجيات خبيثة*، *تصيّد احتيالي*                                                                                                                                                         | 🇺🇸 بإدارة Cloudflare Inc.                                                                                        |
| [DNS4EU][dns4eu-default]                 | [تثبيت][dns4eu-default-https-signed]         | [الحماية][dns4eu-malware-https-signed] · *برمجيات خبيثة*<br>[حجب الإعلانات][dns4eu-protective-ads-https-signed] · *برمجيات خبيثة*، *إعلانات*<br>[حماية الأطفال][dns4eu-protective-child-https-signed] · *برمجيات خبيثة*، *محتوى للبالغين*<br>[حماية الأطفال وحجب الإعلانات][dns4eu-protective-child-ads-https-signed] · *برمجيات خبيثة*، *محتوى للبالغين*، *إعلانات* | 🇨🇿 بإدارة ائتلاف بقيادة Whalebone                                                                                |
| [DNSPod Public DNS][dnspod-default]      | [تثبيت][dnspod-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                      | 🇨🇳 بإدارة DNSPod Inc. (Tencent Cloud)                                                                            |
| [FDN][fdn-default]                       | [تثبيت][fdn-default-https-signed]            |                                                                                                                                                                                                                                                                                                                                                                      | 🇫🇷 بإدارة French Data Network                                                                                    |
| [FFMUC-DNS][ffmuc-dns-default]           | [تثبيت][ffmuc-dns-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                      | 🇩🇪 بإدارة Freifunk München                                                                                       |
| [Google Public DNS][google-default]      | [تثبيت][google-default-https-signed]         |                                                                                                                                                                                                                                                                                                                                                                      | 🇺🇸 بإدارة Google LLC                                                                                             |
| [keweonDNS][keweondns-default]           |                                              | [تثبيت][keweondns-default-https-signed] · *إعلانات*، *تتبّع*                                                                                                                                                                                                                                                                                                         | 🇩🇪 بإدارة Aviontex                                                                                               |
| [OpenDNS][opendns-family]                | [تثبيت][opendns-default-https-signed]        | [FamilyShield][opendns-family-https-signed] · *برمجيات خبيثة*، *محتوى للبالغين*                                                                                                                                                                                                                                                                                      | 🇺🇸 بإدارة Cisco OpenDNS LLC                                                                                      |
| [Quad9][quad9-default]                   | [تثبيت][quad9-nofilter-https-signed]         | [افتراضي][quad9-default-https-signed] · *برمجيات خبيثة*<br>[مع ECS][quad9-ECS-https-signed] · *برمجيات خبيثة*                                                                                                                                                                                                                                                        | 🇨🇭 بإدارة مؤسسة Quad9                                                                                            |
| [Tiarap][tiarapp-default]                |                                              | [تثبيت][tiarapp-default-https-signed] · *برمجيات خبيثة*، *إعلانات*، *تتبّع*، *تصيّد احتيالي*                                                                                                                                                                                                                                                                         | 🇸🇬 🇺🇸 بإدارة Tiarap Inc.                                                                                         |
| [Wikimedia DNS][wikimedia-default]       | [تثبيت][wikimedia-default-https-signed]      |                                                                                                                                                                                                                                                                                                                                                                      | 🇺🇸 بإدارة مؤسسة ويكيميديا. خدمة تجريبية لا يُضمن توفّرها                                                         |

</div>

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

