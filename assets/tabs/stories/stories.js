/**
 * Modulo oficial da aba Stories.
 * Carregado antes de assets/js/layout-lab.js.
 * Este arquivo contem a logica que antes ficava direto no motor central.
 */

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

      return injectTabDynamicStyle(getTabStyleAsset("stories", storiesStyle), "__STORIES_DYNAMIC_COLORS__", `
  .lp-stories {
    --story-ring-bg: ${ringBackground};
    --story-caption-bg-start: ${captionBgStart};
    --story-caption-bg-end: ${captionBgEnd};
    --story-caption-bg: ${captionBg};
  }`);
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

      return `<picture class="lp-stories__picture">
                  <img class="lp-stories__image" src="${src}" alt="${alt}" width="1080" height="1920" loading="lazy">
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
