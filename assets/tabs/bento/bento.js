/**
 * Modulo oficial da aba Bento.
 * Carregado antes de assets/js/layout-lab.js.
 * O HTML/CSS base veio de 90_ARQUIVO_LOCAL/testes-e-prototipos/bento-grid-section.html.
 */

    const defaultBentoHtml = "<section class=\"ll-bento\" aria-labelledby=\"ll-bento-title\">\n      <header class=\"ll-bento__header\">\n        <p class=\"ll-bento__eyebrow\">Guia visual</p>\n        <h2 class=\"ll-bento__title\" id=\"ll-bento-title\">Tudo que importa em uma grade sÃ³.</h2>\n        <p class=\"ll-bento__lead\">Use a seÃ§Ã£o para destacar benefÃ­cios, usos, detalhes e provas rÃ¡pidas de um produto sem virar um bloco pesado de leitura.</p>\n      </header>\n\n      <div class=\"ll-bento__grid\">\n        <div class=\"ll-bento__expand ll-bento__expand--hero\">\n        <input class=\"ll-bento__lightbox-toggle\" type=\"checkbox\" id=\"ll-bento-hero-expand\" aria-label=\"Abrir imagem principal ampliada\">\n        <div class=\"ll-bento__lightbox\" aria-label=\"Imagem principal ampliada\">\n          <label class=\"ll-bento__lightbox-backdrop\" for=\"ll-bento-hero-expand\" aria-label=\"Fechar imagem principal ampliada\"></label>\n          <div class=\"ll-bento__lightbox-panel ll-bento__lightbox-panel--text\">\n            <picture class=\"ll-bento__lightbox-picture\">\n              <source media=\"(max-width: 560px)\" srcset=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=700x\">\n              <img src=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=1200x\" alt=\"Imagem principal ampliada do produto\">\n            </picture>\n            <label class=\"ll-bento__lightbox-clickzone\" for=\"ll-bento-hero-expand\" aria-label=\"Fechar imagem principal ampliada\"></label>\n            <div class=\"ll-bento__lightbox-overlay\" aria-hidden=\"true\">\n              <span class=\"ll-bento__chip\">Destaque</span>\n              <h2 class=\"ll-bento__card-title\">Escolha rÃ¡pida.</h2>\n              <p class=\"ll-bento__card-text\">Uma Ã¡rea maior para imagem forte, benefÃ­cio principal e leitura imediata.</p>\n            </div>\n            <label class=\"ll-bento__lightbox-close\" for=\"ll-bento-hero-expand\" aria-label=\"Fechar imagem principal ampliada\">Ã—</label>\n          </div>\n        </div>\n        <article class=\"ll-bento__card ll-bento__card--hero\">\n          <picture class=\"ll-bento__hero-picture\">\n            <source media=\"(max-width: 560px)\" srcset=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=700x\">\n            <img src=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=900x\" alt=\"Chinelo em destaque\">\n          </picture>\n          <div>\n            <span class=\"ll-bento__chip\">Destaque</span>\n            <h2 class=\"ll-bento__card-title\">Escolha rÃ¡pida.</h2>\n          </div>\n          <p class=\"ll-bento__card-text\">Uma Ã¡rea maior para imagem forte, benefÃ­cio principal e leitura imediata.</p>\n          <span class=\"ll-bento__media-action\" aria-hidden=\"true\">Ampliar</span>\n          <label class=\"ll-bento__image-button\" for=\"ll-bento-hero-expand\" aria-label=\"Ampliar imagem principal\"></label>\n        </article>\n        </div>\n\n        <article class=\"ll-bento__card ll-bento__card--wide\">\n          <div>\n            <span class=\"ll-bento__chip\">Resumo</span>\n            <strong class=\"ll-bento__stat\">3x</strong>\n            <h2 class=\"ll-bento__card-title\">Mais fÃ¡cil de comparar.</h2>\n          </div>\n          <p class=\"ll-bento__card-text\">Cards curtos funcionam bem para atributos tÃ©cnicos, diferenciais e decisÃµes rÃ¡pidas.</p>\n        </article>\n\n        <div class=\"ll-bento__expand ll-bento__expand--image\">\n        <input class=\"ll-bento__lightbox-toggle\" type=\"checkbox\" id=\"ll-bento-image-expand\" aria-label=\"Abrir imagem ampliada\">\n        <div class=\"ll-bento__lightbox\" aria-label=\"Imagem ampliada\">\n          <label class=\"ll-bento__lightbox-backdrop\" for=\"ll-bento-image-expand\" aria-label=\"Fechar imagem ampliada\"></label>\n          <div class=\"ll-bento__lightbox-panel\">\n            <picture class=\"ll-bento__lightbox-picture\">\n              <source media=\"(max-width: 560px)\" srcset=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=700x\">\n              <img src=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=1200x\" alt=\"Produto ampliado em destaque\">\n            </picture>\n            <label class=\"ll-bento__lightbox-clickzone\" for=\"ll-bento-image-expand\" aria-label=\"Fechar imagem ampliada\"></label>\n            <label class=\"ll-bento__lightbox-close\" for=\"ll-bento-image-expand\" aria-label=\"Fechar imagem ampliada\">Ã—</label>\n          </div>\n        </div>\n\n        <div class=\"ll-bento__card ll-bento__card--image\">\n          <picture>\n            <source media=\"(max-width: 560px)\" srcset=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=500x\">\n            <img class=\"ll-bento__card-media\" src=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=760x\" alt=\"Produto em destaque para compor o bloco visual\">\n          </picture>\n          <span class=\"ll-bento__media-action\" aria-hidden=\"true\">Ampliar</span>\n          <label class=\"ll-bento__image-button\" for=\"ll-bento-image-expand\" aria-label=\"Ampliar imagem\"></label>\n        </div>\n        </div>\n\n        <article class=\"ll-bento__card ll-bento__card--small ll-bento__card--use\">\n          <span class=\"ll-bento__chip\">Uso</span>\n          <div>\n            <h2 class=\"ll-bento__card-title\">Pronto para rotina.</h2>\n            <p class=\"ll-bento__card-text\">Texto curto para uma situaÃ§Ã£o real de uso.</p>\n          </div>\n        </article>\n\n        <article class=\"ll-bento__card ll-bento__card--small ll-bento__card--detail\">\n          <span class=\"ll-bento__chip\">Detalhe</span>\n          <div>\n            <h2 class=\"ll-bento__card-title\">Ponto de atenÃ§Ã£o.</h2>\n            <p class=\"ll-bento__card-text\">Ideal para medida, material, compatibilidade ou cuidado.</p>\n          </div>\n        </article>\n\n        <article class=\"ll-bento__card ll-bento__card--accent\">\n          <span class=\"ll-bento__chip\">Checklist</span>\n          <div>\n            <h2 class=\"ll-bento__card-title\">Antes de comprar.</h2>\n            <ul class=\"ll-bento__list\">\n              <li>Confirme o tamanho ou modelo indicado.</li>\n              <li>Compare a aplicaÃ§Ã£o com sua necessidade.</li>\n              <li>Veja o detalhe principal do produto.</li>\n            </ul>\n          </div>\n        </article>\n\n        <article class=\"ll-bento__card ll-bento__card--dark\">\n          <span class=\"ll-bento__chip\">Fechamento</span>\n          <div>\n            <h2 class=\"ll-bento__card-title\">InformaÃ§Ã£o com respiro.</h2>\n            <p class=\"ll-bento__card-text\">Um card final para reforÃ§ar benefÃ­cio, garantia, indicaÃ§Ã£o ou contexto de uso.</p>\n            <p class=\"ll-bento__footer-note\">SugestÃ£o: usar imagens horizontais entre 1200x800 e 1600x1000 para manter qualidade no desktop.</p>\n          </div>\n        </article>\n      </div>\n    </section>";
    const bentoStyle = "<style>\n.ll-bento {\n      --ll-bento-bg: #f5f7fb;\n      --ll-bento-ink: #101828;\n      --ll-bento-muted: #5f6c7b;\n      --ll-bento-card: #ffffff;\n      --ll-bento-line: #d9e2ec;\n      --ll-bento-accent: #ea5b0c;\n      --ll-bento-accent-soft: #fff1e8;\n      --ll-bento-deep: #13233a;\n      --ll-bento-radius: 22px;\n      --ll-bento-shadow: 0 8px 22px rgba(16, 24, 40, 0.08);\n    }\n\n    .ll-bento,\n    .ll-bento * {\n      box-sizing: border-box;\n    }\n\n    @keyframes ll-bento-rise {\n      from {\n        opacity: 0;\n        transform: translateY(14px);\n      }\n\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n\n.ll-bento {\n      width: 100%;\n      margin: 0 auto;\n      padding: clamp(18px, 3vw, 32px);\n      border-radius: calc(var(--ll-bento-radius) + 10px);\n      background: var(--ll-bento-bg);\n      font-family: Arial, Helvetica, sans-serif;\n    }\n\n    .ll-bento__header {\n      display: grid;\n      gap: 8px;\n      max-width: 760px;\n      margin: 0 0 18px;\n    }\n\n    .ll-bento__eyebrow {\n      margin: 0;\n      color: var(--ll-bento-accent);\n      font-size: 0.78rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n\n    .ll-bento__title {\n      margin: 0;\n      color: var(--ll-bento-ink);\n      font-size: clamp(1.8rem, 3.4vw, 3.8rem);\n      line-height: 0.95;\n      font-weight: 900;\n    }\n\n    .ll-bento__lead {\n      max-width: 60ch;\n      margin: 0;\n      color: var(--ll-bento-muted);\n      font-size: clamp(0.95rem, 1.2vw, 1.08rem);\n      line-height: 1.55;\n    }\n\n    .ll-bento__grid {\n      display: grid;\n      grid-template-columns: repeat(12, minmax(0, 1fr));\n      grid-auto-rows: minmax(150px, auto);\n      gap: 14px;\n      perspective: 1200px;\n    }\n\n    .ll-bento__card {\n      position: relative;\n      isolation: isolate;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      min-height: 190px;\n      padding: clamp(18px, 2vw, 26px);\n      overflow: hidden;\n      border: 1px solid var(--ll-bento-line);\n      border-radius: var(--ll-bento-radius);\n      background: var(--ll-bento-card);\n      box-shadow: 0 3px 10px rgba(16, 24, 40, 0.035);\n      transform: translateY(0) scale(1);\n      transform-origin: center;\n      transition:\n        transform 0.3s cubic-bezier(0.18, 0.9, 0.2, 1),\n        box-shadow 0.24s ease,\n        border-color 0.22s ease,\n        background-color 0.22s ease,\n        filter 0.24s ease;\n      animation: ll-bento-rise 0.42s ease both;\n      will-change: transform;\n    }\n\n    .ll-bento__card:nth-child(2) {\n      animation-delay: 0.04s;\n    }\n\n    .ll-bento__card:nth-child(3) {\n      animation-delay: 0.08s;\n    }\n\n    .ll-bento__card:nth-child(4) {\n      animation-delay: 0.12s;\n    }\n\n    .ll-bento__card:nth-child(5) {\n      animation-delay: 0.16s;\n    }\n\n    .ll-bento__card:nth-child(6) {\n      animation-delay: 0.2s;\n    }\n\n    .ll-bento__card:nth-child(7) {\n      animation-delay: 0.24s;\n    }\n\n    .ll-bento__card::before {\n      content: \"\";\n      position: absolute;\n      inset: 0;\n      z-index: -1;\n      border-radius: inherit;\n      opacity: 0;\n      background:\n        radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.2), transparent 34%),\n        linear-gradient(135deg, rgba(234, 91, 12, 0.08), transparent 46%);\n      transform: scale(0.98);\n      transition:\n        opacity 0.22s ease,\n        transform 0.22s ease;\n      pointer-events: none;\n    }\n\n    .ll-bento__card:hover {\n      z-index: 3;\n      border-color: rgba(234, 91, 12, 0.68);\n      box-shadow: 0 8px 18px rgba(16, 24, 40, 0.075);\n      transform: translateY(-12px) rotateX(2deg) rotateZ(-0.35deg) scale(1.026);\n    }\n\n    .ll-bento__card:hover::before {\n      opacity: 0.58;\n      transform: scale(1.025);\n    }\n\n    .ll-bento__card--hero:hover {\n      box-shadow: 0 10px 26px rgba(19, 35, 58, 0.15);\n      transform: translateY(-14px) rotateX(2deg) rotateZ(-0.28deg) scale(1.045);\n    }\n\n    .ll-bento__expand {\n      position: relative;\n      min-width: 0;\n    }\n\n    .ll-bento__expand--hero {\n      grid-column: span 7;\n      grid-row: span 2;\n      min-height: 460px;\n    }\n\n    .ll-bento__expand--hero .ll-bento__card--hero {\n      height: 100%;\n      min-height: 100%;\n    }\n\n    .ll-bento__expand--image {\n      grid-column: span 2;\n      align-self: center;\n      justify-self: center;\n      width: 100%;\n      aspect-ratio: 1 / 1;\n      border-radius: 100%;\n    }\n\n    .ll-bento__expand--image .ll-bento__card--image {\n      width: 100%;\n      height: 100%;\n    }\n\n    .ll-bento__card--hero {\n      min-height: 460px;\n      color: #ffffff;\n      background: var(--ll-bento-deep);\n      box-shadow: var(--ll-bento-shadow);\n      cursor: zoom-in;\n    }\n\n    .ll-bento__card--wide {\n      grid-column: span 5;\n      min-height: 220px;\n      background: var(--ll-bento-deep);\n      color: #ffffff;\n    }\n\n    .ll-bento__card--image {\n      align-self: center;\n      justify-self: center;\n      width: 100%;\n      min-height: 0;\n      padding: 0;\n      aspect-ratio: 1 / 1;\n      border-radius: 100%;\n      background: #dbeafe;\n      cursor: zoom-in;\n    }\n\n    .ll-bento__card--small {\n      grid-column: span 3;\n      min-height: 0;\n      aspect-ratio: 1 / 1;\n    }\n\n    .ll-bento__card--small:nth-of-type(4) {\n      display: grid;\n      place-items: center;\n      padding: 24px;\n      border-radius: var(--ll-bento-radius);\n      text-align: center;\n      background: #fff8f2;\n      border-color: rgba(234, 91, 12, 0.22);\n    }\n\n    .ll-bento__card--accent {\n      grid-column: span 4;\n      background: var(--ll-bento-accent-soft);\n      border-color: rgba(234, 91, 12, 0.22);\n    }\n\n    .ll-bento__card--dark {\n      grid-column: span 5;\n      background:\n        radial-gradient(circle at 88% 18%, rgba(234, 91, 12, 0.28), transparent 34%),\n        var(--ll-bento-deep);\n      color: #ffffff;\n    }\n\n    .ll-bento__card--image picture {\n      display: block;\n      width: 100%;\n      height: 100%;\n    }\n\n    .ll-bento__card-media {\n      width: 100%;\n      height: 100%;\n      min-height: 0;\n      object-fit: cover;\n      object-position: center;\n      display: block;\n      transform: scale(1);\n      transition:\n        transform 0.36s ease,\n        filter 0.36s ease;\n      will-change: transform;\n    }\n\n    .ll-bento__card--image:hover .ll-bento__card-media {\n      transform: scale(1.14) rotate(1.2deg);\n      filter: saturate(1.14) contrast(1.06);\n    }\n\n    .ll-bento__media-action {\n      position: absolute;\n      right: 14px;\n      bottom: 14px;\n      z-index: 2;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-height: 34px;\n      padding: 8px 12px;\n      border: 1px solid rgba(255, 255, 255, 0.46);\n      border-radius: 999px;\n      color: #ffffff;\n      background: rgba(19, 35, 58, 0.48);\n      backdrop-filter: blur(10px);\n      font-size: 0.78rem;\n      font-weight: 800;\n      opacity: 0;\n      transform: translateY(8px);\n      transition:\n        opacity 0.24s ease,\n        transform 0.24s ease,\n        background-color 0.24s ease;\n      pointer-events: none;\n    }\n\n    .ll-bento__card--image:hover .ll-bento__media-action,\n    .ll-bento__card--image:focus-within .ll-bento__media-action,\n    .ll-bento__card--hero:hover .ll-bento__media-action,\n    .ll-bento__card--hero:focus-within .ll-bento__media-action {\n      opacity: 1;\n      transform: translateY(0);\n    }\n\n    .ll-bento__card--image .ll-bento__media-action {\n      right: auto;\n      left: 50%;\n      bottom: 18px;\n      transform: translate(-50%, 8px);\n    }\n\n    .ll-bento__card--image:hover .ll-bento__media-action,\n    .ll-bento__card--image:focus-within .ll-bento__media-action {\n      transform: translate(-50%, 0);\n    }\n\n    .ll-bento__image-button {\n      position: absolute;\n      inset: 0;\n      z-index: 3;\n      display: block;\n      width: 100%;\n      height: 100%;\n      padding: 0;\n      border: 0;\n      border-radius: inherit;\n      background: transparent;\n      cursor: zoom-in;\n    }\n\n    .ll-bento__image-button:focus-visible {\n      outline: 3px solid rgba(234, 91, 12, 0.82);\n      outline-offset: -6px;\n    }\n\n    .ll-bento__lightbox-toggle {\n      /* The toggle stays out of flow so label focus never scrolls the page. */\n      position: fixed;\n      top: -9999px;\n      left: -9999px;\n      width: 1px;\n      height: 1px;\n      overflow: hidden;\n      clip: rect(0 0 0 0);\n      clip-path: inset(50%);\n      white-space: nowrap;\n    }\n\n    .ll-bento__lightbox {\n      position: fixed;\n      inset: 0;\n      z-index: 50;\n      display: grid;\n      place-items: center;\n      padding: clamp(18px, 4vw, 56px);\n      opacity: 0;\n      transform: scale(0.985);\n      pointer-events: none;\n      transition:\n        opacity 0.22s ease,\n        transform 0.22s ease;\n    }\n\n    .ll-bento__lightbox-toggle:checked ~ .ll-bento__lightbox {\n      opacity: 1;\n      transform: scale(1);\n      pointer-events: auto;\n    }\n\n    .ll-bento__lightbox-backdrop {\n      position: absolute;\n      inset: 0;\n      background: rgba(15, 23, 42, 0.74);\n      backdrop-filter: blur(12px);\n      cursor: zoom-out;\n    }\n\n    .ll-bento__lightbox-panel {\n      position: relative;\n      z-index: 1;\n      width: min(980px, 100%);\n      max-height: min(82vh, 760px);\n      margin: 0;\n      overflow: hidden;\n      border: 1px solid rgba(255, 255, 255, 0.24);\n      border-radius: 26px;\n      background: #ffffff;\n      box-shadow: 0 34px 90px rgba(0, 0, 0, 0.34);\n    }\n\n    .ll-bento__lightbox-panel img {\n      display: block;\n      width: 100%;\n      max-height: min(72vh, 680px);\n      object-fit: cover;\n      object-position: center;\n    }\n\n    .ll-bento__lightbox-clickzone {\n      position: absolute;\n      inset: 0;\n      z-index: 2;\n      cursor: zoom-out;\n    }\n\n    .ll-bento__lightbox-overlay {\n      position: absolute;\n      left: clamp(18px, 5vw, 56px);\n      right: clamp(18px, 5vw, 56px);\n      bottom: clamp(18px, 5vw, 48px);\n      z-index: 3;\n      display: grid;\n      gap: 10px;\n      max-width: min(520px, calc(100% - 36px));\n      padding: clamp(14px, 3vw, 26px);\n      border: 1px solid rgba(255, 255, 255, 0.16);\n      border-radius: 22px;\n      color: #ffffff;\n      background:\n        linear-gradient(90deg, rgba(8, 13, 23, 0.82) 0%, rgba(8, 13, 23, 0.6) 62%, rgba(8, 13, 23, 0.22) 100%);\n      backdrop-filter: blur(7px);\n      pointer-events: none;\n    }\n\n    .ll-bento__lightbox-overlay .ll-bento__chip {\n      color: #ffffff;\n      background: rgba(15, 23, 42, 0.42);\n      backdrop-filter: blur(8px);\n    }\n\n    .ll-bento__lightbox-overlay .ll-bento__card-title {\n      max-width: 9ch;\n      margin: 0;\n      font-size: clamp(2.2rem, 7vw, 5.8rem);\n      line-height: 0.92;\n      text-shadow: 0 4px 16px rgba(0, 0, 0, 0.42);\n    }\n\n    .ll-bento__lightbox-overlay .ll-bento__card-text {\n      max-width: 42ch;\n      color: rgba(255, 255, 255, 0.9);\n      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.42);\n    }\n\n    .ll-bento__lightbox-close {\n      position: absolute;\n      top: 14px;\n      right: 14px;\n      z-index: 4;\n      display: grid;\n      place-items: center;\n      width: 38px;\n      height: 38px;\n      border-radius: 999px;\n      color: #ffffff;\n      background: rgba(19, 35, 58, 0.72);\n      backdrop-filter: blur(10px);\n      font-size: 1.4rem;\n      font-weight: 800;\n      line-height: 1;\n      cursor: pointer;\n      transition:\n        transform 0.18s ease,\n        background-color 0.18s ease;\n    }\n\n    .ll-bento__lightbox-close:hover,\n    .ll-bento__lightbox-close:focus-visible {\n      background: rgba(234, 91, 12, 0.92);\n      transform: scale(1.06);\n    }\n\n    .ll-bento__chip {\n      align-self: flex-start;\n      display: inline-flex;\n      align-items: center;\n      min-height: 28px;\n      padding: 6px 10px;\n      border-radius: 999px;\n      color: var(--ll-bento-accent);\n      background: rgba(234, 91, 12, 0.12);\n      font-size: 0.76rem;\n      font-weight: 900;\n      letter-spacing: 0.02em;\n      text-transform: uppercase;\n      transform: translateY(0);\n      transition:\n        transform 0.24s ease,\n        background-color 0.24s ease,\n        color 0.24s ease;\n    }\n\n    .ll-bento__card--hero .ll-bento__chip,\n    .ll-bento__card--wide .ll-bento__chip,\n    .ll-bento__card--dark .ll-bento__chip {\n      color: #ffffff;\n      background: rgba(255, 255, 255, 0.12);\n      backdrop-filter: blur(8px);\n    }\n\n    .ll-bento__card:hover .ll-bento__chip {\n      transform: translateY(-4px) scale(1.04);\n      background: rgba(234, 91, 12, 0.16);\n    }\n\n    .ll-bento__card--hero:hover .ll-bento__chip,\n    .ll-bento__card--wide:hover .ll-bento__chip,\n    .ll-bento__card--dark:hover .ll-bento__chip {\n      background: rgba(255, 255, 255, 0.16);\n    }\n\n    .ll-bento__card-title {\n      max-width: 12ch;\n      margin: 16px 0 8px;\n      color: inherit;\n      font-size: clamp(1.25rem, 2vw, 2.5rem);\n      line-height: 0.98;\n      font-weight: 900;\n      transition: transform 0.24s ease;\n    }\n\n    .ll-bento__card:hover .ll-bento__card-title {\n      transform: translateY(-5px);\n    }\n\n    .ll-bento__card--hero .ll-bento__card-title {\n      max-width: 10ch;\n      font-size: clamp(2.4rem, 5vw, 5.4rem);\n      letter-spacing: -0.02em;\n    }\n\n    .ll-bento__card--wide .ll-bento__card-title,\n    .ll-bento__card--dark .ll-bento__card-title {\n      max-width: 13ch;\n    }\n\n    .ll-bento__card--small:nth-of-type(4) .ll-bento__chip {\n      align-self: center;\n    }\n\n    .ll-bento__card--small:nth-of-type(4) .ll-bento__card-title {\n      max-width: 8ch;\n      margin: 10px 0 0;\n    }\n\n    .ll-bento__card--small:nth-of-type(4) .ll-bento__card-text {\n      display: none;\n    }\n\n    .ll-bento__card-text {\n      max-width: 46ch;\n      margin: 0;\n      color: var(--ll-bento-muted);\n      font-size: 0.95rem;\n      line-height: 1.55;\n    }\n\n    .ll-bento__card--hero .ll-bento__card-text,\n    .ll-bento__card--wide .ll-bento__card-text,\n    .ll-bento__card--dark .ll-bento__card-text {\n      color: rgba(255, 255, 255, 0.82);\n    }\n\n    .ll-bento__stat {\n      display: block;\n      margin: 12px 0 4px;\n      color: inherit;\n      font-size: clamp(2.2rem, 4vw, 4rem);\n      line-height: 0.9;\n      font-weight: 950;\n    }\n\n    .ll-bento__list {\n      display: grid;\n      gap: 8px;\n      padding: 0;\n      margin: 14px 0 0;\n      list-style: none;\n    }\n\n    .ll-bento__list li {\n      display: flex;\n      gap: 8px;\n      align-items: flex-start;\n      color: var(--ll-bento-muted);\n      font-size: 0.94rem;\n      line-height: 1.35;\n      transform: translateX(0);\n      transition:\n        color 0.2s ease,\n        transform 0.2s ease;\n    }\n\n    .ll-bento__card:hover .ll-bento__list li {\n      color: #334155;\n    }\n\n    .ll-bento__card:hover .ll-bento__list li:nth-child(1) {\n      transform: translateX(5px);\n    }\n\n    .ll-bento__card:hover .ll-bento__list li:nth-child(2) {\n      transform: translateX(9px);\n    }\n\n    .ll-bento__card:hover .ll-bento__list li:nth-child(3) {\n      transform: translateX(13px);\n    }\n\n    .ll-bento__list li::before {\n      content: \"\";\n      flex: 0 0 auto;\n      width: 7px;\n      height: 7px;\n      margin-top: 7px;\n      border-radius: 999px;\n      background: var(--ll-bento-accent);\n    }\n\n    .ll-bento__footer-note {\n      margin-top: 14px;\n      color: var(--ll-bento-muted);\n      font-size: 0.82rem;\n      line-height: 1.45;\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .ll-bento__card,\n      .ll-bento__card::before,\n      .ll-bento__chip,\n      .ll-bento__card-title,\n      .ll-bento__card-media,\n      .ll-bento__list li,\n      .ll-bento__media-action,\n      .ll-bento__lightbox,\n      .ll-bento__lightbox-close {\n        animation: none;\n        transition: none;\n      }\n\n      .ll-bento__card:hover,\n      .ll-bento__card--hero:hover,\n      .ll-bento__card--image:hover .ll-bento__card-media,\n      .ll-bento__card:hover .ll-bento__chip,\n      .ll-bento__card:hover .ll-bento__card-title,\n      .ll-bento__card:hover .ll-bento__list li,\n      .ll-bento__card--image:hover .ll-bento__media-action,\n      .ll-bento__card--hero:hover .ll-bento__media-action,\n      .ll-bento__lightbox-toggle:checked ~ .ll-bento__lightbox,\n      .ll-bento__lightbox-close:hover {\n        transform: none;\n      }\n    }\n\n    @media (max-width: 900px) {\n\n.ll-bento {\n        padding: 16px;\n      }\n\n      .ll-bento__grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n        grid-template-areas:\n          \"hero hero\"\n          \"summary image\"\n          \"use detail\"\n          \"check close\";\n        grid-auto-rows: auto;\n        gap: clamp(8px, 1.6vw, 12px);\n      }\n\n      .ll-bento__card {\n        min-height: clamp(124px, 21vw, 180px);\n        padding: clamp(12px, 2vw, 20px);\n        border-radius: clamp(16px, 2.8vw, 24px);\n      }\n\n      .ll-bento__card--wide,\n      .ll-bento__expand--image,\n      .ll-bento__card--small,\n      .ll-bento__card--dark,\n      .ll-bento__card--accent {\n        grid-column: span 1;\n      }\n\n      .ll-bento__card--wide {\n        grid-area: summary;\n        min-height: clamp(132px, 22vw, 180px);\n      }\n\n      .ll-bento__expand--image {\n        grid-area: image;\n        width: min(100%, 220px);\n        min-height: 0;\n        aspect-ratio: 1 / 1;\n        border-radius: 100%;\n        align-self: center;\n        justify-self: center;\n      }\n\n      .ll-bento__card--image {\n        width: 100%;\n        height: 100%;\n        padding: 0;\n        aspect-ratio: 1 / 1;\n        border-radius: 100%;\n      }\n\n      .ll-bento__expand--hero {\n        grid-area: hero;\n        grid-column: 1 / -1;\n        min-height: clamp(260px, 48vw, 380px);\n      }\n\n      .ll-bento__card--hero {\n        min-height: 100%;\n      }\n\n      .ll-bento__card--small {\n        min-height: 0;\n        aspect-ratio: 1 / 1;\n      }\n\n      .ll-bento__card--use {\n        grid-area: use;\n      }\n\n      .ll-bento__card--detail {\n        grid-area: detail;\n      }\n\n      .ll-bento__card--accent {\n        grid-area: check;\n        min-height: clamp(140px, 22vw, 200px);\n      }\n\n      .ll-bento__card--dark {\n        grid-area: close;\n        min-height: clamp(140px, 22vw, 200px);\n      }\n    }\n\n    @media (max-width: 560px) {\n\n.ll-bento {\n        padding: 10px;\n        border-radius: 28px;\n        background: var(--ll-bento-bg);\n        box-shadow: none;\n      }\n\n      .ll-bento__header {\n        gap: 4px;\n        margin-bottom: 8px;\n        padding: 4px 2px 0;\n      }\n\n      .ll-bento__eyebrow {\n        color: var(--ll-bento-accent);\n        font-size: 0.62rem;\n      }\n\n      .ll-bento__title {\n        color: var(--ll-bento-ink);\n        font-size: clamp(1.28rem, 7vw, 1.9rem);\n        line-height: 1;\n      }\n\n      .ll-bento__lead {\n        color: var(--ll-bento-muted);\n        font-size: 0.72rem;\n        line-height: 1.35;\n        max-width: 34ch;\n      }\n\n      .ll-bento__grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n        grid-template-areas:\n          \"hero hero\"\n          \"summary image\"\n          \"use detail\"\n          \"check close\";\n        grid-auto-rows: auto;\n        gap: 7px;\n      }\n\n      .ll-bento__card {\n        min-height: 106px;\n        padding: 10px;\n        border: 1px solid var(--ll-bento-line);\n        border-radius: 16px;\n        box-shadow: 0 2px 8px rgba(16, 24, 40, 0.035);\n      }\n\n      .ll-bento__expand--hero {\n        grid-column: 1 / -1;\n      }\n\n      .ll-bento__card--wide,\n      .ll-bento__expand--image,\n      .ll-bento__card--small,\n      .ll-bento__card--accent,\n      .ll-bento__card--dark {\n        grid-column: span 1;\n      }\n\n      .ll-bento__card--wide {\n        grid-area: summary;\n        min-height: 104px;\n        color: #ffffff;\n        background: var(--ll-bento-deep);\n      }\n\n      .ll-bento__expand--image {\n        grid-area: image;\n        min-height: 0;\n        width: 100%;\n        aspect-ratio: 1 / 1;\n        border-radius: 100%;\n      }\n\n      .ll-bento__card--image {\n        padding: 0;\n        overflow: hidden;\n        width: 100%;\n        aspect-ratio: 1 / 1;\n        border-radius: 100%;\n        background: #dbeafe;\n      }\n\n      .ll-bento__expand--hero {\n        grid-area: hero;\n        min-height: 235px;\n      }\n\n      .ll-bento__card--hero {\n        min-height: 235px;\n        background: var(--ll-bento-deep);\n      }\n\n      .ll-bento__card--small {\n        min-height: 0;\n        aspect-ratio: 1 / 1;\n        color: var(--ll-bento-ink);\n        background: var(--ll-bento-card);\n      }\n\n      .ll-bento__card--use {\n        grid-area: use;\n      }\n\n      .ll-bento__card--detail {\n        grid-area: detail;\n        justify-content: center;\n        background: var(--ll-bento-card);\n      }\n\n      .ll-bento__card--detail {\n        display: grid;\n        place-items: center;\n        padding: 14px;\n        border-radius: 16px;\n        text-align: center;\n        background: #fff8f2;\n        border-color: rgba(234, 91, 12, 0.2);\n      }\n\n      .ll-bento__card--accent {\n        grid-area: check;\n        min-height: 116px;\n        color: var(--ll-bento-ink);\n        background: var(--ll-bento-accent-soft);\n      }\n\n      .ll-bento__card--dark {\n        grid-area: close;\n        min-height: 116px;\n        color: #ffffff;\n        background:\n          radial-gradient(circle at 88% 18%, rgba(234, 91, 12, 0.28), transparent 34%),\n          var(--ll-bento-deep);\n      }\n\n      .ll-bento__card--image picture {\n        display: block;\n        width: 100%;\n        height: 100%;\n      }\n\n      .ll-bento__card-media {\n        width: 100%;\n        height: 100%;\n        min-height: 0;\n        object-fit: cover;\n        object-position: center;\n      }\n\n      .ll-bento__card--hero .ll-bento__card-title {\n        max-width: 8ch;\n        font-size: clamp(2.25rem, 16vw, 4.5rem);\n        text-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);\n      }\n\n      .ll-bento__card-title {\n        max-width: 9ch;\n        margin: 8px 0 4px;\n        font-size: clamp(0.95rem, 4.8vw, 1.32rem);\n        line-height: 1;\n      }\n\n      .ll-bento__card--wide .ll-bento__card-title,\n      .ll-bento__card--accent .ll-bento__card-title,\n      .ll-bento__card--dark .ll-bento__card-title {\n        max-width: 13ch;\n      }\n\n      .ll-bento__card-text,\n      .ll-bento__list li,\n      .ll-bento__footer-note {\n        display: -webkit-box;\n        overflow: hidden;\n        color: currentColor;\n        opacity: 0.78;\n        font-size: 0.7rem;\n        line-height: 1.25;\n        -webkit-box-orient: vertical;\n        -webkit-line-clamp: 2;\n      }\n\n      .ll-bento__chip {\n        min-height: 21px;\n        padding: 4px 7px;\n        color: var(--ll-bento-accent);\n        background: rgba(234, 91, 12, 0.12);\n        font-size: 0.58rem;\n      }\n\n      .ll-bento__card--hero .ll-bento__chip,\n      .ll-bento__card--wide .ll-bento__chip,\n      .ll-bento__card--dark .ll-bento__chip {\n        color: #ffffff;\n        background: rgba(255, 255, 255, 0.18);\n      }\n\n      .ll-bento__stat {\n        margin: 6px 0 2px;\n        font-size: 1.72rem;\n      }\n\n      .ll-bento__list {\n        gap: 4px;\n        margin-top: 8px;\n      }\n\n      .ll-bento__list li:nth-child(n+3) {\n        display: none;\n      }\n\n      .ll-bento__media-action {\n        right: 8px;\n        bottom: 8px;\n        min-height: 28px;\n        padding: 6px 9px;\n        font-size: 0.66rem;\n        opacity: 1;\n        transform: none;\n      }\n\n      .ll-bento__card--image .ll-bento__media-action {\n        right: auto;\n        left: 50%;\n        bottom: 9px;\n        transform: translateX(-50%);\n      }\n\n      .ll-bento__card--detail .ll-bento__chip {\n        align-self: center;\n      }\n\n      .ll-bento__card--detail .ll-bento__card-title {\n        max-width: 8ch;\n        margin: 6px 0 0;\n      }\n\n      .ll-bento__card--detail .ll-bento__card-text {\n        display: none;\n      }\n    }\n</style>";

    function getDefaultBentoHtml() {
      return getTabHtmlAsset("bento", defaultBentoHtml).trim();
    }

    function getDefaultBentoBlocks() {
      return [
        createBentoBlock("hero"),
        {
          ...createBentoBlock("text"),
          label: "Resumo",
          stat: "3x",
          title: "Mais facil de comparar.",
          text: "Cards curtos funcionam bem para atributos tecnicos, diferenciais e decisoes rapidas.",
          variant: "wide"
        },
        {
          ...createBentoBlock("image"),
          shape: "rectangle"
        },
        {
          ...createBentoBlock("text"),
          label: "Uso",
          title: "Pronto para rotina.",
          text: "Texto curto para uma situacao real de uso.",
          variant: "small"
        },
        {
          ...createBentoBlock("image"),
          shape: "circle"
        },
        {
          ...createBentoBlock("text"),
          label: "Detalhe",
          title: "Ponto de atencao.",
          text: "Ideal para medida, material, compatibilidade ou cuidado.",
          variant: "small-center"
        }
      ];
    }

    const fixedBentoSlots = [
      { key: "hero", label: "Hero", type: "hero" },
      { key: "summary", label: "Resumo", type: "text", variant: "wide" },
      { key: "rectangle", label: "Imagem", type: "image", shape: "rectangle" },
      { key: "use", label: "Uso", type: "text", variant: "small" },
      { key: "circle", label: "Imagem circular", type: "image", shape: "circle" },
      { key: "detail", label: "Detalhe", type: "text", variant: "small-center" }
    ];

    function getFixedBentoBlocks(blocks = []) {
      const defaults = getDefaultBentoBlocks();
      const currentBlocks = Array.isArray(blocks) ? blocks.filter(Boolean) : [];

      // Preserva a edicao existente quando ela ja veio do modelo padrao.
      if (hasDefaultBentoComposition(currentBlocks)) {
        return defaults.map((fallback, index) => {
          const current = currentBlocks[index] || {};
          return normalizeBentoBlock({
            ...fallback,
            ...current,
            type: fallback.type,
            ...(fallback.type === "image" ? { shape: fallback.shape } : { variant: fallback.variant })
          });
        });
      }

      const available = [...currentBlocks];
      const take = (predicate) => {
        const index = available.findIndex(predicate);
        return index >= 0 ? available.splice(index, 1)[0] : null;
      };

      return defaults.map((fallback, index) => {
        const slot = fixedBentoSlots[index];
        let current = null;

        if (slot.type === "hero") {
          current = take((block) => block.type === "hero");
        } else if (slot.type === "image") {
          current = take((block) => block.type === "image" && (slot.shape === "circle" ? block.shape === "circle" : block.shape !== "circle"));
        } else if (slot.variant === "wide") {
          current = take((block) => block.type === "text" && block.variant === "wide");
        } else if (slot.variant === "small-center") {
          current = take((block) => block.type === "text" && block.variant === "small-center");
        } else {
          current = take((block) => block.type === "text" && block.variant !== "wide" && block.variant !== "small-center");
        }

        return normalizeBentoBlock({
          ...fallback,
          ...(current || {}),
          type: fallback.type,
          ...(fallback.type === "image" ? { shape: fallback.shape } : { variant: fallback.variant })
        });
      });
    }

    function ensureBentoState() {
      state.bento = state.bento || {};
      state.bento.header = state.bento.header || {
        eyebrow: "Guia visual",
        title: "Tudo que importa em uma grade so.",
        lead: "Use a secao para destacar beneficios, usos, detalhes e provas rapidas de um produto sem virar um bloco pesado de leitura."
      };

      if (/ll-bento__(?:card|expand)--table|ll-bento__table/i.test(state.bento.html || "")) {
        state.bento.html = "";
        state.bento.useCustomHtml = false;
      }

      if (!Array.isArray(state.bento.blocks) || !state.bento.blocks.length) {
        state.bento.blocks = getDefaultBentoBlocks();
      }

      state.bento.blocks = state.bento.blocks
        .filter((block) => block?.type !== "table")
        .map(normalizeBentoBlock);

      state.bento.blocks = getFixedBentoBlocks(state.bento.blocks);
    }

    function createBentoBlock(type = "text") {
      const imageUrl = "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=900x";
      const base = {
        type,
        label: "Texto",
        title: "Titulo curto.",
        text: "Texto curto para explicar o ponto principal.",
        stat: "",
        variant: "small"
      };

      if (type === "hero") {
        return {
          type: "hero",
          label: "Destaque",
          title: "Escolha rapida.",
          text: "Uma area maior para imagem forte, beneficio principal e leitura imediata.",
          image: imageUrl,
          alt: "Imagem principal ampliada do produto"
        };
      }

      if (type === "image") {
        return {
          type: "image",
          shape: "rectangle",
          image: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=760x",
          alt: "Produto em destaque para compor o bloco visual"
        };
      }

      return base;
    }

    function normalizeBentoBlock(block) {
      const type = ["hero", "text", "image"].includes(block?.type) ? block.type : "text";
      const normalized = { ...createBentoBlock(type), ...(block || {}), type };
      // Spans responsivos so existem depois de um resize feito pela pessoa.
      // Sem isso, a grade deve preservar o arranjo padrao do layout.
      if (!normalized.resizeEdited) {
        delete normalized.responsiveSpan;
      }
      return normalized;
    }

    function countBentoBlocks(type) {
      ensureBentoState();
      return state.bento.blocks.filter((block) => block.type === type).length;
    }

    function canUseBentoBlockType(type, index = -1) {
      ensureBentoState();
      if (!["hero", "text", "image"].includes(type)) return false;
      const blocks = state.bento.blocks;
      const count = blocks.filter((block, blockIndex) => block.type === type && blockIndex !== index).length;

      if (type === "hero" && count >= 1) return false;
      if (type === "text" && count >= 5) return false;
      if (type === "image" && count >= 2) return false;

      return true;
    }

    function findBentoInsertIndex(type) {
      return state.bento.blocks.length;
    }

    function setBentoStatus(message) {
      state.bento.status = message || "";
    }

    function resetBentoCustomHtml() {
      state.bento.html = "";
      state.bento.useCustomHtml = false;
    }

    function createBentoUndoSnapshot() {
      return JSON.parse(JSON.stringify({
        header: state.bento.header,
        blocks: state.bento.blocks,
        html: state.bento.html || "",
        useCustomHtml: Boolean(state.bento.useCustomHtml)
      }));
    }

    function recordBentoUndo(options = {}) {
      ensureBentoState();
      const merge = Boolean(options.merge);
      const stack = Array.isArray(state.bento.undoStack) ? state.bento.undoStack : [];

      if (!merge || !state.bento.undoBatchOpen) {
        stack.push(createBentoUndoSnapshot());
        if (stack.length > 40) {
          stack.shift();
        }
      }

      state.bento.undoStack = stack;
      window.clearTimeout(state.bento.undoBatchTimer);
      state.bento.undoBatchOpen = merge;

      if (merge) {
        state.bento.undoBatchTimer = window.setTimeout(() => {
          state.bento.undoBatchOpen = false;
        }, 700);
      }
    }

    function undoBentoChange() {
      ensureBentoState();
      const stack = Array.isArray(state.bento.undoStack) ? state.bento.undoStack : [];
      const snapshot = stack.pop();

      if (!snapshot) {
        return false;
      }

      window.clearTimeout(state.bento.undoBatchTimer);
      state.bento.undoBatchOpen = false;
      state.bento.header = snapshot.header || state.bento.header;
      state.bento.blocks = Array.isArray(snapshot.blocks)
        ? snapshot.blocks.map(normalizeBentoBlock)
        : getDefaultBentoBlocks();
      state.bento.html = snapshot.html || "";
      state.bento.useCustomHtml = Boolean(snapshot.useCustomHtml);
      setBentoStatus("Alteracao desfeita.");
      renderEditor(true);
      return true;
    }

    function addBentoBlock(type, options = {}) {
      ensureBentoState();
      setBentoStatus("A estrutura do Bento e fixa: edite os seis blocos existentes.");
      renderEditor(true);
    }

    function removeBentoBlock(index) {
      ensureBentoState();
      setBentoStatus("A estrutura do Bento e fixa: nenhum dos seis blocos pode ser removido.");
      renderEditor(true);
    }

    function removeBentoBlockType(type) {
      ensureBentoState();
      const index = state.bento.blocks.map((block) => block.type).lastIndexOf(type);
      if (index < 0) {
        setBentoStatus("Nao existe bloco desse tipo para remover.");
        renderEditor(true);
        return;
      }

      removeBentoBlock(index);
    }

    function changeBentoBlockType(index, type) {
      ensureBentoState();
      setBentoStatus("O tipo de cada bloco faz parte da estrutura fixa do Bento.");
      renderEditor(true);
    }

    function getBentoLimitMessage(type) {
      if (type === "hero") return "A secao Bento so pode ter um bloco HERO.";
      if (type === "text") return "A secao Bento pode ter no maximo 5 blocos de texto.";
      if (type === "image") return "A secao Bento pode ter ate 2 imagens.";
      return "Limite de bloco atingido.";
    }

    function updateBentoBlockField(target) {
      ensureBentoState();
      const field = target.dataset.bentoField;
      const blockIndex = Number(target.dataset.bentoBlock);
      const block = state.bento.blocks[blockIndex];

      if (field?.startsWith("header.")) {
        const headerField = field.replace("header.", "");
        if (state.bento.header[headerField] === target.value) {
          return true;
        }
        recordBentoUndo({ merge: true });
        state.bento.header[headerField] = target.value;
        resetBentoCustomHtml();
        setBentoStatus("");
        updateOutput();
        return true;
      }

      if (!block) {
        return false;
      }

      if (field === "type") {
        changeBentoBlockType(blockIndex, target.value);
        return true;
      }

      const nextValue = field === "open" ? target.checked : target.value;
      const currentValue = field === "open" ? Boolean(block.open) : String(block[field] ?? "");
      if (String(currentValue) === String(nextValue)) {
        return true;
      }

      recordBentoUndo({ merge: true });
      if (field === "open") {
        block.open = nextValue;
      } else {
        block[field] = nextValue;
      }

      resetBentoCustomHtml();
      setBentoStatus("");
      updateOutput();
      return true;
    }

    function escapeBentoAttr(value) {
      return escapeHtml(String(value || ""));
    }

    function getBentoBlockClass(block) {
      if (block.variant === "wide") return "ll-bento__card--wide";
      if (block.variant === "accent") return "ll-bento__card--accent";
      if (block.variant === "dark") return "ll-bento__card--dark";
      if (block.variant === "small-center") return "ll-bento__card--small ll-bento__card--detail";
      return "ll-bento__card--small ll-bento__card--use";
    }

    function getBentoResponsiveSpanClass(block) {
      return Number(block?.responsiveSpan) === 2 ? "ll-bento__responsive-span-2" : "";
    }

    function getBentoResizeMinimumWidth(block) {
      if (block?.type === "image" && block?.shape === "circle") return 120;
      if (block?.type === "image") return 160;
      return 180;
    }

    function hasUsableBentoResizeWidth(block) {
      const width = normalizeBentoResizeValue(block?.resizeWidth);
      return Boolean(block?.resizeEdited && width && width >= getBentoResizeMinimumWidth(block));
    }

    function hasUsableBentoResizeHeight(block) {
      const height = normalizeBentoResizeValue(block?.resizeHeight);
      return Boolean(block?.resizeEdited && height && height >= 110);
    }

    function hasDefaultBentoComposition(blocks) {
      // The six-card starter composition is a named-grid preset. Keeping it
      // independent of legacy editor dimensions prevents stale inline widths
      // from collapsing the entire layout into narrow columns.
      if (!Array.isArray(blocks) || blocks.length !== 6) {
        return false;
      }

      const [hero, summary, rectangle, use, circle, detail] = blocks;
      return hero?.type === "hero"
        && summary?.type === "text"
        && rectangle?.type === "image"
        && use?.type === "text"
        && circle?.type === "image"
        && detail?.type === "text";
    }

    function normalizeBentoResizeValue(value) {
      const numericValue = Number(value);
      return Number.isFinite(numericValue) && numericValue > 0
        ? Math.round(numericValue)
        : "";
    }

    function getBentoResizeStyle(block, includeEditorSizing = false) {
      if (!includeEditorSizing || !block.resizeEdited) {
        return "";
      }

      const width = normalizeBentoResizeValue(block.resizeWidth);
      const height = normalizeBentoResizeValue(block.resizeHeight);
      const styles = [];

      if (width && hasUsableBentoResizeWidth(block)) {
        styles.push(`width: ${width}px`);
        styles.push(`--ll-bento-editor-width: ${width}px`);
        if (block.type === "image" && block.shape === "circle") {
          styles.push(`--ll-bento-editor-height: ${width}px`);
        }
      }

      if (height && hasUsableBentoResizeHeight(block) && (block.type !== "image" || block.shape !== "circle")) {
        styles.push(`height: ${height}px`);
        styles.push(`--ll-bento-editor-height: ${height}px`);
      }

      return styles.length ? ` style="${styles.join("; ")}"` : "";
    }

    function renderBentoPicture(image, alt, className = "") {
      const classAttribute = className ? ` class="${className}"` : "";
      return `<picture${classAttribute}>
        <source media="(max-width: 560px)" srcset="${image}">
        <img src="${image}" alt="${alt}">
      </picture>`;
    }

    function renderBentoHeroBlock(block, index) {
      const id = `ll-bento-hero-${index}`;
      const image = escapeBentoAttr(normalizeAssetUrl(block.image));
      const alt = escapeBentoAttr(block.alt);
      return `<div class="ll-bento__expand ll-bento__expand--hero">
        <input class="ll-bento__lightbox-toggle" type="checkbox" id="${id}" aria-label="Abrir imagem principal ampliada">
        <div class="ll-bento__lightbox" aria-label="Imagem principal ampliada">
          <label class="ll-bento__lightbox-backdrop" for="${id}" aria-label="Fechar imagem principal ampliada"></label>
          <div class="ll-bento__lightbox-panel ll-bento__lightbox-panel--text">
            ${renderBentoPicture(image, alt, "ll-bento__lightbox-picture")}
            <label class="ll-bento__lightbox-clickzone" for="${id}" aria-label="Fechar imagem principal ampliada"></label>
            <div class="ll-bento__lightbox-overlay" aria-hidden="true">
              <span class="ll-bento__chip">${escapeHtml(block.label)}</span>
              <h2 class="ll-bento__card-title">${escapeHtml(block.title)}</h2>
              <p class="ll-bento__card-text">${escapeHtml(block.text)}</p>
            </div>
            <label class="ll-bento__lightbox-close" for="${id}" aria-label="Fechar imagem principal ampliada">x</label>
          </div>
        </div>
        <article class="ll-bento__card ll-bento__card--hero">
          ${renderBentoPicture(image, alt, "ll-bento__hero-picture")}
          <div>
            <span class="ll-bento__chip">${escapeHtml(block.label)}</span>
            <h2 class="ll-bento__card-title">${escapeHtml(block.title)}</h2>
          </div>
          <p class="ll-bento__card-text">${escapeHtml(block.text)}</p>
          <span class="ll-bento__media-action" aria-hidden="true">Ampliar</span>
          <label class="ll-bento__image-button" for="${id}" aria-label="Ampliar imagem principal"></label>
        </article>
      </div>`;
    }

    function renderBentoTextBlock(block, includeEditorSizing) {
      const stat = block.stat ? `<strong class="ll-bento__stat">${escapeHtml(block.stat)}</strong>` : "";
      const text = block.text ? `<p class="ll-bento__card-text">${escapeHtml(block.text)}</p>` : "";
      return `<article class="ll-bento__card ll-bento__card--text ${getBentoBlockClass(block)} ${getBentoResponsiveSpanClass(block)}"${getBentoResizeStyle(block, includeEditorSizing)}>
        <span class="ll-bento__chip">${escapeHtml(block.label)}</span>
        <div>
          ${stat}
          <h2 class="ll-bento__card-title">${escapeHtml(block.title)}</h2>
          ${text}
        </div>
      </article>`;
    }

    function renderBentoImageBlock(block, index, includeEditorSizing) {
      const id = `ll-bento-image-${index}`;
      const image = escapeBentoAttr(normalizeAssetUrl(block.image));
      const shapeClass = block.shape === "circle"
        ? "ll-bento__expand--image-circle"
        : "ll-bento__expand--image-square ll-bento__expand--image-rectangle";
      return `<div class="ll-bento__expand ll-bento__expand--image ${shapeClass} ${getBentoResponsiveSpanClass(block)}"${getBentoResizeStyle(block, includeEditorSizing)}>
        <input class="ll-bento__lightbox-toggle" type="checkbox" id="${id}" aria-label="Abrir imagem ampliada">
        <div class="ll-bento__lightbox" aria-label="Imagem ampliada">
          <label class="ll-bento__lightbox-backdrop" for="${id}" aria-label="Fechar imagem ampliada"></label>
          <div class="ll-bento__lightbox-panel">
            ${renderBentoPicture(image, escapeBentoAttr(block.alt), "ll-bento__lightbox-picture")}
            <label class="ll-bento__lightbox-clickzone" for="${id}" aria-label="Fechar imagem ampliada"></label>
            <label class="ll-bento__lightbox-close" for="${id}" aria-label="Fechar imagem ampliada">x</label>
          </div>
        </div>
        <div class="ll-bento__card ll-bento__card--image ll-bento__card--image-square">
          <picture>
            <source media="(max-width: 560px)" srcset="${image}">
            <img class="ll-bento__card-media" src="${image}" alt="${escapeBentoAttr(block.alt)}">
          </picture>
          <span class="ll-bento__media-action" aria-hidden="true">Ampliar</span>
          <label class="ll-bento__image-button" for="${id}" aria-label="Ampliar imagem"></label>
        </div>
      </div>`;
    }

    function renderBentoBlockHtml(block, index, includeEditorSizing) {
      if (block.type === "hero") return renderBentoHeroBlock(block, index);
      if (block.type === "image") return renderBentoImageBlock(block, index, includeEditorSizing);
      return renderBentoTextBlock(block, includeEditorSizing);
    }

    function buildBentoRuntimePatch() {
      return `<style>
.ll-bento,
.ll-bento * {
  min-width: 0;
}

.ll-bento__grid {
  align-items: stretch;
  width: 100%;
  gap: 1rem;
  grid-auto-flow: row dense;
}

.ll-bento__expand--table {
  grid-column: span 9;
  align-self: stretch;
  min-height: clamp(170px, 16vw, 230px);
}

.ll-bento__card--table {
  display: grid;
  width: 100%;
  height: 100%;
  min-height: 100%;
}

.ll-bento__card--text {
  align-self: start;
  justify-self: start;
  resize: none;
  overflow: auto;
  min-width: min(100%, 170px);
  min-height: 150px;
  max-width: var(--ll-bento-resize-max-width, 100%);
  max-height: var(--ll-bento-resize-max-height, 560px);
}

.ll-bento__resize-handle {
  position: absolute;
  z-index: 9;
  display: block;
  opacity: 0;
  touch-action: none;
  transition: opacity 0.16s ease, background-color 0.16s ease;
}

.ll-bento__card--text:hover .ll-bento__resize-handle,
.ll-bento__card--text:focus-within .ll-bento__resize-handle {
  opacity: 1;
}

.ll-bento__resize-handle--vertical {
  left: 50%;
  bottom: 3px;
  width: 52px;
  height: 11px;
  transform: translateX(-50%);
  cursor: ns-resize;
  opacity: 0.58;
}

.ll-bento__resize-handle--vertical::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 7px;
  right: 7px;
  height: 3px;
  border-radius: 999px;
  background: rgba(234, 91, 12, 0.88);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.18);
}

.ll-bento__resize-handle--horizontal {
  top: 50%;
  right: 3px;
  width: 11px;
  height: 52px;
  transform: translateY(-50%);
  cursor: ew-resize;
}

.ll-bento__resize-handle--horizontal::before {
  content: "";
  position: absolute;
  top: 7px;
  bottom: 7px;
  left: 4px;
  width: 3px;
  border-radius: 999px;
  background: rgba(234, 91, 12, 0.88);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.18);
}

.ll-bento__resize-handle--both {
  right: 3px;
  bottom: 3px;
  width: 12px;
  height: 12px;
  border-right: 2px solid rgba(234, 91, 12, 0.94);
  border-bottom: 2px solid rgba(234, 91, 12, 0.94);
  border-radius: 0 0 3px 0;
  cursor: nwse-resize;
}

.ll-bento__expand--image-circle .ll-bento__resize-handle--circle {
  position: absolute;
  left: 50%;
  bottom: 7px;
  z-index: 24;
  width: 42px;
  height: 12px;
  transform: translateX(-50%);
  cursor: nwse-resize;
  opacity: 0;
  pointer-events: auto;
  touch-action: none;
}

.ll-bento__expand--image-circle:hover .ll-bento__resize-handle--circle,
.ll-bento__expand--image-circle:focus-within .ll-bento__resize-handle--circle {
  opacity: 1;
}

.ll-bento__expand--image-circle .ll-bento__resize-handle--circle::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 6px;
  right: 6px;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.44);
}

.ll-bento__card--text:hover,
.ll-bento__card--text:focus-within {
  z-index: 6;
}

.ll-bento__expand--image-square {
  grid-column: span 3;
  align-self: start;
  justify-self: start;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: var(--ll-bento-radius);
  resize: horizontal;
  overflow: hidden;
  min-width: min(100%, 150px);
  min-height: 0;
  max-width: var(--ll-bento-resize-max-width, 100%);
  max-height: var(--ll-bento-resize-max-height, 560px);
}

.ll-bento__expand--image-square:hover,
.ll-bento__expand--image-square:focus-within {
  z-index: 6;
}

.ll-bento__expand--image-square:hover .ll-bento__resize-handle,
.ll-bento__expand--image-square:focus-within .ll-bento__resize-handle {
  opacity: 1;
}

.ll-bento__expand--image-square::after {
  content: "";
  position: absolute;
  right: 6px;
  bottom: 6px;
  z-index: 5;
  width: 11px;
  height: 11px;
  border-right: 2px solid rgba(255, 255, 255, 0.84);
  border-bottom: 2px solid rgba(255, 255, 255, 0.84);
  border-radius: 0 0 4px 0;
  opacity: 0.88;
  pointer-events: none;
}

.ll-bento__expand--image-square .ll-bento__card--image {
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 0;
  aspect-ratio: auto;
  border-radius: inherit;
}

.ll-bento__expand--image-square .ll-bento__image-button {
  right: 18px;
  bottom: 18px;
}

.ll-bento__expand--image-rectangle {
  aspect-ratio: 4 / 3;
  min-height: 130px;
  resize: both;
}

.ll-bento__expand--image-circle {
  grid-column: span 3;
  align-self: start;
  justify-self: start;
  width: 100%;
  height: var(--ll-bento-circle-size, auto) !important;
  aspect-ratio: 1 / 1;
  border-radius: 0;
  resize: none;
  overflow: visible;
  min-width: min(100%, 150px);
  min-height: 0;
  max-width: var(--ll-bento-resize-max-width, 100%);
  max-height: var(--ll-bento-resize-max-height, 560px);
}

.ll-bento__expand--image-circle:hover,
.ll-bento__expand--image-circle:focus-within {
  z-index: 6;
}

.ll-bento__expand--image-circle > .ll-bento__card--image {
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 0;
  aspect-ratio: auto;
  overflow: hidden;
  border-radius: 50%;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
}

.ll-bento__expand--image-circle > .ll-bento__card--image > picture,
.ll-bento__expand--image-circle > .ll-bento__card--image .ll-bento__card-media {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 50%;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
  object-fit: cover;
}

.ll-bento__expand--image-circle .ll-bento__image-button {
  right: 18px;
  bottom: 34px;
}

@media (max-width: 900px) {
  /* O empacotamento livre so e ativado depois de um resize responsivo real.
     Ao abrir o Bento, as areas nomeadas preservam a composicao padrao. */
  .ll-bento[data-ll-bento-fluid-editor="true"] .ll-bento__grid {
    grid-template-areas: none !important;
    grid-auto-flow: row dense;
  }

  .ll-bento[data-ll-bento-fluid-editor="true"] .ll-bento__expand--hero {
    grid-area: auto !important;
    grid-column: 1 / -1 !important;
    order: -1;
  }

  .ll-bento[data-ll-bento-fluid-editor="true"] .ll-bento__card--text,
  .ll-bento[data-ll-bento-fluid-editor="true"] .ll-bento__expand--image {
    grid-area: auto !important;
  }

  .ll-bento__card--text[data-ll-bento-resize-ready],
  .ll-bento__expand--image[data-ll-bento-resize-ready] {
    grid-column: span var(--ll-bento-editor-span, 1) !important;
    width: 100% !important;
    height: var(--ll-bento-editor-height, auto) !important;
    max-width: 100% !important;
    max-height: none !important;
    resize: none;
  }

  .ll-bento__expand--image-square[data-ll-bento-resize-ready] {
    border-radius: clamp(16px, 2.8vw, 24px);
    align-self: start;
    justify-self: stretch;
  }

  .ll-bento__expand--image-circle[data-ll-bento-resize-ready] {
    grid-column: span 1 !important;
    grid-row: auto !important;
    width: var(--ll-bento-editor-width, min(100%, 220px)) !important;
    height: var(--ll-bento-editor-height, var(--ll-bento-circle-size, min(100%, 220px))) !important;
    min-width: 0 !important;
    max-width: 100% !important;
    max-height: none !important;
    aspect-ratio: 1 / 1 !important;
    border-radius: 100%;
    align-self: center;
    justify-self: center;
    resize: none;
  }

  .ll-bento__resize-handle,
  .ll-bento__expand--image-circle .ll-bento__resize-handle--circle {
    opacity: 0.82;
  }
}

@media (max-width: 560px) {
  .ll-bento__expand--image-square[data-ll-bento-resize-ready] {
    border-radius: 16px;
  }

  .ll-bento__expand--image-circle[data-ll-bento-resize-ready] {
    grid-column: span var(--ll-bento-editor-span, 1) !important;
    width: min(100%, var(--ll-bento-editor-width, 170px)) !important;
    height: var(--ll-bento-editor-height, var(--ll-bento-circle-size, min(100%, 170px))) !important;
    border-radius: 100%;
  }
}

.ll-bento__editor-add {
  position: absolute;
  z-index: 8;
  display: grid;
  grid-column: span 3;
  place-items: center;
  min-height: 150px;
  border: 1px dashed rgba(234, 91, 12, 0.52);
  border-radius: var(--ll-bento-radius);
  background: rgba(255, 255, 255, 0.52);
}

.ll-bento__editor-add__trigger {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  color: #ffffff;
  background: var(--ll-bento-accent);
  font: 800 1.3rem/1 Arial, Helvetica, sans-serif;
  cursor: pointer;
  box-shadow: 0 5px 12px rgba(234, 91, 12, 0.22);
}

.ll-bento__editor-add__menu {
  position: absolute;
  z-index: 20;
  top: 50%;
  left: 50%;
  display: none;
  gap: 6px;
  padding: 7px;
  border: 1px solid rgba(16, 24, 40, 0.16);
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 26px rgba(16, 24, 40, 0.16);
  transform: translate(-50%, -50%);
}

.ll-bento__editor-add.is-open .ll-bento__editor-add__menu {
  display: flex;
}

.ll-bento__editor-add__menu button {
  min-height: 30px;
  padding: 0 10px;
  border: 1px solid var(--ll-bento-line);
  border-radius: 8px;
  color: var(--ll-bento-ink);
  background: #ffffff;
  font: 800 0.74rem/1 Arial, Helvetica, sans-serif;
  cursor: pointer;
}

.ll-bento__editor-add__menu button:hover,
.ll-bento__editor-add__menu button:focus-visible {
  border-color: var(--ll-bento-accent);
  color: var(--ll-bento-accent);
  outline: 0;
}

@media (max-width: 900px) {
  .ll-bento__editor-add {
    grid-column: span 1;
    min-height: 124px;
    border-radius: clamp(16px, 2.8vw, 24px);
  }
}

@media (max-width: 560px) {
  .ll-bento__editor-add {
    min-height: 106px;
    border-radius: 16px;
  }
}

.ll-bento__card--table-beside {
  grid-column: 4 / -1;
}

.ll-bento__card--table:not([open]) {
  display: grid;
  width: 100%;
  height: 100%;
}

.ll-bento__card--table[open] {
  grid-column: 1 / -1;
  min-height: 0;
}

.ll-bento__card--table .table-container-custom {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: clamp(12px, 2vw, 18px);
  overflow-x: auto;
  border-radius: 0;
  box-shadow: none;
}

.ll-bento__card--table .table-design-custom {
  min-width: 520px;
  table-layout: fixed;
}

.ll-bento__card--table .table-text-custom {
  white-space: normal;
  overflow-wrap: break-word;
  word-break: normal;
}

.ll-bento__table-summary {
  position: relative;
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  align-items: stretch;
  align-content: stretch;
  gap: clamp(10px, 1.2vw, 14px);
  width: 100%;
  inline-size: 100%;
  height: 100%;
  min-height: 100%;
  padding: clamp(16px, 2vw, 22px);
}

.ll-bento__table-summary::marker {
  content: "";
}

.ll-bento__table-summary::before {
  content: "+";
  position: static;
  grid-column: 1;
  grid-row: 1 / span 2;
  align-self: center;
  justify-self: center;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  color: #ffffff;
  background: var(--ll-bento-accent);
  font-weight: 900;
  line-height: 1;
}

.ll-bento__card--table[open] .ll-bento__table-summary::before {
  content: "-";
}

.ll-bento__table-heading {
  display: grid;
  grid-column: 2;
  grid-row: 1;
  align-content: center;
  justify-items: start;
  gap: 8px;
  min-width: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.ll-bento__table-summary strong {
  text-align: left;
}

.ll-bento__table-preview {
  display: grid;
  grid-column: 1 / -1;
  grid-row: 2;
  grid-auto-rows: minmax(42px, 1fr);
  gap: 7px;
  align-content: stretch;
  align-items: stretch;
  justify-self: stretch;
  width: 100%;
  height: 100%;
  min-height: 0;
  margin-top: 2px;
}

.ll-bento__table-preview-head,
.ll-bento__table-preview-row {
  display: grid;
  grid-template-columns: minmax(110px, 0.18fr) minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 0;
  padding: 8px 12px;
  border: 1px solid rgba(217, 226, 236, 0.9);
  border-radius: 12px;
  background: rgba(245, 247, 251, 0.78);
}

.ll-bento__table-preview-head {
  min-height: 38px;
  color: #ffffff;
  background: var(--ll-bento-accent);
  border-color: transparent;
}

.ll-bento__table-preview-row {
  min-height: 42px;
}

.ll-bento__table-preview-head span,
.ll-bento__table-preview-row span {
  color: var(--ll-bento-accent);
  font-size: 0.76rem;
  font-weight: 900;
}

.ll-bento__table-preview-head span,
.ll-bento__table-preview-head strong {
  color: #ffffff;
}

.ll-bento__table-preview-head strong,
.ll-bento__table-preview-row strong {
  overflow: hidden;
  color: var(--ll-bento-ink);
  font-size: 0.86rem;
  font-weight: 800;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ll-bento__table-preview-head strong {
  color: #ffffff;
}

.ll-bento__card--table[open] .ll-bento__table-summary {
  grid-template-columns: 24px 1fr;
  grid-template-rows: auto;
  min-height: 0;
}

.ll-bento__card--table[open] .ll-bento__table-preview {
  display: none;
}

@media (min-width: 901px) {
  .ll-bento__card--table:not([open]) .ll-bento__table-summary {
    grid-template-columns: 30px minmax(190px, 0.28fr) minmax(360px, 1fr);
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
  }

  .ll-bento__card--table:not([open]) .ll-bento__table-summary::before {
    grid-column: 1;
    grid-row: 1;
  }

  .ll-bento__card--table:not([open]) .ll-bento__table-heading {
    grid-column: 2;
    grid-row: 1;
    align-self: center;
    padding-right: 12px;
  }

  .ll-bento__card--table:not([open]) .ll-bento__table-heading .ll-bento__chip {
    max-width: 100%;
  }

  .ll-bento__card--table:not([open]) .ll-bento__table-heading strong {
    max-width: 14ch;
    font-size: clamp(1rem, 1.3vw, 1.35rem);
    line-height: 1.02;
    white-space: normal;
  }

  .ll-bento__card--table:not([open]) .ll-bento__table-preview {
    grid-column: 3;
    grid-row: 1;
    align-self: stretch;
    justify-self: stretch;
    margin-top: 0;
    max-width: none;
  }

  .ll-bento__card--table:not([open]) .ll-bento__table-preview-row,
  .ll-bento__card--table:not([open]) .ll-bento__table-preview-head {
    grid-template-columns: minmax(92px, 0.28fr) minmax(0, 1fr);
  }
}

@media (max-width: 900px) {
  .ll-bento__grid {
    grid-template-areas:
      "hero hero"
      "summary image"
      "use detail"
      "table table";
  }

  .ll-bento__card--wide {
    grid-area: summary;
  }

  .ll-bento__expand--image {
    grid-area: image;
  }

  .ll-bento__expand--hero {
    grid-area: hero;
  }

  .ll-bento__card--use {
    grid-area: use;
  }

  .ll-bento__card--detail {
    grid-area: detail;
  }

  .ll-bento__expand--table {
    grid-area: auto;
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .ll-bento__expand--table {
    grid-column: 1 / -1;
    min-height: 0;
  }

  .ll-bento__table-summary {
    grid-template-columns: 30px minmax(0, 1fr);
    grid-template-rows: auto auto;
    align-items: stretch;
    padding: 12px;
  }

  .ll-bento__table-summary::before {
    grid-row: 1 / span 2;
    align-self: center;
  }

  .ll-bento__card--table .table-container-custom {
    padding: 10px;
  }

  .ll-bento__table-preview {
    grid-column: 1 / -1;
    grid-row: 2;
    width: 100%;
  }

  .ll-bento__table-heading {
    grid-column: 2;
    grid-row: 1;
  }

  .ll-bento__table-preview-row {
    grid-template-columns: minmax(44px, 0.24fr) minmax(0, 1fr);
    min-height: 32px;
    padding: 7px 8px;
  }

  .ll-bento__card--table .table-design-custom {
    min-width: 430px;
  }

  .ll-bento__card--table .table-text-custom {
    padding: 8px 10px;
    font-size: 0.72rem;
    line-height: 1.25;
  }
}

.ll-bento__card--table {
  position: relative;
  transform: none;
}

.ll-bento__card--table:hover {
  transform: none;
}

.ll-bento__table-expand-button {
  position: absolute;
  top: clamp(14px, 1.6vw, 22px);
  right: clamp(14px, 1.6vw, 22px);
  z-index: 8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 7px 11px;
  border: 1px solid rgba(234, 91, 12, 0.28);
  border-radius: 999px;
  color: #ffffff;
  background: var(--ll-bento-accent);
  font-size: 0.74rem;
  font-weight: 900;
  line-height: 1;
  cursor: zoom-in;
  box-shadow: 0 6px 14px rgba(234, 91, 12, 0.18);
}

.ll-bento__table-lightbox-toggle {
  position: absolute;
  display: block;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.ll-bento__table-lightbox {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  place-items: center;
  padding: clamp(18px, 4vw, 56px);
  opacity: 0;
  pointer-events: none;
  transform: scale(0.985);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.ll-bento__table-lightbox-toggle:checked ~ .ll-bento__table-lightbox {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}

.ll-bento__table-lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.74);
  backdrop-filter: blur(10px);
  cursor: zoom-out;
}

.ll-bento__table-lightbox-panel {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: min(980px, calc(100vw - 36px));
  max-height: min(82vh, 760px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.32);
}

.ll-bento__table-lightbox-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--ll-bento-line);
  color: var(--ll-bento-ink);
}

.ll-bento__table-lightbox-close {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  color: #ffffff;
  background: var(--ll-bento-accent);
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
}

.ll-bento__table-popup-table {
  max-height: calc(min(82vh, 760px) - 64px);
  padding: clamp(14px, 2vw, 22px);
  overflow: auto;
  border-radius: 0;
}

.ll-bento__table-popup-table .table-design-custom {
  min-width: 620px;
}

@media (max-width: 560px) {
  .ll-bento__table-expand-button {
    min-height: 30px;
    padding: 7px 9px;
    font-size: 0.68rem;
  }
}
</style>`;
    }

    function buildBentoOutputPatch() {
      return `<style>
.ll-bento {
  display: block !important;
  inline-size: 100% !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  margin: 0 !important;
  flex: 1 1 100% !important;
  align-self: stretch !important;
  justify-self: stretch !important;
}

.ll-bento__grid {
  display: grid !important;
  inline-size: 100% !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
}

/* Composicao-base: 7+5 no topo e 3+3+6 na faixa inferior. */
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid {
  grid-template-areas:
    "hero hero hero hero hero hero hero summary summary summary summary summary"
    "hero hero hero hero hero hero hero rectangle rectangle rectangle rectangle rectangle"
    "use use use circle circle circle detail detail detail detail detail detail";
  grid-template-columns: repeat(12, minmax(0, 1fr));
  /* The three named rows are intentionally capped. The circle must never
     make the final text row taller than the rest of the composition. */
  grid-template-rows: 230px 230px 175px;
  grid-auto-rows: auto;
}

.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--hero {
  grid-area: hero !important;
  grid-column: auto !important;
  grid-row: auto !important;
  width: 100% !important;
  min-height: 460px;
  align-self: stretch !important;
  justify-self: stretch !important;
}

.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--wide {
  grid-area: summary !important;
  grid-column: auto !important;
  grid-row: auto !important;
  width: 100% !important;
  min-height: 0;
  height: 100% !important;
  align-self: stretch !important;
  justify-self: stretch !important;
}

.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--image-rectangle {
  grid-area: rectangle !important;
  grid-column: auto !important;
  grid-row: auto !important;
  width: 100% !important;
  min-height: 0;
  align-self: stretch;
  justify-self: stretch;
}

.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--use {
  grid-area: use !important;
  grid-column: auto !important;
  grid-row: auto !important;
  width: 100% !important;
  min-height: 0;
  height: 100% !important;
  align-self: stretch !important;
  justify-self: stretch !important;
}

.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--image-circle {
  grid-area: circle !important;
  grid-column: auto !important;
  grid-row: auto !important;
  width: min(100%, 165px) !important;
  max-width: 165px !important;
  height: auto !important;
  min-height: 0;
  align-self: center;
  justify-self: center;
}

.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--detail {
  grid-area: detail !important;
  grid-column: auto !important;
  grid-row: auto !important;
  width: 100% !important;
  min-height: 0;
  height: 100% !important;
  align-self: stretch !important;
  justify-self: stretch !important;
}

/* Keep the compact final row compact even if a browser restores old inline
   resize data from a previous editing session. */
@media (min-width: 901px) {
  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--use,
  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--detail {
    height: 175px !important;
    max-height: 175px !important;
    overflow: hidden;
  }
}

.ll-bento__card--text,
.ll-bento__expand--image,
.ll-bento__expand--image-square,
.ll-bento__expand--image-rectangle,
.ll-bento__expand--image-circle {
  resize: none !important;
}

.ll-bento__resize-handle,
[data-ll-bento-resize-handle] {
  display: none !important;
}

.ll-bento__card--hero {
  background: var(--ll-bento-deep) !important;
}

.ll-bento__hero-picture {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  overflow: hidden;
  pointer-events: none;
}

.ll-bento__hero-picture::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(19, 35, 58, 0.9) 0%, rgba(19, 35, 58, 0.58) 46%, rgba(19, 35, 58, 0.18) 100%);
}

.ll-bento__hero-picture img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.ll-bento__card--hero > div,
.ll-bento__card--hero > .ll-bento__card-text {
  position: relative;
  z-index: 2;
}

.ll-bento__card--hero > .ll-bento__media-action {
  z-index: 3;
}

.ll-bento__card--hero > .ll-bento__image-button {
  z-index: 4;
}

.ll-bento__lightbox-picture {
  display: block;
  width: 100%;
}

.ll-bento__card--text {
  grid-column: span 3;
  align-self: stretch;
  justify-self: stretch;
  width: 100%;
  min-width: 0;
  min-height: 150px;
  overflow: hidden;
}

.ll-bento__card--text.ll-bento__card--wide {
  grid-column: span 5;
}

.ll-bento__card--text.ll-bento__card--detail {
  grid-column: span 6;
}

.ll-bento__card--text.ll-bento__card--accent {
  grid-column: span 4;
}

.ll-bento__card--text.ll-bento__card--dark {
  grid-column: span 5;
}

.ll-bento__expand--image-square {
  grid-column: span 3;
  align-self: stretch;
  justify-self: stretch;
  width: 100%;
  min-width: 0;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: var(--ll-bento-radius);
}

.ll-bento__expand--image-rectangle {
  grid-column: span 5;
  aspect-ratio: 4 / 3;
  min-height: 130px;
}

.ll-bento__expand--image-circle {
  grid-column: span 3;
  align-self: stretch;
  justify-self: stretch;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: visible;
  border-radius: 0;
}

.ll-bento__expand--image-square .ll-bento__card--image,
.ll-bento__expand--image-circle > .ll-bento__card--image {
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 0;
  aspect-ratio: auto;
  border-radius: inherit;
}

.ll-bento__expand--image-square picture,
.ll-bento__expand--image-circle > .ll-bento__card--image > picture,
.ll-bento__expand--image-square .ll-bento__card-media,
.ll-bento__expand--image-circle > .ll-bento__card--image .ll-bento__card-media {
  width: 100%;
  height: 100%;
}

.ll-bento__expand--image-circle > .ll-bento__card--image,
.ll-bento__expand--image-circle > .ll-bento__card--image > picture,
.ll-bento__expand--image-circle > .ll-bento__card--image .ll-bento__card-media {
  overflow: hidden;
  border-radius: 50%;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
  object-fit: cover;
}

@media (max-width: 900px) {
  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid {
    grid-template-areas:
      "hero hero"
      "summary rectangle"
      "use circle"
      "detail detail" !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: minmax(260px, 380px) 170px 170px 170px;
  }

  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--hero {
    grid-area: hero !important;
    grid-column: 1 / -1 !important;
    min-height: clamp(260px, 48vw, 380px);
  }

  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--wide {
    grid-area: summary !important;
  }

  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--image-rectangle {
    grid-area: rectangle !important;
  }

  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--use {
    grid-area: use !important;
  }

  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--image-circle {
    grid-area: circle !important;
  }

  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--detail {
    grid-area: detail !important;
    min-height: clamp(130px, 22vw, 190px);
  }

  .ll-bento[data-ll-bento-fluid-output="true"] .ll-bento__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    grid-template-areas: none !important;
    grid-auto-flow: row dense;
  }

  .ll-bento[data-ll-bento-fluid-output="true"] .ll-bento__expand--hero {
    grid-area: auto !important;
    grid-column: 1 / -1 !important;
    grid-row: auto !important;
    width: 100% !important;
  }

  .ll-bento[data-ll-bento-fluid-output="true"] .ll-bento__card--text,
  .ll-bento[data-ll-bento-fluid-output="true"] .ll-bento__expand--image {
    grid-area: auto !important;
    grid-column: span 1 !important;
    grid-row: auto !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0;
    align-self: stretch !important;
    justify-self: stretch !important;
  }

  .ll-bento[data-ll-bento-fluid-output="true"] .ll-bento__responsive-span-2 {
    grid-column: span 2 !important;
  }

  .ll-bento[data-ll-bento-fluid-output="true"] .ll-bento__expand--image-circle {
    aspect-ratio: 1 / 1;
    height: auto !important;
  }
}

@media (max-width: 560px) {
  .ll-bento__hero-picture::after {
    background: linear-gradient(135deg, rgba(19, 35, 58, 0.88) 0%, rgba(19, 35, 58, 0.55) 52%, rgba(19, 35, 58, 0.2) 100%);
  }

  .ll-bento__expand--image-square {
    border-radius: 16px;
  }

  .ll-bento__expand--image-circle {
    width: 100% !important;
    height: auto !important;
  }
}

/* A classe permanece no HTML copiado mesmo quando algum editor remove data-*.
   Ela fecha a composicao-base sem depender dos controles da previa. */
.ll-bento.ll-bento--default-layout .ll-bento__grid {
  display: grid !important;
  width: 100% !important;
  min-width: 0 !important;
  grid-auto-flow: row !important;
  grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
  grid-template-areas: none !important;
  grid-template-rows: 230px 230px 175px !important;
  gap: 14px !important;
  align-items: stretch !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--hero {
  grid-area: hero !important;
  grid-column: auto !important;
  grid-row: auto !important;
  min-height: 460px !important;
  height: 100% !important;
  width: 100% !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--wide {
  grid-area: summary !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-rectangle {
  grid-area: rectangle !important;
  grid-column: auto !important;
  grid-row: auto !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  aspect-ratio: auto !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--use {
  grid-area: use !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-circle {
  grid-area: circle !important;
  grid-column: auto !important;
  grid-row: auto !important;
  width: min(100%, 165px) !important;
  max-width: 165px !important;
  height: auto !important;
  min-height: 0 !important;
  aspect-ratio: 1 / 1 !important;
  align-self: center !important;
  justify-self: center !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--detail {
  grid-area: detail !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--wide,
.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--use,
.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--detail {
  grid-column: auto !important;
  grid-row: auto !important;
  width: 100% !important;
  min-width: 0 !important;
  height: 100% !important;
  min-height: 0 !important;
  max-height: none !important;
  align-self: stretch !important;
  justify-self: stretch !important;
}

@media (min-width: 901px) {
  .ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--use,
  .ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--detail {
    height: 175px !important;
    max-height: 175px !important;
    overflow: hidden !important;
  }
}

@media (max-width: 900px) {
  .ll-bento.ll-bento--default-layout .ll-bento__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    grid-template-areas:
      "hero hero"
      "summary rectangle"
      "use circle"
      "detail detail" !important;
    grid-template-rows: minmax(260px, 380px) 170px 170px 170px !important;
  }

  .ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--hero {
    grid-column: 1 / -1 !important;
    min-height: clamp(260px, 48vw, 380px) !important;
  }
}
</style>`;
    }

    function buildBentoExportStyle() {
      return `<style>
/* Layout Lab Bento: estilos de saida isolados do editor. */
.ll-bento,
.ll-bento *,
.ll-bento *::before,
.ll-bento *::after {
  box-sizing: border-box;
}

.ll-bento {
  --ll-bento-bg: #f5f7fb;
  --ll-bento-ink: #101828;
  --ll-bento-muted: #5f6c7b;
  --ll-bento-card: #ffffff;
  --ll-bento-line: #d9e2ec;
  --ll-bento-accent: #ea5b0c;
  --ll-bento-accent-soft: #fff1e8;
  --ll-bento-deep: #13233a;
  --ll-bento-radius: 22px;
  display: block !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  margin: 0 !important;
  padding: clamp(18px, 3vw, 32px) !important;
  overflow: hidden;
  border-radius: 32px;
  color: var(--ll-bento-ink);
  background: var(--ll-bento-bg);
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.35;
}

.ll-bento__header {
  display: grid;
  gap: 8px;
  width: 100%;
  max-width: 760px;
  margin: 0 0 18px;
}

.ll-bento__eyebrow,
.ll-bento__title,
.ll-bento__lead,
.ll-bento__card-title,
.ll-bento__card-text,
.ll-bento__footer-note {
  margin: 0;
}

.ll-bento__eyebrow {
  color: var(--ll-bento-accent);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ll-bento__title {
  color: var(--ll-bento-ink);
  font-size: clamp(1.8rem, 3.4vw, 3.8rem);
  font-weight: 900;
  line-height: 0.95;
}

.ll-bento__lead {
  max-width: 60ch;
  color: var(--ll-bento-muted);
  font-size: clamp(0.95rem, 1.2vw, 1.08rem);
  line-height: 1.55;
}

.ll-bento__grid {
  display: grid !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
  grid-template-rows: 230px 230px 175px !important;
  grid-template-areas: none !important;
  grid-auto-flow: row !important;
  gap: 14px !important;
  align-items: stretch !important;
  justify-items: stretch !important;
}

.ll-bento__grid > * {
  min-width: 0 !important;
  min-height: 0 !important;
  max-width: none !important;
  margin: 0 !important;
  transform: none !important;
}

.ll-bento__grid > .ll-bento__expand--hero {
  grid-area: auto !important;
  grid-column: 1 / 8 !important;
  grid-row: 1 / 3 !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
}

.ll-bento__grid > .ll-bento__card--wide {
  grid-area: auto !important;
  grid-column: 8 / 13 !important;
  grid-row: 1 / 2 !important;
}

.ll-bento__grid > .ll-bento__expand--image-rectangle {
  grid-area: auto !important;
  grid-column: 8 / 13 !important;
  grid-row: 2 / 3 !important;
}

.ll-bento__grid > .ll-bento__card--use {
  grid-area: auto !important;
  grid-column: 1 / 4 !important;
  grid-row: 3 / 4 !important;
}

.ll-bento__grid > .ll-bento__expand--image-circle {
  grid-area: auto !important;
  grid-column: 4 / 7 !important;
  grid-row: 3 / 4 !important;
  width: min(100%, 165px) !important;
  height: auto !important;
  aspect-ratio: 1 / 1 !important;
  align-self: center !important;
  justify-self: center !important;
}

.ll-bento__grid > .ll-bento__card--detail {
  grid-area: auto !important;
  grid-column: 7 / 13 !important;
  grid-row: 3 / 4 !important;
}

.ll-bento__grid > .ll-bento__card--wide,
.ll-bento__grid > .ll-bento__expand--image-rectangle,
.ll-bento__grid > .ll-bento__card--use,
.ll-bento__grid > .ll-bento__card--detail {
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  align-self: stretch !important;
  justify-self: stretch !important;
}

.ll-bento__expand {
  position: relative;
  overflow: hidden;
  border-radius: var(--ll-bento-radius);
}

/* A mascara pertence apenas a miniatura. O modal e seu picture sao irmaos
   do card e precisam manter a imagem inteira ao ampliar. */
.ll-bento__grid > .ll-bento__expand--image-circle {
  overflow: visible !important;
  border-radius: 0 !important;
  -webkit-clip-path: none !important;
  clip-path: none !important;
}

.ll-bento__grid > .ll-bento__expand--image-circle > .ll-bento__card--image,
.ll-bento__grid > .ll-bento__expand--image-circle > .ll-bento__card--image > picture,
.ll-bento__grid > .ll-bento__expand--image-circle > .ll-bento__card--image .ll-bento__card-media {
  overflow: hidden !important;
  border-radius: 999px !important;
  -webkit-clip-path: circle(50% at 50% 50%) !important;
  clip-path: circle(50% at 50% 50%) !important;
}

.ll-bento__grid > .ll-bento__expand--image-circle > .ll-bento__card--image > picture,
.ll-bento__grid > .ll-bento__expand--image-circle > .ll-bento__card--image .ll-bento__card-media {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.ll-bento__card {
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 0;
  height: 100%;
  padding: clamp(18px, 2vw, 26px);
  overflow: hidden;
  border: 1px solid var(--ll-bento-line);
  border-radius: var(--ll-bento-radius);
  background: var(--ll-bento-card);
  box-shadow: 0 3px 10px rgba(16, 24, 40, 0.035);
}

.ll-bento__card--hero,
.ll-bento__card--wide,
.ll-bento__card--dark {
  color: #ffffff;
  background: var(--ll-bento-deep);
}

.ll-bento__card--hero {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  isolation: isolate;
}

.ll-bento__hero-picture,
.ll-bento__hero-picture picture {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  overflow: hidden;
}

.ll-bento__hero-picture::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(19, 35, 58, 0.9) 0%, rgba(19, 35, 58, 0.58) 46%, rgba(19, 35, 58, 0.18) 100%);
}

.ll-bento__card--hero > :not(.ll-bento__hero-picture) {
  position: relative;
  z-index: 1;
}

.ll-bento__card--wide,
.ll-bento__card--use,
.ll-bento__card--detail,
.ll-bento__card--accent,
.ll-bento__card--dark {
  flex-direction: column;
  justify-content: space-between;
}

.ll-bento__card--detail {
  justify-content: center;
  text-align: center;
  background: #fff8f2;
  border-color: rgba(234, 91, 12, 0.22);
}

.ll-bento__card--image {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: inherit;
  background: #dbeafe;
}

.ll-bento__card--image picture,
.ll-bento__card--image picture img,
.ll-bento__hero-picture img,
.ll-bento__lightbox-picture,
.ll-bento__lightbox-picture img {
  display: block;
  width: 100%;
  height: 100%;
}

.ll-bento__card--image picture,
.ll-bento__hero-picture picture {
  display: block;
  width: 100%;
  height: 100%;
}

.ll-bento__card-media,
.ll-bento__hero-picture img {
  object-fit: cover;
  object-position: center;
}

.ll-bento__chip {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 6px 10px;
  border-radius: 999px;
  color: var(--ll-bento-accent);
  background: rgba(234, 91, 12, 0.12);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.ll-bento__card--hero .ll-bento__chip,
.ll-bento__card--wide .ll-bento__chip,
.ll-bento__card--dark .ll-bento__chip {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.14);
}

.ll-bento__card-title {
  max-width: 13ch;
  margin: 16px 0 8px;
  color: inherit;
  font-size: clamp(1.25rem, 2vw, 2.5rem);
  font-weight: 900;
  line-height: 0.98;
}

.ll-bento__card--hero .ll-bento__card-title {
  max-width: 10ch;
  font-size: clamp(2.4rem, 5vw, 5.4rem);
}

.ll-bento__card-text {
  max-width: 46ch;
  color: var(--ll-bento-muted);
  font-size: 0.95rem;
  line-height: 1.55;
}

.ll-bento__card--hero .ll-bento__card-text,
.ll-bento__card--wide .ll-bento__card-text,
.ll-bento__card--dark .ll-bento__card-text {
  color: rgba(255, 255, 255, 0.86);
}

.ll-bento__stat {
  display: block;
  margin: 12px 0 4px;
  font-size: clamp(2.2rem, 4vw, 4rem);
  font-weight: 950;
  line-height: 0.9;
}

.ll-bento__media-action {
  position: absolute !important;
  right: 14px !important;
  bottom: 14px !important;
  z-index: 2 !important;
  display: inline-flex !important;
  flex: 0 0 auto !important;
  align-self: flex-start !important;
  width: auto !important;
  max-width: calc(100% - 28px) !important;
  min-height: 34px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-radius: 999px;
  color: #ffffff;
  background: rgba(19, 35, 58, 0.58);
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1 !important;
  white-space: nowrap;
}

.ll-bento__card--image .ll-bento__media-action {
  right: auto !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  inline-size: max-content !important;
  min-inline-size: 0 !important;
}

.ll-bento__image-button {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: transparent;
  cursor: zoom-in;
}

/* The label is only a click target. Keep host-page label styles from
   turning it into a visible control over the image. */
.ll-bento .ll-bento__image-button {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  outline: 0 !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  color: transparent !important;
  background: transparent !important;
  box-shadow: none !important;
  font-size: 0 !important;
  line-height: 0 !important;
}

/* Preserve the image trigger in pages that ship their own card layers. */
.ll-bento__card--hero > .ll-bento__image-button,
.ll-bento__card--image > .ll-bento__image-button {
  position: absolute !important;
  inset: 0 !important;
  z-index: 4 !important;
  pointer-events: auto !important;
}

/* O card inteiro continua clicavel. A etiqueta de ampliar nao pode herdar
   o esticamento de um card flex vertical da pagina hospedeira. */
.ll-bento__card--hero > .ll-bento__media-action {
  align-self: flex-start !important;
}

.ll-bento__card--image > .ll-bento__media-action {
  align-self: center !important;
}

.ll-bento__card--wide .ll-bento__card-text {
  display: -webkit-box;
  min-height: 0 !important;
  max-height: 5.6em !important;
  margin: 10px 0 0 !important;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
.ll-bento__card--wide {
  min-height: 0 !important;
  overflow: hidden !important;
}

.ll-bento__lightbox-toggle {
  position: fixed;
  top: -9999px;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.ll-bento__lightbox {
  position: fixed !important;
  inset: 0 !important;
  z-index: 9999 !important;
  display: grid !important;
  place-items: center;
  padding: clamp(18px, 4vw, 56px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.ll-bento__lightbox-toggle:checked ~ .ll-bento__lightbox {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.ll-bento__lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.74);
}

.ll-bento__lightbox-panel {
  position: relative;
  z-index: 1;
  display: inline-block;
  width: fit-content;
  max-width: min(94vw, 1100px);
  max-height: calc(88vh - 2px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  background: transparent;
  box-shadow: 0 18px 56px rgba(0, 0, 0, 0.32);
}

.ll-bento__lightbox-panel .ll-bento__lightbox-picture,
.ll-bento__lightbox-panel .ll-bento__lightbox-picture img {
  display: block;
  width: auto;
  height: auto;
  max-width: min(94vw, 1100px);
  max-height: calc(88vh - 2px);
  overflow: visible !important;
  border-radius: 0 !important;
  -webkit-clip-path: none !important;
  clip-path: none !important;
  object-fit: contain;
}

.ll-bento__lightbox-overlay {
  display: none;
}

.ll-bento__lightbox-clickzone {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.ll-bento__lightbox-close {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 4;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  color: #ffffff;
  background: rgba(19, 35, 58, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.58);
  font-size: 1.4rem;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 900px) {
  .ll-bento {
    padding: 16px !important;
  }

  .ll-bento__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    grid-template-rows: minmax(260px, 380px) 170px 170px 170px !important;
    grid-template-areas: none !important;
    gap: 12px !important;
  }

  .ll-bento__grid > .ll-bento__expand--hero {
    grid-column: 1 / 3 !important;
    grid-row: 1 / 2 !important;
    min-height: 0 !important;
  }

  .ll-bento__grid > .ll-bento__card--wide {
    grid-column: 1 / 2 !important;
    grid-row: 2 / 3 !important;
  }

  .ll-bento__grid > .ll-bento__expand--image-rectangle {
    grid-column: 2 / 3 !important;
    grid-row: 2 / 3 !important;
  }

  .ll-bento__grid > .ll-bento__card--use {
    grid-column: 1 / 2 !important;
    grid-row: 3 / 4 !important;
  }

  .ll-bento__grid > .ll-bento__expand--image-circle {
    grid-column: 2 / 3 !important;
    grid-row: 3 / 4 !important;
  }

  .ll-bento__grid > .ll-bento__card--detail {
    grid-column: 1 / 3 !important;
    grid-row: 4 / 5 !important;
  }
}

@media (max-width: 560px) {
  .ll-bento {
    padding: 10px !important;
    border-radius: 28px;
  }

  .ll-bento__header {
    gap: 4px;
    margin-bottom: 8px;
    padding: 4px 2px 0;
  }

  .ll-bento__eyebrow {
    font-size: 0.62rem;
  }

  .ll-bento__title {
    font-size: clamp(1.28rem, 7vw, 1.9rem);
    line-height: 1;
  }

  .ll-bento__lead {
    font-size: 0.72rem;
    line-height: 1.35;
  }

  .ll-bento__grid {
    grid-template-rows: 235px 128px 128px 128px !important;
    gap: 7px !important;
  }

  .ll-bento__card {
    padding: 10px;
    border-radius: 16px;
  }

  .ll-bento__grid > .ll-bento__expand--image-circle {
    width: min(100%, 132px) !important;
  }

  .ll-bento__card-title {
    margin: 8px 0 4px;
    font-size: clamp(0.95rem, 4.8vw, 1.32rem);
    line-height: 1;
  }

  .ll-bento__card--hero .ll-bento__card-title {
    font-size: clamp(2.25rem, 16vw, 4.5rem);
  }

  .ll-bento__card-text {
    display: -webkit-box;
    overflow: hidden;
    font-size: 0.7rem;
    line-height: 1.25;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .ll-bento__stat {
    margin: 6px 0 2px;
    font-size: 1.72rem;
  }

  .ll-bento__media-action {
    right: 8px;
    bottom: 8px;
    min-height: 28px;
    padding: 6px 9px;
    font-size: 0.66rem;
  }
}
</style>`;
    }

    // This guard is intentionally emitted after user class styles. The editor
    // may store visual adjustments per class, but they must never redefine the
    // structural grid of the default Bento when it is pasted into a host page.
    function buildBentoExportLayoutGuard() {
      return `<style>
/* Layout Lab Bento: grade final independente do CSS hospedeiro. */
.ll-bento.ll-bento--default-layout .ll-bento__grid {
  display: grid !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
  grid-template-rows: 230px 230px 175px !important;
  grid-template-areas: none !important;
  grid-auto-flow: row !important;
  gap: 14px !important;
  align-items: stretch !important;
  justify-items: stretch !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > * {
  grid-area: auto !important;
  grid-column: auto !important;
  grid-row: auto !important;
  min-width: 0 !important;
  min-height: 0 !important;
  max-width: none !important;
  max-height: none !important;
  margin: 0 !important;
  transform: none !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--hero {
  grid-column: 1 / 8 !important;
  grid-row: 1 / 3 !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  align-self: stretch !important;
  justify-self: stretch !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--wide {
  grid-column: 8 / 13 !important;
  grid-row: 1 / 2 !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-rectangle {
  grid-column: 8 / 13 !important;
  grid-row: 2 / 3 !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--use {
  grid-column: 1 / 4 !important;
  grid-row: 3 / 4 !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-circle {
  grid-column: 4 / 7 !important;
  grid-row: 3 / 4 !important;
  width: min(100%, 165px) !important;
  height: min(100%, 165px) !important;
  aspect-ratio: 1 / 1 !important;
  align-self: center !important;
  justify-self: center !important;
  overflow: visible !important;
  border-radius: 0 !important;
  clip-path: none !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-circle > .ll-bento__card--image,
.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-circle > .ll-bento__card--image > picture,
.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-circle > .ll-bento__card--image .ll-bento__card-media {
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  border-radius: 50% !important;
  clip-path: circle(50%) !important;
  object-fit: cover !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--detail {
  grid-column: 7 / 13 !important;
  grid-row: 3 / 4 !important;
}

.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--wide,
.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-rectangle,
.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--use,
.ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--detail {
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  align-self: stretch !important;
  justify-self: stretch !important;
}

@media (max-width: 900px) {
  .ll-bento.ll-bento--default-layout .ll-bento__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    grid-template-rows: minmax(260px, 380px) 170px 170px 170px !important;
    gap: 12px !important;
  }

  .ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--hero {
    grid-column: 1 / 3 !important;
    grid-row: 1 / 2 !important;
  }

  .ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--wide {
    grid-column: 1 / 2 !important;
    grid-row: 2 / 3 !important;
  }

  .ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-rectangle {
    grid-column: 2 / 3 !important;
    grid-row: 2 / 3 !important;
  }

  .ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--use {
    grid-column: 1 / 2 !important;
    grid-row: 3 / 4 !important;
  }

  .ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__expand--image-circle {
    grid-column: 2 / 3 !important;
    grid-row: 3 / 4 !important;
  }

  .ll-bento.ll-bento--default-layout .ll-bento__grid > .ll-bento__card--detail {
    grid-column: 1 / 3 !important;
    grid-row: 4 / 5 !important;
  }
}

@media (max-width: 560px) {
  .ll-bento.ll-bento--default-layout .ll-bento__grid {
    grid-template-rows: 235px 128px 128px 128px !important;
    gap: 7px !important;
  }
}
</style>`;
    }

    function buildBentoStyle() {
      return `${bentoStyle}
${buildBentoOutputPatch()}`;
    }

    // A previa mantem a mesma composicao do output e reativa apenas
    // os controles que pertencem exclusivamente ao editor.
    function buildBentoPreviewStyle() {
      return `${buildBentoStyle()}
<style>
.ll-bento__resize-handle,
[data-ll-bento-resize-handle] {
  display: block !important;
}
</style>
${buildBentoRuntimePatch()}
<style>
/* This comes after the editor runtime so the starter Bento never inherits
   a stale resize rule while its named-grid composition is active. */
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid {
  display: grid !important;
  width: 100% !important;
  min-width: 0 !important;
  grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
  grid-template-areas:
    "hero hero hero hero hero hero hero summary summary summary summary summary"
    "hero hero hero hero hero hero hero rectangle rectangle rectangle rectangle rectangle"
    "use use use circle circle circle detail detail detail detail detail detail" !important;
  grid-template-rows: 230px 230px 175px !important;
  gap: 14px !important;
  align-items: stretch !important;
}

.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--hero,
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--wide,
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--image-rectangle,
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--use,
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--image-circle,
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--detail {
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  align-self: stretch !important;
  justify-self: stretch !important;
  resize: none !important;
}

.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--hero { grid-area: hero !important; min-height: 460px !important; }
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--wide { grid-area: summary !important; }
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--image-rectangle { grid-area: rectangle !important; aspect-ratio: auto !important; }
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--use { grid-area: use !important; }
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--image-circle {
  grid-area: circle !important;
  width: min(100%, 165px) !important;
  max-width: 165px !important;
  height: auto !important;
  aspect-ratio: 1 / 1 !important;
  align-self: center !important;
  justify-self: center !important;
}
.ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--detail { grid-area: detail !important; }

@media (min-width: 901px) {
  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--use,
  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__card--detail {
    height: 175px !important;
    max-height: 175px !important;
    overflow: hidden !important;
  }
}

@media (max-width: 900px) {
  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    grid-template-areas:
      "hero hero"
      "summary rectangle"
      "use circle"
      "detail detail" !important;
    grid-template-rows: minmax(260px, 380px) 170px 170px 170px !important;
  }

  .ll-bento[data-ll-bento-default-layout="true"] .ll-bento__grid > .ll-bento__expand--hero {
    grid-column: 1 / -1 !important;
    min-height: clamp(260px, 48vw, 380px) !important;
  }
}
</style>`;
    }

    function cleanBentoOutputHtml(html, options = {}) {
      const source = String(html || "").trim();
      if (!source || typeof DOMParser === "undefined") {
        return source;
      }

      const stripEditorSizing = options.stripEditorSizing !== false;
      const resizeableBlockSelector = [
        ".ll-bento",
        ".ll-bento__grid",
        ".ll-bento__expand--hero",
        ".ll-bento__card--hero",
        ".ll-bento__card--text",
        ".ll-bento__card--wide",
        ".ll-bento__card--small",
        ".ll-bento__card--accent",
        ".ll-bento__card--dark",
        ".ll-bento__expand--image",
        ".ll-bento__card--image",
        ".ll-bento__expand--image-square",
        ".ll-bento__expand--image-rectangle",
        ".ll-bento__expand--image-circle"
      ].join(",");

      const documentClone = new DOMParser().parseFromString(source, "text/html");
      documentClone.querySelectorAll("[data-ll-bento-resize-handle], .ll-bento__resize-handle").forEach((element) => element.remove());
      documentClone.querySelectorAll("*").forEach((element) => {
        [
          "data-ll-bento-node",
          "data-ll-preview-text",
          "data-ll-preview-media",
          "data-ll-preview-color",
          "data-ll-preview-inline",
          "data-ll-preview-position",
          "data-ll-bento-resize-block",
          "data-ll-bento-resize-ready"
        ].forEach((attribute) => element.removeAttribute(attribute));

        if (element.style) {
          if (stripEditorSizing && element.matches(resizeableBlockSelector)) {
            [
              "width",
              "height",
              "min-width",
              "min-height",
              "max-width",
              "max-height",
              "resize",
              "grid-column",
              "grid-row",
              "grid-column-start",
              "grid-column-end",
              "grid-row-start",
              "grid-row-end",
              "justify-self",
              "align-self"
            ].forEach((property) => element.style.removeProperty(property));
          }
          element.style.removeProperty("--ll-bento-resize-max-width");
          element.style.removeProperty("--ll-bento-resize-max-height");
          element.style.removeProperty("--ll-bento-circle-size");
          element.style.removeProperty("--ll-bento-editor-width");
          element.style.removeProperty("--ll-bento-editor-height");
          if (!element.getAttribute("style")) {
            element.removeAttribute("style");
          }
        }
      });

      return documentClone.body.innerHTML.trim();
    }

    function buildBentoSectionHtml(options = {}) {
      ensureBentoState();
      const includeEditorSizing = options.includeEditorSizing === true;
      const customHtml = state.bento && typeof state.bento.html === "string" ? state.bento.html.trim() : "";
      if (customHtml && state.bento.useCustomHtml) {
        return cleanBentoOutputHtml(customHtml, {
          stripEditorSizing: !includeEditorSizing
        });
      }

      const header = state.bento.header;
      const defaultLayout = hasDefaultBentoComposition(state.bento.blocks);
      const blocks = state.bento.blocks
        .map((block, index) => renderBentoBlockHtml(block, index, includeEditorSizing && !defaultLayout))
        .join("\n");
      // Apenas larguras validas trocam a composicao-base pelo fluxo livre.
      // Valores antigos ou pequenos demais nao podem esmagar a grade.
      const fluidOutput = !defaultLayout && state.bento.blocks.some(hasUsableBentoResizeWidth);
      const fluidAttribute = fluidOutput ? " data-ll-bento-fluid-output=\"true\"" : "";
      const defaultLayoutClass = defaultLayout ? " ll-bento--default-layout" : "";
      const defaultLayoutAttribute = defaultLayout
        ? " data-ll-bento-default-layout=\"true\""
        : "";
      return `<section class="ll-bento${defaultLayoutClass}"${fluidAttribute}${defaultLayoutAttribute} aria-labelledby="ll-bento-title">
        <header class="ll-bento__header">
          <p class="ll-bento__eyebrow">${escapeHtml(header.eyebrow)}</p>
          <h2 class="ll-bento__title" id="ll-bento-title">${escapeHtml(header.title)}</h2>
          <p class="ll-bento__lead">${escapeHtml(header.lead)}</p>
        </header>
        <div class="ll-bento__grid">
${blocks}
        </div>
      </section>`;
    }

    function renderBentoBlockEditor(block, index) {
      const slot = fixedBentoSlots[index] || { label: `Bloco ${index + 1}` };

      return `<details class="article-tab-editor">
        <summary class="article-tab-editor__summary">
          <strong>${escapeHtml(slot.label)}</strong>
          <span class="article-tab-editor__meta">${escapeHtml(block.label || block.title || "Bento")}</span>
          <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
        </summary>
        <div class="article-editor__body">
          ${renderBentoBlockFields(block, index)}
        </div>
      </details>`;
    }

    function renderBentoBlockFields(block, index) {
      if (block.type === "hero") {
        return `
          <div class="field-grid field-grid--two">
            ${renderBentoInput(index, "label", "Etiqueta", block.label)}
            ${renderBentoInput(index, "title", "Titulo", block.title)}
          </div>
          ${renderBentoTextarea(index, "text", "Texto", block.text)}
          ${renderBentoInput(index, "image", "URL da imagem hero", block.image)}
          ${renderBentoInput(index, "alt", "Alt text", block.alt)}
        `;
      }

      if (block.type === "image") {
        const imageFormat = block.shape === "circle" ? "Imagem circular proporcional" : "Imagem retangular redimensionavel";
        return `
          <p class="article-editor__hint">Formato fixo: ${imageFormat}.</p>
          ${renderBentoInput(index, "image", "URL da imagem", block.image)}
          ${renderBentoInput(index, "alt", "Alt text", block.alt)}
        `;
      }

      return `
        <div class="field-grid field-grid--two">
          ${renderBentoInput(index, "label", "Etiqueta", block.label)}
          ${renderBentoInput(index, "stat", "Numero curto", block.stat)}
        </div>
        ${renderBentoInput(index, "title", "Titulo", block.title)}
        ${renderBentoTextarea(index, "text", "Texto", block.text)}
      `;
    }

    function renderBentoInput(index, field, label, value) {
      return `<label class="field">
        <span>${escapeHtml(label)}</span>
        <input type="text" value="${escapeHtml(value || "")}" data-bento-field="${field}" data-bento-block="${index}" autocomplete="off">
      </label>`;
    }

    function renderBentoTextarea(index, field, label, value) {
      return `<label class="field">
        <span>${escapeHtml(label)}</span>
        <textarea class="bulk-input" rows="3" data-bento-field="${field}" data-bento-block="${index}" spellcheck="false">${escapeHtml(value || "")}</textarea>
      </label>`;
    }

    function renderBentoEditor() {
      ensureBentoState();

      return `
        <section class="article-editor bento-editor" aria-label="Editor Bento grid">
          <div class="editor-section-title">
            <div>
              <h2>Bento grid</h2>
              <p>Estrutura fixa: hero, resumo, imagem, uso, imagem circular e detalhe.</p>
            </div>
          </div>

          <details class="stories-guide article-image-guide">
            <summary class="stories-guide__summary">
              <strong>Guia rapido do Bento</strong>
              <span aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="stories-guide__body">
              <p><strong>Hero:</strong> use imagem horizontal forte entre 1200x800 e 1600x1000.</p>
              <p><strong>Cards:</strong> mantenha titulos curtos para a grade continuar escaneavel.</p>
              <p><strong>Imagens:</strong> a primeira e retangular; a segunda e circular proporcional.</p>
            </div>
          </details>

          <details class="article-tab-editor article-base-editor">
            <summary class="article-tab-editor__summary">
              <strong>Base da secao</strong>
              <span class="article-tab-editor__meta">Titulo e descricao</span>
              <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="article-editor__body">
              <div class="field-grid field-grid--two">
                <label class="field">
                  <span>Eyebrow</span>
                  <input type="text" value="${escapeHtml(state.bento.header.eyebrow)}" data-bento-field="header.eyebrow" autocomplete="off">
                </label>
                <label class="field">
                  <span>Titulo</span>
                  <input type="text" value="${escapeHtml(state.bento.header.title)}" data-bento-field="header.title" autocomplete="off">
                </label>
              </div>
              <label class="field">
                <span>Descricao</span>
                <textarea class="bulk-input" rows="3" data-bento-field="header.lead" spellcheck="false">${escapeHtml(state.bento.header.lead)}</textarea>
              </label>
            </div>
          </details>

          ${status}

          <div class="bento-block-list">
            ${state.bento.blocks.map(renderBentoBlockEditor).join("")}
          </div>
        </section>
      `;
    }

