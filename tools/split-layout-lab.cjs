const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const defaultSource = path.join(root, "tools/layout-lab.monolith-source.js");
const sourcePath = path.resolve(process.argv[2] || defaultSource);
const targetPath = path.join(root, "assets/js/layout-lab.js");
const tabsRoot = path.join(root, "assets/tabs");

const source = fs.readFileSync(sourcePath, "utf8");
const debug = process.argv.includes("--debug");

const modules = {
  faq: {
    title: "FAQ",
    styles: ["faqStyle"],
    functions: [
      "formatAnswer",
      "renderFaqItem",
      "buildFaqSectionHtml",
      "renderFaqEditorItems",
      "renderFaqEditor",
      "parseBulkFaq",
      "fillFromBulk",
      "addItem"
    ]
  },
  tabela: {
    title: "Tabela",
    styles: ["tableStyle"],
    functions: [
      "buildTableStyle",
      "getTableHeaderColor",
      "normalizeTableHeaderColors",
      "getTableColumns",
      "getVisibleTableRows",
      "hasTableData",
      "getHeaderRadius",
      "renderTableHeaderCell",
      "renderTableRow",
      "buildTableSectionHtml",
      "renderTableEditor",
      "createEmptyTableRow",
      "normalizeTableRows",
      "parseBulkTableHtml",
      "parseBulkTableText",
      "parseBulkTable",
      "fillTableFromBulk",
      "addTableColumn",
      "removeTableColumn",
      "addTableRow",
      "removeTableRow"
    ]
  },
  stories: {
    title: "Stories",
    styles: ["storiesStyle"],
    functions: [
      "buildStoriesStyle",
      "getStoryId",
      "getStoryPanelClass",
      "normalizeStoryType",
      "normalizeStoryPosition",
      "normalizeStoryMediaFocus",
      "normalizeStoryRingStyle",
      "getStoryRingBackground",
      "setStoriesPreviewTarget",
      "getStoriesPreviewTarget",
      "getStoryVideoType",
      "buildStoryImageVariant",
      "getStoryNextId",
      "getStoryPreviousId",
      "getAvailableStoryPreset",
      "createEmptyStorySlide",
      "createEmptyStoryGroup",
      "addStoryContainer",
      "removeStoryContainer",
      "addStorySlide",
      "removeStorySlide",
      "renderStoryOption",
      "renderStoryMedia",
      "renderStoryPanel",
      "buildStoriesSectionHtml",
      "renderStoriesEditor"
    ]
  },
  artigo: {
    title: "Artigo",
    styles: ["articleStyle"],
    functions: [
      "buildArticleStyle",
      "escapeCssUrl",
      "getArticleTags",
      "getArticleTabElements",
      "renderArticleElementToggle",
      "createArticleTab",
      "addArticleTab",
      "removeArticleTab",
      "renderArticleTags",
      "renderArticleTabButton",
      "renderArticlePanel",
      "buildArticleSectionHtml",
      "renderArticleEditor"
    ]
  },
  carrossel: {
    title: "Carrossel",
    styles: ["carouselStyle"],
    functions: [
      "buildCarouselStyle",
      "normalizeCarouselType",
      "normalizeCarouselFocus",
      "normalizeCarouselCaptionHorizontal",
      "normalizeCarouselCaptionVertical",
      "normalizeCarouselGradientAngle",
      "getCarouselCaptionStyle",
      "getCarouselIconName",
      "isInlineSvgMarkup",
      "sanitizeInlineSvgMarkup",
      "createSvgElementFromMarkup",
      "renderCarouselIcon",
      "buildCarouselImageVariant",
      "getCarouselSlides",
      "setCarouselPreviewSlide",
      "createCarouselSlide",
      "addCarouselSlide",
      "removeCarouselSlide",
      "renderCarouselImage",
      "renderCarouselPicture",
      "renderCarouselImpactSlide",
      "renderCarouselDecisionSlide",
      "renderCarouselPanel",
      "buildCarouselSectionHtml",
      "renderCarouselEditor"
    ]
  },
  dashboard: {
    title: "Dashboard / guias",
    styles: [],
    functions: [
      "getContentDashboardSections",
      "getTemplateDashboardSection",
      "getContentDashboardGuides",
      "renderDashboardEditor",
      "buildDashboardGuidePreviewHtml",
      "buildDashboardDesignTrendsPreviewHtml",
      "buildDashboardCopywritingTrendsPreviewHtml",
      "buildDashboardPreviewHtml"
    ]
  },
  "lp-container": {
    title: "LP container",
    styles: [],
    functions: [
      "getTemplateLayoutOptions",
      "buildTemplateLayoutPackage",
      "extractLpContainerHtml",
      "getTemplateHeaderDefaults",
      "getTemplateHeader",
      "stripHeaderImageVariant",
      "withHeaderImageSize",
      "buildTemplateHeaderMarkup",
      "buildTemplateHeaderHtml",
      "buildTemplateHeaderStyle",
      "buildLpContainerCss",
      "buildLpContainerHtml",
      "buildTemplatePreviewHtml",
      "buildTemplateOutputHtml",
      "getPreviewScrollPosition",
      "restorePreviewScrollPosition",
      "closePreviewEditPopover",
      "getPreviewEditPoint",
      "positionPreviewEditPopover",
      "openPreviewEditPopover",
      "getPreviewEditTab",
      "normalizePreviewText",
      "colorToHex",
      "canUseGradientColor",
      "normalizeTextStyleNumber",
      "normalizePreviewFontWeight",
      "normalizePreviewTextAlign",
      "getTextStyleTab",
      "getPreviewTextStyleKey",
      "getPreviewTextStyle",
      "normalizePreviewTextStyle",
      "setPreviewTextStyle",
      "buildPreviewTextStyle",
      "previewTextStyleAttr",
      "getTemplatePreviewNode",
      "isTransparentColor",
      "cleanTemplatePreviewClone",
      "syncTemplateHtmlFromPreview",
      "getTemplateMediaValue",
      "normalizeYouTubeEmbedUrl",
      "setTemplateMediaValue",
      "findTemplateHeaderRoot",
      "getTemplateHeaderDataFromElement",
      "createTemplateHeaderElement",
      "getTemplateHeaderType",
      "getTemplateHeaderBannerElement",
      "isTemplateHeaderBannerTarget",
      "getTemplateHeaderBannerImage",
      "updateTemplateHeaderImageSources",
      "updateTemplateHeaderVideoSources",
      "updateTemplateHeaderBannerInPlace",
      "renameTemplateHeaderClasses",
      "convertTemplateBadgeForType",
      "createTemplateHeaderBannerForType",
      "convertTemplateHeaderTypeInPlace",
      "attachTemplateHeaderEditor",
      "openTemplateHeaderPopover",
      "openTemplateImagePopover",
      "openTemplateSvgPopover",
      "updateTemplatePreviewEditValue",
      "updateInlinePreviewTextValue",
      "getComputedPreviewTextStyle",
      "readPreviewEditValue",
      "updatePreviewEditValue",
      "setupPreviewEditing",
      "renderTemplateEditor",
      "clearTemplateHtml",
      "saveTemplateHtmlCache",
      "loadTemplateHtmlCache",
      "importTemplateHtmlFile"
    ]
  }
};

