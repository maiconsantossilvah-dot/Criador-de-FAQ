/**
 * SenkoBridge experimental tab.
 * Carrega os layouts publicos do SenkoLib e monta uma LP para transferencia.
 */

const SENKO_BRIDGE_CDN_ROOT = "https://cdn.jsdelivr.net/gh/YgorMartins-webm/SenkoLib@main/app/features/biblioteca/";
const SENKO_BRIDGE_PAGE_ROOT = "https://ygormartins-webm.github.io/SenkoLib/";
const SENKO_BRIDGE_SCRIPT_TIMEOUT_MS = 8000;

function ensureSenkoBridgeState() {
  state.senkoBridge = {
    loading: false,
    loaded: false,
    error: "",
    status: "",
    query: "",
    selectedVariants: {},
    layouts: [],
    variantsById: {},
    blocks: [],
    ...(state.senkoBridge || {})
  };
  return state.senkoBridge;
}

function cloneSenkoBridgeValue(value) {
  return value ? JSON.parse(JSON.stringify(value)) : value;
}

function getSenkoBridgeLocalData() {
  const localData = window.LayoutLabSenkoLocalData;
  if (!localData || !Array.isArray(localData.layouts)) {
    return null;
  }

  return {
    layouts: cloneSenkoBridgeValue(localData.layouts) || [],
    variantsById: cloneSenkoBridgeValue(localData.variantsById) || {},
    source: localData.source || "bundle local"
  };
}

function applySenkoBridgeData(payload, sourceLabel = "SenkoLib") {
  const bridge = ensureSenkoBridgeState();
  bridge.layouts = Array.isArray(payload.layouts) ? payload.layouts : [];
  bridge.variantsById = payload.variantsById || {};
  bridge.loaded = true;
  bridge.error = "";
  bridge.status = `${bridge.layouts.length} layouts carregados (${sourceLabel}).`;
}

function senkoBridgeLoadScript(src) {
  return new Promise((resolve, reject) => {
    const previous = document.querySelector(`script[data-senko-bridge-src="${src}"]`);
    if (previous) {
      previous.remove();
    }

    const script = document.createElement("script");
    let settled = false;
    const timeoutId = window.setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      script.remove();
      reject(new Error(`Tempo esgotado carregando ${src}`));
    }, SENKO_BRIDGE_SCRIPT_TIMEOUT_MS);

    script.src = src;
    script.async = false;
    script.dataset.senkoBridgeSrc = src;
    script.onload = () => {
      if (settled) {
        return;
      }

      settled = true;
      window.clearTimeout(timeoutId);
      resolve(src);
    };
    script.onerror = () => {
      if (settled) {
        return;
      }

      settled = true;
      window.clearTimeout(timeoutId);
      reject(new Error(`Nao consegui carregar ${src}`));
    };
    document.head.appendChild(script);
  });
}

