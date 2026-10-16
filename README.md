# Arena Viva by Baumann — redesign

Página HTML/CSS/JavaScript, desenhada para viewport de referência de 1920 × 1080 px e adaptada a tablet e celular. GSAP 3.15 e ScrollTrigger são carregados pelo CDN.

## Abrir

Abra `index.html` diretamente ou com um servidor local, como Live Server. Fonte Poppins e animações dependem de conexão com a internet. ScrollSmoother e SplitText não são necessários nesta página.

## Conteúdo

As sete seções seguem a ordem solicitada. Links de reserva, WhatsApp, Instagram e rota apontam para os destinos informados no projeto e nas fontes públicas. Depoimentos são trechos curtos de avaliações públicas, com link para a fonte. Solicitações de eventos corporativos são direcionadas ao WhatsApp; o serviço específico deve ser confirmado com a equipe antes da publicação.

Paleta: laranja e amarelo do logo local, grafite e areia. O Instagram não pôde ser aberto diretamente no ambiente de pesquisa; imagens e marca vieram da pasta original.

ScrollTrigger: conteúdo alterna entrada pela esquerda e direita, de opacidade 0 para 1, entre `start: top 90%` e `end: clamp(top 55%)`, com `scrub: true`. O hero entra após o pré-loader. Movimento é desativado para quem prefere redução de animações. O pré-loader usa a logo local e possui saída de reserva caso o JavaScript falhe.
