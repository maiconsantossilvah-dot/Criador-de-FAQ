/**
 * Modulo oficial da aba Artigo.
 * Carregado antes de assets/js/layout-lab.js.
 * Este arquivo contem a logica que antes ficava direto no motor central.
 */

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

      return injectTabDynamicStyle(getTabStyleAsset("article", articleStyle), "__ARTICLE_DYNAMIC_COLORS__", `
  .ll-article {
    --ll-article-shell-bg: ${shellBackground};
    --ll-article-tabs-panel: ${tabsPanel};
    --ll-article-overlay-strong: ${strong};
    --ll-article-overlay-medium: ${medium};
    --ll-article-overlay-soft: ${soft};
  }`);
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
