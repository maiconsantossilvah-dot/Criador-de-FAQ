(function () {
  "use strict";

  const STORAGE_KEY = "layout-lab:lp-board-artboards:v5";
  const THEME_STORAGE_KEY = "layout-lab:lp-board-theme:v3";
  const DEFAULT_THEME = { primary: "#ff8a35", secondary: "#091525", contrast: "#eaf1ff", grid: "#7898be", gridSize: 28 };
  const DEFAULT_WINDOW_THEME = { header: "#211736", surface: "#171124", border: "#9b73ff", active: "#ff8a35", text: "#f8f4ff", radius: 10, shadow: 0.42 };
  const DEFAULT_ARTBOARDS = [
    { key: "desktop", label: "Desktop", detail: "1280 px", width: 1280, height: 820, x: 1905, y: 265 },
    { key: "notebook", label: "Notebook", detail: "1024 px", width: 1024, height: 740, x: 3355, y: 265 },
    { key: "tablet", label: "Tablet", detail: "768 px", width: 768, height: 1024, x: 1905, y: 1233 },
    { key: "mobile", label: "Celular", detail: "390 px", width: 390, height: 844, x: 2825, y: 1233 }
  ];
  const MIN_ZOOM = 0.18;
  const MAX_ZOOM = 2;
  const MIN_ARTBOARD_HEIGHT = 260;
  const MAX_ARTBOARD_HEIGHT = 3600;

  const state = {
    root: null,
    scene: null,
    code: null,
    codeTitle: null,
    live: null,
    liveStage: null,
    artboards: [],
    activeKey: "desktop",
    selectedKey: null,
    previewHtml: "",
    previewHtmlByDevice: {},
    frameHtmlByDevice: {},
    sourceByDevice: {},
    callbacks: {},
    zoom: 0.4,
    panX: 0,
    panY: 0,
    spaceDown: false,
    panning: null,
    dragging: null,
    resizing: null,
    windowDragging: null,
    windowResizing: null,
    frameHome: null,
    editorOpen: false,
    inlineKey: null,
    theme: { ...DEFAULT_THEME },
    windowTheme: { ...DEFAULT_WINDOW_THEME },
    boardHistory: { entries: [], index: -1 },
    frameDocumentVersion: 0,
    frameSetupTimers: new WeakMap()
  };

  let codeUpdateTimer = 0;
  let feedbackTimer = 0;
  const codeHistories = new WeakMap();

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;"
    }[character]));
  }

  function normalizeThemeColor(value, fallback) {
    const color = String(value || "").trim();
    return /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : fallback;
  }

  function normalizeThemeNumber(value, fallback, min, max, precision = 0) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return fallback;
    const bounded = Math.min(max, Math.max(min, numeric));
    return precision ? Number(bounded.toFixed(precision)) : Math.round(bounded);
  }

  function loadTheme() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(THEME_STORAGE_KEY) || "{}") || {};
      state.theme = {
        primary: normalizeThemeColor(saved.primary, DEFAULT_THEME.primary),
        secondary: normalizeThemeColor(saved.secondary, DEFAULT_THEME.secondary),
        contrast: normalizeThemeColor(saved.contrast, DEFAULT_THEME.contrast),
        grid: normalizeThemeColor(saved.grid, DEFAULT_THEME.grid),
        gridSize: normalizeThemeNumber(saved.gridSize, DEFAULT_THEME.gridSize, 12, 64)
      };
      const savedWindows = saved.windows || {};
      state.windowTheme = {
        header: normalizeThemeColor(savedWindows.header, DEFAULT_WINDOW_THEME.header),
        surface: normalizeThemeColor(savedWindows.surface, DEFAULT_WINDOW_THEME.surface),
        border: normalizeThemeColor(savedWindows.border, DEFAULT_WINDOW_THEME.border),
        active: normalizeThemeColor(savedWindows.active, DEFAULT_WINDOW_THEME.active),
        text: normalizeThemeColor(savedWindows.text, DEFAULT_WINDOW_THEME.text),
        radius: normalizeThemeNumber(savedWindows.radius, DEFAULT_WINDOW_THEME.radius, 0, 24),
        shadow: normalizeThemeNumber(savedWindows.shadow, DEFAULT_WINDOW_THEME.shadow, 0, 0.9, 2)
      };
    } catch (_) {
      state.theme = { ...DEFAULT_THEME };
      state.windowTheme = { ...DEFAULT_WINDOW_THEME };
    }
  }

  function saveTheme() {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ ...state.theme, windows: state.windowTheme }));
    } catch (_) {
      // O board continua utilizável quando o navegador bloqueia o armazenamento local.
    }
  }

  function applyTheme() {
    if (!state.root) return;
    state.root.style.setProperty("--ll-board-primary", state.theme.primary);
    state.root.style.setProperty("--ll-board-secondary", state.theme.secondary);
    state.root.style.setProperty("--ll-board-contrast", state.theme.contrast);
    state.root.style.setProperty("--ll-board-grid", state.theme.grid);
    state.root.style.setProperty("--ll-board-grid-size", `${state.theme.gridSize}px`);
    state.root.style.setProperty("--ll-window-header", state.windowTheme.header);
    state.root.style.setProperty("--ll-window-surface", state.windowTheme.surface);
    state.root.style.setProperty("--ll-window-border", state.windowTheme.border);
    state.root.style.setProperty("--ll-window-active", state.windowTheme.active);
    state.root.style.setProperty("--ll-window-text", state.windowTheme.text);
    state.root.style.setProperty("--ll-window-radius", `${state.windowTheme.radius}px`);
    state.root.style.setProperty("--ll-window-shadow", String(state.windowTheme.shadow));
    state.root.querySelectorAll("[data-board-theme]").forEach((input) => {
      const key = input.dataset.boardTheme;
      if (key && state.theme[key]) input.value = state.theme[key];
    });
    state.root.querySelectorAll("[data-board-number]").forEach((input) => {
      const key = input.dataset.boardNumber;
      if (key && state.theme[key] != null) input.value = String(state.theme[key]);
    });
    state.root.querySelectorAll("[data-window-theme]").forEach((input) => {
      const key = input.dataset.windowTheme;
      if (key && state.windowTheme[key]) input.value = state.windowTheme[key];
    });
    state.root.querySelectorAll("[data-window-number]").forEach((input) => {
      const key = input.dataset.windowNumber;
      if (key && state.windowTheme[key] != null) input.value = String(state.windowTheme[key]);
    });
  }

  function highlightCss(value) {
    return String(value || "").split(/(\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g).map((part) => {
      if (!part) return "";
      if (/^\/\*/.test(part)) return `<span class="ll-code__comment">${escapeHtml(part)}</span>`;
      if (/^["']/.test(part)) return `<span class="ll-code__string">${escapeHtml(part)}</span>`;

      return escapeHtml(part)
        .replace(/(^|[{};]\s*)(--?[\w-]+|[\w-]+)(\s*:)/gm, "$1<span class=\"ll-code__property\">$2</span>$3")
        .replace(/(^|[\s,{])(@[\w-]+|[.#][\w-]+|:[\w-]+)/gm, "$1<span class=\"ll-code__selector\">$2</span>")
        .replace(/(#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|s|deg)?\b)/g, "<span class=\"ll-code__value\">$1</span>");
    }).join("");
  }

  function highlightHtmlTag(value) {
    const match = String(value || "").match(/^<(\/)?([\w:-]+)([\s\S]*?)(\/?)>$/);
    if (!match) return escapeHtml(value);
    const [, closing, tagName, rawAttributes, selfClosing] = match;
    const attributes = rawAttributes.replace(/(\s+)([\w:-]+)(?:\s*(=)\s*("[^"]*"|'[^']*'|[^\s>]+))?/g, (full, spacing, name, equals, rawValue) => {
      if (!name) return full;
      const valueClass = /^(class|id)$/i.test(name) ? "ll-code__class" : "ll-code__string";
      const renderedValue = rawValue ? `${equals || "="}<span class="${valueClass}">${escapeHtml(rawValue)}</span>` : "";
      return `${spacing}<span class="ll-code__attribute">${escapeHtml(name)}</span>${renderedValue}`;
    });
    return `&lt;${closing || ""}<span class="ll-code__tag">${escapeHtml(tagName)}</span>${attributes}${selfClosing || ""}&gt;`;
  }

  function highlightHtml(value) {
    return String(value || "").split(/(<!--[\s\S]*?-->|<style\b[^>]*>[\s\S]*?<\/style\s*>|<[^>]+>)/gi).map((part) => {
      if (!part) return "";
      if (/^<!--/.test(part)) return `<span class="ll-code__comment">${escapeHtml(part)}</span>`;
      if (/^<style\b/i.test(part)) {
        const match = part.match(/^(<style\b[^>]*>)([\s\S]*)(<\/style\s*>)$/i);
        return match ? `${highlightHtmlTag(match[1])}${highlightCss(match[2])}${highlightHtmlTag(match[3])}` : highlightHtmlTag(part);
      }
      return /^</.test(part) ? highlightHtmlTag(part) : escapeHtml(part);
    }).join("");
  }

  function highlightCode(value) {
    const code = String(value || "");
    return /^\s*(?:@(?:media|supports|keyframes)|[.#][\w-]+\s*\{|--?[\w-]+\s*:)/.test(code)
      ? highlightCss(code)
      : highlightHtml(code);
  }

  function syncCodeHighlight(textarea) {
    const editor = textarea?.closest(".ll-board__code-editor");
    const highlight = editor?.querySelector("[data-board-code-highlight]");
    if (!highlight || !textarea) return;
    highlight.innerHTML = `${highlightCode(textarea.value)}\n`;
    highlight.style.transform = `translate(${-textarea.scrollLeft}px, ${-textarea.scrollTop}px)`;
    updateCodeStatus(textarea);
  }

  function createCodeHistorySnapshot(textarea) {
    return {
      value: textarea?.value || "",
      start: textarea?.selectionStart || 0,
      end: textarea?.selectionEnd || 0,
      scrollTop: textarea?.scrollTop || 0,
      scrollLeft: textarea?.scrollLeft || 0
    };
  }

  function resetCodeHistory(textarea) {
    if (!textarea) return;
    codeHistories.set(textarea, { entries: [createCodeHistorySnapshot(textarea)], index: 0 });
  }

  function getCodeHistory(textarea) {
    if (!textarea) return null;
    if (!codeHistories.has(textarea)) resetCodeHistory(textarea);
    return codeHistories.get(textarea) || null;
  }

  function recordCodeHistory(textarea) {
    const history = getCodeHistory(textarea);
    if (!history) return;
    const snapshot = createCodeHistorySnapshot(textarea);
    const current = history.entries[history.index];
    if (current?.value === snapshot.value) {
      history.entries[history.index] = snapshot;
      return;
    }
    history.entries = history.entries.slice(0, history.index + 1);
    history.entries.push(snapshot);
    if (history.entries.length > 160) history.entries.shift();
    history.index = history.entries.length - 1;
  }

  function restoreCodeHistory(textarea, direction) {
    const history = getCodeHistory(textarea);
    if (!history) return false;
    const current = history.entries[history.index];
    if (current?.value !== textarea.value) recordCodeHistory(textarea);
    const nextIndex = Math.max(0, Math.min(history.entries.length - 1, history.index + direction));
    if (nextIndex === history.index) return false;
    history.index = nextIndex;
    const snapshot = history.entries[history.index];
    textarea.value = snapshot.value;
    textarea.focus();
    textarea.setSelectionRange(snapshot.start, snapshot.end);
    textarea.scrollTop = snapshot.scrollTop;
    textarea.scrollLeft = snapshot.scrollLeft;
    syncCodeHighlight(textarea);
    queueCodeUpdate(textarea.value, textarea.dataset.boardCodeDevice || "desktop");
    return true;
  }

  function updateCodeStatus(textarea) {
    const editor = textarea?.closest(".ll-board__code-editor");
    const status = editor?.querySelector("[data-board-code-status]");
    if (!status || !textarea) return;
    const value = textarea.value || "";
    const caret = Math.min(value.length, textarea.selectionStart || 0);
    const beforeCaret = value.slice(0, caret);
    const line = beforeCaret.split(/\r\n|\r|\n/).length;
    const lastBreak = Math.max(beforeCaret.lastIndexOf("\n"), beforeCaret.lastIndexOf("\r"));
    const column = caret - lastBreak;
    const totalLines = value ? value.split(/\r\n|\r|\n/).length : 1;
    const selectionEnd = Math.max(caret, textarea.selectionEnd || 0);
    const selected = Array.from(value.slice(caret, selectionEnd)).length;
    const characters = Array.from(value).length;
    status.textContent = `Ln ${line}, Col ${column} | ${totalLines} linhas | ${characters} caracteres${selected ? ` | ${selected} selecionados` : ""}`;
  }

  function adjustCodeFontSize(textarea, direction) {
    const editor = textarea?.closest(".ll-board__code-editor");
    if (!editor) return;
    const current = Number.parseFloat(editor.style.getPropertyValue("--ll-code-font-size")) || 12;
    const next = Math.max(10, Math.min(26, current + (direction < 0 ? 1 : -1)));
    editor.style.setProperty("--ll-code-font-size", `${next}px`);
  }

  function getSearchMatches(value, term) {
    const source = String(value || "").toLocaleLowerCase();
    const query = String(term || "").toLocaleLowerCase();
    if (!query) return [];
    const matches = [];
    let index = source.indexOf(query);
    while (index >= 0) {
      matches.push(index);
      index = source.indexOf(query, index + Math.max(1, query.length));
    }
    return matches;
  }

  function updateCodeSearch(textarea, direction = 0) {
    const editor = textarea?.closest(".ll-board__code-editor");
    const search = editor?.querySelector("[data-board-code-search]");
    const input = search?.querySelector("[data-board-code-find]");
    const output = search?.querySelector("[data-board-code-search-status]");
    if (!textarea || !input || !output) return;
    const term = input.value;
    const matches = getSearchMatches(textarea.value, term);
    if (!term) {
      output.textContent = "Digite para buscar";
      return;
    }
    if (!matches.length) {
      output.textContent = "Sem resultados";
      return;
    }
    if (!direction) {
      const selectedIndex = matches.findIndex((position) => position === textarea.selectionStart && textarea.selectionEnd === position + term.length);
      output.textContent = selectedIndex >= 0 ? `${selectedIndex + 1} de ${matches.length}` : `${matches.length} resultados`;
      return;
    }
    const cursor = direction < 0 ? textarea.selectionStart : textarea.selectionEnd;
    let matchIndex = direction < 0
      ? matches.map((position, index) => ({ position, index })).filter((match) => match.position < cursor).pop()?.index
      : matches.findIndex((position) => position >= cursor);
    if (matchIndex == null || matchIndex < 0) matchIndex = direction < 0 ? matches.length - 1 : 0;
    const match = matches[matchIndex];
    textarea.focus();
    textarea.setSelectionRange(match, match + term.length);
    const lineHeight = Number.parseFloat(window.getComputedStyle(textarea).lineHeight) || 18;
    const line = textarea.value.slice(0, match).split(/\r\n|\r|\n/).length - 1;
    textarea.scrollTop = Math.max(0, line * lineHeight - textarea.clientHeight / 2 + lineHeight);
    syncCodeHighlight(textarea);
    updateCodeStatus(textarea);
    output.textContent = `${matchIndex + 1} de ${matches.length}`;
  }

  function openCodeSearch(textarea) {
    const editor = textarea?.closest(".ll-board__code-editor");
    const search = editor?.querySelector("[data-board-code-search]");
    const input = search?.querySelector("[data-board-code-find]");
    if (!search || !input || !textarea) return;
    search.hidden = false;
    const selectedText = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd).trim();
    if (selectedText && !/\s/.test(selectedText)) input.value = selectedText;
    updateCodeSearch(textarea);
    window.setTimeout(() => input.focus(), 0);
  }

  function closeCodeSearch(node) {
    const editor = node?.closest?.(".ll-board__code-editor") || node?.querySelector?.(".ll-board__code-editor");
    const search = editor?.querySelector("[data-board-code-search]");
    const replace = editor?.querySelector("[data-board-code-replace]");
    const replaceToggle = editor?.querySelector('[data-board-action="code-replace-toggle"]');
    const textarea = editor?.querySelector("[data-board-code]");
    if (search) search.hidden = true;
    if (replace) replace.hidden = true;
    replaceToggle?.setAttribute("aria-expanded", "false");
    textarea?.focus();
  }

  function setCodeReplaceVisible(node, visible) {
    const editor = node?.closest?.(".ll-board__code-editor") || node?.querySelector?.(".ll-board__code-editor");
    const replace = editor?.querySelector("[data-board-code-replace]");
    const replaceToggle = editor?.querySelector('[data-board-action="code-replace-toggle"]');
    const input = replace?.querySelector("[data-board-code-replace-input]");
    if (!replace || !replaceToggle) return;
    replace.hidden = !visible;
    replaceToggle.setAttribute("aria-expanded", String(visible));
    if (visible) window.setTimeout(() => input?.focus(), 0);
  }

  function replaceCodeMatches(textarea, replaceAll = false) {
    const editor = textarea?.closest(".ll-board__code-editor");
    const search = editor?.querySelector("[data-board-code-search]");
    const findInput = search?.querySelector("[data-board-code-find]");
    const replacementInput = search?.querySelector("[data-board-code-replace-input]");
    const output = search?.querySelector("[data-board-code-search-status]");
    if (!textarea || !findInput || !replacementInput || !output) return;
    const term = findInput.value;
    const matches = getSearchMatches(textarea.value, term);
    if (!term) {
      output.textContent = "Digite para buscar";
      return;
    }
    if (!matches.length) {
      output.textContent = "Sem resultados";
      return;
    }

    const replacement = replacementInput.value;
    if (replaceAll) {
      let cursor = 0;
      let value = "";
      matches.forEach((position) => {
        value += `${textarea.value.slice(cursor, position)}${replacement}`;
        cursor = position + term.length;
      });
      textarea.value = `${value}${textarea.value.slice(cursor)}`;
      textarea.setSelectionRange(0, 0);
      syncCodeEditor(textarea);
      output.textContent = `${matches.length} substituídos`;
      textarea.focus();
      return;
    }

    const selectedIndex = matches.findIndex((position) => position === textarea.selectionStart && textarea.selectionEnd === position + term.length);
    const matchIndex = selectedIndex >= 0
      ? selectedIndex
      : matches.findIndex((position) => position >= textarea.selectionStart);
    const start = matches[matchIndex >= 0 ? matchIndex : 0];
    textarea.setRangeText(replacement, start, start + term.length, "select");
    syncCodeEditor(textarea);
    updateCodeSearch(textarea, 1);
    textarea.focus();
  }

  function syncCodeEditor(textarea, device) {
    if (textarea) textarea.dataset.boardCodeDirty = "true";
    syncCodeHighlight(textarea);
    updateCodeStatus(textarea);
    recordCodeHistory(textarea);
    queueCodeUpdate(textarea.value, device || textarea.dataset.boardCodeDevice || "desktop");
  }

  function indentCode(textarea, outdent = false) {
    if (!textarea) return;
    const value = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
    const lineEndIndex = value.indexOf("\n", end);
    const lineEnd = lineEndIndex < 0 ? value.length : lineEndIndex;
    const selectedLines = value.slice(lineStart, lineEnd);
    if (!outdent && start === end) {
      textarea.setRangeText("\t", start, end, "end");
      syncCodeEditor(textarea);
      return;
    }
    if (outdent) {
      let firstRemoved = 0;
      let totalRemoved = 0;
      const updatedLines = selectedLines.replace(/^(\t| {1,2})/gm, (indent, offset) => {
        totalRemoved += indent.length;
        if (offset === 0) firstRemoved = indent.length;
        return "";
      });
      if (!totalRemoved) return;
      textarea.value = `${value.slice(0, lineStart)}${updatedLines}${value.slice(lineEnd)}`;
      textarea.selectionStart = Math.max(lineStart, start - Math.min(start - lineStart, firstRemoved));
      textarea.selectionEnd = Math.max(textarea.selectionStart, end - totalRemoved);
    } else {
      const updatedLines = selectedLines.replace(/^/gm, "\t");
      const lineCount = selectedLines.split("\n").length;
      textarea.value = `${value.slice(0, lineStart)}${updatedLines}${value.slice(lineEnd)}`;
      textarea.selectionStart = start + 1;
      textarea.selectionEnd = end + lineCount;
    }
    syncCodeEditor(textarea);
  }

  function insertCodeLineBreak(textarea) {
    if (!textarea) return;
    const value = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const lineStart = Math.max(value.lastIndexOf("\n", Math.max(0, start - 1)), value.lastIndexOf("\r", Math.max(0, start - 1))) + 1;
    const leadingIndent = (value.slice(lineStart, start).match(/^[\t ]*/) || [""])[0];
    const newline = value.includes("\r\n") ? "\r\n" : "\n";
    textarea.setRangeText(`${newline}${leadingIndent}`, start, end, "end");
    syncCodeEditor(textarea);
  }

  function codeEditorMarkup(device, label) {
    return `<div class="ll-board__code-editor"><div class="ll-board__code-search" data-board-code-search hidden><input type="search" data-board-code-find aria-label="Buscar no código" placeholder="Buscar"><output data-board-code-search-status>Digite para buscar</output><button type="button" data-board-action="code-find-prev" aria-label="Resultado anterior">&#8593;</button><button type="button" data-board-action="code-find-next" aria-label="Próximo resultado">&#8595;</button><button type="button" data-board-action="code-replace-toggle" aria-label="Mostrar substituir" aria-expanded="false" title="Substituir (Ctrl+H)">&#8618;</button><button type="button" data-board-action="code-find-close" aria-label="Fechar busca">x</button><div class="ll-board__code-replace" data-board-code-replace hidden><input type="text" data-board-code-replace-input aria-label="Substituir por" placeholder="Substituir por"><button type="button" data-board-action="code-replace-one">Substituir</button><button type="button" data-board-action="code-replace-all">Substituir tudo</button></div></div><div class="ll-board__code-stage"><pre aria-hidden="true"><code data-board-code-highlight></code></pre><textarea data-board-code data-board-code-device="${escapeHtml(device)}" aria-label="${escapeHtml(label)}" spellcheck="false" placeholder="Cole ou edite o HTML desta versão aqui"></textarea></div><footer><output data-board-code-status>Ln 1, Col 1 | 1 linhas | 0 caracteres</output><span>Tab indenta | Ctrl+F busca | Ctrl+H substituir</span></footer></div>`;
  }

  function loadArtboards() {
    let saved = {};
    try {
      saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch (_) {
      saved = {};
    }
    return DEFAULT_ARTBOARDS.map((artboard) => ({
      ...artboard,
      x: Number.isFinite(Number(saved[artboard.key]?.x)) ? Number(saved[artboard.key].x) : artboard.x,
      y: Number.isFinite(Number(saved[artboard.key]?.y)) ? Number(saved[artboard.key].y) : artboard.y,
      height: normalizeThemeNumber(saved[artboard.key]?.height, artboard.height, MIN_ARTBOARD_HEIGHT, MAX_ARTBOARD_HEIGHT)
    }));
  }

  function saveArtboards() {
    try {
      const positions = state.artboards.reduce((result, artboard) => {
        result[artboard.key] = { x: Math.round(artboard.x), y: Math.round(artboard.y), height: Math.round(artboard.height) };
        return result;
      }, {});
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    } catch (_) {
      // O board ainda funciona quando o navegador bloqueia o armazenamento local.
    }
  }

  function getArtboard(key) {
    return state.artboards.find((artboard) => artboard.key === key) || state.artboards[0];
  }

  function getLiveFrame() {
    return state.callbacks.previewFrame || null;
  }

  function applyTransform() {
    if (!state.scene) return;
    if (!Number.isFinite(state.panX)) state.panX = 72;
    if (!Number.isFinite(state.panY)) state.panY = 86;
    if (!Number.isFinite(state.zoom)) state.zoom = 0.4;
    state.scene.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
    const frame = getLiveFrame();
    if (frame) frame.dataset.llBoardInteractionScale = String(state.editorOpen ? 1 : state.zoom);
    const output = state.root.querySelector("[data-board-zoom-output]");
    if (output) output.textContent = `${Math.round(state.zoom * 100)}%`;
  }

  function setZoom(value, anchor) {
    const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value));
    if (next === state.zoom) return;
    if (anchor) {
      const factor = next / state.zoom;
      state.panX = anchor.x - (anchor.x - state.panX) * factor;
      state.panY = anchor.y - (anchor.y - state.panY) * factor;
    }
    state.zoom = next;
    applyTransform();
  }

  function zoomFromFrame(deltaY, key) {
    const artboard = getArtboard(key || state.inlineKey || state.activeKey);
    const anchor = artboard
      ? {
          x: state.panX + (artboard.x + artboard.width / 2) * state.zoom,
          y: state.panY + (artboard.y + artboard.height / 2) * state.zoom
        }
      : null;
    setZoom(state.zoom + (Number(deltaY) < 0 ? 0.1 : -0.1), anchor);
  }

  function startFramePan(data) {
    if (state.editorOpen || !getArtboard(data?.key)) return;
    const pointerId = Number(data?.pointerId);
    state.panning = {
      frameKey: data.key,
      pointerId: Number.isFinite(pointerId) ? pointerId : null
    };
    state.root?.classList.add("is-panning");
  }

  function getFramePanDelta(value) {
    const delta = Number(value);
    if (!Number.isFinite(delta)) return 0;

    // O iframe recebe a distancia no tamanho original do artboard, enquanto o
    // board esta desenhado com zoom. Converter para pixels da tela evita que
    // um pequeno arraste dentro de um frame desloque o visor varios metros.
    const zoom = Number.isFinite(state.zoom) ? state.zoom : 1;
    const screenDelta = delta * zoom;

    // Um evento atrasado nunca deve arremessar o canvas para longe. O proximo
    // movimento continua normalmente, entao o limite so protege contra saltos.
    return Math.max(-180, Math.min(180, screenDelta));
  }

  function moveFramePan(data) {
    if (!state.panning?.frameKey || state.panning.frameKey !== data?.key) return;
    const pointerId = Number(data?.pointerId);
    if (state.panning.pointerId !== null && (!Number.isFinite(pointerId) || state.panning.pointerId !== pointerId)) return;
    state.panX = (Number.isFinite(state.panX) ? state.panX : 72) + getFramePanDelta(data.dx);
    state.panY = (Number.isFinite(state.panY) ? state.panY : 86) + getFramePanDelta(data.dy);
    applyTransform();
  }

  function endFramePan(data) {
    const pointerId = Number(data?.pointerId);
    if (state.panning?.frameKey
      && state.panning.frameKey === data?.key
      && (state.panning.pointerId === null || (Number.isFinite(pointerId) && state.panning.pointerId === pointerId))) {
      state.panning = null;
      state.root?.classList.remove("is-panning");
    }
  }

  function broadcastBoardSpaceState(down) {
    state.root?.querySelectorAll("iframe").forEach((frame) => {
      frame.contentWindow?.postMessage({ type: "layout-lab:board-space", down: Boolean(down) }, "*");
    });
  }

  function fitBoard() {
    const bounds = state.root?.querySelector(".ll-board__surface")?.getBoundingClientRect();
    if (!bounds) return;
    state.zoom = Math.max(MIN_ZOOM, Math.min(0.52, (bounds.width - 120) / 2700));
    state.panX = 70;
    state.panY = 88;
    applyTransform();
  }

  function focusArtboard(key) {
    const artboard = getArtboard(key);
    const bounds = state.root?.querySelector(".ll-board__surface")?.getBoundingClientRect();
    if (!artboard || !bounds) return;
    const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.min((bounds.width - 100) / artboard.width, (bounds.height - 120) / artboard.height)));
    state.zoom = nextZoom;
    state.panX = (bounds.width - artboard.width * nextZoom) / 2 - artboard.x * nextZoom;
    state.panY = (bounds.height - artboard.height * nextZoom) / 2 - artboard.y * nextZoom;
    applyTransform();
  }

  function restorePreviewFrame() {
    const frame = getLiveFrame();
    if (!frame || !state.frameHome) return;
    const { parent, next, style } = state.frameHome;
    if (next && next.parentNode === parent) parent.insertBefore(frame, next);
    else parent.appendChild(frame);
    frame.setAttribute("style", style || "");
    frame.classList.remove("ll-board__live-frame");
    delete frame.dataset.llBoardInteractionScale;
    delete frame.dataset.llBoardActiveDevice;
    delete frame.dataset.llBoardDocumentKey;
    state.frameHome = null;
  }

  function prepareLiveFrameDocument(key) {
    const frame = getLiveFrame();
    if (!frame || !key) return;
    const html = state.previewHtmlByDevice[key] || state.previewHtml || "";
    const documentToken = String(++state.frameDocumentVersion);
    state.frameHtmlByDevice[key] = html;
    frame.dataset.llBoardDocumentKey = key;
    frame.dataset.llBoardActiveDevice = key;
    frame.dataset.llBoardExpectedDocumentToken = documentToken;
    frame.srcdoc = buildArtboardDocument(html, key, documentToken);
    notifyMountedFrame(frame, documentToken);
  }

  function attachPreviewFrame() {
    const frame = getLiveFrame();
    const key = state.editorOpen ? state.activeKey : state.inlineKey;
    const artboard = getArtboard(key);
    const mount = state.editorOpen
      ? state.liveStage
      : state.scene?.querySelector(`[data-board-live-mount="${artboard?.key}"]`);
    if (!frame || !artboard || !mount) return;
    if (!state.frameHome) {
      state.frameHome = {
        parent: frame.parentNode,
        next: frame.nextSibling,
        style: frame.getAttribute("style") || ""
      };
    }
    mount.replaceChildren(frame);
    frame.classList.add("ll-board__live-frame");
    frame.style.width = `${artboard.width}px`;
    frame.style.height = `${artboard.height}px`;
    frame.style.maxWidth = "none";
    frame.style.minWidth = "0";
    frame.style.margin = "0";
    frame.dataset.llBoardInteractionScale = String(state.editorOpen ? 1 : state.zoom);
    frame.dataset.llBoardActiveDevice = artboard.key;
  }

  function notifyMountedFrame(frame, expectedToken = frame?.dataset?.llBoardExpectedDocumentToken || "") {
    if (typeof state.callbacks.onFrameMounted !== "function" || !frame) return;
    const previousTimer = state.frameSetupTimers.get(frame);
    if (previousTimer) window.clearTimeout(previousTimer);
    let notified = false;
    let attempts = 0;
    const notify = () => {
      const documentToken = frame?.contentDocument?.documentElement?.dataset?.llBoardDocumentToken || "";
      if (notified) return;
      if (!frame?.isConnected || !(frame.contentDocument?.body || frame.contentWindow?.document?.body) || (expectedToken && documentToken !== expectedToken)) {
        attempts += 1;
        if (attempts < 60) state.frameSetupTimers.set(frame, window.setTimeout(notify, 25));
        return;
      }
      notified = true;
      state.frameSetupTimers.delete(frame);
      state.callbacks.onFrameMounted(frame);
    };
    window.queueMicrotask(notify);
  }

  function buildArtboardDocument(html, key, documentToken = "") {
    const bridge = `<script>(function(){document.documentElement.dataset.llBoardDocumentToken=${JSON.stringify(documentToken)};var key=${JSON.stringify(key)},space=false,panPointer=null,lastX=0,lastY=0;function send(type,event,dx,dy){parent.postMessage({type:type,key:key,dx:dx||0,dy:dy||0,pointerId:event&&event.pointerId},"*")}function syncStyles(nextDocument){var current=Array.prototype.slice.call(document.head.querySelectorAll("style")),next=Array.prototype.slice.call(nextDocument.head.querySelectorAll("style")),count=Math.max(current.length,next.length),index;for(index=0;index<count;index+=1){if(current[index]&&next[index]){if(current[index].textContent!==next[index].textContent)current[index].textContent=next[index].textContent}else if(next[index]){document.head.appendChild(document.importNode(next[index],true))}else if(current[index]){current[index].remove()}}}function syncDocument(nextHtml){var parser=new DOMParser(),nextDocument=parser.parseFromString(nextHtml,"text/html"),scrollX=window.scrollX,scrollY=window.scrollY,nodes=Array.prototype.slice.call(nextDocument.body.childNodes).map(function(node){return document.importNode(node,true)});syncStyles(nextDocument);document.body.replaceChildren.apply(document.body,nodes);window.scrollTo(scrollX,scrollY);send("layout-lab:board-frame-updated")}window.addEventListener("message",function(event){var data=event.data||{};if(data.type==="layout-lab:board-space"){space=!!data.down;return}if(data.type==="layout-lab:board-frame-update"&&typeof data.html==="string")syncDocument(data.html)});window.addEventListener("keydown",function(event){if(event.code==="Space"){space=true;event.preventDefault()}},true);window.addEventListener("keyup",function(event){if(event.code==="Space")space=false},true);window.addEventListener("pointerdown",function(event){if(event.button===1||space){panPointer=event.pointerId;lastX=event.clientX;lastY=event.clientY;event.preventDefault();event.stopImmediatePropagation();event.target.setPointerCapture&&event.target.setPointerCapture(event.pointerId);send("layout-lab:board-frame-pan-start",event);return}parent.postMessage({type:"layout-lab:board-frame-activate",key:key},"*")},true);window.addEventListener("pointermove",function(event){if(event.pointerId!==panPointer)return;var dx=event.clientX-lastX,dy=event.clientY-lastY;lastX=event.clientX;lastY=event.clientY;event.preventDefault();send("layout-lab:board-frame-pan-move",event,dx,dy)},true);function end(event){if(event.pointerId!==panPointer)return;send("layout-lab:board-frame-pan-end",event);panPointer=null}window.addEventListener("pointerup",end,true);window.addEventListener("pointercancel",end,true);window.addEventListener("wheel",function(event){if(!event.ctrlKey&&!event.metaKey)return;event.preventDefault();parent.postMessage({type:"layout-lab:board-frame-zoom",key:key,deltaY:event.deltaY},"*")},{capture:true,passive:false})})();<\/script>`;
    const source = String(html || "");
    return /<\/body\s*>/i.test(source) ? source.replace(/<\/body\s*>/i, `${bridge}</body>`) : `${source}${bridge}`;
  }

  function updateArtboardPosition(artboard) {
    const node = state.scene?.querySelector(`[data-board-artboard="${artboard?.key}"]`);
    if (!node || !artboard) return;
    node.style.setProperty("--board-x", `${artboard.x}px`);
    node.style.setProperty("--board-y", `${artboard.y}px`);
    node.style.setProperty("--board-width", `${artboard.width}px`);
    node.style.setProperty("--board-height", `${artboard.height}px`);
    const frame = node.querySelector("iframe");
    if (frame) {
      frame.style.width = `${artboard.width}px`;
      frame.style.height = `${artboard.height}px`;
    }
    const liveFrame = getLiveFrame();
    if (liveFrame?.dataset.llBoardActiveDevice === artboard.key) {
      liveFrame.style.width = `${artboard.width}px`;
      liveFrame.style.height = `${artboard.height}px`;
    }
  }

  function resetArtboardDimensions() {
    recordBoardHistory();
    state.artboards.forEach((artboard) => {
      const defaults = DEFAULT_ARTBOARDS.find((item) => item.key === artboard.key);
      if (!defaults) return;
      artboard.width = defaults.width;
      artboard.height = defaults.height;
      updateArtboardPosition(artboard);
    });
    saveArtboards();
    recordBoardHistory();
  }

  function resetWindowDimensions() {
    recordBoardHistory();
    state.root?.querySelectorAll(".ll-board__code, .ll-board__live").forEach((node) => {
      node.style.removeProperty("width");
      node.style.removeProperty("height");
    });
    recordBoardHistory();
  }

  function getBoardWindowKey(node) {
    if (node?.matches("[data-board-code-panel]")) return "general";
    if (node?.matches("[data-board-code-window]")) return `responsive:${node.dataset.boardCodeWindow}`;
    if (node?.matches("[data-board-live]")) return "live";
    return "";
  }

  function createBoardSnapshot() {
    return {
      artboards: state.artboards.map((artboard) => ({
        key: artboard.key,
        width: artboard.width,
        height: artboard.height,
        x: artboard.x,
        y: artboard.y
      })),
      windows: Array.from(state.root?.querySelectorAll(".ll-board__code, .ll-board__live") || []).map((node) => ({
        key: getBoardWindowKey(node),
        style: node.getAttribute("style") || ""
      }))
    };
  }

  function recordBoardHistory() {
    if (!state.root || !state.artboards.length) return;
    const snapshot = createBoardSnapshot();
    const history = state.boardHistory;
    const current = history.entries[history.index];
    if (current && JSON.stringify(current) === JSON.stringify(snapshot)) return;
    history.entries = history.entries.slice(0, history.index + 1);
    history.entries.push(snapshot);
    if (history.entries.length > 100) history.entries.shift();
    history.index = history.entries.length - 1;
  }

  function restoreBoardHistory(direction) {
    const history = state.boardHistory;
    if (!history.entries.length) return false;
    const current = createBoardSnapshot();
    if (JSON.stringify(history.entries[history.index]) !== JSON.stringify(current)) recordBoardHistory();
    const nextIndex = Math.max(0, Math.min(history.entries.length - 1, history.index + direction));
    if (nextIndex === history.index) return false;
    history.index = nextIndex;
    const snapshot = history.entries[nextIndex];
    snapshot.artboards.forEach((saved) => {
      const artboard = getArtboard(saved.key);
      if (!artboard) return;
      artboard.x = saved.x;
      artboard.y = saved.y;
      artboard.width = saved.width;
      artboard.height = saved.height;
      updateArtboardPosition(artboard);
    });
    const windows = new Map(snapshot.windows.map((item) => [item.key, item.style]));
    state.root?.querySelectorAll(".ll-board__code, .ll-board__live").forEach((node) => {
      const style = windows.get(getBoardWindowKey(node));
      if (style !== undefined) node.setAttribute("style", style);
    });
    saveArtboards();
    return true;
  }

  function syncArtboardDocuments(options = {}) {
    if (!state.scene) return;
    const liveFrame = getLiveFrame();
    state.scene.querySelectorAll("iframe").forEach((frame) => {
      const key = frame.closest("[data-board-artboard]")?.dataset.boardArtboard;
      const html = key ? state.previewHtmlByDevice[key] || state.previewHtml : "";
      if (!key) return;
      if (frame === liveFrame && frame.dataset.llBoardDocumentKey !== key) {
        state.frameHtmlByDevice[key] = html;
        frame.dataset.llBoardDocumentKey = key;
        frame.srcdoc = buildArtboardDocument(html, key);
        return;
      }
      if (state.frameHtmlByDevice[key] === html) return;
      // O frame ativo ja recebeu a alteracao diretamente pelo editor. Nao
      // marque o documento como sincronizado, pois uma atualizacao completa
      // posterior ainda precisa poder alcança-lo.
      if (frame === liveFrame && options.preserveLiveFrame) return;
      state.frameHtmlByDevice[key] = html;
      frame.contentWindow?.postMessage({ type: "layout-lab:board-frame-update", html }, "*");
    });
  }

  function renderArtboards() {
    if (!state.scene) return;
    const frame = getLiveFrame();
    if (frame?.parentElement?.matches("[data-board-live-mount]")) {
      frame.remove();
    }
    state.scene.innerHTML = state.artboards.map((artboard) => {
      const isInline = !state.editorOpen && artboard.key === state.inlineKey;
      const artboardHtml = state.previewHtmlByDevice[artboard.key] || state.previewHtml;
      const viewport = isInline
        ? `<div class="ll-board__artboard-viewport" data-board-live-mount="${artboard.key}"></div>`
        : `<div class="ll-board__artboard-viewport"><iframe title="Prévia interativa ${escapeHtml(artboard.label)}" data-ll-board-active-device="${escapeHtml(artboard.key)}" data-ll-board-document-key="${escapeHtml(artboard.key)}" srcdoc="${escapeHtml(buildArtboardDocument(artboardHtml, artboard.key))}" style="width:${artboard.width}px;height:${artboard.height}px"></iframe></div>`;
      return `
      <section class="ll-board__artboard ${artboard.key === state.selectedKey ? "is-active" : ""}" data-board-artboard="${artboard.key}" style="--board-x:${artboard.x}px;--board-y:${artboard.y}px;--board-width:${artboard.width}px;--board-height:${artboard.height}px">
        <header class="ll-board__artboard-head" data-board-drag="${artboard.key}" title="Arraste para reposicionar">
          <strong>${escapeHtml(artboard.label)}</strong><span>${escapeHtml(artboard.detail)}</span>
          <button type="button" class="ll-board__open-frame" data-board-open="${artboard.key}" aria-label="Editar ${escapeHtml(artboard.label)}">Editar</button>
          <button type="button" class="ll-board__code-frame" data-board-code-for="${artboard.key}" aria-label="Ver código de ${escapeHtml(artboard.label)}">Codigo</button>
          <button type="button" class="ll-board__save-frame" data-board-save="${artboard.key}" aria-label="Salvar versão ${escapeHtml(artboard.label)}">Salvar</button>
        </header>
        ${viewport}
        <button type="button" class="ll-board__artboard-open" data-board-open="${artboard.key}">Editar ${escapeHtml(artboard.label)}</button>
        <button type="button" class="ll-board__artboard-resize" data-board-resize="${artboard.key}" aria-label="Redimensionar altura de ${escapeHtml(artboard.label)}" title="Arraste para ajustar a altura"></button>
      </section>`;
    }).join("");
    state.frameHtmlByDevice = { ...state.previewHtmlByDevice };
    state.scene.querySelectorAll("iframe").forEach((frame) => {
      frame.addEventListener("load", () => notifyMountedFrame(frame), { once: true });
      notifyMountedFrame(frame);
    });
    applyTransform();
    if (!state.editorOpen && state.inlineKey) attachPreviewFrame();
  }

  function setEditorTitle() {
    const artboard = getArtboard(state.activeKey);
    const title = state.live?.querySelector("[data-board-live-title]");
    if (title && artboard) title.textContent = `${artboard.label} - ${artboard.width}px`;
  }

  function setCodeTitle() {
    if (state.codeTitle) state.codeTitle.textContent = "Codigo geral da LP";
  }

  function selectArtboard(key) {
    const artboard = getArtboard(key);
    if (!artboard || !state.root) return;
    state.activeKey = artboard.key;
    state.selectedKey = artboard.key;
    state.scene?.querySelectorAll("[data-board-artboard]").forEach((node) => {
      node.classList.toggle("is-active", node.dataset.boardArtboard === artboard.key);
    });
  }

  function activateArtboard(key, notify = true) {
    const artboard = getArtboard(key);
    if (!artboard || !state.root) return;
    const isCurrentLiveEditor = state.editorOpen && state.activeKey === artboard.key;
    if (isCurrentLiveEditor) {
      selectArtboard(artboard.key);
      return;
    }
    const needsMount = state.editorOpen || state.inlineKey !== artboard.key;
    if (needsMount) window.__llClosePreviewEditPopover?.();
    state.editorOpen = false;
    if (state.live) state.live.hidden = true;
    state.inlineKey = artboard.key;
    selectArtboard(artboard.key);
    if (needsMount) {
      prepareLiveFrameDocument(artboard.key);
      renderArtboards();
    }
    if (notify && typeof state.callbacks.onEditDevice === "function") {
      state.callbacks.onEditDevice(artboard.key);
    }
  }

  function openGeneralCode() {
    if (!state.root) return;
    state.root.classList.add("is-code-open");
    setCodeTitle();
    window.setTimeout(() => state.code?.focus(), 0);
  }

  function getResponsiveCodePanel(key) {
    return state.root?.querySelector(`[data-board-code-window="${key}"]`) || null;
  }

  function getCodeSource(device = "desktop") {
    return state.sourceByDevice?.[device] ?? state.callbacks.source ?? "";
  }

  function openResponsiveCode(key, notify = true) {
    const artboard = getArtboard(key);
    if (!artboard || !state.root) return;
    selectArtboard(artboard.key);
    let panel = getResponsiveCodePanel(artboard.key);
    if (!panel) {
      panel = document.createElement("aside");
      panel.className = "ll-board__code ll-board__code--responsive is-open";
      panel.dataset.boardCodeWindow = artboard.key;
      panel.style.left = `${Math.max(24, 120 + state.root.querySelectorAll("[data-board-code-window]").length * 34)}px`;
      panel.style.top = `${Math.max(84, 96 + state.root.querySelectorAll("[data-board-code-window]").length * 28)}px`;
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      panel.innerHTML = `<header data-board-window-drag><strong>Codigo - ${escapeHtml(artboard.label)} (${artboard.width}px)</strong><button type="button" data-board-action="close-code-window" aria-label="Fechar código de ${escapeHtml(artboard.label)}">x</button></header>${codeEditorMarkup(artboard.key, `Código HTML de ${artboard.label}`)}`;
      state.root.appendChild(panel);
    }
    const textarea = panel.querySelector("textarea");
    if (textarea && document.activeElement !== textarea) {
      textarea.value = getCodeSource(artboard.key);
      syncCodeHighlight(textarea);
      resetCodeHistory(textarea);
    }
    if (notify && typeof state.callbacks.onEditDevice === "function") {
      state.callbacks.onEditDevice(artboard.key);
    }
    window.setTimeout(() => textarea?.focus(), 0);
  }

  function queueCodeUpdate(value, device = "desktop") {
    window.clearTimeout(codeUpdateTimer);
    state.pendingCodeUpdate = { value, device };
    codeUpdateTimer = window.setTimeout(() => {
      commitCodeUpdate(value, device);
    }, 180);
  }

  function commitCodeUpdate(value = (document.activeElement?.matches?.("[data-board-code]") ? document.activeElement.value : state.code?.value || ""), device = document.activeElement?.dataset?.boardCodeDevice || "desktop") {
    window.clearTimeout(codeUpdateTimer);
    codeUpdateTimer = 0;
    state.pendingCodeUpdate = null;
    state.sourceByDevice = { ...state.sourceByDevice, [device]: value };
    state.root?.querySelectorAll(`[data-board-code-device="${CSS.escape(device)}"]`).forEach((textarea) => {
      if (textarea.value === value) textarea.dataset.boardCodeDirty = "false";
    });
    if (typeof state.callbacks.onCodeChange === "function") {
      state.callbacks.onCodeChange(value, device);
    }
  }

  function commitPendingCodeUpdate() {
    const pending = state.pendingCodeUpdate;
    if (pending) {
      commitCodeUpdate(pending.value, pending.device);
    }
  }

  function commitFocusedCodeUpdate() {
    const field = document.activeElement?.matches?.("[data-board-code]") ? document.activeElement : null;
    if (field) {
      commitCodeUpdate(field.value, field.dataset.boardCodeDevice || "desktop");
    }
  }

  function openExportOptions() {
    if (!state.root) return;
    state.root.classList.add("is-export-open");
    window.setTimeout(() => state.root?.querySelector("[data-board-export]")?.focus(), 0);
  }

  function openLiveEditor(key, notify = true) {
    const artboard = getArtboard(key);
    if (!artboard || !state.root) return;
    window.__llClosePreviewEditPopover?.();
    state.activeKey = artboard.key;
    state.selectedKey = artboard.key;
    state.inlineKey = null;
    state.editorOpen = true;
    state.live.hidden = false;
    prepareLiveFrameDocument(artboard.key);
    renderArtboards();
    setEditorTitle();
    attachPreviewFrame();
    if (notify && typeof state.callbacks.onEditDevice === "function") {
      state.callbacks.onEditDevice(artboard.key);
    }
  }

  function closeLiveEditor() {
    state.editorOpen = false;
    if (state.live) state.live.hidden = true;
    state.inlineKey = state.selectedKey || state.activeKey;
    prepareLiveFrameDocument(state.inlineKey);
    renderArtboards();
  }

  function build() {
    if (state.root) return;
    const root = document.createElement("section");
    root.className = "ll-board";
    root.hidden = true;
    root.innerHTML = `
      <div class="ll-board__surface" data-board-surface><div class="ll-board__scene" data-board-scene></div></div>
      <div class="ll-board__interaction-shield" data-board-interaction-shield aria-hidden="true"></div>
      <div class="ll-board__menu">
        <button class="ll-board__menu-toggle" type="button" data-board-action="menu" aria-expanded="false" aria-label="Abrir menu do board" title="Menu do board"><span></span><span></span><span></span></button>
        <aside class="ll-board__menu-panel" data-board-menu-panel hidden aria-label="Menu do board">
          <div class="ll-board__menu-section ll-board__menu-view"><button type="button" data-board-action="fit" title="Ajustar frames (Shift+1)">Ajustar</button><div class="ll-board__zoom"><button type="button" data-board-action="zoom-out" title="Diminuir zoom (-)">-</button><output data-board-zoom-output>40%</output><button type="button" data-board-action="zoom-in" title="Aumentar zoom (+)">+</button></div></div>
          <div class="ll-board__menu-section ll-board__menu-actions"><button type="button" data-board-action="code" title="Mostrar código geral (Ctrl+Alt+C)">Codigo geral</button><button type="button" data-board-action="export" title="Opções de exportação (Ctrl+Shift+E)">Exportar</button><button type="button" data-board-action="legacy" title="Abrir modo legado">Legado</button></div>
          <div class="ll-board__menu-section"><button class="ll-board__menu-disclosure" type="button" data-board-action="appearance" aria-expanded="false">Aparência</button><div class="ll-board__appearance" data-board-appearance hidden><section class="ll-board__appearance-group"><strong>Board</strong><div class="ll-board__appearance-colors"><label>Primária <input type="color" data-board-theme="primary" aria-label="Cor primária do board"></label><label>Fundo <input type="color" data-board-theme="secondary" aria-label="Cor de fundo do board"></label><label>Contraste <input type="color" data-board-theme="contrast" aria-label="Cor de contraste do board"></label><label>Grade <input type="color" data-board-theme="grid" aria-label="Cor da grade do board"></label></div><label class="ll-board__appearance-number">Grade (px) <input type="number" min="12" max="64" step="1" data-board-number="gridSize" aria-label="Tamanho da grade do board"></label></section><section class="ll-board__appearance-group"><strong>Janelas</strong><div class="ll-board__appearance-colors"><label>Cabeçalho <input type="color" data-window-theme="header" aria-label="Cor do cabeçalho das janelas"></label><label>Fundo <input type="color" data-window-theme="surface" aria-label="Cor de fundo das janelas"></label><label>Borda <input type="color" data-window-theme="border" aria-label="Cor da borda das janelas"></label><label>Seleção <input type="color" data-window-theme="active" aria-label="Cor da janela selecionada"></label><label>Texto <input type="color" data-window-theme="text" aria-label="Cor do texto das janelas"></label></div><div class="ll-board__appearance-numbers"><label class="ll-board__appearance-number">Raio (px) <input type="number" min="0" max="24" step="1" data-window-number="radius" aria-label="Raio das janelas"></label><label class="ll-board__appearance-number">Sombra <input type="range" min="0" max="0.9" step="0.05" data-window-number="shadow" aria-label="Intensidade da sombra das janelas"></label></div></section><button type="button" data-board-action="theme-reset">Restaurar aparência</button></div></div>
          <div class="ll-board__menu-section"><button class="ll-board__menu-disclosure" type="button" data-board-action="shortcuts" aria-expanded="false">Atalhos</button><aside class="ll-board__help" data-board-shortcuts hidden><strong>Atalhos do board</strong><span><kbd>Espaco + arrastar</kbd> mover</span><span><kbd>Botão do meio</kbd> mover</span><span><kbd>Shift+1</kbd> ajustar</span><span><kbd>Shift+2</kbd> foco</span><span><kbd>Ctrl+Shift+S</kbd> salvar versão</span><span><kbd>Ctrl+Shift+E</kbd> exportar</span><span><kbd>Ctrl+Alt+C</kbd> código geral ou selecionado</span><span><kbd>Ctrl+Alt+A</kbd> resetar dimensões dos frames</span><span><kbd>Ctrl+Alt+Shift+A</kbd> resetar dimensões das janelas</span><span><kbd>Ctrl + scroll</kbd> zoom</span><span><kbd>+/-</kbd> zoom</span><span><kbd>Tab / Shift+Tab</kbd> indentar código</span><span><kbd>Ctrl+F / Ctrl+H</kbd> buscar / substituir</span><span><kbd>Ctrl+Z / Ctrl+Shift+Z</kbd> desfazer / refazer texto ou board</span></aside></div>
        </aside>
      </div>
      <aside class="ll-board__export" data-board-export-panel><header><strong>Opções de exportação</strong><button type="button" data-board-action="close-export" aria-label="Fechar opções de exportação">x</button></header><div class="ll-board__export-groups"><section><strong>Copiar</strong><div><button type="button" data-board-export="html">Copiar HTML</button><button type="button" data-board-export="css">Copiar CSS</button><button type="button" data-board-export="full">Copiar HTML/CSS</button></div></section><section><strong>Exportar arquivos</strong><div><button type="button" data-board-export="download-html">Exportar HTML</button><button type="button" data-board-export="download-css">Exportar CSS</button><button type="button" data-board-export="download-full">Exportar HTML/CSS</button></div></section></div></aside>
      <aside class="ll-board__code ll-board__code--general" data-board-code-panel><header data-board-window-drag><strong data-board-code-title>Codigo geral da LP</strong><button type="button" data-board-action="code" aria-label="Fechar código geral">x</button></header>${codeEditorMarkup("desktop", "Código HTML geral da LP")}</aside>
      <section class="ll-board__live" data-board-live hidden aria-label="Edição direta da versão responsiva"><header data-board-window-drag><strong data-board-live-title></strong><span>Edite diretamente no conteúdo</span><button type="button" data-board-action="close-live" aria-label="Fechar janela">x</button></header><div class="ll-board__live-stage" data-board-live-stage></div></section>`;
    const feedback = document.createElement("div");
    feedback.className = "ll-board__feedback";
    feedback.dataset.boardFeedback = "";
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    feedback.innerHTML = '<span aria-hidden="true">✓</span><span data-board-feedback-text></span>';
    root.append(feedback);
    document.body.appendChild(root);
    state.root = root;
    state.scene = root.querySelector("[data-board-scene]");
    state.code = root.querySelector("[data-board-code]");
    state.codeTitle = root.querySelector("[data-board-code-title]");
    state.live = root.querySelector("[data-board-live]");
    state.liveStage = root.querySelector("[data-board-live-stage]");
    loadTheme();
    applyTheme();
    bindEvents();
  }

  function startPan(event) {
    const captureTarget = event.target.closest?.("[data-board-surface]") || null;
    capturePointer(event, captureTarget);
    state.panning = { x: event.clientX, y: event.clientY, panX: state.panX, panY: state.panY, pointerId: event.pointerId, captureTarget };
    state.root.classList.add("is-panning", "is-interacting");
  }

  function startDrag(event, key) {
    const artboard = getArtboard(key);
    if (!artboard) return;
    recordBoardHistory();
    const captureTarget = event.target.closest?.("[data-board-drag]") || null;
    capturePointer(event, captureTarget);
    state.dragging = { artboard, x: event.clientX, y: event.clientY, startX: artboard.x, startY: artboard.y, pointerId: event.pointerId, captureTarget };
    state.root.classList.add("is-interacting");
    event.preventDefault();
  }

  function capturePointer(event, target) {
    if (!target?.setPointerCapture || !Number.isFinite(event.pointerId)) return;
    try {
      target.setPointerCapture(event.pointerId);
    } catch (_) {
      // A camada de interação continua protegendo o arraste quando a captura falha.
    }
  }

  function releasePointerCapture(interaction) {
    const target = interaction?.captureTarget || interaction?.handle;
    if (!target?.releasePointerCapture || !Number.isFinite(interaction?.pointerId)) return;
    try {
      if (!target.hasPointerCapture || target.hasPointerCapture(interaction.pointerId)) {
        target.releasePointerCapture(interaction.pointerId);
      }
    } catch (_) {
      // O navegador tambem pode liberar a captura automaticamente ao soltar o ponteiro.
    }
  }

  function startResize(event, key) {
    const artboard = getArtboard(key);
    if (!artboard) return;
    recordBoardHistory();
    const handle = event.target.closest?.("[data-board-resize]") || null;
    capturePointer(event, handle);
    state.resizing = {
      artboard,
      y: event.clientY,
      startHeight: artboard.height,
      pointerId: event.pointerId,
      captureTarget: handle
    };
    state.root.classList.add("is-interacting");
    event.preventDefault();
    event.stopPropagation();
  }

  function endResize() {
    releasePointerCapture(state.resizing);
    state.resizing = null;
  }

  function showFeedback(message, options = {}) {
    const feedback = state.root?.querySelector("[data-board-feedback]");
    const text = state.root?.querySelector("[data-board-feedback-text]");
    if (!feedback || !text) return;

    text.textContent = String(message || "");
    feedback.classList.toggle("is-warning", Boolean(options.warning));
    feedback.classList.remove("is-visible");
    void feedback.offsetWidth;
    feedback.classList.add("is-visible");

    if (options.button) {
      options.button.classList.remove("is-confirmed");
      void options.button.offsetWidth;
      options.button.classList.add("is-confirmed");
      window.setTimeout(() => options.button?.classList.remove("is-confirmed"), 620);
    }

    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => feedback.classList.remove("is-visible", "is-warning"), options.warning ? 5200 : 2800);
  }

  function announceSavedArtboard(key, button) {
    const artboard = getArtboard(key);
    const result = state.callbacks.onSaveDevice?.(key);
    Promise.resolve(result).then((saved) => {
      if (saved !== false) {
        showFeedback(`Versão ${artboard?.label || "do frame"} salva.`, { button });
      }
    }).catch(() => {});
  }

  function bindEvents() {
    state.root.addEventListener("click", (event) => {
      const action = event.target.closest("[data-board-action]")?.dataset.boardAction;
      const open = event.target.closest("[data-board-open]")?.dataset.boardOpen;
      const codeFor = event.target.closest("[data-board-code-for]")?.dataset.boardCodeFor;
      const save = event.target.closest("[data-board-save]")?.dataset.boardSave;
      const exportMode = event.target.closest("[data-board-export]")?.dataset.boardExport;
      if (open) { openLiveEditor(open); return; }
      if (codeFor) { openResponsiveCode(codeFor); return; }
      if (exportMode && typeof state.callbacks.onExport === "function") {
        state.callbacks.onExport(exportMode, event.target.closest("[data-board-export]"));
        return;
      }
      if (save && typeof state.callbacks.onSaveDevice === "function") {
        selectArtboard(save);
        commitPendingCodeUpdate();
        commitFocusedCodeUpdate();
        announceSavedArtboard(save, event.target.closest("[data-board-save]"));
        return;
      }
      if (!action) return;
      if (action === "menu") {
        const panel = state.root.querySelector("[data-board-menu-panel]");
        const isOpen = panel?.hidden === false;
        if (panel) panel.hidden = isOpen;
        event.target.closest("[data-board-action]")?.setAttribute("aria-expanded", String(!isOpen));
        return;
      }
      if (action === "fit") fitBoard();
      if (action === "zoom-in") setZoom(state.zoom + 0.1);
      if (action === "zoom-out") setZoom(state.zoom - 0.1);
      if (action === "code") {
        if (state.root.classList.contains("is-code-open")) state.root.classList.remove("is-code-open");
        else openGeneralCode();
      }
      if (action === "export") {
        state.root.classList.toggle("is-export-open");
        if (state.root.classList.contains("is-export-open")) openExportOptions();
      }
      if (action === "shortcuts") {
        const help = state.root.querySelector("[data-board-shortcuts]");
        const isOpen = help?.hidden === false;
        if (help) help.hidden = isOpen;
        event.target.closest("[data-board-action]")?.setAttribute("aria-expanded", String(!isOpen));
      }
      if (action === "appearance") {
        const appearance = state.root.querySelector("[data-board-appearance]");
        const isOpen = appearance?.hidden === false;
        if (appearance) appearance.hidden = isOpen;
        event.target.closest("[data-board-action]")?.setAttribute("aria-expanded", String(!isOpen));
      }
      if (action === "theme-reset") {
        state.theme = { ...DEFAULT_THEME };
        state.windowTheme = { ...DEFAULT_WINDOW_THEME };
        saveTheme();
        applyTheme();
      }
      if (action === "code-replace-toggle") {
        const editor = event.target.closest(".ll-board__code-editor");
        const replacement = editor?.querySelector("[data-board-code-replace]");
        setCodeReplaceVisible(editor, replacement?.hidden !== false);
        return;
      }
      if (action === "code-replace-one" || action === "code-replace-all") {
        const editor = event.target.closest(".ll-board__code-editor");
        replaceCodeMatches(editor?.querySelector("[data-board-code]"), action === "code-replace-all");
        return;
      }
      if (action === "code-find-next" || action === "code-find-prev") {
        const editor = event.target.closest(".ll-board__code-editor");
        updateCodeSearch(editor?.querySelector("[data-board-code]"), action === "code-find-prev" ? -1 : 1);
        return;
      }
      if (action === "code-find-close") {
        closeCodeSearch(event.target);
        return;
      }
      if (action === "close-code-window") event.target.closest("[data-board-code-window]")?.remove();
      if (action === "close-export") state.root.classList.remove("is-export-open");
      if (action === "close-live") closeLiveEditor();
      if (action === "legacy" && typeof state.callbacks.onLegacy === "function") state.callbacks.onLegacy();
    });
    state.root.addEventListener("dblclick", (event) => {
      const artboard = event.target.closest("[data-board-artboard]")?.dataset.boardArtboard;
      if (artboard) openLiveEditor(artboard);
    });
    state.root.addEventListener("click", (event) => {
      const artboard = event.target.closest("[data-board-artboard]")?.dataset.boardArtboard;
      if (artboard && !event.target.closest("button")) activateArtboard(artboard);
    });
    state.root.addEventListener("input", (event) => {
      if (event.target.matches("[data-board-theme]")) {
        const key = event.target.dataset.boardTheme;
        if (key && Object.prototype.hasOwnProperty.call(DEFAULT_THEME, key)) {
          state.theme[key] = normalizeThemeColor(event.target.value, state.theme[key]);
          saveTheme();
          applyTheme();
        }
        return;
      }
      if (event.target.matches("[data-board-number]")) {
        const key = event.target.dataset.boardNumber;
        if (key === "gridSize") {
          state.theme.gridSize = normalizeThemeNumber(event.target.value, state.theme.gridSize, 12, 64);
          saveTheme();
          applyTheme();
        }
        return;
      }
      if (event.target.matches("[data-window-theme]")) {
        const key = event.target.dataset.windowTheme;
        if (key && Object.prototype.hasOwnProperty.call(DEFAULT_WINDOW_THEME, key)) {
          state.windowTheme[key] = normalizeThemeColor(event.target.value, state.windowTheme[key]);
          saveTheme();
          applyTheme();
        }
        return;
      }
      if (event.target.matches("[data-window-number]")) {
        const key = event.target.dataset.windowNumber;
        if (key === "radius") state.windowTheme.radius = normalizeThemeNumber(event.target.value, state.windowTheme.radius, 0, 24);
        if (key === "shadow") state.windowTheme.shadow = normalizeThemeNumber(event.target.value, state.windowTheme.shadow, 0, 0.9, 2);
        if (key === "radius" || key === "shadow") {
          saveTheme();
          applyTheme();
        }
        return;
      }
      if (event.target.matches("[data-board-code]")) {
        syncCodeEditor(event.target);
        return;
      }
      if (event.target.matches("[data-board-code-find]")) {
        updateCodeSearch(event.target.closest(".ll-board__code-editor")?.querySelector("[data-board-code]"));
      }
    });
    state.root.addEventListener("keydown", (event) => {
      const textarea = event.target.matches?.("[data-board-code]") ? event.target : null;
      const search = event.target.matches?.("[data-board-code-find]") ? event.target : null;
      const replace = event.target.matches?.("[data-board-code-replace-input]") ? event.target : null;
      if (textarea) {
        const key = event.key.toLowerCase();
        if ((event.ctrlKey || event.metaKey) && (key === "z" || key === "y")) {
          event.preventDefault();
          restoreCodeHistory(textarea, key === "y" || event.shiftKey ? 1 : -1);
          return;
        }
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
          event.preventDefault();
          openCodeSearch(textarea);
          return;
        }
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "h") {
          event.preventDefault();
          openCodeSearch(textarea);
          setCodeReplaceVisible(textarea, true);
          return;
        }
        if (event.key === "Enter" && !textarea.closest(".ll-board__code-editor")?.querySelector("[data-board-code-search]")?.hidden) {
          event.preventDefault();
          updateCodeSearch(textarea, event.shiftKey ? -1 : 1);
          return;
        }
        if (event.key === "Tab") {
          event.preventDefault();
          indentCode(textarea, event.shiftKey);
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          insertCodeLineBreak(textarea);
          return;
        }
        if (event.key === "Escape" && !textarea.closest(".ll-board__code-editor")?.querySelector("[data-board-code-search]")?.hidden) {
          event.preventDefault();
          closeCodeSearch(textarea);
        }
      }
      if (search) {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "h") {
          event.preventDefault();
          setCodeReplaceVisible(search, true);
          return;
        }
        if (event.ctrlKey && event.altKey && event.key === "Enter") {
          event.preventDefault();
          replaceCodeMatches(search.closest(".ll-board__code-editor")?.querySelector("[data-board-code]"), true);
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          updateCodeSearch(search.closest(".ll-board__code-editor")?.querySelector("[data-board-code]"), event.shiftKey ? -1 : 1);
          return;
        }
        if (event.key === "Escape") {
          event.preventDefault();
          closeCodeSearch(search);
        }
      }
      if (replace) {
        if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "z" || event.key.toLowerCase() === "y")) {
          event.preventDefault();
          restoreCodeHistory(replace.closest(".ll-board__code-editor")?.querySelector("[data-board-code]"), event.key.toLowerCase() === "y" || event.shiftKey ? 1 : -1);
          return;
        }
        if (event.ctrlKey && event.altKey && event.key === "Enter") {
          event.preventDefault();
          replaceCodeMatches(replace.closest(".ll-board__code-editor")?.querySelector("[data-board-code]"), true);
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          replaceCodeMatches(replace.closest(".ll-board__code-editor")?.querySelector("[data-board-code]"));
          return;
        }
        if (event.key === "Escape") {
          event.preventDefault();
          closeCodeSearch(replace);
        }
      }
    });
    state.root.addEventListener("select", (event) => {
      if (event.target.matches?.("[data-board-code]")) updateCodeStatus(event.target);
    }, true);
    state.root.addEventListener("keyup", (event) => {
      if (event.target.matches?.("[data-board-code]")) updateCodeStatus(event.target);
    });
    state.root.addEventListener("scroll", (event) => {
      if (event.target.matches?.("[data-board-code]")) syncCodeHighlight(event.target);
    }, true);
    state.root.addEventListener("wheel", (event) => {
      const textarea = event.target.closest?.("[data-board-code]");
      if (!textarea || (!event.ctrlKey && !event.metaKey)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      adjustCodeFontSize(textarea, event.deltaY);
    }, { capture: true, passive: false });
    window.addEventListener("message", (event) => {
      const data = event.data;
      if (!isOpen()) return;
      if (data?.type === "layout-lab:board-frame-zoom") {
        zoomFromFrame(data.deltaY, data.key);
        return;
      }
      if (data?.type === "layout-lab:board-frame-pan-start") {
        startFramePan(data);
        return;
      }
      if (data?.type === "layout-lab:board-frame-pan-move") {
        moveFramePan(data);
        return;
      }
      if (data?.type === "layout-lab:board-frame-pan-end") {
        endFramePan(data);
        return;
      }
      if (data?.type === "layout-lab:board-frame-updated") {
        const frame = Array.from(state.scene?.querySelectorAll("iframe") || []).find((node) => node.contentWindow === event.source);
        if (frame) notifyMountedFrame(frame);
        return;
      }
      if (data?.type === "layout-lab:board-frame-activate" && getArtboard(data.key)) {
        const clickedFrame = Array.from(state.scene?.querySelectorAll("iframe") || [])
          .find((node) => node.contentWindow === event.source);
        // Um clique dentro de um frame deve chegar ao conteudo no mesmo
        // instante. Antes ele ativava o breakpoint e reconstruia o iframe,
        // fazendo o primeiro clique apenas piscar a tela.
        if (clickedFrame) {
          selectArtboard(data.key);
          return;
        }
        const liveFrame = getLiveFrame();
        // A click made just before a device swap can arrive after srcdoc has
        // changed. The live iframe keeps the same contentWindow, so discard
        // that stale activation instead of switching the editor back.
        if (state.editorOpen && event.source === liveFrame?.contentWindow) {
          if (data.key === state.activeKey) selectArtboard(data.key);
          return;
        }
        activateArtboard(data.key);
      }
    });
    state.root.addEventListener("pointerdown", (event) => {
      const resizableWindow = event.target.closest(".ll-board__code, .ll-board__live");
      const resizableWindowBounds = resizableWindow?.getBoundingClientRect();
      if (resizableWindow && resizableWindowBounds
        && event.clientX >= resizableWindowBounds.right - 24
        && event.clientY >= resizableWindowBounds.bottom - 24) {
        recordBoardHistory();
        state.windowResizing = { node: resizableWindow };
        return;
      }
      const windowDrag = event.target.closest("[data-board-window-drag]");
      if (windowDrag && !event.target.closest("button")) {
        const node = windowDrag.closest(".ll-board__code, .ll-board__live");
        const rect = node?.getBoundingClientRect();
        if (node && rect) {
          recordBoardHistory();
          capturePointer(event, windowDrag);
          state.windowDragging = { node, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top, pointerId: event.pointerId, captureTarget: windowDrag };
          state.root.classList.add("is-interacting");
          event.preventDefault();
        }
        return;
      }
      const drag = event.target.closest("[data-board-drag]")?.dataset.boardDrag;
      if (drag && !event.target.closest("button")) { startDrag(event, drag); return; }
      const resize = event.target.closest("[data-board-resize]")?.dataset.boardResize;
      if (resize) { startResize(event, resize); return; }
      if (event.target.closest("[data-board-surface]") && (state.spaceDown || event.button === 1)) { event.preventDefault(); startPan(event); }
    });
    window.addEventListener("pointermove", (event) => {
      if (state.windowDragging) {
        const drag = state.windowDragging;
        drag.node.style.left = `${Math.max(8, drag.left + event.clientX - drag.x)}px`;
        drag.node.style.top = `${Math.max(8, drag.top + event.clientY - drag.y)}px`;
        drag.node.style.right = "auto";
        drag.node.style.bottom = "auto";
        drag.node.style.transform = "none";
        return;
      }
      if (state.dragging) {
        const drag = state.dragging;
        drag.artboard.x = drag.startX + (event.clientX - drag.x) / state.zoom;
        drag.artboard.y = drag.startY + (event.clientY - drag.y) / state.zoom;
        updateArtboardPosition(drag.artboard);
        return;
      }
      if (state.resizing) {
        const resize = state.resizing;
        resize.artboard.height = Math.round(Math.max(
          MIN_ARTBOARD_HEIGHT,
          Math.min(MAX_ARTBOARD_HEIGHT, resize.startHeight + (event.clientY - resize.y) / state.zoom)
        ));
        updateArtboardPosition(resize.artboard);
        return;
      }
      if (state.panning && !state.panning.frameKey) {
        state.panX = state.panning.panX + event.clientX - state.panning.x;
        state.panY = state.panning.panY + event.clientY - state.panning.y;
        applyTransform();
      }
    });
    const finishPointerInteraction = () => {
      if (state.dragging || state.resizing || state.windowDragging || state.windowResizing) recordBoardHistory();
      if (state.dragging || state.resizing) saveArtboards();
      releasePointerCapture(state.dragging);
      state.dragging = null;
      endResize();
      releasePointerCapture(state.windowDragging);
      state.windowDragging = null;
      state.windowResizing = null;
      releasePointerCapture(state.panning);
      state.panning = null;
      state.root?.classList.remove("is-panning", "is-interacting");
    };
    window.addEventListener("pointerup", finishPointerInteraction);
    window.addEventListener("pointercancel", finishPointerInteraction);
    state.root.addEventListener("wheel", (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const rect = state.root.getBoundingClientRect();
      setZoom(state.zoom + (event.deltaY < 0 ? 0.1 : -0.1), { x: event.clientX - rect.left, y: event.clientY - rect.top });
    }, { capture: true, passive: false });
    window.addEventListener("keydown", (event) => {
      if (!isOpen()) return;
      if (event.ctrlKey && event.shiftKey && event.code === "KeyE") {
        event.preventDefault();
        openExportOptions();
        return;
      }
      if (event.ctrlKey && event.shiftKey && event.code === "KeyS") {
        if (state.selectedKey && typeof state.callbacks.onSaveDevice === "function") {
          event.preventDefault();
          commitPendingCodeUpdate();
          commitFocusedCodeUpdate();
          announceSavedArtboard(state.selectedKey, state.root.querySelector(`[data-board-save="${state.selectedKey}"]`));
        }
        return;
      }
      if (event.ctrlKey && event.altKey && event.code === "KeyC") {
        event.preventDefault();
        if (state.selectedKey) openResponsiveCode(state.selectedKey);
        else openGeneralCode();
        return;
      }
      if (event.ctrlKey && event.altKey && event.shiftKey && event.code === "KeyA") {
        event.preventDefault();
        resetWindowDimensions();
        return;
      }
      if (event.ctrlKey && event.altKey && !event.shiftKey && event.code === "KeyA") {
        event.preventDefault();
        resetArtboardDimensions();
        return;
      }
      if (event.target.matches?.("input, textarea, select")) return;
      if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "z" || event.key.toLowerCase() === "y")) {
        event.preventDefault();
        restoreBoardHistory(event.key.toLowerCase() === "y" || event.shiftKey ? 1 : -1);
        return;
      }
      if (event.code === "Space") {
        state.spaceDown = true;
        broadcastBoardSpaceState(true);
        event.preventDefault();
      }
      if (event.shiftKey && event.code === "Digit1") fitBoard();
      if (event.shiftKey && event.code === "Digit2") focusArtboard(state.activeKey);
      if (event.key === "0") { state.zoom = 1; applyTransform(); }
      if (event.key === "+" || event.key === "=") setZoom(state.zoom + 0.1);
      if (event.key === "-") setZoom(state.zoom - 0.1);
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        const step = event.shiftKey ? 180 : 48;
        if (event.key === "ArrowLeft") state.panX += step;
        if (event.key === "ArrowRight") state.panX -= step;
        if (event.key === "ArrowUp") state.panY += step;
        if (event.key === "ArrowDown") state.panY -= step;
        applyTransform();
        event.preventDefault();
      }
      if (event.key === "Escape" && state.editorOpen) closeLiveEditor();
    });
    window.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        state.spaceDown = false;
        broadcastBoardSpaceState(false);
      }
    });
  }

  function open() {
    build();
    const wasClosed = state.root.hidden;
    state.root.hidden = false;
    document.body.classList.add("has-lp-board-open");
    if (!state.artboards.length) state.artboards = loadArtboards();
    if (wasClosed) {
      state.root.classList.add("is-code-open");
      window.setTimeout(() => state.code?.focus(), 0);
    }
    return true;
  }

  function close() {
    if (!state.root) return;
    state.editorOpen = false;
    state.inlineKey = null;
    state.spaceDown = false;
    broadcastBoardSpaceState(false);
    if (state.live) state.live.hidden = true;
    restorePreviewFrame();
    state.root.hidden = true;
    document.body.classList.remove("has-lp-board-open");
  }

  function isOpen() { return Boolean(state.root && !state.root.hidden); }

  function render(options = {}) {
    const incremental = Boolean(options.incremental);
    if (incremental && !isOpen()) return false;
    open();
    state.previewHtml = options.previewHtml || state.previewHtml;
    state.previewHtmlByDevice = options.previewHtmlByDevice || {};
    state.sourceByDevice = options.sourceByDevice || {};
    state.callbacks = { ...state.callbacks, ...options };
    state.activeKey = options.activeDevice || state.activeKey;
    if (!state.editorOpen && !state.inlineKey) state.inlineKey = state.activeKey;
    const liveFrame = getLiveFrame();
    const liveFrameIsMounted = Boolean(liveFrame?.parentElement?.matches("[data-board-live-mount], [data-board-live-stage]"));
    const shouldBuildArtboards = !state.scene?.querySelector("[data-board-artboard]") || (!incremental && !state.editorOpen && !liveFrameIsMounted);
    state.root.querySelectorAll("[data-board-code]").forEach((textarea) => {
      const source = getCodeSource(textarea.dataset.boardCodeDevice || "desktop");
      // Manter o foco no editor nao deve congelar o codigo exibido. Apenas
      // texto realmente pendente de gravacao protege o campo de um refresh.
      const isEditing = textarea.dataset.boardCodeDirty === "true";
      if (textarea.value === source) {
        syncCodeHighlight(textarea);
        if (!codeHistories.has(textarea)) resetCodeHistory(textarea);
        return;
      }
      if (isEditing) {
        syncCodeHighlight(textarea);
        return;
      }
      textarea.value = source;
      textarea.dataset.boardCodeDirty = "false";
      syncCodeHighlight(textarea);
      resetCodeHistory(textarea);
    });
    setCodeTitle();
    if (shouldBuildArtboards) {
      prepareLiveFrameDocument(state.inlineKey || state.activeKey);
      renderArtboards();
    } else {
      syncArtboardDocuments({ preserveLiveFrame: Boolean(options.preserveLiveFrame) });
    }
    if (state.editorOpen) { setEditorTitle(); attachPreviewFrame(); }
    if (!state.boardHistory.entries.length) recordBoardHistory();
    return true;
  }

  function sync(options = {}) {
    return render({ ...options, incremental: true, preserveLiveFrame: true });
  }

  window.LpBoard = { open, close, isOpen, render, sync, showFeedback };
})();
