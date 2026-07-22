/**
 * Modulo oficial da aba Bento.
 * Carregado antes de assets/js/layout-lab.js.
 * O HTML/CSS base veio de 90_ARQUIVO_LOCAL/testes-e-prototipos/bento-grid-section.html.
 */

    const defaultBentoHtml = "<section class=\"ll-bento\" aria-labelledby=\"ll-bento-title\">\n      <header class=\"ll-bento__header\">\n        <p class=\"ll-bento__eyebrow\">Guia visual</p>\n        <h2 class=\"ll-bento__title\" id=\"ll-bento-title\">Tudo que importa em uma grade só.</h2>\n        <p class=\"ll-bento__lead\">Use a seção para destacar benefícios, usos, detalhes e provas rápidas de um produto sem virar um bloco pesado de leitura.</p>\n      </header>\n\n      <div class=\"ll-bento__grid\">\n        <div class=\"ll-bento__expand ll-bento__expand--hero\">\n        <input class=\"ll-bento__lightbox-toggle\" type=\"checkbox\" id=\"ll-bento-hero-expand\" aria-label=\"Abrir imagem principal ampliada\">\n        <div class=\"ll-bento__lightbox\" aria-label=\"Imagem principal ampliada\">\n          <label class=\"ll-bento__lightbox-backdrop\" for=\"ll-bento-hero-expand\" aria-label=\"Fechar imagem principal ampliada\"></label>\n          <figure class=\"ll-bento__lightbox-panel ll-bento__lightbox-panel--text\">\n            <img src=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=1200x\" alt=\"Imagem principal ampliada do produto\">\n            <label class=\"ll-bento__lightbox-clickzone\" for=\"ll-bento-hero-expand\" aria-label=\"Fechar imagem principal ampliada\"></label>\n            <div class=\"ll-bento__lightbox-overlay\" aria-hidden=\"true\">\n              <span class=\"ll-bento__chip\">Destaque</span>\n              <h3 class=\"ll-bento__card-title\">Escolha rápida.</h3>\n              <p class=\"ll-bento__card-text\">Uma área maior para imagem forte, benefício principal e leitura imediata.</p>\n            </div>\n            <label class=\"ll-bento__lightbox-close\" for=\"ll-bento-hero-expand\" aria-label=\"Fechar imagem principal ampliada\">×</label>\n          </figure>\n        </div>\n        <article class=\"ll-bento__card ll-bento__card--hero\">\n          <div>\n            <span class=\"ll-bento__chip\">Destaque</span>\n            <h3 class=\"ll-bento__card-title\">Escolha rápida.</h3>\n          </div>\n          <p class=\"ll-bento__card-text\">Uma área maior para imagem forte, benefício principal e leitura imediata.</p>\n          <span class=\"ll-bento__media-action\" aria-hidden=\"true\">Ampliar</span>\n          <label class=\"ll-bento__image-button\" for=\"ll-bento-hero-expand\" aria-label=\"Ampliar imagem principal\"></label>\n        </article>\n        </div>\n\n        <article class=\"ll-bento__card ll-bento__card--wide\">\n          <div>\n            <span class=\"ll-bento__chip\">Resumo</span>\n            <strong class=\"ll-bento__stat\">3x</strong>\n            <h3 class=\"ll-bento__card-title\">Mais fácil de comparar.</h3>\n          </div>\n          <p class=\"ll-bento__card-text\">Cards curtos funcionam bem para atributos técnicos, diferenciais e decisões rápidas.</p>\n        </article>\n\n        <div class=\"ll-bento__expand ll-bento__expand--image\">\n        <input class=\"ll-bento__lightbox-toggle\" type=\"checkbox\" id=\"ll-bento-image-expand\" aria-label=\"Abrir imagem ampliada\">\n        <div class=\"ll-bento__lightbox\" aria-label=\"Imagem ampliada\">\n          <label class=\"ll-bento__lightbox-backdrop\" for=\"ll-bento-image-expand\" aria-label=\"Fechar imagem ampliada\"></label>\n          <figure class=\"ll-bento__lightbox-panel\">\n            <img src=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=1200x\" alt=\"Produto ampliado em destaque\">\n            <label class=\"ll-bento__lightbox-clickzone\" for=\"ll-bento-image-expand\" aria-label=\"Fechar imagem ampliada\"></label>\n            <label class=\"ll-bento__lightbox-close\" for=\"ll-bento-image-expand\" aria-label=\"Fechar imagem ampliada\">×</label>\n          </figure>\n        </div>\n\n        <figure class=\"ll-bento__card ll-bento__card--image\">\n          <picture>\n            <source media=\"(max-width: 560px)\" srcset=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=500x\">\n            <img class=\"ll-bento__card-media\" src=\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=760x\" alt=\"Produto em destaque para compor o bloco visual\">\n          </picture>\n          <span class=\"ll-bento__media-action\" aria-hidden=\"true\">Ampliar</span>\n          <label class=\"ll-bento__image-button\" for=\"ll-bento-image-expand\" aria-label=\"Ampliar imagem\"></label>\n        </figure>\n        </div>\n\n        <article class=\"ll-bento__card ll-bento__card--small ll-bento__card--use\">\n          <span class=\"ll-bento__chip\">Uso</span>\n          <div>\n            <h3 class=\"ll-bento__card-title\">Pronto para rotina.</h3>\n            <p class=\"ll-bento__card-text\">Texto curto para uma situação real de uso.</p>\n          </div>\n        </article>\n\n        <article class=\"ll-bento__card ll-bento__card--small ll-bento__card--detail\">\n          <span class=\"ll-bento__chip\">Detalhe</span>\n          <div>\n            <h3 class=\"ll-bento__card-title\">Ponto de atenção.</h3>\n            <p class=\"ll-bento__card-text\">Ideal para medida, material, compatibilidade ou cuidado.</p>\n          </div>\n        </article>\n\n        <article class=\"ll-bento__card ll-bento__card--accent\">\n          <span class=\"ll-bento__chip\">Checklist</span>\n          <div>\n            <h3 class=\"ll-bento__card-title\">Antes de comprar.</h3>\n            <ul class=\"ll-bento__list\">\n              <li>Confirme o tamanho ou modelo indicado.</li>\n              <li>Compare a aplicação com sua necessidade.</li>\n              <li>Veja o detalhe principal do produto.</li>\n            </ul>\n          </div>\n        </article>\n\n        <article class=\"ll-bento__card ll-bento__card--dark\">\n          <span class=\"ll-bento__chip\">Fechamento</span>\n          <div>\n            <h3 class=\"ll-bento__card-title\">Informação com respiro.</h3>\n            <p class=\"ll-bento__card-text\">Um card final para reforçar benefício, garantia, indicação ou contexto de uso.</p>\n            <p class=\"ll-bento__footer-note\">Sugestão: usar imagens horizontais entre 1200x800 e 1600x1000 para manter qualidade no desktop.</p>\n          </div>\n        </article>\n      </div>\n    </section>";
    const bentoStyle = "<style>\n.ll-bento {\n      --ll-bento-bg: #f5f7fb;\n      --ll-bento-ink: #101828;\n      --ll-bento-muted: #5f6c7b;\n      --ll-bento-card: #ffffff;\n      --ll-bento-line: #d9e2ec;\n      --ll-bento-accent: #ea5b0c;\n      --ll-bento-accent-soft: #fff1e8;\n      --ll-bento-deep: #13233a;\n      --ll-bento-radius: 22px;\n      --ll-bento-shadow: 0 8px 22px rgba(16, 24, 40, 0.08);\n    }\n\n    .ll-bento,\n    .ll-bento * {\n      box-sizing: border-box;\n    }\n\n    @keyframes ll-bento-rise {\n      from {\n        opacity: 0;\n        transform: translateY(14px);\n      }\n\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n\n.ll-bento {\n      width: 100%;\n      margin: 0 auto;\n      padding: clamp(18px, 3vw, 32px);\n      border-radius: calc(var(--ll-bento-radius) + 10px);\n      background: var(--ll-bento-bg);\n      font-family: Arial, Helvetica, sans-serif;\n    }\n\n    .ll-bento__header {\n      display: grid;\n      gap: 8px;\n      max-width: 760px;\n      margin: 0 0 18px;\n    }\n\n    .ll-bento__eyebrow {\n      margin: 0;\n      color: var(--ll-bento-accent);\n      font-size: 0.78rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n    }\n\n    .ll-bento__title {\n      margin: 0;\n      color: var(--ll-bento-ink);\n      font-size: clamp(1.8rem, 3.4vw, 3.8rem);\n      line-height: 0.95;\n      font-weight: 900;\n    }\n\n    .ll-bento__lead {\n      max-width: 60ch;\n      margin: 0;\n      color: var(--ll-bento-muted);\n      font-size: clamp(0.95rem, 1.2vw, 1.08rem);\n      line-height: 1.55;\n    }\n\n    .ll-bento__grid {\n      display: grid;\n      grid-template-columns: repeat(12, minmax(0, 1fr));\n      grid-auto-rows: minmax(150px, auto);\n      gap: 14px;\n      perspective: 1200px;\n    }\n\n    .ll-bento__card {\n      position: relative;\n      isolation: isolate;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      min-height: 190px;\n      padding: clamp(18px, 2vw, 26px);\n      overflow: hidden;\n      border: 1px solid var(--ll-bento-line);\n      border-radius: var(--ll-bento-radius);\n      background: var(--ll-bento-card);\n      box-shadow: 0 3px 10px rgba(16, 24, 40, 0.035);\n      transform: translateY(0) scale(1);\n      transform-origin: center;\n      transition:\n        transform 0.3s cubic-bezier(0.18, 0.9, 0.2, 1),\n        box-shadow 0.24s ease,\n        border-color 0.22s ease,\n        background-color 0.22s ease,\n        filter 0.24s ease;\n      animation: ll-bento-rise 0.42s ease both;\n      will-change: transform;\n    }\n\n    .ll-bento__card:nth-child(2) {\n      animation-delay: 0.04s;\n    }\n\n    .ll-bento__card:nth-child(3) {\n      animation-delay: 0.08s;\n    }\n\n    .ll-bento__card:nth-child(4) {\n      animation-delay: 0.12s;\n    }\n\n    .ll-bento__card:nth-child(5) {\n      animation-delay: 0.16s;\n    }\n\n    .ll-bento__card:nth-child(6) {\n      animation-delay: 0.2s;\n    }\n\n    .ll-bento__card:nth-child(7) {\n      animation-delay: 0.24s;\n    }\n\n    .ll-bento__card::before {\n      content: \"\";\n      position: absolute;\n      inset: 0;\n      z-index: -1;\n      border-radius: inherit;\n      opacity: 0;\n      background:\n        radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.2), transparent 34%),\n        linear-gradient(135deg, rgba(234, 91, 12, 0.08), transparent 46%);\n      transform: scale(0.98);\n      transition:\n        opacity 0.22s ease,\n        transform 0.22s ease;\n      pointer-events: none;\n    }\n\n    .ll-bento__card:hover {\n      z-index: 3;\n      border-color: rgba(234, 91, 12, 0.68);\n      box-shadow: 0 8px 18px rgba(16, 24, 40, 0.075);\n      transform: translateY(-12px) rotateX(2deg) rotateZ(-0.35deg) scale(1.026);\n    }\n\n    .ll-bento__card:hover::before {\n      opacity: 0.58;\n      transform: scale(1.025);\n    }\n\n    .ll-bento__card--hero:hover {\n      box-shadow: 0 10px 26px rgba(19, 35, 58, 0.15);\n      transform: translateY(-14px) rotateX(2deg) rotateZ(-0.28deg) scale(1.045);\n    }\n\n    .ll-bento__expand {\n      position: relative;\n      min-width: 0;\n    }\n\n    .ll-bento__expand--hero {\n      grid-column: span 7;\n      grid-row: span 2;\n      min-height: 460px;\n    }\n\n    .ll-bento__expand--hero .ll-bento__card--hero {\n      height: 100%;\n      min-height: 100%;\n    }\n\n    .ll-bento__expand--image {\n      grid-column: span 2;\n      align-self: center;\n      justify-self: center;\n      width: 100%;\n      aspect-ratio: 1 / 1;\n      border-radius: 100%;\n    }\n\n    .ll-bento__expand--image .ll-bento__card--image {\n      width: 100%;\n      height: 100%;\n    }\n\n    .ll-bento__card--hero {\n      min-height: 460px;\n      color: #ffffff;\n      background:\n        linear-gradient(135deg, rgba(19, 35, 58, 0.9) 0%, rgba(19, 35, 58, 0.58) 46%, rgba(19, 35, 58, 0.18) 100%),\n        url(\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=900x\") center / cover no-repeat;\n      box-shadow: var(--ll-bento-shadow);\n      cursor: zoom-in;\n    }\n\n    .ll-bento__card--wide {\n      grid-column: span 5;\n      min-height: 220px;\n      background: var(--ll-bento-deep);\n      color: #ffffff;\n    }\n\n    .ll-bento__card--image {\n      align-self: center;\n      justify-self: center;\n      width: 100%;\n      min-height: 0;\n      padding: 0;\n      aspect-ratio: 1 / 1;\n      border-radius: 100%;\n      background: #dbeafe;\n      cursor: zoom-in;\n    }\n\n    .ll-bento__card--small {\n      grid-column: span 3;\n      min-height: 0;\n      aspect-ratio: 1 / 1;\n    }\n\n    .ll-bento__card--small:nth-of-type(4) {\n      display: grid;\n      place-items: center;\n      padding: 24px;\n      border-radius: var(--ll-bento-radius);\n      text-align: center;\n      background: #fff8f2;\n      border-color: rgba(234, 91, 12, 0.22);\n    }\n\n    .ll-bento__card--accent {\n      grid-column: span 4;\n      background: var(--ll-bento-accent-soft);\n      border-color: rgba(234, 91, 12, 0.22);\n    }\n\n    .ll-bento__card--dark {\n      grid-column: span 5;\n      background:\n        radial-gradient(circle at 88% 18%, rgba(234, 91, 12, 0.28), transparent 34%),\n        var(--ll-bento-deep);\n      color: #ffffff;\n    }\n\n    .ll-bento__card--image picture {\n      display: block;\n      width: 100%;\n      height: 100%;\n    }\n\n    .ll-bento__card-media {\n      width: 100%;\n      height: 100%;\n      min-height: 0;\n      object-fit: cover;\n      object-position: center;\n      display: block;\n      transform: scale(1);\n      transition:\n        transform 0.36s ease,\n        filter 0.36s ease;\n      will-change: transform;\n    }\n\n    .ll-bento__card--image:hover .ll-bento__card-media {\n      transform: scale(1.14) rotate(1.2deg);\n      filter: saturate(1.14) contrast(1.06);\n    }\n\n    .ll-bento__media-action {\n      position: absolute;\n      right: 14px;\n      bottom: 14px;\n      z-index: 2;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-height: 34px;\n      padding: 8px 12px;\n      border: 1px solid rgba(255, 255, 255, 0.46);\n      border-radius: 999px;\n      color: #ffffff;\n      background: rgba(19, 35, 58, 0.48);\n      backdrop-filter: blur(10px);\n      font-size: 0.78rem;\n      font-weight: 800;\n      opacity: 0;\n      transform: translateY(8px);\n      transition:\n        opacity 0.24s ease,\n        transform 0.24s ease,\n        background-color 0.24s ease;\n      pointer-events: none;\n    }\n\n    .ll-bento__card--image:hover .ll-bento__media-action,\n    .ll-bento__card--image:focus-within .ll-bento__media-action,\n    .ll-bento__card--hero:hover .ll-bento__media-action,\n    .ll-bento__card--hero:focus-within .ll-bento__media-action {\n      opacity: 1;\n      transform: translateY(0);\n    }\n\n    .ll-bento__card--image .ll-bento__media-action {\n      right: auto;\n      left: 50%;\n      bottom: 18px;\n      transform: translate(-50%, 8px);\n    }\n\n    .ll-bento__card--image:hover .ll-bento__media-action,\n    .ll-bento__card--image:focus-within .ll-bento__media-action {\n      transform: translate(-50%, 0);\n    }\n\n    .ll-bento__image-button {\n      position: absolute;\n      inset: 0;\n      z-index: 3;\n      display: block;\n      width: 100%;\n      height: 100%;\n      padding: 0;\n      border: 0;\n      border-radius: inherit;\n      background: transparent;\n      cursor: zoom-in;\n    }\n\n    .ll-bento__image-button:focus-visible {\n      outline: 3px solid rgba(234, 91, 12, 0.82);\n      outline-offset: -6px;\n    }\n\n    .ll-bento__lightbox-toggle {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 1px;\n      height: 1px;\n      overflow: hidden;\n      clip: rect(0 0 0 0);\n      clip-path: inset(50%);\n      white-space: nowrap;\n    }\n\n    .ll-bento__lightbox {\n      position: fixed;\n      inset: 0;\n      z-index: 50;\n      display: grid;\n      place-items: center;\n      padding: clamp(18px, 4vw, 56px);\n      opacity: 0;\n      transform: scale(0.985);\n      pointer-events: none;\n      transition:\n        opacity 0.22s ease,\n        transform 0.22s ease;\n    }\n\n    .ll-bento__lightbox-toggle:checked ~ .ll-bento__lightbox {\n      opacity: 1;\n      transform: scale(1);\n      pointer-events: auto;\n    }\n\n    .ll-bento__lightbox-backdrop {\n      position: absolute;\n      inset: 0;\n      background: rgba(15, 23, 42, 0.74);\n      backdrop-filter: blur(12px);\n      cursor: zoom-out;\n    }\n\n    .ll-bento__lightbox-panel {\n      position: relative;\n      z-index: 1;\n      width: min(980px, 100%);\n      max-height: min(82vh, 760px);\n      margin: 0;\n      overflow: hidden;\n      border: 1px solid rgba(255, 255, 255, 0.24);\n      border-radius: 26px;\n      background: #ffffff;\n      box-shadow: 0 34px 90px rgba(0, 0, 0, 0.34);\n    }\n\n    .ll-bento__lightbox-panel img {\n      display: block;\n      width: 100%;\n      max-height: min(72vh, 680px);\n      object-fit: cover;\n      object-position: center;\n    }\n\n    .ll-bento__lightbox-clickzone {\n      position: absolute;\n      inset: 0;\n      z-index: 2;\n      cursor: zoom-out;\n    }\n\n    .ll-bento__lightbox-overlay {\n      position: absolute;\n      left: clamp(18px, 5vw, 56px);\n      right: clamp(18px, 5vw, 56px);\n      bottom: clamp(18px, 5vw, 48px);\n      z-index: 3;\n      display: grid;\n      gap: 10px;\n      max-width: min(520px, calc(100% - 36px));\n      padding: clamp(14px, 3vw, 26px);\n      border: 1px solid rgba(255, 255, 255, 0.16);\n      border-radius: 22px;\n      color: #ffffff;\n      background:\n        linear-gradient(90deg, rgba(8, 13, 23, 0.82) 0%, rgba(8, 13, 23, 0.6) 62%, rgba(8, 13, 23, 0.22) 100%);\n      backdrop-filter: blur(7px);\n      pointer-events: none;\n    }\n\n    .ll-bento__lightbox-overlay .ll-bento__chip {\n      color: #ffffff;\n      background: rgba(15, 23, 42, 0.42);\n      backdrop-filter: blur(8px);\n    }\n\n    .ll-bento__lightbox-overlay .ll-bento__card-title {\n      max-width: 9ch;\n      margin: 0;\n      font-size: clamp(2.2rem, 7vw, 5.8rem);\n      line-height: 0.92;\n      text-shadow: 0 4px 16px rgba(0, 0, 0, 0.42);\n    }\n\n    .ll-bento__lightbox-overlay .ll-bento__card-text {\n      max-width: 42ch;\n      color: rgba(255, 255, 255, 0.9);\n      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.42);\n    }\n\n    .ll-bento__lightbox-close {\n      position: absolute;\n      top: 14px;\n      right: 14px;\n      z-index: 4;\n      display: grid;\n      place-items: center;\n      width: 38px;\n      height: 38px;\n      border-radius: 999px;\n      color: #ffffff;\n      background: rgba(19, 35, 58, 0.72);\n      backdrop-filter: blur(10px);\n      font-size: 1.4rem;\n      font-weight: 800;\n      line-height: 1;\n      cursor: pointer;\n      transition:\n        transform 0.18s ease,\n        background-color 0.18s ease;\n    }\n\n    .ll-bento__lightbox-close:hover,\n    .ll-bento__lightbox-close:focus-visible {\n      background: rgba(234, 91, 12, 0.92);\n      transform: scale(1.06);\n    }\n\n    .ll-bento__chip {\n      align-self: flex-start;\n      display: inline-flex;\n      align-items: center;\n      min-height: 28px;\n      padding: 6px 10px;\n      border-radius: 999px;\n      color: var(--ll-bento-accent);\n      background: rgba(234, 91, 12, 0.12);\n      font-size: 0.76rem;\n      font-weight: 900;\n      letter-spacing: 0.02em;\n      text-transform: uppercase;\n      transform: translateY(0);\n      transition:\n        transform 0.24s ease,\n        background-color 0.24s ease,\n        color 0.24s ease;\n    }\n\n    .ll-bento__card--hero .ll-bento__chip,\n    .ll-bento__card--wide .ll-bento__chip,\n    .ll-bento__card--dark .ll-bento__chip {\n      color: #ffffff;\n      background: rgba(255, 255, 255, 0.12);\n      backdrop-filter: blur(8px);\n    }\n\n    .ll-bento__card:hover .ll-bento__chip {\n      transform: translateY(-4px) scale(1.04);\n      background: rgba(234, 91, 12, 0.16);\n    }\n\n    .ll-bento__card--hero:hover .ll-bento__chip,\n    .ll-bento__card--wide:hover .ll-bento__chip,\n    .ll-bento__card--dark:hover .ll-bento__chip {\n      background: rgba(255, 255, 255, 0.16);\n    }\n\n    .ll-bento__card-title {\n      max-width: 12ch;\n      margin: 16px 0 8px;\n      color: inherit;\n      font-size: clamp(1.25rem, 2vw, 2.5rem);\n      line-height: 0.98;\n      font-weight: 900;\n      transition: transform 0.24s ease;\n    }\n\n    .ll-bento__card:hover .ll-bento__card-title {\n      transform: translateY(-5px);\n    }\n\n    .ll-bento__card--hero .ll-bento__card-title {\n      max-width: 10ch;\n      font-size: clamp(2.4rem, 5vw, 5.4rem);\n      letter-spacing: -0.02em;\n    }\n\n    .ll-bento__card--wide .ll-bento__card-title,\n    .ll-bento__card--dark .ll-bento__card-title {\n      max-width: 13ch;\n    }\n\n    .ll-bento__card--small:nth-of-type(4) .ll-bento__chip {\n      align-self: center;\n    }\n\n    .ll-bento__card--small:nth-of-type(4) .ll-bento__card-title {\n      max-width: 8ch;\n      margin: 10px 0 0;\n    }\n\n    .ll-bento__card--small:nth-of-type(4) .ll-bento__card-text {\n      display: none;\n    }\n\n    .ll-bento__card-text {\n      max-width: 46ch;\n      margin: 0;\n      color: var(--ll-bento-muted);\n      font-size: 0.95rem;\n      line-height: 1.55;\n    }\n\n    .ll-bento__card--hero .ll-bento__card-text,\n    .ll-bento__card--wide .ll-bento__card-text,\n    .ll-bento__card--dark .ll-bento__card-text {\n      color: rgba(255, 255, 255, 0.82);\n    }\n\n    .ll-bento__stat {\n      display: block;\n      margin: 12px 0 4px;\n      color: inherit;\n      font-size: clamp(2.2rem, 4vw, 4rem);\n      line-height: 0.9;\n      font-weight: 950;\n    }\n\n    .ll-bento__list {\n      display: grid;\n      gap: 8px;\n      padding: 0;\n      margin: 14px 0 0;\n      list-style: none;\n    }\n\n    .ll-bento__list li {\n      display: flex;\n      gap: 8px;\n      align-items: flex-start;\n      color: var(--ll-bento-muted);\n      font-size: 0.94rem;\n      line-height: 1.35;\n      transform: translateX(0);\n      transition:\n        color 0.2s ease,\n        transform 0.2s ease;\n    }\n\n    .ll-bento__card:hover .ll-bento__list li {\n      color: #334155;\n    }\n\n    .ll-bento__card:hover .ll-bento__list li:nth-child(1) {\n      transform: translateX(5px);\n    }\n\n    .ll-bento__card:hover .ll-bento__list li:nth-child(2) {\n      transform: translateX(9px);\n    }\n\n    .ll-bento__card:hover .ll-bento__list li:nth-child(3) {\n      transform: translateX(13px);\n    }\n\n    .ll-bento__list li::before {\n      content: \"\";\n      flex: 0 0 auto;\n      width: 7px;\n      height: 7px;\n      margin-top: 7px;\n      border-radius: 999px;\n      background: var(--ll-bento-accent);\n    }\n\n    .ll-bento__footer-note {\n      margin-top: 14px;\n      color: var(--ll-bento-muted);\n      font-size: 0.82rem;\n      line-height: 1.45;\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .ll-bento__card,\n      .ll-bento__card::before,\n      .ll-bento__chip,\n      .ll-bento__card-title,\n      .ll-bento__card-media,\n      .ll-bento__list li,\n      .ll-bento__media-action,\n      .ll-bento__lightbox,\n      .ll-bento__lightbox-close {\n        animation: none;\n        transition: none;\n      }\n\n      .ll-bento__card:hover,\n      .ll-bento__card--hero:hover,\n      .ll-bento__card--image:hover .ll-bento__card-media,\n      .ll-bento__card:hover .ll-bento__chip,\n      .ll-bento__card:hover .ll-bento__card-title,\n      .ll-bento__card:hover .ll-bento__list li,\n      .ll-bento__card--image:hover .ll-bento__media-action,\n      .ll-bento__card--hero:hover .ll-bento__media-action,\n      .ll-bento__lightbox-toggle:checked ~ .ll-bento__lightbox,\n      .ll-bento__lightbox-close:hover {\n        transform: none;\n      }\n    }\n\n    @media (max-width: 900px) {\n\n.ll-bento {\n        padding: 16px;\n      }\n\n      .ll-bento__grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n        grid-template-areas:\n          \"hero hero\"\n          \"summary image\"\n          \"use detail\"\n          \"check close\";\n        grid-auto-rows: auto;\n        gap: clamp(8px, 1.6vw, 12px);\n      }\n\n      .ll-bento__card {\n        min-height: clamp(124px, 21vw, 180px);\n        padding: clamp(12px, 2vw, 20px);\n        border-radius: clamp(16px, 2.8vw, 24px);\n      }\n\n      .ll-bento__card--wide,\n      .ll-bento__expand--image,\n      .ll-bento__card--small,\n      .ll-bento__card--dark,\n      .ll-bento__card--accent {\n        grid-column: span 1;\n      }\n\n      .ll-bento__card--wide {\n        grid-area: summary;\n        min-height: clamp(132px, 22vw, 180px);\n      }\n\n      .ll-bento__expand--image {\n        grid-area: image;\n        width: min(100%, 220px);\n        min-height: 0;\n        aspect-ratio: 1 / 1;\n        border-radius: 100%;\n        align-self: center;\n        justify-self: center;\n      }\n\n      .ll-bento__card--image {\n        width: 100%;\n        height: 100%;\n        padding: 0;\n        aspect-ratio: 1 / 1;\n        border-radius: 100%;\n      }\n\n      .ll-bento__expand--hero {\n        grid-area: hero;\n        grid-column: 1 / -1;\n        min-height: clamp(260px, 48vw, 380px);\n      }\n\n      .ll-bento__card--hero {\n        min-height: 100%;\n      }\n\n      .ll-bento__card--small {\n        min-height: 0;\n        aspect-ratio: 1 / 1;\n      }\n\n      .ll-bento__card--use {\n        grid-area: use;\n      }\n\n      .ll-bento__card--detail {\n        grid-area: detail;\n      }\n\n      .ll-bento__card--accent {\n        grid-area: check;\n        min-height: clamp(140px, 22vw, 200px);\n      }\n\n      .ll-bento__card--dark {\n        grid-area: close;\n        min-height: clamp(140px, 22vw, 200px);\n      }\n    }\n\n    @media (max-width: 560px) {\n\n.ll-bento {\n        padding: 10px;\n        border-radius: 28px;\n        background: var(--ll-bento-bg);\n        box-shadow: none;\n      }\n\n      .ll-bento__header {\n        gap: 4px;\n        margin-bottom: 8px;\n        padding: 4px 2px 0;\n      }\n\n      .ll-bento__eyebrow {\n        color: var(--ll-bento-accent);\n        font-size: 0.62rem;\n      }\n\n      .ll-bento__title {\n        color: var(--ll-bento-ink);\n        font-size: clamp(1.28rem, 7vw, 1.9rem);\n        line-height: 1;\n      }\n\n      .ll-bento__lead {\n        color: var(--ll-bento-muted);\n        font-size: 0.72rem;\n        line-height: 1.35;\n        max-width: 34ch;\n      }\n\n      .ll-bento__grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n        grid-template-areas:\n          \"hero hero\"\n          \"summary image\"\n          \"use detail\"\n          \"check close\";\n        grid-auto-rows: auto;\n        gap: 7px;\n      }\n\n      .ll-bento__card {\n        min-height: 106px;\n        padding: 10px;\n        border: 1px solid var(--ll-bento-line);\n        border-radius: 16px;\n        box-shadow: 0 2px 8px rgba(16, 24, 40, 0.035);\n      }\n\n      .ll-bento__expand--hero {\n        grid-column: 1 / -1;\n      }\n\n      .ll-bento__card--wide,\n      .ll-bento__expand--image,\n      .ll-bento__card--small,\n      .ll-bento__card--accent,\n      .ll-bento__card--dark {\n        grid-column: span 1;\n      }\n\n      .ll-bento__card--wide {\n        grid-area: summary;\n        min-height: 104px;\n        color: #ffffff;\n        background: var(--ll-bento-deep);\n      }\n\n      .ll-bento__expand--image {\n        grid-area: image;\n        min-height: 0;\n        width: 100%;\n        aspect-ratio: 1 / 1;\n        border-radius: 100%;\n      }\n\n      .ll-bento__card--image {\n        padding: 0;\n        overflow: hidden;\n        width: 100%;\n        aspect-ratio: 1 / 1;\n        border-radius: 100%;\n        background: #dbeafe;\n      }\n\n      .ll-bento__expand--hero {\n        grid-area: hero;\n        min-height: 235px;\n      }\n\n      .ll-bento__card--hero {\n        min-height: 235px;\n        background:\n          linear-gradient(135deg, rgba(19, 35, 58, 0.88) 0%, rgba(19, 35, 58, 0.55) 52%, rgba(19, 35, 58, 0.2) 100%),\n          url(\"https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-basic-cinza-praia-1225007-04.webp?ims=700x\") center / cover no-repeat;\n      }\n\n      .ll-bento__card--small {\n        min-height: 0;\n        aspect-ratio: 1 / 1;\n        color: var(--ll-bento-ink);\n        background: var(--ll-bento-card);\n      }\n\n      .ll-bento__card--use {\n        grid-area: use;\n      }\n\n      .ll-bento__card--detail {\n        grid-area: detail;\n        justify-content: center;\n        background: var(--ll-bento-card);\n      }\n\n      .ll-bento__card--detail {\n        display: grid;\n        place-items: center;\n        padding: 14px;\n        border-radius: 16px;\n        text-align: center;\n        background: #fff8f2;\n        border-color: rgba(234, 91, 12, 0.2);\n      }\n\n      .ll-bento__card--accent {\n        grid-area: check;\n        min-height: 116px;\n        color: var(--ll-bento-ink);\n        background: var(--ll-bento-accent-soft);\n      }\n\n      .ll-bento__card--dark {\n        grid-area: close;\n        min-height: 116px;\n        color: #ffffff;\n        background:\n          radial-gradient(circle at 88% 18%, rgba(234, 91, 12, 0.28), transparent 34%),\n          var(--ll-bento-deep);\n      }\n\n      .ll-bento__card--image picture {\n        display: block;\n        width: 100%;\n        height: 100%;\n      }\n\n      .ll-bento__card-media {\n        width: 100%;\n        height: 100%;\n        min-height: 0;\n        object-fit: cover;\n        object-position: center;\n      }\n\n      .ll-bento__card--hero .ll-bento__card-title {\n        max-width: 8ch;\n        font-size: clamp(2.25rem, 16vw, 4.5rem);\n        text-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);\n      }\n\n      .ll-bento__card-title {\n        max-width: 9ch;\n        margin: 8px 0 4px;\n        font-size: clamp(0.95rem, 4.8vw, 1.32rem);\n        line-height: 1;\n      }\n\n      .ll-bento__card--wide .ll-bento__card-title,\n      .ll-bento__card--accent .ll-bento__card-title,\n      .ll-bento__card--dark .ll-bento__card-title {\n        max-width: 13ch;\n      }\n\n      .ll-bento__card-text,\n      .ll-bento__list li,\n      .ll-bento__footer-note {\n        display: -webkit-box;\n        overflow: hidden;\n        color: currentColor;\n        opacity: 0.78;\n        font-size: 0.7rem;\n        line-height: 1.25;\n        -webkit-box-orient: vertical;\n        -webkit-line-clamp: 2;\n      }\n\n      .ll-bento__chip {\n        min-height: 21px;\n        padding: 4px 7px;\n        color: var(--ll-bento-accent);\n        background: rgba(234, 91, 12, 0.12);\n        font-size: 0.58rem;\n      }\n\n      .ll-bento__card--hero .ll-bento__chip,\n      .ll-bento__card--wide .ll-bento__chip,\n      .ll-bento__card--dark .ll-bento__chip {\n        color: #ffffff;\n        background: rgba(255, 255, 255, 0.18);\n      }\n\n      .ll-bento__stat {\n        margin: 6px 0 2px;\n        font-size: 1.72rem;\n      }\n\n      .ll-bento__list {\n        gap: 4px;\n        margin-top: 8px;\n      }\n\n      .ll-bento__list li:nth-child(n+3) {\n        display: none;\n      }\n\n      .ll-bento__media-action {\n        right: 8px;\n        bottom: 8px;\n        min-height: 28px;\n        padding: 6px 9px;\n        font-size: 0.66rem;\n        opacity: 1;\n        transform: none;\n      }\n\n      .ll-bento__card--image .ll-bento__media-action {\n        right: auto;\n        left: 50%;\n        bottom: 9px;\n        transform: translateX(-50%);\n      }\n\n      .ll-bento__card--detail .ll-bento__chip {\n        align-self: center;\n      }\n\n      .ll-bento__card--detail .ll-bento__card-title {\n        max-width: 8ch;\n        margin: 6px 0 0;\n      }\n\n      .ll-bento__card--detail .ll-bento__card-text {\n        display: none;\n      }\n    }\n</style>";

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
        createBentoBlock("image"),
        {
          ...createBentoBlock("text"),
          label: "Uso",
          title: "Pronto para rotina.",
          text: "Texto curto para uma situacao real de uso.",
          variant: "small"
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

      if (!state.bento.blocks.length) {
        state.bento.blocks = getDefaultBentoBlocks();
      }
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
      return { ...createBentoBlock(type), ...(block || {}), type };
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
      if (!canUseBentoBlockType(type)) {
        setBentoStatus(getBentoLimitMessage(type));
        renderEditor(true);
        return;
      }

      const insertIndex = findBentoInsertIndex(type);
      const block = createBentoBlock(type);
      if (type === "image" && ["rectangle", "circle"].includes(options.shape)) {
        block.shape = options.shape;
      }
      recordBentoUndo();
      state.bento.blocks.splice(insertIndex, 0, block);
      resetBentoCustomHtml();
      setBentoStatus("");
      renderEditor(true);
    }

    function removeBentoBlock(index) {
      ensureBentoState();
      if (state.bento.blocks.length <= 1) {
        setBentoStatus("O Bento precisa manter pelo menos um bloco.");
        renderEditor(true);
        return;
      }

      recordBentoUndo();
      state.bento.blocks.splice(index, 1);
      resetBentoCustomHtml();
      setBentoStatus("");
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
      if (!canUseBentoBlockType(type, index)) {
        setBentoStatus(getBentoLimitMessage(type));
        renderEditor(true);
        return;
      }

      recordBentoUndo();
      state.bento.blocks[index] = createBentoBlock(type);
      resetBentoCustomHtml();
      setBentoStatus("");
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

    function normalizeBentoResizeValue(value) {
      const numericValue = Number(value);
      return Number.isFinite(numericValue) && numericValue > 0
        ? Math.round(numericValue)
        : "";
    }

    function getBentoResizeStyle(block) {
      const width = normalizeBentoResizeValue(block.resizeWidth);
      const height = normalizeBentoResizeValue(block.resizeHeight);
      const styles = [];

      if (width) {
        styles.push(`width: ${width}px`);
      }

      if (height && (block.type !== "image" || block.shape !== "circle")) {
        styles.push(`height: ${height}px`);
      }

      return styles.length ? ` style="${styles.join("; ")}"` : "";
    }

    function renderBentoHeroBlock(block, index) {
      const id = `ll-bento-hero-${index}`;
      const rawImage = normalizeAssetUrl(block.image);
      const image = escapeBentoAttr(rawImage);
      const cssImage = escapeBentoAttr(rawImage.replaceAll('"', "%22").replaceAll("'", "%27").replaceAll(")", "%29"));
      return `<div class="ll-bento__expand ll-bento__expand--hero">
        <input class="ll-bento__lightbox-toggle" type="checkbox" id="${id}" aria-label="Abrir imagem principal ampliada">
        <div class="ll-bento__lightbox" aria-label="Imagem principal ampliada">
          <label class="ll-bento__lightbox-backdrop" for="${id}" aria-label="Fechar imagem principal ampliada"></label>
          <figure class="ll-bento__lightbox-panel ll-bento__lightbox-panel--text">
            <img src="${image}" alt="${escapeBentoAttr(block.alt)}">
            <label class="ll-bento__lightbox-clickzone" for="${id}" aria-label="Fechar imagem principal ampliada"></label>
            <div class="ll-bento__lightbox-overlay" aria-hidden="true">
              <span class="ll-bento__chip">${escapeHtml(block.label)}</span>
              <h3 class="ll-bento__card-title">${escapeHtml(block.title)}</h3>
              <p class="ll-bento__card-text">${escapeHtml(block.text)}</p>
            </div>
            <label class="ll-bento__lightbox-close" for="${id}" aria-label="Fechar imagem principal ampliada">x</label>
          </figure>
        </div>
        <article class="ll-bento__card ll-bento__card--hero" style="background-image: linear-gradient(135deg, rgba(19, 35, 58, 0.9) 0%, rgba(19, 35, 58, 0.58) 46%, rgba(19, 35, 58, 0.18) 100%), url(&quot;${cssImage}&quot;);">
          <div>
            <span class="ll-bento__chip">${escapeHtml(block.label)}</span>
            <h3 class="ll-bento__card-title">${escapeHtml(block.title)}</h3>
          </div>
          <p class="ll-bento__card-text">${escapeHtml(block.text)}</p>
          <span class="ll-bento__media-action" aria-hidden="true">Ampliar</span>
          <label class="ll-bento__image-button" for="${id}" aria-label="Ampliar imagem principal"></label>
        </article>
      </div>`;
    }

    function renderBentoTextBlock(block) {
      const stat = block.stat ? `<strong class="ll-bento__stat">${escapeHtml(block.stat)}</strong>` : "";
      const text = block.text ? `<p class="ll-bento__card-text">${escapeHtml(block.text)}</p>` : "";
      return `<article class="ll-bento__card ll-bento__card--text ${getBentoBlockClass(block)}"${getBentoResizeStyle(block)}>
        <span class="ll-bento__chip">${escapeHtml(block.label)}</span>
        <div>
          ${stat}
          <h3 class="ll-bento__card-title">${escapeHtml(block.title)}</h3>
          ${text}
        </div>
      </article>`;
    }

    function renderBentoImageBlock(block, index) {
      const id = `ll-bento-image-${index}`;
      const image = escapeBentoAttr(normalizeAssetUrl(block.image));
      const shapeClass = block.shape === "circle"
        ? "ll-bento__expand--image-circle"
        : "ll-bento__expand--image-square ll-bento__expand--image-rectangle";
      return `<div class="ll-bento__expand ll-bento__expand--image ${shapeClass}"${getBentoResizeStyle(block)}>
        <input class="ll-bento__lightbox-toggle" type="checkbox" id="${id}" aria-label="Abrir imagem ampliada">
        <div class="ll-bento__lightbox" aria-label="Imagem ampliada">
          <label class="ll-bento__lightbox-backdrop" for="${id}" aria-label="Fechar imagem ampliada"></label>
          <figure class="ll-bento__lightbox-panel">
            <img src="${image}" alt="${escapeBentoAttr(block.alt)}">
            <label class="ll-bento__lightbox-clickzone" for="${id}" aria-label="Fechar imagem ampliada"></label>
            <label class="ll-bento__lightbox-close" for="${id}" aria-label="Fechar imagem ampliada">x</label>
          </figure>
        </div>
        <figure class="ll-bento__card ll-bento__card--image ll-bento__card--image-square">
          <picture>
            <img class="ll-bento__card-media" src="${image}" alt="${escapeBentoAttr(block.alt)}">
          </picture>
          <span class="ll-bento__media-action" aria-hidden="true">Ampliar</span>
          <label class="ll-bento__image-button" for="${id}" aria-label="Ampliar imagem"></label>
        </figure>
      </div>`;
    }

    function renderBentoBlockHtml(block, index) {
      if (block.type === "hero") return renderBentoHeroBlock(block, index);
      if (block.type === "image") return renderBentoImageBlock(block, index);
      return renderBentoTextBlock(block);
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
  border-radius: 100%;
  resize: none;
  overflow: hidden;
  min-width: min(100%, 150px);
  min-height: 0;
  max-width: var(--ll-bento-resize-max-width, 100%);
  max-height: var(--ll-bento-resize-max-height, 560px);
}

.ll-bento__expand--image-circle:hover,
.ll-bento__expand--image-circle:focus-within {
  z-index: 6;
}

.ll-bento__expand--image-circle .ll-bento__card--image {
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 0;
  aspect-ratio: auto;
  border-radius: inherit;
}

.ll-bento__expand--image-circle picture,
.ll-bento__expand--image-circle .ll-bento__card-media {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: inherit;
}

.ll-bento__expand--image-circle .ll-bento__image-button {
  right: 18px;
  bottom: 34px;
}

@media (max-width: 900px) {
  .ll-bento__card--text {
    width: 100% !important;
    height: auto !important;
    max-width: 100% !important;
    max-height: none !important;
    resize: none;
  }

  .ll-bento__expand--image-square {
    width: 100% !important;
    height: auto !important;
    max-width: 100% !important;
    max-height: none !important;
    border-radius: clamp(16px, 2.8vw, 24px);
    align-self: start;
    justify-self: stretch;
    resize: none;
  }

  .ll-bento__expand--image-circle {
    grid-column: span 1 !important;
    grid-row: auto !important;
    width: clamp(128px, 35vw, 220px) !important;
    height: clamp(128px, 35vw, 220px) !important;
    min-width: 0 !important;
    max-width: 100% !important;
    max-height: none !important;
    aspect-ratio: 1 / 1 !important;
    border-radius: 100%;
    align-self: center;
    justify-self: center;
    resize: none;
  }
}

@media (max-width: 560px) {
  .ll-bento__expand--image-square {
    width: 100% !important;
    border-radius: 16px;
  }

  .ll-bento__expand--image-circle {
    grid-column: span 1 !important;
    width: clamp(118px, 40vw, 170px) !important;
    height: clamp(118px, 40vw, 170px) !important;
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

    function buildBentoStyle() {
      return `${getTabStyleAsset("bento", bentoStyle)}
${typeof buildTableStyle === "function" ? buildTableStyle() : ""}
${buildBentoRuntimePatch()}`;
    }

    function buildBentoSectionHtml() {
      ensureBentoState();
      const customHtml = state.bento && typeof state.bento.html === "string" ? state.bento.html.trim() : "";
      if (customHtml && state.bento.useCustomHtml) {
        return customHtml;
      }

      const header = state.bento.header;
      const blocks = state.bento.blocks.map(renderBentoBlockHtml).join("\n");
      return `<section class="ll-bento" aria-labelledby="ll-bento-title">
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
      const typeOptions = [
        ["hero", "HERO"],
        ["text", "Texto"],
        ["image", "Imagem"]
      ].map(([value, label]) => `<option value="${value}" ${block.type === value ? "selected" : ""}>${label}</option>`).join("");

      return `<details class="article-tab-editor" ${index === 0 ? "open" : ""}>
        <summary class="article-tab-editor__summary">
          <strong>Bloco ${index + 1}: ${escapeHtml(block.type)}</strong>
          <span class="article-tab-editor__meta">${escapeHtml(block.label || block.title || "Bento")}</span>
          <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
        </summary>
        <div class="article-editor__body">
          <div class="field-grid field-grid--two">
            <label class="field">
              <span>Tipo</span>
              <select data-bento-field="type" data-bento-block="${index}">${typeOptions}</select>
            </label>
            <div class="field field--button">
              <span>&nbsp;</span>
              <button class="button button--danger icon-button" type="button" data-action="remove-bento-block" data-bento-block="${index}" aria-label="Remover bloco" title="Remover bloco">${trashIcon()}</button>
            </div>
          </div>
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
        return `
          <label class="field">
            <span>Formato da imagem</span>
            <select data-bento-field="shape" data-bento-block="${index}">
              <option value="rectangle" ${block.shape !== "circle" ? "selected" : ""}>Retangulo redimensionavel</option>
              <option value="circle" ${block.shape === "circle" ? "selected" : ""}>Circulo proporcional</option>
            </select>
          </label>
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
        <label class="field">
          <span>Formato do card</span>
          <select data-bento-field="variant" data-bento-block="${index}">
            <option value="small" ${block.variant === "small" ? "selected" : ""}>Quadrado texto</option>
            <option value="small-center" ${block.variant === "small-center" ? "selected" : ""}>Quadrado centralizado</option>
            <option value="wide" ${block.variant === "wide" ? "selected" : ""}>Retangular largo</option>
            <option value="accent" ${block.variant === "accent" ? "selected" : ""}>Destaque claro</option>
            <option value="dark" ${block.variant === "dark" ? "selected" : ""}>Destaque escuro</option>
          </select>
        </label>
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
      const status = state.bento && state.bento.status ? `<span class="bulk-status" aria-live="polite">${escapeHtml(state.bento.status)}</span>` : "";
      const heroCount = countBentoBlocks("hero");
      const textCount = countBentoBlocks("text");
      const imageCount = countBentoBlocks("image");
      const addIcons = {
        hero: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="m5.5 17 4.5-4.5 3.3 3.2 2.2-2.2 3 3.2"></path><circle cx="8" cy="8.5" r="1.3"></circle></svg>`,
        text: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5h14"></path><path d="M12 5v14"></path><path d="M8 19h8"></path></svg>`,
        image: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="m5.5 17 4.5-4.5 3.3 3.2 2.2-2.2 3 3.2"></path><circle cx="8" cy="8.5" r="1.3"></circle></svg>`,
        imageCircle: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m5.8 16.4 4.3-4.2 3 2.8 2.1-2.1 3 3.1"></path><circle cx="9" cy="9" r="1.1"></circle></svg>`
      };
      const addOptions = [
        { type: "hero", title: "Hero", note: `${heroCount}/1`, disabled: !canUseBentoBlockType("hero") },
        { type: "text", title: "Texto", note: `${textCount}/5`, disabled: !canUseBentoBlockType("text") },
        { type: "image", shape: "rectangle", title: "Imagem", note: `${imageCount}/2`, disabled: !canUseBentoBlockType("image") },
        { type: "image", shape: "circle", title: "Circular", note: `${imageCount}/2`, disabled: !canUseBentoBlockType("image"), icon: "imageCircle" }
      ].map((option) => `
        <button class="bento-add-tile bento-add-tile--${option.type}${option.shape ? ` bento-add-tile--${option.shape}` : ""}" type="button" data-action="add-bento-block" data-bento-type="${option.type}" ${option.shape ? `data-bento-shape="${option.shape}"` : ""} ${option.disabled ? "disabled" : ""} aria-label="Adicionar bloco ${escapeHtml(option.title)}" title="Adicionar bloco ${escapeHtml(option.title)}">
          <span class="bento-add-tile__icon" aria-hidden="true">${addIcons[option.icon || option.type]}</span>
          <span class="bento-add-tile__plus" aria-hidden="true">+</span>
          <span class="bento-add-tile__copy">
            <strong>${option.title}</strong>
            <small>${option.note}</small>
          </span>
        </button>
      `).join("");

      return `
        <section class="article-editor bento-editor" aria-label="Editor Bento grid">
          <div class="editor-section-title">
            <div>
              <h3>Bento grid</h3>
              <p>Monte a grade com blocos controlados: 1 HERO, ate 5 textos e ate 2 imagens quadradas.</p>
            </div>
            <span class="bulk-status">${heroCount}/1 hero · ${textCount}/5 textos · ${imageCount}/2 imagens</span>
          </div>

          <details class="stories-guide article-image-guide">
            <summary class="stories-guide__summary">
              <strong>Guia rapido do Bento</strong>
              <span aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="stories-guide__body">
              <p><strong>Hero:</strong> apenas um por secao. Use imagem horizontal forte entre 1200x800 e 1600x1000.</p>
              <p><strong>Texto:</strong> ate 5 cards. Use titulos curtos para manter a grade escaneavel.</p>
              <p><strong>Imagem:</strong> ate 2 imagens quadradas. Arraste o canto para ampliar dentro da grade.</p>
            </div>
          </details>

          <details class="article-tab-editor article-base-editor" open>
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

          <div class="bento-add-panel">
            <div class="bento-add-panel__head">
              <strong>Adicionar bloco</strong>
              <span>Clique em um tipo para adicionar.</span>
            </div>
            <div class="bento-add-grid">
              ${addOptions}
            </div>
          </div>
          ${status}

          <div class="bento-block-list">
            ${state.bento.blocks.map(renderBentoBlockEditor).join("")}
          </div>
        </section>
      `;
    }
