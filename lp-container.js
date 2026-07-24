/**
 * Modulo oficial da aba LP container.
 * Carregado antes de assets/js/layout-lab.js.
 * Este arquivo contem a logica que antes ficava direto no motor central.
 */

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
        return buildResponsivePackage("table", () => buildTableSectionHtml(true), () => buildTabStyleWithClass("table", buildTableStyle));
      }

      if (tab === "stories") {
        return buildResponsivePackage("stories", () => buildStoriesSectionHtml(), () => buildTabStyleWithClass("stories", buildStoriesStyle));
      }

      if (tab === "article") {
        return buildResponsivePackage("article", () => buildArticleSectionHtml(), () => buildTabStyleWithClass("article", buildArticleStyle));
      }

      if (tab === "carousel") {
        return buildResponsivePackage("carousel", () => buildCarouselSectionHtml(), () => buildTabStyleWithClass("carousel", buildCarouselStyle));
      }

      return buildResponsivePackage("faq", () => buildFaqSectionHtml(), () => buildTabStyleWithClass("faq", buildFaqStyle));
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

    function extractTemplateEmbeddedCss(value = state.template.html) {
      const rawValue = String(value || "").trim();
      if (!rawValue || !/<style\b/i.test(rawValue)) {
        return "";
      }

      const parsedDocument = new DOMParser().parseFromString(`<div data-ll-style-root>${rawValue}</div>`, "text/html");
      const wrapper = parsedDocument.querySelector("[data-ll-style-root]");
      if (!wrapper) {
        return "";
      }

      return Array.from(wrapper.querySelectorAll("style"))
        .map((element) => element.textContent || "")
        .map((css) => css.trim())
        .filter(Boolean)
        .join("\n\n");
    }

    function stripTemplateEmbeddedStyles(value) {
      const rawValue = String(value || "").trim();
      if (!rawValue || !/<style\b/i.test(rawValue)) {
        return rawValue;
      }

      const parsedDocument = new DOMParser().parseFromString(`<div data-ll-style-root>${rawValue}</div>`, "text/html");
      const wrapper = parsedDocument.querySelector("[data-ll-style-root]");
      if (!wrapper) {
        return rawValue;
      }

      wrapper.querySelectorAll("style").forEach((element) => element.remove());
      return wrapper.innerHTML.trim();
    }

    function buildTemplateEmbeddedStyle(value = state.template.html) {
      const css = extractTemplateEmbeddedCss(value);
      return css ? `<style>\n${css}\n</style>` : "";
    }

    function cleanTemplateEditorArtifacts(value, options = {}) {
      const rawValue = String(value || "").trim();
      if (!rawValue || !/<\/?[a-z][\s\S]*>/i.test(rawValue)) {
        return rawValue;
      }

      const preservePreviewFaqState = options.preservePreviewFaqState === true;
      const parsedDocument = new DOMParser().parseFromString(`<div data-ll-clean-root>${rawValue}</div>`, "text/html");
      const wrapper = parsedDocument.querySelector("[data-ll-clean-root]");
      if (!wrapper) {
        return rawValue;
      }

      wrapper.querySelectorAll("#ll-template-faq-custom-style").forEach((element) => {
        element.remove();
      });

      Array.from(wrapper.querySelectorAll("*")).forEach((element) => {
        if (!preservePreviewFaqState && element.style) {
          const normalBg = element.style.getPropertyValue("--ll-template-faq-summary-bg");
          const questionColor = element.style.getPropertyValue("--ll-template-faq-question-color");
          const answerColor = element.style.getPropertyValue("--ll-template-faq-answer-color");

          if (isHexColor(normalBg)) {
            const summaryTargets = element.matches?.("summary, #faq-section__summary, .ll-template-faq-summary")
              ? [element]
              : Array.from(element.querySelectorAll("summary, #faq-section__summary, .ll-template-faq-summary"));
            summaryTargets.forEach((target) => {
              target.style.background = normalizeHexColor(normalBg);
            });
          }

          if (isHexColor(questionColor)) {
            const questionTargets = element.matches?.("#faq-section__q-text, [id*='q-text'], [class*='question' i], [class*='pergunta' i]")
              ? [element]
              : Array.from(element.querySelectorAll("#faq-section__q-text, [id*='q-text'], [class*='question' i], [class*='pergunta' i]"));
            questionTargets.forEach((target) => {
              target.style.color = normalizeHexColor(questionColor);
            });
          }

          if (isHexColor(answerColor)) {
            const answerTargets = element.matches?.("#faq-section__a-text, [id*='a-text'], [class*='answer' i], [class*='resposta' i]")
              ? [element]
              : Array.from(element.querySelectorAll("#faq-section__a-text, [id*='a-text'], [class*='answer' i], [class*='resposta' i]"));
            answerTargets.forEach((target) => {
              target.style.color = normalizeHexColor(answerColor);
            });
          }
        }

        if (!preservePreviewFaqState && element.classList) {
          element.classList.remove("ll-template-faq-summary", "ll-template-faq-custom-colors");
          if (!element.getAttribute("class")) {
            element.removeAttribute("class");
          }
        }

        if (!preservePreviewFaqState && element.style) {
          element.style.removeProperty("--ll-template-faq-summary-bg");
          element.style.removeProperty("--ll-template-faq-summary-hover-bg");
          element.style.removeProperty("--ll-template-faq-question-color");
          element.style.removeProperty("--ll-template-faq-answer-color");
          if (!element.getAttribute("style")) {
            element.removeAttribute("style");
          }
        }
      });

      return wrapper.innerHTML.trim();
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
  color: #111827;
}
` : "";

      return `<style>
