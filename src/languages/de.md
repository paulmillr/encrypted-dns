<%LANGUAGES%>

# encrypted-dns-configs

Konfigurationsprofile für [DNS über HTTPS](https://de.wikipedia.org/wiki/DNS_over_HTTPS) und [DNS über TLS](https://de.wikipedia.org/wiki/DNS_over_TLS). Mehr dazu findest du im [Artikel über verschlüsseltes DNS](https://paulmillr.com/posts/encrypted-dns/). In [CONTRIBUTING.md](../CONTRIBUTING.md) steht, wie du Anbieter hinzufügst oder vorhandene Einträge änderst.

## Verwendung

Lade ein HTTPS-Profil aus der folgenden Tabelle herunter und installiere es.

#### iPhone und iPad

1. Öffne den Link in Safari und tippe auf „Zulassen“.
2. Installiere das Profil innerhalb von 8 Minuten nach dem Download. Öffne dazu die Einstellungen und tippe auf „Profil geladen“. Alternativ findest du das Profil unter „Allgemein“ > „VPN und Geräteverwaltung“. Tippe anschließend auf „Installieren“.
    - Falls der Schutz für gestohlene Geräte die Installation verhindert, versuche es an einem vertrauten Ort erneut.

#### Mac

1. Der Dateiname muss auf `.mobileconfig` enden. Falls er auf `.mobileconfig.txt` endet, entferne das zusätzliche „.txt“. Öffne die Datei per Doppelklick.
2. Gehe zu „Systemeinstellungen“ > „Allgemein“ > „Geräteverwaltung“. Unter macOS 13 und 14 findest du das Profil in den Systemeinstellungen unter „Datenschutz & Sicherheit“ > „Profile“. Öffne das Profil per Doppelklick und klicke auf „Installieren“.

#### Profil wechseln

Du kannst mehrere Profile installieren und jeweils eines davon verwenden. Wähle das gewünschte Profil aus. Mit „Automatisch“ nutzt du den unverschlüsselten DNS-Dienst des Netzwerks.

- iPhone und iPad: „Einstellungen“ > „Allgemein“ > „VPN, DNS und Geräteverwaltung“ > „DNS“.
- Mac: „Systemeinstellungen“ > „Netzwerk“ > „VPN & Filter“ (unter macOS 13 und 14 „Filter“).
- Lösche nach einem Update die alte Version des Profils, falls sie noch installiert ist.

#### Funktion prüfen

- Öffne die Testseite deines Anbieters. Bei Cloudflare ist das [1.1.1.1/help](https://1.1.1.1/help).

#### Einschränkungen

- Verwende möglichst HTTPS. DNS über TLS nutzt Port 853, den Netzwerke leicht sperren können.
- Manche Apps und Funktionen nutzen eigene DNS-Einstellungen oder die des Netzwerks. Das gilt für Firefox in einigen Regionen, den App Store und Chrome mit aktivierter Option „Sicheres DNS verwenden“. Auch VPNs, iCloud Privat-Relay, Little Snitch, LuLu, Geräte am persönlichen Hotspot, Kommandozeilenprogramme wie `dig` und WLAN-Anmeldeseiten können das Profil umgehen.
- Fehlt in einem Profil `ServerAddresses`, wird der Hostname des DNS-Servers zuerst per unverschlüsselter DNS-Abfrage aufgelöst.

## Anbieter

Die Filterkategorien neben den Installationslinks zeigen, welche Arten von Domains der DNS-Dienst sperrt. *gemischte Inhalte* kennzeichnet Websites mit Inhalten für Erwachsene und für ein allgemeines Publikum. Bei *nicht angegeben* nennt der Anbieter keine Filterkategorien. Für blockierte Hostnamen ändert sich die DNS-Antwort (`Hostname=IP`). Welche Domains der Anbieter sperrt, kann vom Land abhängen.

In [ALL-PROFILES.md](../ALL-PROFILES.md) findest du alle Profile, darunter Profile für DNS über TLS und Versionen ohne Signatur.

<%PROVIDERS_TABLE%>

<%PROVIDERS_LINKS%>
