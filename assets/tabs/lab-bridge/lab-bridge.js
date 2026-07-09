/**
 * LabBridge.
 * Monta uma LP usando os layouts internos do proprio Layout Lab.
 */

function ensureLabBridgeState() {
  state.labBridge = {
    query: "",
    status: "",
    blocks: [],
    ...(state.labBridge || {})
  };
  return state.labBridge;
}

function labBridgeEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeLabBridgeCss(css) {
  return String(css || "")
    .replace(/<style[^>]*>/gi, "")
    .replace(/<\/style>/gi, "")
    .trim();
}

function normalizeLabBridgeHtml(html) {
  return String(html || "").trim();
}

function getLabBridgeLayouts() {
  const definitions = [
    {
      id: "faq",
      name: "FAQ",
      summary: "Perguntas e respostas",
      tags: ["faq", "duvidas", "perguntas"],
      html: typeof buildFaqSectionHtml === "function" ? buildFaqSectionHtml() : "",
      css: typeof buildTabStyleWithClass === "function" ? buildTabStyleWithClass("faq", buildFaqStyle) : ""
    },
    {
      id: "table",
      name: "Tabela",
      summary: "Produtos, SKUs e listas",
      tags: ["tabela", "sku", "produtos"],
      html: typeof buildTableSectionHtml === "function" ? buildTableSectionHtml(true) : "",
      css: typeof buildTabStyleWithClass === "function" ? buildTabStyleWithClass("table", buildTableStyle) : ""
    },
    {
      id: "stories",
      name: "Stories",
      summary: "Containers e slides",
      tags: ["stories", "bolinhas", "slides"],
      html: typeof buildStoriesSectionHtml === "function" ? buildStoriesSectionHtml() : "",
      css: typeof buildTabStyleWithClass === "function" ? buildTabStyleWithClass("stories", buildStoriesStyle) : ""
    },
    {
      id: "article",
      name: "Artigo",
      summary: "Blocos com abas",
      tags: ["artigo", "abas", "background"],
      html: typeof buildArticleSectionHtml === "function" ? buildArticleSectionHtml() : "",
      css: typeof buildTabStyleWithClass === "function" ? buildTabStyleWithClass("article", buildArticleStyle) : ""
    },
    {
      id: "carousel",
      name: "Carrossel",
      summary: "Slides de impacto",
      tags: ["carrossel", "slides", "impacto"],
      html: typeof buildCarouselSectionHtml === "function" ? buildCarouselSectionHtml() : "",
      css: typeof buildTabStyleWithClass === "function" ? buildTabStyleWithClass("carousel", buildCarouselStyle) : ""
    },
    {
      id: "bento",
      name: "Bento",
      summary: "Grade visual de cards",
      tags: ["bento", "grid", "cards"],
      html: typeof buildBentoSectionHtml === "function" ? buildBentoSectionHtml() : "",
      css: typeof buildTabStyleWithClass === "function" ? buildTabStyleWithClass("bento", buildBentoStyle) : ""
    }
  ];

  return definitions.filter((layout) => layout.html || layout.css);
}

function getLabBridgeLayout(layoutId) {
  return getLabBridgeLayouts().find((layout) => layout.id === layoutId);
}

function getLabBridgeFilteredLayouts() {
  const bridge = ensureLabBridgeState();
  const query = String(bridge.query || "").trim().toLowerCase();
  const layouts = getLabBridgeLayouts();
  if (!query) {
    return layouts;
  }

  return layouts.filter((layout) => [
    layout.id,
    layout.name,
    layout.summary,
    ...(layout.tags || [])
  ].join(" ").toLowerCase().includes(query));
}

function buildLabBridgeBaseCss() {
  return `
html, body {
  min-height: 100%;
  margin: 0;
  background: #f5f7fb;
  font-family: Arial, Helvetica, sans-serif;
}
.lp-container {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  overflow: hidden;
}
.lp-container *,
.lp-container *::before,
.lp-container *::after {
  box-sizing: border-box;
}
.labbridge-empty-preview {
  min-height: 560px;
  display: grid;
  place-items: center;
  padding: 44px;
  color: #526173;
  text-align: center;
  background: #fff;
}
.labbridge-preview-block {
  position: relative;
}
.labbridge-preview-remove {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2147483000;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: #fff;
  background: #ef2525;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  font: 900 21px/1 Arial, sans-serif;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px) scale(0.94);
  transition: opacity 0.16s ease, transform 0.16s ease;
}
.labbridge-preview-block:hover > .labbridge-preview-remove,
.labbridge-preview-block:focus-within > .labbridge-preview-remove {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}
`;
}

