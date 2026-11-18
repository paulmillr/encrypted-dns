<%LANGUAGES%>

# encrypted-dns-configs

Bu depo, [HTTPS üzerinden DNS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) ve [TLS üzerinden DNS](https://en.wikipedia.org/wiki/DNS_over_TLS) için yapılandırma profilleri içerir. Bu yöntemlerin nasıl çalıştığını [şifreli DNS yazısında](https://paulmillr.com/posts/encrypted-dns/) okuyabilirsiniz. Yeni bir sağlayıcı eklemek veya mevcut bir sağlayıcının ayarlarını güncellemek için [katkı kılavuzunu](../CONTRIBUTING.md) inceleyin.

## Kullanım

Aşağıdaki tablodan bir HTTPS profili indirip yükleyin.

#### iPhone ve iPad

1. Bağlantıyı Safari’de açın ve “İzin Ver” düğmesine dokunun.
2. Profili indirdikten sonra yüklemek için 8 dakikanız var. Ayarlar’da “Profil İndirildi” seçeneğine dokunun. Profili Ayarlar > Genel > VPN ve Aygıt Yönetimi bölümünden de açabilirsiniz. Ardından “Yükle” düğmesine dokunun.
    - Çalınan Aygıt Koruması açıksa profili yüklemek için ev veya iş yeri gibi iPhone’un tanıdığı bir konumda olmanız gerekebilir.

#### Mac

1. Dosya adı `.mobileconfig.txt` ile bitiyorsa sondaki .txt uzantısını kaldırın. Ardından `.mobileconfig` dosyasına çift tıklayın.
2. Sistem Ayarları > Genel > Aygıt Yönetimi’ni açın. macOS 13 ve 14’te Sistem Ayarları > Gizlilik ve Güvenlik > Profiller yolunu izleyin. Profile çift tıklayın ve “Yükle” düğmesini tıklayın.

#### Profil değiştirme

Birden fazla profil yükleyebilirsiniz. Aynı anda yalnızca biri etkin olabilir. Kullanmak istediğiniz profili aşağıdaki menüden seçin. Ağın şifresiz DNS hizmetini kullanmak için “Otomatik” seçeneğine geçin.

- iPhone ve iPad: Ayarlar > Genel > VPN, DNS ve Aygıt Yönetimi > DNS
- Mac: Sistem Ayarları > Ağ > VPN ve Filtreler (macOS 13 ve 14’te Filtreler)
- Profili güncelledikten sonra eski sürüm hâlâ yüklüyse kaldırın.

#### Profili test etme

- Sağlayıcınızın test sayfasını açın. Cloudflare kullanıyorsanız [1.1.1.1/help](https://1.1.1.1/help) sayfasına gidin.

#### Sınırlamalar

- HTTPS’yi tercih edin. TLS üzerinden DNS, kolayca engellenebilen 853 numaralı portu kullanır.
- Firefox bazı bölgelerde profilin şifreli DNS ayarlarını kullanmaz. App Store, “Güvenli DNS kullan” ayarı açık olan Chrome, VPN’ler, iCloud Özel Geçişi, Little Snitch, LuLu, Kişisel Erişim Noktası’na bağlı aygıtlar, `dig` gibi komut satırı araçları ve Wi-Fi oturum açma sayfaları da bu ayarları kullanmaz.
- Profilde `ServerAddresses` yoksa aygıt, DNS sunucusunun IP adresini öğrenmek için önce şifresiz bir DNS sorgusu yapar.

## Sağlayıcılar

Etiketler her profilin neleri engellediğini gösterir. Bir profilde *karma içerikli siteler* etiketi varsa hem yetişkinlere hem de genel kitleye yönelik içerik barındıran siteler de engellenir. Sağlayıcı hangi kategorileri engellediğini açıklamıyorsa tabloda *kategori belirtilmemiş* yazar. Filtreleme, engellenen alan adları için verilen DNS yanıtını (`hostname=IP` eşleşmesini) değiştirir. Engellenen siteler ülkeye göre değişebilir.

TLS üzerinden DNS profilleri ve imzasız sürümler dâhil tüm profilleri [ALL-PROFILES.md](../ALL-PROFILES.md) dosyasında bulabilirsiniz.

<%PROVIDERS_TABLE%>

<%PROVIDERS_LINKS%>
