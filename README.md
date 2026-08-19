# Screen Share Room

Crie um redesign para um app de desktop (mobile e web) chamado Game Stream.

É uma plataforma pessoal de transmissão de tela em baixa latência para assistir jogos, vídeos e tela do PC com amigos.

Preciso de uma interface moderna, escura, leve e profissional, com foco em uso real, não landing page.

Telas necessárias:

- Tela inicial para criar transmissão ou entrar em uma sala

- Tela do Host com código da sala, link público, botão transmitir tela, seletor de qualidade, botão áudio da tela, botão microfone, debug WebRTC e estado da transmissão

- Tela do Viewer com vídeo grande, estado da conexão, áudio, tela cheia, sair e métricas/debug

- Layout responsivo para celular e desktop

Use React + Tailwind.

Não crie backend.

Não implemente WebRTC real.

Crie apenas a interface/componentes.

Evite visual de site marketing e a  Identididade Visual (ATENÇÃO: LOGOS, TIPOGRAFIA E PALETA DE CORES ESTÃO EM ANEXO) é essa: Game Stream — Identidade Visual

Conceito da marca

O Game Stream é uma plataforma de transmissão de tela em tempo real voltada principalmente para pequenos grupos de amigos.

Diferente de plataformas como Twitch, o objetivo não é criar uma rede pública de streamers, seguidores ou grandes audiências. A experiência gira em torno de salas privadas, onde alguém cria uma sala, compartilha um código ou link e os amigos entram para assistir à transmissão e conversar.

O conceito central da identidade é:

“Uma sala digital construída ao redor de uma tela compartilhada.”

A marca deve transmitir principalmente:

 proximidade;

 conexão;

 tecnologia;

 velocidade;

 simplicidade;

 diversão;

 privacidade;

 experiência compartilhada.

Posicionamento

O Game Stream não quer ser percebido como uma plataforma de “lives públicas”.

Ele deve parecer uma ferramenta criada para momentos como:

“Vou jogar, entra aí para assistir.”

“Vou compartilhar minha tela, entra na sala.”

“Manda o código que eu entro.”

Por isso, a comunicação prioriza conceitos como sala, amigos, compartilhar e assistir juntos, em vez de audiência, seguidores ou criadores.

Logo

A logo é formada pelo nome:

GAME STREAM

O símbolo representa a união de três conceitos principais:

Tela + transmissão + pessoas conectadas.

A moldura retangular representa uma tela ou janela de compartilhamento.

O símbolo de play no centro representa vídeo e transmissão.

As ondas no canto superior direito representam transmissão em tempo real.

As formas humanas na parte inferior representam os amigos conectados à mesma experiência.

Para versões menores, como favicon, ícone do aplicativo ou atalhos, pode ser utilizada uma versão simplificada contendo apenas:

tela + play + ondas de transmissão.

Isso evita excesso de detalhes em tamanhos pequenos.

Paleta de cores

Deep Space

#0B0F1A

Cor principal de fundo.

É um azul quase preto que cria a sensação de ambiente digital e imersivo sem utilizar preto absoluto.

Uso:

fundos, grandes áreas da interface, menus e telas de transmissão.

Electric Blue

#1E90FF

Representa tecnologia, conexão e interação.

Uso:

botões secundários, links, estados ativos, bordas, ícones e elementos interativos.

Neon Cyan

#00F0FF

É uma das principais cores de destaque da marca.

Representa velocidade, transmissão e conexão em tempo real.

Uso:

indicadores ativos, microfone, qualidade de conexão, bordas selecionadas e pequenos detalhes.

Vibrant Magenta

#FF2ED1

Representa energia, diversão e intensidade.

É utilizada principalmente em conjunto com o azul e ciano.

Uso:

CTAs importantes, elementos de transmissão e detalhes especiais.

Soft White

#E9ECF1

Branco levemente acinzentado utilizado para preservar conforto visual em telas escuras.

Uso:

títulos, textos principais e ícones.

Gradiente principal

Um dos elementos mais reconhecíveis da identidade é o gradiente:

Electric Blue → Purple → Vibrant Magenta

Exemplo:

#1E90FF → #7C3AED → #FF2ED1

Ele pode aparecer principalmente em:

Compartilhar tela

Criar sala

logo;

código da sala;

elementos selecionados;

bordas especiais;

estados de transmissão.

O gradiente não deve aparecer em todos os elementos. Ele funciona como cor de destaque da marca.

Tipografia

Títulos

Orbitron

Fonte geométrica e tecnológica utilizada principalmente na identidade e em títulos de impacto.

Exemplos:

GAME STREAM

SUA TELA. SUA SALA. SUA GALERA.

Deve ser utilizada com moderação para não comprometer a legibilidade da interface.

Interface e textos

Inter

