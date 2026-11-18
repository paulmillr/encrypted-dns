<%LANGUAGES%>

# encrypted-dns-configs

Profil konfigurasi untuk [DNS melalui HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) dan [DNS melalui TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). Pelajari cara kerjanya di [artikel tentang DNS terenkripsi](https://paulmillr.com/posts/encrypted-dns/). Untuk menambahkan penyedia atau memperbarui datanya di tabel, lihat [panduan kontribusi](../CONTRIBUTING.md).

## Cara menggunakan profil

Pilih dan unduh salah satu profil HTTPS dari tabel di bawah, lalu ikuti langkah pemasangannya.

#### iPhone dan iPad

1. Buka tautan di Safari, lalu ketuk “Izinkan”.
2. Setelah mengunduh profil, Anda punya waktu 8 menit untuk memasangnya. Buka Pengaturan > Profil Diunduh (atau Pengaturan > Umum > VPN & Manajemen Perangkat), lalu ketuk “Instal”.
    - Jika Anda tidak bisa memasang profil, fitur Perlindungan Perangkat yang Dicuri mungkin mengharuskan Anda berada di lokasi yang dikenal.

#### Mac

1. Pastikan file berekstensi `.mobileconfig`. Jika namanya berakhiran `.mobileconfig.txt`, hapus .txt di bagian akhir. Setelah itu, klik dua kali file untuk membukanya.
2. Buka Pengaturan Sistem > Umum > Manajemen Perangkat. Di macOS 13 dan 14, buka Pengaturan Sistem > Privasi & Keamanan > Profil. Klik dua kali profil, lalu klik “Instal”.

#### Beralih antarprofil

Anda bisa memasang beberapa profil, tetapi hanya satu yang aktif. Pilih profil yang ingin digunakan, atau pilih “Otomatis” untuk memakai DNS jaringan tanpa enkripsi.

- iPhone dan iPad — Pengaturan > Umum > VPN, DNS & Manajemen Perangkat > DNS
- Mac — Pengaturan Sistem > Jaringan > VPN & Filter (di macOS 13 dan 14: Filter)
- Setelah memperbarui profil, hapus versi lama yang masih terpasang.

#### Menguji profil

- Buka halaman uji penyedia DNS Anda, misalnya [1.1.1.1/help](https://1.1.1.1/help) jika Anda memakai Cloudflare.

#### Batasan

- Sebaiknya gunakan HTTPS. DNS melalui TLS memakai port 853, yang mudah diblokir.
- Firefox (di beberapa wilayah), App Store, dan Chrome (saat “Gunakan DNS aman” aktif) tidak memakai DNS terenkripsi dari profil. Hal yang sama berlaku untuk VPN, Relai Pribadi iCloud, Little Snitch, LuLu, perangkat yang terhubung ke Hotspot Pribadi, alat baris perintah seperti `dig`, dan halaman login jaringan Wi-Fi.
- Jika profil tidak mencantumkan `ServerAddresses`, perangkat lebih dulu mengirim kueri DNS tanpa enkripsi untuk mencari alamat IP server DNS berdasarkan nama hostnya.

## Penyedia

Label pada tabel menunjukkan kategori yang diblokir oleh tiap profil. Kategori *konten campuran* mencakup situs yang memadukan konten dewasa dan konten untuk umum. Label *tidak disebutkan* berarti penyedia tidak merinci kategori yang diblokir. Filter mengubah respons DNS (`hostname=IP`) untuk nama host yang diblokir. Aturannya bisa berbeda dari satu negara ke negara lain.

Daftar lengkapnya ada di [ALL-PROFILES.md](../ALL-PROFILES.md), termasuk profil DNS melalui TLS dan versi tanpa tanda tangan.

<%PROVIDERS_TABLE%>

<%PROVIDERS_LINKS%>
