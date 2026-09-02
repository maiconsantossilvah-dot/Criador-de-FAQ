    const faqStyle = `<style>
    #faq-section {
        width: 100%;
        padding: 0 16px;
        box-sizing: border-box;
        margin: 0 auto 24px;
        font-family: sans-serif;
    }

    #faq-section__header {
        color: #f1f1f1;
        margin: 0 0 12px;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.15px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "Noto Sans", "Liberation Sans", Arial, sans-serif;
        font-weight: 400;
        text-decoration: none;
    }

    #faq-section__title {
        text-align: center;
        align-items: flex-start;
        background: rgb(0, 157, 255);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        display: flex;
        flex-direction: row;
        height: 40px;
        margin: 0 0 8px;
        padding: 8px;
        width: 100%;
        box-sizing: border-box;
    }

    #faq-section__list {
        list-style: none;
        margin: 0 auto;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    #faq-section__item {
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 12px;
        overflow: hidden;
    }

    #faq-section__summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 16px;
        cursor: pointer;
        list-style: none;
        transition: background 0.15s ease;
    }

    #faq-section__summary::-webkit-details-marker {
        display: none;
    }

    #faq-section__summary:hover {
        background: #f9f9f9;
    }

    #faq-section__summary:focus-visible {
        outline: 2px solid #ea5b0c;
        outline-offset: -2px;
        border-radius: 12px;
    }

    #faq-section__q-text {
        font-size: clamp(0.875rem, 1.2vw, 1rem);
        font-weight: bold;
        color: #333;
        flex: 1;
        margin: 0;
        transition: color 0.15s ease;
        overflow-wrap: anywhere;
    }

    #faq-section__icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        position: relative;
    }

    #faq-section__icon::before,
    #faq-section__icon::after {
        content: '';
        position: absolute;
        background: rgb(46, 53, 56);
        border-radius: 2px;
        transition: transform 0.25s ease, opacity 0.25s ease;
    }

    #faq-section__icon::before {
        width: 12px;
        height: 1.5px;
        top: 9px;
        left: 4px;
    }

    #faq-section__icon::after {
        width: 1.5px;
        height: 12px;
        top: 4px;
        left: 9px;
    }

    #faq-section__details[open] #faq-section__icon::after {
        transform: rotate(90deg);
        opacity: 0;
    }

    #faq-section__a-inner {
        padding: 16px;
        border-top: 1px solid #e5e5e5;
    }

    #faq-section__a-text {
        font-size: clamp(0.75rem, 1vw, 0.875rem);
        color: rgb(46, 53, 56);
        line-height: 1.6;
        margin: 0;
        overflow-wrap: anywhere;
    }
</style>`;

    const tableStyle = `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .table-container-custom {
    background-color: #fff;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    margin: 0 auto 24px;
    display: block;
    overflow-x: auto;
  }

  .table-design-custom {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
  }

  .table-head-custom {
    color: rgb(255, 255, 255);
    border-radius: 10px;
  }

  .table-text-custom {
    padding: 8px 16px;
    text-align: left;
    border-bottom: 1px solid #979797;
    font-family: sans-serif;
    font-size: clamp(0.75rem, 1vw, 0.875rem);
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  .table-tr-custom:hover {
    background-color: #f1f1f1;
    filter: brightness(0.9);
  }

  .table-th-custom {
    background: var(--table-header-color, #ea5b0c);
    color: #fff;
    font-weight: bold;
    text-align: left;
  }

  .table-th-custom--first {
    border-radius: 10px 0 0 0;
  }

  .table-th-custom--last {
    border-radius: 0 10px 0 0;
  }

  .table-th-custom--single {
    border-radius: 10px 10px 0 0;
  }

  .table-td-custom {
    color: #555;
  }

  .table-tr-custom:nth-child(even) {
    background-color: #f1f1f1;
  }
__TABLE_HEADER_COLORS__
</style>`;

    function buildTableStyle() {
      const columnRules = getTableColumns().map((column, index) => {
        return `
  .table-th-custom--col-${index + 1} {
    --table-header-color: ${getTableHeaderColor(index)};
  }`;
      }).join("");

      return tableStyle.replace("__TABLE_HEADER_COLORS__", columnRules);
    }

    const storiesStyle = `<style>
  /* Guia rapido de midias:
     - Slide/story: proporcao 9:16. Recomendado 1080x1920 px. Minimo seguro 860x1530 px.
     - Poster de video: use a mesma proporcao do slide, preferencialmente 1080x1920 px.
     - Miniatura da bolinha: proporcao 1:1. Recomendado 400x400 px. Minimo seguro 220x220 px.
     - Desktop largo: o viewer muda para 16:10 e usa imagem em 960x para ocupar melhor a area.
     - Use imagens verticais nas maiores dimensoes possiveis. Em desktop largo existe zoom/corte, e arquivos maiores preservam nitidez.
     - Ajuste o foco da midia por slide para topo, centro ou base conforme a posicao do objeto principal.
     - Limites do componente: ate 3 containers e ate 4 slides por container.
     - Imagens horizontais funcionam, mas serao cortadas pelo object-fit: cover.
     - Formatos comuns: webp, jpg, png para imagem; webm ou mp4 para video.
  */
  .lp-stories {
    --story-max-width: 430px;
    --story-max-height: 68vh;
    --story-aspect-ratio: 9 / 16;
    --story-ring-size: 4.6rem;
    --story-thumb-size: 4.1rem;
    --story-ring-bg: conic-gradient(from -20deg, #ff9900, #111827, #ffcc66, #ff9900);
    width: min(100%, 520px);
    margin: 0 auto 2.5rem;
    padding: 0 0.8rem;
    font-family: sans-serif;
    color: #111827;
    position: relative;
  }

  .lp-stories__input {
    display: none;
  }

  .lp-stories__options {
    display: grid;
    grid-template-columns: repeat(var(--story-groups, 3), minmax(0, 1fr));
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .lp-stories--groups-1 .lp-stories__options {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .lp-stories--groups-2 .lp-stories__options {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lp-stories--groups-3 .lp-stories__options {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lp-stories__option {
    min-width: 0;
    padding: 0;
    border: 0;
    color: #111827;
    background: transparent;
    display: grid;
    justify-items: center;
    gap: 0.5rem;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: transform 160ms ease;
    user-select: none;
  }

  .lp-stories__option:hover {
    transform: translateY(-2px);
  }

  .lp-stories__option:focus-visible {
    outline: none;
  }

  .lp-stories__option:focus-visible .lp-stories__ring,
  #lp-story-produto-1:checked ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-2:checked ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-3:checked ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-4:checked ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-1:focus-visible ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-2:focus-visible ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-3:focus-visible ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-produto-4:focus-visible ~ .lp-stories__options .lp-stories__option--produto .lp-stories__ring,
  #lp-story-uso-1:checked ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-2:checked ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-3:checked ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-4:checked ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-1:focus-visible ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-2:focus-visible ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-3:focus-visible ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-uso-4:focus-visible ~ .lp-stories__options .lp-stories__option--uso .lp-stories__ring,
  #lp-story-detalhes-1:checked ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-2:checked ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-3:checked ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-4:checked ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-1:focus-visible ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-2:focus-visible ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-3:focus-visible ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring,
  #lp-story-detalhes-4:focus-visible ~ .lp-stories__options .lp-stories__option--detalhes .lp-stories__ring {
    outline: 3px solid rgba(255, 153, 0, 0.28);
    outline-offset: 4px;
  }

  .lp-stories__ring {
    width: var(--story-ring-size);
    height: var(--story-ring-size);
    padding: 4px;
    border-radius: 50%;
    background: var(--story-ring-bg);
    display: grid;
    place-items: center;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.14);
  }

  .lp-stories__thumb {
    width: var(--story-thumb-size);
    height: var(--story-thumb-size);
    border: 4px solid #fff;
    border-radius: 50%;
    object-fit: cover;
    background: #f1f5f9;
  }

  .lp-stories__name {
    max-width: 5.2rem;
    color: #334155;
    font-size: clamp(0.75rem, 1.2vw, 0.875rem);
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .lp-stories__panel {
    display: none;
  }

  .lp-stories__panel.is-default {
    display: block;
  }

  .lp-stories__input:checked ~ .lp-stories__panels .lp-stories__panel.is-default {
    display: none;
  }

  #lp-story-produto-1:checked ~ .lp-stories__panels .panel-produto-1,
  #lp-story-produto-2:checked ~ .lp-stories__panels .panel-produto-2,
  #lp-story-produto-3:checked ~ .lp-stories__panels .panel-produto-3,
  #lp-story-produto-4:checked ~ .lp-stories__panels .panel-produto-4,
  #lp-story-uso-1:checked ~ .lp-stories__panels .panel-uso-1,
  #lp-story-uso-2:checked ~ .lp-stories__panels .panel-uso-2,
  #lp-story-uso-3:checked ~ .lp-stories__panels .panel-uso-3,
  #lp-story-uso-4:checked ~ .lp-stories__panels .panel-uso-4,
  #lp-story-detalhes-1:checked ~ .lp-stories__panels .panel-detalhes-1,
  #lp-story-detalhes-2:checked ~ .lp-stories__panels .panel-detalhes-2,
  #lp-story-detalhes-3:checked ~ .lp-stories__panels .panel-detalhes-3,
  #lp-story-detalhes-4:checked ~ .lp-stories__panels .panel-detalhes-4 {
    display: block;
  }

  .lp-stories__viewer {
    width: min(100%, var(--story-max-width));
    max-height: var(--story-max-height);
    aspect-ratio: var(--story-aspect-ratio);
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    background: #020617;
    color: #fff;
    box-shadow: 0 18px 54px rgba(15, 23, 42, 0.22);
    isolation: isolate;
  }

  .lp-stories__viewer::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    height: 128px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0));
    pointer-events: none;
  }

  .lp-stories__progress {
    --slides: 3;
    --index: 1;
    --gap: 4px;
    position: absolute;
    z-index: 4;
    top: 12px;
    left: 12px;
    right: 12px;
    height: 3px;
    overflow: hidden;
    border-radius: 999px;
    background: repeating-linear-gradient(to right, rgba(255, 255, 255, 0.32) 0 calc((100% / var(--slides)) - var(--gap)), transparent calc((100% / var(--slides)) - var(--gap)) calc(100% / var(--slides)));
  }

  .lp-stories__progress::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, #fff 0 calc((100% / var(--slides)) * var(--index)), transparent 0);
    mask: repeating-linear-gradient(to right, #000 0 calc((100% / var(--slides)) - var(--gap)), transparent calc((100% / var(--slides)) - var(--gap)) calc(100% / var(--slides)));
  }

  .lp-stories__progress--slides-1 {
    --slides: 1;
  }

  .lp-stories__progress--slides-2 {
    --slides: 2;
  }

  .lp-stories__progress--slides-3 {
    --slides: 3;
  }

  .lp-stories__progress--slides-4 {
    --slides: 4;
  }

  .lp-stories__progress--index-1 {
    --index: 1;
  }

  .lp-stories__progress--index-2 {
    --index: 2;
  }

  .lp-stories__progress--index-3 {
    --index: 3;
  }

  .lp-stories__progress--index-4 {
    --index: 4;
  }

  .lp-stories__topbar {
    position: absolute;
    z-index: 5;
    top: 26px;
    left: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .lp-stories__avatar {
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    border: 2px solid rgba(255, 255, 255, 0.78);
    border-radius: 50%;
    object-fit: cover;
  }

  .lp-stories__title {
    min-width: 0;
    flex: 1;
    margin: 0;
    color: #fff;
    font-size: clamp(0.875rem, 1.2vw, 1rem);
    line-height: 1.2;
    font-weight: 700;
    overflow-wrap: anywhere;
    text-shadow: 0 1px 14px rgba(0, 0, 0, 0.45);
  }

  .lp-stories__step {
    font-size: clamp(0.75rem, 1vw, 0.875rem);
    font-weight: 700;
    text-shadow: 0 1px 14px rgba(0, 0, 0, 0.45);
  }

  .lp-stories__figure,
  .lp-stories__media,
  .lp-stories__picture {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .lp-stories__figure {
    position: relative;
  }

  .lp-stories__media {
    position: relative;
    z-index: 1;
    cursor: pointer;
  }

  .lp-stories__image,
  .lp-stories__video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center center;
    background: #020617;
  }

  .lp-stories__figure--focus-top .lp-stories__image,
  .lp-stories__figure--focus-top .lp-stories__video {
    object-position: center top;
  }

  .lp-stories__figure--focus-center .lp-stories__image,
  .lp-stories__figure--focus-center .lp-stories__video {
    object-position: center center;
  }

  .lp-stories__figure--focus-bottom .lp-stories__image,
  .lp-stories__figure--focus-bottom .lp-stories__video {
    object-position: center bottom;
  }

  .lp-stories__caption {
    position: absolute;
    z-index: 8;
    left: 16px;
    right: 16px;
    margin: 0;
    padding: 16px;
    border-radius: 8px;
    color: #fff;
    font-size: clamp(0.875rem, 1.4vw, 1rem);
    line-height: 1.35;
    overflow-wrap: anywhere;
    background: var(--story-caption-bg, linear-gradient(90deg, var(--story-caption-bg-start), var(--story-caption-bg-end)));
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.38);
    pointer-events: auto;
  }

  .lp-stories__caption.is-top {
    top: 84px;
  }

  .lp-stories__caption.is-bottom {
    bottom: 22px;
  }

  .lp-stories__nav {
    position: absolute;
    z-index: 5;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
  }

  .lp-stories__arrow {
    position: absolute;
    top: 0;
    bottom: 0;
    width: min(18%, 96px);
    height: 100%;
    border: 0;
    border-radius: 8px;
    color: transparent;
    background: transparent;
    cursor: pointer;
    display: grid;
    place-items: center;
    font-size: 0;
    line-height: 1;
    text-decoration: none;
    pointer-events: auto;
  }

  .lp-stories__arrow.prev {
    left: 0;
  }

  .lp-stories__arrow.next {
    right: 0;
  }

  @media (min-width: 576px) {
    .lp-stories {
      padding-inline: 1rem;
      --story-max-height: min(680px, 78vh);
      --story-ring-size: 5.25rem;
      --story-thumb-size: 4.75rem;
    }

    .lp-stories__options {
      gap: 1rem;
    }

    .lp-stories__name {
      max-width: 6rem;
    }

    .lp-stories__caption {
      border-radius: 12px;
    }

    .lp-stories__viewer {
      border-radius: 16px;
    }

    .lp-stories__nav {
      pointer-events: none;
    }

    .lp-stories__arrow.prev {
      display: grid;
      border-radius: 0 12px 12px 0;
    }

    .lp-stories__arrow {
      position: static;
      width: 48px;
      height: 56px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      color: #fff;
      background: rgba(15, 23, 42, 0.42);
      font-size: clamp(1.75rem, 3vw, 2rem);
    }

    .lp-stories__arrow.next {
      border-radius: 12px 0 0 12px;
    }
  }

  @media (min-width: 992px) {
    .lp-stories {
      --story-max-width: 960px;
      --story-max-height: none;
      --story-aspect-ratio: 16 / 10;
      width: min(100%, 1040px);
    }

    .lp-stories__viewer {
      width: min(100%, var(--story-max-width));
    }

    .lp-stories__caption {
      right: auto;
      max-width: 560px;
    }

    .lp-stories__caption.is-top {
      top: 96px;
    }

    .lp-stories__caption.is-bottom {
      bottom: 32px;
    }
  }
__STORIES_DYNAMIC_COLORS__
</style>`;

    function buildStoriesStyle() {
      const ringBackground = getStoryRingBackground();
      const captionGradient = parseCssGradient(state.stories.captionBackgroundColor);
      const captionBgStart = captionGradient ? captionGradient.start : hexToRgba(state.stories.captionBackgroundColor, 0.72);
      const captionBgEnd = captionGradient ? captionGradient.end : hexToRgba(state.stories.captionBackgroundColor, 0.46);
      const captionBg = captionGradient
        ? buildCssGradient(captionGradient.start, captionGradient.end, captionGradient.angle)
        : `linear-gradient(90deg, ${captionBgStart}, ${captionBgEnd})`;

      return storiesStyle.replace("__STORIES_DYNAMIC_COLORS__", `
  .lp-stories {
    --story-ring-bg: ${ringBackground};
    --story-caption-bg-start: ${captionBgStart};
    --story-caption-bg-end: ${captionBgEnd};
    --story-caption-bg: ${captionBg};
  }`);
    }

    const articleStyle = `<style>
  .ll-article {
    --ll-article-bg: linear-gradient(135deg, #111827, #3f3456);
    --ll-article-ink: #f8f5ec;
    --ll-article-muted: rgba(248, 245, 236, 0.74);
    --ll-article-line: rgba(248, 245, 236, 0.22);
    --ll-article-panel: rgba(18, 20, 25, 0.72);
    --ll-article-shell-bg: rgba(16, 18, 23, 1);
    --ll-article-tabs-panel: rgba(18, 20, 25, 0.72);
    --ll-article-accent: #f0b93e;
    --ll-article-teal: #0f8f8c;
    --ll-article-red: #d84d44;
    --ll-article-blue: #4f7be8;
    --ll-article-green: #75ad5c;
    --ll-article-radius: 8px;
    --ll-article-overlay-strong: rgba(0, 0, 0, 0.74);
    --ll-article-overlay-medium: rgba(0, 0, 0, 0.52);
    --ll-article-overlay-soft: rgba(0, 0, 0, 0.34);
    width: 100%;
    margin: 0 auto 28px;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: var(--ll-article-ink);
  }

  .ll-article__input {
    display: none;
  }

  .ll-article__shell {
    position: relative;
    overflow: hidden;
    min-height: 640px;
    isolation: isolate;
    background: var(--ll-article-shell-bg);
  }

  .ll-article__inner {
    display: grid;
    grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
    gap: clamp(20px, 4vw, 48px);
    align-items: stretch;
    width: min(1120px, calc(100% - 36px));
    margin: 0 auto;
    padding: clamp(28px, 6vw, 68px) 0;
  }

  .ll-article__tabs {
    display: grid;
    gap: 10px;
    align-content: start;
    padding: 14px;
    border: 1px solid var(--ll-article-line);
    border-radius: var(--ll-article-radius);
    background: var(--ll-article-tabs-panel);
    box-shadow: 0 24px 90px rgba(0, 0, 0, 0.36);
  }

  .ll-article__tabs-head {
    padding: 8px 8px 12px;
    border-bottom: 1px solid var(--ll-article-line);
  }

  .ll-article__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 10px;
    color: var(--ll-article-accent);
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    overflow-wrap: anywhere;
  }

  .ll-article__eyebrow::before {
    width: 28px;
    height: 2px;
    background: currentColor;
    content: "";
  }

  .ll-article__title {
    margin: 0 0 8px;
    color: var(--ll-article-ink);
    font-size: clamp(30px, 4vw, 44px);
    line-height: 0.96;
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

  .ll-article__intro,
  .ll-article__body {
    margin: 0;
    color: var(--ll-article-muted);
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  .ll-article__intro {
    font-size: clamp(0.875rem, 1.2vw, 1rem);
  }

  .ll-article__tab {
    display: grid;
    grid-template-columns: 38px minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    min-height: 66px;
    padding: 12px;
    border: 1px solid transparent;
    border-radius: var(--ll-article-radius);
    color: var(--ll-article-muted);
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .ll-article__tab:hover {
    transform: translateX(2px);
    border-color: var(--ll-article-line);
    background: rgba(248, 245, 236, 0.08);
    color: var(--ll-article-ink);
  }

  .ll-article__tab--no-icon {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .ll-article__tab-icon {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: 1px solid currentColor;
    border-radius: 50%;
    font-weight: 900;
  }

  .ll-article__tab-title {
    display: block;
    color: inherit;
    line-height: 1.08;
    overflow-wrap: anywhere;
  }

  .ll-article__tab-summary {
    display: block;
    margin-top: 4px;
    color: inherit;
    font-size: 12px;
    line-height: 1.28;
    opacity: 0.8;
    overflow-wrap: anywhere;
  }

  .ll-article__tab-key {
    display: grid;
    width: 24px;
    height: 24px;
    place-items: center;
    border: 1px solid currentColor;
    border-radius: 50%;
    font-size: 11px;
    font-weight: 900;
  }

  #ll-article-tab-1:checked ~ .ll-article__shell label[for="ll-article-tab-1"],
  #ll-article-tab-2:checked ~ .ll-article__shell label[for="ll-article-tab-2"],
  #ll-article-tab-3:checked ~ .ll-article__shell label[for="ll-article-tab-3"],
  #ll-article-tab-4:checked ~ .ll-article__shell label[for="ll-article-tab-4"],
  #ll-article-tab-5:checked ~ .ll-article__shell label[for="ll-article-tab-5"] {
    border-color: rgba(248, 245, 236, 0.72);
    background: rgba(248, 245, 236, 0.15);
    color: var(--ll-article-ink);
    box-shadow: 4px 4px 0 rgba(248, 245, 236, 0.12);
  }

  .ll-article__stage {
    min-height: 620px;
    overflow: hidden;
    border: 0;
    border-radius: var(--ll-article-radius);
    background: transparent;
    box-shadow: 0 24px 90px rgba(0, 0, 0, 0.36);
  }

  .ll-article__panel {
    position: relative;
    display: none;
    min-height: 620px;
    overflow: hidden;
    align-items: end;
    padding: clamp(24px, 5vw, 54px);
    isolation: isolate;
    background: transparent;
    background-position: center;
    background-size: cover;
  }

  /* O background-image inline e usado apenas para injetar a URL escolhida no gerador. */
  .ll-article__panel::before {
    position: absolute;
    inset: 0;
    z-index: -2;
    content: "";
    transform: scale(1.03);
  }

  .ll-article__panel::after {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(90deg, var(--ll-article-overlay-strong) 0 38%, var(--ll-article-overlay-medium) 64%, var(--ll-article-overlay-soft)),
      var(--ll-article-overlay-soft);
    content: "";
  }

  #ll-article-tab-1:checked ~ .ll-article__shell .ll-article__panel--1,
  #ll-article-tab-2:checked ~ .ll-article__shell .ll-article__panel--2,
  #ll-article-tab-3:checked ~ .ll-article__shell .ll-article__panel--3,
  #ll-article-tab-4:checked ~ .ll-article__shell .ll-article__panel--4,
  #ll-article-tab-5:checked ~ .ll-article__shell .ll-article__panel--5 {
    display: grid;
  }

  .ll-article__panel-copy {
    display: grid;
    position: relative;
    z-index: 3;
    gap: 16px;
    justify-items: start;
    max-width: 720px;
    align-self: end;
  }

  .ll-article__panel-copy .ll-article__eyebrow,
  .ll-article__panel-copy .ll-article__heading,
  .ll-article__panel-copy .ll-article__body {
    margin: 0;
  }

  .ll-article__heading {
    max-width: 14ch;
    color: var(--ll-article-ink);
    font-size: clamp(38px, 6vw, 82px);
    line-height: 0.9;
    letter-spacing: 0;
    overflow-wrap: anywhere;
    text-shadow: 0 3px 24px rgba(0, 0, 0, 0.64);
  }

  .ll-article__body {
    max-width: 62ch;
    font-size: clamp(0.9375rem, 1.4vw, 1.0625rem);
    overflow-wrap: anywhere;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.68);
  }

  .ll-article__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0;
  }

  .ll-article__tag {
    display: inline-flex;
    align-items: center;
    min-height: 32px;
    padding: 8px 12px;
    border: 1px solid var(--ll-article-line);
    border-radius: 999px;
    background: rgba(248, 245, 236, 0.08);
    color: var(--ll-article-ink);
    font-size: clamp(0.75rem, 1vw, 0.8125rem);
    line-height: 1.2;
    font-weight: 900;
    overflow-wrap: anywhere;
  }

  @media (max-width: 900px) {
    .ll-article__inner {
      grid-template-columns: 1fr;
      align-items: start;
    }

    .ll-article__tabs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
      gap: 8px;
      align-items: stretch;
      overflow: visible;
    }

    .ll-article__tabs-head {
      grid-column: 1 / -1;
      padding: 6px 6px 8px;
      border-right: 0;
      border-bottom: 1px solid var(--ll-article-line);
    }

    .ll-article__eyebrow {
      margin-bottom: 6px;
      font-size: 11px;
    }

    .ll-article__eyebrow::before {
      width: 20px;
    }

    .ll-article__title {
      margin-bottom: 0;
      font-size: clamp(24px, 6.8vw, 34px);
      line-height: 1;
    }

    .ll-article__intro {
      display: none;
    }

    .ll-article__tab {
      grid-template-columns: 28px minmax(0, 1fr);
      gap: 8px;
      min-height: 54px;
      padding: 8px;
    }

    .ll-article__tab--no-icon {
      grid-template-columns: minmax(0, 1fr);
    }

    .ll-article__tab-icon {
      width: 28px;
      height: 28px;
      font-size: 12px;
    }

    .ll-article__tab-summary {
      display: none;
    }

    .ll-article__tab-title {
      font-size: 12px;
      line-height: 1.15;
    }

    .ll-article__tab-key {
      display: none;
    }

    .ll-article__panel::after {
      background:
        linear-gradient(180deg, var(--ll-article-overlay-strong), var(--ll-article-overlay-medium)),
        var(--ll-article-overlay-soft);
    }
  }

  @media (max-width: 560px) {
    .ll-article__shell {
      min-height: 0;
    }

    .ll-article__inner {
      width: min(100%, 340px);
      padding: 18px 0 32px;
    }

    .ll-article__tabs {
      padding: 8px;
    }

    .ll-article__stage,
    .ll-article__panel {
      min-height: 0;
    }

    .ll-article__panel {
      padding: 22px;
    }

    .ll-article__heading {
      font-size: clamp(34px, 11vw, 48px);
    }

    .ll-article__body {
      font-size: 15px;
    }
  }
__ARTICLE_DYNAMIC_COLORS__
</style>`;
    const carouselStyle = `<style>
  .ll-carousel {
    --ll-carousel-brand: #ff9900;
    --ll-carousel-ink: #14202b;
    --ll-carousel-muted: #586675;
    --ll-carousel-soft: #f4f7f9;
    --ll-carousel-panel: #ffffff;
    --ll-carousel-line: #d9e2ea;
    --ll-carousel-section-bg: var(--ll-carousel-soft);
    --ll-carousel-dot-hover: #f0f3f5;
    --ll-carousel-dot-active: #e7ecef;
    --ll-carousel-dot-active-border: #c8d2da;
    --ll-carousel-dot-icon-bg: #f0ede8;
    --ll-carousel-dot-icon-color: var(--ll-carousel-ink);
    --ll-carousel-dot-icon-active-bg: var(--ll-carousel-brand);
    --ll-carousel-dot-icon-active-color: #ffffff;
    --ll-carousel-indicator-color: rgba(255, 255, 255, 0.5);
    --ll-carousel-indicator-active-color: #ffffff;
    --ll-carousel-shadow: 0 1.5rem 3rem rgba(13, 35, 51, 0.12);
    background: var(--ll-carousel-section-bg);
    color: var(--ll-carousel-ink);
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
  }

  .ll-carousel__container {
    box-sizing: border-box;
    container-name: ll-carousel-container;
    container-type: inline-size;
    margin-inline: auto;
    padding: 2rem 1rem;
    width: 100%;
  }

  .ll-carousel__control {
    display: none;
  }

  .ll-carousel__intro {
    display: grid;
    gap: 1rem;
    justify-items: center;
    margin-block-end: 1.5rem;
    text-align: center;
  }

  .ll-carousel--hide-intro .ll-carousel__intro {
    display: none;
  }

  .ll-carousel__eyebrow,
  .ll-carousel__title,
  .ll-carousel__lead,
  .ll-carousel__dot-number,
  .ll-carousel__dot-text,
  .ll-carousel__layout-eyebrow,
  .ll-carousel__layout-title,
  .ll-carousel__layout-text {
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

  .ll-carousel__eyebrow {
    color: var(--ll-carousel-brand);
    font-size: clamp(0.75rem, 0.72rem + 0.16vw, 0.875rem);
    font-weight: 700;
    line-height: 1.4;
    margin: 0;
    text-transform: uppercase;
  }

  .ll-carousel__title {
    font-size: clamp(1.75rem, 1.34rem + 1.76vw, 3rem);
    line-height: 1.08;
    margin: 0;
  }

  .ll-carousel__lead {
    color: var(--ll-carousel-muted);
    font-size: clamp(0.9375rem, 0.9rem + 0.16vw, 1.0625rem);
    line-height: 1.6;
    margin: 0;
    max-width: 54rem;
  }

  .ll-carousel__viewport {
    aspect-ratio: 16 / 10;
    border: 1px solid var(--ll-carousel-line);
    border-radius: 1rem;
    box-shadow: var(--ll-carousel-shadow);
    box-sizing: border-box;
    isolation: isolate;
    margin-inline: auto;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    width: min(100%, 1280px);
  }

  .ll-carousel__track {
    display: grid;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .ll-carousel__panel {
    background: var(--ll-carousel-panel);
    box-sizing: border-box;
    grid-area: 1 / 1;
    height: 100%;
    inset: 0;
    max-width: 100%;
    min-width: 0;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    transform: translateX(100%);
    transition: transform 0.8s ease, opacity 0.4s ease;
    width: 100%;
    z-index: 1;
  }

  .ll-carousel__layout {
    box-sizing: border-box;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    width: 100%;
  }

  .ll-carousel__layout--impact {
    --ll-carousel-impact-bg: #f16425;
    --ll-carousel-impact-text: #fff7ef;
    --ll-carousel-impact-muted: rgba(255, 247, 239, 0.84);
    align-content: center;
    align-items: center;
    background: var(--ll-carousel-impact-bg);
    background-image: var(--ll-carousel-impact-gradient, none);
    color: var(--ll-carousel-impact-text);
    display: grid;
    gap: clamp(1.5rem, 3vw, 3.5rem);
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
    grid-template-rows: minmax(0, 1fr);
    min-height: 0;
    padding: clamp(1.5rem, 3.4vw, 3.5rem);
  }

  .ll-carousel__layout--impact > * {
    min-height: 0;
    min-width: 0;
  }

  .ll-carousel__layout-copy {
    align-self: center;
    display: grid;
    gap: clamp(0.7rem, 1vw, 1.05rem);
    justify-self: start;
    max-height: 100%;
    max-width: min(43ch, 100%);
    min-width: 0;
  }

  .ll-carousel__layout-eyebrow {
    font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.95rem);
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
  }

  .ll-carousel__layout-title {
    font-size: clamp(2rem, 3.25vw, 4rem);
    font-weight: 800;
    line-height: 1.02;
    margin: 0;
    max-width: 100%;
    text-wrap: balance;
  }

  .ll-carousel__layout-text {
    color: var(--ll-carousel-impact-muted);
    font-size: clamp(0.95rem, 1vw, 1.12rem);
    line-height: 1.45;
    margin: 0;
    max-width: 100%;
  }

  .ll-carousel__media-card {
    aspect-ratio: auto;
    border-radius: 1.25rem;
    box-shadow: 0 1.5rem 3rem rgba(20, 32, 43, 0.22);
    height: 100%;
    margin-block: auto;
    max-height: 82%;
    max-width: min(100%, 38rem);
    overflow: hidden;
    place-self: center end;
    position: relative;
    width: 100%;
  }

  .ll-carousel__layout--impact-reverse {
    grid-template-columns: minmax(0, 1.14fr) minmax(0, 0.86fr);
  }

  .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
  }

  .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
    grid-column: 1;
    grid-row: 1;
    place-self: center start;
  }

  .ll-carousel__image,
  .ll-carousel__picture,
  .ll-carousel__video {
    display: block;
    height: 100%;
    width: 100%;
  }

  .ll-carousel__image,
  .ll-carousel__video {
    object-fit: cover;
    object-position: center;
  }

  .ll-carousel__layout--media {
    background: var(--ll-carousel-media-bg, #101217);
    padding: 0;
  }

  .ll-carousel__figure {
    height: 100%;
    margin: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .ll-carousel__figure .ll-carousel__image,
  .ll-carousel__figure .ll-carousel__video {
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: center;
  }

  .ll-carousel__caption {
    align-items: flex-start;
    background: var(--ll-carousel-caption-bg, rgba(0, 0, 0, 0.48));
    bottom: var(--ll-carousel-caption-bottom, auto);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 1.25rem;
    box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.28);
    color: var(--ll-carousel-caption-text, #fff);
    display: grid;
    gap: 0.65rem;
    left: var(--ll-carousel-caption-left, clamp(1.25rem, 5vw, 4.75rem));
    max-width: min(42%, 34rem);
    padding: clamp(1rem, 2.5vw, 2rem);
    position: absolute;
    right: var(--ll-carousel-caption-right, auto);
    top: var(--ll-carousel-caption-top, 50%);
    transform: translate(var(--ll-carousel-caption-translate-x, 0), var(--ll-carousel-caption-translate-y, -50%));
    z-index: 5;
  }

  .ll-carousel__caption h3 {
    font-size: clamp(1.35rem, 2.4vw, 3rem);
    line-height: 1.05;
    margin: 0;
    overflow-wrap: anywhere;
  }

  .ll-carousel__caption p {
    font-size: clamp(0.85rem, 1.15vw, 1.15rem);
    line-height: 1.45;
    margin: 0;
    overflow-wrap: anywhere;
  }

  .ll-carousel__nav {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: 0.75rem auto 0;
    max-width: 1280px;
    width: min(100%, 1280px);
  }

  .ll-carousel__dot {
    align-items: center;
    background: var(--ll-carousel-panel);
    border: 1px solid var(--ll-carousel-line);
    border-radius: 0.75rem;
    box-sizing: border-box;
    color: var(--ll-carousel-ink);
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    min-height: 3.9rem;
    padding: 0.75rem 1rem;
    transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease, transform 0.4s ease;
  }

  .ll-carousel__dot:hover {
    background: var(--ll-carousel-dot-hover);
    border-color: var(--ll-carousel-dot-active-border);
    transform: translateY(-0.25rem);
  }

  .ll-carousel__dot-copy {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }

  .ll-carousel__dot-number {
    color: var(--ll-carousel-brand);
    font-size: clamp(0.75rem, 0.72rem + 0.16vw, 0.875rem);
    font-weight: 700;
    line-height: 1;
  }

  .ll-carousel__dot-text {
    font-size: clamp(0.875rem, 0.84rem + 0.16vw, 1rem);
    font-weight: 700;
    line-height: 1.2;
  }

  .ll-carousel__dot-icon {
    align-items: center;
    background: var(--ll-carousel-dot-icon-bg);
    border-radius: 50%;
    color: var(--ll-carousel-dot-icon-color);
    display: flex;
    flex: 0 0 auto;
    height: 42px;
    justify-content: center;
    transition: background 0.25s ease, color 0.25s ease;
    width: 42px;
  }

  .ll-carousel__dot-icon svg {
    display: block;
    height: 22px;
    width: 22px;
  }

  .ll-carousel__dot-icon-img {
    display: block;
    height: 70%;
    object-fit: contain;
    width: 70%;
  }

  .ll-carousel__side-hint {
    align-items: center;
    background: transparent;
    border: 0;
    color: transparent;
    cursor: pointer;
    display: none;
    font-size: 0;
    height: 100%;
    justify-content: center;
    line-height: 1;
    opacity: 1;
    pointer-events: auto;
    position: absolute;
    top: 0;
    transform: none;
    width: min(18%, 9rem);
    z-index: 25;
  }

  .ll-carousel__side-hint--prev {
    left: 0;
  }

  .ll-carousel__side-hint--next {
    right: 0;
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
  .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__panel--2,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__panel--3,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--4 {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
    z-index: 2;
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__viewport .ll-carousel__side-hint--1,
  .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__side-hint--2,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__side-hint--3,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__side-hint--4 {
    display: flex;
  }

  .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__panel--2,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--1,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--2,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__panel--3 {
    transform: translateX(-100%);
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__nav .ll-carousel__dot--1,
  .ll-carousel__control--2:checked ~ .ll-carousel__nav .ll-carousel__dot--2,
  .ll-carousel__control--3:checked ~ .ll-carousel__nav .ll-carousel__dot--3,
  .ll-carousel__control--4:checked ~ .ll-carousel__nav .ll-carousel__dot--4 {
    background: var(--ll-carousel-dot-active);
    border-color: var(--ll-carousel-dot-active-border);
    color: var(--ll-carousel-ink);
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-number,
  .ll-carousel__control--2:checked ~ .ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-number,
  .ll-carousel__control--3:checked ~ .ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-number,
  .ll-carousel__control--4:checked ~ .ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-number,
  .ll-carousel__control--1:checked ~ .ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-text,
  .ll-carousel__control--2:checked ~ .ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-text,
  .ll-carousel__control--3:checked ~ .ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-text,
  .ll-carousel__control--4:checked ~ .ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-text {
    color: var(--ll-carousel-brand);
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__nav .ll-carousel__dot--1 .ll-carousel__dot-icon,
  .ll-carousel__control--2:checked ~ .ll-carousel__nav .ll-carousel__dot--2 .ll-carousel__dot-icon,
  .ll-carousel__control--3:checked ~ .ll-carousel__nav .ll-carousel__dot--3 .ll-carousel__dot-icon,
  .ll-carousel__control--4:checked ~ .ll-carousel__nav .ll-carousel__dot--4 .ll-carousel__dot-icon {
    background: var(--ll-carousel-dot-icon-active-bg);
    color: var(--ll-carousel-dot-icon-active-color);
  }

  .ll-carousel__indicators {
    bottom: 1rem;
    display: flex;
    gap: 7px;
    left: 50%;
    pointer-events: none;
    position: absolute;
    transform: translateX(-50%);
    z-index: 20;
  }

  .ll-carousel--hide-indicators .ll-carousel__indicators {
    display: none;
  }

  .ll-carousel__indicator {
    background: var(--ll-carousel-indicator-color);
    border-radius: 50%;
    display: block;
    height: 8px;
    transition: background 0.3s ease, width 0.3s ease;
    width: 8px;
  }

  .ll-carousel__control--1:checked ~ .ll-carousel__viewport .ll-carousel__indicator--1,
  .ll-carousel__control--2:checked ~ .ll-carousel__viewport .ll-carousel__indicator--2,
  .ll-carousel__control--3:checked ~ .ll-carousel__viewport .ll-carousel__indicator--3,
  .ll-carousel__control--4:checked ~ .ll-carousel__viewport .ll-carousel__indicator--4 {
    background: var(--ll-carousel-indicator-active-color);
    border-radius: 4px;
    width: 20px;
  }

  @media (max-width: 760px) {
    .ll-carousel__container {
      padding: 1rem 0.75rem;
    }

    .ll-carousel__intro {
      gap: 0.65rem;
      margin-block-end: 1rem;
    }

    .ll-carousel__title {
      font-size: clamp(1.45rem, 7vw, 2rem);
    }

    .ll-carousel__lead {
      font-size: 0.9rem;
      line-height: 1.45;
    }

    .ll-carousel__viewport {
      aspect-ratio: 4 / 5;
      border-radius: 0.95rem;
    }

    .ll-carousel__layout--impact {
      align-content: center;
      gap: 0.9rem;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      padding: 1rem;
    }

    .ll-carousel__layout--impact .ll-carousel__layout-copy {
      grid-column: 1;
      grid-row: 1;
      justify-self: stretch;
      max-width: none;
    }

    .ll-carousel__layout--impact .ll-carousel__media-card {
      grid-column: 1;
      grid-row: 2;
      place-self: center;
    }

    .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
      grid-row: 2;
    }

    .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
      grid-row: 1;
    }

    .ll-carousel__layout-title {
      font-size: clamp(1.3rem, 6vw, 1.85rem);
      line-height: 1.04;
    }

    .ll-carousel__layout-text {
      font-size: 0.8rem;
      line-height: 1.32;
    }

    .ll-carousel__media-card {
      border-radius: 0.8rem;
      max-height: 100%;
      max-width: 100%;
    }

    .ll-carousel__layout--media {
      background: var(--ll-carousel-media-bg, #0d2333);
      padding: 0.65rem;
    }

    .ll-carousel__figure {
      display: block;
      height: 100%;
    }

    .ll-carousel__figure .ll-carousel__picture,
    .ll-carousel__figure > .ll-carousel__video {
      background: #101821;
      border-radius: 0.75rem;
      display: block;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ll-carousel__figure .ll-carousel__image,
    .ll-carousel__figure .ll-carousel__video {
      aspect-ratio: auto;
      height: 100%;
      object-fit: cover;
      object-position: center;
      width: 100%;
    }

    .ll-carousel__caption {
      background: var(--ll-carousel-caption-bg, rgba(0, 0, 0, 0.62));
      border-radius: 0.85rem;
      bottom: var(--ll-carousel-caption-bottom, 0.72rem);
      left: var(--ll-carousel-caption-left, 0.72rem);
      max-width: min(86%, 26rem);
      padding: 0.72rem;
      position: absolute;
      right: var(--ll-carousel-caption-right, auto);
      top: var(--ll-carousel-caption-top, auto);
      transform: translate(var(--ll-carousel-caption-translate-x, 0), var(--ll-carousel-caption-translate-y, 0));
    }

    .ll-carousel__caption h3 {
      font-size: clamp(1.05rem, 5vw, 1.45rem);
    }

    .ll-carousel__caption p {
      font-size: 0.76rem;
      line-height: 1.3;
    }

    .ll-carousel__nav {
      gap: 0.35rem;
      margin-block-start: 0.65rem;
    }

    .ll-carousel__dot {
      border-radius: 0.55rem;
      gap: 0.45rem;
      justify-content: space-between;
      min-height: 3rem;
      padding: 0.55rem 0.42rem;
      text-align: center;
    }

    .ll-carousel__dot:hover {
      transform: none;
    }

    .ll-carousel__dot-number {
      display: none;
    }

    .ll-carousel__dot-text {
      font-size: 0.78rem;
      line-height: 1.05;
    }

    .ll-carousel__dot-icon {
      height: 36px;
      width: 36px;
    }

    .ll-carousel__dot-icon svg {
      height: 18px;
      width: 18px;
    }

    .ll-carousel__side-hint {
      width: 28%;
    }
  }

  @container ll-carousel-container (max-width: 620px) {
    .ll-carousel__viewport {
      aspect-ratio: 4 / 5;
      border-radius: 0.95rem;
    }

    .ll-carousel__layout--impact {
      align-content: center;
      gap: 0.9rem;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      padding: 1rem;
    }

    .ll-carousel__layout--impact .ll-carousel__layout-copy {
      grid-column: 1;
      grid-row: 1;
      justify-self: stretch;
      max-width: none;
    }

    .ll-carousel__layout--impact .ll-carousel__media-card {
      grid-column: 1;
      grid-row: 2;
      place-self: center;
    }

    .ll-carousel__layout--impact-reverse .ll-carousel__layout-copy {
      grid-row: 2;
    }

    .ll-carousel__layout--impact-reverse .ll-carousel__media-card {
      grid-row: 1;
    }

    .ll-carousel__layout-title {
      font-size: clamp(1.3rem, 7.5cqw, 1.85rem);
    }

    .ll-carousel__layout-text {
      font-size: 0.8rem;
      line-height: 1.32;
    }

    .ll-carousel__layout--media {
      background: var(--ll-carousel-media-bg, #0d2333);
      padding: 0.65rem;
    }

    .ll-carousel__figure {
      display: block;
      height: 100%;
    }

    .ll-carousel__figure .ll-carousel__picture,
    .ll-carousel__figure > .ll-carousel__video {
      background: #101821;
      border-radius: 0.75rem;
      display: block;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ll-carousel__figure .ll-carousel__image,
    .ll-carousel__figure .ll-carousel__video {
      aspect-ratio: auto;
      height: 100%;
      object-fit: cover;
      object-position: center;
      width: 100%;
    }

    .ll-carousel__caption {
      background: var(--ll-carousel-caption-bg, rgba(0, 0, 0, 0.62));
      border-radius: 0.85rem;
      bottom: var(--ll-carousel-caption-bottom, 0.72rem);
      left: var(--ll-carousel-caption-left, 0.72rem);
      max-width: min(86%, 26rem);
      padding: 0.72rem;
      position: absolute;
      right: var(--ll-carousel-caption-right, auto);
      top: var(--ll-carousel-caption-top, auto);
      transform: translate(var(--ll-carousel-caption-translate-x, 0), var(--ll-carousel-caption-translate-y, 0));
    }

    .ll-carousel__caption h3 {
      font-size: clamp(1.05rem, 5.5cqw, 1.45rem);
    }

    .ll-carousel__caption p {
      font-size: 0.76rem;
      line-height: 1.3;
    }

    .ll-carousel__nav {
      gap: 0.35rem;
      margin-block-start: 0.65rem;
    }

    .ll-carousel__dot {
      border-radius: 0.55rem;
      gap: 0;
      justify-items: center;
      min-height: 3rem;
      padding: 0.55rem 0.42rem;
      text-align: center;
    }

    .ll-carousel__dot:hover {
      transform: none;
    }

    .ll-carousel__dot-number {
      display: none;
    }

    .ll-carousel__dot-text {
      font-size: 0.78rem;
      line-height: 1.05;
    }
  }
__CAROUSEL_DYNAMIC_COLORS__
</style>`;
    const state = {
      faqBulkInput: "",
      faqBulkStatus: "",
      responsive: {
        previewDevice: "desktop",
        editDevice: "base",
        dirty: false,
        baseSnapshots: {},
        saved: {
          faq: {},
          table: {},
          stories: {},
          article: {},
          carousel: {},
          template: {}
        }
      },
      presets: {
        name: "",
        dirty: false,
        selected: {
          faq: "",
          table: "",
          stories: "",
          article: "",
          carousel: "",
          template: ""
        },
        items: {
          faq: [],
          table: [],
          stories: [],
          article: [],
          carousel: [],
          template: []
        }
      },
      dashboard: {
        view: "layouts"
      },
      textStyles: {
        faq: {},
        table: {},
        stories: {},
        article: {},
        carousel: {},
        template: {}
      },
      items: [
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" }
      ],
      table: {
        caption: "",
        headerColor: "#ea5b0c",
        headerColors: ["#ea5b0c", "#ea5b0c"],
        bulkInput: "",
        status: "",
        columns: ["SKU", "TÍTULO"],
        rows: [
          ["", ""],
          ["", ""],
          ["", ""]
        ]
      },
      template: {
        sourceLayout: "carousel",
        header: {
          type: "none",
          imageUrl: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header.jpg",
          imageAlt: "",
          videoUrl: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-precon.webm",
          posterUrl: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header_precon.webp",
          logoUrl: "https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/precon/logo-precon.png",
          logoLabel: "Logo da marca dentro de um circulo laranja",
          brand: "marca",
          title: "Titulo curto do produto",
          subtitle: "Descricao breve do produto, destacando os principais atributos de forma clara."
        },
        html: "",
        status: ""
      },
      stories: {
        ariaLabel: "Stories visuais e representativos do produto",
        avatar: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/logo-havaianas.webp",
        ringStyle: "gradient",
        ringColor: "#ff262b",
        ringGradientStart: "#ff262b",
        ringGradientEnd: "#9e070a",
        captionBackgroundColor: "#020617",
        previewGroupIndex: 0,
        previewSlideIndex: 0,
        openGroupIndex: -1,
        groups: [
          {
            key: "produto",
            name: "Pra quem ama o mar",
            thumb: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-estudio-1225024-02.webp",
            slides: [
              {
                type: "image",
                src: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-estudio-1225024-02.webp",
                poster: "",
                alt: "Havaianas Top Nautical branco e marinho nos pes em estudio com fundo claro",
                caption: "Listras classicas para quem e do mar.",
                captionPosition: "top",
                mediaFocus: "bottom"
              },
              {
                type: "image",
                src: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-estudio-1225024-03.webp",
                poster: "",
                alt: "Havaianas Top Nautical marinho e branco nos pes em estudio de moda",
                caption: "Top Nautical no pe, leveza no dia.",
                captionPosition: "top",
                mediaFocus: "bottom"
              }
            ]
          },
          {
            key: "uso",
            name: "Estilo e Conforto",
            thumb: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-rua-cafe-1225024-04.webp",
            slides: [
              {
                type: "image",
                src: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-rua-cafe-1225024-04.webp",
                poster: "",
                alt: "Havaianas Top Nautical branco e marinho nos pes em calcada com cafe ao fundo",
                caption: "Estilo atemporal para sair leve.",
                captionPosition: "top",
                mediaFocus: "bottom"
              },
              {
                type: "image",
                src: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-piscina-1225024-05.webp",
                poster: "",
                alt: "Havaianas Top Nautical marinho e branco nos pes a beira da piscina",
                caption: "Solado 100% borracha, pronto para dias de piscina.",
                captionPosition: "top",
                mediaFocus: "bottom"
              }
            ]
          },
          {
            key: "detalhes",
            name: "Sempre com voce",
            thumb: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-deck-praia-1225024-06.webp",
            slides: [
              {
                type: "image",
                src: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-branco-marinho-deck-praia-1225024-06.webp",
                poster: "",
                alt: "Havaianas Top Nautical branco e marinho nos pes sobre deck de madeira na praia",
                caption: "Do calcadao ao mar em cada passo.",
                captionPosition: "top",
                mediaFocus: "bottom"
              },
              {
                type: "image",
                src: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/chinelo-havaianas-top-nautical-listrado-marinho-branco-praia-ondas-1225024-07.webp",
                poster: "",
                alt: "Havaianas Top Nautical marinho e branco nos pes na areia com ondas do mar",
                caption: "Na areia, pertinho do mar.",
                captionPosition: "top",
                mediaFocus: "bottom"
              }
            ]
          }
        ]
      },
      carousel: {
        ariaLabel: "Diferenciais do Difusor de Aromas Glade Frutas e Flores Vibrantes 100ml",
        showIntro: true,
        eyebrow: "",
        title: "",
        lead: "",
        brandColor: "#ee6911",
        softColor: "#f3f6fb",
        sectionGradientEnabled: true,
        sectionGradientStart: "#ffffff",
        sectionGradientEnd: "#fff0f6",
        dotHoverColor: "#fff9f2",
        dotActiveColor: "#fff4e0",
        dotActiveBorderColor: "#ee6911",
        dotIconBackgroundColor: "#f0ede8",
        dotIconActiveBackgroundColor: "#ee6911",
        dotIconActiveColor: "#ffffff",
        showIndicators: true,
        indicatorColor: "#ffffff",
        indicatorActiveColor: "#ffffff",
        previewSlideIndex: 0,
        openBase: false,
        openSlideIndex: -1,
        slides: [
          {
            type: "impact",
            navLabel: "Aroma",
            navIcon: "heart",
            navIconImage: "",
            eyebrow: "Ambiente perfumado",
            title: "Frutas e flores vibrantes no ambiente",
            text: "Fragrância envolvente para deixar o ambiente mais agradável, com difusão contínua pelas varetas.",
            image: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/difusor-aromas-glade-frutas-flores-vibrantes-varetas-frasco-detalhe-1704533-01.webp",
            alt: "Difusor de Aromas Glade Frutas e Flores Vibrantes 100ml",
            backgroundColor: "#c82a57",
            gradientEnabled: true,
            gradientEndColor: "#f26d93",
            gradientAngle: 323,
            textColor: "#fffdf8",
            focusX: 50,
            focusY: 50,
            reverse: false
          },
          {
            type: "decision",
            navLabel: "Varetas",
            navIcon: "bottle",
            navIconImage: "",
            captionTitle: "Uso simples com varetas",
            captionText: "Desenrosque e remova a tampa, insira as varetas na garrafa, separe as varetas e mantenha o frasco em pé.",
            image: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/difusor-aromas-glade-frutas-flores-vibrantes-embalagem-frasco-hero-banner-1704533-02.webp",
            alt: "Difusor Glade com embalagem, frasco e varetas",
            focusX: 86,
            focusY: 50,
            captionHorizontal: "left",
            captionVertical: "center",
            textColor: "#ffffff",
            backgroundColor: "#000000",
            captionOpacity: 0.64,
            mediaBackgroundColor: "#c82a57"
          },
          {
            type: "impact",
            navLabel: "Fragrância",
            navIcon: "sparkles",
            navIconImage: "",
            eyebrow: "Fragrância",
            title: "Aroma vibrante para decorar e perfumar",
            text: "Composição com álcool etílico, dipropileno glicol metil éter acetato e fragrância.",
            image: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/difusor-aromas-glade-frutas-flores-vibrantes-ingredientes-cereja-textura-1704533-03.webp",
            alt: "Ingredientes visuais do Difusor Glade Frutas e Flores Vibrantes",
            backgroundColor: "#c82a57",
            gradientEnabled: true,
            gradientEndColor: "#f26d93",
            gradientAngle: 323,
            textColor: "#fffdf8",
            focusX: 50,
            focusY: 50,
            reverse: true
          },
          {
            type: "decision",
            navLabel: "Cuidados",
            navIcon: "box",
            navIconImage: "",
            captionTitle: "Cuidados no uso",
            captionText: "Use apenas em áreas bem ventiladas, mantenha longe do fogo e de fontes de ignição, e limpe a superfície em caso de derramamento.",
            image: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/difusor-aromas-glade-frutas-flores-vibrantes-sala-estar-decoracao-lifestyle-1704533-04.webp",
            alt: "Difusor Glade Frutas e Flores Vibrantes em ambiente decorado",
            focusX: 22,
            focusY: 50,
            captionHorizontal: "center",
            captionVertical: "center",
            textColor: "#ffffff",
            backgroundColor: "#000000",
            captionOpacity: 0.64,
            mediaBackgroundColor: "#c82a57"
          }
        ]
      },
      article: {
        ariaLabel: "Layout de artigo com modos de leitura",
        backgroundImage: "assets/brainstorm-hero.png",
        shellBackgroundEnabled: true,
        shellBackgroundColor: "#101217",
        shellBackgroundOpacity: 1,
        tabsProtectionEnabled: true,
        tabsProtectionColor: "#121419",
        tabsProtectionOpacity: 0.72,
        overlayEnabled: true,
        overlayColor: "#000000",
        overlayOpacity: 0.74,
        eyebrow: "Artigo interativo",
        title: "Escolha o ritmo da leitura.",
        intro: "As abas mudam o texto do bloco sobre imagens de fundo escurecidas para manter contraste e leitura confortavel.",
        openBase: false,
        openTabIndex: -1,
        tabs: [
          {
            elements: { icon: true, summary: true, image: true, eyebrow: true, heading: true, body: true, tags: true },
            icon: "C",
            label: "Compacto",
            summary: "Escanear, comparar e decidir rapido.",
            eyebrow: "Modo compacto",
            heading: "Resumo para decidir sem perder tempo.",
            body: "O layout reduz a leitura a blocos curtos, sinais visuais e comparacoes diretas. E bom para dashboards editoriais, hubs de conteudo e paginas com muitos caminhos.",
            tags: "Alta densidade, Leitura rapida, Comparacao",
            image: "assets/brainstorm-hero.png"
          },
          {
            elements: { icon: true, summary: true, image: true, eyebrow: true, heading: true, body: true, tags: true },
            icon: "A",
            label: "Amplo",
            summary: "Texto mais editorial e respiro visual.",
            eyebrow: "Modo amplo",
            heading: "Uma leitura com mais ar e presenca.",
            body: "O conteudo ganha imagem, titulo grande e uma coluna de texto mais confortavel. Serve para artigos, ensaios, manifestos e conteudos que precisam de tom editorial.",
            tags: "Editorial, Imagem forte, Respirado",
            image: "assets/brainstorm-hero.png"
          },
          {
            elements: { icon: true, summary: true, image: true, eyebrow: true, heading: true, body: true, tags: true },
            icon: "F",
            label: "Foco",
            summary: "Uma ideia principal por vez.",
            eyebrow: "Modo foco",
            heading: "Uma frase guia a experiencia inteira.",
            body: "Quando a mensagem principal precisa ficar memoravel, o layout reduz a interface e coloca uma ideia no centro. Bom para insights, citacoes e momentos de decisao.",
            tags: "Baixo ruido, Contraste alto, Uma ideia",
            image: "assets/brainstorm-hero.png"
          },
          {
            elements: { icon: true, summary: true, image: true, eyebrow: true, heading: true, body: true, tags: true },
            icon: "E",
            label: "Estudo",
            summary: "Notas, marcadores e aprendizado.",
            eyebrow: "Modo estudo",
            heading: "Notas em camadas para aprender melhor.",
            body: "O painel organiza conceitos em passos curtos, marcadores e lembretes. Funciona para aulas, documentacao, guias internos e conteudos explicativos.",
            tags: "Passo a passo, Notas, Retencao",
            image: "assets/brainstorm-hero.png"
          },
          {
            elements: { icon: true, summary: true, image: true, eyebrow: true, heading: true, body: true, tags: true },
            icon: "P",
            label: "Pitch",
            summary: "Argumento, prova e chamada.",
            eyebrow: "Modo pitch",
            heading: "Argumento visual para convencer rapido.",
            body: "O layout combina promessa, prova e tres argumentos curtos. Bom para landing pages, propostas, ofertas e apresentacoes de produto.",
            tags: "Promessa, Prova, Acao",
            image: "assets/brainstorm-hero.png"
          }
        ]
      }
    };

    const editor = document.querySelector("#faqEditor");
    const editorTools = document.querySelector("#editorTools");
    const generatedHtml = document.querySelector("#generatedHtml");
    const previewCanvas = document.querySelector("#previewCanvas");
    const previewFrame = document.querySelector("#previewFrame");
    const previewDeviceLabel = document.querySelector("#previewDeviceLabel");
    const previewDeviceButtons = Array.from(document.querySelectorAll("[data-preview-device]"));
    const responsivePreviewSaveButtons = Array.from(document.querySelectorAll("[data-responsive-preview-save]"));
    const responsivePreviewRemoveButtons = Array.from(document.querySelectorAll("[data-responsive-preview-remove]"));
    const copyStatus = document.querySelector("#copyStatus");
    const themeToggle = document.querySelector("#themeToggle");
    const homeThemeToggle = document.querySelector("#homeThemeToggle");
    const brandHomeButton = document.querySelector("[data-brand-home]");
    const appTitle = document.querySelector("#appTitle");
    const appSubtitle = document.querySelector("#appSubtitle");
    const outputTitle = document.querySelector("#outputTitle");
    const pageLinks = Array.from(document.querySelectorAll("[data-page-link]"));
    const editorTabButtons = Array.from(document.querySelectorAll("[data-editor-tab]"));
    const homeReturnButtons = Array.from(document.querySelectorAll("[data-dashboard-home-return]"));
    const addButtons = [document.querySelector("#addItem")].filter(Boolean);
    const htmlCopyButtons = Array.from(document.querySelectorAll('[data-copy-mode="html"]'));
    const fullCopyButtons = Array.from(document.querySelectorAll('[data-copy-mode="full"]'));
    const previewFullscreenButtons = Array.from(document.querySelectorAll("[data-preview-fullscreen]"));
    const focusModeButtons = Array.from(document.querySelectorAll("[data-focus-mode]"));
    const codeFocusModeButtons = Array.from(document.querySelectorAll("[data-code-focus-mode]"));
    let previewEditPopover = null;
    let previewEditOutsideHandler = null;
    let previewEditKeyHandler = null;
    let isPreviewFullscreen = false;
    let isFocusMode = false;
    let isCodeFocusMode = false;
    let templatePreviewUpdateTimer = 0;
    const fixedStartPage = document.documentElement.dataset.startPage || document.body?.dataset.startPage || "";
    let currentPage = fixedStartPage || "home";
    let currentEditorTab = "dashboard";
    const previewDevices = [
      { key: "mobile", label: "Celular", width: 390 },
      { key: "tablet", label: "Tablet", width: 768 },
      { key: "notebook", label: "Notebook", width: 1024 },
      { key: "desktop", label: "Desktop", width: 1280 }
    ];
    const responsiveEditDevices = [
      { key: "base", label: "Geral", note: "Os campos normais continuam valendo para todos os tamanhos." },
      { key: "mobile", label: "Celular", note: "Esses ajustes entram em telas pequenas, ate 560px." },
      { key: "tablet", label: "Tablet", note: "Esses ajustes entram entre 561px e 1024px." },
      { key: "desktop", label: "Desktop", note: "Esses ajustes entram acima de 1025px." }
    ];
    const responsiveDefaults = {
      titleScale: 100,
      textScale: 100,
      spacingScale: 100,
      radiusScale: 100,
      extraCss: ""
    };
    const responsiveMediaQueries = {
      mobile: "(max-width: 560px)",
      tablet: "(min-width: 561px) and (max-width: 1024px)",
      desktop: "(min-width: 1025px)"
    };
    const storyLimits = {
      minContainers: 1,
      maxContainers: 3,
      minSlides: 1,
      maxSlides: 4
    };
    const articleLimits = {
      minTabs: 1,
      maxTabs: 5
    };
    const carouselLimits = {
      minSlides: 1,
      maxSlides: 4
    };
    const templateCacheKey = "layoutLabTemplateHtml";
    const storyGroupPresets = [
      { key: "produto", name: "Produto" },
      { key: "uso", name: "Uso" },
      { key: "detalhes", name: "Detalhes" }
    ];

    const pageConfigs = {
      home: {
        title: "Layout Lab",
        subtitle: "Escolha a equipe para começar.",
        outputTitle: "",
        copyLabel: "",
        fullCopyLabel: "",
        copiedStatus: "",
        fullCopiedStatus: ""
      },
      conteudo: {
        title: "Layout Lab",
        subtitle: "Monte layouts de conteudo com FAQ, tabela, stories, artigo, carrossel ou LP e copie HTML ou HTML/CSS conforme a necessidade.",
        outputTitle: "Prévia do layout",
        copyLabel: "Copiar HTML",
        fullCopyLabel: "Copiar HTML/CSS",
        copiedStatus: "HTML copiado.",
        fullCopiedStatus: "HTML/CSS copiado."
      },
      tecnica: {
        title: "Layout Lab",
        subtitle: "Monte layouts tecnicos em FAQ e copie o bloco completo com HTML e CSS.",
        outputTitle: "HTML/CSS pronto",
        copyLabel: "Copiar HTML/CSS",
        fullCopyLabel: "",
        copiedStatus: "HTML/CSS copiado.",
        fullCopiedStatus: ""
      }
    };

    function cloneValue(value) {
      return JSON.parse(JSON.stringify(value));
    }

    function getCurrentPresetTab() {
      return currentPage === "conteudo" && currentEditorTab !== "dashboard" ? currentEditorTab : "faq";
    }

    function getResponsiveTab() {
      return currentPage === "conteudo" && currentEditorTab !== "dashboard" ? currentEditorTab : "faq";
    }

    function getSnapshotTextStyles(tab) {
      return cloneValue((state.textStyles && state.textStyles[tab]) || {});
    }

    function applySnapshotTextStyles(tab, snapshot) {
      state.textStyles = state.textStyles || {};
      state.textStyles[tab] = cloneValue(snapshot && snapshot.textStyles ? snapshot.textStyles : {});
    }

    function getTabSnapshot(tab = getResponsiveTab()) {
      if (tab === "table") {
        return { table: cloneValue(state.table), textStyles: getSnapshotTextStyles(tab) };
      }

      if (tab === "stories") {
        return { stories: cloneValue(state.stories), textStyles: getSnapshotTextStyles(tab) };
      }

      if (tab === "article") {
        return { article: cloneValue(state.article), textStyles: getSnapshotTextStyles(tab) };
      }

      if (tab === "carousel") {
        return { carousel: cloneValue(state.carousel), textStyles: getSnapshotTextStyles(tab) };
      }

      if (tab === "template") {
        return { template: cloneValue(state.template), textStyles: getSnapshotTextStyles(tab) };
      }

      return {
        items: cloneValue(state.items),
        faqBulkInput: state.faqBulkInput,
        faqBulkStatus: state.faqBulkStatus,
        textStyles: getSnapshotTextStyles("faq")
      };
    }

    function applyTabSnapshot(tab, snapshot) {
      if (!snapshot) {
        return;
      }

      if (tab === "table" && snapshot.table) {
        state.table = cloneValue(snapshot.table);
        applySnapshotTextStyles(tab, snapshot);
        return;
      }

      if (tab === "stories" && snapshot.stories) {
        state.stories = cloneValue(snapshot.stories);
        applySnapshotTextStyles(tab, snapshot);
        return;
      }

      if (tab === "article" && snapshot.article) {
        state.article = cloneValue(snapshot.article);
        applySnapshotTextStyles(tab, snapshot);
        return;
      }

      if (tab === "carousel" && snapshot.carousel) {
        state.carousel = cloneValue(snapshot.carousel);
        applySnapshotTextStyles(tab, snapshot);
        return;
      }

      if (tab === "template" && snapshot.template) {
        state.template = cloneValue(snapshot.template);
        applySnapshotTextStyles(tab, snapshot);
        return;
      }

      if (Array.isArray(snapshot.items)) {
        state.items = cloneValue(snapshot.items);
        state.faqBulkInput = snapshot.faqBulkInput || "";
        state.faqBulkStatus = snapshot.faqBulkStatus || "";
        applySnapshotTextStyles("faq", snapshot);
      }
    }

    function getBaseSnapshot(tab = getResponsiveTab()) {
      if (state.responsive.editDevice === "base" && tab === getResponsiveTab()) {
        return getTabSnapshot(tab);
      }

      return cloneValue(state.responsive.baseSnapshots[tab] || getTabSnapshot(tab));
    }

    function rememberBaseSnapshot(tab = getResponsiveTab()) {
      if (state.responsive.editDevice === "base") {
        state.responsive.baseSnapshots[tab] = getTabSnapshot(tab);
      }
    }

    function markResponsiveDirty() {
      if (currentPage === "conteudo" && state.responsive.editDevice !== "base") {
        state.responsive.dirty = true;
      }
    }

    function confirmDiscardResponsiveDraft() {
      if (!state.responsive.dirty) {
        return true;
      }

      const shouldDiscard = window.confirm("Existem alterações responsivas sem salvar. Sair sem salvar vai descartar essa versão. Continuar?");
      if (shouldDiscard) {
        state.responsive.dirty = false;
      }

      return shouldDiscard;
    }

    function returnToBaseVersion() {
      const tab = getResponsiveTab();
      if (state.responsive.editDevice === "base") {
        rememberBaseSnapshot(tab);
        return true;
      }

      if (!confirmDiscardResponsiveDraft()) {
        return false;
      }

      applyTabSnapshot(tab, getBaseSnapshot(tab));
      state.responsive.editDevice = "base";
      state.responsive.dirty = false;
      return true;
    }

    function setResponsiveEditDevice(device, options = {}) {
      const validDevice = responsiveEditDevices.some((item) => item.key === device) ? device : "base";
      const tab = getResponsiveTab();

      if (validDevice === state.responsive.editDevice) {
        if (options.previewDevice) {
          state.responsive.previewDevice = options.previewDevice;
          updatePreviewDeviceUi();
          updateOutput({ preservePreviewScroll: false });
        }
        return;
      }

      if (!confirmDiscardResponsiveDraft()) {
        return;
      }

      if (state.responsive.editDevice === "base") {
        rememberBaseSnapshot(tab);
      }

      if (validDevice === "base") {
        applyTabSnapshot(tab, getBaseSnapshot(tab));
        if (options.previewDevice) {
          state.responsive.previewDevice = options.previewDevice;
        }
      } else {
        const versionSnapshot = state.responsive.saved[tab] && state.responsive.saved[tab][validDevice]
          ? state.responsive.saved[tab][validDevice]
          : getBaseSnapshot(tab);
        applyTabSnapshot(tab, versionSnapshot);
        state.responsive.previewDevice = options.previewDevice || (validDevice === "desktop" ? "desktop" : validDevice);
      }

      state.responsive.editDevice = validDevice;
      state.responsive.dirty = false;
      renderEditor(true);
    }

    function saveResponsiveDraft() {
      const tab = getResponsiveTab();
      const device = state.responsive.editDevice;

      if (device === "base") {
        rememberBaseSnapshot(tab);
        return;
      }

      state.responsive.saved[tab] = state.responsive.saved[tab] || {};
      state.responsive.saved[tab][device] = getTabSnapshot(tab);
      state.responsive.dirty = false;
      renderEditor(true);
    }

    function discardResponsiveDraft() {
      const tab = getResponsiveTab();
      const device = state.responsive.editDevice;

      if (device === "base") {
        return;
      }

      const savedVersion = state.responsive.saved[tab] && state.responsive.saved[tab][device];
      applyTabSnapshot(tab, savedVersion || getBaseSnapshot(tab));
      state.responsive.dirty = false;
      renderEditor(true);
    }

    function removeResponsiveVersion() {
      const tab = getResponsiveTab();
      const device = state.responsive.editDevice;

      if (device === "base") {
        return;
      }

      const shouldRemove = window.confirm("Remover esta versão responsiva salva?");
      if (!shouldRemove) {
        return;
      }

      if (state.responsive.saved[tab]) {
        delete state.responsive.saved[tab][device];
      }
      applyTabSnapshot(tab, getBaseSnapshot(tab));
      state.responsive.dirty = false;
      renderEditor(true);
    }

    function resetResponsiveForTab(tab) {
      state.responsive.saved[tab] = {};
      delete state.responsive.baseSnapshots[tab];
      state.responsive.dirty = false;
      state.responsive.editDevice = "base";
    }

    function hasResponsiveVersion(tab, device) {
      return Boolean(state.responsive.saved[tab] && state.responsive.saved[tab][device]);
    }

    function getResponsiveVersionList(tab = getResponsiveTab()) {
      return ["mobile", "tablet", "desktop"].filter((device) => hasResponsiveVersion(tab, device));
    }

    function normalizeResponsiveScale(value) {
      const numericValue = Number(value);
      if (!Number.isFinite(numericValue)) {
        return 100;
      }

      return Math.min(160, Math.max(60, Math.round(numericValue)));
    }

    function sanitizeResponsiveCss(value) {
      return String(value || "").replace(/<\/style/gi, "<\\/style");
    }

    function scaledPx(value, scale) {
      return `${(value * scale).toFixed(2).replace(/\.?0+$/, "")}px`;
    }

    function scaledRem(value, scale) {
      return `${(value * scale).toFixed(3).replace(/\.?0+$/, "")}rem`;
    }

    function buildResponsiveRulesForTab(tab, settings) {
      const titleScale = normalizeResponsiveScale(settings.titleScale) / 100;
      const textScale = normalizeResponsiveScale(settings.textScale) / 100;
      const spacingScale = normalizeResponsiveScale(settings.spacingScale) / 100;
      const radiusScale = normalizeResponsiveScale(settings.radiusScale) / 100;
      const extraCss = sanitizeResponsiveCss(settings.extraCss).trim();
      const rules = [];

      if (tab === "faq") {
        rules.push(`#faq-section { padding-inline: ${scaledPx(16, spacingScale)}; }`);
        rules.push(`#faq-section__title { font-size: ${scaledPx(20, titleScale)}; border-radius: ${scaledPx(4, radiusScale)}; }`);
        rules.push(`#faq-section__q-text, #faq-section__a-text { font-size: ${scaledPx(14, textScale)}; }`);
        rules.push(`#faq-section__summary, #faq-section__a-inner { padding: ${scaledPx(14, spacingScale)}; }`);
      }

      if (tab === "table") {
        rules.push(`.table-container-custom { padding: ${scaledPx(20, spacingScale)}; border-radius: ${scaledPx(10, radiusScale)}; }`);
        rules.push(`.table-text-custom { font-size: ${scaledPx(14, textScale)}; padding: ${scaledPx(12, spacingScale)}; }`);
        rules.push(`.table-th-custom { font-size: ${scaledPx(14, titleScale)}; }`);
      }

      if (tab === "stories") {
        rules.push(`.lp-stories { padding: ${scaledPx(16, spacingScale)}; }`);
        rules.push(`.lp-stories__viewer { border-radius: ${scaledPx(18, radiusScale)}; }`);
        rules.push(`.lp-stories__title, .lp-stories__caption { font-size: ${scaledPx(16, titleScale)}; }`);
        rules.push(`.lp-stories__name, .lp-stories__step { font-size: ${scaledPx(12, textScale)}; }`);
      }

      if (tab === "article") {
        rules.push(`.ll-article__inner { padding-block: ${scaledPx(28, spacingScale)}; }`);
        rules.push(`.ll-article__tabs, .ll-article__stage, .ll-article__panel { border-radius: ${scaledPx(8, radiusScale)}; }`);
        rules.push(`.ll-article__title { font-size: clamp(${scaledPx(30, titleScale)}, ${scaledPx(40, titleScale)}, ${scaledPx(58, titleScale)}); }`);
        rules.push(`.ll-article__heading { font-size: clamp(${scaledPx(34, titleScale)}, ${scaledPx(52, titleScale)}, ${scaledPx(76, titleScale)}); }`);
        rules.push(`.ll-article__intro, .ll-article__body, .ll-article__tab-summary { font-size: ${scaledPx(15, textScale)}; }`);
      }

      if (tab === "carousel") {
        rules.push(`.ll-carousel__container { padding: ${scaledRem(2, spacingScale)} ${scaledRem(1, spacingScale)}; }`);
        rules.push(`.ll-carousel__viewport, .ll-carousel__dot, .ll-carousel__caption, .ll-carousel__media-card { border-radius: ${scaledRem(1, radiusScale)}; }`);
        rules.push(`.ll-carousel__title { font-size: clamp(${scaledRem(1.75, titleScale)}, ${scaledRem(2.35, titleScale)}, ${scaledRem(3, titleScale)}); }`);
        rules.push(`.ll-carousel__layout-title { font-size: clamp(${scaledRem(2, titleScale)}, ${scaledRem(3, titleScale)}, ${scaledRem(4, titleScale)}); }`);
        rules.push(`.ll-carousel__lead, .ll-carousel__layout-text, .ll-carousel__caption p, .ll-carousel__dot-text { font-size: ${scaledRem(1, textScale)}; }`);
      }

      if (extraCss) {
        rules.push(extraCss);
      }

      return rules.join("\n  ");
    }

    function hasResponsiveSettings(settings) {
      return ["titleScale", "textScale", "spacingScale", "radiusScale"].some((key) => {
        return normalizeResponsiveScale(settings[key]) !== responsiveDefaults[key];
      }) || String(settings.extraCss || "").trim();
    }

    function buildResponsiveStyle(tab = getResponsiveTab(), options = {}) {
      return "";
    }

    function renderPresetPanel() {
      const tab = getCurrentPresetTab();
      const presets = getUserPresets(tab);
      if (!state.presets.selected[tab] && presets[0]) {
        state.presets.selected[tab] = presets[0].id;
      }
      const selectedId = state.presets.selected[tab] || "";
      const optionMarkup = presets.length ? presets.map((preset) => {
        return `<option value="${preset.id}"${preset.id === selectedId ? " selected" : ""}>${escapeHtml(preset.name)}</option>`;
      }).join("") : `<option value="">Nenhum preset salvo</option>`;
      const hasSelection = Boolean(selectedId && presets.some((preset) => preset.id === selectedId));

      const hasAnyPreset = ["faq", "table", "stories", "article", "carousel", "template"].some((presetTab) => getUserPresets(presetTab).length > 0);

      return `
        <details class="preset-panel" aria-label="Presets salvos">
          <summary class="preset-panel__summary">
            <strong>Presets</strong>
            <span aria-hidden="true">&rsaquo;</span>
          </summary>
          <div class="preset-panel__body">
            <div class="preset-panel__row">
              <label class="field">
                <span>Nome do preset</span>
                <input type="text" value="${escapeHtml(state.presets.name)}" data-preset-name autocomplete="off">
              </label>
              <button class="button button--soft" type="button" data-action="save-user-preset">Salvar preset</button>
            </div>
            <div class="preset-panel__row preset-panel__row--saved">
              <label class="field">
                <span>Presets importados ou salvos nesta sessão</span>
                <select data-user-preset-select="${tab}"${presets.length ? "" : " disabled"}>
${optionMarkup}
                </select>
              </label>
              <div class="responsive-editor__actions">
                <button class="button button--soft" type="button" data-action="load-user-preset"${hasSelection ? "" : " disabled"}>Carregar</button>
                <button class="button button--danger icon-button" type="button" data-action="delete-user-preset" aria-label="Excluir preset" title="Excluir preset"${hasSelection ? "" : " disabled"}>${trashIcon()}</button>
              </div>
            </div>
            <div class="preset-panel__row preset-panel__row--file">
              <button class="button button--soft" type="button" data-action="import-user-presets">Importar JSON</button>
              <button class="button button--soft" type="button" data-action="export-user-presets"${hasAnyPreset ? "" : " disabled"}>Exportar JSON</button>
              <input class="preset-panel__import" type="file" accept="application/json,.json" data-preset-import>
            </div>
            <p class="responsive-editor__notice${state.presets.dirty ? " is-warning" : ""}">${state.presets.dirty ? "Há presets ainda não exportados." : "Presets não ficam no cache do navegador."} Exporte um JSON para guardar ou compartilhar.</p>
          </div>
        </details>
      `;
    }

    function getUserPresets(tab = getCurrentPresetTab()) {
      return state.presets.items[tab] || [];
    }

    function loadUserPresets() {
      return;
    }

    function persistUserPresets() {
      return;
    }

    function normalizePresetItems(items) {
      const normalizedItems = {};

      ["faq", "table", "stories", "article", "carousel", "template"].forEach((tab) => {
        normalizedItems[tab] = (Array.isArray(items && items[tab]) ? items[tab] : [])
          .map((preset) => ({
            id: preset && preset.id ? String(preset.id) : `preset-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name: preset && preset.name ? String(preset.name) : "Preset sem nome",
            snapshot: preset ? preset.snapshot : null,
            responsiveVersions: cloneValue(preset && preset.responsiveVersions ? preset.responsiveVersions : {})
          }))
          .filter((preset) => preset.snapshot);
      });

      return normalizedItems;
    }

    function importUserPresetFile(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        try {
          const parsedValue = JSON.parse(String(reader.result || "{}"));
          const items = parsedValue && parsedValue.items ? parsedValue.items : parsedValue;
          state.presets.items = normalizePresetItems(items);
          state.presets.dirty = false;

          ["faq", "table", "stories", "article", "carousel", "template"].forEach((tab) => {
            state.presets.selected[tab] = state.presets.items[tab][0]?.id || "";
          });

          renderEditor(true);
        } catch (error) {
          window.alert("Não consegui ler esse arquivo de presets.");
        }
      });
      reader.readAsText(file);
    }

    function exportUserPresets() {
      const hasAnyPreset = ["faq", "table", "stories", "article", "carousel", "template"].some((tab) => getUserPresets(tab).length > 0);

      if (!hasAnyPreset) {
        window.alert("Nenhum preset salvo para exportar.");
        return;
      }

      const payload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        items: state.presets.items
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "layout-lab-presets.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      state.presets.dirty = false;
      renderEditor(true);
    }

    function saveUserPreset() {
      const tab = getCurrentPresetTab();
      const name = state.presets.name.trim();

      if (!name) {
        window.alert("Dê um nome para o preset antes de salvar.");
        return;
      }

      if (state.responsive.editDevice !== "base" && state.responsive.dirty) {
        window.alert("Salve ou descarte a versão responsiva aberta antes de salvar o preset.");
        return;
      }

      const presets = getUserPresets(tab);
      const existingIndex = presets.findIndex((preset) => preset.name.toLowerCase() === name.toLowerCase());
      const baseSnapshot = getBaseSnapshot(tab);
      const preset = {
        id: existingIndex >= 0 ? presets[existingIndex].id : `preset-${Date.now()}`,
        name,
        snapshot: baseSnapshot,
        responsiveVersions: cloneValue(state.responsive.saved[tab] || {})
      };

      if (existingIndex >= 0) {
        const shouldReplace = window.confirm("Já existe um preset com esse nome. Substituir?");
        if (!shouldReplace) {
          return;
        }
        presets[existingIndex] = preset;
      } else {
        presets.push(preset);
      }

      state.presets.selected[tab] = preset.id;
      state.presets.dirty = true;
      persistUserPresets();
      renderEditor(true);
    }

    function loadSelectedUserPreset() {
      const tab = getCurrentPresetTab();
      const preset = getUserPresets(tab).find((item) => item.id === state.presets.selected[tab]);

      if (!preset) {
        return;
      }

      const shouldLoad = window.confirm("Carregar este preset vai substituir o layout atual desta aba. Continuar?");
      if (!shouldLoad || !returnToBaseVersion()) {
        return;
      }

      applyTabSnapshot(tab, preset.snapshot);
      state.responsive.baseSnapshots[tab] = cloneValue(preset.snapshot);
      state.responsive.saved[tab] = cloneValue(preset.responsiveVersions || {});
      state.responsive.editDevice = "base";
      state.responsive.dirty = false;
      renderEditor();
    }

    function deleteSelectedUserPreset() {
      const tab = getCurrentPresetTab();
      const selectedId = state.presets.selected[tab];
      const preset = getUserPresets(tab).find((item) => item.id === selectedId);

      if (!preset) {
        return;
      }

      const shouldDelete = window.confirm(`Excluir o preset "${preset.name}"?`);
      if (!shouldDelete) {
        return;
      }

      state.presets.items[tab] = getUserPresets(tab).filter((item) => item.id !== selectedId);
      state.presets.selected[tab] = "";
      state.presets.dirty = true;
      persistUserPresets();
      renderEditor(true);
    }

    function updateSelectedPreset(id) {
      const tab = getCurrentPresetTab();
      state.presets.selected[tab] = id || "";
      renderEditor(true);
    }

    function prefixResponsiveIds(value, suffix) {
      return String(value || "")
        .replace(/\bid="([^"]+)"/g, `id="$1-${suffix}"`)
        .replace(/\bfor="([^"]+)"/g, `for="$1-${suffix}"`)
        .replace(/\baria-labelledby="([^"]+)"/g, (match, ids) => {
          return `aria-labelledby="${ids.split(/\s+/).map((id) => `${id}-${suffix}`).join(" ")}"`;
        })
        .replace(/\baria-describedby="([^"]+)"/g, (match, ids) => {
          return `aria-describedby="${ids.split(/\s+/).map((id) => `${id}-${suffix}`).join(" ")}"`;
        })
        .replace(/\baria-controls="([^"]+)"/g, (match, ids) => {
          return `aria-controls="${ids.split(/\s+/).map((id) => `${id}-${suffix}`).join(" ")}"`;
        })
        .replace(/\bname="([^"]+)"/g, `name="$1-${suffix}"`);
    }

    function prefixResponsiveCss(value, suffix) {
      return String(value || "").replace(/#(?![0-9a-fA-F]{3,8}\b)([A-Za-z_][\w-]*)/g, `#$1-${suffix}`);
    }

    function scopeResponsiveCss(value, scope) {
      const css = String(value || "");

      const findMatchingBrace = (source, openIndex) => {
        let depth = 0;
        let quote = "";
        let inComment = false;

        for (let index = openIndex; index < source.length; index += 1) {
          const char = source[index];
          const nextChar = source[index + 1];

          if (inComment) {
            if (char === "*" && nextChar === "/") {
              inComment = false;
              index += 1;
            }
            continue;
          }

          if (quote) {
            if (char === "\\") {
              index += 1;
              continue;
            }

            if (char === quote) {
              quote = "";
            }
            continue;
          }

          if (char === "/" && nextChar === "*") {
            inComment = true;
            index += 1;
            continue;
          }

          if (char === "\"" || char === "'") {
            quote = char;
            continue;
          }

          if (char === "{") {
            depth += 1;
          } else if (char === "}") {
            depth -= 1;
            if (depth === 0) {
              return index;
            }
          }
        }

        return -1;
      };

      const scopeSelectorList = (selectorText) => selectorText
        .split(",")
        .map((selector) => selector.trim())
        .filter(Boolean)
        .map((selector) => selector.startsWith(scope) ? selector : `${scope} ${selector}`)
        .join(", ");

      const scopeBlock = (source) => {
        let output = "";
        let cursor = 0;

        while (cursor < source.length) {
          const openIndex = source.indexOf("{", cursor);

          if (openIndex === -1) {
            output += source.slice(cursor);
            break;
          }

          const rawPrelude = source.slice(cursor, openIndex);
          const prelude = rawPrelude.trim();
          const closeIndex = findMatchingBrace(source, openIndex);

          if (!prelude || closeIndex === -1) {
            output += source.slice(cursor);
            break;
          }

          const leadingWhitespace = rawPrelude.match(/^\s*/)?.[0] || "";
          const body = source.slice(openIndex + 1, closeIndex);

          if (prelude.startsWith("@")) {
            const shouldScopeNestedRules = /^@(media|supports|container|layer)\b/i.test(prelude);
            output += `${leadingWhitespace}${prelude} {${shouldScopeNestedRules ? scopeBlock(body) : body}}`;
          } else {
            output += `${leadingWhitespace}${scopeSelectorList(prelude)} {${body}}`;
          }

          cursor = closeIndex + 1;
        }

        return output;
      };

      return scopeBlock(css);
    }

    function scopeResponsiveStyle(value, scope) {
      return String(value || "").replace(/<style>([\s\S]*?)<\/style>/g, (match, css) => {
        return `<style>\n${scopeResponsiveCss(css, scope)}\n</style>`;
      });
    }

    function buildWithSnapshot(tab, snapshot, builder) {
      const activeSnapshot = getTabSnapshot(tab);
      applyTabSnapshot(tab, snapshot);
      const output = builder();
      applyTabSnapshot(tab, activeSnapshot);
      return output;
    }

    function buildResponsiveSwitchStyle(versionDevices) {
      if (!versionDevices.length) {
        return "";
      }

      return `<style>
.ll-responsive-output > .ll-responsive-version--mobile,
.ll-responsive-output > .ll-responsive-version--tablet,
.ll-responsive-output > .ll-responsive-version--desktop {
  display: none;
}
@media (max-width: 560px) {
  .ll-responsive-output--has-mobile > .ll-responsive-version { display: none; }
  .ll-responsive-output--has-mobile > .ll-responsive-version--mobile { display: block; }
}
@media (min-width: 561px) and (max-width: 1024px) {
  .ll-responsive-output--has-tablet > .ll-responsive-version { display: none; }
  .ll-responsive-output--has-tablet > .ll-responsive-version--tablet { display: block; }
}
@media (min-width: 1025px) {
  .ll-responsive-output--has-desktop > .ll-responsive-version { display: none; }
  .ll-responsive-output--has-desktop > .ll-responsive-version--desktop { display: block; }
}
</style>`;
    }

    function buildResponsivePackage(tab, htmlBuilder, styleBuilder) {
      const versionDevices = getResponsiveVersionList(tab);
      const baseSnapshot = getBaseSnapshot(tab);

      if (!versionDevices.length) {
        return `${buildWithSnapshot(tab, baseSnapshot, styleBuilder)}

<!-- HTML DO LAYOUT -->

${buildWithSnapshot(tab, baseSnapshot, htmlBuilder)}`;
      }

      const baseHtml = buildWithSnapshot(tab, baseSnapshot, htmlBuilder);
      const baseCss = scopeResponsiveStyle(buildWithSnapshot(tab, baseSnapshot, styleBuilder), ".ll-responsive-version--base");
      const versionBlocks = versionDevices.map((device) => {
        const suffix = `ll-${tab}-${device}`;
        const snapshot = state.responsive.saved[tab][device];
        const scopedCss = scopeResponsiveStyle(
          prefixResponsiveCss(buildWithSnapshot(tab, snapshot, styleBuilder), suffix),
          `.ll-responsive-version--${device}`
        );
        return {
          device,
          html: prefixResponsiveIds(buildWithSnapshot(tab, snapshot, htmlBuilder), suffix),
          css: scopedCss
        };
      });
      const wrapperClasses = [
        "ll-responsive-output",
        ...versionDevices.map((device) => `ll-responsive-output--has-${device}`)
      ].join(" ");

      return `${baseCss}

${versionBlocks.map((block) => block.css).join("\n\n")}

${buildResponsiveSwitchStyle(versionDevices)}

<!-- HTML DO LAYOUT -->

<div class="${wrapperClasses}">
  <div class="ll-responsive-version ll-responsive-version--base">
${baseHtml}
  </div>
${versionBlocks.map((block) => `  <div class="ll-responsive-version ll-responsive-version--${block.device}">
${block.html}
  </div>`).join("\n")}
</div>`;
    }

    function renderResponsiveEditor() {
      if (currentPage !== "conteudo") {
        return "";
      }

      const currentDevice = state.responsive.editDevice;
      const currentMeta = responsiveEditDevices.find((device) => device.key === currentDevice) || responsiveEditDevices[0];
      const modeButtons = responsiveEditDevices.map((device) => {
        const isActive = device.key === currentDevice;
        return `<button class="responsive-editor__mode" type="button" data-responsive-edit-device="${device.key}" aria-pressed="${isActive}">${device.label}</button>`;
      }).join("");
      const hasSavedCurrent = currentDevice !== "base" && hasResponsiveVersion(getResponsiveTab(), currentDevice);
      const controls = currentDevice === "base" ? `
              <p class="responsive-editor__notice">Edite o layout geral nos campos abaixo. Para uma mudança existir só no celular, tablet ou desktop, abra a versão correspondente e edite os mesmos campos.</p>
            ` : `
              <p class="responsive-editor__notice${state.responsive.dirty ? " is-warning" : ""}">${state.responsive.dirty ? "Existem alterações não salvas nesta versão." : currentMeta.note} Os campos abaixo agora pertencem só a esta versão.</p>
              <div class="responsive-editor__actions">
                <button class="button button--green" type="button" data-action="save-responsive">Salvar versão</button>
                <button class="button button--soft" type="button" data-action="discard-responsive">Descartar</button>
                <button class="button button--danger icon-button" type="button" data-action="remove-responsive-version" aria-label="Remover versão salva" title="Remover versão salva"${hasSavedCurrent ? "" : " disabled"}>${trashIcon()}</button>
              </div>
            `;

      return `
        <details class="responsive-editor">
          <summary class="responsive-editor__summary">
            <strong>Versões responsivas</strong>
            <span aria-hidden="true">&rsaquo;</span>
          </summary>
          <div class="responsive-editor__body">
            <div class="responsive-editor__modes" role="group" aria-label="Editar versão responsiva">
${modeButtons}
            </div>
${controls}
          </div>
        </details>
      `;
    }

    function hasFieldValue(value) {
      return String(value || "").trim().length > 0;
    }

    function addUniqueWarning(warnings, message) {
      if (message && !warnings.includes(message)) {
        warnings.push(message);
      }
    }

    function describeOutputImage(image, index) {
      const label = image.getAttribute("aria-label")
        || image.getAttribute("title")
        || image.closest("[aria-label]")?.getAttribute("aria-label")
        || image.closest("figure")?.querySelector("figcaption")?.textContent
        || image.getAttribute("class")
        || "";
      const cleanLabel = String(label || "").replace(/\s+/g, " ").trim();
      return cleanLabel ? `${cleanLabel}` : `imagem ${index + 1}`;
    }

    function isDecorativeOutputImage(image) {
      const className = String(image.getAttribute("class") || "");
      const role = String(image.getAttribute("role") || "").toLowerCase();
      const ariaHidden = image.getAttribute("aria-hidden") === "true";
      const parentRoleLabel = image.closest('[role="img"][aria-label]');
      return ariaHidden
        || role === "presentation"
        || role === "none"
        || Boolean(parentRoleLabel)
        || /\b(icon|badge|avatar|thumb|logo|dot-icon)\b/i.test(className);
    }

    function collectHtmlAccessibilityWarnings(html, prefix = "HTML") {
      const warnings = [];
      const parsedDocument = new DOMParser().parseFromString(String(html || ""), "text/html");
      const images = Array.from(parsedDocument.querySelectorAll("img"));
      images.forEach((image, index) => {
        const src = image.getAttribute("src") || image.getAttribute("srcset") || "";
        const hasAltAttribute = image.hasAttribute("alt");
        const altValue = image.getAttribute("alt") || "";
        if (src && (!hasAltAttribute || (!altValue.trim() && !isDecorativeOutputImage(image)))) {
          addUniqueWarning(warnings, `${prefix}: ${describeOutputImage(image, index)} sem alt text`);
        }
      });

      Array.from(parsedDocument.querySelectorAll("iframe")).forEach((frame, index) => {
        if ((frame.getAttribute("src") || "").trim() && !(frame.getAttribute("title") || "").trim()) {
          addUniqueWarning(warnings, `${prefix}: vídeo/iframe ${index + 1} sem title`);
        }
      });

      return warnings;
    }

    function shortenLocalAssetReference(value) {
      const rawValue = String(value || "").trim();
      const reference = getLocalAssetReference(rawValue) || rawValue;
      return reference.length > 78 ? `${reference.slice(0, 34)}...${reference.slice(-34)}` : reference;
    }

    function getLocalAssetReference(value) {
      const rawValue = String(value || "").trim();
      const fileMatch = rawValue.match(/file:\/\/\/?[^\s"')<>]+/i);
      if (fileMatch) {
        return fileMatch[0];
      }

      const windowsMatch = rawValue.match(/(?:^|[\s"'(=,])([a-zA-Z]:[\\/][^\s"')<>]+)/);
      if (windowsMatch) {
        return windowsMatch[1];
      }

      const uncMatch = rawValue.match(/(?:^|[\s"'(=,])(\\\\[^\s"')<>]+)/);
      return uncMatch ? uncMatch[1] : "";
    }

    function isLocalAssetReference(value) {
      const rawValue = String(value || "").trim();
      if (!rawValue) {
        return false;
      }

      return containsLocalAssetReference(rawValue)
        || /^file:\/\//i.test(rawValue)
        || isWindowsLocalPath(rawValue)
        || /url\(\s*["']?\s*file:\/\//i.test(rawValue)
        || /url\(\s*["']?\s*[a-zA-Z]:[\\/]/i.test(rawValue)
        || /(?:^|[\s,])file:\/\/\/?[^\s,]+/i.test(rawValue)
        || /(?:^|[\s,])[a-zA-Z]:[\\/][^\s,]+/.test(rawValue);
    }

    function containsLocalAssetReference(value) {
      const rawValue = String(value || "");
      return /file\s*:\s*\/\//i.test(rawValue)
        || /(?:^|[\s"'(=,])(?:blob|data)\s*:/i.test(rawValue)
        || /(?:^|[^a-zA-Z])([a-zA-Z]\s*:\s*[\\/])/.test(rawValue)
        || /(?:^|[\s"'(=,])\\\\[^\s"')<>]+/.test(rawValue);
    }

    function describeLocalAssetElement(element, index) {
      const label = element.getAttribute("alt")
        || element.getAttribute("aria-label")
        || element.getAttribute("title")
        || element.getAttribute("class")
        || element.tagName.toLowerCase();
      const cleanLabel = String(label || "").replace(/\s+/g, " ").trim();
      return cleanLabel ? `${cleanLabel}` : `item ${index + 1}`;
    }

    function collectHtmlLocalAssetBlockers(html, prefix = "HTML") {
      const blockers = [];
      const rawHtml = String(html || "");

      if (containsLocalAssetReference(rawHtml)) {
        addUniqueWarning(blockers, `${prefix}: contém arquivo local. Troque caminhos do computador por URLs hospedadas.`);
      }

      const parsedDocument = new DOMParser().parseFromString(rawHtml, "text/html");
      const assetAttributes = ["src", "srcset", "poster", "href", "data-src", "data-srcset"];

      Array.from(parsedDocument.querySelectorAll("*")).forEach((element, index) => {
        assetAttributes.forEach((attribute) => {
          const value = element.getAttribute(attribute);
          if (value && isLocalAssetReference(value)) {
            addUniqueWarning(blockers, `${prefix}: ${describeLocalAssetElement(element, index)} usa arquivo local em ${attribute} (${shortenLocalAssetReference(value)})`);
          }
        });

        const inlineStyle = element.getAttribute("style") || "";
        if (inlineStyle && isLocalAssetReference(inlineStyle)) {
          addUniqueWarning(blockers, `${prefix}: ${describeLocalAssetElement(element, index)} usa arquivo local no estilo (${shortenLocalAssetReference(inlineStyle)})`);
        }
      });

      Array.from(parsedDocument.querySelectorAll("style")).forEach((style, index) => {
        const css = style.textContent || "";
        if (isLocalAssetReference(css)) {
          addUniqueWarning(blockers, `${prefix}: CSS ${index + 1} contém arquivo local (${shortenLocalAssetReference(css)})`);
        }
      });

      const rawPattern = /file:\/\/\/?[^\s"')<>]+|(?:^|[\s"'(=,])([a-zA-Z]:[\\/][^\s"')<>]+)|(?:^|[\s"'(=,])(\\\\[^\s"')<>]+)/g;
      let rawMatch;
      while ((rawMatch = rawPattern.exec(rawHtml)) !== null) {
        const reference = rawMatch[1] || rawMatch[2] || rawMatch[0].trim();
        addUniqueWarning(blockers, `${prefix}: contém arquivo local (${shortenLocalAssetReference(reference)})`);
      }

      return blockers;
    }

    function collectLayoutWarnings(tab = getResponsiveTab()) {
      const warnings = [];

      if (currentPage === "tecnica") {
        return warnings;
      }

      if (tab === "table") {
        if (!hasFieldValue(state.table.caption)) {
          addUniqueWarning(warnings, "Tabela: caption de acessibilidade vazio");
        }
        getTableColumns().forEach((column, index) => {
          if (!hasFieldValue(column)) {
            addUniqueWarning(warnings, `Tabela: coluna ${index + 1} sem nome`);
          }
        });
        return warnings;
      }

      if (tab === "stories") {
        state.stories.groups.forEach((group, groupIndex) => {
          if (!hasFieldValue(group.name)) {
            addUniqueWarning(warnings, `Stories: container ${groupIndex + 1} sem nome`);
          }
          if (!hasFieldValue(group.thumb)) {
            addUniqueWarning(warnings, `Stories: container ${groupIndex + 1} sem miniatura`);
          }
          group.slides.forEach((slide, slideIndex) => {
            const label = `container ${groupIndex + 1}, slide ${slideIndex + 1}`;
            if (!hasFieldValue(slide.src)) {
              addUniqueWarning(warnings, `Stories: ${label} sem mídia`);
            }
            if (hasFieldValue(slide.src) && !hasFieldValue(slide.alt)) {
              addUniqueWarning(warnings, `Stories: ${label} sem alt text`);
            }
            if (normalizeStoryType(slide.type) === "video" && !hasFieldValue(slide.poster)) {
              addUniqueWarning(warnings, `Stories: ${label} sem poster do vídeo`);
            }
          });
        });
        return warnings;
      }

      if (tab === "article") {
        state.article.tabs.forEach((item, index) => {
          if (!hasFieldValue(item.label)) {
            addUniqueWarning(warnings, `Artigo: aba ${index + 1} sem título`);
          }
          if (!hasFieldValue(item.image || state.article.backgroundImage)) {
            addUniqueWarning(warnings, `Artigo: aba ${index + 1} sem imagem de fundo`);
          }
          if (!hasFieldValue(item.heading) && !hasFieldValue(item.body)) {
            addUniqueWarning(warnings, `Artigo: aba ${index + 1} sem texto principal`);
          }
        });
        return warnings;
      }

      if (tab === "carousel") {
        getCarouselSlides().forEach((slide, index) => {
          const type = normalizeCarouselType(slide.type);
          if (!hasFieldValue(slide.navLabel)) {
            addUniqueWarning(warnings, `Carrossel: slide ${index + 1} sem nome de navegação`);
          }
          if (!hasFieldValue(slide.image)) {
            addUniqueWarning(warnings, `Carrossel: slide ${index + 1} sem imagem`);
          }
          if (hasFieldValue(slide.image) && !hasFieldValue(slide.alt)) {
            addUniqueWarning(warnings, `Carrossel: slide ${index + 1} sem alt text`);
          }
          if (type === "decision" && !hasFieldValue(slide.captionTitle) && !hasFieldValue(slide.captionText)) {
            addUniqueWarning(warnings, `Carrossel: slide ${index + 1} sem legenda`);
          }
          if (type === "impact" && !hasFieldValue(slide.title) && !hasFieldValue(slide.text)) {
            addUniqueWarning(warnings, `Carrossel: slide ${index + 1} sem texto`);
          }
        });
        return warnings;
      }

      if (tab === "template") {
        if (!hasFieldValue(state.template.html)) {
          addUniqueWarning(warnings, "LP: conteúdo da lp-container vazio");
        }
        collectHtmlAccessibilityWarnings(buildTemplateOutputHtml("html"), "LP").forEach((warning) => {
          addUniqueWarning(warnings, warning);
        });
        if (/<script\b/i.test(state.template.html)) {
          addUniqueWarning(warnings, "LP: contém script no conteúdo colado");
        }
        return warnings;
      }

      state.items.forEach((item, index) => {
        if (hasFieldValue(item.question) && !hasFieldValue(item.answer)) {
          addUniqueWarning(warnings, `FAQ: pergunta ${index + 1} sem resposta`);
        }
        if (!hasFieldValue(item.question) && hasFieldValue(item.answer)) {
          addUniqueWarning(warnings, `FAQ: resposta ${index + 1} sem pergunta`);
        }
      });

      return warnings;
    }

    function getQualityChecklistItems() {
      const tab = getResponsiveTab();
      const warnings = collectLayoutWarnings(tab);
      const noWarnings = warnings.length === 0;

      if (tab === "table") {
        return [
          { ok: hasFieldValue(state.table.caption), label: "Caption de acessibilidade preenchido" },
          { ok: getTableColumns().every(hasFieldValue), label: "Todas as colunas têm nome" },
          { ok: getVisibleTableRows().length > 0, label: "Tabela tem pelo menos uma linha preenchida" },
          { ok: noWarnings, label: "Sem pendências antes de copiar", detail: warnings[0] || "" }
        ];
      }

      if (tab === "stories") {
        const slides = state.stories.groups.flatMap((group) => group.slides);
        return [
          { ok: state.stories.groups.length > 0 && slides.length > 0, label: "Containers e slides criados" },
          { ok: slides.every((slide) => hasFieldValue(slide.src)), label: "Todas as mídias têm URL" },
          { ok: slides.every((slide) => !hasFieldValue(slide.src) || hasFieldValue(slide.alt)), label: "Mídias com alt text ou aria-label" },
          { ok: noWarnings, label: "Sem pendências antes de copiar", detail: warnings[0] || "" }
        ];
      }

      if (tab === "article") {
        return [
          { ok: state.article.tabs.length > 0, label: "Pelo menos uma aba criada" },
          { ok: state.article.tabs.every((item) => hasFieldValue(item.image || state.article.backgroundImage)), label: "Abas com imagem de fundo" },
          { ok: state.article.tabs.every((item) => hasFieldValue(item.heading) || hasFieldValue(item.body)), label: "Abas com texto principal" },
          { ok: noWarnings, label: "Sem pendências antes de copiar", detail: warnings[0] || "" }
        ];
      }

      if (tab === "carousel") {
        const slides = getCarouselSlides();
        return [
          { ok: slides.length > 0, label: "Pelo menos um slide criado" },
          { ok: slides.every((slide) => hasFieldValue(slide.image)), label: "Slides com imagem" },
          { ok: slides.every((slide) => !hasFieldValue(slide.image) || hasFieldValue(slide.alt)), label: "Imagens com alt text" },
          { ok: noWarnings, label: "Sem pendências antes de copiar", detail: warnings[0] || "" }
        ];
      }

      if (tab === "template") {
        return [
          { ok: hasFieldValue(state.template.html), label: "HTML colado dentro da lp-container" },
          { ok: !/<script\b/i.test(state.template.html), label: "Sem script dentro do conteúdo colado" },
          { ok: !collectHtmlAccessibilityWarnings(buildTemplateOutputHtml("html"), "LP").length, label: "Imagens e vídeos com textos acessíveis" },
          { ok: noWarnings, label: "Sem pendências antes de copiar", detail: warnings[0] || "" }
        ];
      }

      const filledItems = state.items.filter((item) => hasFieldValue(item.question) || hasFieldValue(item.answer));
      return [
        { ok: filledItems.length > 0, label: "Pelo menos uma pergunta preenchida" },
        { ok: filledItems.every((item) => hasFieldValue(item.question)), label: "Perguntas sem campo vazio" },
        { ok: filledItems.every((item) => hasFieldValue(item.answer)), label: "Respostas sem campo vazio" },
        { ok: noWarnings, label: "Sem pendências antes de copiar", detail: warnings[0] || "" }
      ];
    }

    function renderQualityChecklist() {
      if (currentPage !== "conteudo" || currentEditorTab === "dashboard") {
        return "";
      }

      const items = getQualityChecklistItems();
      const completeCount = items.filter((item) => item.ok).length;
      const itemMarkup = items.map((item) => {
        const stateClass = item.ok ? "is-ok" : "is-warning";
        const mark = item.ok ? "✓" : "!";
        const detail = item.detail ? `<small>${escapeHtml(String(item.detail))}</small>` : "";
        return `<div class="quality-checklist__item ${stateClass}">
              <span class="quality-checklist__mark" aria-hidden="true">${mark}</span>
              <span>${escapeHtml(String(item.label))}${detail}</span>
            </div>`;
      }).join("");

      return `
        <details class="quality-checklist">
          <summary class="quality-checklist__summary">
            <strong>Checklist antes de copiar</strong>
            <span>${completeCount}/${items.length}</span>
          </summary>
          <div class="quality-checklist__body">
${itemMarkup}
          </div>
        </details>
      `;
    }

    function resetResponsiveForTab(tab) {
      state.responsive.saved[tab] = {};
      delete state.responsive.baseSnapshots[tab];
      state.responsive.dirty = false;
      state.responsive.editDevice = "base";
    }

    function setTheme(theme) {
      document.documentElement.dataset.theme = theme;
      const isDark = theme === "dark";
      const themeInputs = [themeToggle, homeThemeToggle].filter(Boolean);
      themeInputs.forEach((input) => {
        input.checked = isDark;
        input.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
      });
      const themeControls = themeInputs
        .map((input) => input.closest(".theme-toggle"))
        .filter(Boolean);
      themeControls.forEach((themeControl) => {
        const nextLabel = theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro";
        themeControl.setAttribute("aria-label", nextLabel);
        themeControl.setAttribute("title", nextLabel);
      });

      try {
        localStorage.setItem("faqCompilerTheme", theme);
      } catch (error) {
        return;
      }
    }

    function getInitialTheme() {
      try {
        const savedTheme = localStorage.getItem("faqCompilerTheme");
        if (savedTheme === "dark" || savedTheme === "light") {
          return savedTheme;
        }
      } catch (error) {
        return "light";
      }

      return "light";
    }

    function updateViewportMode() {
      const isTallInner = window.innerWidth >= 921
        && window.innerWidth <= 1900
        && window.innerHeight >= 900
        && window.innerHeight >= window.innerWidth * 0.85;
      const isTallWindow = window.outerWidth >= 921
        && window.outerWidth <= 1250
        && window.outerHeight >= 1500;
      const isPortraitScreen = screen.width <= 1200
        && screen.height >= 1500;
      const isStackableTab = currentPage === "conteudo"
        && (currentEditorTab === "article" || currentEditorTab === "carousel" || currentEditorTab === "template");
      const isTallWorkspace = isTallInner || isTallWindow || isPortraitScreen;

      document.documentElement.dataset.viewportMode = isTallWorkspace ? "tall-workspace" : "";
      document.documentElement.classList.toggle("layout-is-stacked", isStackableTab && isTallWorkspace);
    }

    function escapeHtml(value) {
      return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function highlightHtmlTag(token) {
      let highlighted = escapeHtml(token);
      highlighted = highlighted.replace(/^(&lt;\/?)([A-Za-z][\w:-]*)/, '<span class="template-code-editor__bracket">$1</span><span class="template-code-editor__tag">$2</span>');
      highlighted = highlighted.replace(/(\s)([A-Za-z_:][\w:.-]*)(=)(&quot;.*?&quot;|&#039;.*?&#039;|[^\s&]+)/g, '$1<span class="template-code-editor__attr">$2</span><span class="template-code-editor__equals">$3</span><span class="template-code-editor__string">$4</span>');
      highlighted = highlighted.replace(/(\/?&gt;)$/, '<span class="template-code-editor__bracket">$1</span>');
      return highlighted;
    }

    function highlightHtmlCode(value) {
      const rawValue = String(value || "");
      const tokenPattern = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\/?[A-Za-z][^>]*?>|<![^>]*?>/g;
      let lastIndex = 0;
      let output = "";
      let match;

      while ((match = tokenPattern.exec(rawValue))) {
        const plainText = rawValue.slice(lastIndex, match.index);
        if (plainText) {
          output += `<span class="template-code-editor__text">${escapeHtml(plainText)}</span>`;
        }

        const token = match[0];
        if (token.startsWith("<!--")) {
          output += `<span class="template-code-editor__comment">${escapeHtml(token)}</span>`;
        } else if (token.startsWith("<!")) {
          output += `<span class="template-code-editor__doctype">${escapeHtml(token)}</span>`;
        } else {
          output += `<span class="template-code-editor__token">${highlightHtmlTag(token)}</span>`;
        }

        lastIndex = match.index + token.length;
      }

      const tail = rawValue.slice(lastIndex);
      if (tail) {
        output += `<span class="template-code-editor__text">${escapeHtml(tail)}</span>`;
      }

      return output || '<span class="template-code-editor__text"></span>';
    }

    function syncTemplateCodeEditorScroll(textarea) {
      const wrapper = textarea?.closest?.("[data-template-code-editor]");
      const highlight = wrapper?.querySelector?.("[data-template-highlight]");
      if (!highlight) {
        return;
      }

      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    }

    function updateTemplateCodeHighlight(textarea) {
      const wrapper = textarea?.closest?.("[data-template-code-editor]");
      const code = wrapper?.querySelector?.("[data-template-highlight-code]");
      if (!code) {
        return;
      }

      const value = textarea.value || "";
      code.innerHTML = `${highlightHtmlCode(value)}${value.endsWith("\n") ? "\n" : ""}`;
      syncTemplateCodeEditorScroll(textarea);
    }

    function setupTemplateCodeEditors(scope = document) {
      scope.querySelectorAll?.("[data-template-code-editor] textarea").forEach((textarea) => {
        updateTemplateCodeHighlight(textarea);

        if (textarea.dataset.templateCodeEditorReady) {
          return;
        }

        textarea.dataset.templateCodeEditorReady = "true";
        textarea.addEventListener("input", () => updateTemplateCodeHighlight(textarea));
        textarea.addEventListener("scroll", () => syncTemplateCodeEditorScroll(textarea));
        textarea.addEventListener("keydown", (event) => {
          if (event.key !== "Tab") {
            return;
          }

          event.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.setRangeText("  ", start, end, "end");
          textarea.dispatchEvent(new Event("input", { bubbles: true }));
        });
      });
    }

    function formatAnswer(value) {
      return escapeHtml(value.trim()).replace(/\r?\n/g, "<br>");
    }

    function normalizeHexColor(value) {
      const rawValue = String(value || "").trim();
      const colorValue = rawValue.startsWith("#") ? rawValue : `#${rawValue}`;
      const shortHexMatch = colorValue.match(/^#([0-9a-fA-F]{3})$/);

      if (shortHexMatch) {
        return `#${shortHexMatch[1].split("").map((char) => char + char).join("")}`.toLowerCase();
      }

      if (/^#[0-9a-fA-F]{6}$/.test(colorValue)) {
        return colorValue.toLowerCase();
      }

      return "#ea5b0c";
    }

    function isHexColor(value) {
      return /^#?[0-9a-fA-F]{3}$/.test(String(value || "").trim())
        || /^#?[0-9a-fA-F]{6}$/.test(String(value || "").trim());
    }

    function parseCssGradient(value) {
      const rawValue = String(value || "").trim();
      const match = rawValue.match(/^linear-gradient\(\s*(\d{1,3})deg\s*,\s*(#[0-9a-fA-F]{3,6})\s*,\s*(#[0-9a-fA-F]{3,6})\s*\)$/i);
      if (!match) {
        return null;
      }

      return {
        angle: Math.min(360, Math.max(0, Number(match[1]))),
        start: normalizeHexColor(match[2]),
        end: normalizeHexColor(match[3])
      };
    }

    function buildCssGradient(start, end, angle = 135) {
      return `linear-gradient(${Math.min(360, Math.max(0, Number(angle) || 0))}deg, ${normalizeHexColor(start)}, ${normalizeHexColor(end)})`;
    }

    function normalizeCssColorValue(value, fallback = "#ea5b0c") {
      const gradient = parseCssGradient(value);
      if (gradient) {
        return buildCssGradient(gradient.start, gradient.end, gradient.angle);
      }

      return normalizeHexColor(isHexColor(value) ? value : fallback);
    }

    function isWindowsLocalPath(value) {
      const rawValue = String(value || "").trim();
      return /^[a-zA-Z]:[\\/]/.test(rawValue) || /^\\\\/.test(rawValue);
    }

    function encodeLocalFileUrl(value) {
      let normalizedValue = String(value || "").trim().replace(/\\/g, "/");
      try {
        normalizedValue = decodeURI(normalizedValue);
      } catch (error) {
        normalizedValue = String(value || "").trim().replace(/\\/g, "/");
      }

      return encodeURI(normalizedValue).replace(/#/g, "%23");
    }

    function normalizeLocalPathToFileUrl(value) {
      const rawValue = String(value || "").trim();
      if (!rawValue) {
        return "";
      }

      if (/^file:\/\//i.test(rawValue)) {
        return encodeLocalFileUrl(rawValue);
      }

      if (/^[a-zA-Z]:[\\/]/.test(rawValue)) {
        return `file:///${encodeLocalFileUrl(rawValue)}`;
      }

      if (/^\\\\/.test(rawValue)) {
        return `file:${encodeLocalFileUrl(rawValue)}`;
      }

      return rawValue;
    }

    function normalizeAssetUrl(value) {
      const rawValue = String(value || "").trim();
      return isWindowsLocalPath(rawValue) || /^file:\/\//i.test(rawValue)
        ? normalizeLocalPathToFileUrl(rawValue)
        : rawValue;
    }

    function isTemporaryPreviewAssetUrl(value) {
      return /^(blob|data):/i.test(String(value || "").trim());
    }

    function isLocalAssetUrl(value) {
      const normalizedValue = normalizeAssetUrl(value);
      return /^file:\/\//i.test(normalizedValue);
    }

    function chooseLocalPreviewAsset(accept, onSelect) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept || "image/*,video/*";
      input.hidden = true;
      input.addEventListener("change", () => {
        const file = input.files && input.files[0];
        input.remove();
        if (!file) {
          return;
        }

        onSelect(URL.createObjectURL(file), file);
      }, { once: true });
      document.body.appendChild(input);
      input.click();
    }

    function createLocalAssetButton(targetInput, applyValue, accept = "image/*,video/*") {
      const button = document.createElement("button");
      button.className = "button button--soft";
      button.type = "button";
      button.textContent = "Escolher arquivo local";
      button.addEventListener("click", () => {
        chooseLocalPreviewAsset(accept, (objectUrl) => {
          targetInput.value = objectUrl;
          applyValue();
        });
      });
      return button;
    }

    function getColorPreviewStyle(value) {
      return normalizeCssColorValue(value || "#ea5b0c");
    }

    function renderColorControl({ value, label = "Cor", scope = "", field = "", columnIndex, slideIndex, allowGradient = false, className = "" }) {
      const colorValue = normalizeCssColorValue(value || "#ea5b0c");
      const dataset = [
        `data-color-control`,
        scope ? `data-color-scope="${escapeHtml(scope)}"` : "",
        field ? `data-color-field="${escapeHtml(field)}"` : "",
        columnIndex !== undefined ? `data-column-index="${columnIndex}"` : "",
        slideIndex !== undefined ? `data-carousel-slide="${slideIndex}"` : "",
        allowGradient ? `data-color-gradient="true"` : "",
        `aria-label="${escapeHtml(label)}"`,
        `title="${escapeHtml(label)}"`
      ].filter(Boolean).join(" ");

      return `<button class="color-control ${className}" type="button" ${dataset} style="--color-control-preview: ${escapeHtml(colorValue)}">
        <span class="color-control__swatch" aria-hidden="true"></span>
        <span class="color-control__value">${escapeHtml(colorValue)}</span>
      </button>`;
    }

    function hexToRgba(value, alpha) {
      const color = normalizeHexColor(value).replace("#", "");
      const red = parseInt(color.slice(0, 2), 16);
      const green = parseInt(color.slice(2, 4), 16);
      const blue = parseInt(color.slice(4, 6), 16);
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }

    function normalizeArticleOverlayOpacity(value) {
      const numericValue = Number(String(value ?? "").replace(",", "."));
      if (!Number.isFinite(numericValue)) {
        return 0.74;
      }

      return Math.min(0.95, Math.max(0, numericValue));
    }

    function normalizeCarouselCaptionOpacity(value) {
      const numericValue = Number(String(value ?? "").replace(",", "."));
      if (!Number.isFinite(numericValue)) {
        return 0.64;
      }

      return Math.min(0.95, Math.max(0, numericValue));
    }

    function buildArticleStyle() {
      const shellBackgroundOpacity = normalizeArticleOverlayOpacity(state.article.shellBackgroundOpacity);
      const shellBackground = state.article.shellBackgroundEnabled !== false
        ? hexToRgba(state.article.shellBackgroundColor, shellBackgroundOpacity.toFixed(2))
        : "rgba(0, 0, 0, 0)";
      const opacity = normalizeArticleOverlayOpacity(state.article.overlayOpacity);
      const hasOverlay = state.article.overlayEnabled !== false;
      const strong = hasOverlay ? hexToRgba(state.article.overlayColor, opacity.toFixed(2)) : "rgba(0, 0, 0, 0)";
      const medium = hasOverlay ? hexToRgba(state.article.overlayColor, Math.max(0, opacity * 0.7).toFixed(2)) : "rgba(0, 0, 0, 0)";
      const soft = hasOverlay ? hexToRgba(state.article.overlayColor, Math.max(0, opacity * 0.46).toFixed(2)) : "rgba(0, 0, 0, 0)";
      const tabsProtectionOpacity = normalizeArticleOverlayOpacity(state.article.tabsProtectionOpacity);
      const tabsPanel = state.article.tabsProtectionEnabled !== false
        ? hexToRgba(state.article.tabsProtectionColor, tabsProtectionOpacity.toFixed(2))
        : "rgba(0, 0, 0, 0)";

      return articleStyle.replace("__ARTICLE_DYNAMIC_COLORS__", `
  .ll-article {
    --ll-article-shell-bg: ${shellBackground};
    --ll-article-tabs-panel: ${tabsPanel};
    --ll-article-overlay-strong: ${strong};
    --ll-article-overlay-medium: ${medium};
    --ll-article-overlay-soft: ${soft};
  }`);
    }

    function buildCarouselStyle() {
      const sectionBackground = state.carousel.sectionGradientEnabled !== false
        ? `linear-gradient(180deg, ${normalizeHexColor(state.carousel.sectionGradientStart || "#ffffff")}, ${normalizeHexColor(state.carousel.sectionGradientEnd || state.carousel.softColor)})`
        : normalizeCssColorValue(state.carousel.softColor);

      return carouselStyle.replace("__CAROUSEL_DYNAMIC_COLORS__", `
  .ll-carousel {
    --ll-carousel-brand: ${normalizeHexColor(state.carousel.brandColor)};
    --ll-carousel-soft: ${normalizeCssColorValue(state.carousel.softColor)};
    --ll-carousel-section-bg: ${sectionBackground};
    --ll-carousel-dot-hover: ${normalizeHexColor(state.carousel.dotHoverColor)};
    --ll-carousel-dot-active: ${normalizeHexColor(state.carousel.dotActiveColor)};
    --ll-carousel-dot-active-border: ${normalizeHexColor(state.carousel.dotActiveBorderColor)};
    --ll-carousel-dot-icon-bg: ${normalizeHexColor(state.carousel.dotIconBackgroundColor || "#f0ede8")};
    --ll-carousel-dot-icon-active-bg: ${normalizeHexColor(state.carousel.dotIconActiveBackgroundColor || state.carousel.brandColor)};
    --ll-carousel-dot-icon-active-color: ${normalizeHexColor(state.carousel.dotIconActiveColor || "#ffffff")};
    --ll-carousel-indicator-color: ${hexToRgba(normalizeHexColor(state.carousel.indicatorColor || "#ffffff"), "0.5")};
    --ll-carousel-indicator-active-color: ${normalizeHexColor(state.carousel.indicatorActiveColor || "#ffffff")};
  }`);
    }

    function normalizeCarouselType(type) {
      return type === "decision" ? "decision" : "impact";
    }

    function normalizeCarouselFocus(value) {
      const numericValue = Number(value);
      if (!Number.isFinite(numericValue)) {
        return 50;
      }

      return Math.min(100, Math.max(0, Math.round(numericValue)));
    }

    function normalizeCarouselCaptionHorizontal(value) {
      return ["left", "center", "right"].includes(value) ? value : "left";
    }

    function normalizeCarouselCaptionVertical(value) {
      return ["top", "center", "bottom"].includes(value) ? value : "center";
    }

    function normalizeCarouselGradientAngle(value) {
      const numericValue = Number(value);
      if (!Number.isFinite(numericValue)) {
        return 323;
      }

      return Math.min(360, Math.max(0, Math.round(numericValue)));
    }

    function getCarouselCaptionStyle(slide) {
      const captionGradient = parseCssGradient(slide.backgroundColor);
      const captionOpacity = normalizeCarouselCaptionOpacity(slide.captionOpacity).toFixed(2);
      const backgroundColor = captionGradient
        ? buildCssGradient(captionGradient.start, captionGradient.end, captionGradient.angle)
        : hexToRgba(normalizeHexColor(slide.backgroundColor || "#0d2333"), captionOpacity);
      const textColor = normalizeHexColor(slide.textColor || "#ffffff");
      const horizontal = normalizeCarouselCaptionHorizontal(slide.captionHorizontal);
      const vertical = normalizeCarouselCaptionVertical(slide.captionVertical);
      const styles = [`--ll-carousel-caption-bg: ${backgroundColor};`, `--ll-carousel-caption-text: ${textColor};`];

      if (horizontal === "center") {
        styles.push("--ll-carousel-caption-left: 50%;", "--ll-carousel-caption-right: auto;", "--ll-carousel-caption-translate-x: -50%;");
      } else if (horizontal === "right") {
        styles.push("--ll-carousel-caption-left: auto;", "--ll-carousel-caption-right: clamp(1.25rem, 5vw, 4.75rem);", "--ll-carousel-caption-translate-x: 0;");
      } else {
        styles.push("--ll-carousel-caption-left: clamp(1.25rem, 5vw, 4.75rem);", "--ll-carousel-caption-right: auto;", "--ll-carousel-caption-translate-x: 0;");
      }

      if (vertical === "top") {
        styles.push("--ll-carousel-caption-top: clamp(1rem, 4vw, 3.5rem);", "--ll-carousel-caption-bottom: auto;", "--ll-carousel-caption-translate-y: 0;");
      } else if (vertical === "bottom") {
        styles.push("--ll-carousel-caption-top: auto;", "--ll-carousel-caption-bottom: clamp(1rem, 4vw, 3.5rem);", "--ll-carousel-caption-translate-y: 0;");
      } else {
        styles.push("--ll-carousel-caption-top: 50%;", "--ll-carousel-caption-bottom: auto;", "--ll-carousel-caption-translate-y: -50%;");
      }

      return styles.join(" ");
    }

    function getCarouselIconName(value) {
      return ["heart", "bottle", "sparkles", "box", "check", "none"].includes(value) ? value : "heart";
    }

    function isInlineSvgMarkup(value) {
      const text = String(value || "")
        .trim()
        .replace(/^<\?xml[\s\S]*?\?>\s*/i, "");
      return /^<svg(?:\s|>)/i.test(text);
    }

    function sanitizeInlineSvgMarkup(value) {
      const text = String(value || "")
        .trim()
        .replace(/^<\?xml[\s\S]*?\?>\s*/i, "");

      if (!isInlineSvgMarkup(text)) {
        return "";
      }

      return text
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<(?:script|iframe|object|embed|link|meta)\b[^>]*\/?>/gi, "")
        .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
        .replace(/\s(?:href|xlink:href)\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi, "")
        .replace(/\s(?:href|xlink:href)\s*=\s*javascript:[^\s>]+/gi, "");
    }

    function createSvgElementFromMarkup(doc, value) {
      const markup = sanitizeInlineSvgMarkup(value);
      if (!markup) {
        return null;
      }

      const parsed = new DOMParser().parseFromString(markup, "image/svg+xml");
      const parsedSvg = parsed.documentElement;
      if (!parsedSvg || parsedSvg.nodeName.toLowerCase() === "parsererror" || parsedSvg.tagName.toLowerCase() !== "svg") {
        return null;
      }

      return doc.importNode(parsedSvg, true);
    }

    function renderCarouselIcon(slide) {
      const iconImage = String(slide.navIconImage || "").trim();
      if (iconImage) {
        if (isInlineSvgMarkup(iconImage)) {
          return `<span class="ll-carousel__dot-icon ll-carousel__dot-icon--svg">${sanitizeInlineSvgMarkup(iconImage)}</span>`;
        }

        return `<span class="ll-carousel__dot-icon"><img class="ll-carousel__dot-icon-img" src="${escapeHtml(normalizeAssetUrl(iconImage))}" alt="" loading="lazy"></span>`;
      }

      const icon = getCarouselIconName(slide.navIcon);
      const icons = {
        heart: `<svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M20.393 5.879A5.5 5.5 0 0 0 12 4.376a5.5 5.5 0 0 0-8.393 1.503C2.195 7.823 2.5 10.5 4.5 12.5L12 20l7.5-7.5c2-2 2.305-4.677.893-6.621z"></path></svg>`,
        bottle: `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 2h6l1 4H8z"></path><path d="M8 6c0 8 8 8 8 14a4 4 0 0 1-8 0c0-6 8-6 8-14"></path><line x1="12" x2="12" y1="10" y2="14"></line></svg>`,
        sparkles: `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>`,
        box: `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24"><rect height="16" rx="2" width="20" x="2" y="4"></rect><circle cx="12" cy="12" r="3"></circle><path d="M2 9h3M19 9h3M2 15h3M19 15h3"></path></svg>`,
        check: `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>`
      };

      if (icon === "none") {
        return "";
      }

      return `<span class="ll-carousel__dot-icon">${icons[icon]}</span>`;
    }

    function buildCarouselImageVariant(src, size) {
      const value = normalizeAssetUrl(src);
      if (!value) {
        return "";
      }

      if (isLocalAssetUrl(value) || isTemporaryPreviewAssetUrl(value)) {
        return value;
      }

      const hashIndex = value.indexOf("#");
      const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
      const withoutHash = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
      const queryIndex = withoutHash.indexOf("?");
      const path = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
      const query = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "";
      const params = query
        .split("&")
        .map((param) => param.trim())
        .filter((param) => param && !/^ims=/i.test(param));

      params.push(`ims=${size}`);
      return `${path}?${params.join("&")}${hash}`;
    }

    function getCarouselSlides() {
      return state.carousel.slides.slice(0, carouselLimits.maxSlides);
    }

    function setCarouselPreviewSlide(index) {
      const maxSlideIndex = Math.max(0, getCarouselSlides().length - 1);
      const numericIndex = Number(index);
      state.carousel.previewSlideIndex = Math.min(Math.max(Number.isFinite(numericIndex) ? numericIndex : 0, 0), maxSlideIndex);
    }

    function createCarouselSlide(index = state.carousel.slides.length) {
      const isDecision = index % 2 === 1;

      if (isDecision) {
        return {
          type: "decision",
          navLabel: "Decisão",
          navIcon: index === 3 ? "box" : "bottle",
          navIconImage: "",
          captionTitle: "Título curto do destaque",
          captionText: "Use a legenda para explicar o ponto principal do produto ou da seção.",
          image: "",
          alt: "Imagem principal do layout de decisão",
          focusX: 50,
          focusY: 50,
          captionHorizontal: "left",
          captionVertical: "center",
          textColor: "#ffffff",
          backgroundColor: "#000000",
          captionOpacity: 0.64,
          mediaBackgroundColor: "#0d2333"
        };
      }

      return {
        type: "impact",
        navLabel: index === 2 ? "Invertido" : "Impacto",
        navIcon: index === 2 ? "sparkles" : "heart",
        navIconImage: "",
        eyebrow: "Impacto visual",
        title: "Mensagem curta em destaque",
        text: "Use este espaço para resumir uma ideia principal com apoio da imagem ao lado.",
        image: "",
        alt: "Imagem de apoio do layout de impacto",
        backgroundColor: "#f16425",
        gradientEnabled: true,
        gradientEndColor: "#ff8a4f",
        gradientAngle: 323,
        textColor: "#fff7ef",
        focusX: 50,
        focusY: 50,
        reverse: index === 2
      };
    }

    function addCarouselSlide() {
      if (state.carousel.slides.length >= carouselLimits.maxSlides) {
        return;
      }

      state.carousel.slides.push(createCarouselSlide());
      state.carousel.openSlideIndex = state.carousel.slides.length - 1;
      setCarouselPreviewSlide(state.carousel.openSlideIndex);
      renderEditor(true);
    }

    function removeCarouselSlide(index) {
      if (state.carousel.slides.length <= carouselLimits.minSlides) {
        return;
      }

      state.carousel.slides.splice(index, 1);
      if (state.carousel.openSlideIndex > index) {
        state.carousel.openSlideIndex -= 1;
      } else if (state.carousel.openSlideIndex === index) {
        state.carousel.openSlideIndex = Math.min(index, state.carousel.slides.length - 1);
      }

      setCarouselPreviewSlide(state.carousel.openSlideIndex);
      renderEditor(true);
    }

    function renderCarouselImage(slide, className = "ll-carousel__image") {
      const src = escapeHtml(normalizeAssetUrl(slide.image));
      const alt = escapeHtml(String(slide.alt || "").trim());
      const focusX = normalizeCarouselFocus(slide.focusX);
      const focusY = normalizeCarouselFocus(slide.focusY);
      const type = normalizeCarouselType(slide.type);
      const dimensions = type === "impact"
        ? { width: 780, height: 740 }
        : { width: 1800, height: 1600 };
      return `<img class="${className}" src="${src}" alt="${alt}" width="${dimensions.width}" height="${dimensions.height}" loading="lazy" decoding="async" style="object-position: ${focusX}% ${focusY}%;">`;
    }

    function renderCarouselPicture(slide) {
      const src = normalizeAssetUrl(slide.image);
      const sources = [
        ["(max-width: 320px)", "242x"],
        ["(max-width: 375px)", "297x"],
        ["(max-width: 425px)", "347x"],
        ["(max-width: 768px)", "702x"],
        ["(max-width: 1024px)", "958x"],
        ["(max-width: 1440px)", "1214x"]
      ].map(([media, size]) => {
        return `<source media="${media}" srcset="${escapeHtml(buildCarouselImageVariant(src, size))}">`;
      }).join("\n              ");

      return `<picture class="ll-carousel__picture">
              ${sources}
              ${renderCarouselImage(slide)}
            </picture>`;
    }

    function renderCarouselImpactSlide(slide, slideIndex) {
      const reverseClass = slide.reverse ? " ll-carousel__layout--impact-reverse" : "";
      const impactBgGradient = parseCssGradient(slide.backgroundColor);
      const impactBg = impactBgGradient ? impactBgGradient.start : normalizeHexColor(slide.backgroundColor || "#f16425");
      const impactText = normalizeHexColor(slide.textColor || "#fff7ef");
      const muted = hexToRgba(impactText, "0.84");
      const gradient = impactBgGradient
        ? buildCssGradient(impactBgGradient.start, impactBgGradient.end, impactBgGradient.angle)
        : slide.gradientEnabled === false
        ? "none"
        : `linear-gradient(${normalizeCarouselGradientAngle(slide.gradientAngle)}deg, ${impactBg}, ${normalizeHexColor(slide.gradientEndColor || impactBg)})`;

      return `<section class="ll-carousel__layout ll-carousel__layout--impact${reverseClass}" style="--ll-carousel-impact-bg: ${impactBg}; --ll-carousel-impact-text: ${impactText}; --ll-carousel-impact-muted: ${muted}; --ll-carousel-impact-gradient: ${gradient};" aria-label="${escapeHtml(slide.navLabel || "Impacto")}">
          <div class="ll-carousel__layout-copy">
            <p class="ll-carousel__layout-eyebrow"${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "eyebrow" })}>${escapeHtml(slide.eyebrow || "")}</p>
            <h3 class="ll-carousel__layout-title"${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "title" })}>${escapeHtml(slide.title || "")}</h3>
            <p class="ll-carousel__layout-text"${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "text" })}>${escapeHtml(slide.text || "")}</p>
          </div>
          <figure class="ll-carousel__media-card">
            ${renderCarouselPicture(slide)}
          </figure>
        </section>`;
    }

    function renderCarouselDecisionSlide(slide, slideIndex) {
      const captionStyle = getCarouselCaptionStyle(slide);
      const mediaBackgroundColor = normalizeCssColorValue(slide.mediaBackgroundColor || "#0d2333");

      return `<section class="ll-carousel__layout ll-carousel__layout--media" style="--ll-carousel-media-bg: ${mediaBackgroundColor}; background: ${mediaBackgroundColor};" aria-label="${escapeHtml(slide.navLabel || "Decisão")}">
          <figure class="ll-carousel__figure">
            ${renderCarouselPicture(slide)}
            <figcaption class="ll-carousel__caption" style="${captionStyle}">
              <h3${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "captionTitle" })}>${escapeHtml(slide.captionTitle || "")}</h3>
              <p${previewTextStyleAttr({ scope: "carousel", slideIndex, field: "captionText" })}>${escapeHtml(slide.captionText || "")}</p>
            </figcaption>
          </figure>
        </section>`;
    }

    function renderCarouselPanel(slide, index) {
      const type = normalizeCarouselType(slide.type);
      const content = type === "decision" ? renderCarouselDecisionSlide(slide, index) : renderCarouselImpactSlide(slide, index);

      return `      <article class="ll-carousel__panel ll-carousel__panel--${index + 1}" id="ll-carousel-panel-${index + 1}" aria-label="Slide ${index + 1}: ${escapeHtml(slide.navLabel || `Slide ${index + 1}`)}">
        ${content}
      </article>`;
    }

    function buildCarouselSectionHtml(activeIndex = 0) {
      const slides = getCarouselSlides();
      const hideIntroClass = state.carousel.showIntro === false ? " ll-carousel--hide-intro" : "";
      const hideIndicatorsClass = state.carousel.showIndicators === false ? " ll-carousel--hide-indicators" : "";
      const activeSlideIndex = Math.min(Math.max(Number(activeIndex) || 0, 0), Math.max(0, slides.length - 1));
      const inputs = slides.map((slide, index) => {
        return `    <input class="ll-carousel__control ll-carousel__control--${index + 1}" type="radio" name="ll-carousel-active" id="ll-carousel-slide-${index + 1}"${index === activeSlideIndex ? " checked" : ""}>`;
      }).join("\n");
      const panels = slides.map(renderCarouselPanel).join("\n\n");
      const indicators = slides.map((slide, index) => {
        return `        <span class="ll-carousel__indicator ll-carousel__indicator--${index + 1}"></span>`;
      }).join("\n");
      const sideHints = slides.length > 1 ? slides.map((slide, index) => {
        const previousIndex = (index - 1 + slides.length) % slides.length;
        const nextIndex = (index + 1) % slides.length;
        return `      <label class="ll-carousel__side-hint ll-carousel__side-hint--prev ll-carousel__side-hint--${index + 1}" for="ll-carousel-slide-${previousIndex + 1}" role="button" aria-label="Voltar para o slide ${previousIndex + 1}">Anterior</label>
      <label class="ll-carousel__side-hint ll-carousel__side-hint--next ll-carousel__side-hint--${index + 1}" for="ll-carousel-slide-${nextIndex + 1}" role="button" aria-label="Avançar para o slide ${nextIndex + 1}">Próximo</label>`;
      }).join("\n") : "";
      const dots = slides.map((slide, index) => {
        const dotNumber = slide.navNumber || String(index + 1).padStart(2, "0");
        return `    <label class="ll-carousel__dot ll-carousel__dot--${index + 1}" for="ll-carousel-slide-${index + 1}" role="button" aria-controls="ll-carousel-panel-${index + 1}">
      <span class="ll-carousel__dot-copy">
        <span class="ll-carousel__dot-number"${previewTextStyleAttr({ scope: "carousel", slideIndex: index, field: "navNumber" })}>${escapeHtml(dotNumber)}</span>
        <span class="ll-carousel__dot-text"${previewTextStyleAttr({ scope: "carousel", slideIndex: index, field: "navLabel" })}>${escapeHtml(slide.navLabel || `Slide ${index + 1}`)}</span>
      </span>
      ${renderCarouselIcon(slide)}
    </label>`;
      }).join("\n");

      return `<section class="ll-carousel${hideIntroClass}${hideIndicatorsClass}" aria-label="${escapeHtml(state.carousel.ariaLabel || "Carrossel de layouts")}">
  <div class="ll-carousel__container">
    <div class="ll-carousel__intro">
      <p class="ll-carousel__eyebrow"${previewTextStyleAttr({ scope: "carousel", field: "eyebrow" })}>${escapeHtml(state.carousel.eyebrow || "")}</p>
      <h2 class="ll-carousel__title"${previewTextStyleAttr({ scope: "carousel", field: "title" })}>${escapeHtml(state.carousel.title || "")}</h2>
      <p class="ll-carousel__lead"${previewTextStyleAttr({ scope: "carousel", field: "lead" })}>${escapeHtml(state.carousel.lead || "")}</p>
    </div>

${inputs}

    <div class="ll-carousel__viewport">
      <div class="ll-carousel__indicators">
${indicators}
      </div>
${sideHints}
      <div class="ll-carousel__track">
${panels}
      </div>
    </div>

    <nav class="ll-carousel__nav" style="grid-template-columns: repeat(${slides.length}, minmax(0, 1fr));" aria-label="Selecionar slide do carrossel">
${dots}
    </nav>
  </div>
</section>`;
    }

    function getTableHeaderColor(index = 0) {
      return normalizeCssColorValue(state.table.headerColors[index] || state.table.headerColor);
    }

    function normalizeTableHeaderColors() {
      const columns = getTableColumns();
      state.table.headerColors = columns.map((column, index) => {
        return normalizeCssColorValue(state.table.headerColors[index] || state.table.headerColor);
      });
    }

    function getPageFromHash() {
      if (fixedStartPage === "tecnica" || fixedStartPage === "conteudo") {
        return fixedStartPage;
      }

      if (window.location.hash === "#qualidade-tecnica") {
        return "tecnica";
      }

      if (window.location.hash === "#qualidade-conteudo") {
        return "conteudo";
      }

      return "home";
    }

    function getContentDashboardSections() {
      const filledFaqItems = state.items.filter((item) => item.question.trim() || item.answer.trim()).length;
      const visibleTableRows = getVisibleTableRows().length;
      const storySlides = state.stories.groups.reduce((total, group) => total + group.slides.length, 0);

      return [
        {
          tab: "faq",
          icon: "FAQ",
          title: "FAQ",
          summary: "Perguntas e respostas",
          meta: `${filledFaqItems || state.items.length} pergunta${(filledFaqItems || state.items.length) === 1 ? "" : "s"}`
        },
        {
          tab: "table",
          icon: "TAB",
          title: "Tabela",
          summary: "Produtos, SKUs e listas",
          meta: `${visibleTableRows || state.table.rows.length} linha${(visibleTableRows || state.table.rows.length) === 1 ? "" : "s"}`
        },
        {
          tab: "stories",
          icon: "ST",
          title: "Stories",
          summary: "Containers e slides",
          meta: `${state.stories.groups.length} container${state.stories.groups.length === 1 ? "" : "s"}`
        },
        {
          tab: "article",
          icon: "ART",
          title: "Artigo",
          summary: "Blocos com abas",
          meta: `${state.article.tabs.length} aba${state.article.tabs.length === 1 ? "" : "s"}`
        },
        {
          tab: "carousel",
          icon: "CAR",
          title: "Carrossel",
          summary: "Slides de impacto",
          meta: `${state.carousel.slides.length} slide${state.carousel.slides.length === 1 ? "" : "s"}`
        }
      ].map((section) => section.tab === "stories" ? {
        ...section,
        meta: `${state.stories.groups.length} container${state.stories.groups.length === 1 ? "" : "s"} / ${storySlides} slide${storySlides === 1 ? "" : "s"}`
      } : section);
    }

    function getTemplateDashboardSection() {
      return {
        tab: "template",
        icon: "LP",
        title: "FrameWork",
        summary: "Edite o HTML que vai dentro de Detalhes do produto, separado dos layouts.",
        meta: state.template.html.trim() ? "HTML carregado" : "Aguardando conteúdo"
      };
    }

    function getContentDashboardGuides() {
      return [
        {
          id: "ecommerce-insights",
          icon: "EC",
          title: "Guia de conteúdo para e-commerce",
          summary: "Insights visuais, textuais e checklists para montar conteúdo melhor.",
          meta: "Visual + texto + validação"
        },
        {
          id: "design-trends-2026",
          icon: "26",
          title: "Pesquisa de design publicitário 2026",
          summary: "Tendências visuais, IA, personalização e impacto estratégico em campanhas.",
          meta: "Design + IA + receita"
        },
        {
          id: "copywriting-trends-2026",
          icon: "CP",
          title: "Pesquisa de redação publicitária 2026",
          summary: "Humanização, IA como parceira, microconteúdo e personalização com mais intenção.",
          meta: "Copy + IA + autenticidade"
        }
      ];
    }

    function renderDashboardEditor() {
      const cards = getContentDashboardGuides().map((guide) => {
        const selected = state.dashboard.view === guide.id ? " aria-current=\"page\"" : "";
        return `<button class="dashboard-home__card" type="button" data-dashboard-guide="${guide.id}" aria-label="Abrir ${escapeHtml(guide.title)}"${selected}>
          <span class="dashboard-home__icon" aria-hidden="true">${escapeHtml(guide.icon)}</span>
          <strong>${escapeHtml(guide.title)}</strong>
          <span>${escapeHtml(guide.summary)}</span>
          <small class="dashboard-home__meta">${escapeHtml(guide.meta)}</small>
        </button>`;
      }).join("");

      return `<section class="dashboard-home" aria-label="Dashboard de layouts">
        <div class="dashboard-home__hero">
          <p class="dashboard-home__eyebrow">Layout Lab</p>
          <h3>Índices e guias de conteúdo.</h3>
          <p>Use esta coluna como biblioteca rápida. Os layouts ficam na área grande da prévia, prontos para abrir.</p>
        </div>
        <p class="dashboard-home__section-title">
          <strong>Guias disponíveis</strong>
          <span>Abra um guia para consultar sem sair do início.</span>
        </p>
        <div class="dashboard-home__grid">
${cards}
        </div>
      </section>`;
    }

    function buildDashboardGuidePreviewHtml() {
      const isDark = document.documentElement.dataset.theme === "dark";
      const colors = isDark ? {
        ink: "#f8fafc",
        muted: "#b8c4d6",
        bg: "#11101a",
        bgEnd: "#181326",
        paper: "#171323",
        soft: "#211936",
        line: "#35284c",
        accent: "#8b5cf6",
        warm: "#f97316",
        green: "#34d399",
        rose: "#fb7185",
        amber: "#fbbf24",
        quoteBg: "linear-gradient(135deg, #24163a, #3a1826)",
        quoteInk: "#ffffff",
        quoteMuted: "rgba(255, 255, 255, 0.78)",
        shadow: "0 20px 48px rgba(0, 0, 0, 0.34)"
      } : {
        ink: "#21172d",
        muted: "#665775",
        bg: "#fbf8ff",
        bgEnd: "#fff8f1",
        paper: "#fffefd",
        soft: "#f7efff",
        line: "#e8dcef",
        accent: "#7c3aed",
        warm: "#ea5b0c",
        green: "#16815e",
        rose: "#be3f6b",
        amber: "#b76a10",
        quoteBg: "linear-gradient(135deg, #ffffff, #fff4ea)",
        quoteInk: "#21172d",
        quoteMuted: "#665775",
        shadow: "0 18px 42px rgba(124, 58, 237, 0.13)"
      };

      return `<section class="ll-guide" aria-label="Guia de conteúdo para e-commerce">
  <header class="ll-guide__hero">
    <span class="ll-guide__eyebrow">Guia de conteúdo</span>
    <h1>Conteúdo para e-commerce com imagem que cria desejo e texto que dá motivo.</h1>
    <p>Uma base prática para validar imagens, frases e argumentos antes de montar FAQ, tabela, stories, artigo ou carrossel.</p>
    <div class="ll-guide__pill-row" aria-label="Partes do guia">
      <span>Visual</span>
      <span>Texto</span>
      <span>Checklist</span>
    </div>
  </header>

  <nav class="ll-guide__tabs" aria-label="Partes do guia">
    <button class="ll-guide__tab is-active" type="button" data-guide-tab="visual" aria-selected="true">Insights visuais <small>imagens para conteúdo</small></button>
    <button class="ll-guide__tab" type="button" data-guide-tab="texto" aria-selected="false">Insights textuais <small>textos para conteúdo</small></button>
  </nav>

  <main class="ll-guide__content">
    <section class="ll-guide__panel is-active" data-guide-panel="visual">
      <div class="ll-guide__chapter">
        <article class="ll-guide__quote">
          <strong>Se a imagem só mostra o item, ela informa. Se mostra uso, sensação e motivo, ela vende.</strong>
          <p>O visual precisa resolver rápido: o que é, por que chama atenção e qual sensação ele passa.</p>
        </article>
        <article class="ll-guide__card">
          <header>
            <h2>O que a imagem precisa fazer</h2>
            <span class="ll-guide__badge">visual</span>
          </header>
          <div class="ll-guide__steps">
            <div><b>1</b><strong>Mostrar exatamente o produto</strong><span>Forma, cor, proporção e detalhe precisam ser fáceis de entender.</span></div>
            <div><b>2</b><strong>Criar vontade de clicar</strong><span>A composição precisa gerar desejo, não só registrar o objeto.</span></div>
            <div><b>3</b><strong>Passar uma sensação clara</strong><span>Conforto, elegância, praticidade, exclusividade, durabilidade ou preço bom.</span></div>
          </div>
        </article>
      </div>

      <section class="ll-guide__card">
        <header>
          <h2>Tipos de imagem para conteúdo</h2>
          <span class="ll-guide__badge">linha visual</span>
        </header>
        <div class="ll-guide__mini-grid">
          <article><span>01</span><h3>Foto principal limpa</h3><p>Produto bem recortado, fundo neutro e sem distração.</p></article>
          <article><span>02</span><h3>Imagem de uso</h3><p>Produto sendo usado ou em contexto real para criar identificação.</p></article>
          <article><span>03</span><h3>Imagem de benefício</h3><p>Foco em conforto, leveza, design, praticidade ou durabilidade.</p></article>
          <article><span>04</span><h3>Imagem de detalhe</h3><p>Close para acabamento, textura, material e qualidade percebida.</p></article>
          <article><span>05</span><h3>Imagem de composição</h3><p>Produto em uma cena bonita, com contexto de estilo de vida.</p></article>
          <article><span>06</span><h3>Imagem comparativa</h3><p>Reforça diferenciais sem precisar explicar demais.</p></article>
        </div>
      </section>

      <section class="ll-guide__card">
        <header>
          <h2>Checklist visual</h2>
          <span class="ll-guide__badge" id="visual-score">0 de 12</span>
        </header>
        <div class="ll-guide__progress"><span id="visual-bar" style="--value: 0%;"></span></div>
        <div class="ll-guide__check-grid" data-checklist="visual">
          <label><input type="checkbox"><span>O produto é entendido em até 3 segundos.</span></label>
          <label><input type="checkbox"><span>O produto é o primeiro ponto de atenção.</span></label>
          <label><input type="checkbox"><span>A imagem passa uma sensação clara.</span></label>
          <label><input type="checkbox"><span>Não há ruído visual competindo com o produto.</span></label>
          <label><input type="checkbox"><span>Existe espaço vazio suficiente para leitura.</span></label>
          <label><input type="checkbox"><span>O contraste destaca o produto do fundo.</span></label>
          <label><input type="checkbox"><span>Há pelo menos uma imagem de uso ou contexto real.</span></label>
          <label><input type="checkbox"><span>Há pelo menos uma imagem de detalhe ou acabamento.</span></label>
          <label><input type="checkbox"><span>A composição parece elegante, não exagerada.</span></label>
          <label><input type="checkbox"><span>Texto na imagem é curto e fácil de ler.</span></label>
          <label><input type="checkbox"><span>A imagem dá vontade de clicar.</span></label>
          <label><input type="checkbox"><span>A sequência visual tem intenção, não repetição.</span></label>
        </div>
        <div class="ll-guide__actions">
          <button type="button" data-clear="visual">Limpar</button>
          <button type="button" data-essential="visual">Marcar essenciais</button>
        </div>
      </section>
    </section>

    <section class="ll-guide__panel" data-guide-panel="texto">
      <div class="ll-guide__chapter">
        <article class="ll-guide__quote">
          <strong>Texto bom em conteúdo não explica demais. Ele dá nome ao desejo.</strong>
          <p>Uma linha principal e, no máximo, uma linha de apoio. Clareza, leveza, objetividade, ritmo e benefício visível.</p>
        </article>
        <article class="ll-guide__card">
          <header>
            <h2>O que o texto precisa fazer</h2>
            <span class="ll-guide__badge ll-guide__badge--warm">texto</span>
          </header>
          <div class="ll-guide__steps">
            <div><b>1</b><strong>Dar benefício concreto</strong><span>Não diga só “qualidade”. Diga o que a pessoa sente ou ganha.</span></div>
            <div><b>2</b><strong>Ser curto para ler sem esforço</strong><span>Uma frase boa funciona como legenda, headline e direção criativa.</span></div>
            <div><b>3</b><strong>Combinar com a imagem</strong><span>Texto e visual precisam vender a mesma ideia.</span></div>
          </div>
        </article>
      </div>

      <section class="ll-guide__card">
        <header>
          <h2>Frases melhores para usar como ponto de partida</h2>
          <span class="ll-guide__badge">exemplos</span>
        </header>
        <div class="ll-guide__mini-grid">
          <article><h3>Conforto em cada passo.</h3><p>Curto, sensorial e direto.</p></article>
          <article><h3>Design versátil para o dia a dia.</h3><p>Une estilo e uso real.</p></article>
          <article><h3>Estilo que acompanha sua rotina.</h3><p>Coloca o produto dentro da vida da pessoa.</p></article>
          <article><h3>O essencial com mais estilo.</h3><p>Posiciona sem exagerar.</p></article>
          <article><h3>Mais leveza para o seu dia.</h3><p>Foca sensação antes de técnica.</p></article>
          <article><h3>Design que combina com qualquer ocasião.</h3><p>Ajuda a vender versatilidade.</p></article>
        </div>
      </section>

      <section class="ll-guide__card">
        <header>
          <h2>Checklist textual</h2>
          <span class="ll-guide__badge" id="text-score">0 de 12</span>
        </header>
        <div class="ll-guide__progress"><span id="text-bar" style="--value: 0%;"></span></div>
        <div class="ll-guide__check-grid" data-checklist="text">
          <label><input type="checkbox"><span>O texto comunica um benefício concreto.</span></label>
          <label><input type="checkbox"><span>A frase é curta o bastante para ler rápido.</span></label>
          <label><input type="checkbox"><span>O texto combina com a imagem usada.</span></label>
          <label><input type="checkbox"><span>A primeira linha não é genérica.</span></label>
          <label><input type="checkbox"><span>Existe sensação clara: conforto, leveza, estilo ou praticidade.</span></label>
          <label><input type="checkbox"><span>O texto evita promessas vagas como “melhor opção”.</span></label>
          <label><input type="checkbox"><span>Existe ritmo bom ao ler em voz alta.</span></label>
          <label><input type="checkbox"><span>Se houver CTA, ele é direto e único.</span></label>
          <label><input type="checkbox"><span>A linha de apoio não repete a headline.</span></label>
          <label><input type="checkbox"><span>O texto reforça desejo ou confiança.</span></label>
          <label><input type="checkbox"><span>A mensagem não explica demais.</span></label>
          <label><input type="checkbox"><span>O texto dá motivo para prestar atenção.</span></label>
        </div>
        <div class="ll-guide__actions">
          <button type="button" data-clear="text">Limpar</button>
          <button type="button" data-essential="text">Marcar essenciais</button>
        </div>
      </section>
    </section>
  </main>
</section>

<style>
  html,
  body {
    min-height: 100%;
    margin: 0;
    background: ${colors.bgEnd};
  }

  .ll-guide {
    min-height: 100vh;
    padding: clamp(20px, 3.5vw, 42px);
    color: ${colors.ink};
    background: linear-gradient(180deg, ${colors.bg}, ${colors.bgEnd});
    font-family: Inter, Arial, sans-serif;
  }

  .ll-guide * {
    box-sizing: border-box;
  }

  .ll-guide button,
  .ll-guide input {
    font: inherit;
  }

  .ll-guide__hero,
  .ll-guide__card,
  .ll-guide__quote,
  .ll-guide__tab {
    border: 1px solid ${colors.line};
    border-radius: 8px;
    background: ${colors.paper};
    box-shadow: ${colors.shadow};
  }

  .ll-guide__hero {
    display: grid;
    gap: 12px;
    min-height: 280px;
    align-content: end;
    padding: clamp(22px, 5vw, 48px);
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.24), rgba(234, 91, 12, 0.11)), ${colors.paper};
  }

  .ll-guide__eyebrow,
  .ll-guide__badge,
  .ll-guide__mini-grid span {
    color: ${colors.accent};
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .ll-guide__hero h1 {
    max-width: 980px;
    margin: 0;
    font-size: clamp(38px, 6vw, 78px);
    line-height: 0.98;
  }

  .ll-guide__hero p {
    max-width: 760px;
    margin: 0;
    color: ${colors.muted};
    font-size: 17px;
    line-height: 1.5;
  }

  .ll-guide__pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .ll-guide__pill-row span {
    padding: 7px 11px;
    border: 1px solid ${colors.line};
    border-radius: 999px;
    background: ${colors.soft};
    color: ${colors.ink};
    font-size: 12px;
    font-weight: 900;
  }

  .ll-guide__tabs {
    position: sticky;
    top: 0;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin: 18px 0;
    padding: 10px 0;
    background: linear-gradient(180deg, ${colors.bg}, rgba(255, 255, 255, 0));
  }

  .ll-guide__tab {
    min-height: 58px;
    padding: 10px 14px;
    color: ${colors.muted};
    text-align: left;
    cursor: pointer;
  }

  .ll-guide__tab.is-active {
    color: #ffffff;
    border-color: ${colors.accent};
    background: linear-gradient(135deg, ${colors.accent}, ${colors.warm});
  }

  .ll-guide__tab small {
    display: block;
    margin-top: 2px;
    font-size: 12px;
    opacity: 0.78;
  }

  .ll-guide__content,
  .ll-guide__panel {
    display: grid;
    gap: 16px;
  }

  .ll-guide__panel {
    display: none;
  }

  .ll-guide__panel.is-active {
    display: grid;
  }

  .ll-guide__chapter {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(320px, 1.05fr);
    gap: 16px;
  }

  .ll-guide__quote {
    display: grid;
    gap: 18px;
    align-content: space-between;
    padding: 24px;
    color: ${colors.quoteInk};
    background: ${colors.quoteBg};
  }

  .ll-guide__quote strong {
    font-size: clamp(25px, 3vw, 42px);
    line-height: 1.05;
  }

  .ll-guide__quote p,
  .ll-guide__card p,
  .ll-guide__steps span {
    color: ${colors.muted};
  }

  .ll-guide__quote p {
    color: ${colors.quoteMuted};
    margin: 0;
  }

  .ll-guide__card {
    display: grid;
    gap: 16px;
    padding: 20px;
  }

  .ll-guide__card header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
  }

  .ll-guide__card h2,
  .ll-guide__card h3,
  .ll-guide__card p {
    margin: 0;
  }

  .ll-guide__badge {
    width: max-content;
    padding: 5px 9px;
    border-radius: 999px;
    background: ${colors.soft};
  }

  .ll-guide__badge--warm {
    color: ${colors.warm};
  }

  .ll-guide__steps,
  .ll-guide__mini-grid,
  .ll-guide__check-grid {
    display: grid;
    gap: 10px;
  }

  .ll-guide__steps div,
  .ll-guide__mini-grid article,
  .ll-guide__check-grid label {
    border: 1px solid ${colors.line};
    border-radius: 8px;
    background: ${colors.soft};
  }

  .ll-guide__steps div {
    display: grid;
    grid-template-columns: 38px 1fr;
    gap: 4px 12px;
    padding: 12px;
  }

  .ll-guide__steps b {
    grid-row: span 2;
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 7px;
    color: #fff;
    background: ${colors.accent};
  }

  .ll-guide__steps strong {
    font-size: 14px;
  }

  .ll-guide__steps span {
    font-size: 13px;
  }

  .ll-guide__mini-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ll-guide__mini-grid article {
    min-height: 144px;
    padding: 15px;
  }

  .ll-guide__mini-grid h3 {
    margin-top: 8px;
    font-size: 17px;
  }

  .ll-guide__mini-grid p {
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.45;
  }

  .ll-guide__progress {
    height: 8px;
    border-radius: 999px;
    overflow: hidden;
    background: ${colors.soft};
  }

  .ll-guide__progress span {
    display: block;
    width: var(--value);
    height: 100%;
    background: linear-gradient(90deg, ${colors.accent}, ${colors.warm});
  }

  .ll-guide__check-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ll-guide__check-grid label {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    min-height: 46px;
    padding: 10px;
    color: ${colors.ink};
    font-size: 13px;
  }

  .ll-guide__check-grid input {
    margin-top: 2px;
    accent-color: ${colors.accent};
  }

  .ll-guide__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .ll-guide__actions button {
    min-height: 36px;
    padding: 0 12px;
    border: 1px solid ${colors.line};
    border-radius: 7px;
    color: ${colors.ink};
    background: ${colors.paper};
    font-weight: 850;
    cursor: pointer;
  }

  .ll-guide__actions button:last-child {
    color: #fff;
    border-color: ${colors.accent};
    background: ${colors.accent};
  }

  @media (max-width: 900px) {
    .ll-guide__chapter,
    .ll-guide__mini-grid,
    .ll-guide__check-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
  (() => {
    const tabs = Array.from(document.querySelectorAll("[data-guide-tab]"));
    const panels = Array.from(document.querySelectorAll("[data-guide-panel]"));
    const config = {
      visual: { score: document.querySelector("#visual-score"), bar: document.querySelector("#visual-bar"), essential: [0, 1, 2, 3, 9, 10] },
      text: { score: document.querySelector("#text-score"), bar: document.querySelector("#text-bar"), essential: [0, 1, 2, 3, 7, 11] }
    };

    function activateTab(name) {
      const y = window.scrollY;
      tabs.forEach((tab) => {
        const active = tab.dataset.guideTab === name;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.guidePanel === name);
      });
      requestAnimationFrame(() => window.scrollTo(0, y));
    }

    function updateChecklist(name) {
      const boxes = Array.from(document.querySelectorAll('[data-checklist="' + name + '"] input'));
      const done = boxes.filter((box) => box.checked).length;
      const total = boxes.length || 1;
      const item = config[name];
      if (!item) return;
      item.score.textContent = done + " de " + total;
      item.bar.style.setProperty("--value", Math.round((done / total) * 100) + "%");
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        activateTab(tab.dataset.guideTab);
      });
    });

    Object.keys(config).forEach((name) => {
      document.querySelectorAll('[data-checklist="' + name + '"] input').forEach((box) => {
        box.addEventListener("change", () => updateChecklist(name));
      });
      updateChecklist(name);
    });

    document.querySelectorAll("[data-clear]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const name = button.dataset.clear;
        document.querySelectorAll('[data-checklist="' + name + '"] input').forEach((box) => {
          box.checked = false;
        });
        updateChecklist(name);
      });
    });

    document.querySelectorAll("[data-essential]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const name = button.dataset.essential;
        const boxes = Array.from(document.querySelectorAll('[data-checklist="' + name + '"] input'));
        (config[name]?.essential || []).forEach((index) => {
          if (boxes[index]) boxes[index].checked = true;
        });
        updateChecklist(name);
      });
    });
  })();
<\/script>`;
    }

    function buildDashboardDesignTrendsPreviewHtml() {
      const isDark = document.documentElement.dataset.theme === "dark";
      const colors = isDark ? {
        ink: "#f8fafc",
        muted: "#b8c4d6",
        bg: "#11101a",
        bgEnd: "#181326",
        paper: "#171323",
        soft: "#211936",
        line: "#35284c",
        accent: "#8b5cf6",
        warm: "#f97316",
        green: "#34d399",
        rose: "#fb7185",
        shadow: "0 20px 48px rgba(0, 0, 0, 0.34)"
      } : {
        ink: "#21172d",
        muted: "#665775",
        bg: "#fbf8ff",
        bgEnd: "#fff8f1",
        paper: "#fffefd",
        soft: "#f7efff",
        line: "#e8dcef",
        accent: "#7c3aed",
        warm: "#ea5b0c",
        green: "#16815e",
        rose: "#be3f6b",
        shadow: "0 18px 42px rgba(124, 58, 237, 0.13)"
      };

      const trends = [
        ["Glassmorphism", "Vidro, profundidade e transparência para marcas que querem comunicar inovação."],
        ["Liquid Design", "Formas fluidas e quase vivas para transmitir adaptabilidade."],
        ["Bento Grid", "Blocos modulares para landing pages, dashboards e carrosséis informativos."],
        ["Maximalismo", "Cores vibrantes, tipografia audaciosa e composições cheias para fugir do minimalismo genérico."],
        ["Gradiente + textura + 3D", "Degradês suaves, ruído e formas volumétricas para dar corpo ao digital."],
        ["Type Collage", "Recortes, grafite e linguagem crua para uma estética artesanal e neo-retro."],
        ["Anti-design", "Ruído, baixa resolução e choque visual para quebrar a perfeição artificial."]
      ].map((item, index) => `<article>
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${item[0]}</h3>
        <p>${item[1]}</p>
      </article>`).join("");

      return `<section class="ll-research" aria-label="Pesquisa de design publicitário em 2026">
  <header class="ll-research__hero">
    <span>Pesquisa de design publicitário</span>
    <h1>Tendências de design em 2026: IA, autoria humana e visuais com mais intenção.</h1>
    <p>Resumo prático da pesquisa enviada: o design publicitário de 2026 combina inteligência artificial, dados e personalização, mas precisa manter autenticidade para não virar estética genérica.</p>
  </header>

  <main class="ll-research__content">
    <section class="ll-research__card ll-research__card--lead">
      <div>
        <span class="ll-research__badge">leitura rápida</span>
        <h2>O ponto central</h2>
      </div>
      <p>As tendências não geram receita sozinhas. Elas criam condições melhores para campanha performar quando são usadas com estratégia, personalização relevante, métrica clara e olhar humano.</p>
    </section>

    <section class="ll-research__card">
      <div class="ll-research__head">
        <h2>Tendências visuais principais</h2>
        <span class="ll-research__badge">visual</span>
      </div>
      <div class="ll-research__grid">
${trends}
      </div>
    </section>

    <section class="ll-research__split">
      <article class="ll-research__card">
        <span class="ll-research__badge ll-research__badge--warm">IA</span>
        <h2>O papel da IA</h2>
        <ul>
          <li>IA deixa de ser experimento e vira parceira de bancada criativa.</li>
          <li>IA agêntica reduz tempo de produção e aumenta eficiência operacional.</li>
          <li>Personalização dinâmica adapta imagem, mensagem e produto por usuário.</li>
        </ul>
      </article>
      <article class="ll-research__card">
        <span class="ll-research__badge ll-research__badge--green">receita</span>
        <h2>Impacto comercial</h2>
        <ul>
          <li>Personalização tende a aumentar relevância e conversão.</li>
          <li>Automação permite produzir mais campanhas com o mesmo custo.</li>
          <li>Insights reais de audiência tornam a criatividade menos intuitiva e mais direcionada.</li>
        </ul>
      </article>
    </section>

    <section class="ll-research__card">
      <div class="ll-research__head">
        <h2>Como aplicar no Layout Lab</h2>
        <span class="ll-research__badge">prático</span>
      </div>
      <div class="ll-research__steps">
        <div><b>1</b><strong>Use Bento Grid como lógica</strong><span>Prefira blocos organizados quando o conteúdo tiver muitas ideias, dados ou comparações.</span></div>
        <div><b>2</b><strong>Use maximalismo com controle</strong><span>Cores e composição podem chamar atenção, mas precisam preservar leitura e foco no produto.</span></div>
        <div><b>3</b><strong>Use anti-design com motivo</strong><span>Visual cru funciona para quebrar fadiga, não como bagunça gratuita.</span></div>
        <div><b>4</b><strong>Combine IA com curadoria humana</strong><span>A imagem pode nascer de IA, mas o acabamento precisa parecer intencional, específico e verdadeiro.</span></div>
      </div>
    </section>

    <section class="ll-research__card ll-research__note">
      <h2>Alerta da pesquisa</h2>
      <p>Quanto mais polido e gerado por IA o visual parece, mais a marca precisa provar autenticidade. O excesso de estética perfeita pode causar fadiga de anúncio.</p>
    </section>
  </main>
</section>

<style>
  html,
  body {
    min-height: 100%;
    margin: 0;
    background: ${colors.bgEnd};
  }

  .ll-research {
    min-height: 100vh;
    padding: clamp(20px, 3.5vw, 42px);
    color: ${colors.ink};
    background: radial-gradient(circle at 18% 12%, rgba(124, 58, 237, 0.2), transparent 34%), linear-gradient(180deg, ${colors.bg}, ${colors.bgEnd});
    font-family: Inter, Arial, sans-serif;
  }

  .ll-research * {
    box-sizing: border-box;
  }

  .ll-research__hero,
  .ll-research__card {
    border: 1px solid ${colors.line};
    border-radius: 8px;
    background: ${colors.paper};
    box-shadow: ${colors.shadow};
  }

  .ll-research__hero {
    display: grid;
    gap: 12px;
    min-height: 320px;
    align-content: end;
    padding: clamp(24px, 5vw, 52px);
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.32), rgba(234, 91, 12, 0.14)), ${colors.paper};
  }

  .ll-research__home-chip {
    display: inline-grid;
    width: 34px;
    height: 34px;
    place-items: center;
    min-height: 30px;
    padding: 0;
    border: 1px solid ${colors.line};
    border-radius: 8px;
    color: ${colors.accent};
    background: ${colors.paper};
    font: inherit;
    font-size: 12px;
    font-weight: 900;
    cursor: pointer;
  }

  .ll-research__home-chip svg {
    width: 17px;
    height: 17px;
    stroke: currentColor;
  }

  .ll-research__hero > span,
  .ll-research__badge,
  .ll-research__grid article span {
    color: ${colors.accent};
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .ll-research__hero h1 {
    max-width: 1040px;
    margin: 0;
    font-size: clamp(38px, 6vw, 76px);
    line-height: 0.98;
  }

  .ll-research__hero p,
  .ll-research__card p,
  .ll-research li,
  .ll-research__steps span {
    color: ${colors.muted};
    line-height: 1.55;
  }

  .ll-research__hero p {
    max-width: 760px;
    margin: 0;
    font-size: 17px;
  }

  .ll-research__content {
    display: grid;
    gap: 16px;
    margin-top: 18px;
  }

  .ll-research__card {
    display: grid;
    gap: 16px;
    padding: clamp(18px, 3vw, 28px);
  }

  .ll-research__card--lead {
    grid-template-columns: minmax(220px, 0.55fr) minmax(0, 1fr);
    align-items: center;
  }

  .ll-research h2,
  .ll-research h3,
  .ll-research p,
  .ll-research ul {
    margin: 0;
  }

  .ll-research__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .ll-research__badge {
    width: max-content;
    padding: 5px 9px;
    border-radius: 999px;
    background: ${colors.soft};
  }

  .ll-research__badge--warm {
    color: ${colors.warm};
  }

  .ll-research__badge--green {
    color: ${colors.green};
  }

  .ll-research__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .ll-research__grid article,
  .ll-research__steps div {
    border: 1px solid ${colors.line};
    border-radius: 8px;
    background: ${colors.soft};
  }

  .ll-research__grid article {
    min-height: 150px;
    padding: 15px;
  }

  .ll-research__grid h3 {
    margin-top: 8px;
    font-size: 18px;
  }

  .ll-research__grid p {
    margin-top: 8px;
    font-size: 13px;
  }

  .ll-research__split {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .ll-research ul {
    display: grid;
    gap: 10px;
    padding-left: 18px;
  }

  .ll-research__steps {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .ll-research__steps div {
    display: grid;
    grid-template-columns: 38px 1fr;
    gap: 4px 12px;
    padding: 12px;
  }

  .ll-research__steps b {
    grid-row: span 2;
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 7px;
    color: #fff;
    background: ${colors.accent};
  }

  .ll-research__steps strong {
    font-size: 14px;
  }

  .ll-research__steps span {
    font-size: 13px;
  }

  .ll-research__note {
    border-color: ${colors.warm};
    background: linear-gradient(135deg, rgba(234, 91, 12, 0.13), rgba(124, 58, 237, 0.08)), ${colors.paper};
  }

  @media (max-width: 900px) {
    .ll-research__card--lead,
    .ll-research__grid,
    .ll-research__split,
    .ll-research__steps {
      grid-template-columns: 1fr;
    }
  }
</style>`;
    }

    function buildDashboardCopywritingTrendsPreviewHtml() {
      const isDark = document.documentElement.dataset.theme === "dark";
      const colors = isDark ? {
        ink: "#f8fafc",
        muted: "#b8c4d6",
        bg: "#11101a",
        bgEnd: "#181326",
        paper: "#171323",
        soft: "#211936",
        line: "#35284c",
        accent: "#8b5cf6",
        warm: "#f97316",
        blue: "#38bdf8",
        green: "#34d399",
        shadow: "0 20px 48px rgba(0, 0, 0, 0.34)"
      } : {
        ink: "#21172d",
        muted: "#665775",
        bg: "#fbf8ff",
        bgEnd: "#fff8f1",
        paper: "#fffefd",
        soft: "#f7efff",
        line: "#e8dcef",
        accent: "#7c3aed",
        warm: "#ea5b0c",
        blue: "#0369a1",
        green: "#16815e",
        shadow: "0 18px 42px rgba(124, 58, 237, 0.13)"
      };

      const trends = [
        ["Humanização do conteúdo", "Textos reais, intencionais e menos genéricos para construir confiança."],
        ["IA como parceira", "IA entra na estratégia, mas a criatividade humana continua sendo o filtro final."],
        ["Conteúdo em tempo real", "Marcas respondem ao agora com ofertas, mensagens e contexto mais ágeis."],
        ["Microconteúdo", "Frases curtas e impactantes para leitura rápida em carrosséis, stories e anúncios."],
        ["Conteúdo colaborativo", "Criadores, influenciadores e comunidades entram na construção da mensagem."],
        ["Influência de verdade", "O valor está na conexão com o público, não só na origem da mensagem."],
        ["Personalização criativa", "IA ajusta mensagens por comportamento, histórico e intenção do usuário."],
        ["Consistência multiformato", "A mesma ideia central aparece em formatos diferentes e aumenta retorno."],
        ["Redação contextual", "O texto conversa com cena, momento, canal e intenção de consumo."]
      ].map((item, index) => `<article>
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${item[0]}</h3>
        <p>${item[1]}</p>
      </article>`).join("");

      return `<section class="ll-copy-study" aria-label="Pesquisa de redação publicitária em 2026">
  <header class="ll-copy-study__hero">
    <span>Pesquisa de redação publicitária</span>
    <h1>Copywriting em 2026: menos texto genérico, mais intenção humana.</h1>
    <p>Resumo prático do estudo enviado: a redação publicitária passa a equilibrar IA, velocidade e personalização com autenticidade, conexão real e mensagens menos superficiais.</p>
  </header>

  <main class="ll-copy-study__content">
    <section class="ll-copy-study__card ll-copy-study__card--lead">
      <div>
        <span class="ll-copy-study__badge">ideia central</span>
        <h2>O texto precisa parecer escolhido, não preenchido.</h2>
      </div>
      <p>Em 2026, a vantagem não está em produzir mais texto. Está em produzir frases com gosto, contexto, intenção e conexão. IA acelera, mas o valor aparece na curadoria humana.</p>
    </section>

    <section class="ll-copy-study__card">
      <div class="ll-copy-study__head">
        <h2>Principais tendências da redação publicitária</h2>
        <span class="ll-copy-study__badge">copy</span>
      </div>
      <div class="ll-copy-study__grid">
${trends}
      </div>
    </section>

    <section class="ll-copy-study__split">
      <article class="ll-copy-study__card">
        <span class="ll-copy-study__badge ll-copy-study__badge--warm">estratégia</span>
        <h2>O que muda na construção da mensagem</h2>
        <ul>
          <li>Insights e criatividade deixam de ser etapas separadas.</li>
          <li>Dados próprios ficam mais importantes com a redução de cookies.</li>
          <li>Conteúdos precisam funcionar em múltiplos formatos sem perder a ideia central.</li>
          <li>SEO precisa considerar pesquisa com IA e novas formas de descoberta.</li>
        </ul>
      </article>
      <article class="ll-copy-study__card">
        <span class="ll-copy-study__badge ll-copy-study__badge--green">paradoxo</span>
        <h2>"Feito por humanos" vira diferencial</h2>
        <p>Com automação criativa produzindo em escala, o texto com sinal de escolha humana ganha força: menos volume, mais gosto, mais precisão e mais verdade.</p>
      </article>
    </section>

    <section class="ll-copy-study__card">
      <div class="ll-copy-study__head">
        <h2>Como aplicar no Layout Lab</h2>
        <span class="ll-copy-study__badge">prático</span>
      </div>
      <div class="ll-copy-study__steps">
        <div><b>1</b><strong>Comece pela sensação</strong><span>Antes da frase, defina o que a pessoa deve sentir: confiança, desejo, urgência, clareza ou curiosidade.</span></div>
        <div><b>2</b><strong>Use microcopy com função</strong><span>Em stories e carrosséis, cada frase precisa carregar uma ideia, não enfeitar o layout.</span></div>
        <div><b>3</b><strong>Mantenha uma ideia por bloco</strong><span>Evite transformar legenda em parágrafo. Um slide, uma promessa, um motivo.</span></div>
        <div><b>4</b><strong>Revise contra o genérico</strong><span>Troque frases como "qualidade garantida" por benefício observável, contexto de uso ou prova concreta.</span></div>
      </div>
    </section>

    <section class="ll-copy-study__card ll-copy-study__examples">
      <div class="ll-copy-study__head">
        <h2>Trocas rápidas para melhorar texto</h2>
        <span class="ll-copy-study__badge">antes/depois</span>
      </div>
      <div class="ll-copy-study__pairs">
        <article><small>genérico</small><p>Produto de alta qualidade.</p><strong>Feito para durar na rotina.</strong></article>
        <article><small>genérico</small><p>Design moderno e bonito.</p><strong>Visual leve para combinar sem esforço.</strong></article>
        <article><small>genérico</small><p>Ideal para todos os momentos.</p><strong>Do uso rápido ao dia inteiro, sem complicar.</strong></article>
      </div>
    </section>
  </main>
</section>

<style>
  html,
  body {
    min-height: 100%;
    margin: 0;
    background: ${colors.bgEnd};
  }

  .ll-copy-study {
    min-height: 100vh;
    padding: clamp(20px, 3.5vw, 42px);
    color: ${colors.ink};
    background: radial-gradient(circle at 80% 8%, rgba(234, 91, 12, 0.18), transparent 34%), linear-gradient(180deg, ${colors.bg}, ${colors.bgEnd});
    font-family: Inter, Arial, sans-serif;
  }

  .ll-copy-study * {
    box-sizing: border-box;
  }

  .ll-copy-study__hero,
  .ll-copy-study__card {
    border: 1px solid ${colors.line};
    border-radius: 8px;
    background: ${colors.paper};
    box-shadow: ${colors.shadow};
  }

  .ll-copy-study__hero {
    display: grid;
    gap: 12px;
    min-height: 320px;
    align-content: end;
    padding: clamp(24px, 5vw, 52px);
    background: linear-gradient(135deg, rgba(234, 91, 12, 0.2), rgba(124, 58, 237, 0.22)), ${colors.paper};
  }

  .ll-copy-study__home-chip {
    display: inline-grid;
    width: 34px;
    height: 34px;
    place-items: center;
    min-height: 30px;
    padding: 0;
    border: 1px solid ${colors.line};
    border-radius: 8px;
    color: ${colors.accent};
    background: ${colors.paper};
    font: inherit;
    font-size: 12px;
    font-weight: 900;
    cursor: pointer;
  }

  .ll-copy-study__home-chip svg {
    width: 17px;
    height: 17px;
    stroke: currentColor;
  }

  .ll-copy-study__hero > span,
  .ll-copy-study__badge,
  .ll-copy-study__grid article span {
    color: ${colors.accent};
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .ll-copy-study__hero h1 {
    max-width: 980px;
    margin: 0;
    font-size: clamp(38px, 6vw, 76px);
    line-height: 0.98;
  }

  .ll-copy-study__hero p,
  .ll-copy-study__card p,
  .ll-copy-study li,
  .ll-copy-study__steps span {
    color: ${colors.muted};
    line-height: 1.55;
  }

  .ll-copy-study__hero p {
    max-width: 760px;
    margin: 0;
    font-size: 17px;
  }

  .ll-copy-study__content {
    display: grid;
    gap: 16px;
    margin-top: 18px;
  }

  .ll-copy-study__card {
    display: grid;
    gap: 16px;
    padding: clamp(18px, 3vw, 28px);
  }

  .ll-copy-study__card--lead {
    grid-template-columns: minmax(220px, 0.55fr) minmax(0, 1fr);
    align-items: center;
  }

  .ll-copy-study h2,
  .ll-copy-study h3,
  .ll-copy-study p,
  .ll-copy-study ul {
    margin: 0;
  }

  .ll-copy-study__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .ll-copy-study__badge {
    width: max-content;
    padding: 5px 9px;
    border-radius: 999px;
    background: ${colors.soft};
  }

  .ll-copy-study__badge--warm {
    color: ${colors.warm};
  }

  .ll-copy-study__badge--green {
    color: ${colors.green};
  }

  .ll-copy-study__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .ll-copy-study__grid article,
  .ll-copy-study__steps div,
  .ll-copy-study__pairs article {
    border: 1px solid ${colors.line};
    border-radius: 8px;
    background: ${colors.soft};
  }

  .ll-copy-study__grid article {
    min-height: 150px;
    padding: 15px;
  }

  .ll-copy-study__grid h3 {
    margin-top: 8px;
    font-size: 18px;
  }

  .ll-copy-study__grid p {
    margin-top: 8px;
    font-size: 13px;
  }

  .ll-copy-study__split {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .ll-copy-study ul {
    display: grid;
    gap: 10px;
    padding-left: 18px;
  }

  .ll-copy-study__steps,
  .ll-copy-study__pairs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .ll-copy-study__steps div {
    display: grid;
    grid-template-columns: 38px 1fr;
    gap: 4px 12px;
    padding: 12px;
  }

  .ll-copy-study__steps b {
    grid-row: span 2;
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 7px;
    color: #fff;
    background: ${colors.accent};
  }

  .ll-copy-study__steps strong {
    font-size: 14px;
  }

  .ll-copy-study__steps span {
    font-size: 13px;
  }

  .ll-copy-study__pairs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ll-copy-study__pairs article {
    display: grid;
    gap: 8px;
    padding: 15px;
  }

  .ll-copy-study__pairs small {
    color: ${colors.warm};
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .ll-copy-study__pairs strong {
    color: ${colors.ink};
    font-size: 16px;
  }

  @media (max-width: 900px) {
    .ll-copy-study__card--lead,
    .ll-copy-study__grid,
    .ll-copy-study__split,
    .ll-copy-study__steps,
    .ll-copy-study__pairs {
      grid-template-columns: 1fr;
    }
  }
</style>`;
    }

    function buildDashboardPreviewHtml() {
      if (state.dashboard.view === "ecommerce-insights") {
        return buildDashboardGuidePreviewHtml();
      }

      if (state.dashboard.view === "design-trends-2026") {
        return buildDashboardDesignTrendsPreviewHtml();
      }

      if (state.dashboard.view === "copywriting-trends-2026") {
        return buildDashboardCopywritingTrendsPreviewHtml();
      }

      const isDark = document.documentElement.dataset.theme === "dark";
      const colors = isDark ? {
        ink: "#f8fafc",
        muted: "#b8c4d6",
        bg: "#11101a",
        bgEnd: "#181326",
        hero: "linear-gradient(135deg, rgba(124, 58, 237, 0.26), rgba(234, 91, 12, 0.13))",
        card: "#171323",
        cardHover: "#211936",
        line: "#35284c",
        accent: "#8b5cf6",
        warm: "#f97316",
        shadow: "0 20px 48px rgba(0, 0, 0, 0.34)"
      } : {
        ink: "#21172d",
        muted: "#6b5b7b",
        bg: "#fbf8ff",
        bgEnd: "#fff8f1",
        hero: "linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(234, 91, 12, 0.09)), #fffefd",
        card: "#fffefd",
        cardHover: "#fff7ef",
        line: "#e8dcef",
        accent: "#7c3aed",
        warm: "#ea5b0c",
        shadow: "0 18px 42px rgba(124, 58, 237, 0.14)"
      };
      const cards = getContentDashboardSections().map((section) => {
        return `<button class="ll-dashboard__card" type="button" data-dashboard-preview-tab="${section.tab}" aria-label="Abrir ${escapeHtml(section.title)}">
          <span>${escapeHtml(section.icon)}</span>
          <strong>${escapeHtml(section.title)}</strong>
          <em>${escapeHtml(section.summary)}</em>
          <small>${escapeHtml(section.meta)}</small>
        </button>`;
      }).join("");
      const lpSection = getTemplateDashboardSection();
      const lpCard = `<button class="ll-dashboard__lp-card" type="button" data-dashboard-preview-tab="${lpSection.tab}" aria-label="Abrir ${escapeHtml(lpSection.title)}">
    <span>${escapeHtml(lpSection.icon)}</span>
    <div>
      <strong>${escapeHtml(lpSection.title)}</strong>
      <em>${escapeHtml(lpSection.summary)}</em>
    </div>
    <small>${escapeHtml(lpSection.meta)}</small>
  </button>`;

      return `<section class="ll-dashboard" aria-label="Dashboard do Layout Lab">
  <div class="ll-dashboard__hero">
    <h1>Qualidade Conteúdo</h1>
    <small>Escolha um layout para começar. Os guias ficam na coluna da esquerda.</small>
  </div>
  <p class="ll-dashboard__section-label">Layouts de conteúdo</p>
  <div class="ll-dashboard__grid">
${cards}
  </div>
  <p class="ll-dashboard__section-label ll-dashboard__section-label--lp">Modo de integração</p>
  <div class="ll-dashboard__lp">
${lpCard}
  </div>
</section>

<style>
  html,
  body {
    min-height: 100%;
    margin: 0;
    background: ${colors.bgEnd};
  }

  .ll-dashboard {
    min-height: 100vh;
    padding: clamp(22px, 4vw, 46px);
    color: ${colors.ink};
    background: linear-gradient(180deg, ${colors.bg}, ${colors.bgEnd});
    font-family: Inter, Arial, sans-serif;
  }

  .ll-dashboard__hero {
    display: grid;
    gap: 8px;
    min-height: 260px;
    align-content: end;
    margin: 0 0 22px;
    padding: clamp(24px, 5vw, 48px);
    border-radius: 8px;
    border: 1px solid ${colors.line};
    background: ${colors.hero};
    box-shadow: ${colors.shadow};
  }

  .ll-dashboard__home-chip {
    display: inline-grid;
    width: 34px;
    height: 34px;
    place-items: center;
    min-height: 30px;
    padding: 0;
    border: 1px solid ${colors.line};
    border-radius: 8px;
    color: ${colors.accent};
    background: ${colors.card};
    font: inherit;
    font-size: 12px;
    font-weight: 900;
    cursor: pointer;
  }

  .ll-dashboard__home-chip svg {
    width: 17px;
    height: 17px;
    stroke: currentColor;
  }

  .ll-dashboard__hero p,
  .ll-dashboard__hero h1,
  .ll-dashboard__hero small {
    margin: 0;
  }

  .ll-dashboard__hero p {
    color: ${colors.accent};
    font-size: 13px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .ll-dashboard__hero h1 {
    max-width: 760px;
    font-size: clamp(40px, 7vw, 86px);
    line-height: 0.96;
  }

  .ll-dashboard__hero small {
    color: ${colors.muted};
    font-size: 14px;
    font-weight: 700;
  }

  .ll-dashboard__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }

  .ll-dashboard__section-label {
    margin: 0 0 10px;
    color: ${colors.muted};
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .ll-dashboard__section-label--lp {
    margin-top: 24px;
  }

  .ll-dashboard__card {
    display: grid;
    gap: 10px;
    min-height: 136px;
    padding: 18px;
    border: 1px solid ${colors.line};
    border-radius: 8px;
    color: ${colors.ink};
    background: ${colors.card};
    text-align: left;
    cursor: pointer;
    box-shadow: none;
    transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease, box-shadow 0.14s ease;
  }

  .ll-dashboard__card:hover,
  .ll-dashboard__card:focus-visible {
    border-color: ${colors.warm};
    background: ${colors.cardHover};
    box-shadow: 0 7px 16px rgba(234, 91, 12, 0.12);
    outline: none;
    transform: translateY(-2px);
  }

  .ll-dashboard__card span {
    display: inline-grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border-radius: 8px;
    color: #ffffff;
    background: linear-gradient(135deg, ${colors.accent}, ${colors.warm});
    font-size: 12px;
    font-weight: 900;
  }

  .ll-dashboard__card strong {
    font-size: 18px;
  }

  .ll-dashboard__card em {
    color: ${colors.muted};
    font-size: 13px;
    font-style: normal;
    line-height: 1.35;
  }

  .ll-dashboard__card small {
    align-self: end;
    color: ${colors.muted};
    font-size: 12px;
    font-weight: 800;
  }

  .ll-dashboard__lp {
    display: grid;
  }

  .ll-dashboard__lp-card {
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr) auto;
    gap: 16px;
    align-items: center;
    min-height: 112px;
    padding: 18px;
    border: 1px solid ${colors.line};
    border-radius: 8px;
    color: ${colors.ink};
    background: linear-gradient(135deg, ${colors.card}, ${colors.cardHover});
    text-align: left;
    cursor: pointer;
    box-shadow: ${colors.shadow};
    transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease;
  }

  .ll-dashboard__lp-card:hover,
  .ll-dashboard__lp-card:focus-visible {
    border-color: ${colors.warm};
    outline: none;
    transform: translateY(-2px);
  }

  .ll-dashboard__lp-card span {
    display: inline-grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border-radius: 8px;
    color: #ffffff;
    background: linear-gradient(135deg, ${colors.accent}, ${colors.warm});
    font-size: 13px;
    font-weight: 900;
  }

  .ll-dashboard__lp-card strong,
  .ll-dashboard__lp-card em {
    display: block;
  }

  .ll-dashboard__lp-card strong {
    font-size: 20px;
  }

  .ll-dashboard__lp-card em {
    margin-top: 5px;
    color: ${colors.muted};
    font-size: 13px;
    font-style: normal;
    line-height: 1.35;
  }

  .ll-dashboard__lp-card small {
    color: ${colors.muted};
    font-size: 12px;
    font-weight: 900;
    white-space: nowrap;
  }

  @media (max-width: 720px) {
    .ll-dashboard__lp-card {
      grid-template-columns: 46px minmax(0, 1fr);
    }

    .ll-dashboard__lp-card small {
      grid-column: 2;
    }
  }
</style>`;
    }

    function updateEditorTabs() {
      const showTools = currentPage === "conteudo" && currentEditorTab !== "dashboard" && currentEditorTab !== "template";
      document.documentElement.dataset.editorTab = currentPage === "conteudo" ? currentEditorTab : "";
      document.documentElement.dataset.dashboardView = currentPage === "conteudo" && currentEditorTab === "dashboard" ? state.dashboard.view : "";
      editorTools.classList.toggle("is-hidden", !showTools);

      editorTabButtons.forEach((button) => {
        const isSelected = button.dataset.editorTab === currentEditorTab;
        button.setAttribute("aria-selected", String(isSelected));
        button.setAttribute("tabindex", isSelected ? "0" : "-1");
      });
    }

    function updateAddButtons() {
      if (currentPage === "home") {
        homeReturnButtons.forEach((button) => button.classList.add("is-hidden"));
        addButtons.forEach((button) => button.classList.add("is-hidden"));
        return;
      }

      const isDashboardTab = currentPage === "conteudo" && currentEditorTab === "dashboard";
      const isTableTab = currentPage === "conteudo" && currentEditorTab === "table";
      const isStoriesTab = currentPage === "conteudo" && currentEditorTab === "stories";
      const isArticleTab = currentPage === "conteudo" && currentEditorTab === "article";
      const isCarouselTab = currentPage === "conteudo" && currentEditorTab === "carousel";
      const isTemplateTab = currentPage === "conteudo" && currentEditorTab === "template";
      const showHomeReturn = currentPage === "conteudo" && (!isDashboardTab || state.dashboard.view !== "layouts");
      const label = isTableTab ? "Adicionar linha" : "Adicionar pergunta";
      homeReturnButtons.forEach((button) => {
        button.classList.toggle("is-hidden", !showHomeReturn);
      });
      addButtons.forEach((button) => {
        button.classList.toggle("is-hidden", isDashboardTab || isStoriesTab || isArticleTab || isCarouselTab || isTemplateTab);
        button.textContent = "+";
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
      });
    }

    function updateCopyButtons(config) {
      if (currentPage === "home") {
        outputTitle.textContent = "";
        htmlCopyButtons.forEach((button) => button.classList.add("is-hidden"));
        fullCopyButtons.forEach((button) => button.classList.add("is-hidden"));
        return;
      }

      const isDashboardTab = currentPage === "conteudo" && currentEditorTab === "dashboard";
      const isTemplateTab = currentPage === "conteudo" && currentEditorTab === "template";
      outputTitle.textContent = isDashboardTab
        ? state.dashboard.view === "ecommerce-insights"
          ? "Guia de conteúdo"
          : state.dashboard.view === "design-trends-2026"
            ? "Pesquisa de design"
            : state.dashboard.view === "copywriting-trends-2026"
              ? "Pesquisa de redação"
              : "Visão geral"
        : isTemplateTab
          ? "Prévia da LP"
          : config.outputTitle;

      htmlCopyButtons.forEach((button) => {
        button.textContent = config.copyLabel;
        button.classList.toggle("is-hidden", isDashboardTab);
      });

      fullCopyButtons.forEach((button) => {
        button.textContent = config.fullCopyLabel;
        button.classList.toggle("is-hidden", currentPage !== "conteudo" || isDashboardTab);
      });
    }

    function returnDashboardHome() {
      if (!returnToBaseVersion()) {
        return;
      }

      currentPage = "conteudo";
      currentEditorTab = "dashboard";
      state.dashboard.view = "layouts";
      document.documentElement.dataset.page = currentPage;
      appTitle.textContent = pageConfigs.conteudo.title;
      appSubtitle.textContent = pageConfigs.conteudo.subtitle;
      pageLinks.forEach((link) => {
        const isCurrent = link.dataset.pageLink === "conteudo";
        if (isCurrent) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
      renderEditor();
    }

    function applyPage(page) {
      const nextPage = pageConfigs[page] ? page : "home";
      const previousPage = currentPage;
      if (nextPage !== currentPage && !returnToBaseVersion()) {
        window.location.hash = currentPage === "tecnica" ? "#qualidade-tecnica" : currentPage === "conteudo" ? "#qualidade-conteudo" : "#home";
        return;
      }

      currentPage = nextPage;
      if (currentPage === "home") {
        currentEditorTab = "dashboard";
      } else if (currentPage !== "conteudo") {
        currentEditorTab = "faq";
      } else if (previousPage !== "conteudo") {
        currentEditorTab = "dashboard";
      }

      if (currentPage === "tecnica" || currentPage === "home") {
        isFocusMode = false;
        isPreviewFullscreen = false;
        isCodeFocusMode = false;
        document.body.classList.remove("focus-mode-active", "preview-fullscreen-active", "code-focus-mode-active");
        updateFocusModeButtons();
        updatePreviewFullscreenButtons();
        updateCodeFocusModeButtons();
      }

      const config = pageConfigs[currentPage];
      document.documentElement.dataset.page = currentPage;
      appTitle.textContent = config.title;
      appSubtitle.textContent = config.subtitle;
      updateCopyButtons(config);
      pageLinks.forEach((link) => {
        const isCurrent = link.dataset.pageLink === currentPage;
        if (isCurrent) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
      updateEditorTabs();
      updateAddButtons();
      renderEditor();
    }

    function renderFaqItem(item, index) {
      const question = escapeHtml(item.question.trim());
      const answer = formatAnswer(item.answer);

      return `        <!-- Cole aqui as perguntas e respostas -->
        <li id="faq-section__item">
<details id="faq-section__details">
<summary id="faq-section__summary">
<h3 id="faq-section__q-text"${previewTextStyleAttr({ scope: "faq", index, field: "question" })}> ${question} </h3>
<span id="faq-section__icon" aria-hidden="true"></span>
</summary>
<div id="faq-section__a-inner">
<p id="faq-section__a-text"${previewTextStyleAttr({ scope: "faq", index, field: "answer" })}> ${answer} </p>
</div>
</details>
</li>
        <!-------------------------->`;
    }

    function buildFaqSectionHtml() {
      const items = state.items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.question.trim() || item.answer.trim())
        .map(({ item, index }) => renderFaqItem(item, index))
        .join("\n\n");

      return `<section id="faq-section" aria-labelledby="faq-section__title">
<div id="faq-section__header">
<h2 id="faq-section__title">Dúvidas Frequentes</h2>
</div>
<ul id="faq-section__list" role="list">
${items}
</ul>
</section>`;
    }

    function getTableColumns() {
      return state.table.columns.length ? state.table.columns : ["SKU", "TÍTULO"];
    }

    function getVisibleTableRows() {
      return state.table.rows.filter((row) => row.some((cell) => cell.trim()));
    }

    function hasTableData() {
      return getVisibleTableRows().length > 0;
    }

    function getHeaderRadius(index, total) {
      if (total === 1) {
        return "10px 10px 0 0";
      }

      if (index === 0) {
        return "10px 0 0 0";
      }

      if (index === total - 1) {
        return "0 10px 0 0";
      }

      return "";
    }

    function renderTableHeaderCell(label, index, total) {
      const radiusClass = total === 1
        ? " table-th-custom--single"
        : index === 0
          ? " table-th-custom--first"
          : index === total - 1
            ? " table-th-custom--last"
            : "";
      const headerText = escapeHtml(label.trim() || `COLUNA ${index + 1}`);

      return `                 <th class="table-text-custom table-th-custom table-th-custom--col-${index + 1}${radiusClass}" scope="col">${headerText}
                 </th>`;
    }

    function renderTableRow(row, rowIndex) {
      const columns = getTableColumns();
      const cells = columns.map((column, index) => {
        const cellClass = index === 0 ? "table-td-custom-title" : "table-td-custom-sub";
        return `                 <td class="table-text-custom ${cellClass}">${escapeHtml((row[index] || "").trim())}</td>`;
      }).join("\n");

      return `               <tr class="table-tr-custom">
${cells}
               </tr>`;
    }

    function buildTableSectionHtml(forcePreview = false) {
      if (!forcePreview && !hasTableData()) {
        return "";
      }

      const columns = getTableColumns();
      const caption = escapeHtml(state.table.caption.trim() || "produtos relacionados");
      const headers = columns.map(renderTableHeaderCell).join("\n");
      const visibleRows = getVisibleTableRows();
      const previewRows = visibleRows.length ? visibleRows : [createEmptyTableRow()];
      const rows = (forcePreview ? previewRows : visibleRows).map(renderTableRow).join("\n");

      return `<section class="table-container-custom" aria-label="tabela contendo produtos relacionados e citados dentro deste conteúdo">
          <table class="table-design-custom" aria-describedby="table-desc">
            <caption id="table-desc" class="sr-only">
          ${caption}
          </caption>
            <thead class="table-head-custom">
               <tr class="table-tr-custom">
${headers}
               </tr>
             </thead>
             <tbody>
${rows}
             </tbody>
           </table>
         </section>`;
    }

    function getStoryId(group, slideIndex) {
      return `lp-story-${group.key}-${slideIndex + 1}`;
    }

    function getStoryPanelClass(group, slideIndex) {
      return `panel-${group.key}-${slideIndex + 1}`;
    }

    function normalizeStoryType(type) {
      return type === "video" ? "video" : "image";
    }

    function normalizeStoryPosition(position) {
      return position === "top" ? "top" : "bottom";
    }

    function normalizeStoryMediaFocus(focus) {
      return ["top", "center", "bottom"].includes(focus) ? focus : "center";
    }

    function normalizeStoryRingStyle(value) {
      return value === "solid" ? "solid" : "gradient";
    }

    function getStoryRingBackground() {
      if (normalizeStoryRingStyle(state.stories.ringStyle) === "solid") {
        return normalizeHexColor(state.stories.ringColor);
      }

      const start = normalizeHexColor(state.stories.ringGradientStart);
      const end = normalizeHexColor(state.stories.ringGradientEnd);
      return `conic-gradient(from -20deg, ${start}, ${end}, ${start})`;
    }

    function setStoriesPreviewTarget(groupIndex, slideIndex) {
      const safeGroupIndex = Number.isFinite(groupIndex) ? groupIndex : 0;
      const group = state.stories.groups[safeGroupIndex] || state.stories.groups[0];
      const resolvedGroupIndex = Math.max(0, state.stories.groups.indexOf(group));
      const maxSlideIndex = group ? Math.max(0, group.slides.length - 1) : 0;

      state.stories.previewGroupIndex = resolvedGroupIndex;
      state.stories.previewSlideIndex = Math.min(Math.max(Number.isFinite(slideIndex) ? slideIndex : 0, 0), maxSlideIndex);
    }

    function getStoriesPreviewTarget() {
      setStoriesPreviewTarget(state.stories.previewGroupIndex, state.stories.previewSlideIndex);
      return {
        groupIndex: state.stories.previewGroupIndex,
        slideIndex: state.stories.previewSlideIndex
      };
    }

    function getStoryVideoType(src) {
      return /\.mp4(?:$|\?)/i.test(src) ? "video/mp4" : "video/webm";
    }

    function buildStoryImageVariant(src, size) {
      const value = normalizeAssetUrl(src);
      if (!value) {
        return "";
      }

      if (isLocalAssetUrl(value) || isTemporaryPreviewAssetUrl(value)) {
        return value;
      }

      const hashIndex = value.indexOf("#");
      const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
      const withoutHash = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
      const queryIndex = withoutHash.indexOf("?");
      const path = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
      const query = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "";
      const params = query
        .split("&")
        .map((param) => param.trim())
        .filter((param) => param && !/^ims=/i.test(param));

      params.push(`ims=${size}`);
      return `${path}?${params.join("&")}${hash}`;
    }

    function getStoryNextId(groupIndex, slideIndex) {
      const group = state.stories.groups[groupIndex];
      if (slideIndex < group.slides.length - 1) {
        return getStoryId(group, slideIndex + 1);
      }

      const nextGroup = state.stories.groups[(groupIndex + 1) % state.stories.groups.length];
      return getStoryId(nextGroup, 0);
    }

    function getStoryPreviousId(groupIndex, slideIndex) {
      const group = state.stories.groups[groupIndex];
      if (slideIndex > 0) {
        return getStoryId(group, slideIndex - 1);
      }

      const previousGroupIndex = (groupIndex - 1 + state.stories.groups.length) % state.stories.groups.length;
      const previousGroup = state.stories.groups[previousGroupIndex];
      return getStoryId(previousGroup, previousGroup.slides.length - 1);
    }

    function getAvailableStoryPreset() {
      const usedKeys = new Set(state.stories.groups.map((group) => group.key));
      return storyGroupPresets.find((preset) => !usedKeys.has(preset.key)) || storyGroupPresets[0];
    }

    function createEmptyStorySlide() {
      return {
        type: "image",
        src: "",
        poster: "",
        alt: "",
        caption: "",
        captionPosition: "bottom",
        mediaFocus: "center"
      };
    }

    function createEmptyStoryGroup() {
      const preset = getAvailableStoryPreset();
      return {
        key: preset.key,
        name: preset.name,
        thumb: "",
        slides: [createEmptyStorySlide()]
      };
    }

    function addStoryContainer() {
      if (state.stories.groups.length >= storyLimits.maxContainers) {
        return;
      }

      state.stories.groups.push(createEmptyStoryGroup());
      state.stories.openGroupIndex = state.stories.groups.length - 1;
      setStoriesPreviewTarget(state.stories.openGroupIndex, 0);
      renderEditor(true);
    }

    function removeStoryContainer(index) {
      if (state.stories.groups.length <= storyLimits.minContainers) {
        return;
      }

      state.stories.groups.splice(index, 1);
      if (state.stories.openGroupIndex > index) {
        state.stories.openGroupIndex -= 1;
      } else if (state.stories.openGroupIndex === index) {
        state.stories.openGroupIndex = Math.min(index, state.stories.groups.length - 1);
      }
      setStoriesPreviewTarget(state.stories.openGroupIndex, 0);
      renderEditor(true);
    }

    function addStorySlide(groupIndex) {
      const group = state.stories.groups[groupIndex];
      if (!group || group.slides.length >= storyLimits.maxSlides) {
        return;
      }

      group.slides.push(createEmptyStorySlide());
      state.stories.openGroupIndex = groupIndex;
      setStoriesPreviewTarget(groupIndex, group.slides.length - 1);
      renderEditor(true);
    }

    function removeStorySlide(groupIndex, slideIndex) {
      const group = state.stories.groups[groupIndex];
      if (!group || group.slides.length <= storyLimits.minSlides) {
        return;
      }

      group.slides.splice(slideIndex, 1);
      state.stories.openGroupIndex = groupIndex;
      setStoriesPreviewTarget(groupIndex, Math.min(slideIndex, group.slides.length - 1));
      renderEditor(true);
    }

    function renderStoryOption(group, groupIndex) {
      const name = escapeHtml(group.name.trim() || "Story");
      const thumb = escapeHtml(normalizeAssetUrl(group.thumb));
      const firstStoryId = getStoryId(group, 0);

      return `        <label class="lp-stories__option lp-stories__option--${group.key}" for="${firstStoryId}" aria-label="Abrir container ${name}, slide 1 de ${group.slides.length}">
          <span class="lp-stories__ring" aria-hidden="true">
            <img class="lp-stories__thumb" src="${thumb}" alt="Miniatura de ${name}" width="400" height="400" loading="lazy">
          </span>
          <span class="lp-stories__name"${previewTextStyleAttr({ scope: "stories", field: "groupName", groupIndex })}>${name}</span>
        </label>`;
    }

    function renderStoryMedia(slide) {
      const normalizedSrc = normalizeAssetUrl(slide.src);
      const src = escapeHtml(normalizedSrc);
      const alt = escapeHtml(slide.alt.trim());

      if (normalizeStoryType(slide.type) === "video") {
        const poster = slide.poster.trim() ? ` poster="${escapeHtml(normalizeAssetUrl(slide.poster))}"` : "";
        return `<video class="lp-stories__video" width="1080" height="1920" autoplay muted loop playsinline preload="metadata"${poster} aria-label="${alt}">
                  <source src="${src}" type="${getStoryVideoType(normalizedSrc)}">
                </video>`;
      }

      const mobileSrc = escapeHtml(buildStoryImageVariant(slide.src, "400x"));
      const desktopSrc = escapeHtml(buildStoryImageVariant(slide.src, "430x"));
      const wideSrc = escapeHtml(buildStoryImageVariant(slide.src, "960x"));

      return `<picture class="lp-stories__picture">
                  <source media="(max-width: 499px)" srcset="${mobileSrc}">
                  <source media="(min-width: 992px)" srcset="${wideSrc}">
                  <source media="(min-width: 500px)" srcset="${desktopSrc}">
                  <img class="lp-stories__image" src="${wideSrc || desktopSrc || src}" alt="${alt}" width="1080" height="1920" loading="lazy">
                </picture>`;
    }

    function renderStoryPanel(group, groupIndex, slide, slideIndex, defaultTarget = { groupIndex: 0, slideIndex: 0 }) {
      const storyId = getStoryId(group, slideIndex);
      const title = escapeHtml(group.name.trim() || "Story");
      const caption = escapeHtml(slide.caption.trim());
      const position = normalizeStoryPosition(slide.captionPosition);
      const mediaFocus = normalizeStoryMediaFocus(slide.mediaFocus);
      const isDefault = groupIndex === defaultTarget.groupIndex && slideIndex === defaultTarget.slideIndex ? " is-default" : "";
      const previousId = getStoryPreviousId(groupIndex, slideIndex);
      const nextId = getStoryNextId(groupIndex, slideIndex);
      const avatar = escapeHtml(normalizeAssetUrl(state.stories.avatar));

      return `        <article class="lp-stories__panel ${getStoryPanelClass(group, slideIndex)}${isDefault}" aria-labelledby="${storyId}-title" aria-describedby="${storyId}-caption">
          <div class="lp-stories__viewer">
            <div class="lp-stories__progress lp-stories__progress--slides-${group.slides.length} lp-stories__progress--index-${slideIndex + 1}" aria-label="Progresso do container ${title}"></div>
            <header class="lp-stories__topbar" aria-label="Identificação do container ${title}">
              <img class="lp-stories__avatar" src="${avatar}" alt="Logo dos stories" width="400" height="400" loading="lazy">
              <h3 class="lp-stories__title" id="${storyId}-title"${previewTextStyleAttr({ scope: "stories", field: "groupName", groupIndex })}>${title}</h3>
              <span class="lp-stories__step">${slideIndex + 1}/${group.slides.length}</span>
            </header>
            <figure class="lp-stories__figure lp-stories__figure--focus-${mediaFocus}">
              <div class="lp-stories__media">
                ${renderStoryMedia(slide)}
              </div>
              <figcaption class="lp-stories__caption is-${position}" id="${storyId}-caption"${previewTextStyleAttr({ scope: "stories", field: "caption", groupIndex, slideIndex })}>${caption}</figcaption>
            </figure>
            <nav class="lp-stories__nav" aria-label="Navegar slides do container ${title}">
              <label class="lp-stories__arrow prev" for="${previousId}" aria-label="Slide anterior de ${title}"><span aria-hidden="true">&lsaquo;</span></label>
              <label class="lp-stories__arrow next" for="${nextId}" aria-label="Proximo slide de ${title}"><span aria-hidden="true">&rsaquo;</span></label>
            </nav>
          </div>
        </article>`;
    }

    function buildStoriesSectionHtml(defaultTarget = { groupIndex: 0, slideIndex: 0 }) {
      const groups = state.stories.groups;
      const inputs = groups.flatMap((group, groupIndex) => {
        return group.slides.map((slide, slideIndex) => {
          const storyId = getStoryId(group, slideIndex);
          const isChecked = groupIndex === defaultTarget.groupIndex && slideIndex === defaultTarget.slideIndex ? " checked" : "";
          return `      <input class="lp-stories__input" type="radio" name="lp-stories-active" id="${storyId}"${isChecked}>`;
        });
      }).join("\n");
      const options = groups.map(renderStoryOption).join("\n");
      const panels = groups.flatMap((group, groupIndex) => {
        return group.slides.map((slide, slideIndex) => renderStoryPanel(group, groupIndex, slide, slideIndex, defaultTarget));
      }).join("\n\n");
      const ariaLabel = escapeHtml(state.stories.ariaLabel.trim() || "Stories do produto");
      return `<section class="lp-stories lp-stories--groups-${groups.length}" aria-label="${ariaLabel}">
${inputs}

      <nav class="lp-stories__options" aria-label="Containers de stories">
${options}
      </nav>

      <div class="lp-stories__panels" aria-live="polite">
${panels}
      </div>
    </section>`;
    }

    function escapeCssUrl(value) {
      return normalizeAssetUrl(value).replace(/"/g, "%22");
    }

    function getArticleTags(value) {
      return String(value || "")
        .split(/[,|\n]/)
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 4);
    }

    function getArticleTabElements(tab) {
      const defaults = {
        icon: true,
        summary: true,
        image: true,
        eyebrow: true,
        heading: true,
        body: true,
        tags: true
      };

      tab.elements = { ...defaults, ...(tab.elements || {}) };
      return tab.elements;
    }

    function renderArticleElementToggle(tab, tabIndex, key, label) {
      const elements = getArticleTabElements(tab);
      return `<label class="article-toggle">
                  <input type="checkbox" data-article-element="${key}" data-article-tab="${tabIndex}"${elements[key] ? " checked" : ""}>
                  <span>${label}</span>
                </label>`;
    }

    function createArticleTab(index = state.article.tabs.length) {
      const tabNumber = index + 1;
      return {
        elements: { icon: true, summary: true, image: true, eyebrow: true, heading: true, body: true, tags: true },
        icon: String(tabNumber),
        label: `Aba ${tabNumber}`,
        summary: "Resumo curto da aba.",
        eyebrow: "Novo bloco",
        heading: "Titulo do painel.",
        body: "Texto do painel com a mensagem principal do bloco.",
        tags: "Tag 1, Tag 2",
        image: state.article.backgroundImage
      };
    }

    function addArticleTab() {
      if (state.article.tabs.length >= articleLimits.maxTabs) {
        return;
      }

      state.article.tabs.push(createArticleTab());
      state.article.openTabIndex = state.article.tabs.length - 1;
      renderEditor(true);
    }

    function removeArticleTab(index) {
      if (state.article.tabs.length <= articleLimits.minTabs) {
        return;
      }

      state.article.tabs.splice(index, 1);
      if (state.article.openTabIndex > index) {
        state.article.openTabIndex -= 1;
      } else if (state.article.openTabIndex === index) {
        state.article.openTabIndex = Math.min(index, state.article.tabs.length - 1);
      }

      renderEditor(true);
    }

    function renderArticleTags(tab, tabIndex) {
      const elements = getArticleTabElements(tab);
      if (!elements.tags) {
        return "";
      }

      const tags = getArticleTags(tab.tags);
      if (!tags.length) {
        return "";
      }

      return `<div class="ll-article__tags">
${tags.map((tag, tagIndex) => `              <span class="ll-article__tag"${previewTextStyleAttr({ scope: "article", tabIndex, field: "tag", tagIndex })}>${escapeHtml(tag)}</span>`).join("\n")}
            </div>`;
    }

    function renderArticleTabButton(tab, index) {
      const tabId = `ll-article-tab-${index + 1}`;
      const elements = getArticleTabElements(tab);
      const icon = elements.icon ? `<span class="ll-article__tab-icon"${previewTextStyleAttr({ scope: "article", tabIndex: index, field: "icon" })}>${escapeHtml(tab.icon.trim() || String(index + 1))}</span>` : "";
      const summary = elements.summary && tab.summary.trim() ? `<small class="ll-article__tab-summary"${previewTextStyleAttr({ scope: "article", tabIndex: index, field: "summary" })}>${escapeHtml(tab.summary.trim())}</small>` : "";
      const noIconClass = elements.icon ? "" : " ll-article__tab--no-icon";

      return `        <label class="ll-article__tab${noIconClass}" for="${tabId}">
          ${icon}
          <span class="ll-article__tab-text"><strong class="ll-article__tab-title"${previewTextStyleAttr({ scope: "article", tabIndex: index, field: "label" })}>${escapeHtml(tab.label.trim() || `Aba ${index + 1}`)}</strong>${summary}</span>
          <span class="ll-article__tab-key">${index + 1}</span>
        </label>`;
    }

    function renderArticlePanel(tab, index) {
      const elements = getArticleTabElements(tab);
      const image = elements.image ? escapeCssUrl(tab.image || state.article.backgroundImage) : "";
      const imageStyle = image ? ` style="background-image: url(&quot;${escapeHtml(image)}&quot;)"` : "";
      const eyebrow = elements.eyebrow && tab.eyebrow.trim() ? `<p class="ll-article__eyebrow"${previewTextStyleAttr({ scope: "article", tabIndex: index, field: "eyebrow" })}>${escapeHtml(tab.eyebrow.trim())}</p>` : "";
      const heading = elements.heading && tab.heading.trim() ? `<h3 class="ll-article__heading"${previewTextStyleAttr({ scope: "article", tabIndex: index, field: "heading" })}>${escapeHtml(tab.heading.trim())}</h3>` : "";
      const body = elements.body && tab.body.trim() ? `<p class="ll-article__body"${previewTextStyleAttr({ scope: "article", tabIndex: index, field: "body" })}>${escapeHtml(tab.body.trim())}</p>` : "";
      const tags = renderArticleTags(tab, index);
      const content = [eyebrow, heading, body, tags].filter(Boolean).join("\n            ");
      const copy = content ? `<div class="ll-article__panel-copy">
            ${content}
          </div>` : "";

      return `        <article class="ll-article__panel ll-article__panel--${index + 1}"${imageStyle}>
          ${copy}
        </article>`;
    }

    function buildArticleSectionHtml() {
      const tabs = state.article.tabs;
      const inputs = tabs.map((tab, index) => {
        return `  <input class="ll-article__input" type="radio" name="ll-article-tabs" id="ll-article-tab-${index + 1}"${index === 0 ? " checked" : ""}>`;
      }).join("\n");
      const tabButtons = tabs.map(renderArticleTabButton).join("\n");
      const panels = tabs.map(renderArticlePanel).join("\n\n");

      return `<section class="ll-article" aria-label="${escapeHtml(state.article.ariaLabel.trim() || "Layout de artigo")}">
${inputs}

  <div class="ll-article__shell">
    <div class="ll-article__inner">
      <aside class="ll-article__tabs" aria-label="Escolha uma aba do artigo">
        <div class="ll-article__tabs-head">
          <p class="ll-article__eyebrow"${previewTextStyleAttr({ scope: "article", field: "eyebrow" })}>${escapeHtml(state.article.eyebrow.trim())}</p>
          <h2 class="ll-article__title"${previewTextStyleAttr({ scope: "article", field: "title" })}>${escapeHtml(state.article.title.trim())}</h2>
          <p class="ll-article__intro"${previewTextStyleAttr({ scope: "article", field: "intro" })}>${escapeHtml(state.article.intro.trim())}</p>
        </div>
${tabButtons}
      </aside>

      <div class="ll-article__stage" aria-live="polite">
${panels}
      </div>
    </div>
  </div>
</section>`;
    }

    function buildBlocksHtml(includeTable) {
      const blocks = [buildFaqSectionHtml()];
      const tableHtml = includeTable ? buildTableSectionHtml() : "";

      if (tableHtml) {
        blocks.push(tableHtml);
      }

      return blocks.join("\n\n");
    }

    function buildFullHtml(includeTable) {
      const styles = includeTable && hasTableData() ? `${faqStyle}\n\n${buildTableStyle()}` : faqStyle;

      return `${styles}

${buildResponsiveStyle("faq")}

<!-- HTML DO LAYOUT -->

${buildBlocksHtml(includeTable)}`;
    }

    function getTemplateLayoutOptions() {
      return [
        ["faq", "FAQ"],
        ["table", "Tabela"],
        ["stories", "Stories"],
        ["article", "Artigo"],
        ["carousel", "Carrossel"]
      ];
    }

    function buildTemplateLayoutPackage(tab = state.template.sourceLayout) {
      if (tab === "table") {
        return buildResponsivePackage("table", () => buildTableSectionHtml(true), buildTableStyle);
      }

      if (tab === "stories") {
        return buildResponsivePackage("stories", () => buildStoriesSectionHtml(), buildStoriesStyle);
      }

      if (tab === "article") {
        return buildResponsivePackage("article", () => buildArticleSectionHtml(), buildArticleStyle);
      }

      if (tab === "carousel") {
        return buildResponsivePackage("carousel", () => buildCarouselSectionHtml(), buildCarouselStyle);
      }

      return buildResponsivePackage("faq", () => buildFaqSectionHtml(), () => faqStyle);
    }

    function extractLpContainerHtml(value) {
      const rawValue = String(value || "").trim();
      if (!rawValue) {
        return "";
      }

      if (!/<\/?[a-z][\s\S]*>/i.test(rawValue)) {
        return rawValue;
      }

      const parsedDocument = new DOMParser().parseFromString(rawValue, "text/html");
      const container = parsedDocument.querySelector(".lp-container, .lp_container");
      return container ? container.innerHTML.trim() : rawValue;
    }

    function getTemplateHeaderDefaults() {
      return {
        type: "none",
        imageUrl: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header.jpg",
        imageAlt: "",
        videoUrl: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header-precon.webm",
        posterUrl: "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/header_precon.webp",
        logoUrl: "https://static1.efacil.com.br/wcsstore//AuroraStorefrontAssetStore/PDP/precon/logo-precon.png",
        logoLabel: "Logo da marca dentro de um circulo laranja",
        brand: "marca",
        title: "Titulo curto do produto",
        subtitle: "Descricao breve do produto, destacando os principais atributos de forma clara."
      };
    }

    function getTemplateHeader() {
      state.template.header = {
        ...getTemplateHeaderDefaults(),
        ...(state.template.header || {})
      };
      if (!["none", "image", "video"].includes(state.template.header.type)) {
        state.template.header.type = "none";
      }
      return state.template.header;
    }

    function stripHeaderImageVariant(url) {
      const rawUrl = normalizeAssetUrl(url);
      const [withoutHash, hash = ""] = rawUrl.split("#");
      const queryIndex = withoutHash.indexOf("?");
      if (queryIndex === -1) {
        return rawUrl;
      }

      const path = withoutHash.slice(0, queryIndex);
      const query = withoutHash.slice(queryIndex + 1)
        .split("&")
        .filter((param) => param && !/^ims=/i.test(param))
        .join("&");
      return `${path}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
    }

    function withHeaderImageSize(url, width) {
      const baseUrl = stripHeaderImageVariant(url);
      if (!baseUrl) {
        return "";
      }

      if (isLocalAssetUrl(baseUrl)) {
        return baseUrl;
      }

      if (isTemporaryPreviewAssetUrl(baseUrl)) {
        return baseUrl;
      }

      return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}ims=${width}x`;
    }

    function buildTemplateHeaderMarkup(headerData = {}, options = {}) {
      const header = {
        ...getTemplateHeaderDefaults(),
        ...headerData
      };
      header.imageUrl = normalizeAssetUrl(header.imageUrl);
      header.videoUrl = normalizeAssetUrl(header.videoUrl);
      header.posterUrl = normalizeAssetUrl(header.posterUrl);
      header.logoUrl = normalizeAssetUrl(header.logoUrl);
      const type = header.type;
      if (type === "none") {
        return "";
      }
      const managedAttribute = options.includeLabAttrs ? ' data-ll-template-managed-header="true"' : "";

      const logoHtml = header.logoUrl ? `
    <div class="${type === "video" ? "video-header" : "product-header"}__badge" role="img" aria-label="${escapeHtml(header.logoLabel)}">
      <img src="${escapeHtml(header.logoUrl)}" alt="" class="${type === "video" ? "video-header" : "product-header"}__badge-img">
    </div>` : "";

      if (type === "video") {
        return `<section class="video-header"${managedAttribute} aria-label="Cabeçalho do produto">
  <header class="video-header__banner">
    <video class="video-header__banner-video" poster="${escapeHtml(header.posterUrl)}" preload="none" autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
      <source src="${escapeHtml(header.videoUrl)}">
    </video>${logoHtml}
  </header>
  <section class="video-header__body" aria-label="Título e descrição do produto">
    <small class="video-header__brand">${escapeHtml(header.brand)}</small>
    <h2 class="video-header__title" id="video-main-title">${escapeHtml(header.title)}</h2>
    <p class="video-header__subtitle">${escapeHtml(header.subtitle)}</p>
  </section>
</section>`;
      }

      const cleanImageUrl = stripHeaderImageVariant(header.imageUrl);
      return `<section class="product-header"${managedAttribute} aria-label="Cabeçalho do produto">
  <header class="product-header__banner">
    <picture style="width:100%; height:100%; margin:0;">
      <source media="(max-width: 430px)" srcset="${escapeHtml(withHeaderImageSize(cleanImageUrl, 430))}">
      <source media="(max-width: 768px)" srcset="${escapeHtml(withHeaderImageSize(cleanImageUrl, 768))}">
      <source media="(max-width: 1024px)" srcset="${escapeHtml(withHeaderImageSize(cleanImageUrl, 1024))}">
      <source media="(max-width: 1200px)" srcset="${escapeHtml(withHeaderImageSize(cleanImageUrl, 1200))}">
      <img src="${escapeHtml(cleanImageUrl)}" alt="${escapeHtml(header.imageAlt)}" class="product-header__banner-img" loading="eager">
    </picture>${logoHtml}
  </header>
  <section class="product-header__body" aria-label="Título e descrição do produto">
    <small class="product-header__brand">${escapeHtml(header.brand)}</small>
    <h2 class="product-header__title" id="product-main-title">${escapeHtml(header.title)}</h2>
    <p class="product-header__subtitle">${escapeHtml(header.subtitle)}</p>
  </section>
</section>`;
    }

    function buildTemplateHeaderHtml(options = {}) {
      return buildTemplateHeaderMarkup(getTemplateHeader(), options);
    }

    function buildTemplateHeaderStyle() {
      return `<style>
.product-header,
.product-header *,
.video-header,
.video-header * {
  box-sizing: border-box;
  margin: 0;
}

.product-header,
.video-header {
  --badge-size: 8rem;
  --banner-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #ffffff;
  font-family: Arial, sans-serif;
  overflow: hidden;
}

.product-header__banner,
.video-header__banner {
  position: relative;
  width: 100%;
  height: var(--banner-height);
}

.product-header__banner figure,
.product-header__banner picture {
  display: block;
  width: 100%;
  height: 100%;
}

.product-header__banner-img,
.video-header__banner-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.product-header__badge,
.video-header__badge {
  position: absolute;
  bottom: calc(var(--badge-size) / -2);
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--badge-size);
  height: var(--badge-size);
  border-radius: 50%;
  background-color: #ff9900;
  transform: translateX(-50%);
  z-index: 2;
}

.product-header__badge-img,
.video-header__badge-img {
  max-width: 90px;
  max-height: 90px;
}

.product-header__body,
.video-header__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--badge-size) / 2 + 1.1rem) 0.3rem 2.5rem;
  text-align: center;
}

.product-header__brand,
.video-header__brand {
  color: #ff9900;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.product-header__title,
.video-header__title {
  color: #000000;
  font-size: clamp(1.4rem, 4vw, 2.4rem);
  line-height: clamp(1.6rem, 4vw, 3.1rem);
  font-weight: 800;
  max-width: 920px;
}

.product-header__subtitle,
.video-header__subtitle {
  color: #8a8a8a;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.5;
  max-width: 840px;
}

@media (max-width: 768px) {
  .product-header,
  .video-header {
    --banner-height: 180px;
  }
}

@media (max-width: 470px) {
  .product-header__subtitle,
  .video-header__subtitle {
    text-align: justify;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
  }
}
</style>`;
    }

    function buildLpContainerCss(includeFrame = false) {
      const frameCss = includeFrame ? `
html,
body {
  margin: 0;
  min-height: 100%;
  background: #ffffff;
}

body {
  font-family: Arial, sans-serif;
  color: #111827;
}
` : "";

      return `<style>
${frameCss}
.lp-container,
.lp_container {
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

.lp-container *,
.lp-container *::before,
.lp-container *::after,
.lp_container *,
.lp_container *::before,
.lp_container *::after {
  box-sizing: border-box;
}

.lp-container img,
.lp-container video,
.lp-container iframe,
.lp_container img,
.lp_container video,
.lp_container iframe {
  max-width: 100%;
}
</style>`;
    }

    function buildLpContainerHtml(value = state.template.html, options = {}) {
      const content = extractLpContainerHtml(value);
      const innerHtml = content || "";
      return `<div class="lp-container">
${innerHtml}
</div>`;
    }

    function buildTemplatePreviewHtml() {
      return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${buildLpContainerCss(true)}
  ${buildTemplateHeaderStyle()}
</head>
<body>
${buildLpContainerHtml(state.template.html, { includeLabAttrs: true })}
</body>
</html>`;
    }

    function buildTemplateOutputHtml(copyMode = "html") {
      const containerHtml = buildLpContainerHtml();

      if (copyMode === "full") {
        return `${buildTemplateHeaderStyle()}

<!-- HTML DO LAYOUT -->

${containerHtml}`;
      }

      return containerHtml;
    }

    function buildPreviewHtml() {
      if (currentPage === "home") {
        return "";
      }

      if (currentPage === "conteudo" && currentEditorTab === "dashboard") {
        return buildDashboardPreviewHtml();
      }

      if (currentPage === "conteudo" && currentEditorTab === "table") {
        return `${buildTableSectionHtml(true)}

${buildTableStyle()}

${buildResponsiveStyle("table", { includeDraft: true })}`;
      }

      if (currentPage === "conteudo" && currentEditorTab === "stories") {
        return `${buildStoriesSectionHtml(getStoriesPreviewTarget())}

${buildStoriesStyle()}

${buildResponsiveStyle("stories", { includeDraft: true })}`;
      }

      if (currentPage === "conteudo" && currentEditorTab === "article") {
        return `${buildArticleSectionHtml()}

${buildArticleStyle()}

${buildResponsiveStyle("article", { includeDraft: true })}`;
      }

      if (currentPage === "conteudo" && currentEditorTab === "carousel") {
        return `${buildCarouselSectionHtml(state.carousel.previewSlideIndex)}

${buildCarouselStyle()}

${buildResponsiveStyle("carousel", { includeDraft: true })}`;
      }

      if (currentPage === "conteudo" && currentEditorTab === "template") {
        return buildTemplatePreviewHtml();
      }

      if (currentPage === "conteudo") {
        return `${buildFaqSectionHtml()}

${faqStyle}

${buildResponsiveStyle("faq", { includeDraft: true })}`;
      }

      return buildFullHtml(false);
    }

    function buildOutputHtml(copyMode = "html") {
      if (currentPage === "home") {
        return "";
      }

      if (currentPage === "tecnica") {
        return buildFullHtml(false);
      }

      if (currentEditorTab === "dashboard") {
        return "";
      }

      if (currentEditorTab === "table") {
        const tableHtml = buildTableSectionHtml(true);

        if (copyMode === "full") {
          return buildResponsivePackage("table", () => buildTableSectionHtml(true), buildTableStyle);
        }

        return tableHtml;
      }

      if (currentEditorTab === "stories") {
        const storiesHtml = buildStoriesSectionHtml();

        if (copyMode === "full") {
          return buildResponsivePackage("stories", () => buildStoriesSectionHtml(), buildStoriesStyle);
        }

        return storiesHtml;
      }

      if (currentEditorTab === "article") {
        const articleHtml = buildArticleSectionHtml();

        if (copyMode === "full") {
          return buildResponsivePackage("article", () => buildArticleSectionHtml(), buildArticleStyle);
        }

        return articleHtml;
      }

      if (currentEditorTab === "carousel") {
        const carouselHtml = buildCarouselSectionHtml();

        if (copyMode === "full") {
          return buildResponsivePackage("carousel", () => buildCarouselSectionHtml(), buildCarouselStyle);
        }

        return carouselHtml;
      }

      if (currentEditorTab === "template") {
        if (copyMode === "full" && getResponsiveVersionList("template").length) {
          return buildResponsivePackage("template", () => buildTemplateOutputHtml("html"), () => buildTemplateHeaderStyle());
        }

        return buildTemplateOutputHtml(copyMode);
      }

      const faqHtml = buildFaqSectionHtml();

      if (copyMode === "full") {
        return buildResponsivePackage("faq", () => buildFaqSectionHtml(), () => faqStyle);
      }

      return faqHtml;
    }

    function getPreviewScrollPosition() {
      try {
        const frameWindow = previewFrame.contentWindow;
        const frameDocument = previewFrame.contentDocument;

        if (!frameWindow || !frameDocument) {
          return { x: 0, y: 0 };
        }

        return {
          x: frameWindow.scrollX || frameDocument.documentElement.scrollLeft || frameDocument.body.scrollLeft || 0,
          y: frameWindow.scrollY || frameDocument.documentElement.scrollTop || frameDocument.body.scrollTop || 0
        };
      } catch (error) {
        return { x: 0, y: 0 };
      }
    }

    function restorePreviewScrollPosition(position) {
      try {
        const frameWindow = previewFrame.contentWindow;

        if (!frameWindow || !position) {
          return;
        }

        frameWindow.requestAnimationFrame(() => {
          frameWindow.scrollTo(position.x, position.y);
        });
      } catch (error) {
        return;
      }
    }

    function closePreviewEditPopover() {
      if (previewEditPopover) {
        previewEditPopover.remove();
        previewEditPopover = null;
      }

      if (previewEditOutsideHandler) {
        document.removeEventListener("mousedown", previewEditOutsideHandler, true);
        previewEditOutsideHandler = null;
      }

      if (previewEditKeyHandler) {
        document.removeEventListener("keydown", previewEditKeyHandler, true);
        previewEditKeyHandler = null;
      }
    }

    function getPreviewEditPoint(sourceEvent) {
      const targetDocument = sourceEvent?.target?.ownerDocument || document;
      if (targetDocument === document) {
        return {
          x: sourceEvent?.clientX || window.innerWidth / 2,
          y: sourceEvent?.clientY || window.innerHeight / 2
        };
      }

      const frameRect = previewFrame.getBoundingClientRect();
      return {
        x: frameRect.left + (sourceEvent?.clientX || 0),
        y: frameRect.top + (sourceEvent?.clientY || 0)
      };
    }

    function positionPreviewEditPopover(sourceEvent) {
      if (!previewEditPopover) {
        return;
      }

      const point = getPreviewEditPoint(sourceEvent);
      const rect = previewEditPopover.getBoundingClientRect();
      const margin = 12;
      let left = point.x + margin;
      let top = point.y + margin;

      if (left + rect.width > window.innerWidth - margin) {
        left = Math.max(margin, window.innerWidth - rect.width - margin);
      }

      if (top + rect.height > window.innerHeight - margin) {
        top = Math.max(margin, point.y - rect.height - margin);
      }

      previewEditPopover.style.left = `${left}px`;
      previewEditPopover.style.top = `${top}px`;
    }

    function openPreviewEditPopover(sourceEvent, meta, options = {}) {
      closePreviewEditPopover();

      const kind = options.kind || meta.type || "text";
      const isColor = kind === "color";
      const isTextStyle = kind === "text-style";
      const colorAllowsGradient = isColor && canUseGradientColor(meta, options);
      const currentValue = isColor
        ? normalizeCssColorValue(readPreviewEditValue(meta))
        : String(readPreviewEditValue(meta) || "");
      const currentTextStyle = isTextStyle
        ? {
            ...getComputedPreviewTextStyle(options.sourceElement || sourceEvent?.target || document.body),
            ...getPreviewTextStyle(meta)
          }
        : {};

      const form = document.createElement("form");
      form.className = `preview-edit-popover preview-edit-popover--${kind}`;
      form.setAttribute("role", "dialog");
      form.setAttribute("aria-label", options.label || "Editar item da prévia");

      const title = document.createElement("p");
      title.className = "preview-edit-popover__title";
      title.textContent = options.label || "Editar";
      form.appendChild(title);

      let valueInput;
      let colorInput;
      let colorPickerButton;
      let colorGradientInputs = null;
      let colorOpacityInput = null;
      let styleInputs = null;
      let localAssetButton = null;

      if (isColor) {
        const parsedGradient = parseCssGradient(currentValue);
        const initialSolid = parsedGradient ? parsedGradient.start : normalizeHexColor(currentValue);
        const row = document.createElement("div");
        row.className = "preview-edit-popover__color-row";
        row.classList.add("preview-edit-popover__color-row--picker");

        colorInput = document.createElement("input");
        colorInput.className = "preview-edit-popover__color";
        colorInput.type = "color";
        colorInput.value = initialSolid;
        colorInput.setAttribute("aria-label", "Abrir seletor de cor");
        colorInput.setAttribute("title", "Abrir seletor de cor");
        colorInput.style.setProperty("--preview-edit-color", initialSolid);

        colorPickerButton = document.createElement("button");
        colorPickerButton.className = "preview-edit-popover__picker";
        colorPickerButton.type = "button";
        colorPickerButton.setAttribute("aria-label", "Pegar cor da tela");
        colorPickerButton.setAttribute("title", "Pegar cor da tela");
        colorPickerButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14.5 5.5 4 4"></path><path d="M9 16.5 4.5 21H3v-1.5L7.5 15"></path><path d="m7.5 15 8.8-8.8a2.1 2.1 0 0 1 3 3L10.5 18H7.5z"></path></svg>';
        if (!("EyeDropper" in window)) {
          colorPickerButton.disabled = true;
          colorPickerButton.setAttribute("title", "Conta-gotas indisponível neste navegador");
        }

        valueInput = document.createElement("input");
        valueInput.className = "preview-edit-popover__field";
        valueInput.type = "text";
        valueInput.value = initialSolid;
        valueInput.placeholder = "#ea5b0c";

        valueInput.addEventListener("input", () => {
          if (isHexColor(valueInput.value)) {
            valueInput.value = normalizeHexColor(valueInput.value);
            colorInput.value = valueInput.value;
            colorInput.style.setProperty("--preview-edit-color", valueInput.value);
            applyLiveValue();
          }
        });

        colorInput.addEventListener("input", () => {
          valueInput.value = normalizeHexColor(colorInput.value);
          colorInput.style.setProperty("--preview-edit-color", valueInput.value);
          applyLiveValue();
        });

        colorPickerButton.addEventListener("click", async () => {
          if (!("EyeDropper" in window)) {
            return;
          }

          try {
            const picker = new window.EyeDropper();
            const result = await picker.open();
            if (result?.sRGBHex && isHexColor(result.sRGBHex)) {
              valueInput.value = normalizeHexColor(result.sRGBHex);
              colorInput.value = valueInput.value;
              colorInput.style.setProperty("--preview-edit-color", valueInput.value);
              applyLiveValue();
            }
          } catch (error) {}
        });

        row.append(colorInput, colorPickerButton, valueInput);
        form.appendChild(row);

        if (options.opacityField) {
          const opacityGrid = document.createElement("div");
          opacityGrid.className = "preview-edit-popover__grid";
          const opacityLabel = document.createElement("label");
          opacityLabel.className = "preview-edit-popover__mini-field";
          const opacityText = document.createElement("span");
          opacityText.textContent = "Opacidade";
          colorOpacityInput = document.createElement("input");
          colorOpacityInput.type = "number";
          colorOpacityInput.min = "0";
          colorOpacityInput.max = "0.95";
          colorOpacityInput.step = "0.05";
          if (meta.scope === "carousel" && meta.slideIndex !== undefined) {
            const slide = state.carousel.slides[meta.slideIndex];
            colorOpacityInput.value = normalizeCarouselCaptionOpacity(slide?.[options.opacityField]).toFixed(2);
          } else {
            colorOpacityInput.value = "0.64";
          }
          opacityLabel.append(opacityText, colorOpacityInput);
          opacityGrid.appendChild(opacityLabel);
          form.appendChild(opacityGrid);
          colorOpacityInput.addEventListener("input", () => applyLiveValue());
          colorOpacityInput.addEventListener("change", () => {
            colorOpacityInput.value = normalizeCarouselCaptionOpacity(colorOpacityInput.value).toFixed(2);
            applyLiveValue();
          });
        }

        if (colorAllowsGradient) {
          const toggle = document.createElement("label");
          toggle.className = "preview-edit-popover__toggle";
          const toggleInput = document.createElement("input");
          toggleInput.type = "checkbox";
          toggleInput.checked = Boolean(parsedGradient);
          const toggleText = document.createElement("span");
          toggleText.textContent = "Usar degradê";
          toggle.append(toggleInput, toggleText);
          form.appendChild(toggle);

          const gradientBox = document.createElement("div");
          gradientBox.className = "preview-edit-popover__gradient";
          gradientBox.hidden = !toggleInput.checked;

          const createGradientField = (labelText, input) => {
            const label = document.createElement("label");
            label.className = "preview-edit-popover__mini-field";
            const span = document.createElement("span");
            span.textContent = labelText;
            label.append(span, input);
            gradientBox.appendChild(label);
          };

          const startInput = document.createElement("input");
          startInput.type = "text";
          startInput.value = parsedGradient ? parsedGradient.start : valueInput.value;
          startInput.placeholder = "#7c3aed";

          const endInput = document.createElement("input");
          endInput.type = "text";
          endInput.value = parsedGradient ? parsedGradient.end : valueInput.value;
          endInput.placeholder = "#ea5b0c";

          const angleInput = document.createElement("input");
          angleInput.type = "number";
          angleInput.min = "0";
          angleInput.max = "360";
          angleInput.step = "1";
          angleInput.value = String(parsedGradient ? parsedGradient.angle : 135);

          createGradientField("Cor inicial", startInput);
          createGradientField("Cor final", endInput);
          createGradientField("Direção (graus)", angleInput);
          form.appendChild(gradientBox);

          colorGradientInputs = { toggle: toggleInput, box: gradientBox, start: startInput, end: endInput, angle: angleInput };

          const syncGradient = () => {
            gradientBox.hidden = !toggleInput.checked;
            if (isHexColor(startInput.value)) {
              startInput.value = normalizeHexColor(startInput.value);
            }
            if (isHexColor(endInput.value)) {
              endInput.value = normalizeHexColor(endInput.value);
            }
            applyLiveValue();
          };

          [toggleInput, startInput, endInput, angleInput].forEach((input) => {
            input.addEventListener("input", syncGradient);
            input.addEventListener("change", syncGradient);
          });
        }
      } else if (isTextStyle) {
        valueInput = document.createElement(options.multiline ? "textarea" : "input");
        valueInput.className = "preview-edit-popover__field";
        if (!options.multiline) {
          valueInput.type = "text";
        }
        valueInput.value = currentValue;
        valueInput.placeholder = options.placeholder || "";
        form.appendChild(valueInput);
        valueInput.addEventListener("input", () => {
          valueInput.dataset.touched = "true";
          applyLiveValue();
        });

        const grid = document.createElement("div");
        grid.className = "preview-edit-popover__grid";

        const createMiniField = (labelText, input) => {
          const label = document.createElement("label");
          label.className = "preview-edit-popover__mini-field";
          const span = document.createElement("span");
          span.textContent = labelText;
          label.append(span, input);
          grid.appendChild(label);
        };

        const createInlineHexControl = (initialValue) => {
          const wrapper = document.createElement("div");
          wrapper.className = "preview-edit-popover__mini-color";
          const swatch = document.createElement("span");
          swatch.className = "preview-edit-popover__inline-swatch";
          const input = document.createElement("input");
          input.type = "text";
          input.value = colorToHex(initialValue);
          input.placeholder = "#111827";
          swatch.style.setProperty("--preview-edit-color", input.value);
          input.addEventListener("input", () => {
            if (isHexColor(input.value)) {
              input.value = normalizeHexColor(input.value);
              swatch.style.setProperty("--preview-edit-color", input.value);
              applyLiveValue({ multiline: options.multiline });
            }
          });
          wrapper.append(swatch, input);
          wrapper.__llColorInput = input;
          return wrapper;
        };

        const textColorControl = createInlineHexControl(currentTextStyle.color);
        const textColorInput = textColorControl.__llColorInput;

        const fontSizeInput = document.createElement("input");
        fontSizeInput.type = "number";
        fontSizeInput.min = "8";
        fontSizeInput.max = "96";
        fontSizeInput.step = "1";
        fontSizeInput.value = String(currentTextStyle.fontSize || 16);

        const fontWeightSelect = document.createElement("select");
        [
          ["300", "Leve"],
          ["400", "Normal"],
          ["500", "Médio"],
          ["600", "Semibold"],
          ["700", "Bold"],
          ["800", "Extra bold"],
          ["900", "Black"]
        ].forEach(([value, label]) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = label;
          option.selected = normalizePreviewFontWeight(currentTextStyle.fontWeight) === value;
          fontWeightSelect.appendChild(option);
        });

        const textAlignSelect = document.createElement("select");
        [
          ["left", "Esquerda"],
          ["center", "Centro"],
          ["right", "Direita"],
          ["justify", "Justificado"]
        ].forEach(([value, label]) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = label;
          option.selected = normalizePreviewTextAlign(currentTextStyle.textAlign) === value;
          textAlignSelect.appendChild(option);
        });

        const fontStyleSelect = document.createElement("select");
        [
          ["normal", "Normal"],
          ["italic", "Itálico"]
        ].forEach(([value, label]) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = label;
          option.selected = (currentTextStyle.fontStyle || "normal") === value;
          fontStyleSelect.appendChild(option);
        });

        const lineHeightInput = document.createElement("input");
        lineHeightInput.type = "number";
        lineHeightInput.min = "0.8";
        lineHeightInput.max = "2.6";
        lineHeightInput.step = "0.05";
        lineHeightInput.value = String(currentTextStyle.lineHeight || 1.35);

        createMiniField("Cor", textColorControl);
        createMiniField("Tamanho", fontSizeInput);
        createMiniField("Peso", fontWeightSelect);
        createMiniField("Alinhamento", textAlignSelect);
        createMiniField("Estilo", fontStyleSelect);
        createMiniField("Altura da linha", lineHeightInput);
        form.appendChild(grid);

        styleInputs = {
          color: textColorInput,
          fontSize: fontSizeInput,
          fontWeight: fontWeightSelect,
          textAlign: textAlignSelect,
          fontStyle: fontStyleSelect,
          lineHeight: lineHeightInput
        };

        if (options.multiline) {
          valueInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
              event.preventDefault();
              closePreviewEditPopover();
            }
          });
        }
      } else {
        valueInput = document.createElement(options.multiline ? "textarea" : "input");
        valueInput.className = "preview-edit-popover__field";
        if (!options.multiline) {
          valueInput.type = options.inputType || "text";
        } else if (options.rows) {
          valueInput.rows = options.rows;
        }
        valueInput.value = currentValue;
        valueInput.placeholder = options.placeholder || "";
        form.appendChild(valueInput);
        valueInput.addEventListener("input", () => applyLiveValue());
        if (kind === "media" && !options.multiline) {
          localAssetButton = document.createElement("button");
          localAssetButton.className = "button button--soft";
          localAssetButton.type = "button";
          localAssetButton.textContent = "Escolher arquivo local";
          form.appendChild(localAssetButton);
        }
      }

      const actions = document.createElement("div");
      actions.className = "preview-edit-popover__actions";

      const resetStyleButton = document.createElement("button");
      resetStyleButton.className = "button button--soft";
      resetStyleButton.type = "button";
      resetStyleButton.textContent = "Limpar estilo";

      const closeButton = document.createElement("button");
      closeButton.className = "button";
      closeButton.type = "button";
      closeButton.textContent = "Fechar";

      if (isTextStyle) {
        actions.appendChild(resetStyleButton);
      }
      actions.appendChild(closeButton);
      form.appendChild(actions);

      const applyLiveValue = (options = {}) => {
        let nextValue = String(valueInput.value || "").trim();
        if (isColor) {
          if (options.opacityField && colorOpacityInput && meta.scope === "carousel" && meta.slideIndex !== undefined) {
            const slide = state.carousel.slides[meta.slideIndex];
            if (slide) {
              slide[options.opacityField] = normalizeCarouselCaptionOpacity(colorOpacityInput.value);
            }
          }

          if (colorGradientInputs?.toggle?.checked) {
            const start = isHexColor(colorGradientInputs.start.value) ? normalizeHexColor(colorGradientInputs.start.value) : normalizeHexColor(valueInput.value);
            const end = isHexColor(colorGradientInputs.end.value) ? normalizeHexColor(colorGradientInputs.end.value) : start;
            nextValue = buildCssGradient(start, end, colorGradientInputs.angle.value);
          } else {
            nextValue = isHexColor(valueInput.value) ? normalizeHexColor(valueInput.value) : normalizeHexColor(readPreviewEditValue(meta));
          }

          if (isHexColor(nextValue) && colorInput) {
            colorInput.value = normalizeHexColor(nextValue);
          }
          colorInput?.style?.setProperty("--preview-edit-color", isHexColor(nextValue) ? normalizeHexColor(nextValue) : nextValue);
        }

        if (isTextStyle) {
          const nextText = normalizePreviewText(nextValue, Boolean(options.multiline));
          const nextStyle = options.clearStyle ? {} : {
            color: styleInputs.color.value,
            fontSize: styleInputs.fontSize.value,
            fontWeight: styleInputs.fontWeight.value,
            textAlign: styleInputs.textAlign.value,
            fontStyle: styleInputs.fontStyle.value,
            lineHeight: styleInputs.lineHeight.value
          };

          updatePreviewEditValue({ ...meta, type: "textStyle", multiline: options.multiline }, {
            text: nextText,
            style: nextStyle
          });
          return;
        }

        updatePreviewEditValue({ ...meta, type: kind }, nextValue);
      };

      if (localAssetButton) {
        localAssetButton.addEventListener("click", () => {
          chooseLocalPreviewAsset(options.accept || "image/*,video/*", (objectUrl) => {
            valueInput.value = objectUrl;
            applyLiveValue();
          });
        });
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        closePreviewEditPopover();
      });

      resetStyleButton.addEventListener("click", () => {
        applyLiveValue({ clearStyle: true, multiline: options.multiline });
      });
      closeButton.addEventListener("click", closePreviewEditPopover);

      if (isTextStyle && styleInputs) {
        Object.values(styleInputs).forEach((input) => {
          input.addEventListener("input", () => applyLiveValue({ multiline: options.multiline }));
          input.addEventListener("change", () => applyLiveValue({ multiline: options.multiline }));
        });
      }

      previewEditKeyHandler = (event) => {
        if (event.key === "Escape") {
          closePreviewEditPopover();
        }
      };

      previewEditOutsideHandler = (event) => {
        if (previewEditPopover && !previewEditPopover.contains(event.target)) {
          closePreviewEditPopover();
        }
      };

      document.body.appendChild(form);
      previewEditPopover = form;
      positionPreviewEditPopover(sourceEvent);
      window.setTimeout(() => {
        document.addEventListener("mousedown", previewEditOutsideHandler, true);
        document.addEventListener("keydown", previewEditKeyHandler, true);
      }, 0);
      if (isTextStyle && styleInputs) {
        styleInputs.fontSize.focus();
      } else {
        valueInput.focus();
        valueInput.select();
      }
    }

    function getPreviewEditTab() {
      return currentPage === "conteudo" ? currentEditorTab : "faq";
    }

    function normalizePreviewText(value, multiline = false) {
      const text = String(value || "")
        .replace(/\u00a0/g, " ")
        .replace(/\r\n?/g, "\n")
        .trim();

      return multiline ? text : text.replace(/\s+/g, " ");
    }

    function colorToHex(value, fallback = "#111827") {
      const rawValue = String(value || "").trim();
      if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(rawValue)) {
        return normalizeHexColor(rawValue);
      }

      const rgbMatch = rawValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (!rgbMatch) {
        return normalizeHexColor(fallback);
      }

      return `#${rgbMatch.slice(1, 4).map((part) => {
        return Math.min(255, Math.max(0, Number(part))).toString(16).padStart(2, "0");
      }).join("")}`;
    }

    function canUseGradientColor(meta, options = {}) {
      if (options.allowGradient !== undefined) {
        return Boolean(options.allowGradient);
      }

      if (meta.scope === "template") {
        return meta.field === "backgroundColor";
      }

      if (meta.scope === "table") {
        return meta.field === "columnHeaderColor" || meta.field === "headerColor";
      }

      if (meta.scope === "stories") {
        return meta.field === "captionBackgroundColor";
      }

      if (meta.scope === "carousel") {
        return ["softColor", "backgroundColor", "mediaBackgroundColor"].includes(meta.field);
      }

      return false;
    }

    function normalizeTextStyleNumber(value, fallback, min, max, decimals = 0) {
      const numericValue = Number(String(value ?? "").replace(",", "."));
      if (!Number.isFinite(numericValue)) {
        return fallback;
      }

      const clamped = Math.min(max, Math.max(min, numericValue));
      return decimals ? Number(clamped.toFixed(decimals)) : Math.round(clamped);
    }

    function normalizePreviewFontWeight(value) {
      if (value === "bold") {
        return "700";
      }

      if (value === "normal") {
        return "400";
      }

      const numericValue = Number(value);
      if (!Number.isFinite(numericValue)) {
        return "700";
      }

      return String(Math.min(900, Math.max(300, Math.round(numericValue / 100) * 100)));
    }

    function normalizePreviewTextAlign(value) {
      return ["left", "center", "right", "justify"].includes(value) ? value : "left";
    }

    function getTextStyleTab(meta) {
      return ["table", "stories", "article", "carousel", "template"].includes(meta.scope) ? meta.scope : "faq";
    }

    function getPreviewTextStyleKey(meta) {
      return [
        meta.scope,
        meta.field,
        meta.index,
        meta.columnIndex,
        meta.rowIndex,
        meta.cellIndex,
        meta.groupIndex,
        meta.slideIndex,
        meta.tabIndex,
        meta.tagIndex
      ].filter((part) => part !== undefined && part !== null && part !== "").join(":");
    }

    function getPreviewTextStyle(meta) {
      const tab = getTextStyleTab(meta);
      const key = getPreviewTextStyleKey(meta);
      return cloneValue((state.textStyles && state.textStyles[tab] && state.textStyles[tab][key]) || {});
    }

    function normalizePreviewTextStyle(style = {}) {
      const normalized = {};

      if (style.color) {
        normalized.color = colorToHex(style.color);
      }

      if (style.fontSize !== undefined && style.fontSize !== "") {
        normalized.fontSize = normalizeTextStyleNumber(style.fontSize, 16, 8, 96);
      }

      if (style.fontWeight !== undefined && style.fontWeight !== "") {
        normalized.fontWeight = normalizePreviewFontWeight(style.fontWeight);
      }

      if (style.fontStyle === "italic") {
        normalized.fontStyle = "italic";
      }

      if (style.textAlign) {
        normalized.textAlign = normalizePreviewTextAlign(style.textAlign);
      }

      if (style.lineHeight !== undefined && style.lineHeight !== "") {
        normalized.lineHeight = normalizeTextStyleNumber(style.lineHeight, 1.35, 0.8, 2.6, 2);
      }

      return normalized;
    }

    function setPreviewTextStyle(meta, style = {}) {
      const tab = getTextStyleTab(meta);
      const key = getPreviewTextStyleKey(meta);
      const normalized = normalizePreviewTextStyle(style);

      state.textStyles = state.textStyles || {};
      state.textStyles[tab] = state.textStyles[tab] || {};

      if (Object.keys(normalized).length) {
        state.textStyles[tab][key] = normalized;
      } else {
        delete state.textStyles[tab][key];
      }
    }

    function buildPreviewTextStyle(meta) {
      const style = getPreviewTextStyle(meta);
      const declarations = [];

      if (style.color) {
        declarations.push(`color: ${style.color}`);
      }

      if (style.fontSize) {
        declarations.push(`font-size: ${style.fontSize}px`);
      }

      if (style.fontWeight) {
        declarations.push(`font-weight: ${style.fontWeight}`);
      }

      if (style.fontStyle) {
        declarations.push(`font-style: ${style.fontStyle}`);
      }

      if (style.textAlign) {
        declarations.push(`text-align: ${style.textAlign}`);
      }

      if (style.lineHeight) {
        declarations.push(`line-height: ${style.lineHeight}`);
      }

      return declarations.join("; ");
    }

    function previewTextStyleAttr(meta) {
      const style = buildPreviewTextStyle(meta);
      return style ? ` style="${escapeHtml(style)}"` : "";
    }

    function getTemplatePreviewNode(meta) {
      const doc = previewFrame.contentDocument;
      if (!doc || !meta.templateNodeId) {
        return null;
      }

      return doc.querySelector(`[data-ll-template-node="${meta.templateNodeId}"]`);
    }

    function isTransparentColor(value) {
      const color = String(value || "").replace(/\s+/g, "").toLowerCase();
      return !color || color === "transparent" || color === "rgba(0,0,0,0)";
    }

    function cleanTemplatePreviewClone(container) {
      const clone = container.cloneNode(true);
      [clone, ...clone.querySelectorAll("*")].forEach((element) => {
        [
          "data-ll-template-node",
          "data-ll-preview-text",
          "data-ll-preview-media",
          "data-ll-preview-color",
          "data-ll-preview-inline",
          "data-ll-preview-position",
          "data-ll-preview-overlay-horizontal",
          "data-ll-preview-overlay-vertical",
          "data-ll-preview-manual-story",
          "data-ll-preview-story-active",
          "data-ll-preview-story-hidden",
          "data-ll-preview-story-current",
          "data-ll-template-iframe-parent",
          "data-ll-preview-header-editor",
          "data-ll-preview-header-banner"
        ].forEach((attribute) => element.removeAttribute(attribute));
        element.removeAttribute("contenteditable");
        element.removeAttribute("spellcheck");

        const title = element.getAttribute("title") || "";
        if (/^Clique para editar|^Clique para trocar|^Duplo clique para editar/i.test(title)) {
          element.removeAttribute("title");
        }
      });

      clone.querySelectorAll("[data-ll-template-helper]").forEach((element) => {
        element.remove();
      });

      return clone;
    }

    function syncTemplateHtmlFromPreview() {
      const doc = previewFrame.contentDocument;
      const container = doc ? doc.querySelector(".lp-container, .lp_container") : null;
      if (!container) {
        return;
      }

      const clone = cleanTemplatePreviewClone(container);
      state.template.html = clone.innerHTML.trim();
      const textarea = editor.querySelector('[data-template-field="html"]');
      if (textarea && document.activeElement !== textarea) {
        textarea.value = state.template.html;
        updateTemplateCodeHighlight(textarea);
      }
      generatedHtml.value = buildOutputHtml("html");
      copyStatus.textContent = "";
    }

    function getTemplateMediaValue(element) {
      if (!element) {
        return "";
      }

      const tagName = element.tagName;
      if (tagName === "IMG" || tagName === "VIDEO" || tagName === "SOURCE" || tagName === "IFRAME") {
        return element.getAttribute("src") || "";
      }

      const backgroundImage = element.style.backgroundImage || element.ownerDocument.defaultView.getComputedStyle(element).backgroundImage || "";
      const urlMatch = backgroundImage.match(/url\(["']?(.+?)["']?\)/i);
      return urlMatch ? urlMatch[1] : "";
    }

    function normalizeYouTubeEmbedUrl(value) {
      const rawValue = String(value || "").trim();
      if (!rawValue) {
        return "";
      }

      try {
        const url = new URL(rawValue, window.location.href);
        const hostname = url.hostname.replace(/^www\./, "");
        let videoId = "";

        if (hostname === "youtu.be") {
          videoId = url.pathname.split("/").filter(Boolean)[0] || "";
        } else if (hostname.endsWith("youtube.com")) {
          if (url.pathname.startsWith("/embed/")) {
            return rawValue;
          }

          if (url.pathname.startsWith("/shorts/")) {
            videoId = url.pathname.split("/").filter(Boolean)[1] || "";
          } else {
            videoId = url.searchParams.get("v") || "";
          }
        }

        if (!videoId) {
          return rawValue;
        }

        const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
        const start = url.searchParams.get("start") || url.searchParams.get("t");
        if (start) {
          const seconds = /^\d+$/.test(start) ? start : String(start).replace(/[^\d]/g, "");
          if (seconds) {
            embedUrl.searchParams.set("start", seconds);
          }
        }
        return embedUrl.toString();
      } catch (error) {
        return rawValue;
      }
    }

    function setTemplateMediaValue(element, value) {
      if (!element) {
        return;
      }

      const normalizedValue = normalizeAssetUrl(value);
      const tagName = element.tagName;
      if (tagName === "IFRAME") {
        element.setAttribute("src", normalizeYouTubeEmbedUrl(normalizedValue));
        element.setAttribute("allowfullscreen", "");
        if (!element.getAttribute("allow")) {
          element.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        }
        return;
      }

      if (tagName === "IMG") {
        element.setAttribute("src", normalizedValue);
        const picture = element.closest("picture");
        if (picture) {
          picture.querySelectorAll("source").forEach((source) => {
            source.setAttribute("srcset", normalizedValue);
          });
        } else {
          element.removeAttribute("srcset");
        }
        return;
      }

      if (tagName === "VIDEO" || tagName === "SOURCE") {
        element.setAttribute("src", normalizedValue);
        if (tagName === "VIDEO") {
          element.load();
        }
        return;
      }

      element.style.backgroundImage = `url("${normalizedValue.replaceAll('"', "%22")}")`;
    }

    function findTemplateHeaderRoot(element, root) {
      if (!element || !root) {
        return null;
      }

      const directHeader = element.closest(".product-header, .video-header");
      if (directHeader && root.contains(directHeader)) {
        return directHeader;
      }

      const headerNamePattern = /(product[-_\s]*header|video[-_\s]*header|header[-_\s]*(image|imagem|video)|cabecalho|cabe[cç]alho)/i;
      const getNodeSignature = (node) => {
        if (!node || node.nodeType !== 1) {
          return "";
        }
        return [
          node.tagName || "",
          node.id || "",
          typeof node.className === "string" ? node.className : "",
          node.getAttribute?.("aria-label") || "",
          node.getAttribute?.("aria-labelledby") || ""
        ].join(" ");
      };
      const hasHeaderMedia = (node) => {
        if (!node || node.nodeType !== 1) {
          return false;
        }
        const computed = node.ownerDocument?.defaultView?.getComputedStyle(node);
        const hasBackground = computed && computed.backgroundImage && computed.backgroundImage !== "none";
        return Boolean(hasBackground || node.querySelector?.("img, picture, video, source, iframe"));
      };
      const hasHeaderText = (node) => {
        if (!node || node.nodeType !== 1) {
          return false;
        }
        return Boolean(node.querySelector?.("h1, h2, h3, p, small, .product-header__title, .video-header__title, .product-header__subtitle, .video-header__subtitle"));
      };

      const headerPart = element.closest(".product-header__banner, .video-header__banner, .product-header__body, .video-header__body, .product-header__banner-img, .video-header__banner-video, .product-header__badge, .video-header__badge");
      let candidate = headerPart || element;
      while (candidate && candidate !== root.parentElement) {
        if (candidate.nodeType === 1 && root.contains(candidate)) {
          if (headerNamePattern.test(getNodeSignature(candidate)) && hasHeaderMedia(candidate)) {
            return candidate;
          }

          const hasBanner = candidate.querySelector?.(".product-header__banner, .video-header__banner, .product-header__banner-img, .video-header__banner-video");
          const hasBody = candidate.querySelector?.(".product-header__body, .video-header__body, .product-header__title, .video-header__title");
          if (hasBanner && hasBody) {
            return candidate;
          }

          const isLikelyHeaderTag = ["HEADER", "SECTION", "ARTICLE"].includes(candidate.tagName);
          if (isLikelyHeaderTag && hasHeaderMedia(candidate) && hasHeaderText(candidate) && headerNamePattern.test(getNodeSignature(candidate))) {
            return candidate;
          }
        }
        candidate = candidate.parentElement;
      }

      const firstContentBlock = Array.from(root.children).find((child) => {
        return child.nodeType === 1 && child.tagName !== "STYLE" && child.tagName !== "SCRIPT";
      });
      if (firstContentBlock && firstContentBlock.contains(element) && hasHeaderMedia(firstContentBlock)) {
        const signature = getNodeSignature(firstContentBlock);
        if (headerNamePattern.test(signature) || hasHeaderText(firstContentBlock)) {
          return firstContentBlock;
        }
      }

      return null;
    }

    function getTemplateHeaderDataFromElement(element) {
      const defaults = getTemplateHeaderDefaults();
      const isVideoHeader = element.classList.contains("video-header")
        || Boolean(element.querySelector(".video-header__banner, .video-header__banner-video, video"));
      const image = element.querySelector(".product-header__banner-img, .video-header__banner-img, img");
      const bannerImage = element.querySelector(".product-header__banner-img");
      const video = element.querySelector(".video-header__banner-video, video");
      const videoSource = video ? video.querySelector("source") : null;
      const logo = element.querySelector(".product-header__badge-img, .video-header__badge-img");
      const badge = element.querySelector(".product-header__badge, .video-header__badge");
      const brand = element.querySelector(".product-header__brand, .video-header__brand");
      const title = element.querySelector(".product-header__title, .video-header__title");
      const subtitle = element.querySelector(".product-header__subtitle, .video-header__subtitle");

      return {
        ...defaults,
        type: isVideoHeader ? "video" : "image",
        imageUrl: stripHeaderImageVariant((bannerImage || image)?.getAttribute("src") || defaults.imageUrl),
        imageAlt: (bannerImage || image)?.getAttribute("alt") || "",
        videoUrl: videoSource?.getAttribute("src") || video?.getAttribute("src") || defaults.videoUrl,
        posterUrl: video?.getAttribute("poster") || defaults.posterUrl,
        logoUrl: logo?.getAttribute("src") || defaults.logoUrl,
        logoLabel: badge?.getAttribute("aria-label") || defaults.logoLabel,
        brand: (brand?.textContent || defaults.brand).trim(),
        title: (title?.textContent || defaults.title).trim(),
        subtitle: (subtitle?.textContent || defaults.subtitle).trim()
      };
    }

    function createTemplateHeaderElement(doc, data) {
      const wrapper = doc.createElement("div");
      wrapper.innerHTML = buildTemplateHeaderMarkup(data).trim();
      return wrapper.firstElementChild;
    }

    function getTemplateHeaderType(headerElement) {
      return getTemplateHeaderDataFromElement(headerElement).type === "video" ? "video" : "image";
    }

    function getTemplateHeaderBannerElement(headerElement) {
      if (!headerElement) {
        return null;
      }

      const namedBanner = headerElement.querySelector(".product-header__banner, .video-header__banner");
      if (namedBanner) {
        return namedBanner;
      }

      const bannerMedia = headerElement.querySelector(".product-header__banner-img, .video-header__banner-video, picture, video");
      if (!bannerMedia) {
        return null;
      }

      return bannerMedia.closest("header, figure, picture, div, section") || bannerMedia;
    }

    function isTemplateHeaderBannerTarget(target, headerElement) {
      const banner = getTemplateHeaderBannerElement(headerElement);
      return Boolean(banner && target && (target === banner || banner.contains(target)));
    }

    function getTemplateHeaderBannerImage(headerElement) {
      const banner = getTemplateHeaderBannerElement(headerElement);
      if (!banner) {
        return null;
      }

      return banner.querySelector(".product-header__banner-img")
        || banner.querySelector("picture img")
        || Array.from(banner.querySelectorAll("img")).find((image) => {
          return !image.classList.contains("product-header__badge-img") && !image.classList.contains("video-header__badge-img");
        })
        || null;
    }

    function updateTemplateHeaderImageSources(headerElement, imageUrl) {
      const banner = getTemplateHeaderBannerElement(headerElement);
      if (!banner) {
        return;
      }

      const cleanUrl = stripHeaderImageVariant(imageUrl);
      const image = getTemplateHeaderBannerImage(headerElement);
      if (image) {
        image.setAttribute("src", cleanUrl);
      }

      const sources = banner.querySelectorAll("picture source");
      const sizes = [430, 768, 1024, 1200];
      sources.forEach((source, index) => {
        source.setAttribute("srcset", withHeaderImageSize(cleanUrl, sizes[index] || 1200));
      });
    }

    function updateTemplateHeaderVideoSources(headerElement, videoUrl, posterUrl) {
      const banner = getTemplateHeaderBannerElement(headerElement);
      const video = banner ? banner.querySelector(".video-header__banner-video, video") : null;
      if (!video) {
        return;
      }

      if (posterUrl !== undefined) {
        video.setAttribute("poster", normalizeAssetUrl(posterUrl));
      }

      const source = video.querySelector("source");
      const normalizedVideoUrl = normalizeAssetUrl(videoUrl);
      if (source) {
        source.setAttribute("src", normalizedVideoUrl);
      } else {
        video.setAttribute("src", normalizedVideoUrl);
      }

      video.load?.();
    }

    function updateTemplateHeaderBannerInPlace(headerElement, data) {
      if (data.type === "video") {
        updateTemplateHeaderVideoSources(headerElement, data.videoUrl, data.posterUrl);
        return;
      }

      updateTemplateHeaderImageSources(headerElement, data.imageUrl);
      const image = getTemplateHeaderBannerImage(headerElement);
      if (image) {
        image.setAttribute("alt", data.imageAlt || "");
      }
    }

    function renameTemplateHeaderClasses(root, targetType) {
      const fromPrefix = targetType === "video" ? "product-header" : "video-header";
      const toPrefix = targetType === "video" ? "video-header" : "product-header";

      [root, ...root.querySelectorAll("*")].forEach((element) => {
        Array.from(element.classList || []).forEach((className) => {
          if (className === fromPrefix || className.startsWith(`${fromPrefix}__`)) {
            element.classList.remove(className);
            element.classList.add(className.replace(fromPrefix, toPrefix));
          }
        });
      });

      root.classList.remove(fromPrefix);
      root.classList.add(toPrefix);
    }

    function convertTemplateBadgeForType(badge, targetType) {
      if (!badge) {
        return null;
      }

      const clone = badge.cloneNode(true);
      renameTemplateHeaderClasses(clone, targetType);
      return clone;
    }

    function createTemplateHeaderBannerForType(doc, data, badge) {
      const wrapper = doc.createElement("div");
      if (data.type === "video") {
        data.videoUrl = normalizeAssetUrl(data.videoUrl);
        data.posterUrl = normalizeAssetUrl(data.posterUrl);
        wrapper.innerHTML = `<header class="video-header__banner">
    <video class="video-header__banner-video" poster="${escapeHtml(data.posterUrl)}" preload="none" autoplay muted loop playsinline width="1200" height="250" aria-hidden="true">
      <source src="${escapeHtml(data.videoUrl)}">
    </video>
  </header>`;
      } else {
        const cleanImageUrl = stripHeaderImageVariant(data.imageUrl);
        wrapper.innerHTML = `<header class="product-header__banner">
    <picture style="width:100%; height:100%; margin:0;">
      <source media="(max-width: 430px)" srcset="${escapeHtml(withHeaderImageSize(cleanImageUrl, 430))}">
      <source media="(max-width: 768px)" srcset="${escapeHtml(withHeaderImageSize(cleanImageUrl, 768))}">
      <source media="(max-width: 1024px)" srcset="${escapeHtml(withHeaderImageSize(cleanImageUrl, 1024))}">
      <source media="(max-width: 1200px)" srcset="${escapeHtml(withHeaderImageSize(cleanImageUrl, 1200))}">
      <img src="${escapeHtml(cleanImageUrl)}" alt="${escapeHtml(data.imageAlt || "")}" class="product-header__banner-img" loading="eager">
    </picture>
  </header>`;
      }

      const banner = wrapper.firstElementChild;
      const nextBadge = convertTemplateBadgeForType(badge, data.type);
      if (banner && nextBadge) {
        banner.appendChild(nextBadge);
      }
      return banner;
    }

    function convertTemplateHeaderTypeInPlace(headerElement, data) {
      const banner = getTemplateHeaderBannerElement(headerElement);
      const badge = banner ? banner.querySelector(".product-header__badge, .video-header__badge") : null;
      const nextBanner = createTemplateHeaderBannerForType(headerElement.ownerDocument, data, badge);
      if (!banner || !nextBanner) {
        return false;
      }

      banner.replaceWith(nextBanner);
      renameTemplateHeaderClasses(headerElement, data.type);

      const title = headerElement.querySelector(".product-header__title, .video-header__title");
      if (title && title.id) {
        title.id = data.type === "video" ? "video-main-title" : "product-main-title";
      }

      return true;
    }

    function attachTemplateHeaderEditor(element) {
      if (!element || element.dataset.llPreviewHeaderEditor === "true") {
        return;
      }

      element.dataset.llPreviewHeaderEditor = "true";
      const banner = getTemplateHeaderBannerElement(element);
      if (banner) {
        banner.dataset.llPreviewHeaderBanner = "true";
        banner.style.cursor = "pointer";
        banner.setAttribute("title", "Clique para editar o banner.");
        banner.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          openTemplateHeaderPopover(event, element);
        });
      }
    }

    function openTemplateHeaderPopover(sourceEvent, headerElement) {
      closePreviewEditPopover();

      let activeHeader = headerElement;
      let headerData = getTemplateHeaderDataFromElement(activeHeader);

      const form = document.createElement("form");
      form.className = "preview-edit-popover preview-edit-popover--header";
      form.setAttribute("role", "dialog");
      form.setAttribute("aria-label", "Editar banner da header");
      form.innerHTML = `<p class="preview-edit-popover__title">Editar banner 1200x250</p>`;

      const createField = (label, input) => {
        const field = document.createElement("label");
        field.className = "field";
        const text = document.createElement("span");
        text.textContent = label;
        field.appendChild(text);
        field.appendChild(input);
        form.appendChild(field);
        return field;
      };

      const typeSelect = document.createElement("select");
      [
        ["image", "Imagem (product-header)"],
        ["video", "Vídeo (video-header)"]
      ].forEach(([value, label]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        option.selected = headerData.type === value;
        typeSelect.appendChild(option);
      });
      createField("1. Tipo de header", typeSelect);

      const imageUrlInput = document.createElement("input");
      imageUrlInput.type = "text";
      imageUrlInput.value = headerData.imageUrl;
      const imageUrlField = createField("URL da imagem", imageUrlInput);

      const imageAltInput = document.createElement("input");
      imageAltInput.type = "text";
      imageAltInput.value = headerData.imageAlt;
      const imageAltField = createField("Alt text da imagem", imageAltInput);

      const videoUrlInput = document.createElement("input");
      videoUrlInput.type = "text";
      videoUrlInput.value = headerData.videoUrl;
      const videoUrlField = createField("URL do vídeo", videoUrlInput);

      const posterUrlInput = document.createElement("input");
      posterUrlInput.type = "text";
      posterUrlInput.value = headerData.posterUrl;
      const posterUrlField = createField("Poster do vídeo", posterUrlInput);

      const actions = document.createElement("div");
      actions.className = "preview-edit-popover__actions";
      const closeButton = document.createElement("button");
      closeButton.className = "button";
      closeButton.type = "button";
      closeButton.textContent = "Fechar";
      actions.appendChild(closeButton);
      form.appendChild(actions);

      const toggleFields = () => {
        const isImage = typeSelect.value === "image";
        imageUrlField.style.display = isImage ? "" : "none";
        imageAltField.style.display = isImage ? "" : "none";
        videoUrlField.style.display = isImage ? "none" : "";
        posterUrlField.style.display = isImage ? "none" : "";
      };

      const readFields = () => ({
        type: typeSelect.value === "video" ? "video" : "image",
        imageUrl: normalizeAssetUrl(imageUrlInput.value),
        imageAlt: imageAltInput.value,
        videoUrl: normalizeAssetUrl(videoUrlInput.value),
        posterUrl: normalizeAssetUrl(posterUrlInput.value),
        logoUrl: headerData.logoUrl,
        logoLabel: headerData.logoLabel,
        brand: headerData.brand,
        title: headerData.title,
        subtitle: headerData.subtitle
      });

      const applyHeader = () => {
        const previousType = getTemplateHeaderType(activeHeader);
        headerData = readFields();
        imageUrlInput.value = headerData.imageUrl;
        videoUrlInput.value = headerData.videoUrl;
        posterUrlInput.value = headerData.posterUrl;
        if (headerData.type === previousType) {
          updateTemplateHeaderBannerInPlace(activeHeader, headerData);
          syncTemplateHtmlFromPreview();
          return;
        }

        const converted = convertTemplateHeaderTypeInPlace(activeHeader, headerData);
        if (!converted) {
          const nextHeader = createTemplateHeaderElement(activeHeader.ownerDocument, headerData);
          if (!nextHeader) {
            return;
          }
          activeHeader.replaceWith(nextHeader);
          activeHeader = nextHeader;
        }
        attachTemplateHeaderEditor(activeHeader);
        toggleFields();
        syncTemplateHtmlFromPreview();
      };

      imageUrlField.appendChild(createLocalAssetButton(imageUrlInput, applyHeader, "image/*"));
      videoUrlField.appendChild(createLocalAssetButton(videoUrlInput, applyHeader, "video/*"));
      posterUrlField.appendChild(createLocalAssetButton(posterUrlInput, applyHeader, "image/*"));

      [
        typeSelect,
        imageUrlInput,
        imageAltInput,
        videoUrlInput,
        posterUrlInput
      ].forEach((input) => {
        input.addEventListener("input", applyHeader);
        input.addEventListener("change", applyHeader);
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        closePreviewEditPopover();
      });
      closeButton.addEventListener("click", closePreviewEditPopover);
      toggleFields();

      previewEditKeyHandler = (event) => {
        if (event.key === "Escape") {
          closePreviewEditPopover();
        }
      };
      previewEditOutsideHandler = (event) => {
        if (previewEditPopover && !previewEditPopover.contains(event.target)) {
          closePreviewEditPopover();
        }
      };

      document.body.appendChild(form);
      previewEditPopover = form;
      positionPreviewEditPopover(sourceEvent);
      window.setTimeout(() => {
        document.addEventListener("mousedown", previewEditOutsideHandler, true);
        document.addEventListener("keydown", previewEditKeyHandler, true);
      }, 0);
      const initialFocus = typeSelect;
      initialFocus.focus();
      initialFocus.select?.();
    }

    function openTemplateImagePopover(sourceEvent, element, meta, label) {
      const root = element?.ownerDocument?.querySelector(".lp-container, .lp_container");
      const header = root ? findTemplateHeaderRoot(element, root) : null;
      if (header && isTemplateHeaderBannerTarget(sourceEvent?.target || element, header)) {
        openTemplateHeaderPopover(sourceEvent, header);
        return;
      }

      closePreviewEditPopover();

      const form = document.createElement("form");
      form.className = "preview-edit-popover";
      form.innerHTML = `<h3>${escapeHtml(label)}</h3>`;

      const createField = (fieldLabel, input) => {
        const field = document.createElement("label");
        field.className = "field";
        const text = document.createElement("span");
        text.textContent = fieldLabel;
        field.appendChild(text);
        field.appendChild(input);
        form.appendChild(field);
        return field;
      };

      const urlInput = document.createElement("input");
      urlInput.type = "text";
      urlInput.value = getTemplateMediaValue(element);
      const urlField = createField("URL da imagem", urlInput);

      const altInput = document.createElement("input");
      altInput.type = "text";
      altInput.value = element.getAttribute("alt") || "";
      createField("Alt text", altInput);

      const actions = document.createElement("div");
      actions.className = "preview-edit-popover__actions";
      const closeButton = document.createElement("button");
      closeButton.className = "button";
      closeButton.type = "button";
      closeButton.textContent = "Fechar";
      actions.appendChild(closeButton);
      form.appendChild(actions);

      const applyImage = () => {
        const normalizedUrl = normalizeAssetUrl(urlInput.value);
        urlInput.value = normalizedUrl;
        setTemplateMediaValue(element, normalizedUrl);
        element.setAttribute("alt", altInput.value);
        syncTemplateHtmlFromPreview();
      };

      urlField.appendChild(createLocalAssetButton(urlInput, applyImage, "image/*,video/*"));

      urlInput.addEventListener("input", applyImage);
      urlInput.addEventListener("change", applyImage);
      altInput.addEventListener("input", applyImage);
      altInput.addEventListener("change", applyImage);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        closePreviewEditPopover();
      });
      closeButton.addEventListener("click", closePreviewEditPopover);

      previewEditKeyHandler = (event) => {
        if (event.key === "Escape") {
          closePreviewEditPopover();
        }
      };
      previewEditOutsideHandler = (event) => {
        if (previewEditPopover && !previewEditPopover.contains(event.target)) {
          closePreviewEditPopover();
        }
      };

      document.body.appendChild(form);
      previewEditPopover = form;
      positionPreviewEditPopover(sourceEvent);
      window.setTimeout(() => {
        document.addEventListener("mousedown", previewEditOutsideHandler, true);
        document.addEventListener("keydown", previewEditKeyHandler, true);
      }, 0);
      urlInput.focus();
      urlInput.select();
    }

    function openTemplateSvgPopover(sourceEvent, element) {
      closePreviewEditPopover();

      const form = document.createElement("form");
      form.className = "preview-edit-popover preview-edit-popover--svg";
      form.setAttribute("role", "dialog");
      form.setAttribute("aria-label", "Editar SVG");

      const title = document.createElement("p");
      title.className = "preview-edit-popover__title";
      title.textContent = "Editar SVG";
      form.appendChild(title);

      const field = document.createElement("label");
      field.className = "field";
      const fieldText = document.createElement("span");
      fieldText.textContent = "Código SVG";
      const textarea = document.createElement("textarea");
      textarea.rows = 8;
      textarea.value = element.outerHTML;
      textarea.placeholder = "<svg ...>...</svg>";
      field.append(fieldText, textarea);
      form.appendChild(field);

      const hint = document.createElement("p");
      hint.className = "muted-note";
      hint.textContent = "Cole o SVG completo. Scripts e eventos inline são removidos antes de entrar no HTML.";
      form.appendChild(hint);

      const actions = document.createElement("div");
      actions.className = "preview-edit-popover__actions";
      const closeButton = document.createElement("button");
      closeButton.className = "button";
      closeButton.type = "button";
      closeButton.textContent = "Fechar";
      actions.appendChild(closeButton);
      form.appendChild(actions);

      const attachSvgEditor = (svgElement) => {
        svgElement.dataset.llPreviewMedia = "true";
        svgElement.setAttribute("title", "Duplo clique para editar SVG.");
        svgElement.addEventListener("dblclick", (event) => {
          event.preventDefault();
          event.stopPropagation();
          openTemplateSvgPopover(event, svgElement);
        });
      };

      let currentElement = element;
      let applyTimer = 0;
      const applySvg = () => {
        const nextSvg = createSvgElementFromMarkup(currentElement.ownerDocument, textarea.value);
        if (!nextSvg) {
          return;
        }

        const currentNodeId = currentElement.dataset.llTemplateNode;
        if (currentNodeId) {
          nextSvg.dataset.llTemplateNode = currentNodeId;
        }
        attachSvgEditor(nextSvg);
        currentElement.replaceWith(nextSvg);
        currentElement = nextSvg;
        syncTemplateHtmlFromPreview();
      };

      textarea.addEventListener("input", () => {
        window.clearTimeout(applyTimer);
        applyTimer = window.setTimeout(applySvg, 300);
      });
      textarea.addEventListener("change", applySvg);
      textarea.addEventListener("blur", applySvg);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        applySvg();
        closePreviewEditPopover();
      });
      closeButton.addEventListener("click", closePreviewEditPopover);

      previewEditKeyHandler = (event) => {
        if (event.key === "Escape") {
          closePreviewEditPopover();
        }
      };
      previewEditOutsideHandler = (event) => {
        if (previewEditPopover && !previewEditPopover.contains(event.target)) {
          closePreviewEditPopover();
        }
      };

      document.body.appendChild(form);
      previewEditPopover = form;
      positionPreviewEditPopover(sourceEvent);
      window.setTimeout(() => {
        document.addEventListener("mousedown", previewEditOutsideHandler, true);
        document.addEventListener("keydown", previewEditKeyHandler, true);
      }, 0);
      textarea.focus();
      textarea.select();
    }

    function updateTemplatePreviewEditValue(meta, rawValue, normalizedValue) {
      const element = getTemplatePreviewNode(meta);
      if (!element) {
        return;
      }

      if (meta.type === "textStyle") {
        const textValue = normalizePreviewText(rawValue && rawValue.text, Boolean(meta.multiline));
        element.textContent = textValue;

        const style = normalizePreviewTextStyle(rawValue && rawValue.style ? rawValue.style : {});
        ["color", "fontSize", "fontWeight", "fontStyle", "textAlign", "lineHeight"].forEach((property) => {
          element.style[property] = "";
        });
        if (style.color) element.style.color = style.color;
        if (style.fontSize) element.style.fontSize = `${style.fontSize}px`;
        if (style.fontWeight) element.style.fontWeight = style.fontWeight;
        if (style.fontStyle) element.style.fontStyle = style.fontStyle;
        if (style.textAlign) element.style.textAlign = style.textAlign;
        if (style.lineHeight) element.style.lineHeight = String(style.lineHeight);
      } else if (meta.type === "media") {
        setTemplateMediaValue(element, normalizedValue);
      } else if (meta.type === "color") {
        const computed = element.ownerDocument.defaultView.getComputedStyle(element);
        const backgroundImage = computed.backgroundImage || "";
        if (backgroundImage && backgroundImage !== "none" && !/url\(/i.test(backgroundImage)) {
          element.style.backgroundImage = "none";
        }
        element.style.backgroundColor = normalizedValue;
      }

      syncTemplateHtmlFromPreview();
    }

    function updateInlinePreviewTextValue(meta, element, rawValue, options = {}) {
      const multiline = Boolean(options.multiline || meta.multiline);
      const value = normalizePreviewText(rawValue, multiline);

      if (meta.scope === "template") {
        syncTemplateHtmlFromPreview();
        return value;
      }

      if (currentPage === "conteudo") {
        markResponsiveDirty();
      }

      if (meta.scope === "faq") {
        const item = state.items[meta.index];
        if (item) {
          item[meta.field] = value;
        }
      }

      if (meta.scope === "stories") {
        if (["avatar", "ringColor", "ringGradientStart", "ringGradientEnd", "captionBackgroundColor"].includes(meta.field)) {
          state.stories[meta.field] = value;
        } else {
          const group = state.stories.groups[meta.groupIndex];
          if (group) {
            if (meta.field === "groupName") {
              group.name = value;
            } else if (meta.field === "groupThumb") {
              group.thumb = value;
            } else {
              const slide = group.slides[meta.slideIndex];
              if (slide) {
                slide[meta.field] = value;
              }
            }
          }
        }
      }

      if (meta.scope === "article") {
        if (meta.tabIndex === undefined) {
          state.article[meta.field] = value;
        } else {
          const tab = state.article.tabs[meta.tabIndex];
          if (tab) {
            if (meta.field === "tag") {
              const tags = getArticleTags(tab.tags);
              tags[meta.tagIndex] = value;
              tab.tags = tags.filter(Boolean).join(", ");
            } else {
              tab[meta.field] = value;
            }
            state.article.openTabIndex = meta.tabIndex;
          }
        }
      }

      if (meta.scope === "carousel") {
        if (meta.slideIndex === undefined) {
          state.carousel[meta.field] = value;
        } else {
          const slide = state.carousel.slides[meta.slideIndex];
          if (slide) {
            slide[meta.field] = value;
            state.carousel.openSlideIndex = meta.slideIndex;
            setCarouselPreviewSlide(meta.slideIndex);
          }
        }
      }

      generatedHtml.value = buildOutputHtml("html");
      copyStatus.textContent = "";
      copyStatus.classList.remove("is-warning", "is-visible");
      return value;
    }

    function getComputedPreviewTextStyle(element) {
      const view = element.ownerDocument?.defaultView;
      const computed = view ? view.getComputedStyle(element) : null;
      const fontSize = computed ? normalizeTextStyleNumber(parseFloat(computed.fontSize), 16, 8, 96) : 16;
      const lineHeightValue = computed && computed.lineHeight !== "normal"
        ? normalizeTextStyleNumber(parseFloat(computed.lineHeight) / Math.max(fontSize, 1), 1.35, 0.8, 2.6, 2)
        : 1.35;

      return {
        color: colorToHex(computed?.color || "#111827"),
        fontSize,
        fontWeight: normalizePreviewFontWeight(computed?.fontWeight || "700"),
        fontStyle: computed?.fontStyle === "italic" ? "italic" : "normal",
        textAlign: normalizePreviewTextAlign(computed?.textAlign || "left"),
        lineHeight: lineHeightValue
      };
    }

    function readPreviewEditValue(meta) {
      if (meta.scope === "template") {
        return meta.value || "";
      }

      if (meta.scope === "faq") {
        const item = state.items[meta.index];
        return item ? item[meta.field] || "" : "";
      }

      if (meta.scope === "table") {
        if (meta.field === "column") {
          return state.table.columns[meta.columnIndex] || "";
        }

        if (meta.field === "columnHeaderColor") {
          return state.table.headerColors[meta.columnIndex] || state.table.headerColor;
        }

        if (meta.field === "cell") {
          return state.table.rows[meta.rowIndex]?.[meta.cellIndex] || "";
        }
      }

      if (meta.scope === "stories") {
        if (["avatar", "ringColor", "ringGradientStart", "ringGradientEnd", "captionBackgroundColor"].includes(meta.field)) {
          return state.stories[meta.field] || "";
        }

        const group = state.stories.groups[meta.groupIndex];
        if (!group) {
          return "";
        }

        if (meta.field === "groupName") {
          return group.name || "";
        }

        if (meta.field === "groupThumb") {
          return group.thumb || "";
        }

        const slide = group.slides[meta.slideIndex];
        return slide ? slide[meta.field] || "" : "";
      }

      if (meta.scope === "article") {
        if (meta.tabIndex === undefined) {
          return state.article[meta.field] || "";
        }

        const tab = state.article.tabs[meta.tabIndex];
        if (!tab) {
          return "";
        }

        if (meta.field === "tag") {
          return getArticleTags(tab.tags)[meta.tagIndex] || "";
        }

        return tab[meta.field] || "";
      }

      if (meta.scope === "carousel") {
        if (meta.slideIndex === undefined) {
          return state.carousel[meta.field] || "";
        }

        const slide = state.carousel.slides[meta.slideIndex];
        if (!slide) {
          return "";
        }

        if (meta.field === "navNumber") {
          return slide.navNumber || String(Number(meta.slideIndex) + 1).padStart(2, "0");
        }

        return slide[meta.field] || "";
      }

      return "";
    }

    function updatePreviewEditValue(meta, rawValue) {
      const isColor = meta.type === "color";
      const isTextStyle = meta.type === "textStyle";
      const isMedia = meta.type === "media";
      const value = isTextStyle
        ? normalizePreviewText(rawValue && rawValue.text, Boolean(meta.multiline))
        : isColor
          ? normalizeCssColorValue(rawValue)
          : isMedia
            ? normalizeAssetUrl(rawValue)
            : String(rawValue || "");

      if (meta.scope === "template") {
        updateTemplatePreviewEditValue(meta, rawValue, value);
        return;
      }

      if (currentPage === "conteudo") {
        markResponsiveDirty();
      }

      if (isTextStyle) {
        setPreviewTextStyle(meta, rawValue && rawValue.style ? rawValue.style : {});
      }

      if (meta.scope === "faq") {
        const item = state.items[meta.index];
        if (item) {
          item[meta.field] = value;
        }
      }

      if (meta.scope === "table") {
        if (meta.field === "column") {
          state.table.columns[meta.columnIndex] = value;
        } else if (meta.field === "columnHeaderColor") {
          state.table.headerColors[meta.columnIndex] = value;
        } else if (meta.field === "cell") {
          state.table.rows[meta.rowIndex][meta.cellIndex] = value;
        }
      }

      if (meta.scope === "stories") {
        if (["avatar", "ringColor", "ringGradientStart", "ringGradientEnd", "captionBackgroundColor"].includes(meta.field)) {
          state.stories[meta.field] = value;
          if (meta.field === "ringColor") {
            state.stories.ringStyle = "solid";
          } else if (meta.field === "ringGradientStart" || meta.field === "ringGradientEnd") {
            state.stories.ringStyle = "gradient";
          }
        } else {
          const group = state.stories.groups[meta.groupIndex];
          if (group) {
            if (meta.field === "groupName") {
              group.name = value;
              setStoriesPreviewTarget(meta.groupIndex, 0);
            } else if (meta.field === "groupThumb") {
              group.thumb = value;
              setStoriesPreviewTarget(meta.groupIndex, 0);
            } else {
              const slide = group.slides[meta.slideIndex];
              if (slide) {
                slide[meta.field] = value;
                setStoriesPreviewTarget(meta.groupIndex, meta.slideIndex);
              }
            }
          }
        }
      }

      if (meta.scope === "article") {
        if (meta.tabIndex === undefined) {
          state.article[meta.field] = value;
        } else {
          const tab = state.article.tabs[meta.tabIndex];
          if (tab) {
            if (meta.field === "tag") {
              const tags = getArticleTags(tab.tags);
              tags[meta.tagIndex] = value;
              tab.tags = tags.filter(Boolean).join(", ");
            } else {
              tab[meta.field] = value;
            }
            state.article.openTabIndex = meta.tabIndex;
          }
        }
      }

      if (meta.scope === "carousel") {
        if (meta.slideIndex === undefined) {
          state.carousel[meta.field] = value;
        } else {
          const slide = state.carousel.slides[meta.slideIndex];
          if (slide) {
            slide[meta.field] = value;
            state.carousel.openSlideIndex = meta.slideIndex;
            setCarouselPreviewSlide(meta.slideIndex);
          }
        }
      }

      renderEditor(true);
    }

    function setupPreviewEditing() {
      const doc = previewFrame.contentDocument;
      if (!doc) {
        return;
      }

      const previewScrollbarOutline = document.documentElement.dataset.theme === "dark"
        ? "rgba(255, 255, 255, 0.72)"
        : "rgba(15, 23, 42, 0.34)";
      const previewScrollbarThumbHover = document.documentElement.dataset.theme === "dark"
        ? "rgba(255, 255, 255, 0.34)"
        : "rgba(15, 23, 42, 0.24)";
      const previewScrollbarThumb = document.documentElement.dataset.theme === "dark"
        ? "rgba(255, 255, 255, 0.06)"
        : "rgba(15, 23, 42, 0.08)";
      const style = doc.createElement("style");
      style.textContent = `
        * {
          scrollbar-color: ${previewScrollbarThumb} transparent;
          scrollbar-width: thin;
        }
        *::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
          border: 1px solid ${previewScrollbarOutline};
          border-radius: 999px;
        }
        *::-webkit-scrollbar-thumb {
          background: transparent;
          border: 2px solid ${previewScrollbarOutline};
          border-radius: 999px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: ${previewScrollbarThumbHover};
          border-color: rgba(255, 255, 255, 0.95);
        }
        *::-webkit-scrollbar-corner {
          background: transparent;
        }
        [data-ll-preview-text],
        [data-ll-preview-media],
        [data-ll-preview-color],
        [data-ll-preview-position] {
          outline-offset: 3px;
          transition: outline-color 0.12s ease, box-shadow 0.12s ease;
        }
        [data-ll-preview-text] {
          cursor: pointer;
        }
        [data-ll-preview-inline] {
          cursor: text;
        }
        [data-ll-preview-text][contenteditable="plaintext-only"] {
          cursor: text;
          outline: 2px dashed rgba(124, 58, 237, 0.95);
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.16);
        }
        [data-ll-preview-text]:hover,
        [data-ll-preview-text]:focus {
          outline: 2px dashed rgba(124, 58, 237, 0.8);
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
        }
        [data-ll-preview-media] {
          cursor: pointer;
        }
        [data-ll-preview-media]:hover {
          outline: 2px dashed rgba(14, 165, 233, 0.9);
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.12);
        }
        [data-ll-preview-color]:hover {
          outline: 2px dashed rgba(234, 91, 12, 0.9);
        }
        [data-ll-preview-position] {
          cursor: move;
        }
        [data-ll-preview-position]:hover {
          outline: 2px dashed rgba(234, 91, 12, 0.9);
          box-shadow: 0 0 0 4px rgba(234, 91, 12, 0.12);
        }
        .lp-stories [data-ll-preview-text],
        .lp-stories [data-ll-preview-media] {
          position: relative;
          z-index: 24;
          pointer-events: auto;
        }
        [class*="story" i] [data-ll-preview-text],
        [class*="stories" i] [data-ll-preview-text],
        [class*="story" i] [data-ll-preview-media],
        [class*="stories" i] [data-ll-preview-media] {
          position: relative;
          z-index: 24;
          pointer-events: auto;
        }
        [class*="story" i] label[for],
        [class*="stories" i] label[for] {
          pointer-events: auto;
        }
        .lp-stories__topbar,
        .lp-stories__caption {
          z-index: 48 !important;
        }
        .lp-stories__nav {
          z-index: 38 !important;
          pointer-events: none !important;
        }
        .lp-stories__arrow {
          pointer-events: auto !important;
        }
        .lp-stories__media,
        .lp-stories__picture,
        .lp-stories__image,
        .lp-stories__video {
          z-index: 12 !important;
        }
        .lp-stories[data-ll-preview-manual-story] .lp-stories__panel {
          display: none !important;
        }
        .lp-stories[data-ll-preview-manual-story] .lp-stories__panel[data-ll-preview-story-active] {
          display: block !important;
        }
        [data-ll-preview-manual-story] [class*="story" i][class*="panel" i],
        [data-ll-preview-manual-story] [class*="stories" i][class*="panel" i] {
          display: none !important;
        }
        [data-ll-preview-manual-story] [class*="story" i][class*="panel" i][data-ll-preview-story-active],
        [data-ll-preview-manual-story] [class*="stories" i][class*="panel" i][data-ll-preview-story-active] {
          display: block !important;
        }
        .lp-stories [data-ll-preview-story-current] .lp-stories__ring,
        [class*="story" i] [data-ll-preview-story-current] [class*="ring" i],
        [class*="stories" i] [data-ll-preview-story-current] [class*="ring" i] {
          outline: 3px solid rgba(255, 153, 0, 0.35);
          outline-offset: 4px;
        }
        .ll-carousel__side-hint {
          pointer-events: none !important;
        }
        [data-ll-template-iframe-parent] {
          position: relative !important;
        }
        .ll-template-iframe-edit {
          position: absolute;
          z-index: 2147483647;
          border: 0;
          padding: 0;
          background: rgba(14, 165, 233, 0.02);
          cursor: pointer;
        }
        .ll-template-iframe-edit:hover,
        .ll-template-iframe-edit:focus {
          outline: 2px dashed rgba(14, 165, 233, 0.9);
          outline-offset: 3px;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.12);
        }
      `;
      doc.head.appendChild(style);
      doc.addEventListener("mousedown", (event) => {
        if (!event.target.closest("[data-ll-preview-text], [data-ll-preview-media], [data-ll-preview-color], [data-ll-preview-position]")) {
          closePreviewEditPopover();
        }
      }, true);

      const openMediaEditor = (event, element, meta, label) => {
        if (!meta.scope || !meta.field) {
          return;
        }

        if (meta.scope === "template") {
          const root = element?.ownerDocument?.querySelector(".lp-container, .lp_container");
          const header = root ? (findTemplateHeaderRoot(event.target, root) || findTemplateHeaderRoot(element, root)) : null;
          if (header && isTemplateHeaderBannerTarget(event.target || element, header)) {
            event.preventDefault();
            event.stopPropagation();
            openTemplateHeaderPopover(event, header);
            return;
          }
        }

        event.preventDefault();
        event.stopPropagation();
        const acceptsSvg = /svg/i.test(label);
        const isVideoEditor = /vídeo|video|youtube/i.test(label);
        const isPosterEditor = /poster/i.test(label);
        openPreviewEditPopover(event, { ...meta, type: "media" }, {
          inputType: "text",
          label,
          multiline: acceptsSvg,
          rows: 5,
          accept: isPosterEditor ? "image/*" : isVideoEditor ? "video/*,image/*" : "image/*,video/*",
          placeholder: acceptsSvg ? "Cole uma URL .svg/.webp, caminho local ou o código <svg>...</svg>" : "Cole URL hospedada ou caminho local, ex.: C:\\Users\\nome\\Downloads\\imagem.webp"
        });
      };

      const attachText = (element, meta, options = {}) => {
        if (!element) {
          return;
        }

        const multiline = Boolean(options.multiline);
        element.dataset.llPreviewText = "true";
        element.setAttribute("title", "Clique para editar texto e estilo. Dê dois cliques para editar só o texto.");

        let singleClickTimer = 0;
        let originalInlineText = "";
        const focusEditableText = () => {
          const selection = doc.defaultView.getSelection();
          const range = doc.createRange();
          range.selectNodeContents(element);
          selection.removeAllRanges();
          selection.addRange(range);
        };

        const finishInlineTextEdit = () => {
          if (!element.isContentEditable) {
            return;
          }

          const normalizedValue = updateInlinePreviewTextValue(meta, element, element.innerText, { multiline });
          element.textContent = normalizedValue;
          element.removeAttribute("contenteditable");
          element.removeAttribute("spellcheck");
          delete element.dataset.llPreviewInline;
        };

        const startInlineTextEdit = (event) => {
          event.preventDefault();
          event.stopPropagation();
          window.clearTimeout(singleClickTimer);
          closePreviewEditPopover();
          originalInlineText = element.innerText || element.textContent || "";
          element.dataset.llPreviewInline = "true";
          element.setAttribute("contenteditable", "plaintext-only");
          element.setAttribute("spellcheck", "false");
          element.focus({ preventScroll: true });
          focusEditableText();
        };

        element.addEventListener("click", (event) => {
          if (element.isContentEditable) {
            event.stopPropagation();
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          window.clearTimeout(singleClickTimer);
          singleClickTimer = window.setTimeout(() => {
            openPreviewEditPopover(event, { ...meta, type: "textStyle" }, {
              kind: "text-style",
              label: "Editar texto",
              multiline,
              sourceElement: element
            });
          }, 210);
        });

        element.addEventListener("dblclick", startInlineTextEdit);

        element.addEventListener("keydown", (event) => {
          if (!element.isContentEditable) {
            return;
          }

          if (event.key === "Escape") {
            event.preventDefault();
            element.textContent = originalInlineText;
            element.blur();
            return;
          }

          if (event.key === "Enter" && !multiline) {
            event.preventDefault();
            element.blur();
          }
        });

        element.addEventListener("input", () => {
          if (!element.isContentEditable) {
            return;
          }

          updateInlinePreviewTextValue(meta, element, element.innerText, { multiline });
        });

        element.addEventListener("blur", finishInlineTextEdit);
        element.addEventListener("paste", (event) => {
          if (!element.isContentEditable) {
            return;
          }

          event.preventDefault();
          const text = event.clipboardData?.getData("text/plain") || "";
          doc.execCommand("insertText", false, text);
        });
      };

      const syncTablePreviewField = (meta, rawValue, options = {}) => {
        const value = normalizePreviewText(rawValue, Boolean(options.multiline));

        markResponsiveDirty();

        if (meta.field === "column") {
          state.table.columns[meta.columnIndex] = value;
          const input = editor.querySelector(`[data-table-field="column"][data-column-index="${meta.columnIndex}"]`);
          if (input) {
            input.value = value;
          }
        } else if (meta.field === "cell") {
          state.table.rows[meta.rowIndex][meta.cellIndex] = value;
          const input = editor.querySelector(`[data-table-field="cell"][data-row-index="${meta.rowIndex}"][data-cell-index="${meta.cellIndex}"]`);
          if (input) {
            input.value = value;
          }
        }

        generatedHtml.value = buildOutputHtml("html");
        copyStatus.textContent = "";
      };

      const attachInlineText = (element, meta, options = {}) => {
        if (!element) {
          return;
        }

        const multiline = Boolean(options.multiline);
        element.dataset.llPreviewText = "true";
        element.dataset.llPreviewInline = "true";
        element.setAttribute("contenteditable", "plaintext-only");
        element.setAttribute("spellcheck", "false");
        element.setAttribute("title", "Clique e digite para editar em tempo real.");

        element.addEventListener("keydown", (event) => {
          if (event.key === "Enter" && !multiline) {
            event.preventDefault();
            element.blur();
          }
        });

        element.addEventListener("input", () => {
          syncTablePreviewField(meta, element.innerText, { multiline });
        });

        element.addEventListener("blur", () => {
          const normalizedValue = readPreviewEditValue(meta);
          if (normalizePreviewText(element.innerText, multiline) !== normalizedValue) {
            syncTablePreviewField(meta, element.innerText, { multiline });
          }
          element.textContent = normalizedValue;
        });
      };

      const getControlledInput = (label) => {
        if (!label) {
          return null;
        }

        const targetId = label.getAttribute("for");
        return label.control || (targetId ? doc.getElementById(targetId) : null);
      };

      const getTemplateSignature = (element) => {
        if (!element || element.nodeType !== 1) {
          return "";
        }

        return [
          element.tagName || "",
          element.id || "",
          typeof element.className === "string" ? element.className : "",
          element.getAttribute?.("aria-label") || "",
          element.getAttribute?.("aria-controls") || "",
          element.getAttribute?.("role") || ""
        ].join(" ").toLowerCase();
      };

      const isTemplateStoryLike = (element) => {
        let node = element;
        while (node && node.nodeType === 1) {
          if (/stor(y|ies|ie)/i.test(getTemplateSignature(node))) {
            return true;
          }
          node = node.parentElement;
        }

        return false;
      };

      const isRadioToggleLabel = (element) => {
        const label = element?.closest?.("label[for]");
        const control = getControlledInput(label);
        return Boolean(control?.matches?.('input[type="radio"], input[type="checkbox"]'));
      };

      const findTemplateLabelAtPoint = (event, root) => {
        const directLabel = event.target?.closest?.("label[for]");
        if (directLabel && root.contains(directLabel)) {
          return directLabel;
        }

        if (typeof doc.elementsFromPoint !== "function") {
          return null;
        }

        const stack = doc.elementsFromPoint(event.clientX, event.clientY);
        for (const element of stack) {
          const label = element?.closest?.("label[for]");
          if (label && root.contains(label)) {
            return label;
          }
        }

        return null;
      };

      const isStoryLabelText = (element) => {
        return Boolean(element?.closest?.("label[for]") && isTemplateStoryLike(element));
      };

      const isTemplateInteractiveControl = (element) => {
        return Boolean(element?.closest?.('a[href], button, label[for], input, textarea, select, summary, [role="button"], [role="tab"], [role="link"], .lp-stories__options, .lp-stories__nav, .ll-carousel__nav'));
      };

      const isEditableStoryText = (element) => {
        return Boolean(isTemplateStoryLike(element) && element.matches?.(".lp-stories__name, .lp-stories__title, .lp-stories__caption, [class*='story' i] [class*='name' i], [class*='story' i] [class*='title' i], [class*='story' i] [class*='caption' i], [class*='stories' i] [class*='name' i], [class*='stories' i] [class*='title' i], [class*='stories' i] [class*='caption' i]"));
      };

      const attachMedia = (element, meta, label = "URL da mídia") => {
        if (!element) {
          return;
        }

        element.dataset.llPreviewMedia = "true";
        const shouldPreserveClick = meta.scope === "template" && isTemplateInteractiveControl(element);
        const triggerEvent = shouldPreserveClick ? "dblclick" : "click";
        element.setAttribute("title", triggerEvent === "dblclick" ? `Dê dois cliques para trocar ${label}.` : `Clique para trocar ${label}.`);
        element.addEventListener(triggerEvent, (event) => {
          if (element.dataset.llPreviewColor) {
            window.clearTimeout(element.__llPreviewMediaTimer);
            element.__llPreviewMediaTimer = window.setTimeout(() => {
              if (!element.__llPreviewSkipMedia) {
                openMediaEditor(event, element, meta, label);
              }
              element.__llPreviewSkipMedia = false;
            }, 220);
            return;
          }

          openMediaEditor(event, element, meta, label);
        });
      };

      const attachIframeMedia = (element, meta, label = "URL do vídeo do YouTube") => {
        if (!element || !element.parentElement) {
          return;
        }

        element.dataset.llPreviewMedia = "true";
        element.setAttribute("title", `Clique para trocar ${label}.`);

        const parent = element.parentElement;
        parent.dataset.llTemplateIframeParent = "true";

        const overlay = doc.createElement("button");
        overlay.type = "button";
        overlay.className = "ll-template-iframe-edit";
        overlay.dataset.llTemplateHelper = "true";
        overlay.dataset.llPreviewMedia = "true";
        overlay.setAttribute("aria-label", `Editar ${label}`);
        overlay.setAttribute("title", `Clique para trocar ${label}.`);
        overlay.style.left = `${element.offsetLeft}px`;
        overlay.style.top = `${element.offsetTop}px`;
        overlay.style.width = `${element.offsetWidth || element.getBoundingClientRect().width}px`;
        overlay.style.height = `${element.offsetHeight || element.getBoundingClientRect().height}px`;
        overlay.addEventListener("click", (event) => {
          openMediaEditor(event, element, meta, label);
        });
        element.insertAdjacentElement("afterend", overlay);
      };

      const attachTemplateSvg = (element) => {
        if (!element) {
          return;
        }

        element.dataset.llPreviewMedia = "true";
        element.setAttribute("title", "Duplo clique para editar SVG.");
        element.addEventListener("dblclick", (event) => {
          event.preventDefault();
          event.stopPropagation();
          openTemplateSvgPopover(event, element);
        });
      };

      const attachColor = (element, meta, label = "cor", options = {}) => {
        if (!element) {
          return;
        }

        const triggerEvent = options.triggerEvent || (/fundo|prote[cç][aã]o|borda|se[cç][aã]o|m[ií]dia/i.test(label) ? "click" : "dblclick");
        element.dataset.llPreviewColor = "true";
        element.setAttribute("title", triggerEvent === "click" ? `Clique para editar ${label}.` : `Duplo clique para editar ${label}.`);
        element.addEventListener(triggerEvent, (event) => {
          const allowColorOnMedia = Boolean(options.allowOnMedia);
          if (element.dataset.llPreviewMedia && !allowColorOnMedia) {
            return;
          }

          const pointStack = typeof doc.elementsFromPoint === "function"
            ? doc.elementsFromPoint(event.clientX, event.clientY)
            : [];
          const hasMediaUnderPointer = Array.from(pointStack).some((node) => {
            if (!node || node === element || !element.contains(node)) {
              return false;
            }

            const nodeTag = node.tagName;
            const computed = node.ownerDocument?.defaultView?.getComputedStyle(node);
            const hasBackgroundAsset = computed && /url\(/i.test(computed.backgroundImage || "");
            return node.dataset?.llPreviewMedia
              || ["IMG", "PICTURE", "VIDEO", "SOURCE", "IFRAME", "SVG"].includes(nodeTag)
              || hasBackgroundAsset;
          });
          if (hasMediaUnderPointer) {
            return;
          }

          const nestedEditable = event.target.closest("[data-ll-preview-text], [data-ll-preview-media]");
          if (nestedEditable && nestedEditable !== element) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          element.__llPreviewSkipMedia = true;
          window.clearTimeout(element.__llPreviewMediaTimer);

          openPreviewEditPopover(event, { ...meta, type: "color" }, {
            ...options,
            kind: "color",
            label
          });
        });
      };

      const normalizeTemplateOverlayHorizontal = (value) => {
        return ["left", "center", "right"].includes(value) ? value : "center";
      };

      const normalizeTemplateOverlayVertical = (value) => {
        return ["top", "center", "bottom"].includes(value) ? value : "center";
      };

      const getAlphaFromCssColor = (value, fallback = 0.64) => {
        const rawValue = String(value || "").trim();
        const slashMatch = rawValue.match(/\/\s*([\d.]+%?)\s*\)/);
        if (slashMatch) {
          const rawAlpha = slashMatch[1];
          const numericAlpha = rawAlpha.endsWith("%")
            ? Number(rawAlpha.replace("%", "")) / 100
            : Number(rawAlpha);
          return Number.isFinite(numericAlpha) ? Math.min(0.95, Math.max(0, numericAlpha)) : fallback;
        }

        const rgbaMatch = rawValue.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\s*\)/i);
        if (rgbaMatch) {
          const numericAlpha = Number(rgbaMatch[1]);
          return Number.isFinite(numericAlpha) ? Math.min(0.95, Math.max(0, numericAlpha)) : fallback;
        }

        return fallback;
      };

      const readTemplateOverlayHorizontal = (element) => {
        const stored = element.dataset.llPreviewOverlayHorizontal;
        if (stored) {
          return normalizeTemplateOverlayHorizontal(stored);
        }

        const style = element.style;
        const transform = style.transform || "";
        if (style.right && style.right !== "auto") {
          return "right";
        }

        if ((style.left || "").trim() === "50%" || transform.includes("-50%")) {
          return "center";
        }

        return "left";
      };

      const readTemplateOverlayVertical = (element) => {
        const stored = element.dataset.llPreviewOverlayVertical;
        if (stored) {
          return normalizeTemplateOverlayVertical(stored);
        }

        const style = element.style;
        const transform = style.transform || "";
        if (style.bottom && style.bottom !== "auto") {
          return "bottom";
        }

        if ((style.top || "").trim() === "50%" || transform.includes(",-50%") || transform.includes(", -50%")) {
          return "center";
        }

        return "top";
      };

      const applyTemplateOverlayPosition = (element, horizontal, vertical) => {
        const computed = element.ownerDocument.defaultView.getComputedStyle(element);
        if (computed.position === "static") {
          element.style.position = "absolute";
        }

        const normalizedHorizontal = normalizeTemplateOverlayHorizontal(horizontal);
        const normalizedVertical = normalizeTemplateOverlayVertical(vertical);
        let translateX = "0";
        let translateY = "0";

        element.style.left = "";
        element.style.right = "";
        element.style.top = "";
        element.style.bottom = "";

        if (normalizedHorizontal === "left") {
          element.style.left = "6%";
        } else if (normalizedHorizontal === "right") {
          element.style.right = "6%";
        } else {
          element.style.left = "50%";
          translateX = "-50%";
        }

        if (normalizedVertical === "top") {
          element.style.top = "8%";
        } else if (normalizedVertical === "bottom") {
          element.style.bottom = "8%";
        } else {
          element.style.top = "50%";
          translateY = "-50%";
        }

        element.style.transform = translateX === "0" && translateY === "0"
          ? ""
          : `translate(${translateX}, ${translateY})`;
        element.dataset.llPreviewOverlayHorizontal = normalizedHorizontal;
        element.dataset.llPreviewOverlayVertical = normalizedVertical;
      };

      const openTemplateOverlayPopover = (sourceEvent, overlayElement) => {
        closePreviewEditPopover();

        const computed = overlayElement.ownerDocument.defaultView.getComputedStyle(overlayElement);
        const initialColor = colorToHex(computed.backgroundColor || "#000000", "#000000");
        const initialOpacity = getAlphaFromCssColor(computed.backgroundColor, 0.64).toFixed(2);

        const form = document.createElement("form");
        form.className = "preview-edit-popover preview-edit-popover--position";
        form.setAttribute("role", "dialog");
        form.setAttribute("aria-label", "Editar overlay");

        const title = document.createElement("p");
        title.className = "preview-edit-popover__title";
        title.textContent = "Overlay de texto";
        form.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "preview-edit-popover__grid";

        const createSelect = (labelText, options, value) => {
          const label = document.createElement("label");
          label.className = "preview-edit-popover__mini-field";
          const text = document.createElement("span");
          text.textContent = labelText;
          const select = document.createElement("select");
          options.forEach((option) => {
            const item = document.createElement("option");
            item.value = option.value;
            item.textContent = option.label;
            item.selected = option.value === value;
            select.appendChild(item);
          });
          label.append(text, select);
          grid.appendChild(label);
          return select;
        };

        const horizontalSelect = createSelect("Horizontal", [
          { value: "left", label: "Esquerda" },
          { value: "center", label: "Centro" },
          { value: "right", label: "Direita" }
        ], readTemplateOverlayHorizontal(overlayElement));
        const verticalSelect = createSelect("Vertical", [
          { value: "top", label: "Topo" },
          { value: "center", label: "Centro" },
          { value: "bottom", label: "Rodapé" }
        ], readTemplateOverlayVertical(overlayElement));
        form.appendChild(grid);

        const colorLabel = document.createElement("label");
        colorLabel.className = "preview-edit-popover__mini-field";
        const colorText = document.createElement("span");
        colorText.textContent = "Cor do fundo";
        const colorRow = document.createElement("div");
        colorRow.className = "preview-edit-popover__color-row";
        const colorInput = document.createElement("input");
        colorInput.className = "preview-edit-popover__color";
        colorInput.type = "color";
        colorInput.value = initialColor;
        const colorHexInput = document.createElement("input");
        colorHexInput.className = "preview-edit-popover__field";
        colorHexInput.type = "text";
        colorHexInput.value = initialColor;
        colorHexInput.placeholder = "#000000";
        colorRow.append(colorInput, colorHexInput);
        colorLabel.append(colorText, colorRow);
        form.appendChild(colorLabel);

        const opacityGrid = document.createElement("div");
        opacityGrid.className = "preview-edit-popover__grid";
        const opacityLabel = document.createElement("label");
        opacityLabel.className = "preview-edit-popover__mini-field";
        const opacityText = document.createElement("span");
        opacityText.textContent = "Opacidade";
        const opacityInput = document.createElement("input");
        opacityInput.type = "number";
        opacityInput.min = "0";
        opacityInput.max = "0.95";
        opacityInput.step = "0.05";
        opacityInput.value = initialOpacity;
        opacityLabel.append(opacityText, opacityInput);
        opacityGrid.appendChild(opacityLabel);
        form.appendChild(opacityGrid);

        const actions = document.createElement("div");
        actions.className = "preview-edit-popover__actions";
        const closeButton = document.createElement("button");
        closeButton.className = "button";
        closeButton.type = "button";
        closeButton.textContent = "Fechar";
        actions.appendChild(closeButton);
        form.appendChild(actions);

        const applyOverlay = () => {
          const nextColor = isHexColor(colorHexInput.value) ? normalizeHexColor(colorHexInput.value) : colorInput.value;
          const nextOpacity = normalizeCarouselCaptionOpacity(opacityInput.value);
          colorInput.value = nextColor;
          colorHexInput.value = nextColor;
          overlayElement.style.backgroundColor = hexToRgba(nextColor, nextOpacity);
          applyTemplateOverlayPosition(overlayElement, horizontalSelect.value, verticalSelect.value);
          syncTemplateHtmlFromPreview();
        };

        horizontalSelect.addEventListener("input", applyOverlay);
        horizontalSelect.addEventListener("change", applyOverlay);
        verticalSelect.addEventListener("input", applyOverlay);
        verticalSelect.addEventListener("change", applyOverlay);
        colorInput.addEventListener("input", () => {
          colorHexInput.value = normalizeHexColor(colorInput.value);
          applyOverlay();
        });
        colorHexInput.addEventListener("input", () => {
          if (isHexColor(colorHexInput.value)) {
            applyOverlay();
          }
        });
        colorHexInput.addEventListener("change", () => {
          colorHexInput.value = isHexColor(colorHexInput.value)
            ? normalizeHexColor(colorHexInput.value)
            : colorInput.value;
          applyOverlay();
        });
        opacityInput.addEventListener("input", applyOverlay);
        opacityInput.addEventListener("change", () => {
          opacityInput.value = normalizeCarouselCaptionOpacity(opacityInput.value).toFixed(2);
          applyOverlay();
        });
        closeButton.addEventListener("click", closePreviewEditPopover);
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          closePreviewEditPopover();
        });

        previewEditKeyHandler = (event) => {
          if (event.key === "Escape") {
            closePreviewEditPopover();
          }
        };
        previewEditOutsideHandler = (event) => {
          if (previewEditPopover && !previewEditPopover.contains(event.target)) {
            closePreviewEditPopover();
          }
        };

        document.body.appendChild(form);
        previewEditPopover = form;
        positionPreviewEditPopover(sourceEvent);
        window.setTimeout(() => {
          document.addEventListener("mousedown", previewEditOutsideHandler, true);
          document.addEventListener("keydown", previewEditKeyHandler, true);
        }, 0);
      };

      const isTemplateOverlayCandidate = (element, root) => {
        if (!element || element === root || element.nodeType !== 1) {
          return false;
        }

        if (element.closest?.(".lp-stories, [class*='story' i], [class*='stories' i]")) {
          return false;
        }

        const signature = `${element.id || ""} ${typeof element.className === "string" ? element.className : ""}`;
        const looksLikeOverlay = /group[-_\s]?text|grouptext|ll-carousel__caption|text[-_\s]?overlay|overlay[-_\s]?text|caption[-_\s]?overlay|legenda/i.test(signature);
        if (!looksLikeOverlay) {
          return false;
        }

        return Boolean((element.innerText || element.textContent || "").trim());
      };

      const attachTemplateOverlay = (element) => {
        if (!element || element.dataset.llPreviewPosition === "true") {
          return;
        }

        element.dataset.llPreviewPosition = "true";
        element.setAttribute("title", "Clique no fundo do overlay para ajustar posição, cor e opacidade.");
        element.addEventListener("click", (event) => {
          if (event.target.closest("[data-ll-preview-text], [data-ll-preview-media]")) {
            return;
          }

          event.preventDefault();
          event.stopImmediatePropagation();
          openTemplateOverlayPopover(event, element);
        });
      };

      const openCarouselCaptionPositionPopover = (sourceEvent, captionElement, slideIndex) => {
        const slide = state.carousel.slides[slideIndex];
        if (!slide) {
          return;
        }

        closePreviewEditPopover();

        const getCaptionSolidColor = () => {
          const gradient = parseCssGradient(slide.backgroundColor);
          return gradient ? gradient.start : normalizeHexColor(slide.backgroundColor || "#000000");
        };

        const form = document.createElement("form");
        form.className = "preview-edit-popover preview-edit-popover--position";
        form.setAttribute("role", "dialog");
        form.setAttribute("aria-label", "Editar legenda");

        const title = document.createElement("p");
        title.className = "preview-edit-popover__title";
        title.textContent = "Legenda";
        form.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "preview-edit-popover__grid";

        const createSelect = (labelText, options, value) => {
          const label = document.createElement("label");
          label.className = "preview-edit-popover__mini-field";
          const text = document.createElement("span");
          text.textContent = labelText;
          const select = document.createElement("select");
          options.forEach((option) => {
            const item = document.createElement("option");
            item.value = option.value;
            item.textContent = option.label;
            item.selected = option.value === value;
            select.appendChild(item);
          });
          label.append(text, select);
          grid.appendChild(label);
          return select;
        };

        const horizontalSelect = createSelect("Horizontal", [
          { value: "left", label: "Esquerda" },
          { value: "center", label: "Centro" },
          { value: "right", label: "Direita" }
        ], normalizeCarouselCaptionHorizontal(slide.captionHorizontal));
        const verticalSelect = createSelect("Vertical", [
          { value: "top", label: "Topo" },
          { value: "center", label: "Centro" },
          { value: "bottom", label: "Rodapé" }
        ], normalizeCarouselCaptionVertical(slide.captionVertical));
        form.appendChild(grid);

        const colorLabel = document.createElement("label");
        colorLabel.className = "preview-edit-popover__mini-field";
        const colorText = document.createElement("span");
        colorText.textContent = "Cor do fundo";
        const colorRow = document.createElement("div");
        colorRow.className = "preview-edit-popover__color-row";

        const colorInput = document.createElement("input");
        colorInput.className = "preview-edit-popover__color";
        colorInput.type = "color";
        colorInput.value = getCaptionSolidColor();

        const colorHexInput = document.createElement("input");
        colorHexInput.className = "preview-edit-popover__field";
        colorHexInput.type = "text";
        colorHexInput.value = colorInput.value;
        colorHexInput.placeholder = "#000000";
        colorRow.append(colorInput, colorHexInput);
        colorLabel.append(colorText, colorRow);
        form.appendChild(colorLabel);

        const opacityGrid = document.createElement("div");
        opacityGrid.className = "preview-edit-popover__grid";
        const opacityLabel = document.createElement("label");
        opacityLabel.className = "preview-edit-popover__mini-field";
        const opacityText = document.createElement("span");
        opacityText.textContent = "Opacidade";
        const opacityInput = document.createElement("input");
        opacityInput.type = "number";
        opacityInput.min = "0";
        opacityInput.max = "0.95";
        opacityInput.step = "0.05";
        opacityInput.value = normalizeCarouselCaptionOpacity(slide.captionOpacity).toFixed(2);
        opacityLabel.append(opacityText, opacityInput);
        opacityGrid.appendChild(opacityLabel);
        form.appendChild(opacityGrid);

        const actions = document.createElement("div");
        actions.className = "preview-edit-popover__actions";
        const closeButton = document.createElement("button");
        closeButton.className = "button";
        closeButton.type = "button";
        closeButton.textContent = "Fechar";
        actions.appendChild(closeButton);
        form.appendChild(actions);

        const applyPosition = () => {
          slide.captionHorizontal = normalizeCarouselCaptionHorizontal(horizontalSelect.value);
          slide.captionVertical = normalizeCarouselCaptionVertical(verticalSelect.value);
          if (isHexColor(colorHexInput.value)) {
            const nextColor = normalizeHexColor(colorHexInput.value);
            slide.backgroundColor = nextColor;
            colorInput.value = nextColor;
          }
          slide.captionOpacity = normalizeCarouselCaptionOpacity(opacityInput.value);
          state.carousel.openSlideIndex = slideIndex;
          setCarouselPreviewSlide(slideIndex);
          if (currentPage === "conteudo") {
            markResponsiveDirty();
          }
          captionElement.setAttribute("style", getCarouselCaptionStyle(slide));
          generatedHtml.value = buildOutputHtml("html");
          copyStatus.textContent = "";
          copyStatus.classList.remove("is-warning", "is-visible");
        };

        horizontalSelect.addEventListener("input", applyPosition);
        horizontalSelect.addEventListener("change", applyPosition);
        verticalSelect.addEventListener("input", applyPosition);
        verticalSelect.addEventListener("change", applyPosition);
        colorInput.addEventListener("input", () => {
          colorHexInput.value = normalizeHexColor(colorInput.value);
          applyPosition();
        });
        colorHexInput.addEventListener("input", () => {
          if (isHexColor(colorHexInput.value)) {
            colorHexInput.value = normalizeHexColor(colorHexInput.value);
            applyPosition();
          }
        });
        colorHexInput.addEventListener("change", () => {
          colorHexInput.value = isHexColor(colorHexInput.value)
            ? normalizeHexColor(colorHexInput.value)
            : getCaptionSolidColor();
          applyPosition();
        });
        opacityInput.addEventListener("input", applyPosition);
        opacityInput.addEventListener("change", () => {
          opacityInput.value = normalizeCarouselCaptionOpacity(opacityInput.value).toFixed(2);
          applyPosition();
        });
        closeButton.addEventListener("click", closePreviewEditPopover);
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          closePreviewEditPopover();
        });

        previewEditKeyHandler = (event) => {
          if (event.key === "Escape") {
            closePreviewEditPopover();
          }
        };
        previewEditOutsideHandler = (event) => {
          if (previewEditPopover && !previewEditPopover.contains(event.target)) {
            closePreviewEditPopover();
          }
        };

        document.body.appendChild(form);
        previewEditPopover = form;
        positionPreviewEditPopover(sourceEvent);
        window.setTimeout(() => {
          document.addEventListener("mousedown", previewEditOutsideHandler, true);
          document.addEventListener("keydown", previewEditKeyHandler, true);
        }, 0);
        horizontalSelect.focus();
      };

      const attachCarouselCaptionPosition = (element, slideIndex) => {
        if (!element) {
          return;
        }

        element.dataset.llPreviewPosition = "true";
        element.setAttribute("title", "Clique na área da legenda para ajustar posição, cor e opacidade.");
        element.addEventListener("click", (event) => {
          if (event.target.closest("[data-ll-preview-text]")) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          openCarouselCaptionPositionPopover(event, element, slideIndex);
        });
      };

      const markTemplateNode = (element) => {
        if (!element.dataset.llTemplateNode) {
          element.dataset.llTemplateNode = `template-${Math.random().toString(16).slice(2)}`;
        }
        return element.dataset.llTemplateNode;
      };

      const hasDirectText = (element) => {
        return Array.from(element.childNodes).some((node) => {
          return node.nodeType === 3 && node.textContent.trim();
        });
      };

      const isTemplateTextCandidate = (element) => {
        const tagName = element.tagName;
        if (["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "IMG", "VIDEO", "SOURCE", "PICTURE", "IFRAME", "INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(tagName)) {
          return false;
        }

        if (isTemplateInteractiveControl(element) && !isEditableStoryText(element) && !isRadioToggleLabel(element) && !isStoryLabelText(element)) {
          return false;
        }

        const text = (element.innerText || element.textContent || "").trim();
        if (!text) {
          return false;
        }

        const textChildren = Array.from(element.children).filter((child) => {
          return !["BR", "WBR"].includes(child.tagName) && (child.innerText || child.textContent || "").trim();
        });

        return hasDirectText(element) || textChildren.length === 0;
      };

      const isTemplateMultilineText = (element) => {
        return ["P", "DIV", "LI", "TD", "TH", "FIGCAPTION", "BLOCKQUOTE"].includes(element.tagName)
          || (element.innerText || "").includes("\n");
      };

      const hasTemplateBackgroundImage = (element) => {
        const computed = element.ownerDocument.defaultView.getComputedStyle(element);
        return /url\(/i.test(computed.backgroundImage || "");
      };

      const hasTemplatePaintedBackground = (element) => {
        const computed = element.ownerDocument.defaultView.getComputedStyle(element);
        const backgroundImage = computed.backgroundImage || "";
        return !isTransparentColor(computed.backgroundColor)
          || (backgroundImage && backgroundImage !== "none" && !/url\(/i.test(backgroundImage));
      };

      const hasTemplateMediaContent = (element) => {
        if (!element) {
          return false;
        }

        if (element.dataset.llPreviewMedia || ["IMG", "PICTURE", "VIDEO", "SOURCE", "IFRAME", "SVG"].includes(element.tagName)) {
          return true;
        }

        if (hasTemplateBackgroundImage(element)) {
          return true;
        }

        return Boolean(element.querySelector?.("img, picture, video, source, iframe, svg"));
      };

      const isTemplateColorCandidate = (element, root) => {
        if (element === root) {
          return true;
        }

        if (!element || ["IMG", "PICTURE", "VIDEO", "SOURCE", "IFRAME", "SVG", "CANVAS"].includes(element.tagName)) {
          return false;
        }

        if (hasTemplateBackgroundImage(element)) {
          return false;
        }

        if (!hasTemplatePaintedBackground(element)) {
          return false;
        }

        return ["SECTION", "ARTICLE", "DIV", "HEADER", "FOOTER", "ASIDE", "NAV", "BUTTON", "A", "TH", "TD", "FIGCAPTION", "LI"].includes(element.tagName);
      };

      const isTemplateMediaNode = (element) => {
        if (!element || element.nodeType !== 1) {
          return false;
        }

        if (["IMG", "PICTURE", "VIDEO", "SOURCE", "IFRAME", "SVG"].includes(element.tagName)) {
          return true;
        }

        return hasTemplateBackgroundImage(element);
      };

      const resolveTemplateMediaNode = (element) => {
        if (!element || element.nodeType !== 1) {
          return null;
        }

        if (element.tagName === "PICTURE") {
          return element.querySelector("img") || element;
        }

        if (isTemplateMediaNode(element)) {
          return element;
        }

        const childMedia = element.querySelector?.("img, picture, video, source, iframe, svg");
        if (!childMedia) {
          return null;
        }

        return childMedia.tagName === "PICTURE" ? (childMedia.querySelector("img") || childMedia) : childMedia;
      };

      const findTemplateMediaAtPoint = (event, root) => {
        const targetText = event.target?.closest?.("[data-ll-preview-text]");
        if (targetText && !targetText.dataset.llPreviewMedia) {
          return null;
        }

        const directMedia = event.target?.closest?.("img, picture, video, source, iframe, svg");
        const candidates = [];
        if (directMedia) {
          candidates.push(directMedia);
        }

        if (typeof doc.elementsFromPoint === "function") {
          candidates.push(...doc.elementsFromPoint(event.clientX, event.clientY));
        }

        for (const candidate of candidates) {
          if (!candidate || !root.contains(candidate)) {
            continue;
          }

          const media = resolveTemplateMediaNode(candidate);
          if (media && root.contains(media)) {
            return media;
          }
        }

        return null;
      };

      const findTemplateStoryRoot = (element, root) => {
        let node = element;
        while (node && node !== root.parentElement) {
          if (node.nodeType === 1 && root.contains(node) && isTemplateStoryLike(node)) {
            const hasStoryControls = Boolean(node.querySelector?.('input[type="radio"], input[type="checkbox"], label[for]'));
            const hasStoryPanels = Boolean(node.querySelector?.(".lp-stories__panel, [class*='panel' i]"));
            if (hasStoryControls && hasStoryPanels) {
              return node;
            }
          }
          node = node.parentElement;
        }

        return element?.closest?.(".lp-stories") || null;
      };

      const findTemplateStoryPanel = (storyRoot, target, label) => {
        if (!storyRoot || !target) {
          return null;
        }

        const escapeSelector = doc.defaultView.CSS?.escape || ((value) => String(value).replace(/["\\#.;,[\]()>+~*^$|=:\s]/g, "\\$&"));
        const targetId = target.id || "";
        const ariaControls = label?.getAttribute?.("aria-controls") || target.getAttribute?.("aria-controls") || "";
        if (ariaControls) {
          const controlledPanel = doc.getElementById(ariaControls);
          if (controlledPanel && storyRoot.contains(controlledPanel)) {
            return controlledPanel;
          }
        }

        if (targetId) {
          const panelClass = targetId.replace(/^lp-story-/, "panel-");
          const candidates = [
            `.${escapeSelector(panelClass)}`,
            `#${escapeSelector(targetId)}-panel`,
            `[aria-labelledby="${escapeSelector(targetId)}-title"]`,
            `[data-story-panel="${escapeSelector(targetId)}"]`
          ];

          for (const selector of candidates) {
            const panel = storyRoot.querySelector(selector);
            if (panel) {
              return panel;
            }
          }
        }

        const groupSelector = target.name
          ? `input[type="${target.type}"][name="${escapeSelector(target.name)}"]`
          : `input[type="${target.type}"]`;
        const inputs = Array.from(storyRoot.querySelectorAll(groupSelector));
        const panels = Array.from(storyRoot.querySelectorAll(".lp-stories__panel, [class*='story' i][class*='panel' i], [class*='stories' i][class*='panel' i]"));
        const index = inputs.indexOf(target);
        return index >= 0 ? panels[index] || null : null;
      };

      const applyTemplateStorySelection = (label, target, root) => {
        const storyRoot = findTemplateStoryRoot(label, root) || findTemplateStoryRoot(target, root);
        if (!storyRoot) {
          return;
        }

        const panel = findTemplateStoryPanel(storyRoot, target, label);
        if (!panel) {
          return;
        }

        storyRoot.dataset.llPreviewManualStory = "true";
        storyRoot.querySelectorAll(".lp-stories__panel, [class*='story' i][class*='panel' i], [class*='stories' i][class*='panel' i]").forEach((item) => {
          const isActive = item === panel;
          item.toggleAttribute("data-ll-preview-story-active", isActive);
          item.toggleAttribute("data-ll-preview-story-hidden", !isActive);
        });

        storyRoot.querySelectorAll("label[for]").forEach((item) => {
          const current = getControlledInput(item);
          item.toggleAttribute("data-ll-preview-story-current", current === target);
        });
      };

      const setupTemplatePreviewEditing = () => {
        const root = doc.querySelector(".lp-container, .lp_container");
        if (!root) {
          return;
        }

        root.addEventListener("click", (event) => {
          const label = findTemplateLabelAtPoint(event, root);
          if (!label || !root.contains(label)) {
            return;
          }

          const target = getControlledInput(label);
          if (!target || !target.matches?.('input[type="radio"], input[type="checkbox"]')) {
            return;
          }

          const syncStorySelection = () => {
            if (target.type === "radio") {
              target.checked = true;
            }
            target.dispatchEvent(new doc.defaultView.Event("input", { bubbles: true }));
            target.dispatchEvent(new doc.defaultView.Event("change", { bubbles: true }));
            applyTemplateStorySelection(label, target, root);
          };

          if (typeof doc.defaultView.requestAnimationFrame === "function") {
            doc.defaultView.requestAnimationFrame(syncStorySelection);
          } else {
            window.setTimeout(syncStorySelection, 0);
          }
        }, true);

        root.addEventListener("dblclick", (event) => {
          if (event.target.closest("[data-ll-preview-text]")) {
            return;
          }

          const editableElement = findTemplateMediaAtPoint(event, root);
          if (!editableElement) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();

          const id = markTemplateNode(editableElement);
          const mediaMeta = {
            scope: "template",
            field: "media",
            templateNodeId: id,
            value: getTemplateMediaValue(editableElement)
          };

          if (editableElement.tagName === "SVG") {
            openTemplateSvgPopover(event, editableElement);
          } else if (editableElement.tagName === "IMG") {
            openTemplateImagePopover(event, editableElement, mediaMeta, "URL da imagem ou mídia");
          } else {
            openMediaEditor(event, editableElement, mediaMeta, editableElement.tagName === "IFRAME" ? "URL do vídeo do YouTube" : "URL da imagem ou mídia");
          }
        }, true);

        root.addEventListener("click", (event) => {
          const anchor = event.target.closest("a[href]");
          if (!anchor || !root.contains(anchor)) {
            return;
          }

          const rawHref = (anchor.getAttribute("href") || "").trim();
          event.preventDefault();
          event.stopPropagation();

          if (!rawHref || rawHref === "#") {
            return;
          }

          if (rawHref.startsWith("#")) {
            let targetId = rawHref.slice(1);
            try {
              targetId = decodeURIComponent(targetId);
            } catch (_) {
              targetId = rawHref.slice(1);
            }

            const target = targetId ? doc.getElementById(targetId) : null;
            try {
              doc.defaultView.history.replaceState(null, "", rawHref);
            } catch (_) {}

            if (target) {
              if (target.matches?.('input[type="radio"], input[type="checkbox"]')) {
                target.checked = true;
                target.dispatchEvent(new doc.defaultView.Event("change", { bubbles: true }));
              } else {
                target.scrollIntoView({ block: "nearest", inline: "nearest" });
              }
            }
          }
        }, true);

        const headerRoots = new Set();
        root.querySelectorAll(".product-header, .video-header, .product-header__banner, .video-header__banner, .product-header__body, .video-header__body").forEach((element) => {
          const header = findTemplateHeaderRoot(element, root);
          if (header) {
            headerRoots.add(header);
          }
        });
        headerRoots.forEach((header) => {
          attachTemplateHeaderEditor(header);
        });

        root.addEventListener("click", (event) => {
          const header = findTemplateHeaderRoot(event.target, root);
          if (!header || !root.contains(header)) {
            return;
          }

          if (!isTemplateHeaderBannerTarget(event.target, header)) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          openTemplateHeaderPopover(event, header);
        }, true);

        [root, ...root.querySelectorAll("*")].forEach((element) => {
          if (isTemplateOverlayCandidate(element, root)) {
            attachTemplateOverlay(element);
          }
        });

        [root, ...root.querySelectorAll("*")].forEach((element) => {
          const header = findTemplateHeaderRoot(element, root);
          if (header && isTemplateHeaderBannerTarget(element, header)) {
            return;
          }

          const isOverlayElement = element.dataset.llPreviewPosition === "true";

          if (element.tagName === "SVG") {
            markTemplateNode(element);
            attachTemplateSvg(element);
            return;
          }

          if (!isOverlayElement && isTemplateTextCandidate(element)) {
            const id = markTemplateNode(element);
            const shouldUseDblClick = isRadioToggleLabel(element) || isStoryLabelText(element);
            attachText(element, {
              scope: "template",
              field: "text",
              templateNodeId: id,
              value: element.innerText || element.textContent || ""
            }, { multiline: isTemplateMultilineText(element), triggerEvent: shouldUseDblClick ? "dblclick" : "click" });
          }

          if (["IMG", "VIDEO", "SOURCE", "IFRAME"].includes(element.tagName) || hasTemplateBackgroundImage(element)) {
            const id = markTemplateNode(element);
            const mediaLabel = element.tagName === "IFRAME" ? "URL do vídeo do YouTube" : "URL da imagem ou mídia";
            const mediaMeta = {
              scope: "template",
              field: "media",
              templateNodeId: id,
              value: getTemplateMediaValue(element)
            };

            if (element.tagName === "IMG") {
              element.setAttribute("title", "Dê dois cliques para trocar URL e alt text.");
              element.addEventListener("dblclick", (event) => {
                event.preventDefault();
                event.stopPropagation();
                openTemplateImagePopover(event, element, mediaMeta, mediaLabel);
              });
            } else if (element.tagName === "IFRAME") {
              attachIframeMedia(element, mediaMeta, mediaLabel);
            } else {
              attachMedia(element, mediaMeta, mediaLabel);
            }
          }

          if (!isOverlayElement && isTemplateColorCandidate(element, root)) {
            const id = markTemplateNode(element);
            const computed = element.ownerDocument.defaultView.getComputedStyle(element);
            const backgroundColor = isTransparentColor(computed.backgroundColor) ? "#ffffff" : colorToHex(computed.backgroundColor || "#ffffff", "#ffffff");
            attachColor(element, {
              scope: "template",
              field: "backgroundColor",
              templateNodeId: id,
              value: backgroundColor
            }, "cor de fundo", { allowOnMedia: true, triggerEvent: "click" });
          }
        });
      };

      const tab = getPreviewEditTab();

      if (tab === "dashboard") {
        doc.querySelectorAll("[data-dashboard-preview-home]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            returnDashboardHome();
          });
        });

        doc.querySelectorAll("[data-dashboard-preview-tab]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            const nextDashboardTab = button.dataset.dashboardPreviewTab;
            if (["faq", "table", "stories", "article", "carousel", "template"].includes(nextDashboardTab)) {
              currentEditorTab = nextDashboardTab;
              state.dashboard.view = "layouts";
              renderEditor();
            }
          });
        });
        return;
      }

      if (tab === "template") {
        setupTemplatePreviewEditing();
        return;
      }

      if (tab === "faq") {
        doc.querySelectorAll('[id="faq-section__q-text"]').forEach((element, index) => {
          attachText(element, { scope: "faq", index, field: "question" });
        });
        doc.querySelectorAll('[id="faq-section__a-text"]').forEach((element, index) => {
          attachText(element, { scope: "faq", index, field: "answer" }, { multiline: true });
        });
      }

      if (tab === "stories") {
        doc.querySelectorAll(".lp-stories__option").forEach((option, groupIndex) => {
          attachText(option.querySelector(".lp-stories__name"), { scope: "stories", field: "groupName", groupIndex });
          attachMedia(option.querySelector(".lp-stories__thumb"), { scope: "stories", field: "groupThumb", groupIndex }, "URL da miniatura");
          attachColor(option.querySelector(".lp-stories__ring"), { scope: "stories", field: "ringColor" }, "cor da borda");
        });

        let panelIndex = 0;
        state.stories.groups.forEach((group, groupIndex) => {
          group.slides.forEach((slide, slideIndex) => {
            const panel = doc.querySelectorAll(".lp-stories__panel")[panelIndex];
            panelIndex += 1;
            if (!panel) {
              return;
            }

            attachText(panel.querySelector(".lp-stories__title"), { scope: "stories", field: "groupName", groupIndex });
            attachText(panel.querySelector(".lp-stories__caption"), { scope: "stories", field: "caption", groupIndex, slideIndex }, { multiline: true });
            attachMedia(panel.querySelector(".lp-stories__avatar"), { scope: "stories", field: "avatar" }, "URL do avatar");
            attachMedia(panel.querySelector(".lp-stories__image, .lp-stories__video"), { scope: "stories", field: "src", groupIndex, slideIndex }, "URL da mídia");
            attachColor(panel.querySelector(".lp-stories__caption"), { scope: "stories", field: "captionBackgroundColor" }, "cor do fundo da legenda");
          });
        });
      }

      if (tab === "article") {
        attachText(doc.querySelector(".ll-article__tabs-head .ll-article__eyebrow"), { scope: "article", field: "eyebrow" });
        attachText(doc.querySelector(".ll-article__tabs-head .ll-article__title"), { scope: "article", field: "title" });
        attachText(doc.querySelector(".ll-article__tabs-head .ll-article__intro"), { scope: "article", field: "intro" }, { multiline: true });
        attachColor(doc.querySelector(".ll-article__shell"), { scope: "article", field: "shellBackgroundColor" }, "cor do fundo geral");
        attachColor(doc.querySelector(".ll-article__tabs"), { scope: "article", field: "tabsProtectionColor" }, "cor da proteção das abas");

        doc.querySelectorAll(".ll-article__tab").forEach((button, tabIndex) => {
          attachText(button.querySelector(".ll-article__tab-icon"), { scope: "article", tabIndex, field: "icon" });
          attachText(button.querySelector(".ll-article__tab-title"), { scope: "article", tabIndex, field: "label" });
          attachText(button.querySelector(".ll-article__tab-summary"), { scope: "article", tabIndex, field: "summary" });
        });

        doc.querySelectorAll(".ll-article__panel").forEach((panel, tabIndex) => {
          attachMedia(panel, { scope: "article", tabIndex, field: "image" }, "URL da imagem de fundo");
          attachColor(panel, { scope: "article", field: "overlayColor" }, "cor da proteção da imagem", { allowOnMedia: true });
          attachText(panel.querySelector(".ll-article__eyebrow"), { scope: "article", tabIndex, field: "eyebrow" });
          attachText(panel.querySelector(".ll-article__heading"), { scope: "article", tabIndex, field: "heading" });
          attachText(panel.querySelector(".ll-article__body"), { scope: "article", tabIndex, field: "body" }, { multiline: true });
          panel.querySelectorAll(".ll-article__tag").forEach((tag, tagIndex) => {
            attachText(tag, { scope: "article", tabIndex, field: "tag", tagIndex });
          });
        });
      }

      if (tab === "carousel") {
        attachText(doc.querySelector(".ll-carousel__intro .ll-carousel__eyebrow"), { scope: "carousel", field: "eyebrow" });
        attachText(doc.querySelector(".ll-carousel__intro .ll-carousel__title"), { scope: "carousel", field: "title" });
        attachText(doc.querySelector(".ll-carousel__intro .ll-carousel__lead"), { scope: "carousel", field: "lead" }, { multiline: true });
        attachColor(doc.querySelector(".ll-carousel"), { scope: "carousel", field: "softColor" }, "cor de fundo da seção");
        attachColor(doc.querySelector(".ll-carousel__eyebrow"), { scope: "carousel", field: "brandColor" }, "cor de destaque");

        doc.querySelectorAll(".ll-carousel__dot").forEach((dot, slideIndex) => {
          attachText(dot.querySelector(".ll-carousel__dot-number"), { scope: "carousel", slideIndex, field: "navNumber" });
          attachText(dot.querySelector(".ll-carousel__dot-text"), { scope: "carousel", slideIndex, field: "navLabel" });
          attachMedia(dot.querySelector(".ll-carousel__dot-icon"), { scope: "carousel", slideIndex, field: "navIconImage" }, "URL ou SVG do ícone");
        });

        doc.querySelectorAll(".ll-carousel__panel").forEach((panel, slideIndex) => {
          const slide = state.carousel.slides[slideIndex];
          if (!slide) {
            return;
          }

          attachMedia(panel.querySelector(".ll-carousel__image"), { scope: "carousel", slideIndex, field: "image" }, "URL da imagem");
          attachColor(panel.querySelector(".ll-carousel__layout--impact"), { scope: "carousel", slideIndex, field: "backgroundColor" }, "cor do fundo");
          attachColor(panel.querySelector(".ll-carousel__layout-copy"), { scope: "carousel", slideIndex, field: "textColor" }, "cor do texto");
          attachColor(panel.querySelector(".ll-carousel__layout--media"), { scope: "carousel", slideIndex, field: "mediaBackgroundColor" }, "cor do fundo da mídia");
          attachColor(panel.querySelector(".ll-carousel__caption h3"), { scope: "carousel", slideIndex, field: "textColor" }, "cor do texto");
          attachCarouselCaptionPosition(panel.querySelector(".ll-carousel__caption"), slideIndex);
          attachText(panel.querySelector(".ll-carousel__layout-eyebrow"), { scope: "carousel", slideIndex, field: "eyebrow" });
          attachText(panel.querySelector(".ll-carousel__layout-title"), { scope: "carousel", slideIndex, field: "title" });
          attachText(panel.querySelector(".ll-carousel__layout-text"), { scope: "carousel", slideIndex, field: "text" }, { multiline: true });
          attachText(panel.querySelector(".ll-carousel__caption h3"), { scope: "carousel", slideIndex, field: "captionTitle" });
          attachText(panel.querySelector(".ll-carousel__caption p"), { scope: "carousel", slideIndex, field: "captionText" }, { multiline: true });
        });
      }
    }

    function getPreviewDeviceConfig(device = state.responsive.previewDevice) {
      return previewDevices.find((item) => item.key === device) || previewDevices[previewDevices.length - 1];
    }

    function getPreviewIdealWidth(config) {
      if (config.key !== "desktop" || currentPage !== "conteudo") {
        return config.width;
      }

      const widths = {
        faq: 820,
        table: 900,
        stories: 520,
        article: 1280,
        carousel: 1280,
        template: 1280
      };

      return widths[currentEditorTab] || config.width;
    }

    function getResponsiveEditDeviceFromPreview(device = state.responsive.previewDevice) {
      if (device === "mobile") {
        return "mobile";
      }

      if (device === "tablet") {
        return "tablet";
      }

      return "desktop";
    }

    function shouldShowResponsivePreviewActions() {
      return currentPage === "conteudo" && currentEditorTab !== "dashboard";
    }

    function ensureResponsiveEditDeviceForPreview() {
      const targetDevice = getResponsiveEditDeviceFromPreview();
      if (state.responsive.editDevice === targetDevice) {
        return true;
      }

      setResponsiveEditDevice(targetDevice, { previewDevice: state.responsive.previewDevice });
      return state.responsive.editDevice === targetDevice;
    }

    function saveResponsivePreviewVersion() {
      if (!ensureResponsiveEditDeviceForPreview()) {
        return;
      }

      saveResponsiveDraft();
    }

    function removeResponsivePreviewVersion() {
      if (!ensureResponsiveEditDeviceForPreview()) {
        return;
      }

      removeResponsiveVersion();
    }

    function updatePreviewFullscreenButtons() {
      previewFullscreenButtons.forEach((button) => {
        const nextLabel = isPreviewFullscreen ? "Sair do modo ampliado" : "Ativar modo ampliado";
        button.classList.toggle("is-active", isPreviewFullscreen);
        button.setAttribute("aria-pressed", String(isPreviewFullscreen));
        button.setAttribute("aria-label", nextLabel);
        button.setAttribute("title", nextLabel);
      });
    }

    function updateFocusModeButtons() {
      focusModeButtons.forEach((button) => {
        const nextLabel = isFocusMode ? "Sair do modo foco" : "Ativar modo foco";
        button.classList.toggle("is-active", isFocusMode);
        button.setAttribute("aria-pressed", String(isFocusMode));
        button.setAttribute("aria-label", nextLabel);
        button.setAttribute("title", nextLabel);
      });
    }

    function updateCodeFocusModeButtons() {
      codeFocusModeButtons.forEach((button) => {
        const nextLabel = isCodeFocusMode ? "Sair do modo HTML" : "Ativar modo HTML";
        button.classList.toggle("is-active", isCodeFocusMode);
        button.setAttribute("aria-pressed", String(isCodeFocusMode));
        button.setAttribute("aria-label", nextLabel);
        button.setAttribute("title", nextLabel);
      });
    }

    function setPreviewFullscreen(active) {
      isPreviewFullscreen = Boolean(active);
      if (isPreviewFullscreen && isCodeFocusMode) {
        isCodeFocusMode = false;
        document.body.classList.remove("code-focus-mode-active");
        updateCodeFocusModeButtons();
      }
      document.body.classList.toggle("preview-fullscreen-active", isPreviewFullscreen);
      updatePreviewFullscreenButtons();
      updatePreviewDeviceUi();
    }

    function setFocusMode(active) {
      isFocusMode = Boolean(active);
      document.body.classList.toggle("focus-mode-active", isFocusMode);
      updateFocusModeButtons();
      updatePreviewDeviceUi();
    }

    function setCodeFocusMode(active) {
      isCodeFocusMode = Boolean(active);
      if (isCodeFocusMode && isPreviewFullscreen) {
        isPreviewFullscreen = false;
        document.body.classList.remove("preview-fullscreen-active");
        updatePreviewFullscreenButtons();
      }
      document.body.classList.toggle("code-focus-mode-active", isCodeFocusMode);
      updateCodeFocusModeButtons();
      updatePreviewDeviceUi();
    }

    function updatePreviewDeviceUi() {
      const config = currentPage === "tecnica" ? getPreviewDeviceConfig("desktop") : getPreviewDeviceConfig();
      const idealWidth = getPreviewIdealWidth(config);
      const fidelityLabel = config.key === "desktop" && currentPage === "conteudo" ? "largura fiel" : `${config.width}px`;
      previewDeviceLabel.textContent = config.key === "desktop" && currentPage === "conteudo"
        ? `${config.label} - ${idealWidth}px (${fidelityLabel})`
        : `${config.label} - ${config.width}px`;
      document.documentElement.dataset.previewDevice = config.key;
      if (isPreviewFullscreen) {
        if (config.key === "desktop") {
          previewFrame.style.width = `min(100%, ${idealWidth}px)`;
          previewFrame.style.maxWidth = "100%";
        } else {
          previewFrame.style.width = `${config.width}px`;
          previewFrame.style.maxWidth = "100%";
        }
        previewDeviceButtons.forEach((button) => {
          button.setAttribute("aria-pressed", String(button.dataset.previewDevice === config.key));
        });
        const showResponsiveActions = shouldShowResponsivePreviewActions();
        const responsiveDevice = getResponsiveEditDeviceFromPreview(config.key);
        const hasSavedVersion = showResponsiveActions && hasResponsiveVersion(getResponsiveTab(), responsiveDevice);
        responsivePreviewSaveButtons.forEach((button) => {
          button.hidden = !showResponsiveActions;
          button.disabled = !showResponsiveActions;
        });
        responsivePreviewRemoveButtons.forEach((button) => {
          button.hidden = !showResponsiveActions;
          button.disabled = !showResponsiveActions || !hasSavedVersion;
        });
        return;
      }
      if (currentPage === "conteudo" && currentEditorTab === "dashboard") {
        previewFrame.style.width = "100%";
        previewFrame.style.maxWidth = "none";
      } else {
        previewFrame.style.width = config.key === "desktop" ? `min(100%, ${idealWidth}px)` : `${config.width}px`;
        previewFrame.style.maxWidth = config.key === "desktop" ? "100%" : "none";
      }
      previewDeviceButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.previewDevice === config.key));
      });
      const showResponsiveActions = shouldShowResponsivePreviewActions();
      const responsiveDevice = getResponsiveEditDeviceFromPreview(config.key);
      const hasSavedVersion = showResponsiveActions && hasResponsiveVersion(getResponsiveTab(), responsiveDevice);
      responsivePreviewSaveButtons.forEach((button) => {
        button.hidden = !showResponsiveActions;
        button.disabled = !showResponsiveActions;
      });
      responsivePreviewRemoveButtons.forEach((button) => {
        button.hidden = !showResponsiveActions;
        button.disabled = !showResponsiveActions || !hasSavedVersion;
      });
    }

    function setPreviewDevice(device) {
      const config = getPreviewDeviceConfig(device);
      if (shouldShowResponsivePreviewActions()) {
        const editDevice = getResponsiveEditDeviceFromPreview(config.key);
        if (editDevice !== state.responsive.editDevice) {
          setResponsiveEditDevice(editDevice, { previewDevice: config.key });
          return;
        }
      }

      state.responsive.previewDevice = config.key;
      updatePreviewDeviceUi();
      updateOutput({ preservePreviewScroll: false });
    }

    function scheduleTemplatePreviewUpdate(delay = 120) {
      window.clearTimeout(templatePreviewUpdateTimer);
      templatePreviewUpdateTimer = window.setTimeout(() => {
        updateOutput();
      }, delay);
    }

    function updateOutput(options = {}) {
      const preservePreviewScroll = options.preservePreviewScroll !== false;
      const previewScrollPosition = preservePreviewScroll ? getPreviewScrollPosition() : null;
      generatedHtml.value = buildOutputHtml("html");
      updatePreviewDeviceUi();
      previewFrame.addEventListener("load", () => {
        setupPreviewEditing();
        if (previewScrollPosition) {
          restorePreviewScrollPosition(previewScrollPosition);
        }
      }, { once: true });
      previewFrame.srcdoc = buildPreviewHtml();
      copyStatus.textContent = "";
      copyStatus.classList.remove("is-warning", "is-visible");
    }

    function renderFaqEditorItems() {
      return state.items.map((item, index) => `
        <article class="faq-editor__item" data-index="${index}">
          <div class="faq-editor__bar">
            <strong>Pergunta ${index + 1}</strong>
            <button class="button button--danger icon-button" type="button" data-action="remove" aria-label="Remover pergunta ${index + 1}" title="Remover pergunta">${trashIcon()}</button>
          </div>
          <div class="faq-editor__fields">
            <p class="muted-note">Edite a pergunta e a resposta clicando no texto da prévia.</p>
          </div>
        </article>
      `).join("");
    }

    function renderFaqEditor() {
      return `
        <div class="editor-section-title">
          <div>
            <h3>FAQ</h3>
            <p>Perguntas e respostas do bloco de dúvidas frequentes.</p>
          </div>
        </div>

        <details class="faq-bulk-panel" open>
          <summary class="faq-editor__bar faq-bulk-panel__summary">
            <strong>Colar texto completo do FAQ</strong>
          </summary>
          <div class="faq-bulk-panel__body">
            <label class="field">
              <span>Perguntas e respostas em massa no formato</span>
              <textarea class="bulk-input" data-faq-bulk="input" spellcheck="false">${escapeHtml(state.faqBulkInput)}</textarea>
            </label>
            <div class="bulk-actions">
              <button class="button button--soft" type="button" data-action="fill-faq-bulk">Preencher FAQ</button>
              <span class="bulk-status" aria-live="polite">${escapeHtml(state.faqBulkStatus)}</span>
            </div>
          </div>
        </details>

        ${renderFaqEditorItems()}
      `;
    }

    function homeIcon() {
      return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M5.5 10.5V21h13V10.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M9.5 21v-6h5v6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>`;
    }

    function trashIcon() {
      return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16" stroke-width="2" stroke-linecap="round"></path>
        <path d="M10 11v6" stroke-width="2" stroke-linecap="round"></path>
        <path d="M14 11v6" stroke-width="2" stroke-linecap="round"></path>
        <path d="M6 7l1 14h10l1-14" stroke-width="2" stroke-linejoin="round"></path>
        <path d="M9 7V4h6v3" stroke-width="2" stroke-linejoin="round"></path>
      </svg>`;
    }

    function saveIcon() {
      return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4h12l2 2v14H5z" stroke-width="2" stroke-linejoin="round"></path>
        <path d="M8 4v6h8V4" stroke-width="2" stroke-linejoin="round"></path>
        <path d="M8 20v-6h8v6" stroke-width="2" stroke-linejoin="round"></path>
      </svg>`;
    }

    function renderTableEditor() {
      if (currentPage !== "conteudo") {
        return "";
      }

      normalizeTableHeaderColors();
      const columns = getTableColumns();
      const columnFields = columns.map((column, index) => `
              <div class="table-editor__column">
                ${renderColorControl({ value: getTableHeaderColor(index), label: `Cor do cabeçalho da coluna ${index + 1}`, scope: "table", field: "columnHeaderColor", columnIndex: index, allowGradient: true, className: "table-header-color" })}
                <label class="field">
                  <span>Coluna ${index + 1}</span>
                  <input type="text" value="${escapeHtml(column)}" data-table-field="column" data-column-index="${index}" autocomplete="off">
                </label>
              </div>
            `).join("");

      const rows = state.table.rows.map((row, rowIndex) => `
        <article class="table-row-editor" data-table-row="${rowIndex}">
          <div class="faq-editor__bar">
            <strong>Linha ${rowIndex + 1}</strong>
            <button class="button button--danger icon-button" type="button" data-action="remove-table-row" aria-label="Remover linha ${rowIndex + 1}" title="Remover linha">${trashIcon()}</button>
          </div>
          <div class="table-row-editor__cells">
            ${columns.map((column, cellIndex) => `
              <label class="field">
                <span>${escapeHtml(column.trim() || `Coluna ${cellIndex + 1}`)}</span>
                <input type="text" value="${escapeHtml(row[cellIndex] || "")}" data-table-field="cell" data-row-index="${rowIndex}" data-cell-index="${cellIndex}" autocomplete="off">
              </label>
            `).join("")}
          </div>
        </article>
      `).join("");

      return `
        <section class="table-editor" aria-label="Editor da tabela">
          <div class="editor-section-title">
            <div class="table-editor__title">
              <div>
                <h3>Tabela</h3>
                <p>Cole da planilha ou edite as células abaixo.</p>
              </div>
            </div>
          </div>

          <article class="table-editor__box table-settings">
            <div class="table-settings__head">
              <strong>Configurações</strong>
              <div class="table-settings__controls">
                <button class="button button--soft icon-button" type="button" data-action="add-table-column" aria-label="Adicionar coluna" title="Adicionar coluna">+</button>
              </div>
            </div>
            <div class="table-settings__body">
              <label class="field">
                <span>Caption de Acessibilidade</span>
                <input type="text" value="${escapeHtml(state.table.caption)}" data-table-field="caption" autocomplete="off" placeholder="tamanhos de chinelos disponíveis">
              </label>
              <div class="table-editor__columns">
${columnFields}
              </div>
            </div>
          </article>

          <article class="table-editor__box table-editor__box--sheet">
            <div class="table-editor__box-body">
              <label class="field sheet-field">
                <span>Colar conteúdo de planilha ou .txt</span>
                <textarea class="bulk-input sheet-paste" data-table-field="bulk" spellcheck="false" placeholder="SKU&#9;TÍTULO&#10;1225007&#9;HAVAIANAS TOP.BASIC BRANCO/BRANCO/VERDE 37/8&#10;1225008&#9;HAVAIANAS KIDS ATHLETIC VERDE PATRIA 25/6">${escapeHtml(state.table.bulkInput)}</textarea>
              </label>
              <div class="bulk-actions">
                <button class="button button--soft" type="button" data-action="fill-table-bulk">Preencher tabela</button>
                <span class="bulk-status" aria-live="polite">${escapeHtml(state.table.status)}</span>
              </div>
            </div>
          </article>

${rows}
        </section>
      `;
    }

    function renderStoriesEditor() {
      if (currentPage !== "conteudo") {
        return "";
      }

      const groups = state.stories.groups.map((group, groupIndex) => {
        const slides = group.slides.map((slide, slideIndex) => {
          const type = normalizeStoryType(slide.type);
          const position = normalizeStoryPosition(slide.captionPosition);
          const mediaFocus = normalizeStoryMediaFocus(slide.mediaFocus);
          const canRemoveSlide = group.slides.length > storyLimits.minSlides;
          const posterField = type === "video" ? `
              <label class="field">
                <span>Poster do video</span>
                <input type="text" value="${escapeHtml(slide.poster)}" data-stories-field="poster" data-story-group="${groupIndex}" data-story-slide="${slideIndex}" autocomplete="off">
              </label>` : "";

          return `
            <article class="stories-slide-editor" data-story-slide-card data-story-group="${groupIndex}" data-story-slide="${slideIndex}">
              <div class="faq-editor__bar">
                <strong>Slide ${slideIndex + 1}</strong>
                <div class="stories-slide-editor__actions">
                  <button class="button button--danger icon-button" type="button" data-action="remove-story-slide" data-story-group="${groupIndex}" data-story-slide="${slideIndex}" aria-label="Remover slide ${slideIndex + 1}" title="Remover slide"${canRemoveSlide ? "" : " disabled"}>${trashIcon()}</button>
                </div>
              </div>
              <div class="stories-slide-editor__body">
                <div class="stories-editor__grid">
                  <label class="field">
                    <span>Tipo de midia</span>
                    <select data-stories-field="type" data-story-group="${groupIndex}" data-story-slide="${slideIndex}">
                      <option value="image"${type === "image" ? " selected" : ""}>Imagem</option>
                      <option value="video"${type === "video" ? " selected" : ""}>Video</option>
                    </select>
                  </label>
                  <label class="field">
                    <span>URL da midia</span>
                    <span class="muted-note">Clique na mídia da prévia para trocar.</span>
                  </label>
${posterField}
                  <label class="field">
                    <span>Alt / aria-label</span>
                    <input type="text" value="${escapeHtml(slide.alt)}" data-stories-field="alt" data-story-group="${groupIndex}" data-story-slide="${slideIndex}" autocomplete="off">
                  </label>
                  <label class="field">
                    <span>Posicao da legenda</span>
                    <select data-stories-field="captionPosition" data-story-group="${groupIndex}" data-story-slide="${slideIndex}">
                      <option value="top"${position === "top" ? " selected" : ""}>Em cima</option>
                      <option value="bottom"${position === "bottom" ? " selected" : ""}>Embaixo</option>
                    </select>
                  </label>
                  <label class="field">
                    <span>Foco da midia</span>
                    <select data-stories-field="mediaFocus" data-story-group="${groupIndex}" data-story-slide="${slideIndex}">
                      <option value="center"${mediaFocus === "center" ? " selected" : ""}>Objeto no centro</option>
                      <option value="top"${mediaFocus === "top" ? " selected" : ""}>Objeto mais em cima</option>
                      <option value="bottom"${mediaFocus === "bottom" ? " selected" : ""}>Objeto mais embaixo</option>
                    </select>
                  </label>
                </div>
                <p class="muted-note">Texto, miniatura, avatar e fundo da legenda podem ser editados direto na prévia.</p>
              </div>
            </article>
          `;
        }).join("");

        const isOpen = state.stories.openGroupIndex === groupIndex ? " open" : "";
        const canAddSlide = group.slides.length < storyLimits.maxSlides;
        const canRemoveContainer = state.stories.groups.length > storyLimits.minContainers;

        return `
          <details class="stories-editor__box stories-container-editor" data-story-container="${groupIndex}"${isOpen}>
            <summary class="stories-container-editor__summary">
              <strong>Container ${groupIndex + 1}: ${escapeHtml(group.name.trim() || "sem nome")}</strong>
              <span class="stories-container-editor__meta">${group.slides.length}/${storyLimits.maxSlides} slides</span>
              <div class="stories-container-editor__actions">
                <button class="button button--soft icon-button" type="button" data-action="add-story-slide" data-story-group="${groupIndex}" aria-label="Adicionar slide no container ${groupIndex + 1}" title="Adicionar slide"${canAddSlide ? "" : " disabled"}>+</button>
                <button class="button button--danger icon-button" type="button" data-action="remove-story-container" data-story-group="${groupIndex}" aria-label="Remover container ${groupIndex + 1}" title="Remover container"${canRemoveContainer ? "" : " disabled"}>${trashIcon()}</button>
              </div>
              <span class="stories-container-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="stories-editor__body">
              <div class="stories-editor__grid">
                <p class="muted-note">Clique no nome ou na miniatura da bolinha na prévia para editar.</p>
              </div>
${slides}
            </div>
          </details>
        `;
      }).join("");

      const ringStyle = normalizeStoryRingStyle(state.stories.ringStyle);
      const ringColorControls = ringStyle === "solid" ? `
                <label class="field">
                  <span>Cor da borda</span>
                  ${renderColorControl({ value: state.stories.ringColor, label: "Cor da borda", scope: "stories", field: "ringColor" })}
                </label>` : `
                <label class="field">
                  <span>Cor inicial do degrade</span>
                  ${renderColorControl({ value: state.stories.ringGradientStart, label: "Cor inicial do degradê", scope: "stories", field: "ringGradientStart" })}
                </label>
                <label class="field">
                  <span>Cor final do degrade</span>
                  ${renderColorControl({ value: state.stories.ringGradientEnd, label: "Cor final do degradê", scope: "stories", field: "ringGradientEnd" })}
                </label>`;

      return `
        <section class="stories-editor" aria-label="Editor de stories">
          <div class="editor-section-title">
            <div>
              <h3>Stories</h3>
              <p>Edite ate 3 containers, com ate 4 slides em cada um.</p>
            </div>
            <div class="stories-editor__title-actions">
              <span class="stories-limits">${state.stories.groups.length}/${storyLimits.maxContainers} containers</span>
              <button class="button button--soft icon-button" type="button" data-action="add-story-container" aria-label="Adicionar container" title="Adicionar container"${state.stories.groups.length < storyLimits.maxContainers ? "" : " disabled"}>+</button>
            </div>
          </div>

          <details class="stories-guide">
            <summary class="stories-guide__summary">
              <strong>Guia rapido de midias</strong>
              <span aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="stories-guide__body">
              <p><strong>Slides:</strong> use imagens verticais em 9:16 e na maior resolucao disponivel. Recomendado 1080x1920 px ou mais; minimo seguro 860x1530 px.</p>
              <p><strong>Miniaturas:</strong> use imagem quadrada em 1:1. Recomendado 400x400 px; minimo seguro 220x220 px.</p>
              <p><strong>Limites:</strong> o componente aceita ate 3 containers e ate 4 slides por container.</p>
              <p><strong>Videos:</strong> use webm ou mp4 vertical em 9:16. O poster do video deve seguir a mesma proporcao.</p>
              <p><strong>Corte:</strong> em desktop largo o bloco vira 16:10 e a imagem vertical recebe zoom. Use o foco da midia para preservar topo, centro ou base do objeto principal.</p>
              <p><strong>Alt / aria-label:</strong> descreva o que aparece na midia de forma curta e objetiva.</p>
            </div>
          </details>

          <details class="stories-editor__box stories-base-editor">
            <summary class="stories-container-editor__summary">
              <strong>Base</strong>
              <span class="stories-container-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="stories-editor__body">
              <div class="stories-editor__grid stories-editor__grid--base">
                <label class="field">
                  <span>Aria-label da secao</span>
                  <input type="text" value="${escapeHtml(state.stories.ariaLabel)}" data-stories-field="ariaLabel" autocomplete="off">
                </label>
                <label class="field">
                  <span>Borda das bolinhas</span>
                  <select data-stories-field="ringStyle">
                    <option value="gradient"${ringStyle === "gradient" ? " selected" : ""}>Degrade</option>
                    <option value="solid"${ringStyle === "solid" ? " selected" : ""}>Cor unica</option>
                  </select>
                </label>
${ringColorControls}
                <p class="muted-note">Avatar e fundo da legenda também são editáveis pelo preview.</p>
              </div>
            </div>
          </details>

${groups}
        </section>
      `;
    }

    function renderArticleEditor() {
      if (currentPage !== "conteudo") {
        return "";
      }

      const tabs = state.article.tabs.map((tab, tabIndex) => {
        const isOpen = state.article.openTabIndex === tabIndex ? " open" : "";
        const canRemoveTab = state.article.tabs.length > articleLimits.minTabs;
        const elements = getArticleTabElements(tab);

        return `
          <details class="article-tab-editor" data-article-tab-panel="${tabIndex}"${isOpen}>
            <summary class="article-tab-editor__summary">
              <strong>Aba ${tabIndex + 1}: ${escapeHtml(tab.label.trim() || "sem titulo")}</strong>
              <span class="article-tab-editor__meta">Imagem + texto</span>
              <div class="article-tab-editor__actions">
                <button class="button button--danger icon-button" type="button" data-action="remove-article-tab" data-article-tab="${tabIndex}" aria-label="Remover aba ${tabIndex + 1}" title="Remover aba"${canRemoveTab ? "" : " disabled"}>${trashIcon()}</button>
              </div>
              <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="article-editor__body">
              <div class="article-elements" aria-label="Elementos ativos da aba ${tabIndex + 1}">
                <span class="article-elements__title">Elementos ativos</span>
                ${renderArticleElementToggle(tab, tabIndex, "icon", "Icone")}
                ${renderArticleElementToggle(tab, tabIndex, "summary", "Resumo")}
                ${renderArticleElementToggle(tab, tabIndex, "image", "Imagem")}
                ${renderArticleElementToggle(tab, tabIndex, "eyebrow", "Eyebrow")}
                ${renderArticleElementToggle(tab, tabIndex, "heading", "Titulo")}
                ${renderArticleElementToggle(tab, tabIndex, "body", "Texto")}
                ${renderArticleElementToggle(tab, tabIndex, "tags", "Tags")}
              </div>
              <p class="muted-note">Edite textos, tags, ícones e imagem clicando nos elementos da prévia.</p>
            </div>
          </details>
        `;
      }).join("");
      const canAddTab = state.article.tabs.length < articleLimits.maxTabs;
      const baseOpen = state.article.openBase ? " open" : "";
      const shellBackgroundOpacity = normalizeArticleOverlayOpacity(state.article.shellBackgroundOpacity).toFixed(2);
      const overlayOpacity = normalizeArticleOverlayOpacity(state.article.overlayOpacity).toFixed(2);
      const tabsProtectionOpacity = normalizeArticleOverlayOpacity(state.article.tabsProtectionOpacity).toFixed(2);

      return `
        <section class="article-editor" aria-label="Editor de artigo">
          <div class="editor-section-title">
            <div>
              <h3>Artigo</h3>
              <p>Layout com imagem de fundo, overlay escuro e texto diagramado sobre o bloco.</p>
            </div>
            <div class="article-editor__title-actions">
              <span class="stories-limits">${state.article.tabs.length}/${articleLimits.maxTabs} abas</span>
              <button class="button button--soft icon-button" type="button" data-action="add-article-tab" aria-label="Adicionar aba" title="Adicionar aba"${canAddTab ? "" : " disabled"}>+</button>
            </div>
          </div>

          <details class="stories-guide article-image-guide">
            <summary class="stories-guide__summary">
              <strong>Guia de imagem do artigo</strong>
              <span aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="stories-guide__body">
              <p><strong>Imagem recomendada:</strong> 1600x1200 px ou maior, em proporcao 4:3.</p>
              <p><strong>Minimo seguro:</strong> 1200x900 px. Para imagens mais abertas, 1920x1200 px tambem funciona bem.</p>
              <p><strong>Corte automatico:</strong> o bloco usa background-size: cover, entao bordas podem ser cortadas conforme a tela.</p>
              <p><strong>Composicao:</strong> mantenha o objeto principal mais ao centro e evite texto ou detalhes importantes nas extremidades.</p>
            </div>
          </details>

          <details class="article-tab-editor article-base-editor" data-article-base-panel${baseOpen}>
            <summary class="article-tab-editor__summary">
              <strong>Base</strong>
              <span class="article-tab-editor__meta">Imagem + overlay</span>
              <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="article-editor__body">
              <label class="field">
                <span>Imagem padrao dos blocos</span>
                <input type="text" value="${escapeHtml(state.article.backgroundImage)}" data-article-field="backgroundImage" autocomplete="off">
              </label>
              <label class="field">
                <span>Aria-label da secao</span>
                <input type="text" value="${escapeHtml(state.article.ariaLabel)}" data-article-field="ariaLabel" autocomplete="off">
              </label>
              <p class="muted-note">Título, texto de apoio e cores principais podem ser alterados direto na prévia.</p>
              <div class="article-elements article-protection">
                <span class="article-elements__title">Fundo geral da seção</span>
                <label class="article-toggle">
                  <input type="checkbox" data-article-field="shellBackgroundEnabled"${state.article.shellBackgroundEnabled !== false ? " checked" : ""}>
                  <span>Usar fundo</span>
                </label>
                <label class="field">
                  <span>Opacidade</span>
                  <input type="number" min="0" max="1" step="0.05" value="${shellBackgroundOpacity}" data-article-field="shellBackgroundOpacity">
                </label>
              </div>
              <div class="article-elements article-protection">
                <span class="article-elements__title">Proteção visual das abas</span>
                <label class="article-toggle">
                  <input type="checkbox" data-article-field="tabsProtectionEnabled"${state.article.tabsProtectionEnabled !== false ? " checked" : ""}>
                  <span>Usar proteção</span>
                </label>
                <label class="field">
                  <span>Opacidade</span>
                  <input type="number" min="0" max="0.95" step="0.05" value="${tabsProtectionOpacity}" data-article-field="tabsProtectionOpacity">
                </label>
              </div>
              <div class="article-elements article-protection">
                <span class="article-elements__title">Proteção visual da imagem</span>
                <label class="article-toggle">
                  <input type="checkbox" data-article-field="overlayEnabled"${state.article.overlayEnabled !== false ? " checked" : ""}>
                  <span>Usar proteção</span>
                </label>
                <label class="field">
                  <span>Opacidade</span>
                  <input type="number" min="0" max="0.95" step="0.05" value="${overlayOpacity}" data-article-field="overlayOpacity">
                </label>
              </div>
            </div>
          </details>

${tabs}
        </section>
      `;
    }

    function renderCarouselEditor() {
      if (currentPage !== "conteudo") {
        return "";
      }

      const baseOpen = state.carousel.openBase ? " open" : "";
      const carouselSlides = getCarouselSlides();
      const canAddSlide = carouselSlides.length < carouselLimits.maxSlides;
      const canRemoveSlide = carouselSlides.length > carouselLimits.minSlides;
      const slides = carouselSlides.map((slide, slideIndex) => {
        const isOpen = state.carousel.openSlideIndex === slideIndex ? " open" : "";
        const type = normalizeCarouselType(slide.type);
        const icon = getCarouselIconName(slide.navIcon);
        const captionHorizontal = normalizeCarouselCaptionHorizontal(slide.captionHorizontal);
        const captionVertical = normalizeCarouselCaptionVertical(slide.captionVertical);
        const impactFields = type === "impact" ? `
              <label class="article-toggle">
                <input type="checkbox" data-carousel-field="reverse" data-carousel-slide="${slideIndex}"${slide.reverse ? " checked" : ""}>
                <span>Inverter texto e imagem</span>
              </label>
              <label class="article-toggle">
                <input type="checkbox" data-carousel-field="gradientEnabled" data-carousel-slide="${slideIndex}"${slide.gradientEnabled !== false ? " checked" : ""}>
                <span>Usar degradê no fundo</span>
              </label>
              <div class="article-editor__grid">
                <label class="field">
                  <span>Ângulo do degradê</span>
                  <input type="number" min="0" max="360" step="1" value="${normalizeCarouselGradientAngle(slide.gradientAngle)}" data-carousel-field="gradientAngle" data-carousel-slide="${slideIndex}">
                </label>
              </div>
              <p class="muted-note">Cores, título e texto do slide são editáveis direto na prévia.</p>` : `
              <p class="muted-note">Cores e textos da legenda são editáveis direto na prévia.</p>
              <div class="article-editor__grid">
                <label class="field">
                  <span>Posição horizontal</span>
                  <select data-carousel-field="captionHorizontal" data-carousel-slide="${slideIndex}">
                    <option value="left"${captionHorizontal === "left" ? " selected" : ""}>Esquerda</option>
                    <option value="center"${captionHorizontal === "center" ? " selected" : ""}>Centro</option>
                    <option value="right"${captionHorizontal === "right" ? " selected" : ""}>Direita</option>
                  </select>
                </label>
                <label class="field">
                  <span>Posição vertical</span>
                  <select data-carousel-field="captionVertical" data-carousel-slide="${slideIndex}">
                    <option value="top"${captionVertical === "top" ? " selected" : ""}>Topo</option>
                    <option value="center"${captionVertical === "center" ? " selected" : ""}>Centro</option>
                    <option value="bottom"${captionVertical === "bottom" ? " selected" : ""}>Rodapé</option>
                  </select>
                </label>
              </div>
              `;

        return `
          <details class="article-tab-editor" data-carousel-slide-panel="${slideIndex}"${isOpen}>
            <summary class="article-tab-editor__summary">
              <strong>Slide ${slideIndex + 1}: ${escapeHtml(slide.navLabel || "sem título")}</strong>
              <span class="article-tab-editor__meta">${type === "impact" ? "Impacto" : "Decisão"}</span>
              <span class="article-tab-editor__actions">
                <button class="button button--danger icon-button" type="button" data-action="remove-carousel-slide" data-carousel-slide="${slideIndex}" aria-label="Remover slide ${slideIndex + 1}" title="Remover slide"${canRemoveSlide ? "" : " disabled"}>${trashIcon()}</button>
              </span>
              <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="article-editor__body">
              <div class="article-editor__grid">
                <label class="field">
                  <span>Tipo de layout</span>
                  <select data-carousel-field="type" data-carousel-slide="${slideIndex}">
                    <option value="impact"${type === "impact" ? " selected" : ""}>Impacto</option>
                    <option value="decision"${type === "decision" ? " selected" : ""}>Decisão</option>
                  </select>
                </label>
              </div>
              <label class="field">
                <span>Ícone da aba</span>
                <select data-carousel-field="navIcon" data-carousel-slide="${slideIndex}">
                  <option value="heart"${icon === "heart" ? " selected" : ""}>Coração</option>
                  <option value="bottle"${icon === "bottle" ? " selected" : ""}>Frasco</option>
                  <option value="sparkles"${icon === "sparkles" ? " selected" : ""}>Brilho</option>
                  <option value="box"${icon === "box" ? " selected" : ""}>Embalagem</option>
                  <option value="check"${icon === "check" ? " selected" : ""}>Check</option>
                  <option value="none"${icon === "none" ? " selected" : ""}>Sem ícone</option>
                </select>
              </label>
              <label class="field">
                <span>Alt da imagem</span>
                <input type="text" value="${escapeHtml(slide.alt || "")}" data-carousel-field="alt" data-carousel-slide="${slideIndex}" autocomplete="off">
              </label>
              <p class="muted-note">Nome da aba, ícone custom e imagem principal podem ser alterados clicando na prévia.</p>
              <div class="article-elements article-protection">
                <span class="article-elements__title">Foco da imagem</span>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Left (%)</span>
                    <input type="number" min="0" max="100" step="1" value="${normalizeCarouselFocus(slide.focusX)}" data-carousel-field="focusX" data-carousel-slide="${slideIndex}">
                  </label>
                  <label class="field">
                    <span>Top (%)</span>
                    <input type="number" min="0" max="100" step="1" value="${normalizeCarouselFocus(slide.focusY)}" data-carousel-field="focusY" data-carousel-slide="${slideIndex}">
                  </label>
                </div>
              </div>
${impactFields}
            </div>
          </details>
        `;
      }).join("");

      return `
        <section class="article-editor carousel-editor" aria-label="Editor de carrossel">
          <div class="editor-section-title">
            <div>
              <h3>Carrossel</h3>
              <p>Monte uma sequência com layouts de impacto e decisão.</p>
            </div>
            <div class="article-editor__title-actions">
              <span class="stories-limits">${carouselSlides.length}/${carouselLimits.maxSlides} slides</span>
              <button class="button button--soft icon-button" type="button" data-action="add-carousel-slide" aria-label="Adicionar slide" title="Adicionar slide"${canAddSlide ? "" : " disabled"}>+</button>
            </div>
          </div>

          <details class="stories-guide article-image-guide">
            <summary class="stories-guide__summary">
              <strong>Guia de uso do carrossel</strong>
              <span aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="stories-guide__body">
              <p><strong>Quantidade:</strong> use de 1 a 4 slides. Os botões de navegação se dividem automaticamente conforme a quantidade ativa.</p>
              <p><strong>Dimensões por sessão:</strong> nos slides de Impacto, use 780x740 px. Nos slides de Decisão, use 1800x1600 px.</p>
              <p><strong>Como o corte funciona:</strong> o carrossel usa cover. No desktop ele abre mais na horizontal; nas telas menores ele fica mais vertical e pode cortar laterais.</p>
              <p><strong>Foco da imagem:</strong> em cada slide, ajuste Left (%) e Top (%) para escolher onde o produto fica preso durante o corte. 50/50 é centro.</p>
              <p><strong>Referência rápida:</strong> produto à direita, aumente Left; produto à esquerda, diminua Left; produto no topo, diminua Top; produto embaixo, aumente Top.</p>
              <p><strong>Texto no layout Decisão:</strong> a cor do bloco de texto altera o overlay da legenda, e a cor do texto controla a leitura por cima dele. Use posição horizontal e vertical para mover esse bloco sem editar CSS.</p>
              <p><strong>Versão com cards:</strong> os ícones das abas, as bolinhas internas, o hover e o estado ativo podem ser editados na base do carrossel.</p>
              <p><strong>Ícone custom:</strong> cole a URL de .webp/.svg ou o código SVG inline no slide. Quando esse campo estiver preenchido, ele substitui o ícone pronto da aba.</p>
              <p><strong>Degradês:</strong> o fundo geral da seção e o fundo dos slides de impacto podem usar degradê. Se quiser algo mais seco, desative e trabalhe só com uma cor sólida.</p>
              <p><strong>Área segura:</strong> evite texto, logos e detalhes importantes perto das bordas. O produto principal deve ficar dentro da região central da imagem.</p>
              <p><strong>Texto do slide:</strong> use título curto e legenda objetiva para não cobrir demais o visual.</p>
            </div>
          </details>

          <details class="article-tab-editor article-base-editor" data-carousel-base-panel${baseOpen}>
            <summary class="article-tab-editor__summary">
              <strong>Base</strong>
              <span class="article-tab-editor__meta">Introdução + cores</span>
              <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="article-editor__body">
              <label class="article-toggle">
                <input type="checkbox" data-carousel-field="showIntro"${state.carousel.showIntro !== false ? " checked" : ""}>
                <span>Mostrar texto introdutório</span>
              </label>
              <label class="field">
                <span>Aria-label da seção</span>
                <input type="text" value="${escapeHtml(state.carousel.ariaLabel || "")}" data-carousel-field="ariaLabel" autocomplete="off">
              </label>
              <p class="muted-note">Título, texto de apoio e cor de destaque da introdução podem ser editados no preview.</p>
              <div class="article-elements article-protection">
                <span class="article-elements__title">Cores gerais</span>
                <label class="article-toggle">
                  <input type="checkbox" data-carousel-field="sectionGradientEnabled"${state.carousel.sectionGradientEnabled !== false ? " checked" : ""}>
                  <span>Usar degradê no fundo da seção</span>
                </label>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Início do fundo</span>
                    ${renderColorControl({ value: state.carousel.sectionGradientStart || "#ffffff", label: "Início do fundo", scope: "carousel", field: "sectionGradientStart" })}
                  </label>
                  <label class="field">
                    <span>Fim do fundo</span>
                    ${renderColorControl({ value: state.carousel.sectionGradientEnd || state.carousel.softColor, label: "Fim do fundo", scope: "carousel", field: "sectionGradientEnd" })}
                  </label>
                </div>
              </div>
              <div class="article-elements article-protection">
                <span class="article-elements__title">Navegação</span>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Hover da aba</span>
                    ${renderColorControl({ value: state.carousel.dotHoverColor, label: "Hover da aba", scope: "carousel", field: "dotHoverColor" })}
                  </label>
                  <label class="field">
                    <span>Aba ativa</span>
                    ${renderColorControl({ value: state.carousel.dotActiveColor, label: "Aba ativa", scope: "carousel", field: "dotActiveColor" })}
                  </label>
                </div>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Borda ativa</span>
                    ${renderColorControl({ value: state.carousel.dotActiveBorderColor, label: "Borda ativa", scope: "carousel", field: "dotActiveBorderColor" })}
                  </label>
                  <label class="field">
                    <span>Fundo do ícone</span>
                    ${renderColorControl({ value: state.carousel.dotIconBackgroundColor || "#f0ede8", label: "Fundo do ícone", scope: "carousel", field: "dotIconBackgroundColor" })}
                  </label>
                </div>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Ícone ativo</span>
                    ${renderColorControl({ value: state.carousel.dotIconActiveBackgroundColor || state.carousel.brandColor, label: "Ícone ativo", scope: "carousel", field: "dotIconActiveBackgroundColor" })}
                  </label>
                  <label class="field">
                    <span>Texto do ícone ativo</span>
                    ${renderColorControl({ value: state.carousel.dotIconActiveColor || "#ffffff", label: "Texto do ícone ativo", scope: "carousel", field: "dotIconActiveColor" })}
                  </label>
                </div>
                <label class="article-toggle">
                  <input type="checkbox" data-carousel-field="showIndicators"${state.carousel.showIndicators !== false ? " checked" : ""}>
                  <span>Mostrar bolinhas dentro do slide</span>
                </label>
                <div class="article-editor__grid">
                  <label class="field">
                    <span>Indicador</span>
                    ${renderColorControl({ value: state.carousel.indicatorColor || "#ffffff", label: "Indicador", scope: "carousel", field: "indicatorColor" })}
                  </label>
                  <label class="field">
                    <span>Indicador ativo</span>
                    ${renderColorControl({ value: state.carousel.indicatorActiveColor || "#ffffff", label: "Indicador ativo", scope: "carousel", field: "indicatorActiveColor" })}
                  </label>
                </div>
              </div>
            </div>
          </details>

${slides}
        </section>
      `;
    }

    function renderTemplateEditor() {
      if (currentPage !== "conteudo") {
        return "";
      }

      return `
        <div class="editor-section-title">
          <div>
            <h3>FrameWork</h3>
            <p>Monte o conteúdo que vai dentro de Detalhes do produto. A prévia mostra só o comportamento da <code>.lp-container</code>.</p>
          </div>
        </div>

        <article class="faq-bulk-panel">
          <div class="faq-editor__bar">
            <strong>Conteúdo da LP</strong>
            <div class="template-editor__actions">
              <button class="button button--soft icon-button" type="button" data-action="save-template-html-cache" aria-label="Salvar conteúdo da LP no navegador" title="Salvar conteúdo da LP">${saveIcon()}</button>
              <button class="button button--danger icon-button" type="button" data-action="clear-template-html" aria-label="Limpar conteúdo da LP e apagar cache" title="Limpar conteúdo da LP">${trashIcon()}</button>
            </div>
          </div>
          <div class="faq-bulk-panel__body">
            <label class="field">
              <span>HTML dentro da lp-container</span>
              <textarea class="bulk-input template-editor__textarea" data-template-field="html" spellcheck="false">${escapeHtml(state.template.html)}</textarea>
            </label>
            <p class="template-editor__status" aria-live="polite">${escapeHtml(state.template.status)}</p>
          </div>
        </article>
      `;
    }

    function renderEditor(preserveScroll = false) {
      const previousScrollTop = editor.scrollTop;
      updateEditorTabs();
      updateAddButtons();
      updateCopyButtons(pageConfigs[currentPage]);
      updateViewportMode();
      if (currentPage === "home") {
        editor.innerHTML = "";
      } else if (currentPage === "conteudo" && currentEditorTab === "dashboard") {
        editor.innerHTML = renderDashboardEditor();
      } else if (currentPage === "conteudo" && currentEditorTab === "table") {
        editor.innerHTML = renderTableEditor();
      } else if (currentPage === "conteudo" && currentEditorTab === "stories") {
        editor.innerHTML = renderStoriesEditor();
      } else if (currentPage === "conteudo" && currentEditorTab === "article") {
        editor.innerHTML = renderArticleEditor();
      } else if (currentPage === "conteudo" && currentEditorTab === "carousel") {
        editor.innerHTML = renderCarouselEditor();
      } else if (currentPage === "conteudo" && currentEditorTab === "template") {
        editor.innerHTML = renderTemplateEditor();
      } else {
        editor.innerHTML = renderFaqEditor();
      }
      setupTemplateCodeEditors(editor);
      if (currentPage === "conteudo" && currentEditorTab !== "dashboard") {
        const presetMarkup = currentEditorTab === "template" ? "" : renderPresetPanel();
        if (presetMarkup) {
          editor.insertAdjacentHTML("afterbegin", presetMarkup);
        }
      }
      editor.scrollTop = preserveScroll ? previousScrollTop : 0;

      updateOutput();
    }

    function parseBulkFaq(value) {
      const normalized = value.replace(/\r\n?/g, "\n");
      const items = [];
      const pattern = /<Q>([\s\S]*?)<\/Q>[\s\S]*?<A>([\s\S]*?)<\/A>/gi;
      let match;

      while ((match = pattern.exec(normalized)) !== null) {
        const question = match[1].replace(/\s+/g, " ").trim();
        const answer = match[2].trim();

        if (question || answer) {
          items.push({ question, answer });
        }
      }

      return items;
    }

    function fillFromBulk() {
      const parsedItems = parseBulkFaq(state.faqBulkInput);

      if (!parsedItems.length) {
        state.faqBulkStatus = "Não encontrei perguntas no formato <Q>Pergunta</Q> <A>Resposta</A>";
        renderEditor();
        return;
      }

      state.items = parsedItems;
      state.faqBulkStatus = `${parsedItems.length} pergunta${parsedItems.length === 1 ? "" : "s"} preenchida${parsedItems.length === 1 ? "" : "s"}.`;
      renderEditor();
    }

    function createEmptyTableRow() {
      return getTableColumns().map(() => "");
    }

    function normalizeTableRows() {
      const columns = getTableColumns();
      state.table.rows = state.table.rows.map((row) => columns.map((column, index) => row[index] || ""));

      if (!state.table.rows.length) {
        state.table.rows.push(createEmptyTableRow());
      }
    }

    function parseBulkTableHtml(value) {
      const html = value.includes("<table") ? value : `<table>${value}</table>`;
      const documentValue = new DOMParser().parseFromString(html, "text/html");
      const headerCells = Array.from(documentValue.querySelectorAll("thead th"));
      const columns = headerCells.map((cell) => cell.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
      let rowElements = Array.from(documentValue.querySelectorAll("tbody tr"));

      if (!rowElements.length) {
        rowElements = Array.from(documentValue.querySelectorAll("tr")).filter((row) => row.querySelector("td"));
      }

      const rows = rowElements
        .map((row) => Array.from(row.querySelectorAll("td")).map((cell) => cell.textContent.replace(/\s+/g, " ").trim()))
        .filter((row) => row.some(Boolean));

      return { columns, rows };
    }

    function parseBulkTableText(value) {
      const lines = value
        .replace(/\r\n?/g, "\n")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const rows = lines.map((line) => {
        if (line.includes("\t")) {
          return line.split("\t").map((cell) => cell.trim());
        }

        if (line.includes(";")) {
          return line.split(";").map((cell) => cell.trim());
        }

        const skuAndTitle = line.match(/^(\S+)\s+(.+)$/);
        return skuAndTitle ? [skuAndTitle[1], skuAndTitle[2]] : [line];
      }).filter((row) => row.some(Boolean));

      const firstRow = rows[0] || [];
      const firstRowLooksLikeHeader = rows.length > 1 && firstRow.some((cell) => /sku|t[ií]tulo|produto|descri[cç][aã]o/i.test(cell));

      return {
        columns: firstRowLooksLikeHeader ? firstRow : [],
        rows: firstRowLooksLikeHeader ? rows.slice(1) : rows
      };
    }

    function parseBulkTable(value) {
      const trimmed = value.trim();

      if (!trimmed) {
        return { columns: [], rows: [] };
      }

      if (/<\/?(table|thead|tbody|tr|td|th)\b/i.test(trimmed)) {
        return parseBulkTableHtml(trimmed);
      }

      return parseBulkTableText(trimmed);
    }

    function fillTableFromBulk() {
      const parsedTable = parseBulkTable(state.table.bulkInput);

      if (!parsedTable.rows.length) {
        state.table.status = "Não encontrei linhas para preencher.";
        renderEditor();
        return;
      }

      const maxColumns = Math.max(
        parsedTable.columns.length,
        state.table.columns.length,
        ...parsedTable.rows.map((row) => row.length)
      );

      state.table.columns = Array.from({ length: maxColumns }, (item, index) => {
        return parsedTable.columns[index] || state.table.columns[index] || `COLUNA ${index + 1}`;
      });
      state.table.headerColors = Array.from({ length: maxColumns }, (item, index) => {
        return normalizeCssColorValue(state.table.headerColors[index] || state.table.headerColor);
      });

      state.table.rows = parsedTable.rows.map((row) => {
        return Array.from({ length: maxColumns }, (item, index) => row[index] || "");
      });

      state.table.status = `${state.table.rows.length} linha${state.table.rows.length === 1 ? "" : "s"} preenchida${state.table.rows.length === 1 ? "" : "s"}.`;
      renderEditor();
    }

    function addTableColumn() {
      state.table.columns.push("");
      state.table.headerColors.push(normalizeCssColorValue(state.table.headerColor));
      state.table.rows.forEach((row) => row.push(""));
      state.table.status = "";
      renderEditor();
    }

    function removeTableColumn(index) {
      if (state.table.columns.length <= 1) {
        return;
      }

      state.table.columns.splice(index, 1);
      state.table.headerColors.splice(index, 1);
      state.table.rows.forEach((row) => row.splice(index, 1));
      state.table.status = "";
      normalizeTableRows();
      normalizeTableHeaderColors();
      renderEditor();
    }

    function addTableRow() {
      state.table.rows.push(createEmptyTableRow());
      state.table.status = "";
      renderEditor();
      const lastRowInput = editor.querySelector(`[data-table-row="${state.table.rows.length - 1}"] input`);
      if (lastRowInput) {
        lastRowInput.focus();
      }
    }

    function removeTableRow(index) {
      state.table.rows.splice(index, 1);
      state.table.status = "";
      normalizeTableRows();
      renderEditor();
    }

    function addItem() {
      state.items.push({ question: "", answer: "" });
      renderEditor();
      const lastItem = editor.querySelector(`.faq-editor__item[data-index="${state.items.length - 1}"] input`);
      if (lastItem) {
        lastItem.focus();
      }
    }

    function addCurrentItem() {
      markResponsiveDirty();

      if (currentPage === "conteudo" && currentEditorTab === "dashboard") {
        return;
      }

      if (currentPage === "conteudo" && currentEditorTab === "table") {
        addTableRow();
        return;
      }

      if (currentPage === "conteudo" && currentEditorTab === "stories") {
        return;
      }

      if (currentPage === "conteudo" && currentEditorTab === "article") {
        return;
      }

      if (currentPage === "conteudo" && currentEditorTab === "carousel") {
        return;
      }

      addItem();
    }

    function triggerMicroInteraction(name) {
      const className = `micro-${name}`;
      document.body.classList.remove(className);
      void document.body.offsetWidth;
      document.body.classList.add(className);
      window.setTimeout(() => {
        document.body.classList.remove(className);
      }, 650);
    }

    function getCopyStatusMessage(copyMode, warnings) {
      const baseStatus = copyMode === "full" && currentPage === "conteudo"
        ? pageConfigs[currentPage].fullCopiedStatus
        : pageConfigs[currentPage].copiedStatus;

      if (!warnings.length) {
        return baseStatus;
      }

      const visibleWarnings = warnings.slice(0, 3).join("; ");
      const remaining = warnings.length > 3 ? `; +${warnings.length - 3} pendência${warnings.length - 3 === 1 ? "" : "s"}` : "";
      return `${baseStatus} Atenção: ${visibleWarnings}${remaining}.`;
    }

    function getCopyBlockedStatusMessage(blockers) {
      const visibleBlockers = blockers.slice(0, 3).join("; ");
      const remaining = blockers.length > 3 ? `; +${blockers.length - 3} ocorrência${blockers.length - 3 === 1 ? "" : "s"}` : "";
      return `Não copiei. Existem imagens ou mídias locais/temporárias: ${visibleBlockers}${remaining}. Troque por URL hospedada antes de copiar.`;
    }

    async function copyGeneratedHtml(mode = "html") {
      const copyMode = mode === "full" ? "full" : "html";
      if (state.responsive.dirty && copyMode === "full") {
        const shouldCopy = window.confirm("Existe uma versão responsiva com alterações não salvas. Copiar agora não inclui esse rascunho. Copiar mesmo assim?");
        if (!shouldCopy) {
          return;
        }
      }

      const value = buildOutputHtml(copyMode);
      const warnings = collectLayoutWarnings();
      const blockers = collectHtmlLocalAssetBlockers(value, copyMode === "full" ? "HTML/CSS" : "HTML");
      generatedHtml.value = value;

      if (blockers.length) {
        copyStatus.textContent = getCopyBlockedStatusMessage(blockers);
        copyStatus.classList.add("is-warning");
        copyStatus.classList.remove("is-visible");
        void copyStatus.offsetWidth;
        copyStatus.classList.add("is-visible");
        window.setTimeout(() => {
          copyStatus.textContent = "";
          copyStatus.classList.remove("is-warning", "is-visible");
        }, 9000);
        return;
      }

      generatedHtml.focus();
      generatedHtml.select();

      try {
        await navigator.clipboard.writeText(value);
      } catch (error) {
        document.execCommand("copy");
      }

      copyStatus.textContent = getCopyStatusMessage(copyMode, warnings);
      copyStatus.classList.toggle("is-warning", warnings.length > 0);
      copyStatus.classList.remove("is-visible");
      void copyStatus.offsetWidth;
      copyStatus.classList.add("is-visible");
      triggerMicroInteraction("copy");
      window.setTimeout(() => {
        copyStatus.textContent = "";
        copyStatus.classList.remove("is-warning", "is-visible");
      }, warnings.length ? 5600 : 2400);
    }

    function insertSelectedTemplateLayout() {
      const selectedLayout = state.template.sourceLayout || "carousel";
      state.template.html = buildTemplateLayoutPackage(selectedLayout);
      const option = getTemplateLayoutOptions().find(([value]) => value === selectedLayout);
      state.template.status = `${option ? option[1] : "Layout"} inserido dentro da lp-container.`;
      renderEditor(true);
    }

    function clearTemplateHtml() {
      state.template.html = "";
      state.template.status = "Conteúdo da LP limpo.";
      try {
        localStorage.removeItem(templateCacheKey);
      } catch (error) {}
      renderEditor(true);
    }

    function saveTemplateHtmlCache() {
      try {
        localStorage.setItem(templateCacheKey, state.template.html || "");
        state.template.status = "Conteúdo da LP salvo neste navegador.";
      } catch (error) {
        state.template.status = "Não consegui salvar no navegador.";
      }
      renderEditor(true);
    }

    function loadTemplateHtmlCache() {
      try {
        const savedHtml = localStorage.getItem(templateCacheKey);
        if (savedHtml !== null) {
          state.template.html = savedHtml;
          state.template.status = "Conteúdo da LP recuperado deste navegador.";
        }
      } catch (error) {}
    }

    function importTemplateHtmlFile(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const rawValue = String(reader.result || "");
        const extractedValue = extractLpContainerHtml(rawValue);
        state.template.html = extractedValue;
        state.template.status = rawValue.trim() && extractedValue !== rawValue.trim()
          ? "HTML importado. Encontrei a lp-container e trouxe só o conteúdo interno."
          : "HTML importado para a lp-container.";
        renderEditor(true);
      });
      reader.readAsText(file);
    }

    editor.addEventListener("focusin", (event) => {
      const carouselField = event.target.dataset.carouselField;
      const carouselSlideIndex = event.target.dataset.carouselSlide;
      if (carouselField && carouselSlideIndex !== undefined) {
        setCarouselPreviewSlide(Number(carouselSlideIndex));
        state.carousel.openSlideIndex = Number(carouselSlideIndex);
        updateOutput();
        return;
      }

      const slideCard = event.target.closest("[data-story-slide-card]");
      if (!slideCard) {
        return;
      }

      setStoriesPreviewTarget(Number(slideCard.dataset.storyGroup), Number(slideCard.dataset.storySlide));
      updateOutput();
    });

    editor.addEventListener("paste", (event) => {
      if (event.target?.dataset?.templateField !== "html") {
        return;
      }

      window.setTimeout(() => {
        state.template.html = event.target.value;
        state.template.status = "";
        updateTemplateCodeHighlight(event.target);
        scheduleTemplatePreviewUpdate(0);
      }, 0);
    });

    editor.addEventListener("input", (event) => {
      if (event.target.matches("[data-preset-name]")) {
        state.presets.name = event.target.value;
        return;
      }

      if (event.target.matches("[data-user-preset-select]")) {
        updateSelectedPreset(event.target.value);
        return;
      }

      const templateField = event.target.dataset.templateField;
      if (templateField) {
        if (templateField === "sourceLayout") {
          state.template.sourceLayout = event.target.value;
          state.template.status = "";
          updateOutput();
          return;
        }

        if (templateField === "html") {
          state.template.html = event.target.value;
          state.template.status = "";
          updateTemplateCodeHighlight(event.target);
          scheduleTemplatePreviewUpdate();
          return;
        }
      }

      markResponsiveDirty();

      const faqBulkField = event.target.dataset.faqBulk;
      if (faqBulkField) {
        state.faqBulkInput = event.target.value;
        state.faqBulkStatus = "";
        return;
      }

      const storiesField = event.target.dataset.storiesField;
      if (storiesField) {
        if (storiesField === "ariaLabel") {
          state.stories.ariaLabel = event.target.value;
          updateOutput();
          return;
        }

        if (storiesField === "avatar") {
          state.stories.avatar = event.target.value;
          updateOutput();
          return;
        }

        if (storiesField === "ringStyle") {
          state.stories.ringStyle = normalizeStoryRingStyle(event.target.value);
          renderEditor(true);
          return;
        }

        if (["ringColor", "ringGradientStart", "ringGradientEnd", "captionBackgroundColor"].includes(storiesField)) {
          state.stories[storiesField] = normalizeHexColor(event.target.value);
          updateOutput();
          return;
        }

        const groupIndex = Number(event.target.dataset.storyGroup);
        const slideIndex = Number(event.target.dataset.storySlide);
        const group = state.stories.groups[groupIndex];

        if (!group) {
          return;
        }

        if (storiesField === "groupName") {
          group.name = event.target.value;
          setStoriesPreviewTarget(groupIndex, 0);
          updateOutput();
          return;
        }

        if (storiesField === "groupThumb") {
          group.thumb = event.target.value;
          setStoriesPreviewTarget(groupIndex, 0);
          updateOutput();
          return;
        }

        const slide = group.slides[slideIndex];
        if (!slide) {
          return;
        }

        setStoriesPreviewTarget(groupIndex, slideIndex);

        if (storiesField === "type") {
          slide.type = normalizeStoryType(event.target.value);
          renderEditor(true);
          return;
        }

        if (storiesField === "captionPosition") {
          slide.captionPosition = normalizeStoryPosition(event.target.value);
          updateOutput();
          return;
        }

        if (storiesField === "mediaFocus") {
          slide.mediaFocus = normalizeStoryMediaFocus(event.target.value);
          updateOutput();
          return;
        }

        slide[storiesField] = event.target.value;
        updateOutput();
        return;
      }

      const articleElement = event.target.dataset.articleElement;
      if (articleElement) {
        const tab = state.article.tabs[Number(event.target.dataset.articleTab)];

        if (!tab) {
          return;
        }

        getArticleTabElements(tab)[articleElement] = event.target.checked;
        renderEditor(true);
        return;
      }

      const articleField = event.target.dataset.articleField;
      if (articleField) {
        const tabIndex = event.target.dataset.articleTab;

        if (tabIndex === undefined) {
          if (articleField === "shellBackgroundEnabled") {
            state.article.shellBackgroundEnabled = event.target.checked;
          } else if (articleField === "overlayEnabled") {
            state.article.overlayEnabled = event.target.checked;
          } else if (articleField === "tabsProtectionEnabled") {
            state.article.tabsProtectionEnabled = event.target.checked;
          } else if (articleField === "shellBackgroundColor") {
            state.article.shellBackgroundColor = normalizeHexColor(event.target.value);
          } else if (articleField === "overlayColor") {
            state.article.overlayColor = normalizeHexColor(event.target.value);
          } else if (articleField === "tabsProtectionColor") {
            state.article.tabsProtectionColor = normalizeHexColor(event.target.value);
          } else if (articleField === "shellBackgroundOpacity") {
            state.article.shellBackgroundOpacity = normalizeArticleOverlayOpacity(event.target.value);
          } else if (articleField === "overlayOpacity") {
            state.article.overlayOpacity = normalizeArticleOverlayOpacity(event.target.value);
          } else if (articleField === "tabsProtectionOpacity") {
            state.article.tabsProtectionOpacity = normalizeArticleOverlayOpacity(event.target.value);
          } else {
            state.article[articleField] = event.target.value;
          }
          updateOutput();
          return;
        }

        const tab = state.article.tabs[Number(tabIndex)];
        if (!tab) {
          return;
        }

        tab[articleField] = event.target.value;
        updateOutput();
        return;
      }

      const carouselField = event.target.dataset.carouselField;
      if (carouselField) {
        const slideIndex = event.target.dataset.carouselSlide;

        if (slideIndex === undefined) {
          if (carouselField === "showIntro") {
            state.carousel.showIntro = event.target.checked;
          } else if (carouselField === "sectionGradientEnabled") {
            state.carousel.sectionGradientEnabled = event.target.checked;
          } else if (carouselField === "showIndicators") {
            state.carousel.showIndicators = event.target.checked;
          } else if (["brandColor", "softColor", "sectionGradientStart", "sectionGradientEnd", "dotHoverColor", "dotActiveColor", "dotActiveBorderColor", "dotIconBackgroundColor", "dotIconActiveBackgroundColor", "dotIconActiveColor", "indicatorColor", "indicatorActiveColor"].includes(carouselField)) {
            state.carousel[carouselField] = normalizeHexColor(event.target.value);
          } else {
            state.carousel[carouselField] = event.target.value;
          }
          updateOutput();
          return;
        }

        const slideNumber = Number(slideIndex);
        const slide = state.carousel.slides[slideNumber];
        if (!slide) {
          return;
        }

        setCarouselPreviewSlide(slideNumber);
        state.carousel.openSlideIndex = slideNumber;

        if (carouselField === "type") {
          slide.type = normalizeCarouselType(event.target.value);
          renderEditor(true);
          return;
        }

        if (carouselField === "reverse") {
          slide.reverse = event.target.checked;
          updateOutput();
          return;
        }

        if (carouselField === "gradientEnabled") {
          slide.gradientEnabled = event.target.checked;
          updateOutput();
          return;
        }

        if (["backgroundColor", "textColor", "gradientEndColor", "mediaBackgroundColor"].includes(carouselField)) {
          slide[carouselField] = normalizeHexColor(event.target.value);
          updateOutput();
          return;
        }

        if (carouselField === "gradientAngle") {
          slide.gradientAngle = normalizeCarouselGradientAngle(event.target.value);
          event.target.value = String(slide.gradientAngle);
          updateOutput();
          return;
        }

        if (["focusX", "focusY"].includes(carouselField)) {
          slide[carouselField] = normalizeCarouselFocus(event.target.value);
          event.target.value = String(slide[carouselField]);
          updateOutput();
          return;
        }

        if (carouselField === "captionHorizontal") {
          slide.captionHorizontal = normalizeCarouselCaptionHorizontal(event.target.value);
          updateOutput();
          return;
        }

        if (carouselField === "captionVertical") {
          slide.captionVertical = normalizeCarouselCaptionVertical(event.target.value);
          updateOutput();
          return;
        }

        slide[carouselField] = event.target.value;
        updateOutput();
        return;
      }

      const tableField = event.target.dataset.tableField;
      if (tableField) {
        if (tableField === "caption") {
          state.table.caption = event.target.value;
          updateOutput();
        }

        if (tableField === "headerColor") {
          state.table.headerColor = event.target.value;
          if (event.target.type === "color") {
            renderEditor();
            return;
          }
          updateOutput();
        }

        if (tableField === "columnHeaderColor") {
          const columnIndex = Number(event.target.dataset.columnIndex);
          state.table.headerColors[columnIndex] = event.target.value;
          renderEditor();
          return;
        }

        if (tableField === "bulk") {
          state.table.bulkInput = event.target.value;
          state.table.status = "";
        }

        if (tableField === "column") {
          const columnIndex = Number(event.target.dataset.columnIndex);
          state.table.columns[columnIndex] = event.target.value;
          updateOutput();
        }

        if (tableField === "cell") {
          const rowIndex = Number(event.target.dataset.rowIndex);
          const cellIndex = Number(event.target.dataset.cellIndex);
          state.table.rows[rowIndex][cellIndex] = event.target.value;
          updateOutput();
        }

        return;
      }

      const field = event.target.dataset.field;
      if (!field) {
        return;
      }

      const itemElement = event.target.closest(".faq-editor__item");
      const index = Number(itemElement.dataset.index);
      state.items[index][field] = event.target.value;
      updateOutput();
    });

    editor.addEventListener("change", (event) => {
      if (event.target.matches("[data-preset-import]")) {
        importUserPresetFile(event.target.files && event.target.files[0]);
        event.target.value = "";
        return;
      }

      if (event.target.matches("[data-template-import]")) {
        importTemplateHtmlFile(event.target.files && event.target.files[0]);
        event.target.value = "";
        return;
      }

      if (event.target.matches("select") || event.target.matches('[data-article-field="shellBackgroundEnabled"], [data-article-field="overlayEnabled"], [data-article-field="tabsProtectionEnabled"], [data-carousel-field="showIntro"], [data-carousel-field="sectionGradientEnabled"], [data-carousel-field="showIndicators"], [data-carousel-field="reverse"], [data-carousel-field="gradientEnabled"]')) {
        event.target.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    editor.addEventListener("toggle", (event) => {
      const container = event.target.closest("[data-story-container]");
      if (!container || event.target !== container) {
        return;
      }

      const groupIndex = Number(container.dataset.storyContainer);
      if (!container.open) {
        if (state.stories.openGroupIndex === groupIndex) {
          state.stories.openGroupIndex = -1;
        }
        return;
      }

      state.stories.openGroupIndex = groupIndex;
      setStoriesPreviewTarget(groupIndex, 0);
      updateOutput();
      editor.querySelectorAll("[data-story-container]").forEach((item) => {
        if (item !== container) {
          item.open = false;
        }
      });
    }, true);

    editor.addEventListener("toggle", (event) => {
      const basePanel = event.target.closest("[data-article-base-panel]");
      if (!basePanel || event.target !== basePanel) {
        return;
      }

      state.article.openBase = basePanel.open;
    }, true);

    editor.addEventListener("toggle", (event) => {
      const panel = event.target.closest("[data-article-tab-panel]");
      if (!panel || event.target !== panel) {
        return;
      }

      const tabIndex = Number(panel.dataset.articleTabPanel);
      if (!panel.open) {
        if (state.article.openTabIndex === tabIndex) {
          state.article.openTabIndex = -1;
        }
        return;
      }

      state.article.openTabIndex = tabIndex;
      editor.querySelectorAll("[data-article-tab-panel]").forEach((item) => {
        if (item !== panel) {
          item.open = false;
        }
      });
    }, true);

    editor.addEventListener("toggle", (event) => {
      const basePanel = event.target.closest("[data-carousel-base-panel]");
      if (!basePanel || event.target !== basePanel) {
        return;
      }

      state.carousel.openBase = basePanel.open;
    }, true);

    editor.addEventListener("toggle", (event) => {
      const panel = event.target.closest("[data-carousel-slide-panel]");
      if (!panel || event.target !== panel) {
        return;
      }

      const slideIndex = Number(panel.dataset.carouselSlidePanel);
      if (!panel.open) {
        if (state.carousel.openSlideIndex === slideIndex) {
          state.carousel.openSlideIndex = -1;
        }
        return;
      }

      state.carousel.openSlideIndex = slideIndex;
      setCarouselPreviewSlide(slideIndex);
      updateOutput();
      editor.querySelectorAll("[data-carousel-slide-panel]").forEach((item) => {
        if (item !== panel) {
          item.open = false;
        }
      });
    }, true);

    function getEditorColorMeta(control) {
      const meta = {
        scope: control.dataset.colorScope,
        field: control.dataset.colorField,
        type: "color"
      };

      if (control.dataset.columnIndex !== undefined) {
        meta.columnIndex = Number(control.dataset.columnIndex);
      }

      if (control.dataset.carouselSlide !== undefined) {
        meta.slideIndex = Number(control.dataset.carouselSlide);
      }

      return meta;
    }

    function openEditorColorControl(event, control) {
      const meta = getEditorColorMeta(control);
      if (!meta.scope || !meta.field) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      const popoverOptions = {
        kind: "color",
        label: control.getAttribute("aria-label") || "cor"
      };
      if (control.dataset.colorGradient === "true") {
        popoverOptions.allowGradient = true;
      }
      openPreviewEditPopover(event, meta, popoverOptions);
    }

    editor.addEventListener("click", (event) => {
      const colorControl = event.target.closest("[data-color-control]");
      if (colorControl) {
        openEditorColorControl(event, colorControl);
        return;
      }

      const homeReturnButton = event.target.closest("[data-dashboard-home-return]");
      if (homeReturnButton) {
        event.preventDefault();
        returnDashboardHome();
        return;
      }

      const guideButton = event.target.closest("[data-dashboard-guide]");
      if (guideButton) {
        event.preventDefault();
        const nextDashboardView = guideButton.dataset.dashboardGuide || "layouts";
        if (state.dashboard.view === nextDashboardView) {
          return;
        }
        state.dashboard.view = nextDashboardView;
        renderEditor(true);
        return;
      }

      const dashboardButton = event.target.closest("[data-dashboard-tab]");
      if (dashboardButton) {
        event.preventDefault();
        const nextDashboardTab = dashboardButton.dataset.dashboardTab;
        if (["faq", "table", "stories", "article", "carousel", "template"].includes(nextDashboardTab)) {
          currentEditorTab = nextDashboardTab;
          renderEditor();
        }
        return;
      }

      const responsiveModeButton = event.target.closest("[data-responsive-edit-device]");
      if (responsiveModeButton) {
        event.preventDefault();
        setResponsiveEditDevice(responsiveModeButton.dataset.responsiveEditDevice);
        return;
      }

      const button = event.target.closest("[data-action]");
      if (!button) {
        return;
      }

      const action = button.dataset.action;
      if (action.includes("story") || action.includes("article") || action.includes("carousel") || action.includes("template") || action.includes("responsive") || action.includes("preset")) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (action === "save-user-preset") {
        saveUserPreset();
        return;
      }

      if (action === "load-user-preset") {
        loadSelectedUserPreset();
        return;
      }

      if (action === "delete-user-preset") {
        deleteSelectedUserPreset();
        return;
      }

      if (action === "import-user-presets") {
        const input = editor.querySelector("[data-preset-import]");
        if (input) {
          input.click();
        }
        return;
      }

      if (action === "export-user-presets") {
        exportUserPresets();
        return;
      }

      if (action === "import-template-html") {
        const input = editor.querySelector("[data-template-import]");
        if (input) {
          input.click();
        }
        return;
      }

      if (action === "insert-template-layout") {
        insertSelectedTemplateLayout();
        return;
      }

      if (action === "clear-template-html") {
        clearTemplateHtml();
        return;
      }

      if (action === "save-template-html-cache") {
        saveTemplateHtmlCache();
        return;
      }

      if (action === "save-responsive") {
        saveResponsiveDraft();
        return;
      }

      if (action === "discard-responsive") {
        discardResponsiveDraft();
        return;
      }

      if (action === "remove-responsive-version") {
        removeResponsiveVersion();
        return;
      }

      const mutatingActions = [
        "remove",
        "fill-faq-bulk",
        "add-table-column",
        "remove-table-column",
        "add-table-row",
        "remove-table-row",
        "fill-table-bulk",
        "add-story-container",
        "remove-story-container",
        "add-story-slide",
        "remove-story-slide",
        "add-article-tab",
        "remove-article-tab",
        "add-carousel-slide",
        "remove-carousel-slide",
        "insert-template-layout",
        "clear-template-html",
        "save-template-html-cache"
      ];
      if (mutatingActions.includes(action)) {
        markResponsiveDirty();
      }

      if (action === "remove") {
        const itemElement = button.closest(".faq-editor__item");
        const index = Number(itemElement.dataset.index);
        state.items.splice(index, 1);

        if (state.items.length === 0) {
          state.items.push({ question: "", answer: "" });
        }

        renderEditor();
        return;
      }

      if (action === "fill-faq-bulk") {
        fillFromBulk();
      }

      if (action === "add-table-column") {
        addTableColumn();
      }

      if (action === "remove-table-column") {
        removeTableColumn(Number(button.dataset.columnIndex));
      }

      if (action === "add-table-row") {
        addTableRow();
      }

      if (action === "remove-table-row") {
        const rowElement = button.closest("[data-table-row]");
        removeTableRow(Number(rowElement.dataset.tableRow));
      }

      if (action === "fill-table-bulk") {
        fillTableFromBulk();
      }

      if (action === "add-story-container") {
        addStoryContainer();
      }

      if (action === "remove-story-container") {
        removeStoryContainer(Number(button.dataset.storyGroup));
      }

      if (action === "add-story-slide") {
        addStorySlide(Number(button.dataset.storyGroup));
      }

      if (action === "remove-story-slide") {
        removeStorySlide(Number(button.dataset.storyGroup), Number(button.dataset.storySlide));
      }

      if (action === "add-article-tab") {
        addArticleTab();
      }

      if (action === "remove-article-tab") {
        removeArticleTab(Number(button.dataset.articleTab));
      }

      if (action === "add-carousel-slide") {
        addCarouselSlide();
      }

      if (action === "remove-carousel-slide") {
        removeCarouselSlide(Number(button.dataset.carouselSlide));
      }
    });

    editorTabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const requestedTab = button.dataset.editorTab;
        const nextEditorTab = ["faq", "table", "stories", "article", "carousel", "template"].includes(requestedTab) ? requestedTab : "faq";
        if (nextEditorTab !== currentEditorTab && !returnToBaseVersion()) {
          return;
        }
        currentEditorTab = nextEditorTab;
        renderEditor();
      });
    });

    homeReturnButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        returnDashboardHome();
      });
    });
    pageLinks.forEach((link) => {
      if (link.dataset.pageLink !== "hub") {
        return;
      }

      link.addEventListener("click", (event) => {
        event.preventDefault();
        returnDashboardHome();
      });
    });
    if (brandHomeButton) {
      brandHomeButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (fixedStartPage === "conteudo") {
          returnDashboardHome();
          return;
        }
        if (fixedStartPage === "tecnica") {
          window.location.href = "index.html";
          return;
        }
        if (window.location.hash !== "#home") {
          window.location.hash = "#home";
        } else {
          applyPage("home");
        }
      });
    }

    addButtons.forEach((button) => {
      button.addEventListener("click", addCurrentItem);
    });
    [...htmlCopyButtons, ...fullCopyButtons].forEach((button) => {
      button.addEventListener("click", () => {
        copyGeneratedHtml(button.dataset.copyMode);
      });
    });
    previewFullscreenButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setPreviewFullscreen(!isPreviewFullscreen);
      });
    });
    focusModeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setFocusMode(!isFocusMode);
      });
    });
    codeFocusModeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setCodeFocusMode(!isCodeFocusMode);
      });
    });
    previewDeviceButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setPreviewDevice(button.dataset.previewDevice);
      });
    });
    responsivePreviewSaveButtons.forEach((button) => {
      button.addEventListener("click", () => {
        saveResponsivePreviewVersion();
      });
    });
    responsivePreviewRemoveButtons.forEach((button) => {
      button.addEventListener("click", () => {
        removeResponsivePreviewVersion();
      });
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isPreviewFullscreen) {
        setPreviewFullscreen(false);
        return;
      }

      if (event.key === "Escape" && isFocusMode) {
        setFocusMode(false);
        return;
      }

      if (event.key === "Escape" && isCodeFocusMode) {
        setCodeFocusMode(false);
      }
    });
    window.addEventListener("hashchange", () => {
      applyPage(getPageFromHash());
    });
    if (themeToggle) {
      themeToggle.addEventListener("change", () => {
        setTheme(themeToggle.checked ? "dark" : "light");
        updateOutput();
      });
    }
    if (homeThemeToggle) {
      homeThemeToggle.addEventListener("change", () => {
        setTheme(homeThemeToggle.checked ? "dark" : "light");
        updateOutput();
      });
    }
    window.addEventListener("resize", updateViewportMode);
    window.addEventListener("beforeunload", (event) => {
      if (!state.responsive.dirty && !state.presets.dirty) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    });

    updateViewportMode();
    updatePreviewDeviceUi();
    updateCodeFocusModeButtons();
    loadUserPresets();
    loadTemplateHtmlCache();
    setTheme(getInitialTheme());
    applyPage(getPageFromHash());