Fonte principal do produto.

Utilizada para:

botões;

menus;

mensagens;

configurações;

listas de participantes;

descrições;

códigos;

textos de interface.

A Inter mantém a interface moderna, limpa e muito legível.

Linguagem visual

A interface utiliza predominantemente dark mode.

Os elementos possuem:

bordas finas;

cantos arredondados;

fundos azul-marinho;

pequenos efeitos de transparência;

sombras suaves;

brilhos neon discretos.

O neon deve aparecer principalmente para indicar interação ou atividade, e não apenas como decoração.

Por exemplo:

🟢 microfone detectando voz;

🔵 tela sendo compartilhada;

🟣 botão principal;

🔴 transmissão encerrada ou saída da sala.

Assim, a identidade continua gamer sem parecer uma interface exageradamente “cyberpunk”.

Formas

Um dos elementos gráficos recorrentes da marca são os quatro cantos de enquadramento presentes na logo.

Algo semelhante a:

┌            ┐

└            ┘

Eles representam a área da tela sendo capturada.

Esses cantos podem aparecer em:

código da sala;

avatares;

cards especiais;

tela de carregamento;

seleção de janela;

animações de conexão.

Isso cria um elemento visual próprio do Game Stream além da logo.

Código da sala

O código da sala pode se tornar um dos principais elementos de identidade do produto.

Exemplo:

GS-7K2P

Visualmente, ele pode aparecer dentro da moldura utilizada na logo:

┌                  ┐

      GS-7K2P

└                  ┘

com gradiente azul → roxo → magenta.

Isso transforma uma função do próprio aplicativo em parte da identidade visual.

Estilo dos ícones

Ícones simples e lineares.

Espessura consistente.

Preferencialmente arredondados.

Principais ícones:

microfone;

fone;

câmera;

monitor;

compartilhamento de tela;

chat;

participantes;

link;

configurações;

convite;

cadeado.

Ícones ativos podem receber ciano ou gradiente.

Ícones inativos permanecem em cinza azulado.

Componentes principais

Botão primário

Gradiente azul → magenta.

Exemplo:

Compartilhar tela

ou

Criar sala

Deve representar a ação principal da tela.

Botão secundário

Fundo escuro com borda azul/cinza.

Exemplo:

Entrar com código

Convidar amigo

Botões críticos

Vermelho ou rosa avermelhado.

Exemplo:

Sair da sala

Encerrar transmissão

Cards

Os cards utilizam:

fundo Deep Space;

borda fina azul-acinzentada;

cantos arredondados;

pequeno efeito de iluminação quando selecionados.

Exemplos:

salas recentes;

participantes;

configurações;

dispositivos de áudio;

qualidade da transmissão.

Fotografia e imagens

O Game Stream não precisa utilizar constantemente imagens de streamers.

Quando houver material promocional, o ideal é mostrar:

pessoas jogando juntas;

gameplay;

telas sendo compartilhadas;

grupos pequenos de amigos;

computadores e setups;

momentos de interação.

O foco deve ser sempre:

“Estamos vivendo isso juntos.”

e não:

“Uma pessoa está transmitindo para uma audiência.”

Tom da marca

A comunicação deve ser simples, informal e próxima.

Evitar linguagem excessivamente corporativa.

Em vez de:

Inicie uma transmissão para seus espectadores.

usar:

Compartilhe sua tela.

Em vez de:

Convide usuários para sua transmissão.

usar:

Chame seus amigos.

Em vez de:

Canal de transmissão.

usar:

Sala.

Vocabulário da marca

Priorizar:

Sala

Amigos

Compartilhar tela

Assistir juntos

Transmitindo

Entrar na sala

Código da sala

Link da sala

Convidar amigo

Host

Evitar como conceito principal:

“Streamer”

“Seguidores”

“Audiência”

“Canal”

“Views”

“Popular”

“Em alta”

“Descobrir streamers”

Slogan

O principal que surgiu para essa nova direção é:

Sua tela. Sua sala. Sua galera.

Ele explica os três pilares do produto:

Sua tela → transmissão.

Sua sala → ambiente privado.

Sua galera → experiência social.

Para comunicação internacional:

Your screen. Your room. Your people.

Também pode existir uma assinatura secundária mais tecnológica:

Stream together. Instantly.

Personalidade

Se o Game Stream fosse uma pessoa, seria alguém:

tecnológico, mas acessível; gamer, mas não infantil; moderno, mas não complicado; divertido, mas não exagerado.

A identidade deve passar a sensação de que abrir uma transmissão para os amigos é algo tão simples quanto mandar um link no grupo e dizer “entra aí”.

Essa, para mim, é a característica mais forte que diferencia visualmente e conceitualmente o Game Stream.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/af6e7773-8584-4b25-b3f2-e5738114f8d8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
