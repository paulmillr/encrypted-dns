<%LANGUAGES%>

# encrypted-dns-configs

Perfis de configuração para [DNS sobre HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) e [DNS sobre TLS](https://en.wikipedia.org/wiki/DNS_over_TLS). Saiba mais no [artigo sobre DNS criptografado](https://paulmillr.com/posts/encrypted-dns/). Para incluir um provedor na lista ou atualizar uma entrada, consulte o [guia de contribuição](../CONTRIBUTING.md).

## Como usar

Escolha um perfil HTTPS na tabela abaixo, baixe o arquivo e siga as instruções de instalação.

#### iPhone e iPad

1. Abra o link no Safari e toque em “Permitir”.
2. Você tem 8 minutos após o download para instalar o perfil. Acesse Ajustes > Perfil Baixado (ou Ajustes > Geral > VPN e Gerenciamento de Dispositivos) e toque em “Instalar”.
    - Se a instalação for recusada, a Proteção de Dispositivo Roubado pode exigir que você esteja em um local conhecido.

#### Mac

1. O arquivo deve ter a extensão `.mobileconfig`. Se o nome terminar em `.mobileconfig.txt`, remova o .txt do final. Em seguida, abra o arquivo com um clique duplo.
2. Vá até Ajustes do Sistema > Geral > Gerenciamento de Dispositivos. No macOS 13 e 14, o caminho é Ajustes do Sistema > Privacidade e Segurança > Perfis. Clique duas vezes no perfil e depois em “Instalar”.

#### Alternar entre perfis

Você pode instalar vários perfis, mas só um fica ativo por vez. Selecione o perfil que deseja usar ou escolha “Automático” para usar o DNS não criptografado da rede.

- iPhone e iPad — Ajustes > Geral > VPN, DNS e Gerenciamento de Dispositivos > DNS
- Mac — Ajustes do Sistema > Rede > VPN e Filtros (no macOS 13 e 14: Filtros)
- Depois de atualizar um perfil, remova as cópias antigas.

#### Testar o perfil

- Abra a página de teste do seu provedor. Se você usa a Cloudflare, acesse [1.1.1.1/help](https://1.1.1.1/help).

#### Limitações

- Prefira HTTPS. O DNS sobre TLS usa a porta 853, que é fácil de bloquear.
- O Firefox (em algumas regiões), a App Store e o Chrome (com “Usar DNS seguro” ativado) ignoram o DNS criptografado do perfil. O mesmo vale para VPNs, a Retransmissão Privada do iCloud, Little Snitch, LuLu, dispositivos conectados ao Acesso Pessoal, ferramentas de linha de comando como `dig` e páginas de login de redes Wi-Fi.
- Quando o perfil não inclui `ServerAddresses`, o sistema primeiro faz uma consulta DNS sem criptografia para resolver o nome do servidor.

## Provedores

As categorias na tabela mostram o que cada perfil bloqueia. A categoria *conteúdo misto* abrange sites que publicam conteúdo adulto junto com conteúdo para o público em geral. A indicação *não especificado* aparece quando o provedor não informa as categorias de bloqueio. O filtro altera a resposta DNS (`hostname=IP`) para os domínios bloqueados. As regras podem variar conforme o país.

A lista completa está em [ALL-PROFILES.md](../ALL-PROFILES.md) e inclui os perfis de DNS sobre TLS e as versões sem assinatura.

<%PROVIDERS_TABLE%>

<%PROVIDERS_LINKS%>