function writeFile(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${contents.trimEnd()}\n`, "utf8");
}

function lineOf(index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function parseOk(snippet) {
  try {
    // Parses the function declaration without executing it.
    // eslint-disable-next-line no-new-func
    new Function(`${snippet}\n`);
    return true;
  } catch {
    return false;
  }
}

function extractFunction(name) {
  const startNeedle = `    function ${name}`;
  const start = source.indexOf(startNeedle);
  if (start < 0) {
    throw new Error(`Function not found: ${name}`);
  }

  const closingPattern = /^    \}/gm;
  closingPattern.lastIndex = start;
  let match;
  while ((match = closingPattern.exec(source))) {
    let end = match.index + match[0].length;
    while (end < source.length && (source[end] === "\r" || source[end] === "\n")) {
      end += 1;
    }
    const snippet = source.slice(start, end).trimEnd();
    if (parseOk(snippet)) {
      return { start, end, text: snippet };
    }
  }

  throw new Error(`Function end not found: ${name}`);
}

function extractStyleConst(name) {
  const pattern = new RegExp(`^    const\\s+${name}\\s*=\\s+\`<style>[\\s\\S]*?^\\s*</style>\`;\\r?\\n?`, "m");
  const match = source.match(pattern);
  if (!match || match.index === undefined) {
    throw new Error(`Style const not found: ${name}`);
  }
  return {
    start: match.index,
    end: match.index + match[0].length,
    text: match[0].trimEnd()
  };
}

const movedBlocks = [];

for (const [tab, config] of Object.entries(modules)) {
  const chunks = [
    `/**\n * Modulo oficial da aba ${config.title}.\n * Carregado antes de assets/js/layout-lab.js.\n * Este arquivo contem a logica que antes ficava direto no motor central.\n */`
  ];

  for (const styleName of config.styles) {
    const block = extractStyleConst(styleName);
    if (debug) {
      console.log(`${tab}: ${styleName} ${lineOf(block.start)}-${lineOf(block.end)}`);
    }
    chunks.push(block.text);
    movedBlocks.push(block);
  }

  for (const functionName of config.functions) {
    const block = extractFunction(functionName);
    if (debug) {
      console.log(`${tab}: ${functionName} ${lineOf(block.start)}-${lineOf(block.end)}`);
    }
    chunks.push(block.text);
    movedBlocks.push(block);
  }

  writeFile(path.join(tabsRoot, tab, `${tab}.js`), chunks.join("\n\n"));
}

const mergedBlocks = [];
for (const block of movedBlocks.sort((a, b) => a.start - b.start)) {
  const previous = mergedBlocks[mergedBlocks.length - 1];
  if (previous && block.start <= previous.end) {
    previous.end = Math.max(previous.end, block.end);
  } else {
    mergedBlocks.push({ start: block.start, end: block.end });
  }
}

let core = source;
for (const block of mergedBlocks.sort((a, b) => b.start - a.start)) {
  core = `${core.slice(0, block.start)}${core.slice(block.end)}`;
}

const coreHeader = `/**\n * Layout Lab core/orquestrador.\n * As funcoes especificas de cada aba ficam em assets/tabs/<aba>/<aba>.js\n * e sao carregadas antes deste arquivo nas paginas do app.\n */`;

writeFile(targetPath, `${coreHeader}\n\n${core}`);

for (const [tab, config] of Object.entries(modules)) {
  const readme = `# ${config.title}\n\nEsta pasta agrupa os arquivos da aba ${config.title} para ficar mais facil localizar e editar o layout.\n\n- ${tab}.html: estrutura HTML de referencia do bloco gerado.\n- ${tab}.css: estilos do bloco/output desta aba.\n- ${tab}.js: modulo oficial carregado pela pagina antes do core.\n\nObservacao: se a aba quebrar, procure primeiro neste arquivo JS. O core fica em assets/js/layout-lab.js e deve cuidar apenas da orquestracao geral.`;
  writeFile(path.join(tabsRoot, tab, "README.md"), readme);
}

console.log(`Split complete from ${sourcePath}`);
