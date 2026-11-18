<%LANGUAGES%>

# encrypted-dns-configs

Profils de configuration pour le [DNS via HTTPS](https://fr.wikipedia.org/wiki/DNS_over_HTTPS) et le [DNS via TLS](https://fr.wikipedia.org/wiki/DNS_over_TLS). Pour en savoir plus, consultez [l’article sur le DNS chiffré](https://paulmillr.com/posts/encrypted-dns/). Le [guide de contribution](../CONTRIBUTING.md) explique comment ajouter un fournisseur ou mettre sa fiche à jour.

## Utilisation

Téléchargez un profil HTTPS depuis le tableau ci-dessous, puis installez-le.

#### iPhone et iPad

1. Ouvrez le lien dans Safari et touchez « Autoriser ».
2. Installez le profil dans les 8 minutes qui suivent son téléchargement. Ouvrez « Réglages » et touchez « Profil téléchargé ». Vous pouvez aussi retrouver le profil dans « Général » > « VPN et gestion de l’appareil ». Touchez ensuite « Installer ».
    - Si la protection en cas de vol de l’appareil bloque l’installation, réessayez depuis un lieu familier.

#### Mac

1. Le nom du fichier doit se terminer par `.mobileconfig`. S’il se termine par `.mobileconfig.txt`, retirez le « .txt » final. Double-cliquez sur le fichier pour l’ouvrir.
2. Ouvrez « Réglages Système » > « Général » > « Gestion de l’appareil ». Sous macOS 13 et 14, le profil se trouve dans « Confidentialité et sécurité » > « Profils ». Double-cliquez sur le profil, puis cliquez sur « Installer ».

#### Changer de profil

Vous pouvez installer plusieurs profils et en utiliser un à la fois. Sélectionnez le profil voulu. Pour revenir au DNS non chiffré du réseau, choisissez « Automatique ».

- iPhone et iPad — « Réglages » > « Général » > « VPN, DNS et gestion de l’appareil » > « DNS ».
- Mac — « Réglages Système » > « Réseau » > « VPN et filtres » (« Filtres » sous macOS 13 et 14).
- Si l’ancienne version du profil est toujours installée après la mise à jour, supprimez-la.

#### Vérifier le fonctionnement

- Ouvrez la page de test de votre fournisseur. Pour Cloudflare, rendez-vous sur [1.1.1.1/help](https://1.1.1.1/help).

#### Limites

- Privilégiez HTTPS. Les réseaux peuvent facilement bloquer le port 853 utilisé pour le DNS via TLS.
- Certaines apps et fonctions utilisent leurs propres réglages DNS ou ceux du réseau. C’est le cas de Firefox dans certaines régions, de l’App Store et de Chrome lorsque l’option « Utiliser un DNS sécurisé » est activée. Les VPN, le Relais privé iCloud, Little Snitch, LuLu, les appareils connectés via le partage de connexion, les outils en ligne de commande comme `dig` et les portails de connexion des réseaux Wi-Fi peuvent aussi contourner le profil.
- Si le champ `ServerAddresses` est absent, l’appareil commence par chercher l’adresse IP du serveur DNS à partir de son nom d’hôte. Cette première requête DNS est envoyée en clair.

## Fournisseurs

Les catégories affichées à côté des liens indiquent ce que bloque chaque profil. *contenu mixte* désigne les sites qui mêlent du contenu pour adultes et du contenu tout public. La mention *non précisé* indique que le fournisseur ne détaille pas les catégories bloquées. Pour les domaines bloqués, le filtrage change la réponse DNS (`nom d’hôte=IP`). Les règles peuvent varier d’un pays à l’autre.

La liste complète figure dans [ALL-PROFILES.md](../ALL-PROFILES.md), avec les profils DNS via TLS et les versions non signées.

<%PROVIDERS_TABLE%>

<%PROVIDERS_LINKS%>