function buildLabBridgeMiniSrcdoc(entry) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
html, body { margin: 0; background: #fff; overflow: hidden; font-family: Arial, sans-serif; }
body { width: 760px; min-height: 430px; transform-origin: top left; }
.lp-container { width: 100%; background: #fff; overflow: hidden; }
${normalizeLabBridgeCss(entry.css)}
  </style>
</head>
<body>
<div class="lp-container">
${normalizeLabBridgeHtml(entry.html)}
</div>
</body>
</html>`;
}

function buildLabBridgeLayoutCardsHtml(layouts = getLabBridgeFilteredLayouts()) {
  return layouts.map((layout) => `<article class="senko-layout-card labbridge-layout-card" draggable="true" data-lab-layout-card="${labBridgeEscape(layout.id)}" title="Clique ou arraste para adicionar">
      <button class="senko-layout-card__add" type="button" data-action="add-lab-layout" data-lab-layout="${labBridgeEscape(layout.id)}" aria-label="Adicionar ${labBridgeEscape(layout.name)}">+</button>
      <div class="senko-layout-card__preview" role="button" tabindex="0" data-action="add-lab-layout" data-lab-layout="${labBridgeEscape(layout.id)}" aria-label="Adicionar ${labBridgeEscape(layout.name)}">
        <iframe title="Miniatura de ${labBridgeEscape(layout.name)}" srcdoc="${labBridgeEscape(buildLabBridgeMiniSrcdoc(layout))}"></iframe>
      </div>
      <div class="senko-layout-card__body">
        <strong>${labBridgeEscape(layout.name)}</strong>
        <small>${labBridgeEscape(layout.summary)}</small>
      </div>
    </article>`).join("");
}

function refreshLabBridgeLayoutList() {
  const list = document.querySelector("[data-lab-bridge-list]");
  if (!list) {
    return false;
  }

  const cards = buildLabBridgeLayoutCardsHtml(getLabBridgeFilteredLayouts());
  list.innerHTML = cards || '<div class="senko-builder__empty">Nenhum layout encontrado.</div>';
  return true;
}

function renderLabBridgeEditor() {
  const bridge = ensureLabBridgeState();
  const cards = buildLabBridgeLayoutCardsHtml();
  const stack = bridge.blocks.length ? bridge.blocks.map((block, index) => `<article class="senko-builder-item">
      <div>
        <strong>${index + 1}. ${labBridgeEscape(block.name)}</strong>
        <small>${labBridgeEscape(block.summary)}</small>
      </div>
      <div class="senko-builder-item__actions">
        <button class="button button--soft" type="button" data-action="move-lab-block-up" data-lab-block="${index}" aria-label="Subir">↑</button>
        <button class="button button--soft" type="button" data-action="move-lab-block-down" data-lab-block="${index}" aria-label="Descer">↓</button>
        <button class="button button--soft" type="button" data-action="duplicate-lab-block" data-lab-block="${index}" aria-label="Duplicar">⧉</button>
        <button class="button button--danger senko-builder-item__remove" type="button" data-action="remove-lab-block" data-lab-block="${index}" aria-label="Remover">Remover</button>
      </div>
    </article>`).join("") : '<div class="senko-builder__empty">Clique na miniatura ou arraste um layout para a previa.</div>';

  return `<section class="senko-bridge-editor labbridge-editor" aria-label="LabBridge">
    <div class="senko-bridge-card">
      <label class="senko-bridge-search">
        <span>Buscar layout do Lab</span>
        <input type="search" data-lab-query value="${labBridgeEscape(bridge.query)}" placeholder="FAQ, tabela, stories...">
      </label>
      <div class="senko-bridge-list" data-lab-bridge-list>
        ${cards || '<div class="senko-builder__empty">Nenhum layout encontrado.</div>'}
      </div>
    </div>

    <div class="senko-builder">
      <div class="senko-builder__head">
        <div>
          <h3>Montagem</h3>
          <p>${bridge.blocks.length} bloco${bridge.blocks.length === 1 ? "" : "s"} na LP.</p>
        </div>
      </div>
      <div class="senko-builder__stack">
        ${stack}
      </div>
    </div>
  </section>`;
}

function addLabBridgeLayout(layoutId) {
  const bridge = ensureLabBridgeState();
  const layout = getLabBridgeLayout(layoutId);
  if (!layout) {
    return;
  }

  bridge.blocks.push({
    uid: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...layout
  });
  bridge.status = `${layout.name} adicionado na montagem.`;
  if (typeof renderEditor === "function") {
    renderEditor(true);
  }
}

function moveLabBridgeBlock(index, direction) {
  const bridge = ensureLabBridgeState();
  const next = index + direction;
  if (next < 0 || next >= bridge.blocks.length) {
    return;
  }

  const [block] = bridge.blocks.splice(index, 1);
  bridge.blocks.splice(next, 0, block);
  renderEditor(true);
}

function duplicateLabBridgeBlock(index) {
  const bridge = ensureLabBridgeState();
  const block = bridge.blocks[index];
  if (!block) {
    return;
  }

  bridge.blocks.splice(index + 1, 0, {
    ...block,
    uid: `${Date.now()}-${Math.random().toString(16).slice(2)}`
  });
  renderEditor(true);
}

function removeLabBridgeBlock(index) {
  const bridge = ensureLabBridgeState();
  const blockIndex = Number(index);
  if (!Number.isInteger(blockIndex) || blockIndex < 0 || blockIndex >= bridge.blocks.length) {
    return;
  }

  bridge.blocks.splice(blockIndex, 1);
  renderEditor(true);
}

function buildLabBridgeCssBundle() {
  const bridge = ensureLabBridgeState();
  return bridge.blocks
    .map((block) => `/* ${block.name} */\n${normalizeLabBridgeCss(block.css)}`)
    .filter((part) => part.trim())
    .join("\n\n");
}

function buildLabBridgeHtmlBundle() {
  const bridge = ensureLabBridgeState();
  return bridge.blocks
    .map((block) => `<!-- ${block.name} -->\n${normalizeLabBridgeHtml(block.html)}`.trim())
    .filter((part) => part.trim())
    .join("\n\n");
}

function buildLabBridgeOutputHtml(copyMode = "html") {
  const css = buildLabBridgeCssBundle();
  const html = buildLabBridgeHtmlBundle();

  if (copyMode === "css") {
    return css;
  }

  if (copyMode === "full") {
    return `<style>\n${css}\n</style>\n\n<div class="lp-container">\n${html}\n</div>`;
  }

  return `<div class="lp-container">\n${html}\n</div>`;
}

function buildLabBridgeTransferHtml() {
  const css = buildLabBridgeCssBundle();
  const html = buildLabBridgeHtmlBundle();
  return `<style>\n${css}\n</style>\n\n${html}`.trim();
}

function buildLabBridgePreviewBlocksHtml() {
  const bridge = ensureLabBridgeState();
  return bridge.blocks.map((block, index) => `<section class="labbridge-preview-block" data-lab-preview-block="${index}">
  <button class="labbridge-preview-remove" type="button" data-lab-preview-remove="${index}" aria-label="Remover ${labBridgeEscape(block.name)}">&times;</button>
${normalizeLabBridgeHtml(block.html)}
</section>`).join("\n\n");
}

function buildLabBridgePreviewHtml() {
  const css = buildLabBridgeCssBundle();
  const html = buildLabBridgePreviewBlocksHtml();
  const content = html
    ? `<div class="lp-container">${html}</div>`
    : '<div class="labbridge-empty-preview"><strong>Quadro vazio.</strong><br>Adicione layouts do proprio Layout Lab pela coluna da esquerda.</div>';

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
${buildLabBridgeBaseCss()}
${css}
  </style>
</head>
<body>
${content}
<script>
document.addEventListener("click", function(event) {
  var button = event.target.closest("[data-lab-preview-remove]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  parent.postMessage({
    type: "layout-lab:lab-remove-preview-block",
    index: Number(button.getAttribute("data-lab-preview-remove"))
  }, "*");
});
</script>
</body>
</html>`;
}