${frameCss}
${includeFrame ? "" : `
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
`}
</style>`;
    }

    function buildTemplateFaqCustomStyle() {
      const rawValue = String(state.template.html || "").trim();
      if (!rawValue || !/<\/?[a-z][\s\S]*>/i.test(rawValue)) {
        return "";
      }

      const parsedDocument = new DOMParser().parseFromString(`<div data-ll-faq-style-root>${extractLpContainerHtml(rawValue)}</div>`, "text/html");
      const wrapper = parsedDocument.querySelector("[data-ll-faq-style-root]");
      const faqRoot = wrapper?.querySelector(".ll-template-faq-custom-colors, [style*='--ll-template-faq-summary-bg'], [style*='--ll-template-faq-summary-hover-bg']");
      if (!faqRoot) {
        return "";
      }

      const normalRaw = faqRoot.style.getPropertyValue("--ll-template-faq-summary-bg") || "";
      const hoverRaw = faqRoot.style.getPropertyValue("--ll-template-faq-summary-hover-bg") || "";
      const questionColorRaw = faqRoot.style.getPropertyValue("--ll-template-faq-question-color")
        || wrapper.querySelector("#faq-section__q-text, [id*='q-text']")?.style.color
        || "";
      const answerColorRaw = faqRoot.style.getPropertyValue("--ll-template-faq-answer-color")
        || wrapper.querySelector("#faq-section__a-text, [id*='a-text']")?.style.color
        || "";
      const optionalColorToHex = (value) => {
        const rawColor = String(value || "").trim();
        if (isHexColor(rawColor)) {
          return normalizeHexColor(rawColor);
        }

        return /^rgba?\(/i.test(rawColor) ? colorToHex(rawColor, "#000000") : "";
      };
      const normal = optionalColorToHex(normalRaw);
      const hover = optionalColorToHex(hoverRaw);
      const questionColor = optionalColorToHex(questionColorRaw);
      const answerColor = optionalColorToHex(answerColorRaw);
      const rules = [];

      if (isHexColor(normal)) {
        rules.push(`#faq-section__summary { background: ${normal} !important; }`);
      }

      if (isHexColor(hover)) {
        rules.push(`#faq-section__summary:hover { background: ${hover} !important; }`);
      }

      if (isHexColor(questionColor)) {
        rules.push(`#faq-section__q-text { color: ${normalizeHexColor(questionColor)} !important; }`);
      }

      if (isHexColor(answerColor)) {
        rules.push(`#faq-section__a-text { color: ${normalizeHexColor(answerColor)} !important; }`);
      }

      if (!rules.length) {
        return "";
      }

      return `<style>
${rules.join("\n")}
</style>`;
    }

    function buildTemplateStyle() {
      return [buildTemplateHeaderStyle(), buildTemplateFaqCustomStyle()].filter(Boolean).join("\n\n");
    }

    function buildLpContainerHtml(value = state.template.html, options = {}) {
      const extractedContent = extractLpContainerHtml(value);
      const contentWithoutStyles = stripTemplateEmbeddedStyles(extractedContent);
      const content = cleanTemplateEditorArtifacts(contentWithoutStyles, {
        preservePreviewFaqState: options.includeLabAttrs === true
      });
      const innerHtml = content || "";
      return `<div class="lp-container">
${innerHtml}
</div>`;
    }

    function buildTemplatePreviewHtml() {
      const templateStyle = typeof buildTabStyleWithClass === "function"
        ? buildTabStyleWithClass("template", buildTemplateStyle)
        : buildTemplateStyle();

      return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${buildLpContainerCss(true)}
  ${buildTemplateEmbeddedStyle()}
  ${templateStyle}
</head>
<body>
${buildLpContainerHtml(state.template.html, { includeLabAttrs: true })}
</body>
</html>`;
    }

    function buildTemplateOutputHtml(copyMode = "html") {
      const containerHtml = buildLpContainerHtml();

      if (copyMode === "full") {
        const templateStyle = typeof buildTabStyleWithClass === "function"
          ? buildTabStyleWithClass("template", buildTemplateStyle)
          : buildTemplateStyle();
        const embeddedStyle = buildTemplateEmbeddedStyle();

        return `${[embeddedStyle, templateStyle].filter(Boolean).join("\n\n")}

<!-- HTML DO LAYOUT -->

${containerHtml}`;
      }

      return containerHtml;
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
      const sourceElement = options.sourceElement || sourceEvent?.currentTarget || sourceEvent?.target || document.body;
      const classCandidates = (isColor || isTextStyle) ? getPreviewClassCandidates(sourceElement) : [];
      const currentValue = isColor
        ? normalizeCssColorValue(readPreviewEditValue(meta))
        : String(readPreviewEditValue(meta) || "");
      const currentTextStyle = isTextStyle
        ? {
            ...getComputedPreviewTextStyle(sourceElement),
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
      let editMode = "element";
      let classSelect = null;
      let classPropertySelect = null;
      let resetClassButton = null;

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
            if (colorGradientInputs?.toggle?.checked) {
              colorGradientInputs.start.value = valueInput.value;
            }
            applyLiveValue();
          }
        });

        colorInput.addEventListener("input", () => {
          valueInput.value = normalizeHexColor(colorInput.value);
          colorInput.style.setProperty("--preview-edit-color", valueInput.value);
          if (colorGradientInputs?.toggle?.checked) {
            colorGradientInputs.start.value = valueInput.value;
          }
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
              if (colorGradientInputs?.toggle?.checked) {
                colorGradientInputs.start.value = valueInput.value;
              }
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
          const color = document.createElement("input");
          color.type = "color";
          color.className = "preview-edit-popover__color preview-edit-popover__inline-swatch";
          color.setAttribute("aria-label", "Abrir seletor de cor");
          color.setAttribute("title", "Abrir seletor de cor");
          const input = document.createElement("input");
          input.type = "text";
          input.value = colorToHex(initialValue);
          color.value = input.value;
          input.placeholder = "#111827";
          color.style.setProperty("--preview-edit-color", input.value);
          input.addEventListener("input", () => {
            if (isHexColor(input.value)) {
              input.value = normalizeHexColor(input.value);
              color.value = input.value;
              color.style.setProperty("--preview-edit-color", input.value);
              applyLiveValue({ multiline: options.multiline });
            }
          });
          color.addEventListener("input", () => {
            input.value = normalizeHexColor(color.value);
            color.style.setProperty("--preview-edit-color", input.value);
            applyLiveValue({ multiline: options.multiline });
          });
          wrapper.append(color, input);
          wrapper.__llColorInput = input;
          return wrapper;
        };

        const textColorControl = createInlineHexControl(currentTextStyle.color);
        const textColorInput = textColorControl.__llColorInput;
        const backgroundColorControl = options.backgroundElement
          ? createInlineHexControl(colorToHex(
              sourceElement.ownerDocument.defaultView.getComputedStyle(sourceElement).backgroundColor || "#0ea5e9",
              "#0ea5e9"
            ))
          : null;
        const backgroundColorInput = backgroundColorControl?.__llColorInput || null;

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
        if (backgroundColorControl) {
          createMiniField("Fundo", backgroundColorControl);
        }
        createMiniField("Tamanho", fontSizeInput);
        createMiniField("Peso", fontWeightSelect);
        createMiniField("Alinhamento", textAlignSelect);
        createMiniField("Estilo", fontStyleSelect);
        createMiniField("Altura da linha", lineHeightInput);
        form.appendChild(grid);

        styleInputs = {
          color: textColorInput,
          backgroundColor: backgroundColorInput,
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

      if ((isColor || isTextStyle) && classCandidates.length) {
        const controlNodes = Array.from(form.children).filter((node) => node !== title);
        const tabs = document.createElement("div");
        tabs.className = "preview-edit-popover__tabs";

        const elementTab = document.createElement("button");
        elementTab.type = "button";
        elementTab.textContent = "Elemento";
        elementTab.className = "is-active";

        const classTab = document.createElement("button");
        classTab.type = "button";
        classTab.textContent = "Classe/ID";

        tabs.append(elementTab, classTab);

        const elementPanel = document.createElement("div");
        elementPanel.className = "preview-edit-popover__panel";
        controlNodes.forEach((node) => elementPanel.appendChild(node));

        const classPanel = document.createElement("div");
        classPanel.className = "preview-edit-popover__panel preview-edit-popover__panel--class";
        classPanel.hidden = true;

        const classField = document.createElement("label");
        classField.className = "preview-edit-popover__mini-field";
        const classLabel = document.createElement("span");
        classLabel.textContent = "Classe ou ID alvo";
        classSelect = document.createElement("select");
        classCandidates.forEach((candidate) => {
          const option = document.createElement("option");
          option.value = candidate.className;
          option.textContent = candidate.label;
          classSelect.appendChild(option);
        });
        classField.append(classLabel, classSelect);
        classPanel.appendChild(classField);

        if (isColor) {
          const propertyField = document.createElement("label");
          propertyField.className = "preview-edit-popover__mini-field";
          const propertyLabel = document.createElement("span");
          propertyLabel.textContent = "Aplicar em";
          classPropertySelect = document.createElement("select");
          [
            ["background", "Fundo"],
            ["color", "Texto"],
            ["border-color", "Borda"],
            ["outline-color", "Contorno"]
          ].forEach(([value, label]) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            option.selected = inferPreviewClassColorProperty(meta, options) === value;
            classPropertySelect.appendChild(option);
          });
          propertyField.append(propertyLabel, classPropertySelect);
          classPanel.appendChild(propertyField);
        }

        const note = document.createElement("p");
        note.className = "preview-edit-popover__note";
        note.textContent = isTextStyle
          ? "Nesta aba, os controles de estilo afetam todos os elementos com a classe ou ID escolhido. O texto continua individual."
          : "Nesta aba, a cor selecionada afeta todos os elementos com a classe ou ID escolhido.";
        classPanel.appendChild(note);

        resetClassButton = document.createElement("button");
        resetClassButton.type = "button";
        resetClassButton.className = "button button--soft";
        resetClassButton.textContent = "Limpar classe";
        classPanel.appendChild(resetClassButton);

        form.append(tabs, classPanel, elementPanel);

        const setEditMode = (mode) => {
          editMode = mode;
          classPanel.hidden = mode !== "class";
          if (isTextStyle && valueInput) {
            valueInput.hidden = mode === "class";
          }
          elementTab.classList.toggle("is-active", mode === "element");
          classTab.classList.toggle("is-active", mode === "class");
        };

        elementTab.addEventListener("click", () => setEditMode("element"));
        classTab.addEventListener("click", () => setEditMode("class"));
        classSelect.addEventListener("change", () => applyLiveValue({ multiline: options.multiline }));
        classPropertySelect?.addEventListener("change", () => applyLiveValue({ multiline: options.multiline }));
        resetClassButton.addEventListener("click", () => clearPreviewClassStyle(meta, classSelect.value));
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

      const applyLiveValue = (applyOptions = {}) => {
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

          if (editMode === "class" && classSelect) {
            const property = classPropertySelect?.value || inferPreviewClassColorProperty(meta, options);
            setPreviewClassStyle(meta, classSelect.value, { [property]: nextValue });
            return;
          }
        }

        if (isTextStyle) {
          const nextText = normalizePreviewText(nextValue, Boolean(applyOptions.multiline));
          const nextStyle = applyOptions.clearStyle ? {} : {
            color: styleInputs.color.value,
            ...(styleInputs.backgroundColor ? { backgroundColor: styleInputs.backgroundColor.value } : {}),
            fontSize: styleInputs.fontSize.value,
            fontWeight: styleInputs.fontWeight.value,
            textAlign: styleInputs.textAlign.value,
            fontStyle: styleInputs.fontStyle.value,
            lineHeight: styleInputs.lineHeight.value
          };

          if (editMode === "class" && classSelect) {
            if (applyOptions.clearStyle) {
              clearPreviewClassStyle(meta, classSelect.value);
            } else {
              setPreviewClassStyle(meta, classSelect.value, nextStyle);
            }
            return;
          }

          updatePreviewEditValue({ ...meta, type: "textStyle", multiline: applyOptions.multiline, allowBackgroundStyle: Boolean(styleInputs.backgroundColor) }, {
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
        Object.values(styleInputs).filter(Boolean).forEach((input) => {
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
    const numericValue = Number(String(value || "").replace(",", "."));
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
      return ["table", "stories", "article", "carousel", "bento", "template"].includes(meta.scope) ? meta.scope : "faq";
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
        meta.tagIndex,
        meta.bentoNodeId
      ].filter((part) => part !== undefined && part !== null && part !== "").join(":");
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
        meta.tagIndex,
        meta.bentoNodeId
      ].filter((part) => part !== undefined && part !== null && part !== "").join(":");
    }

    function normalizePreviewTextStyle(style = {}) {
      const normalized = {};

      if (style.color) {
        normalized.color = colorToHex(style.color);
      }

      if (style.backgroundColor) {
        normalized.backgroundColor = colorToHex(style.backgroundColor, "#0ea5e9");
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

      if (style.backgroundColor) {
        declarations.push(`background-color: ${style.backgroundColor}`);
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

    function getPreviewClassStyleTab(meta = {}) {
      return ["table", "stories", "article", "carousel", "bento", "template"].includes(meta.scope) ? meta.scope : "faq";
    }

    function escapeCssClassName(value) {
      const className = String(value || "").trim();
      if (!className) {
        return "";
      }

      if (window.CSS && typeof window.CSS.escape === "function") {
        return window.CSS.escape(className);
      }

      return className.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
    }

    function isUsefulPreviewClass(className) {
      const value = String(className || "").trim();
      if (!value) {
        return false;
      }

      return !/^(is-|has-|js-|sr-only|button$|field$|icon-button$|theme-toggle|preview-edit-popover|ll-template-|ql-|cm-)/.test(value);
    }

    function getPreviewClassCandidates(element) {
      const doc = element?.ownerDocument || document;
      const stopSelectors = ".preview-frame, .preview-shell, body, html";
      const candidates = [];
      const seen = new Set();
      let current = element?.nodeType === 1 ? element : element?.parentElement;

      while (current && current.nodeType === 1 && !current.matches?.(stopSelectors)) {
        Array.from(current.classList || []).forEach((className) => {
          if (!isUsefulPreviewClass(className) || seen.has(className)) {
            return;
          }

          const selector = `.${escapeCssClassName(className)}`;
          let count = 1;
          try {
            count = doc.querySelectorAll(selector).length || 1;
          } catch (error) {}

          seen.add(className);
          candidates.push({
            className,
            selector,
            count,
            label: `.${className}${count > 1 ? ` (${count})` : ""}`
          });
        });

        const elementId = String(current.id || "").trim();
        if (elementId && !seen.has(`#${elementId}`) && !/^ll-template-|^preview-|^codex-/i.test(elementId)) {
          const selector = `#${escapeCssClassName(elementId)}`;
          let count = 1;
          try {
            count = doc.querySelectorAll(selector).length || 1;
          } catch (error) {}

          seen.add(`#${elementId}`);
          candidates.push({
            className: `#${elementId}`,
            selector,
            count,
            label: `#${elementId}${count > 1 ? ` (${count})` : ""}`
          });
        }

        if (current.matches?.(".ll-carousel, .ll-bento, .lp-container, .lp_container, .table-container-custom, #faq-section, .faq-section")) {
          break;
        }

        current = current.parentElement;
      }

      return candidates;
    }

    function inferPreviewClassColorProperty(meta = {}, options = {}) {
      const field = String(meta.field || "").toLowerCase();
      const label = String(options.label || "").toLowerCase();

      if (field.includes("text") || field.includes("question") || field.includes("answer") || label.includes("texto")) {
        return "color";
      }

      if (field.includes("border") || field.includes("ring") || field.includes("outline") || label.includes("borda")) {
        return "border-color";
      }

      return "background";
    }

    function normalizePreviewClassDeclarations(style = {}) {
      const declarations = {};

      Object.entries(style || {}).forEach(([property, value]) => {
    const rawValue = String(value || "").trim();
        if (!rawValue) {
          return;
        }

        if (property === "fontSize") {
          declarations["font-size"] = `${normalizeTextStyleNumber(rawValue, 16, 8, 96)}px`;
          return;
        }

        if (property === "fontWeight") {
          declarations["font-weight"] = normalizePreviewFontWeight(rawValue);
          return;
        }

        if (property === "fontStyle" && rawValue === "italic") {
          declarations["font-style"] = "italic";
          return;
        }

        if (property === "textAlign") {
          declarations["text-align"] = normalizePreviewTextAlign(rawValue);
          return;
        }

        if (property === "lineHeight") {
          declarations["line-height"] = String(normalizeTextStyleNumber(rawValue, 1.35, 0.8, 2.6, 2));
          return;
        }

        if (["background", "background-color", "color", "border-color", "outline-color"].includes(property)) {
          declarations[property] = /^linear-gradient\(/i.test(rawValue) ? rawValue : normalizeCssColorValue(rawValue);
        }
      });

      return declarations;
    }

    function normalizePreviewSelectorValue(value) {
      const rawValue = String(value || "").trim();
      if (!rawValue) {
        return null;
      }

      if (rawValue.startsWith(".") || rawValue.startsWith("#")) {
        return { key: rawValue, selector: rawValue };
      }

      return { key: rawValue, selector: `.${escapeCssClassName(rawValue)}` };
    }

    function setPreviewClassStyle(meta, className, declarations = {}) {
      const normalizedSelector = normalizePreviewSelectorValue(className);
      if (!normalizedSelector) {
        return;
      }

      const tab = getPreviewClassStyleTab(meta);
      const normalized = normalizePreviewClassDeclarations(declarations);
      if (!Object.keys(normalized).length) {
        return;
      }

      state.classStyles = state.classStyles || {};
      state.classStyles[tab] = state.classStyles[tab] || {};
      state.classStyles[tab][normalizedSelector.key] = {
        className: normalizedSelector.key,
        selector: normalizedSelector.selector,
        declarations: {
          ...((state.classStyles[tab][normalizedSelector.key] && state.classStyles[tab][normalizedSelector.key].declarations) || {}),
          ...normalized
        }
      };

      if (currentPage === "conteudo") {
        markResponsiveDirty();
      }

      renderEditor(true);
    }

    function clearPreviewClassStyle(meta, className) {
      const normalizedSelector = normalizePreviewSelectorValue(className);
      const tab = getPreviewClassStyleTab(meta);
      if (!normalizedSelector || !state.classStyles?.[tab]?.[normalizedSelector.key]) {
        return;
      }

      delete state.classStyles[tab][normalizedSelector.key];
      if (currentPage === "conteudo") {
        markResponsiveDirty();
      }
      renderEditor(true);
    }

    function buildPreviewClassStyle(tab) {
      const styles = state.classStyles?.[tab] || {};
      const rules = Object.values(styles).map((entry) => {
        const selector = entry?.selector || (entry?.className ? `.${escapeCssClassName(entry.className)}` : "");
        const declarations = Object.entries(entry?.declarations || {})
          .filter(([, value]) => String(value || "").trim())
          .map(([property, value]) => `  ${property}: ${value} !important;`);

        return selector && declarations.length ? `${selector} {\n${declarations.join("\n")}\n}` : "";
      }).filter(Boolean);

      if (!rules.length) {
        return "";
      }

      return `<style>\n/* Ajustes por classe feitos no preview */\n${rules.join("\n\n")}\n</style>`;
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
      clone.querySelectorAll("#ll-template-faq-custom-style").forEach((element) => {
        element.remove();
      });
      clone.querySelectorAll("[data-ll-template-faq-title-text]").forEach((element) => {
        const parent = element.parentNode;
        if (!parent) {
          return;
        }

        if (parent.nodeType === 1 && element.getAttribute("style")) {
          Array.from(element.style).forEach((property) => {
            parent.style.setProperty(
              property,
              element.style.getPropertyValue(property),
              element.style.getPropertyPriority(property)
            );
          });
        }

        while (element.firstChild) {
          parent.insertBefore(element.firstChild, element);
        }
        element.remove();
      });
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
          "data-ll-preview-overlay-width",
          "data-ll-preview-manual-story",
          "data-ll-preview-story-panel",
          "data-ll-preview-story-active",
          "data-ll-preview-story-hidden",
          "data-ll-preview-story-current",
          "data-ll-template-iframe-parent",
          "data-ll-table-edit-root",
          "data-ll-preview-header-editor",
          "data-ll-preview-header-banner",
          "data-ll-template-faq-title-ready"
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

    function getBentoPreviewRoot() {
      const doc = previewFrame.contentDocument;
      return doc ? doc.querySelector(".ll-bento") : null;
    }

    function getBentoPreviewNode(meta) {
      const doc = previewFrame.contentDocument;
      if (!doc || !meta.bentoNodeId) {
        return null;
      }

      return doc.querySelector(`[data-ll-bento-node="${meta.bentoNodeId}"]`);
    }

    function cleanBentoPreviewClone(container) {
      const clone = container.cloneNode(true);
      [clone, ...clone.querySelectorAll("*")].forEach((element) => {
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
        element.removeAttribute("contenteditable");
        element.removeAttribute("spellcheck");
        if (element.classList) {
          element.classList.remove("ll-template-faq-summary", "ll-template-faq-custom-colors");
          if (!element.getAttribute("class")) {
            element.removeAttribute("class");
          }
        }
        if (element.style) {
          element.style.removeProperty("--ll-template-faq-summary-bg");
          element.style.removeProperty("--ll-template-faq-summary-hover-bg");
          if (!element.getAttribute("style")) {
            element.removeAttribute("style");
          }
        }

        const title = element.getAttribute("title") || "";
        if (/^Clique para editar|^Clique para trocar|^Duplo clique para editar|^D[eê] dois cliques para trocar/i.test(title)) {
          element.removeAttribute("title");
        }
      });

      return clone;
    }

    function syncBentoHtmlFromPreview() {
      const root = getBentoPreviewRoot();
      if (!root) {
        return;
      }

      const clone = cleanBentoPreviewClone(root);
      state.bento.html = clone.outerHTML.trim();
      state.bento.useCustomHtml = true;
      state.bento.status = "Editado pela prévia.";

      const textarea = editor.querySelector('[data-bento-field="html"]');
      if (textarea && document.activeElement !== textarea) {
        textarea.value = state.bento.html;
      }

      generatedHtml.value = buildOutputHtml("html");
      copyStatus.textContent = "";
      copyStatus.classList.remove("is-warning", "is-visible");
    }

    function getBentoMediaValue(element) {
      if (!element) {
        return "";
      }

      const tagName = element.tagName;
      if (tagName === "SOURCE") {
        return element.getAttribute("srcset") || "";
      }

      if (["IMG", "VIDEO", "IFRAME"].includes(tagName)) {
        return element.getAttribute("src") || "";
      }

      const backgroundImage = element.style.backgroundImage || element.ownerDocument.defaultView.getComputedStyle(element).backgroundImage || "";
      const urlMatch = backgroundImage.match(/url\(["']?(.+?)["']?\)/i);
      return urlMatch ? urlMatch[1] : "";
    }

    function setBentoMediaValue(element, value) {
      if (!element) {
        return;
      }

      const normalizedValue = normalizeAssetUrl(value);
      const safeUrl = normalizedValue.replaceAll('"', "%22");
      const tagName = element.tagName;

      if (tagName === "SOURCE") {
        if (element.closest("picture")) {
          element.remove();
        } else {
          element.setAttribute("src", normalizedValue);
          element.removeAttribute("srcset");
        }
        return;
      }

      if (tagName === "IMG") {
        element.setAttribute("src", normalizedValue);
        const picture = element.closest("picture");
        if (picture) {
          picture.querySelectorAll("source").forEach((source) => {
            source.remove();
          });
        }
        return;
      }

      if (tagName === "VIDEO" || tagName === "IFRAME") {
        element.setAttribute("src", normalizedValue);
        element.load?.();
        return;
      }

      const view = element.ownerDocument.defaultView;
      const currentBackground = element.style.backgroundImage || view.getComputedStyle(element).backgroundImage || "";
      const nextUrl = `url("${safeUrl}")`;
      element.style.backgroundImage = /url\(/i.test(currentBackground)
        ? currentBackground.replace(/url\(["']?.+?["']?\)/i, nextUrl)
        : nextUrl;
    }

    function updateBentoPreviewEditValue(meta, rawValue, normalizedValue) {
      const element = getBentoPreviewNode(meta);
      if (!element) {
        return;
      }

      if (currentPage === "conteudo") {
        markResponsiveDirty();
      }

      if (meta.type === "textStyle") {
        const value = normalizePreviewText(rawValue && rawValue.text, Boolean(meta.multiline));
        const style = normalizePreviewTextStyle(rawValue && rawValue.style ? rawValue.style : {});
        element.textContent = value;
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
        setBentoMediaValue(element, normalizedValue);
      } else if (meta.type === "color") {
        if (/gradient\(/i.test(normalizedValue)) {
          element.style.backgroundImage = normalizedValue;
          element.style.backgroundColor = "";
        } else {
          const view = element.ownerDocument.defaultView;
          const backgroundImage = element.style.backgroundImage || view.getComputedStyle(element).backgroundImage || "";
          if (backgroundImage && backgroundImage !== "none" && !/url\(/i.test(backgroundImage)) {
            element.style.backgroundImage = "none";
          }
          element.style.backgroundColor = normalizedValue;
        }
      }

      syncBentoHtmlFromPreview();
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
            source.remove();
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

    function getTemplateHeaderBadgeElement(headerElement) {
      if (!headerElement) {
        return null;
      }

      return headerElement.querySelector(".product-header__badge, .video-header__badge, [class*='badge' i], [class*='logo' i]");
    }

    function getTemplateHeaderLogoElement(headerElement) {
      if (!headerElement) {
        return null;
      }

      const badge = getTemplateHeaderBadgeElement(headerElement);
      return headerElement.querySelector(".product-header__badge-img, .video-header__badge-img")
        || badge?.querySelector?.("img, svg")
        || null;
    }

    function isTemplateHeaderLogoTarget(target, headerElement) {
      if (!target || !headerElement) {
        return false;
      }

      const logo = getTemplateHeaderLogoElement(headerElement);
      const badge = getTemplateHeaderBadgeElement(headerElement);
      return Boolean((logo && (target === logo || logo.contains?.(target)))
        || (badge && (target === badge || badge.contains?.(target))));
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
      sources.forEach((source) => {
        source.remove();
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
          if (isTemplateHeaderLogoTarget(event.target, element)) {
            return;
          }

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
      const isHeaderLogo = header && isTemplateHeaderLogoTarget(sourceEvent?.target || element, header);
      if (header && isTemplateHeaderBannerTarget(sourceEvent?.target || element, header) && !isHeaderLogo) {
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
      const headerBadge = isHeaderLogo ? getTemplateHeaderBadgeElement(header) : null;
      altInput.value = headerBadge?.getAttribute("aria-label") || element.getAttribute("alt") || "";
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
        if (headerBadge) {
          headerBadge.setAttribute("aria-label", altInput.value);
          element.setAttribute("alt", "");
        } else {
          element.setAttribute("alt", altInput.value);
        }
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

    function copyTemplateIconIdentity(source, target) {
      if (!source || !target) {
        return;
      }

      ["id", "class", "style", "width", "height", "role", "aria-hidden", "data-ll-template-node"].forEach((name) => {
        const value = source.getAttribute?.(name);
        if (value && !target.getAttribute(name)) {
          target.setAttribute(name, value);
        }
      });
    }

    function getTemplateIconMediaElement(element) {
      if (!element) {
        return null;
      }

      if (["IMG", "SVG"].includes(element.tagName)) {
        return element;
      }

      return element.querySelector?.("img, svg") || null;
    }

    function openTemplateIconPopover(sourceEvent, element) {
      const iconHost = element;
      const iconMedia = getTemplateIconMediaElement(element);
      if (!iconHost || !iconMedia) {
        return;
      }

      closePreviewEditPopover();

      const form = document.createElement("form");
      form.className = "preview-edit-popover preview-edit-popover--svg";
      form.setAttribute("role", "dialog");
      form.setAttribute("aria-label", "Editar ícone");

      const title = document.createElement("p");
      title.className = "preview-edit-popover__title";
      title.textContent = "Editar ícone";
      form.appendChild(title);

      const typeField = document.createElement("label");
      typeField.className = "field";
      typeField.innerHTML = "<span>Formato</span>";
      const typeSelect = document.createElement("select");
      typeSelect.innerHTML = `
        <option value="image">Imagem ou URL</option>
        <option value="svg">SVG</option>
      `;
      typeSelect.value = iconMedia.tagName === "SVG" ? "svg" : "image";
      typeField.appendChild(typeSelect);
      form.appendChild(typeField);

      const createField = (label, control) => {
        const field = document.createElement("label");
        field.className = "field";
        const text = document.createElement("span");
        text.textContent = label;
        field.append(text, control);
        form.appendChild(field);
        return field;
      };

      const imageUrl = document.createElement("input");
      imageUrl.type = "text";
      imageUrl.placeholder = "Cole uma URL hospedada ou caminho local";
      imageUrl.value = iconMedia.tagName === "IMG" ? getTemplateMediaValue(iconMedia) : "";
      const imageField = createField("URL da imagem", imageUrl);

      const iconLabel = document.createElement("input");
      iconLabel.type = "text";
      iconLabel.value = iconMedia.tagName === "IMG"
        ? (iconMedia.getAttribute("alt") || "")
        : (iconMedia.getAttribute("aria-label") || iconMedia.getAttribute("title") || "");
      createField("Rótulo acessível", iconLabel);

      const svgMarkup = document.createElement("textarea");
      svgMarkup.rows = 8;
      svgMarkup.spellcheck = false;
      svgMarkup.placeholder = '<svg viewBox="0 0 24 24" aria-label="Ícone">...</svg>';
      svgMarkup.value = iconMedia.tagName === "SVG" ? iconMedia.outerHTML : "";
      const svgField = createField("Código SVG", svgMarkup);

      const note = document.createElement("p");
      note.className = "muted-note";
      note.textContent = "Use imagem para URL ou cole um SVG completo. Scripts e eventos inline são removidos antes de salvar.";
      form.appendChild(note);

      const actions = document.createElement("div");
      actions.className = "preview-edit-popover__actions";
      const closeButton = document.createElement("button");
      closeButton.className = "button";
      closeButton.type = "button";
      closeButton.textContent = "Fechar";
      actions.appendChild(closeButton);
      form.appendChild(actions);

      let currentElement = iconMedia;
      let applyTimer = 0;
      const setMode = () => {
        const isSvg = typeSelect.value === "svg";
        imageField.style.display = isSvg ? "none" : "";
        svgField.style.display = isSvg ? "" : "none";
      };

      const applyImage = () => {
        const value = normalizeAssetUrl(imageUrl.value);
        imageUrl.value = value;
        if (!value) {
          return;
        }

        let nextElement = currentElement;
        if (currentElement.tagName !== "IMG") {
          nextElement = currentElement.ownerDocument.createElement("img");
          copyTemplateIconIdentity(currentElement, nextElement);
          currentElement.replaceWith(nextElement);
        }
        if (iconHost.classList?.contains("ll-carousel__dot-icon")) {
          nextElement.classList.add("ll-carousel__dot-icon-img");
        }
        nextElement.setAttribute("src", value);
        nextElement.setAttribute("alt", iconLabel.value);
        nextElement.removeAttribute("srcset");
        currentElement = nextElement;
        attachTemplateIcon(currentElement);
        syncTemplateHtmlFromPreview();
      };

      const applySvg = () => {
        const nextElement = createSvgElementFromMarkup(currentElement.ownerDocument, svgMarkup.value);
        if (!nextElement) {
          return;
        }

        copyTemplateIconIdentity(currentElement, nextElement);
        if (iconLabel.value.trim()) {
          nextElement.setAttribute("aria-label", iconLabel.value.trim());
          nextElement.setAttribute("role", "img");
        }
        currentElement.replaceWith(nextElement);
        currentElement = nextElement;
        attachTemplateIcon(currentElement);
        syncTemplateHtmlFromPreview();
      };

      const applyCurrentMode = () => {
        if (typeSelect.value === "svg") {
          applySvg();
        } else {
          applyImage();
        }
      };

      imageField.appendChild(createLocalAssetButton(imageUrl, applyImage, "image/*"));
      typeSelect.addEventListener("change", setMode);
      imageUrl.addEventListener("input", applyImage);
      imageUrl.addEventListener("change", applyImage);
      iconLabel.addEventListener("input", applyCurrentMode);
      iconLabel.addEventListener("change", applyCurrentMode);
      svgMarkup.addEventListener("input", () => {
        window.clearTimeout(applyTimer);
        applyTimer = window.setTimeout(applySvg, 260);
      });
      svgMarkup.addEventListener("change", applySvg);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        applyCurrentMode();
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
      setMode();
      (typeSelect.value === "svg" ? svgMarkup : imageUrl).focus();
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
        if (meta.allowBackgroundStyle || style.backgroundColor) {
          element.style.backgroundColor = "";
        }
        if (style.color) element.style.color = style.color;
        if (style.backgroundColor) element.style.backgroundColor = style.backgroundColor;
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
        if (/gradient\(/i.test(normalizedValue)) {
          element.style.backgroundImage = normalizedValue;
          element.style.backgroundColor = "";
        } else {
          if (backgroundImage && backgroundImage !== "none" && !/url\(/i.test(backgroundImage)) {
            element.style.backgroundImage = "none";
          }
          element.style.backgroundColor = normalizedValue;
        }
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

      if (meta.scope === "bento") {
        syncBentoHtmlFromPreview();
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
        if (meta.type === "textStyle") {
          const element = getTemplatePreviewNode(meta);
          if (element) {
            return element.innerText || element.textContent || meta.value || "";
          }
        }

        if (meta.type === "color") {
          const element = getTemplatePreviewNode(meta);
          if (element) {
            const computed = element.ownerDocument.defaultView.getComputedStyle(element);
            const backgroundImage = element.style.backgroundImage || computed.backgroundImage || "";
            if (backgroundImage && backgroundImage !== "none" && !/url\(/i.test(backgroundImage)) {
              return backgroundImage;
            }

            if (!isTransparentColor(computed.backgroundColor)) {
              return colorToHex(computed.backgroundColor || "#ffffff", "#ffffff");
            }
          }
        }

        return meta.value || "";
      }

      if (meta.scope === "bento") {
        const element = getBentoPreviewNode(meta);
        if (!element) {
          return "";
        }

        if (meta.type === "media") {
          return getBentoMediaValue(element);
        }

        if (meta.type === "color") {
          const computed = element.ownerDocument.defaultView.getComputedStyle(element);
          const backgroundImage = element.style.backgroundImage || computed.backgroundImage || "";
          if (backgroundImage && backgroundImage !== "none" && !/url\(/i.test(backgroundImage)) {
            return backgroundImage;
          }
          return colorToHex(computed.backgroundColor || "#ffffff", "#ffffff");
        }

        return element.innerText || element.textContent || "";
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
          if (meta.field === "softColor" && state.carousel.sectionGradientEnabled !== false) {
            return buildCssGradient(
              state.carousel.sectionGradientStart || "#ffffff",
              state.carousel.sectionGradientEnd || state.carousel.softColor || "#f3f6fb",
              180
            );
          }

          return state.carousel[meta.field] || "";
        }

        const slide = state.carousel.slides[meta.slideIndex];
        if (!slide) {
          return "";
        }

        if (meta.field === "navNumber") {
          return slide.navNumber || String(Number(meta.slideIndex) + 1).padStart(2, "0");
        }

        if (meta.field === "backgroundColor" && normalizeCarouselType(slide.type) === "impact" && slide.gradientEnabled !== false && !parseCssGradient(slide.backgroundColor)) {
          return buildCssGradient(
            slide.backgroundColor || "#f16425",
            slide.gradientEndColor || slide.backgroundColor || "#ff8a4f",
            normalizeCarouselGradientAngle(slide.gradientAngle)
          );
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

      if (meta.scope === "bento") {
        updateBentoPreviewEditValue(meta, rawValue, value);
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
          if (meta.field === "softColor") {
            state.carousel.sectionGradientEnabled = false;
          }
        } else {
          const slide = state.carousel.slides[meta.slideIndex];
          if (slide) {
            slide[meta.field] = value;
            if (meta.field === "backgroundColor" && normalizeCarouselType(slide.type) === "impact") {
              const gradient = parseCssGradient(value);
              slide.gradientEnabled = Boolean(gradient);
              if (gradient) {
                slide.gradientEndColor = gradient.end;
                slide.gradientAngle = gradient.angle;
              }
            }
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
      `;
      doc.head.appendChild(style);

      if (currentPage !== "conteudo") {
        return;
      }

      const editStyle = doc.createElement("style");
      editStyle.textContent = `
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
          pointer-events: auto !important;
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
        [data-ll-preview-manual-story] [data-ll-preview-story-panel] {
          display: none !important;
        }
        [data-ll-preview-manual-story] [data-ll-preview-story-panel][data-ll-preview-story-active] {
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
        .ll-bento__image-button {
          pointer-events: none !important;
        }
        [data-ll-table-edit-root] {
          position: relative !important;
        }
        [data-ll-table-helper-button] {
          position: absolute;
          z-index: 2147482600;
          width: 26px;
          height: 26px;
          border: 1px solid rgba(255, 255, 255, 0.82);
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: rgba(234, 91, 12, 0.92);
          color: #fff;
          font: 800 17px/1 Arial, sans-serif;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transform: scale(0.92);
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.18);
          transition: opacity 0.14s ease, transform 0.14s ease, background 0.14s ease;
        }
        [data-ll-table-edit-root]:hover > [data-ll-table-helper-button],
        [data-ll-table-edit-root]:focus-within > [data-ll-table-helper-button] {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }
        [data-ll-table-helper-button]:hover {
          background: #f97316;
          transform: scale(1.08);
        }
        [data-ll-table-add-column] {
          top: 8px;
          right: 8px;
        }
        [data-ll-table-add-row] {
          left: 8px;
          bottom: 8px;
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
      doc.head.appendChild(editStyle);
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

        if (element.dataset.llPreviewText === "true") {
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
          if (options.triggerEvent === "dblclick") {
            if (element.isContentEditable) {
              event.stopPropagation();
            }
            return;
          }

          if (options.disableSingleClickPopover) {
            if (element.isContentEditable) {
              event.stopPropagation();
            }
            return;
          }

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

      const attachMedia = (element, meta, label = "URL da mídia", options = {}) => {
        if (!element) {
          return;
        }

        element.dataset.llPreviewMedia = "true";
        const shouldPreserveClick = meta.scope === "template" && isTemplateInteractiveControl(element);
        const triggerEvent = options.triggerEvent || (shouldPreserveClick ? "dblclick" : "click");
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

      const attachTemplateIcon = (element) => {
        const iconMedia = getTemplateIconMediaElement(element);
        if (!element || !iconMedia || element.dataset.llPreviewIcon === "true") {
          return;
        }

        element.dataset.llPreviewMedia = "true";
        element.dataset.llPreviewIcon = "true";
        iconMedia.dataset.llPreviewMedia = "true";
        iconMedia.dataset.llPreviewIcon = "true";
        element.setAttribute("title", "Dê dois cliques para editar o ícone.");
        element.addEventListener("dblclick", (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          openTemplateIconPopover(event, element);
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
          const interactiveTarget = event.target.closest('a[href], button, label[for], input, textarea, select, summary, [role="button"], [role="tab"], [role="link"], .ll-carousel__nav');
          if (interactiveTarget && interactiveTarget !== element) {
            return;
          }

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

      const getTemplateOverlayPositionHost = (element) => {
        const doc = element?.ownerDocument;
        const root = doc?.querySelector(".lp-container, .lp_container");
        if (!element || !doc || !root) {
          return null;
        }

        const offsetParent = element.offsetParent;
        if (
          offsetParent
          && offsetParent !== doc.body
          && offsetParent !== doc.documentElement
          && root.contains(offsetParent)
        ) {
          return offsetParent;
        }

        const host = element.parentElement?.closest?.(
          "section, article, figure, header, [class*='section' i], [class*='slide' i], [class*='panel' i], [class*='layout' i], [class*='banner' i], [class*='media' i]"
        );
        if (host && host !== element && root.contains(host)) {
          return host;
        }

        return element.parentElement && root.contains(element.parentElement)
          ? element.parentElement
          : root;
      };

      const applyTemplateOverlayPosition = (element, horizontal, vertical) => {
        const computed = element.ownerDocument.defaultView.getComputedStyle(element);
        const host = getTemplateOverlayPositionHost(element);
        if (host) {
          const hostComputed = element.ownerDocument.defaultView.getComputedStyle(host);
          if (hostComputed.position === "static") {
            host.style.position = "relative";
          }

          const inlineWidth = (element.style.width || "").trim().toLowerCase();
          const hasUsableInlineWidth = inlineWidth && inlineWidth !== "auto";
          if (!element.dataset.llPreviewOverlayWidth && !hasUsableInlineWidth) {
            const hostRect = host.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            if (hostRect.width > 0 && elementRect.width > 0) {
              const widthPercent = Math.min(88, Math.max(24, (elementRect.width / hostRect.width) * 100));
              element.dataset.llPreviewOverlayWidth = `${widthPercent.toFixed(2)}%`;
            }
          }
        }

        if (computed.position === "static" || computed.position === "relative") {
          element.style.position = "absolute";
        }

        const normalizedHorizontal = normalizeTemplateOverlayHorizontal(horizontal);
        const normalizedVertical = normalizeTemplateOverlayVertical(vertical);
        let translateX = "0";
        let translateY = "0";

        element.style.inset = "auto";
        element.style.left = "auto";
        element.style.right = "auto";
        element.style.top = "auto";
        element.style.bottom = "auto";
        element.style.boxSizing = "border-box";
        element.style.maxWidth = "88%";
        const nextInlineWidth = (element.style.width || "").trim().toLowerCase();
        if ((!nextInlineWidth || nextInlineWidth === "auto") && element.dataset.llPreviewOverlayWidth) {
          element.style.width = element.dataset.llPreviewOverlayWidth;
        }

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

        element.style.transform = `translate(${translateX}, ${translateY})`;
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

      const templateOverlayNamePattern = /group[-_\s]?text|grouptext|ll-carousel__caption|text[-_\s]?overlay|overlay[-_\s]?text|caption[-_\s]?overlay|legenda/i;

      const isTemplateOverlaySignatureMatch = (element) => {
        if (!element || element.nodeType !== 1) {
          return false;
        }

        const signature = `${element.id || ""} ${typeof element.className === "string" ? element.className : ""}`;
        return templateOverlayNamePattern.test(signature);
      };

      const isTemplateOverlayCandidate = (element, root) => {
        if (!element || element === root || element.nodeType !== 1) {
          return false;
        }

        if (element.closest?.(".lp-stories, [class*='story' i], [class*='stories' i]")) {
          return false;
        }

        const looksLikeOverlay = isTemplateOverlaySignatureMatch(element);
        if (!looksLikeOverlay) {
          return false;
        }

        let parent = element.parentElement;
        while (parent && parent !== root) {
          if (
            root.contains(parent)
            && isTemplateOverlaySignatureMatch(parent)
            && (parent.innerText || parent.textContent || "").trim()
          ) {
            return false;
          }
          parent = parent.parentElement;
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

      const markBentoNode = (element) => {
        if (!element.dataset.llBentoNode) {
          element.dataset.llBentoNode = `bento-${Math.random().toString(16).slice(2)}`;
        }
        return element.dataset.llBentoNode;
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

      const isTemplateIconElement = (element) => {
        if (!element || !["IMG", "SVG"].includes(element.tagName)) {
          return false;
        }

        if (element.tagName === "SVG") {
          return true;
        }

        return /(^|[\s_-])(icon|logo|avatar|badge|symbol|emblem|mark)([\s_-]|$)/i.test(getTemplateSignature(element));
      };

      const ensureTemplateFaqStyle = (root) => {
        const styleId = "ll-template-faq-custom-style";
        let faqStyle = doc.getElementById(styleId);
        if (!faqStyle) {
          faqStyle = doc.createElement("style");
          faqStyle.id = styleId;
          (doc.head || doc.documentElement).appendChild(faqStyle);
        }

        faqStyle.textContent = `
.lp-container .ll-template-faq-custom-colors #faq-section__summary.ll-template-faq-summary,
.lp_container .ll-template-faq-custom-colors #faq-section__summary.ll-template-faq-summary,
.lp-container .ll-template-faq-custom-colors .ll-template-faq-summary,
.lp_container .ll-template-faq-custom-colors .ll-template-faq-summary,
.lp-container.ll-template-faq-custom-colors #faq-section__summary.ll-template-faq-summary,
.lp_container.ll-template-faq-custom-colors #faq-section__summary.ll-template-faq-summary,
.lp-container.ll-template-faq-custom-colors .ll-template-faq-summary,
.lp_container.ll-template-faq-custom-colors .ll-template-faq-summary {
  background: var(--ll-template-faq-summary-bg) !important;
}
.lp-container .ll-template-faq-custom-colors #faq-section__summary.ll-template-faq-summary:hover,
.lp_container .ll-template-faq-custom-colors #faq-section__summary.ll-template-faq-summary:hover,
.lp-container .ll-template-faq-custom-colors .ll-template-faq-summary:hover,
.lp_container .ll-template-faq-custom-colors .ll-template-faq-summary:hover,
.lp-container.ll-template-faq-custom-colors #faq-section__summary.ll-template-faq-summary:hover,
.lp_container.ll-template-faq-custom-colors #faq-section__summary.ll-template-faq-summary:hover,
.lp-container.ll-template-faq-custom-colors .ll-template-faq-summary:hover,
.lp_container.ll-template-faq-custom-colors .ll-template-faq-summary:hover {
  background: var(--ll-template-faq-summary-hover-bg) !important;
}
`;
        return faqStyle;
      };

      const getTemplateFaqRoot = (details, root) => {
        return details.closest?.("#faq-section, [id*='faq' i], [class*='faq' i], section, article")
          || details.parentElement
          || root;
      };

      const isTemplateFaqDetails = (details, root) => {
        if (!details || details.tagName !== "DETAILS" || !root.contains(details)) {
          return false;
        }

        const summary = details.querySelector("summary");
        if (!summary) {
          return false;
        }

        const faqRoot = getTemplateFaqRoot(details, root);
        const signature = [
          details.id || "",
          typeof details.className === "string" ? details.className : "",
          summary.id || "",
          typeof summary.className === "string" ? summary.className : "",
          faqRoot?.id || "",
          typeof faqRoot?.className === "string" ? faqRoot.className : "",
          summary.textContent || ""
        ].join(" ");

        return /faq|d[uú]vida|pergunta|resposta|question|answer/i.test(signature);
      };

      const findTemplateFaqQuestion = (details) => {
        const summary = details.querySelector("summary");
        if (!summary) {
          return null;
        }

        return summary.querySelector('[id="faq-section__q-text"], [id*="q-text"], [class*="question" i], [class*="pergunta" i], h1, h2, h3, h4, strong, p')
          || Array.from(summary.children).find((child) => {
            return !/icon|icone|arrow|seta/i.test(`${child.id || ""} ${typeof child.className === "string" ? child.className : ""}`)
              && (child.innerText || child.textContent || "").trim();
          })
          || summary;
      };

      const findTemplateFaqAnswer = (details) => {
        const summary = details.querySelector("summary");
        const preferred = details.querySelector('[id="faq-section__a-text"], [id*="a-text"], [class*="answer" i], [class*="resposta" i]');
        if (preferred && !summary?.contains(preferred)) {
          return preferred;
        }

        return Array.from(details.querySelectorAll("p, div, span")).find((element) => {
          return !summary?.contains(element)
            && (element.innerText || element.textContent || "").trim()
            && !element.querySelector?.("p, div, span");
        }) || null;
      };

      const getTemplateFaqTextTargets = (faqRoot) => {
        const detailsList = Array.from(faqRoot.querySelectorAll("details")).filter((details) => {
          return isTemplateFaqDetails(details, faqRoot);
        });

        return detailsList.reduce((targets, details) => {
          const question = findTemplateFaqQuestion(details);
          const answer = findTemplateFaqAnswer(details);

          if (question && !targets.questions.includes(question)) {
            targets.questions.push(question);
          }

          if (answer && !targets.answers.includes(answer)) {
            targets.answers.push(answer);
          }

          return targets;
        }, { questions: [], answers: [] });
      };

      const findTemplateFaqTitle = (faqRoot, fallbackRoot = null) => {
        if (!faqRoot) {
          return null;
        }

        const titleSelectors = [
          "#faq-section__title",
          "#faq-section-title",
          "[id*='faq' i][id*='title' i]",
          "[class*='faq' i][class*='title' i]",
          "h1",
          "h2"
        ].join(", ");

        const searchRoots = [faqRoot];
        if (fallbackRoot && fallbackRoot !== faqRoot) {
          searchRoots.push(fallbackRoot);
        }

        const titleCandidates = searchRoots.flatMap((searchRoot) => {
          const matches = Array.from(searchRoot.querySelectorAll(titleSelectors));
          return searchRoot.matches?.(titleSelectors) ? [searchRoot, ...matches] : matches;
        });

        return titleCandidates.find((element) => {
          return !element.closest("details")
            && (element.innerText || element.textContent || "").trim();
        }) || null;
      };

      const ensureTemplateFaqTitleTextElement = (titleElement) => {
        const existing = titleElement.querySelector(":scope > [data-ll-template-faq-title-text]");
        if (existing) {
          return existing;
        }

        const docRef = titleElement.ownerDocument;
        const span = docRef.createElement("span");
        span.dataset.llTemplateFaqTitleText = "true";

        const directTextNodes = Array.from(titleElement.childNodes).filter((node) => {
          return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
        });

        if (directTextNodes.length) {
          titleElement.insertBefore(span, directTextNodes[0]);
          directTextNodes.forEach((node) => {
            span.appendChild(node);
          });
          return span;
        }

        return Array.from(titleElement.children).find((child) => {
          const tagName = String(child.tagName || "").toLowerCase();
          return !["svg", "img", "picture", "video", "source", "iframe"].includes(tagName)
            && (child.innerText || child.textContent || "").trim();
        }) || titleElement;
      };

      const attachTemplateFaqTitleEditor = (titleElement) => {
        if (!titleElement || titleElement.dataset.llTemplateFaqTitleReady === "true") {
          return;
        }

        titleElement.dataset.llTemplateFaqTitleReady = "true";
        const titleNodeId = markTemplateNode(titleElement);
        attachColor(titleElement, {
          scope: "template",
          field: "backgroundColor",
          templateNodeId: titleNodeId,
          value: colorToHex(
            titleElement.ownerDocument.defaultView.getComputedStyle(titleElement).backgroundColor || "#0ea5e9",
            "#0ea5e9"
          )
        }, "cor de fundo do título do FAQ", { triggerEvent: "click" });

        const textTarget = ensureTemplateFaqTitleTextElement(titleElement);
        attachText(textTarget, {
          scope: "template",
          field: "text",
          templateNodeId: markTemplateNode(textTarget),
          value: textTarget.innerText || textTarget.textContent || ""
        }, { multiline: false });
      };

      const openTemplateFaqStylePopover = (sourceEvent, faqRoot, summary) => {
        closePreviewEditPopover();
        ensureTemplateFaqStyle(faqRoot);

        const computed = summary.ownerDocument.defaultView.getComputedStyle(summary);
        const faqTextTargets = getTemplateFaqTextTargets(faqRoot);
        const firstQuestion = faqTextTargets.questions[0] || findTemplateFaqQuestion(summary.closest("details")) || summary;
        const firstAnswer = faqTextTargets.answers[0] || null;
        const questionComputed = firstQuestion
          ? firstQuestion.ownerDocument.defaultView.getComputedStyle(firstQuestion)
          : computed;
        const answerComputed = firstAnswer
          ? firstAnswer.ownerDocument.defaultView.getComputedStyle(firstAnswer)
          : computed;
        const initialNormal = colorToHex(
          faqRoot.style.getPropertyValue("--ll-template-faq-summary-bg") || computed.backgroundColor || "#ffffff",
          "#ffffff"
        );
        const initialHover = colorToHex(
          faqRoot.style.getPropertyValue("--ll-template-faq-summary-hover-bg") || "#f9f9f9",
          "#f9f9f9"
        );
        const initialQuestionColor = colorToHex(
          faqRoot.style.getPropertyValue("--ll-template-faq-question-color") || questionComputed.color || "#111827",
          "#111827"
        );
        const initialAnswerColor = colorToHex(
          faqRoot.style.getPropertyValue("--ll-template-faq-answer-color") || answerComputed.color || "#333333",
          "#333333"
        );

        const form = document.createElement("form");
        form.className = "preview-edit-popover preview-edit-popover--color preview-edit-popover--faq";
        form.setAttribute("role", "dialog");
        form.setAttribute("aria-label", "Editar FAQ");

        const title = document.createElement("p");
        title.className = "preview-edit-popover__title";
        title.textContent = "Editar FAQ";
        form.appendChild(title);

        const tabs = document.createElement("div");
        tabs.className = "preview-edit-popover__tabs";
        const summaryTab = document.createElement("button");
        summaryTab.type = "button";
        summaryTab.textContent = "Summary";
        summaryTab.className = "is-active";
        const textTab = document.createElement("button");
        textTab.type = "button";
        textTab.textContent = "Texto";
        const classTab = document.createElement("button");
        classTab.type = "button";
        classTab.textContent = "Classe/ID";
        tabs.append(summaryTab, textTab, classTab);
        form.appendChild(tabs);

        const summaryPanel = document.createElement("div");
        summaryPanel.className = "preview-edit-popover__panel";
        const textPanel = document.createElement("div");
        textPanel.className = "preview-edit-popover__panel";
        textPanel.hidden = true;
        const classPanel = document.createElement("div");
        classPanel.className = "preview-edit-popover__panel preview-edit-popover__panel--class";
        classPanel.hidden = true;

        const makeColorField = (parent, labelText, initialValue) => {
          const label = document.createElement("label");
          label.className = "preview-edit-popover__mini-field";
          const text = document.createElement("span");
          text.textContent = labelText;
          const row = document.createElement("div");
          row.className = "preview-edit-popover__color-row";
          const color = document.createElement("input");
          color.className = "preview-edit-popover__color";
          color.type = "color";
          color.value = initialValue;
          color.style.setProperty("--preview-edit-color", initialValue);
          const hex = document.createElement("input");
          hex.className = "preview-edit-popover__field";
          hex.type = "text";
          hex.value = initialValue;
          hex.placeholder = "#ffffff";
          row.append(color, hex);
          label.append(text, row);
          parent.appendChild(label);
          return { color, hex };
        };

        const makeSelect = (options, value) => {
          const select = document.createElement("select");
          options.forEach((option) => {
            const item = document.createElement("option");
            item.value = option.value;
            item.textContent = option.label;
            item.selected = option.value === value;
            select.appendChild(item);
          });
          return select;
        };

        const makeMiniField = (parent, labelText, input) => {
          const label = document.createElement("label");
          label.className = "preview-edit-popover__mini-field";
          const text = document.createElement("span");
          text.textContent = labelText;
          label.append(text, input);
          parent.appendChild(label);
          return input;
        };

        const normal = makeColorField(summaryPanel, "Fundo normal do summary", initialNormal);
        const hover = makeColorField(summaryPanel, "Fundo hover do summary", initialHover);

        const createTextStyleFields = (parent, labelText, target, fallbackColor) => {
          const group = document.createElement("div");
          group.className = "preview-edit-popover__group";
          const groupTitle = document.createElement("p");
          groupTitle.className = "preview-edit-popover__note";
          groupTitle.textContent = labelText;
          group.appendChild(groupTitle);

          const targetComputed = target?.ownerDocument.defaultView.getComputedStyle(target) || computed;
          const color = makeColorField(group, "Cor", colorToHex(targetComputed.color || fallbackColor, fallbackColor));
          const grid = document.createElement("div");
          grid.className = "preview-edit-popover__grid";

          const fontSize = document.createElement("input");
          fontSize.type = "number";
          fontSize.min = "8";
          fontSize.max = "96";
          fontSize.step = "1";
          fontSize.value = String(normalizeTextStyleNumber(targetComputed.fontSize, 16, 8, 96));

          const fontWeight = makeSelect([
            { value: "300", label: "Leve" },
            { value: "400", label: "Normal" },
            { value: "500", label: "Medio" },
            { value: "600", label: "Semibold" },
            { value: "700", label: "Bold" },
            { value: "800", label: "Extra bold" },
            { value: "900", label: "Black" }
          ], normalizePreviewFontWeight(targetComputed.fontWeight));

          const textAlign = makeSelect([
            { value: "left", label: "Esquerda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Direita" },
            { value: "justify", label: "Justificado" }
          ], normalizePreviewTextAlign(targetComputed.textAlign));

          const lineHeight = document.createElement("input");
          lineHeight.type = "number";
          lineHeight.min = "0.8";
          lineHeight.max = "2.6";
          lineHeight.step = "0.05";
          lineHeight.value = String(normalizeTextStyleNumber(targetComputed.lineHeight, 1.35, 0.8, 2.6, 2));

          makeMiniField(grid, "Tamanho", fontSize);
          makeMiniField(grid, "Peso", fontWeight);
          makeMiniField(grid, "Alinhamento", textAlign);
          makeMiniField(grid, "Altura da linha", lineHeight);
          group.appendChild(grid);
          parent.appendChild(group);

          return { color, fontSize, fontWeight, textAlign, lineHeight };
        };

        const questionStyle = createTextStyleFields(textPanel, "Perguntas", firstQuestion, initialQuestionColor);
        const answerStyle = createTextStyleFields(textPanel, "Respostas", firstAnswer || firstQuestion, initialAnswerColor);

        const classCandidates = [
          ...getPreviewClassCandidates(summary),
          ...getPreviewClassCandidates(firstQuestion),
          ...getPreviewClassCandidates(firstAnswer),
          ...getPreviewClassCandidates(faqRoot)
        ].reduce((items, candidate) => {
          if (!candidate || items.some((item) => item.value === candidate.selector)) {
            return items;
          }
          items.push({ value: candidate.selector, label: candidate.label });
          return items;
        }, []);

        if (classCandidates.length) {
          const classSelect = makeSelect(classCandidates, classCandidates[0].value);
          makeMiniField(classPanel, "Classe ou ID alvo", classSelect);
          const classApply = makeSelect([
            { value: "summary-bg", label: "Fundo normal do summary" },
            { value: "summary-hover", label: "Fundo hover do summary" },
            { value: "text", label: "Texto" },
            { value: "border", label: "Borda" },
            { value: "outline", label: "Contorno" }
          ], "summary-bg");
          makeMiniField(classPanel, "Aplicar em", classApply);
          const classColor = makeColorField(classPanel, "Cor da classe", initialNormal);
          const classNote = document.createElement("p");
          classNote.className = "preview-edit-popover__note";
          classNote.textContent = "Use esta aba para afetar todos os elementos com a mesma classe ou ID.";
          classPanel.appendChild(classNote);
          const resetClassButton = document.createElement("button");
          resetClassButton.type = "button";
          resetClassButton.className = "button button--soft";
          resetClassButton.textContent = "Limpar classe";
          classPanel.appendChild(resetClassButton);

          const applyClassStyle = () => {
            syncPair(classColor);
            const targetSelector = classApply.value === "summary-hover"
              ? `${classSelect.value}:hover`
              : classSelect.value;
            const property = {
              "summary-bg": "background",
              "summary-hover": "background",
              text: "color",
              border: "border-color",
              outline: "outline-color"
            }[classApply.value] || "background";
            setPreviewClassStyle({ scope: "template", field: "faqClass" }, targetSelector, { [property]: classColor.color.value });
          };

          classColor.color.addEventListener("input", () => {
            classColor.hex.value = normalizeHexColor(classColor.color.value);
            classColor.color.style.setProperty("--preview-edit-color", classColor.hex.value);
            applyClassStyle();
          });
          classColor.hex.addEventListener("input", () => {
            if (isHexColor(classColor.hex.value)) {
              applyClassStyle();
            }
          });
          classColor.hex.addEventListener("change", () => {
            classColor.hex.value = isHexColor(classColor.hex.value) ? normalizeHexColor(classColor.hex.value) : classColor.color.value;
            applyClassStyle();
          });
          classSelect.addEventListener("change", applyClassStyle);
          classApply.addEventListener("change", applyClassStyle);
          resetClassButton.addEventListener("click", () => {
            const targetSelector = classApply.value === "summary-hover"
              ? `${classSelect.value}:hover`
              : classSelect.value;
            clearPreviewClassStyle({ scope: "template", field: "faqClass" }, targetSelector);
          });
        } else {
          const emptyClassNote = document.createElement("p");
          emptyClassNote.className = "preview-edit-popover__note";
          emptyClassNote.textContent = "Nenhuma classe ou ID util foi encontrado neste FAQ.";
          classPanel.appendChild(emptyClassNote);
        }

        form.append(summaryPanel, textPanel, classPanel);

        const actions = document.createElement("div");
        actions.className = "preview-edit-popover__actions";
        const closeButton = document.createElement("button");
        closeButton.className = "button";
        closeButton.type = "button";
        closeButton.textContent = "Fechar";
        actions.appendChild(closeButton);
        form.appendChild(actions);

        const syncPair = (pair) => {
          if (isHexColor(pair.hex.value)) {
            pair.hex.value = normalizeHexColor(pair.hex.value);
            pair.color.value = pair.hex.value;
            pair.color.style.setProperty("--preview-edit-color", pair.hex.value);
          }
        };

        const applyFaqStyle = () => {
          syncPair(normal);
          syncPair(hover);
          syncPair(questionStyle.color);
          syncPair(answerStyle.color);
          faqRoot.classList.add("ll-template-faq-custom-colors");
          faqRoot.style.setProperty("--ll-template-faq-summary-bg", normal.color.value);
          faqRoot.style.setProperty("--ll-template-faq-summary-hover-bg", hover.color.value);
          faqRoot.style.setProperty("--ll-template-faq-question-color", questionStyle.color.color.value);
          faqRoot.style.setProperty("--ll-template-faq-answer-color", answerStyle.color.color.value);
          const applyTextStyle = (element, fields) => {
            element.style.color = fields.color.color.value;
            element.style.fontSize = `${normalizeTextStyleNumber(fields.fontSize.value, 16, 8, 96)}px`;
            element.style.fontWeight = normalizePreviewFontWeight(fields.fontWeight.value);
            element.style.textAlign = normalizePreviewTextAlign(fields.textAlign.value);
            element.style.lineHeight = String(normalizeTextStyleNumber(fields.lineHeight.value, 1.35, 0.8, 2.6, 2));
          };
          getTemplateFaqTextTargets(faqRoot).questions.forEach((element) => {
            applyTextStyle(element, questionStyle);
          });
          getTemplateFaqTextTargets(faqRoot).answers.forEach((element) => {
            applyTextStyle(element, answerStyle);
          });
          syncTemplateHtmlFromPreview();
        };

        [normal, hover, questionStyle.color, answerStyle.color].forEach((pair) => {
          pair.color.addEventListener("input", () => {
            pair.hex.value = normalizeHexColor(pair.color.value);
            pair.color.style.setProperty("--preview-edit-color", pair.hex.value);
            applyFaqStyle();
          });
          pair.hex.addEventListener("input", () => {
            if (isHexColor(pair.hex.value)) {
              applyFaqStyle();
            }
          });
          pair.hex.addEventListener("change", () => {
            pair.hex.value = isHexColor(pair.hex.value) ? normalizeHexColor(pair.hex.value) : pair.color.value;
            applyFaqStyle();
          });
        });

        [questionStyle, answerStyle].forEach((fields) => {
          [fields.fontSize, fields.fontWeight, fields.textAlign, fields.lineHeight].forEach((input) => {
            input.addEventListener("input", applyFaqStyle);
            input.addEventListener("change", applyFaqStyle);
          });
        });

        const setFaqPanel = (panelName) => {
          summaryPanel.hidden = panelName !== "summary";
          textPanel.hidden = panelName !== "text";
          classPanel.hidden = panelName !== "class";
          summaryTab.classList.toggle("is-active", panelName === "summary");
          textTab.classList.toggle("is-active", panelName === "text");
          classTab.classList.toggle("is-active", panelName === "class");
        };
        summaryTab.addEventListener("click", () => setFaqPanel("summary"));
        textTab.addEventListener("click", () => setFaqPanel("text"));
        classTab.addEventListener("click", () => setFaqPanel("class"));

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

      const setupTemplateFaqEditing = (root) => {
        const detailsList = Array.from(root.querySelectorAll("details")).filter((details) => {
          return isTemplateFaqDetails(details, root);
        });

        if (!detailsList.length) {
          return;
        }

        const firstFaqRoot = getTemplateFaqRoot(detailsList[0], root);
        ensureTemplateFaqStyle(firstFaqRoot);
        const faqTitle = findTemplateFaqTitle(firstFaqRoot, root);
        attachTemplateFaqTitleEditor(faqTitle);

        detailsList.forEach((details, index) => {
          const summary = details.querySelector("summary");
          if (!summary) {
            return;
          }

          const faqRoot = getTemplateFaqRoot(details, root);
          ensureTemplateFaqStyle(faqRoot);
          summary.classList.add("ll-template-faq-summary");
          summary.setAttribute("title", "Clique para abrir o FAQ. Dê dois cliques no fundo para mudar as cores do FAQ.");

          const question = findTemplateFaqQuestion(details);
          const answer = findTemplateFaqAnswer(details);

          if (question) {
            attachText(question, {
              scope: "template",
              field: "text",
              templateNodeId: markTemplateNode(question),
              value: question.innerText || question.textContent || ""
            }, { disableSingleClickPopover: true });
          }

          if (answer) {
            attachText(answer, {
              scope: "template",
              field: "text",
              templateNodeId: markTemplateNode(answer),
              value: answer.innerText || answer.textContent || ""
            }, { multiline: true, disableSingleClickPopover: true });
          }

          details.addEventListener("toggle", () => {
            syncTemplateHtmlFromPreview();
          });

          summary.addEventListener("click", (event) => {
            if (event.detail > 1 || event.target.closest("[data-ll-preview-inline]")) {
              return;
            }

            event.stopImmediatePropagation();
            openTemplateFaqStylePopover(event, faqRoot, summary);
            window.setTimeout(syncTemplateHtmlFromPreview, 0);
          }, true);

          summary.addEventListener("dblclick", (event) => {
            if (event.target.closest("[data-ll-preview-text]")) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();
            openTemplateFaqStylePopover(event, faqRoot, summary);
          });
        });
      };

      const openCarouselNavStylePopover = (sourceEvent, carouselRoot) => {
        if (!carouselRoot) {
          return;
        }

        closePreviewEditPopover();

        const getColor = (field, fallback) => normalizeHexColor(state.carousel[field] || fallback);
        const getNumber = (field, fallback, min, max) => {
          const value = Number(state.carousel[field]);
          return Math.min(max, Math.max(min, Number.isFinite(value) ? value : fallback));
        };
        const form = document.createElement("form");
        form.className = "preview-edit-popover preview-edit-popover--color preview-edit-popover--carousel-nav";
        form.setAttribute("role", "dialog");
        form.setAttribute("aria-label", "Estilo dos botões do carrossel");

        const title = document.createElement("p");
        title.className = "preview-edit-popover__title";
        title.textContent = "Botões do carrossel";
        form.appendChild(title);

        const tabs = document.createElement("div");
        tabs.className = "preview-edit-popover__tabs";
        const colorsTab = document.createElement("button");
        colorsTab.type = "button";
        colorsTab.className = "is-active";
        colorsTab.textContent = "Cores";
        const shapeTab = document.createElement("button");
        shapeTab.type = "button";
        shapeTab.textContent = "Forma";
        tabs.append(colorsTab, shapeTab);
        form.appendChild(tabs);

        const colorsPanel = document.createElement("div");
        colorsPanel.className = "preview-edit-popover__panel";
        const shapePanel = document.createElement("div");
        shapePanel.className = "preview-edit-popover__panel";
        shapePanel.hidden = true;

        const makeColorField = (parent, labelText, value) => {
          const label = document.createElement("label");
          label.className = "preview-edit-popover__mini-field";
          const labelTextElement = document.createElement("span");
          labelTextElement.textContent = labelText;
          const row = document.createElement("div");
          row.className = "preview-edit-popover__color-row";
          const picker = document.createElement("input");
          picker.className = "preview-edit-popover__color";
          picker.type = "color";
          picker.value = value;
          picker.style.setProperty("--preview-edit-color", value);
          const hex = document.createElement("input");
          hex.className = "preview-edit-popover__field";
          hex.type = "text";
          hex.value = value;
          hex.placeholder = "#ffffff";
          row.append(picker, hex);
          label.append(labelTextElement, row);
          parent.appendChild(label);
          return { picker, hex };
        };

        const makeGroup = (titleText) => {
          const group = document.createElement("div");
          group.className = "preview-edit-popover__group";
          const heading = document.createElement("p");
          heading.className = "preview-edit-popover__note";
          heading.textContent = titleText;
          group.appendChild(heading);
          const grid = document.createElement("div");
          grid.className = "preview-edit-popover__grid";
          group.appendChild(grid);
          colorsPanel.appendChild(group);
          return grid;
        };

        const normalGrid = makeGroup("Estado normal");
        const normalBackground = makeColorField(normalGrid, "Fundo", getColor("dotBackgroundColor", "#ffffff"));
        const normalText = makeColorField(normalGrid, "Texto", getColor("dotTextColor", "#14202b"));
        const normalBorder = makeColorField(normalGrid, "Borda", getColor("dotBorderColor", "#d9e2ea"));
        const normalIcon = makeColorField(normalGrid, "Ícone", getColor("dotIconColor", state.carousel.dotTextColor || "#14202b"));

        const hoverGrid = makeGroup("Hover");
        const hoverBackground = makeColorField(hoverGrid, "Fundo", getColor("dotHoverColor", "#fff9f2"));
        const hoverText = makeColorField(hoverGrid, "Texto", getColor("dotHoverTextColor", state.carousel.dotTextColor || "#14202b"));
        const hoverBorder = makeColorField(hoverGrid, "Borda", getColor("dotHoverBorderColor", state.carousel.dotActiveBorderColor || "#ee6911"));

        const activeGrid = makeGroup("Botão selecionado");
        const activeBackground = makeColorField(activeGrid, "Fundo", getColor("dotActiveColor", "#fff4e0"));
        const activeText = makeColorField(activeGrid, "Texto", getColor("dotActiveTextColor", state.carousel.brandColor || "#ee6911"));
        const activeBorder = makeColorField(activeGrid, "Borda", getColor("dotActiveBorderColor", "#ee6911"));
        const activeIconBackground = makeColorField(activeGrid, "Fundo do ícone", getColor("dotIconActiveBackgroundColor", state.carousel.brandColor || "#ee6911"));
        const activeIconColor = makeColorField(activeGrid, "Ícone", getColor("dotIconActiveColor", "#ffffff"));

        const iconToggle = document.createElement("label");
        iconToggle.className = "article-toggle";
        const iconInput = document.createElement("input");
        iconInput.type = "checkbox";
        iconInput.checked = state.carousel.showNavIcons !== false;
        const iconText = document.createElement("span");
        iconText.textContent = "Mostrar ícones nos botões";
        iconToggle.append(iconInput, iconText);
        colorsPanel.appendChild(iconToggle);

        const shapeGrid = document.createElement("div");
        shapeGrid.className = "preview-edit-popover__grid";
        shapePanel.appendChild(shapeGrid);
        const makeNumberField = (labelText, value, min, max, step = 1) => {
          const label = document.createElement("label");
          label.className = "preview-edit-popover__mini-field";
          const text = document.createElement("span");
          text.textContent = labelText;
          const input = document.createElement("input");
          input.type = "number";
          input.min = String(min);
          input.max = String(max);
          input.step = String(step);
          input.value = String(value);
          label.append(text, input);
          shapeGrid.appendChild(label);
          return input;
        };
        const radius = makeNumberField("Raio da borda (px)", getNumber("dotRadius", 12, 0, 48), 0, 48);
        const borderWidth = makeNumberField("Espessura da borda (px)", getNumber("dotBorderWidth", 1, 0, 8), 0, 8);
        const minHeight = makeNumberField("Altura mínima (px)", getNumber("dotMinHeight", 62, 36, 180), 36, 180);
        const paddingX = makeNumberField("Respiro lateral (px)", getNumber("dotPaddingX", 16, 0, 64), 0, 64);
        const hoverLift = makeNumberField("Elevação no hover (px)", getNumber("dotHoverLift", 4, 0, 20), 0, 20);
        const shadowOpacity = makeNumberField("Opacidade da sombra", getNumber("dotShadowOpacity", 0, 0, 0.45), 0, 0.45, 0.01);
        const formNote = document.createElement("p");
        formNote.className = "preview-edit-popover__note";
        formNote.textContent = "As alterações valem para todos os botões de navegação deste carrossel.";
        shapePanel.appendChild(formNote);

        form.append(colorsPanel, shapePanel);

        const actions = document.createElement("div");
        actions.className = "preview-edit-popover__actions";
        const closeButton = document.createElement("button");
        closeButton.className = "button";
        closeButton.type = "button";
        closeButton.textContent = "Fechar";
        actions.appendChild(closeButton);
        form.appendChild(actions);

        const colorPairs = [
          normalBackground, normalText, normalBorder, normalIcon,
          hoverBackground, hoverText, hoverBorder,
          activeBackground, activeText, activeBorder, activeIconBackground, activeIconColor
        ];
        const syncPair = (pair) => {
          if (!isHexColor(pair.hex.value)) {
            return false;
          }
          const color = normalizeHexColor(pair.hex.value);
          pair.hex.value = color;
          pair.picker.value = color;
          pair.picker.style.setProperty("--preview-edit-color", color);
          return true;
        };
        const numberValue = (input, fallback, min, max) => {
          const value = Number(input.value);
          const normalized = Math.min(max, Math.max(min, Number.isFinite(value) ? value : fallback));
          input.value = String(normalized);
          return normalized;
        };
        const applyStyle = () => {
          colorPairs.forEach(syncPair);
          const values = {
            dotBackgroundColor: normalBackground.picker.value,
            dotTextColor: normalText.picker.value,
            dotBorderColor: normalBorder.picker.value,
            dotIconColor: normalIcon.picker.value,
            dotHoverColor: hoverBackground.picker.value,
            dotHoverTextColor: hoverText.picker.value,
            dotHoverBorderColor: hoverBorder.picker.value,
            dotActiveColor: activeBackground.picker.value,
            dotActiveTextColor: activeText.picker.value,
            dotActiveBorderColor: activeBorder.picker.value,
            dotIconActiveBackgroundColor: activeIconBackground.picker.value,
            dotIconActiveColor: activeIconColor.picker.value,
            dotRadius: numberValue(radius, 12, 0, 48),
            dotBorderWidth: numberValue(borderWidth, 1, 0, 8),
            dotMinHeight: numberValue(minHeight, 62, 36, 180),
            dotPaddingX: numberValue(paddingX, 16, 0, 64),
            dotHoverLift: numberValue(hoverLift, 4, 0, 20),
            dotShadowOpacity: numberValue(shadowOpacity, 0, 0, 0.45),
            showNavIcons: iconInput.checked
          };
          Object.assign(state.carousel, values);
          const shadowColor = hexToRgba(values.dotBorderColor, values.dotShadowOpacity.toFixed(2));
          const styleValues = {
            "--ll-carousel-dot-bg": values.dotBackgroundColor,
            "--ll-carousel-dot-color": values.dotTextColor,
            "--ll-carousel-dot-border": values.dotBorderColor,
            "--ll-carousel-dot-icon-color": values.dotIconColor,
            "--ll-carousel-dot-hover": values.dotHoverColor,
            "--ll-carousel-dot-hover-color": values.dotHoverTextColor,
            "--ll-carousel-dot-hover-border": values.dotHoverBorderColor,
            "--ll-carousel-dot-active": values.dotActiveColor,
            "--ll-carousel-dot-active-color": values.dotActiveTextColor,
            "--ll-carousel-dot-active-border": values.dotActiveBorderColor,
            "--ll-carousel-dot-icon-active-bg": values.dotIconActiveBackgroundColor,
            "--ll-carousel-dot-icon-active-color": values.dotIconActiveColor,
            "--ll-carousel-dot-radius": `${values.dotRadius}px`,
            "--ll-carousel-dot-border-width": `${values.dotBorderWidth}px`,
            "--ll-carousel-dot-min-height": `${values.dotMinHeight}px`,
            "--ll-carousel-dot-padding-x": `${values.dotPaddingX}px`,
            "--ll-carousel-dot-hover-lift": `${values.dotHoverLift}px`,
            "--ll-carousel-dot-shadow": `0 ${values.dotHoverLift}px ${values.dotHoverLift * 4}px ${shadowColor}`
          };
          Object.entries(styleValues).forEach(([name, value]) => carouselRoot.style.setProperty(name, value));
          carouselRoot.querySelectorAll(".ll-carousel__dot-icon").forEach((icon) => {
            icon.style.display = values.showNavIcons ? "" : "none";
          });
          generatedHtml.value = buildOutputHtml("html");
          copyStatus.textContent = "";
          copyStatus.classList.remove("is-warning", "is-visible");
        };
        const setPanel = (name) => {
          colorsPanel.hidden = name !== "colors";
          shapePanel.hidden = name !== "shape";
          colorsTab.classList.toggle("is-active", name === "colors");
          shapeTab.classList.toggle("is-active", name === "shape");
        };
        colorsTab.addEventListener("click", () => setPanel("colors"));
        shapeTab.addEventListener("click", () => setPanel("shape"));
        colorPairs.forEach((pair) => {
          pair.picker.addEventListener("input", () => {
            pair.hex.value = normalizeHexColor(pair.picker.value);
            pair.picker.style.setProperty("--preview-edit-color", pair.hex.value);
            applyStyle();
          });
          pair.hex.addEventListener("input", () => {
            if (isHexColor(pair.hex.value)) {
              applyStyle();
            }
          });
          pair.hex.addEventListener("change", () => {
            if (!syncPair(pair)) {
              pair.hex.value = pair.picker.value;
            }
            applyStyle();
          });
        });
        [radius, borderWidth, minHeight, paddingX, hoverLift, shadowOpacity].forEach((input) => {
          input.addEventListener("input", applyStyle);
          input.addEventListener("change", applyStyle);
        });
        iconInput.addEventListener("change", () => {
          applyStyle();
          if (iconInput.checked && !carouselRoot.querySelector(".ll-carousel__dot-icon")) {
            updateOutput();
          }
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

      const getTemplateTableRoot = (element, root) => {
        const table = element.closest?.(".table-container-custom, .ll-bento__card--table, table, .table-design-custom");
        if (!table) {
          return null;
        }

        return table.closest?.(".table-container-custom, .ll-bento__card--table")
          || (table.tagName === "TABLE" ? table : table.querySelector?.("table"))
          || table
          || root;
      };

      const isTemplateTableElement = (element, root) => {
        return Boolean(element?.closest?.(".table-container-custom, .table-design-custom, .table-text-custom, table, th, td")
          && root.contains(element));
      };

      const openTemplateTableStylePopover = (sourceEvent, tableRoot) => {
        if (!tableRoot) {
          return;
        }

        closePreviewEditPopover();

        const table = tableRoot.tagName === "TABLE" ? tableRoot : tableRoot.querySelector("table") || tableRoot;
        const headerCells = Array.from(tableRoot.querySelectorAll("th, .table-th-custom"));
        const bodyCells = Array.from(tableRoot.querySelectorAll("td, .table-td-custom, .table-td-custom-title, .table-td-custom-sub"));
        const sampleHeader = headerCells[0] || table;
        const sampleBody = bodyCells[0] || sampleHeader;
        const headerComputed = sampleHeader.ownerDocument.defaultView.getComputedStyle(sampleHeader);
        const bodyComputed = sampleBody.ownerDocument.defaultView.getComputedStyle(sampleBody);
        const initialHeaderBg = colorToHex(headerComputed.backgroundColor || "#ea5b0c", "#ea5b0c");
        const initialHeaderColor = colorToHex(headerComputed.color || "#ffffff", "#ffffff");
        const initialBodyColor = colorToHex(bodyComputed.color || "#111827", "#111827");
        const initialBorderColor = colorToHex(bodyComputed.borderBottomColor || headerComputed.borderBottomColor || "#d5dbe7", "#d5dbe7");

        const form = document.createElement("form");
        form.className = "preview-edit-popover preview-edit-popover--color";
        form.setAttribute("role", "dialog");
        form.setAttribute("aria-label", "Editar tabela");

        const title = document.createElement("p");
        title.className = "preview-edit-popover__title";
        title.textContent = "Tabela";
        form.appendChild(title);

        const makeColorField = (labelText, initialValue) => {
          const label = document.createElement("label");
          label.className = "preview-edit-popover__mini-field";
          const text = document.createElement("span");
          text.textContent = labelText;
          const row = document.createElement("div");
          row.className = "preview-edit-popover__color-row preview-edit-popover__color-row--picker";
          const color = document.createElement("input");
          color.className = "preview-edit-popover__color";
          color.type = "color";
          color.value = initialValue;
          color.style.setProperty("--preview-edit-color", initialValue);
          const hex = document.createElement("input");
          hex.className = "preview-edit-popover__field";
          hex.type = "text";
          hex.value = initialValue;
          hex.placeholder = "#ea5b0c";
          row.append(color, hex);
          label.append(text, row);
          form.appendChild(label);
          return { color, hex };
        };

        const headerBg = makeColorField("Fundo do cabecalho", initialHeaderBg);
        const headerText = makeColorField("Texto do cabecalho", initialHeaderColor);
        const bodyText = makeColorField("Texto das linhas", initialBodyColor);
        const border = makeColorField("Bordas", initialBorderColor);

        const actions = document.createElement("div");
        actions.className = "preview-edit-popover__actions";
        const closeButton = document.createElement("button");
        closeButton.className = "button";
        closeButton.type = "button";
        closeButton.textContent = "Fechar";
        actions.appendChild(closeButton);
        form.appendChild(actions);

        const syncPair = (pair) => {
          if (isHexColor(pair.hex.value)) {
            pair.hex.value = normalizeHexColor(pair.hex.value);
            pair.color.value = pair.hex.value;
            pair.color.style.setProperty("--preview-edit-color", pair.hex.value);
          }
        };

        const applyTableStyle = () => {
          [headerBg, headerText, bodyText, border].forEach(syncPair);
          headerCells.forEach((cell) => {
            cell.style.backgroundColor = headerBg.color.value;
            cell.style.color = headerText.color.value;
            cell.style.borderColor = border.color.value;
          });
          bodyCells.forEach((cell) => {
            cell.style.color = bodyText.color.value;
            cell.style.borderColor = border.color.value;
          });
          tableRoot.querySelectorAll(".table-text-custom, th, td").forEach((cell) => {
            cell.style.borderBottomColor = border.color.value;
          });
          syncTemplateHtmlFromPreview();
        };

        [headerBg, headerText, bodyText, border].forEach((pair) => {
          pair.color.addEventListener("input", () => {
            pair.hex.value = normalizeHexColor(pair.color.value);
            pair.color.style.setProperty("--preview-edit-color", pair.hex.value);
            applyTableStyle();
          });
          pair.hex.addEventListener("input", () => {
            if (isHexColor(pair.hex.value)) {
              applyTableStyle();
            }
          });
          pair.hex.addEventListener("change", () => {
            pair.hex.value = isHexColor(pair.hex.value) ? normalizeHexColor(pair.hex.value) : pair.color.value;
            applyTableStyle();
          });
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

      const getTemplateTableElement = (tableRoot) => {
        if (!tableRoot) {
          return null;
        }

        return tableRoot.tagName === "TABLE" ? tableRoot : tableRoot.querySelector("table");
      };

      const getTemplateTableToolHost = (tableRoot) => {
        if (!tableRoot) {
          return null;
        }

        return tableRoot.tagName === "TABLE" ? tableRoot.parentElement : tableRoot;
      };

      const clearTemplateTablePreviewAttrs = (element) => {
        if (!element?.attributes) {
          return element;
        }

        Array.from(element.attributes).forEach((attribute) => {
          if (attribute.name.startsWith("data-ll-")) {
            element.removeAttribute(attribute.name);
          }
        });
        element.removeAttribute("contenteditable");
        element.removeAttribute("spellcheck");
        element.removeAttribute("title");
        return element;
      };

      const getTemplateTableColumnCount = (table) => {
        const rows = Array.from(table?.rows || []);
        return rows.reduce((max, row) => Math.max(max, row.cells.length), 0);
      };

      const normalizeTemplateTableHeaderCorners = (table) => {
        const headerRows = Array.from(table?.tHead?.rows || table?.querySelectorAll("thead tr") || []);
        headerRows.forEach((row) => {
          const cells = Array.from(row.cells || []);
          cells.forEach((cell, index) => {
            if (cells.length === 1) {
              cell.style.borderRadius = "10px 10px 0 0";
            } else if (index === 0) {
              cell.style.borderRadius = "10px 0 0 0";
            } else if (index === cells.length - 1) {
              cell.style.borderRadius = "0 10px 0 0";
            } else {
              cell.style.borderRadius = "0";
            }
          });
        });
      };

      const makeTemplateTableCell = (docRef, sourceCell, tagName, text) => {
        const cell = sourceCell ? sourceCell.cloneNode(false) : docRef.createElement(tagName);
        clearTemplateTablePreviewAttrs(cell);
        cell.textContent = text;
        return cell;
      };

      const attachTemplateTableCellText = (cell) => {
        if (!cell || !["TD", "TH"].includes(cell.tagName)) {
          return;
        }

        const id = markTemplateNode(cell);
        attachText(cell, {
          scope: "template",
          field: "text",
          templateNodeId: id,
          value: cell.innerText || cell.textContent || ""
        }, {
          multiline: true
        });
      };

      const addTemplateTableColumn = (tableRoot) => {
        const table = getTemplateTableElement(tableRoot);
        if (!table) {
          return;
        }

        const docRef = table.ownerDocument;
        const headerRows = Array.from(table.tHead?.rows || table.querySelectorAll("thead tr") || []);
        headerRows.forEach((row) => {
          const source = row.cells[row.cells.length - 1] || null;
          const cell = makeTemplateTableCell(docRef, source, "th", "COLUNA");
          row.appendChild(cell);
          attachTemplateTableCellText(cell);
        });

        const body = table.tBodies?.[0] || table.createTBody();
        const bodyRows = Array.from(body.rows || []);
        if (!bodyRows.length) {
          const row = body.insertRow();
          const count = Math.max(1, getTemplateTableColumnCount(table));
          for (let index = 0; index < count; index += 1) {
            const cell = makeTemplateTableCell(docRef, null, "td", index === count - 1 ? "Novo item" : "");
            row.appendChild(cell);
            attachTemplateTableCellText(cell);
          }
        } else {
          bodyRows.forEach((row) => {
            const source = row.cells[row.cells.length - 1] || null;
            const cell = makeTemplateTableCell(docRef, source, "td", "Novo item");
            row.appendChild(cell);
            attachTemplateTableCellText(cell);
          });
        }

        normalizeTemplateTableHeaderCorners(table);
        syncTemplateHtmlFromPreview();
      };

      const addTemplateTableRow = (tableRoot) => {
        const table = getTemplateTableElement(tableRoot);
        if (!table) {
          return;
        }

        const docRef = table.ownerDocument;
        const body = table.tBodies?.[0] || table.createTBody();
        const sourceRow = body.rows?.[body.rows.length - 1] || null;
        const nextRow = sourceRow ? sourceRow.cloneNode(false) : docRef.createElement("tr");
        clearTemplateTablePreviewAttrs(nextRow);
        const columnCount = Math.max(1, getTemplateTableColumnCount(table));

        for (let index = 0; index < columnCount; index += 1) {
          const sourceCell = sourceRow?.cells?.[index] || sourceRow?.cells?.[sourceRow.cells.length - 1] || null;
          const cell = makeTemplateTableCell(docRef, sourceCell, "td", "Novo item");
          nextRow.appendChild(cell);
          attachTemplateTableCellText(cell);
        }

        body.appendChild(nextRow);
        syncTemplateHtmlFromPreview();
      };

      const ensureTemplateTableTools = (tableRoot, root) => {
        const table = getTemplateTableElement(tableRoot);
        const host = getTemplateTableToolHost(tableRoot);
        if (!table || !host || !root.contains(host)) {
          return;
        }

        host.dataset.llTableEditRoot = "true";
        if (host.querySelector(":scope > [data-ll-table-helper-button]")) {
          return;
        }

        const makeButton = (kind, title) => {
          const button = host.ownerDocument.createElement("button");
          button.type = "button";
          button.textContent = "+";
          button.title = title;
          button.setAttribute("aria-label", title);
          button.dataset.llTemplateHelper = "true";
          button.dataset.llTableHelperButton = "true";
          if (kind === "column") {
            button.dataset.llTableAddColumn = "true";
          } else {
            button.dataset.llTableAddRow = "true";
          }
          button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            if (kind === "column") {
              addTemplateTableColumn(tableRoot);
            } else {
              addTemplateTableRow(tableRoot);
            }
          });
          return button;
        };

        host.append(
          makeButton("column", "Adicionar coluna"),
          makeButton("row", "Adicionar linha")
        );
      };

      const setupTemplateTableTools = (root) => {
        const tableRoots = new Set();
        root.querySelectorAll(".table-container-custom, .ll-bento__card--table, .table-design-custom, table").forEach((element) => {
          const tableRoot = getTemplateTableRoot(element, root);
          if (tableRoot) {
            tableRoots.add(tableRoot);
          }
        });
        tableRoots.forEach((tableRoot) => ensureTemplateTableTools(tableRoot, root));
      };

      const setupTemplateTableEditing = (root) => {
        setupTemplateTableTools(root);

        if (root.dataset.llTemplateTableEditing === "true") {
          return;
        }

        root.dataset.llTemplateTableEditing = "true";
        root.addEventListener("click", (event) => {
          if (event.target.closest("[data-ll-table-helper-button]")) {
            return;
          }

          if (event.detail > 1 || event.target.closest("[data-ll-preview-inline]")) {
            return;
          }

          if (event.target.closest("[data-ll-preview-text]")) {
            return;
          }

          const target = event.target.closest(".table-container-custom, .table-design-custom, .table-text-custom, table, th, td");
          if (!target || !root.contains(target)) {
            return;
          }

          const tableRoot = getTemplateTableRoot(target, root);
          if (!tableRoot) {
            return;
          }

          event.preventDefault();
          event.stopImmediatePropagation();
          openTemplateTableStylePopover(event, tableRoot);
        }, true);
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
        const panels = getTemplateStoryPanels(storyRoot);
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
        const index = inputs.indexOf(target);
        return index >= 0 ? panels[index] || null : null;
      };

      const getTemplateStoryPanels = (storyRoot) => {
        if (!storyRoot) {
          return [];
        }

        const candidates = Array.from(storyRoot.querySelectorAll(".lp-stories__panel, [class*='story' i][class*='panel' i], [class*='stories' i][class*='panel' i]"));
        return candidates.filter((element) => {
          if (!element || element === storyRoot) {
            return false;
          }

          const className = typeof element.className === "string" ? element.className.toLowerCase() : "";
          if (/(^|\s)(lp-)?stories?(__|-)?panels(\s|$)/i.test(className) || className.includes("__panels")) {
            return false;
          }

          return element.matches?.(".lp-stories__panel")
            || !Array.from(element.children || []).some((child) => {
              return child.matches?.(".lp-stories__panel, [class*='story' i][class*='panel' i], [class*='stories' i][class*='panel' i]");
            });
        });
      };

      const getTemplateStoryInputs = (storyRoot, target) => {
        if (!storyRoot) {
          return [];
        }

        const escapeSelector = doc.defaultView.CSS?.escape || ((value) => String(value).replace(/["\\#.;,[\]()>+~*^$|=:\s]/g, "\\$&"));
        if (target?.name && target?.type) {
          return Array.from(storyRoot.querySelectorAll(`input[type="${target.type}"][name="${escapeSelector(target.name)}"]`));
        }

        return Array.from(storyRoot.querySelectorAll('input[type="radio"], input[type="checkbox"]'));
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
        getTemplateStoryInputs(storyRoot, target).forEach((input) => {
          input.checked = input === target;
          input.toggleAttribute("checked", input === target);
        });

        getTemplateStoryPanels(storyRoot).forEach((item) => {
          const isActive = item === panel;
          item.dataset.llPreviewStoryPanel = "true";
          item.toggleAttribute("data-ll-preview-story-active", isActive);
          item.toggleAttribute("data-ll-preview-story-hidden", !isActive);
        });

        storyRoot.querySelectorAll("label[for]").forEach((item) => {
          const current = getControlledInput(item);
          item.toggleAttribute("data-ll-preview-story-current", current === target);
        });

        syncTemplateHtmlFromPreview();
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

          const storyRoot = findTemplateStoryRoot(label, root) || findTemplateStoryRoot(target, root);
          if (!storyRoot) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();

          const syncStorySelection = () => {
            target.checked = true;
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

          const iconHost = event.target.closest?.(".ll-carousel__dot-icon, [class*='icon' i], [class*='logo' i], [class*='avatar' i], [class*='emblem' i]");
          if (iconHost && root.contains(iconHost) && getTemplateIconMediaElement(iconHost)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            openTemplateIconPopover(event, iconHost);
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

          if (isTemplateIconElement(editableElement)) {
            openTemplateIconPopover(event, editableElement);
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
            if (target) {
              if (target.matches?.('input[type="radio"], input[type="checkbox"]')) {
                const storyRoot = findTemplateStoryRoot(anchor, root) || findTemplateStoryRoot(target, root);
                target.checked = true;
                target.dispatchEvent(new doc.defaultView.Event("change", { bubbles: true }));
                if (storyRoot) {
                  applyTemplateStorySelection(anchor, target, root);
                }
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

          if (isTemplateHeaderLogoTarget(event.target, header)) {
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

        root.querySelectorAll(".ll-carousel__dot-icon, [class*='icon' i], [class*='logo' i], [class*='avatar' i], [class*='emblem' i]").forEach((element) => {
          if (getTemplateIconMediaElement(element)) {
            attachTemplateIcon(element);
          }
        });

        setupTemplateFaqEditing(root);
        setupTemplateTableEditing(root);

        [root, ...root.querySelectorAll("*")].forEach((element) => {
          const header = findTemplateHeaderRoot(element, root);
          if (header && isTemplateHeaderBannerTarget(element, header) && !isTemplateHeaderLogoTarget(element, header)) {
            return;
          }

          const isOverlayElement = element.dataset.llPreviewPosition === "true";

          if (element.tagName === "SVG") {
            markTemplateNode(element);
            attachTemplateIcon(element);
            return;
          }

          if (!isOverlayElement && isTemplateTextCandidate(element)) {
            if (element.dataset.llTemplateFaqTitleReady === "true") {
              return;
            }

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
              if (isTemplateIconElement(element)) {
                attachTemplateIcon(element);
                return;
              }

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
            const backgroundImage = computed.backgroundImage || "";
            const backgroundColor = backgroundImage && backgroundImage !== "none" && !/url\(/i.test(backgroundImage)
              ? backgroundImage
              : isTransparentColor(computed.backgroundColor)
                ? "#ffffff"
                : colorToHex(computed.backgroundColor || "#ffffff", "#ffffff");
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
            if (["faq", "table", "stories", "article", "carousel", "bento", "senko", "template"].includes(nextDashboardTab)) {
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
        const carouselRoot = doc.querySelector(".ll-carousel");
        if (carouselRoot) {
          carouselRoot.addEventListener("click", (event) => {
            if (event.target.closest('[contenteditable="true"]')) {
              return;
            }

            if (event.target.closest("[data-ll-preview-text], [data-ll-preview-media], [data-ll-preview-color], [data-ll-preview-position]")) {
              return;
            }

            const label = event.target.closest(".ll-carousel__dot[for], .ll-carousel__side-hint[for]");
            if (!label || !carouselRoot.contains(label)) {
              return;
            }

            // Os cards de navegação aguardam o clique local para distinguir
            // troca de slide de duplo clique no fundo para editar o estilo.
            if (label.matches(".ll-carousel__dot")) {
              return;
            }

            const input = getControlledInput(label);
            if (!input || !input.matches?.('input[type="radio"]')) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();

            input.checked = true;
            input.dispatchEvent(new doc.defaultView.Event("input", { bubbles: true }));
            input.dispatchEvent(new doc.defaultView.Event("change", { bubbles: true }));

            const slideMatch = String(input.id || label.getAttribute("for") || "").match(/(\d+)$/);
            const slideIndex = slideMatch
              ? Math.max(0, Number(slideMatch[1]) - 1)
              : Array.from(carouselRoot.querySelectorAll(".ll-carousel__dot")).indexOf(label);

            if (slideIndex >= 0) {
              state.carousel.openSlideIndex = slideIndex;
              setCarouselPreviewSlide(slideIndex);
            }

            updateOutput();
          }, true);
        }

        attachText(doc.querySelector(".ll-carousel__intro .ll-carousel__eyebrow"), { scope: "carousel", field: "eyebrow" });
        attachText(doc.querySelector(".ll-carousel__intro .ll-carousel__title"), { scope: "carousel", field: "title" });
        attachText(doc.querySelector(".ll-carousel__intro .ll-carousel__lead"), { scope: "carousel", field: "lead" }, { multiline: true });
        attachColor(doc.querySelector(".ll-carousel"), { scope: "carousel", field: "softColor" }, "cor de fundo da seção");
        attachColor(doc.querySelector(".ll-carousel__eyebrow"), { scope: "carousel", field: "brandColor" }, "cor de destaque");

        doc.querySelectorAll(".ll-carousel__dot").forEach((dot, slideIndex) => {
          let dotClickTimer = 0;
          const activateDot = () => {
            const targetId = dot.getAttribute("for");
            const input = targetId ? doc.getElementById(targetId) : null;
            if (input) {
              input.checked = true;
            }
            state.carousel.openSlideIndex = slideIndex;
            setCarouselPreviewSlide(slideIndex);
            updateOutput();
          };

          dot.addEventListener("click", (event) => {
            if (event.target?.isContentEditable || event.target.closest("[data-ll-preview-text], [data-ll-preview-media]")) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();
            window.clearTimeout(dotClickTimer);
            if (event.detail > 1) {
              return;
            }
            dotClickTimer = window.setTimeout(activateDot, 280);
          });

          dot.addEventListener("dblclick", (event) => {
            window.clearTimeout(dotClickTimer);
            if (event.target.closest("[data-ll-preview-text], .ll-carousel__dot-icon")) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            openCarouselNavStylePopover(event, carouselRoot);
          });

          attachText(dot.querySelector(".ll-carousel__dot-number"), { scope: "carousel", slideIndex, field: "navNumber" });
          attachText(dot.querySelector(".ll-carousel__dot-text"), { scope: "carousel", slideIndex, field: "navLabel" });
          attachTemplateIcon(dot.querySelector(".ll-carousel__dot-icon"));
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

      if (tab === "bento") {
        const root = doc.querySelector(".ll-bento");
        if (!root) {
          return;
        }

        const persistBentoResize = (element) => {
          if (!element || !element.isConnected) {
            return;
          }

          const rect = element.getBoundingClientRect();
          const width = Math.round(rect.width);
          const height = Math.round(rect.height);
          if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
            return;
          }

          element.style.width = `${width}px`;
          element.style.height = `${height}px`;

          const blockIndex = Number(element.dataset.llBentoResizeBlock);
          if (Number.isInteger(blockIndex) && state.bento?.blocks?.[blockIndex]) {
            state.bento.blocks[blockIndex].resizeWidth = width;
            state.bento.blocks[blockIndex].resizeHeight = height;
          }

          if (currentPage === "conteudo") {
            markResponsiveDirty();
          }

          if (state.bento?.useCustomHtml) {
            syncBentoHtmlFromPreview();
          } else {
            state.bento.status = "Tamanho salvo pela previa.";
            generatedHtml.value = buildOutputHtml("html");
            copyStatus.textContent = "";
            copyStatus.classList.remove("is-warning", "is-visible");
          }
        };

        const setupBentoResizePersistence = () => {
          const textBlockIndexes = state.bento.blocks
            .map((block, index) => block.type === "text" ? index : -1)
            .filter((index) => index >= 0);
          const resizeCards = Array.from(root.querySelectorAll(".ll-bento__card--text"));
          const ResizeObserverCtor = doc.defaultView.ResizeObserver;
          const resizeObserver = ResizeObserverCtor
            ? new ResizeObserverCtor((entries) => {
              entries.forEach((entry) => {
                const element = entry.target;
                if (!element.__llBentoResizeActive) {
                  return;
                }

                const start = element.__llBentoResizeStart || {};
                const width = Math.round(entry.contentRect.width);
                const height = Math.round(entry.contentRect.height);
                const changed = Math.abs(width - (start.width || width)) > 2
                  || Math.abs(height - (start.height || height)) > 2;
                if (!changed) {
                  return;
                }

                window.clearTimeout(element.__llBentoResizeTimer);
                element.__llBentoResizeTimer = window.setTimeout(() => persistBentoResize(element), 120);
              });
            })
            : null;

          resizeCards.forEach((element, orderIndex) => {
            element.dataset.llBentoResizeReady = "true";
            const blockIndex = textBlockIndexes[orderIndex];
            if (blockIndex !== undefined) {
              element.dataset.llBentoResizeBlock = String(blockIndex);
            }

            element.addEventListener("pointerdown", () => {
              const rect = element.getBoundingClientRect();
              element.__llBentoResizeStart = {
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              };
              element.__llBentoResizeActive = true;
            });

            resizeObserver?.observe(element);
          });

          doc.addEventListener("pointerup", () => {
            resizeCards.forEach((element) => {
              if (!element.__llBentoResizeActive) {
                return;
              }

              element.__llBentoResizeActive = false;
              const rect = element.getBoundingClientRect();
              const start = element.__llBentoResizeStart || {};
              const changed = Math.abs(Math.round(rect.width) - (start.width || rect.width)) > 2
                || Math.abs(Math.round(rect.height) - (start.height || rect.height)) > 2;
              window.clearTimeout(element.__llBentoResizeTimer);
              if (changed) {
                persistBentoResize(element);
              }
            });
          }, true);
        };

        setupBentoResizePersistence();

        [
          ".ll-bento__eyebrow",
          ".ll-bento__title",
          ".ll-bento__lead",
          ".ll-bento__chip",
          ".ll-bento__stat",
          ".ll-bento__card-title",
          ".ll-bento__card-text",
          ".ll-bento__list li",
          ".ll-bento__footer-note",
          ".ll-bento__media-action",
          ".ll-bento__table-summary strong",
          ".ll-bento__card--table .table-text-custom"
        ].forEach((selector) => {
          root.querySelectorAll(selector).forEach((element) => {
            const id = markBentoNode(element);
            attachText(element, {
              scope: "bento",
              field: "text",
              bentoNodeId: id
            }, {
              multiline: element.matches(".ll-bento__lead, .ll-bento__card-text, .ll-bento__list li, .ll-bento__footer-note")
            });
          });
        });

        root.querySelectorAll("img, video, source").forEach((element) => {
          const id = markBentoNode(element);
          attachMedia(element, {
            scope: "bento",
            field: element.tagName === "SOURCE" ? "srcset" : "src",
            bentoNodeId: id
          }, element.tagName === "VIDEO" ? "URL do vídeo" : "URL da imagem");
        });

        root.querySelectorAll(".ll-bento__card--hero").forEach((element) => {
          const id = markBentoNode(element);
          attachMedia(element, {
            scope: "bento",
            field: "backgroundImage",
            bentoNodeId: id
          }, "URL da imagem de fundo");
        });

        [root, ...root.querySelectorAll(".ll-bento__card:not(.ll-bento__card--hero):not(.ll-bento__card--image), .ll-bento__lightbox-overlay")].forEach((element) => {
          const id = markBentoNode(element);
          attachColor(element, {
            scope: "bento",
            field: "backgroundColor",
            bentoNodeId: id
          }, "cor de fundo", { allowGradient: true, triggerEvent: "click" });
        });
      }
    }

    function renderTemplateEditor() {
      if (currentPage !== "conteudo") {
        return "";
      }

      return `
        <div class="editor-section-title">
          <div>
            <h3>LP container</h3>
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
