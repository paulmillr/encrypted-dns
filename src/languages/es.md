<%LANGUAGES%>

# encrypted-dns-configs

Perfiles de configuración para [DNS sobre HTTPS](https://es.wikipedia.org/wiki/DNS_mediante_HTTPS) y [DNS sobre TLS](https://es.wikipedia.org/wiki/DNS_mediante_TLS). Consulta el [artículo sobre DNS cifrado](https://paulmillr.com/posts/encrypted-dns/) para saber más. La [guía de contribución](../CONTRIBUTING.md) explica cómo añadir un proveedor o actualizar su ficha.

## Uso

Descarga un perfil HTTPS de la tabla de proveedores e instálalo.

#### iPhone y iPad

1. Abre el enlace en Safari y toca «Permitir».
2. Instala el perfil dentro de los 8 minutos posteriores a la descarga. Abre «Ajustes» («Configuración» en Latinoamérica) y toca «Perfil descargado». También puedes buscarlo en «General» > «VPN y gestión de dispositivos» («Admón. de dispositivos y VPN» en Latinoamérica). Después toca «Instalar».
    - Si la protección antirrobo del iPhone impide la instalación, inténtalo de nuevo desde un lugar conocido.

#### Mac

1. El nombre del archivo debe terminar en `.mobileconfig`. Si termina en `.mobileconfig.txt`, quita el «.txt» del final. Abre el archivo con un doble clic.
2. Abre «Ajustes del Sistema» > «General» > «Gestión de dispositivos». En Latinoamérica, la ruta es «Configuración del Sistema» > «General» > «Administración de dispositivos». En macOS 13 y 14, busca el perfil en «Privacidad y seguridad» > «Perfiles». Haz doble clic en el perfil y selecciona «Instalar».

#### Cambiar de perfil

Puedes instalar varios perfiles y usar uno a la vez. Selecciona el perfil que quieras usar. Si prefieres el DNS sin cifrar de la red, elige «Automático».

- iPhone y iPad — En «Ajustes» > «General» > «VPN, DNS y gestión de dispositivos», toca «DNS». En Latinoamérica, entra en «Configuración» > «General» y busca «DNS» en el menú de administración de dispositivos y VPN.
- Mac — En «Ajustes del Sistema» («Configuración del Sistema» en Latinoamérica), abre «Red» > «VPN y filtros». En macOS 13 y 14, selecciona «Filtros».
- Si la versión anterior del perfil sigue instalada después de actualizarlo, elimínala.

#### Comprobar que funciona

- Abre la página de prueba de tu proveedor. La de Cloudflare es [1.1.1.1/help](https://1.1.1.1/help).

#### Limitaciones

- Usa HTTPS siempre que puedas. El DNS sobre TLS usa el puerto 853, que las redes pueden bloquear fácilmente.
- Algunas apps y funciones usan su propio DNS o el de la red. Esto ocurre con Firefox en algunas regiones, con App Store y con Chrome si está activada la opción «Usar DNS seguro». También pueden omitir el perfil las VPN, Relay privado de iCloud (Retransmisión privada en Latinoamérica), Little Snitch, LuLu, los dispositivos conectados a tu Punto de acceso personal (Compartir Internet en Latinoamérica), las herramientas de línea de comandos como `dig` y las páginas de inicio de sesión de las redes wifi.
- Si el perfil omite `ServerAddresses`, el sistema primero resuelve el nombre del servidor DNS mediante una consulta sin cifrar.

## Proveedores

Las etiquetas indican qué tipos de dominios bloquea cada perfil. *contenido mixto* se refiere a los sitios que combinan material para adultos con material apto para todo público. La etiqueta *sin especificar* indica que el proveedor no detalla qué bloquea. En los dominios bloqueados, el filtro altera la respuesta DNS (`nombre de host=IP`). Las reglas pueden variar según el país.

En [ALL-PROFILES.md](../ALL-PROFILES.md) están todos los perfiles, incluidos los de DNS sobre TLS y las versiones sin firmar.

<%PROVIDERS_TABLE%>

<%PROVIDERS_LINKS%>