async function loadSenkoBridgeLibrary(force = false) {
  const bridge = ensureSenkoBridgeState();
  if (bridge.loading || (bridge.loaded && !force)) {
    return;
  }

  const localData = getSenkoBridgeLocalData();
  if (!force && localData) {
    applySenkoBridgeData(localData, "bundle local");
    if (typeof renderEditor === "function") {
      renderEditor(true);
    }
    return;
  }

  bridge.loading = true;
  bridge.error = "";
  bridge.status = force ? "Atualizando pelo SenkoLib..." : "Carregando layouts do SenkoLib...";
  if (typeof renderEditor === "function") {
    renderEditor(true);
  }

  try {
    delete window.SenkoLib;
    delete window.SenkoBibliotecaManifest;

    await senkoBridgeLoadScript(`${SENKO_BRIDGE_CDN_ROOT}scripts/senkolib-core.js`);
    await senkoBridgeLoadScript(`${SENKO_BRIDGE_CDN_ROOT}data/manifest.js`);

    const manifest = window.SenkoBibliotecaManifest;
    if (!manifest || !Array.isArray(manifest.layouts)) {
      throw new Error("Manifesto do SenkoLib nao trouxe layouts.");
    }

    for (const path of manifest.layouts) {
      await senkoBridgeLoadScript(`${SENKO_BRIDGE_CDN_ROOT}data/${path}`);
    }

    for (const path of manifest.variants || []) {
      await senkoBridgeLoadScript(`${SENKO_BRIDGE_CDN_ROOT}data/${path}`);
    }

    const layouts = window.SenkoLib && typeof window.SenkoLib.getAll === "function" ? window.SenkoLib.getAll() : [];
    const variantsById = {};
    layouts.forEach((layout) => {
      variantsById[layout.id] = window.SenkoLib.getVariants(layout.id) || [];
    });
    applySenkoBridgeData({ layouts, variantsById }, "CDN SenkoLib");
  } catch (error) {
    const fallbackData = getSenkoBridgeLocalData();
    if (fallbackData) {
      applySenkoBridgeData(fallbackData, "fallback local");
      bridge.status = `${bridge.layouts.length} layouts carregados pelo fallback local.`;
    } else {
      bridge.error = error.message || "Nao foi possivel carregar o SenkoLib.";
      bridge.status = bridge.error;
    }
  } finally {
    bridge.loading = false;
    if (typeof renderEditor === "function") {
      renderEditor(true);
    }
  }
}

function normalizeSenkoCss(css) {
  return String(css || "")
    .replace(/<style[^>]*>/gi, "")
    .replace(/<\/style>/gi, "")
    .trim();
}

function normalizeSenkoHtml(html) {
  return String(html || "").trim();
}

function fixSenkoRelativeUrls(value) {
  return String(value || "")
    .replace(/(src|href)=["'](?!https?:|data:|#|mailto:|tel:|\/)([^"']+)["']/gi, (match, attr, url) => {
      return `${attr}="${new URL(url, SENKO_BRIDGE_PAGE_ROOT).href}"`;
    })
    .replace(/url\((['"]?)(?!https?:|data:|#|\/)([^'")]+)\1\)/gi, (match, quote, url) => {
      return `url("${new URL(url, SENKO_BRIDGE_PAGE_ROOT).href}")`;
    });
}

function senkoBridgeEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getSenkoBridgeLayout(layoutId) {
  const bridge = ensureSenkoBridgeState();
  return bridge.layouts.find((layout) => layout.id === layoutId);
}

function getSenkoBridgeSelectedEntry(layoutId) {
  const bridge = ensureSenkoBridgeState();
  const layout = getSenkoBridgeLayout(layoutId);
  if (!layout) {
    return null;
  }

  const variantIndex = Number(bridge.selectedVariants[layoutId] ?? -1);
  const variants = bridge.variantsById[layoutId] || [];
  const variant = variantIndex >= 0 ? variants[variantIndex] : null;
  return {
    sourceId: layout.id,
    name: layout.name || layout.id,
    variantName: variant ? (variant.name || `Variante ${variantIndex + 1}`) : "Base do layout",
    html: variant ? variant.html : layout.html,
    css: variant ? variant.css : layout.css,
    tags: layout.tags || []
  };
}

function getSenkoBridgeFilteredLayouts() {
  const bridge = ensureSenkoBridgeState();
  const query = String(bridge.query || "").trim().toLowerCase();
  if (!query) {
    return bridge.layouts;
  }

  return bridge.layouts.filter((layout) => {
    return [
      layout.id,
      layout.name,
      ...(layout.tags || [])
    ].join(" ").toLowerCase().includes(query);
  });
}

function buildSenkoBridgeBaseCss() {
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
.senko-empty-preview {
  min-height: 560px;
  display: grid;
  place-items: center;
  padding: 44px;
  color: #526173;
  text-align: center;
  background: #fff;
}
.senko-preview-block {
  position: relative;
}
.senko-preview-remove {
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
.senko-preview-block:hover > .senko-preview-remove,
.senko-preview-block:focus-within > .senko-preview-remove {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}
`;
}

function getSenkoBridgeStackKey(block) {
  const tags = Array.isArray(block.tags) ? block.tags.join(" ") : "";
  const haystack = [
    block.sourceId,
    block.name,
    block.variantName,
    tags,
    block.html,
    block.css
  ].join(" ").toLowerCase();

  if (/section[-_\s]*32|secao[-_\s]*32|sessao[-_\s]*32|groupimage|group-image|grouptext|group-text/.test(haystack)) {
    return "section32";
  }

  return "";
}

function hasSenkoBridgeStackGroup(blocks = ensureSenkoBridgeState().blocks) {
  let previousKey = "";
  for (const block of blocks) {
    const key = getSenkoBridgeStackKey(block);
    if (key && key === previousKey) {
      return true;
    }
    previousKey = key;
  }
  return false;
}

function hasSenkoBridgeStackableBlock(blocks = ensureSenkoBridgeState().blocks) {
  return blocks.some((block) => Boolean(getSenkoBridgeStackKey(block)));
}

function buildSenkoBridgeStackCss() {
  return `
:is(.section-32, .section-32-container, .section-32__container, .section-32__groupimage-section, .c32-carousel, .c32-slides, .c32-slide) {
  border: 0 !important;
  outline: 0 !important;
}
:is(.section-32, .section-32-container, .section-32__container, .section-32__groupimage-section, .c32-carousel, .c32-slides, .c32-slide) {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
:is(.section-32__groupimage-section, .section-32__groupimage-section picture, .c32-slide picture) {
  display: block !important;
  line-height: 0 !important;
}
:is(.section-32__groupimage-section img, .c32-slide img) {
  display: block !important;
  width: 100% !important;
  min-width: 100% !important;
  border: 0 !important;
  outline: 0 !important;
}
.senko-section-stack {
  display: grid;
  gap: 0;
  overflow: hidden;
}
.senko-section-stack > * {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.senko-section-stack--section32 > :is(section, article, div),
.senko-section-stack--section32 > .senko-section-stack__item > :is(section, article, div):first-child {
  max-width: none !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.senko-section-stack--section32 :is(.section-32, .section-32-container, .section-32__container) {
  border: 0 !important;
}
.senko-section-stack--section32 .senko-preview-block {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  outline: 0 !important;
  background: transparent !important;
}
.senko-section-stack--section32 > :not(:first-child),
.senko-section-stack--section32 > :not(:first-child) :is(section, article, div, figure, picture, img, .section-32, .section-32-container, .section-32__container, .section-32__groupimage-section),
.senko-section-stack--section32 > .senko-section-stack__item:not(:first-child),
.senko-section-stack--section32 > .senko-section-stack__item:not(:first-child) > :is(section, article, div):first-child,
.senko-section-stack--section32 > .senko-section-stack__item:not(:first-child) :is(section, article, div, figure, picture, img, .section-32, .section-32-container, .section-32__container, .section-32__groupimage-section) {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.senko-section-stack--section32 > :not(:last-child),
.senko-section-stack--section32 > :not(:last-child) :is(section, article, div, figure, picture, img, .section-32, .section-32-container, .section-32__container, .section-32__groupimage-section),
.senko-section-stack--section32 > .senko-section-stack__item:not(:last-child),
.senko-section-stack--section32 > .senko-section-stack__item:not(:last-child) > :is(section, article, div):first-child,
.senko-section-stack--section32 > .senko-section-stack__item:not(:last-child) :is(section, article, div, figure, picture, img, .section-32, .section-32-container, .section-32__container, .section-32__groupimage-section) {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.senko-section-stack--section32 > .senko-section-stack__item {
  display: block;
}
`;
}

function buildSenkoBridgeCssBundle() {
  const bridge = ensureSenkoBridgeState();
  const cssParts = bridge.blocks
    .map((block) => `/* ${block.name} - ${block.variantName} */\n${normalizeSenkoCss(block.css)}`)
    .filter((part) => part.trim())
  if (hasSenkoBridgeStackableBlock(bridge.blocks)) {
    cssParts.push(buildSenkoBridgeStackCss());
  }
  return cssParts.join("\n\n");
}

function buildSenkoBridgeHtmlBundle() {
  const bridge = ensureSenkoBridgeState();
  const parts = [];
  let group = [];
  let groupKey = "";

  const renderBlock = (block) => `<!-- ${block.name} - ${block.variantName} -->\n${normalizeSenkoHtml(block.html)}`.trim();
  const flushGroup = () => {
    if (!group.length) {
      return;
    }
    const html = group.map(renderBlock).join("\n\n");
    parts.push(group.length > 1 ? `<div class="senko-section-stack senko-section-stack--${groupKey}">\n${html}\n</div>` : html);
    group = [];
    groupKey = "";
  };

  bridge.blocks.forEach((block) => {
    const key = getSenkoBridgeStackKey(block);
    if (!key) {
      flushGroup();
      parts.push(renderBlock(block));
      return;
    }

    if (group.length && groupKey !== key) {
      flushGroup();
    }

    groupKey = key;
    group.push(block);
  });

  flushGroup();
  return parts.filter((part) => part.trim()).join("\n\n");
}

function buildSenkoBridgeOutputHtml(copyMode = "html") {
  const css = fixSenkoRelativeUrls(buildSenkoBridgeCssBundle());
  const html = fixSenkoRelativeUrls(buildSenkoBridgeHtmlBundle());

  if (copyMode === "css") {
    return css;
  }

  if (copyMode === "full") {
    return `<style>\n${css}\n</style>\n\n<div class="lp-container">\n${html}\n</div>`;
  }

  return `<div class="lp-container">\n${html}\n</div>`;
}

function buildSenkoBridgeTransferHtml() {
  const css = fixSenkoRelativeUrls(buildSenkoBridgeCssBundle());
  const html = fixSenkoRelativeUrls(buildSenkoBridgeHtmlBundle());
  return `<style>\n${css}\n</style>\n\n${html}`.trim();
}

function buildSenkoBridgePreviewBlocksHtml() {
  const bridge = ensureSenkoBridgeState();
  const parts = [];
  let group = [];
  let groupKey = "";

  const renderPreviewBlock = (block, index, isGrouped = false) => {
    return `<section class="senko-preview-block${isGrouped ? " senko-section-stack__item" : ""}" data-senko-preview-block="${index}">
  <button class="senko-preview-remove" type="button" data-senko-preview-remove="${index}" aria-label="Remover ${senkoBridgeEscape(block.name)}">&times;</button>
${fixSenkoRelativeUrls(normalizeSenkoHtml(block.html))}
</section>`;
  };

  const flushGroup = () => {
    if (!group.length) {
      return;
    }
    if (group.length > 1) {
      parts.push(`<div class="senko-section-stack senko-section-stack--${groupKey}">\n${group.map((item) => renderPreviewBlock(item.block, item.index, true)).join("\n")}\n</div>`);
    } else {
      parts.push(renderPreviewBlock(group[0].block, group[0].index));
    }
    group = [];
    groupKey = "";
  };

  bridge.blocks.forEach((block, index) => {
    const key = getSenkoBridgeStackKey(block);
    if (!key) {
      flushGroup();
      parts.push(renderPreviewBlock(block, index));
      return;
    }

    if (group.length && groupKey !== key) {
      flushGroup();
    }

    groupKey = key;
    group.push({ block, index });
  });

  flushGroup();
  return parts.join("\n\n");
}

function buildSenkoBridgePreviewHtml() {
  const css = fixSenkoRelativeUrls(buildSenkoBridgeCssBundle());
  const html = buildSenkoBridgePreviewBlocksHtml();
  const content = html
    ? `<div class="lp-container">${html}</div>`
    : '<div class="senko-empty-preview"><strong>Quadro vazio.</strong><br>Adicione layouts do SenkoLib pela coluna da esquerda.</div>';

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
${buildSenkoBridgeBaseCss()}
${css}
  </style>
</head>
<body>
${content}
<script>
document.addEventListener("click", function(event) {
  var button = event.target.closest("[data-senko-preview-remove]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  parent.postMessage({
    type: "layout-lab:senko-remove-preview-block",
    index: Number(button.getAttribute("data-senko-preview-remove"))
  }, "*");
});
</script>
</body>
</html>`;
}

function buildSenkoBridgeMiniSrcdoc(entry) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
html, body { margin: 0; background: #fff; overflow: hidden; font-family: Arial, sans-serif; }
body { width: 760px; min-height: 430px; transform-origin: top left; }
.lp-container { width: 100%; background: #fff; overflow: hidden; }
${fixSenkoRelativeUrls(normalizeSenkoCss(entry.css))}
  </style>
</head>
<body>
<div class="lp-container">
${fixSenkoRelativeUrls(normalizeSenkoHtml(entry.html))}
</div>
</body>
</html>`;
}

function getSenkoBridgeScrollSnapshot() {
  return [
    "#faqEditor",
    ".editor-panel .panel__body",
    ".senko-bridge-list",
    ".senko-builder__stack"
  ].map((selector) => {
    const element = document.querySelector(selector);
    if (!element) {
      return null;
    }
    return {
      selector,
      top: element.scrollTop,
      left: element.scrollLeft
    };
  }).filter(Boolean);
}

function restoreSenkoBridgeScrollSnapshot(snapshot) {
  window.requestAnimationFrame(() => {
    snapshot.forEach((item) => {
      const element = document.querySelector(item.selector);
      if (!element) {
        return;
      }
      element.scrollTop = item.top;
      element.scrollLeft = item.left;
    });
  });
}

function renderSenkoBridgeAfterMutation() {
  const scrollSnapshot = getSenkoBridgeScrollSnapshot();
  renderEditor(true);
  restoreSenkoBridgeScrollSnapshot(scrollSnapshot);
}

function renderSenkoBridgeEditor() {
  const bridge = ensureSenkoBridgeState();
  if (!bridge.loaded && !bridge.loading && !bridge.error) {
    window.setTimeout(() => loadSenkoBridgeLibrary(), 0);
  }

  const layouts = getSenkoBridgeFilteredLayouts();
  const cards = layouts.map((layout) => {
    const variants = bridge.variantsById[layout.id] || [];
    const entry = getSenkoBridgeSelectedEntry(layout.id) || layout;
    const variantOptions = [
      `<option value="-1">Base do layout</option>`,
      ...variants.map((variant, index) => `<option value="${index}"${String(bridge.selectedVariants[layout.id] ?? "-1") === String(index) ? " selected" : ""}>${senkoBridgeEscape(variant.name || `Variante ${index + 1}`)}</option>`)
    ].join("");

    return `<article class="senko-layout-card" draggable="true" data-senko-layout-card="${senkoBridgeEscape(layout.id)}" title="Clique ou arraste para adicionar">
      <button class="senko-layout-card__add" type="button" data-action="add-senko-layout" data-senko-layout="${senkoBridgeEscape(layout.id)}" aria-label="Adicionar ${senkoBridgeEscape(layout.name || layout.id)}">+</button>
      <div class="senko-layout-card__preview" role="button" tabindex="0" data-action="add-senko-layout" data-senko-layout="${senkoBridgeEscape(layout.id)}" aria-label="Adicionar ${senkoBridgeEscape(layout.name || layout.id)}">
        <iframe title="Miniatura de ${senkoBridgeEscape(layout.name || layout.id)}" srcdoc="${senkoBridgeEscape(buildSenkoBridgeMiniSrcdoc(entry))}"></iframe>
      </div>
      <div class="senko-layout-card__body">
        <strong>${senkoBridgeEscape(layout.name || layout.id)}</strong>
        ${variants.length ? `<select class="senko-layout-card__variant" data-senko-variant="${senkoBridgeEscape(layout.id)}" aria-label="Variante de ${senkoBridgeEscape(layout.name || layout.id)}">${variantOptions}</select>` : `<small>Base do layout</small>`}
      </div>
    </article>`;
  }).join("");

  const stack = bridge.blocks.length ? bridge.blocks.map((block, index) => {
    return `<article class="senko-builder-item">
      <div>
        <strong>${index + 1}. ${senkoBridgeEscape(block.name)}</strong>
        <small>${senkoBridgeEscape(block.variantName)}</small>
      </div>
      <div class="senko-builder-item__actions">
        <button class="button button--soft" type="button" data-action="move-senko-block-up" data-senko-block="${index}" aria-label="Subir">↑</button>
        <button class="button button--soft" type="button" data-action="move-senko-block-down" data-senko-block="${index}" aria-label="Descer">↓</button>
        <button class="button button--soft" type="button" data-action="duplicate-senko-block" data-senko-block="${index}" aria-label="Duplicar">⧉</button>
        <button class="button button--danger senko-builder-item__remove" type="button" data-action="remove-senko-block" data-senko-block="${index}" aria-label="Remover">Remover</button>
      </div>
    </article>`;
  }).join("") : '<div class="senko-builder__empty">Clique na miniatura, use o botão + ou arraste um layout para a prévia.</div>';

  return `<section class="senko-bridge-editor" aria-label="SenkoBridge">
    <div class="senko-bridge-card">
      <label class="senko-bridge-search">
        <span>Buscar layout</span>
        <input type="search" data-senko-query value="${senkoBridgeEscape(bridge.query)}" placeholder="Header, carrossel, FAQ...">
      </label>
      <div class="senko-bridge-list">
        ${bridge.loading ? '<div class="senko-builder__empty">Carregando...</div>' : cards || '<div class="senko-builder__empty">Nenhum layout encontrado.</div>'}
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

function addSenkoBridgeLayout(layoutId) {
  const bridge = ensureSenkoBridgeState();
  const entry = getSenkoBridgeSelectedEntry(layoutId);
  if (!entry) {
    return;
  }

  bridge.blocks.push({
    uid: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...entry
  });
  bridge.status = `${entry.name} adicionado na montagem.`;
  renderSenkoBridgeAfterMutation();
}

function previewSenkoBridgeLayout(layoutId) {
  const bridge = ensureSenkoBridgeState();
  const entry = getSenkoBridgeSelectedEntry(layoutId);
  if (!entry) {
    return;
  }

  bridge.status = `Previa temporaria: ${entry.name}. Use + para fixar na montagem.`;
  const previousBlocks = bridge.blocks;
  bridge.blocks = [{ uid: "preview", ...entry }];
  updateOutput();
  bridge.blocks = previousBlocks;
  renderSenkoBridgeAfterMutation();
}

function moveSenkoBridgeBlock(index, direction) {
  const bridge = ensureSenkoBridgeState();
  const next = index + direction;
  if (next < 0 || next >= bridge.blocks.length) {
    return;
  }

  const [block] = bridge.blocks.splice(index, 1);
  bridge.blocks.splice(next, 0, block);
  renderSenkoBridgeAfterMutation();
}

function duplicateSenkoBridgeBlock(index) {
  const bridge = ensureSenkoBridgeState();
  const block = bridge.blocks[index];
  if (!block) {
    return;
  }

  bridge.blocks.splice(index + 1, 0, {
    ...block,
    uid: `${Date.now()}-${Math.random().toString(16).slice(2)}`
  });
  renderSenkoBridgeAfterMutation();
}

function removeSenkoBridgeBlock(index) {
  const bridge = ensureSenkoBridgeState();
  if (!Number.isInteger(Number(index)) || Number(index) < 0 || Number(index) >= bridge.blocks.length) {
    return;
  }
  bridge.blocks.splice(index, 1);
  renderSenkoBridgeAfterMutation();
}
