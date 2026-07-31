/**
 * Layout Lab core/orquestrador.
 * As funcoes especificas de cada aba ficam em assets/tabs/<aba>/<aba>.js
 * e sao carregadas antes deste arquivo nas paginas do app.
 */

    const tabAssetManifest = {
      faq: "faq/faq",
      table: "tabela/tabela",
      stories: "stories/stories",
      article: "artigo/artigo",
      carousel: "carrossel/carrossel",
      bento: "bento/bento",
      senko: "senko-bridge/senko-bridge",
      labbridge: "lab-bridge/lab-bridge",
      dashboard: "dashboard/dashboard",
      template: "lp-container/lp-container"
    };

    // Each tab asset is fetched separately for the editable preview. Keep a
    // revision for Bento so a GitHub Pages cache cannot combine an older CSS
    // grid with the current named-grid renderer.
    const tabAssetRevisions = {
      bento: "20260729-bento-preview-grid-1"
    };

    const tabAssets = {};

    function normalizeStyleBlock(cssOrStyle = "") {
      const value = String(cssOrStyle || "").trim();
      if (!value) {
        return "";
      }

      return /^<style[\s>]/i.test(value) ? value : `<style>\n${value}\n</style>`;
    }

    function getTabAsset(tab, type, fallback = "") {
      return tabAssets[tab] && typeof tabAssets[tab][type] === "string" && tabAssets[tab][type].trim()
        ? tabAssets[tab][type]
        : fallback;
    }

    function getTabHtmlAsset(tab, fallback = "") {
      return String(getTabAsset(tab, "html", fallback) || "").trim();
    }

    function getTabStyleAsset(tab, fallbackStyle = "") {
      const loadedCss = getTabAsset(tab, "css", "");
      return loadedCss ? normalizeStyleBlock(loadedCss) : fallbackStyle;
    }

    function injectTabDynamicStyle(styleBlock, token, cssPatch) {
      const style = normalizeStyleBlock(styleBlock);
      const patch = String(cssPatch || "").trim();

      if (style.includes(token)) {
        return style.replace(token, patch);
      }

      if (!patch) {
        return style;
      }

      return style.replace(/<\/style>\s*$/i, `${patch}\n</style>`);
    }

    async function loadTabAssets() {
      if (typeof fetch !== "function") {
        return;
      }

      const entries = Object.entries(tabAssetManifest);
      await Promise.all(entries.map(async ([tab, basePath]) => {
        const revision = tabAssetRevisions[tab] ? `?v=${tabAssetRevisions[tab]}` : "";
        const htmlPath = `assets/tabs/${basePath}.html${revision}`;
        const cssPath = `assets/tabs/${basePath}.css${revision}`;
        const result = {};

        await Promise.all([
          fetch(htmlPath, { cache: "no-store" })
            .then((response) => response.ok ? response.text() : "")
            .then((text) => { result.html = text; })
            .catch(() => {}),
          fetch(cssPath, { cache: "no-store" })
            .then((response) => response.ok ? response.text() : "")
            .then((text) => { result.css = text; })
            .catch(() => {})
        ]);

        if ((result.html && result.html.trim()) || (result.css && result.css.trim())) {
          tabAssets[tab] = {
            ...(tabAssets[tab] || {}),
            ...result
          };
        }
      }));
    }




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
          bento: {},
          senko: {},
          labbridge: {},
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
          bento: "",
          senko: "",
          labbridge: "",
          template: ""
        },
        items: {
          faq: [],
          table: [],
          stories: [],
          article: [],
          carousel: [],
          bento: [],
          senko: [],
          labbridge: [],
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
        bento: {},
        senko: {},
        labbridge: {},
        template: {}
      },
      classStyles: {
        faq: {},
        table: {},
        stories: {},
        article: {},
        carousel: {},
        bento: {},
        senko: {},
        labbridge: {},
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
      bento: {
        html: "",
        status: ""
      },
      senkoBridge: {
        loading: false,
        loaded: false,
        error: "",
        status: "",
        query: "",
        source: "senko",
        selectedVariants: {},
        layouts: [],
        variantsById: {},
        blocks: []
      },
      labBridge: {
        query: "",
        status: "",
        blocks: []
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
        eyebrow: "",
        title: "",
        lead: "",
        brandColor: "#ee6911",
        softColor: "#f3f6fb",
        sectionGradientEnabled: true,
        sectionGradientStart: "#ffffff",
        sectionGradientEnd: "#fff0f6",
        dotBackgroundColor: "#ffffff",
        dotTextColor: "#14202b",
        dotBorderColor: "#d9e2ea",
        dotHoverColor: "#fff9f2",
        dotHoverTextColor: "#14202b",
        dotHoverBorderColor: "#ee6911",
        dotActiveColor: "#fff4e0",
        dotActiveTextColor: "#ee6911",
        dotActiveBorderColor: "#ee6911",
        dotRadius: 12,
        dotBorderWidth: 1,
        dotMinHeight: 62,
        dotPaddingX: 16,
        dotHoverLift: 4,
        dotShadowOpacity: 0,
        showNavIcons: true,
        dotIconBackgroundColor: "#f0ede8",
        dotIconColor: "#14202b",
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
    const senkoTransferPreviewButtons = Array.from(document.querySelectorAll("[data-senko-transfer-preview]"));
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
    const cssCopyButtons = Array.from(document.querySelectorAll('[data-copy-mode="css"]'));
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
    let actionFeedbackTimer = 0;
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
        cssCopyLabel: "",
        fullCopyLabel: "",
        copiedStatus: "",
        cssCopiedStatus: "",
        fullCopiedStatus: ""
      },
      conteudo: {
        title: "Layout Lab",
        subtitle: "Monte layouts de conteudo com FAQ, tabela, stories, artigo, carrossel ou LP e copie HTML ou HTML/CSS conforme a necessidade.",
        outputTitle: "Prévia do layout",
        copyLabel: "Copiar HTML",
        cssCopyLabel: "Copiar CSS",
        fullCopyLabel: "Copiar HTML/CSS",
        copiedStatus: "HTML copiado.",
        cssCopiedStatus: "CSS copiado.",
        fullCopiedStatus: "HTML/CSS copiado."
      },
      tecnica: {
        title: "Layout Lab",
        subtitle: "Monte layouts tecnicos em FAQ e copie o bloco completo com HTML e CSS.",
        outputTitle: "HTML/CSS pronto",
        copyLabel: "Copiar HTML/CSS",
        cssCopyLabel: "",
        fullCopyLabel: "",
        copiedStatus: "HTML/CSS copiado.",
        cssCopiedStatus: "",
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

      if (tab === "bento") {
        return { bento: cloneValue(state.bento), textStyles: getSnapshotTextStyles(tab) };
      }

      if (tab === "labbridge") {
        return { labBridge: cloneValue(state.labBridge), textStyles: getSnapshotTextStyles(tab) };
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

      if (tab === "bento" && snapshot.bento) {
        state.bento = cloneValue(snapshot.bento);
        applySnapshotTextStyles(tab, snapshot);
        return;
      }

      if (tab === "labbridge" && snapshot.labBridge) {
        state.labBridge = cloneValue(snapshot.labBridge);
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
        return true;
      }

      state.responsive.saved[tab] = state.responsive.saved[tab] || {};
      state.responsive.saved[tab][device] = getTabSnapshot(tab);
      state.responsive.dirty = false;
      renderEditor(true);
      return true;
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
        rules.push(`.ll-carousel__container { padding: 0 ${scaledRem(1, spacingScale)}; }`);
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

      const hasAnyPreset = ["faq", "table", "stories", "article", "carousel", "bento", "template"].some((presetTab) => getUserPresets(presetTab).length > 0);

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

      ["faq", "table", "stories", "article", "carousel", "bento", "template"].forEach((tab) => {
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

          ["faq", "table", "stories", "article", "carousel", "bento", "template"].forEach((tab) => {
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
      const hasAnyPreset = ["faq", "table", "stories", "article", "carousel", "bento", "template"].some((tab) => getUserPresets(tab).length > 0);

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
        return false;
      }

      if (state.responsive.editDevice !== "base" && state.responsive.dirty) {
        window.alert("Salve ou descarte a versão responsiva aberta antes de salvar o preset.");
        return false;
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
          return false;
        }
        presets[existingIndex] = preset;
      } else {
        presets.push(preset);
      }

      state.presets.selected[tab] = preset.id;
      state.presets.dirty = true;
      persistUserPresets();
      renderEditor(true);
      return true;
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

      const findNextRuleBrace = (source, startIndex) => {
        let quote = "";
        let inComment = false;

        for (let index = startIndex; index < source.length; index += 1) {
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
            return index;
          }
        }

        return -1;
      };

      const splitSelectorList = (selectorText) => {
        const selectors = [];
        let current = "";
        let quote = "";
        let depth = 0;

        for (let index = 0; index < selectorText.length; index += 1) {
          const char = selectorText[index];

          if (quote) {
            current += char;
            if (char === "\\") {
              index += 1;
              current += selectorText[index] || "";
              continue;
            }
            if (char === quote) {
              quote = "";
            }
            continue;
          }

          if (char === "\"" || char === "'") {
            quote = char;
            current += char;
            continue;
          }

          if (char === "(" || char === "[" || char === "{") {
            depth += 1;
            current += char;
            continue;
          }

          if (char === ")" || char === "]" || char === "}") {
            depth = Math.max(0, depth - 1);
            current += char;
            continue;
          }

          if (char === "," && depth === 0) {
            selectors.push(current.trim());
            current = "";
            continue;
          }

          current += char;
        }

        if (current.trim()) {
          selectors.push(current.trim());
        }

        return selectors.filter(Boolean);
      };

      const scopeSelectorList = (selectorText) => splitSelectorList(selectorText)
        .map((selector) => selector.startsWith(scope) ? selector : `${scope} ${selector}`)
        .join(", ");

      const splitRulePrelude = (rawPrelude) => {
        let prefix = "";
        let rest = rawPrelude;

        while (rest) {
          const whitespace = rest.match(/^\s*/)?.[0] || "";
          if (whitespace) {
            prefix += whitespace;
            rest = rest.slice(whitespace.length);
          }

          if (rest.startsWith("/*")) {
            const commentEnd = rest.indexOf("*/");
            if (commentEnd === -1) {
              break;
            }
            prefix += rest.slice(0, commentEnd + 2);
            rest = rest.slice(commentEnd + 2);
            continue;
          }

          const nonBlockAtRule = rest.match(/^@(charset|import|namespace)\b[\s\S]*?;\s*/i);
          if (nonBlockAtRule) {
            prefix += nonBlockAtRule[0];
            rest = rest.slice(nonBlockAtRule[0].length);
            continue;
          }

          break;
        }

        return {
          prefix,
          prelude: rest.trim()
        };
      };

      const scopeBlock = (source) => {
        let output = "";
        let cursor = 0;

        while (cursor < source.length) {
          const openIndex = findNextRuleBrace(source, cursor);

          if (openIndex === -1) {
            output += source.slice(cursor);
            break;
          }

          const rawPrelude = source.slice(cursor, openIndex);
          const { prefix, prelude } = splitRulePrelude(rawPrelude);
          const closeIndex = findMatchingBrace(source, openIndex);

          if (!prelude || closeIndex === -1) {
            output += source.slice(cursor);
            break;
          }

          const body = source.slice(openIndex + 1, closeIndex);

          if (prelude.startsWith("@")) {
            const shouldScopeNestedRules = /^@(media|supports|container|layer)\b/i.test(prelude);
            output += `${prefix}${prelude} {${shouldScopeNestedRules ? scopeBlock(body) : body}}`;
          } else {
            output += `${prefix}${scopeSelectorList(prelude)} {${body}}`;
          }

          cursor = closeIndex + 1;
        }

        return output;
      };

      return scopeBlock(css);
    }

    function scopeResponsiveStyle(value, scope) {
      const styleOutput = String(value || "");

      if (!styleOutput.trim()) {
        return "";
      }

      if (!/<style\b/i.test(styleOutput)) {
        return `<style>\n${scopeResponsiveCss(styleOutput, scope)}\n</style>`;
      }

      return styleOutput.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => {
        return `<style>\n${scopeResponsiveCss(css, scope)}\n</style>`;
      });
    }

    function repairResponsiveCssOutput(value) {
      return String(value || "")
        .replace(/(^|\n)([ \t]*)\.ll-responsive-version--(?:base|mobile|tablet|desktop)\s+(\/\*[\s\S]*?\*\/\s*@(?:media|supports|container|layer)\b)/gi, "$1$2$3")
        .replace(/(^|\n)([ \t]*)\.ll-responsive-version--(?:base|mobile|tablet|desktop)\s+(@(?:media|supports|container|layer|keyframes|font-face|property|page|-[\w-]+-keyframes)\b)/gi, "$1$2$3");
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
.ll-responsive-output,
.ll-responsive-output > .ll-responsive-version {
  box-sizing: border-box;
  display: block;
  inline-size: 100%;
  width: 100%;
  min-width: 0;
  max-width: none;
  margin: 0;
}

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
        const css = buildWithSnapshot(tab, baseSnapshot, styleBuilder);
        const markedCss = tab === "faq" ? wrapFaqCssMarkers(css) : css;
        return cleanPictureSourcesFromOutput(repairResponsiveCssOutput(`${markedCss}

<!-- HTML DO LAYOUT -->

${buildWithSnapshot(tab, baseSnapshot, htmlBuilder)}`));
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

      const cssPackage = `${baseCss}

${versionBlocks.map((block) => block.css).join("\n\n")}

${buildResponsiveSwitchStyle(versionDevices)}`;
      const markedCssPackage = tab === "faq" ? wrapFaqCssMarkers(cssPackage) : cssPackage;

      return cleanPictureSourcesFromOutput(repairResponsiveCssOutput(`${markedCssPackage}

<!-- HTML DO LAYOUT -->

<div class="${wrapperClasses}">
  <div class="ll-responsive-version ll-responsive-version--base">
${baseHtml}
  </div>
${versionBlocks.map((block) => `  <div class="ll-responsive-version ll-responsive-version--${block.device}">
${block.html}
  </div>`).join("\n")}
</div>`));
    }

    function stripOutputImageSizeVariant(value) {
      const rawValue = String(value || "").trim();
      if (!rawValue) {
        return "";
      }

      const hashIndex = rawValue.indexOf("#");
      const hash = hashIndex >= 0 ? rawValue.slice(hashIndex) : "";
      const withoutHash = hashIndex >= 0 ? rawValue.slice(0, hashIndex) : rawValue;
      const queryIndex = withoutHash.indexOf("?");
      if (queryIndex === -1) {
        return rawValue;
      }

      const path = withoutHash.slice(0, queryIndex);
      const query = withoutHash.slice(queryIndex + 1)
        .split("&")
        .filter((param) => param && !/^ims=/i.test(param))
        .join("&");

      return `${path}${query ? `?${query}` : ""}${hash}`;
    }

    function cleanPictureSourcesFromOutput(value) {
      const rawValue = String(value || "");
      if (!rawValue || (!/<picture[\s>]/i.test(rawValue) && !/\ssrcset\s*=/i.test(rawValue))) {
        return rawValue;
      }

      if (typeof DOMParser === "undefined") {
        return rawValue
          .replace(/<source\b[^>]*\ssrcset=(["'])[\s\S]*?\1[^>]*>/gi, "")
          .replace(/\s+srcset=(["'])[\s\S]*?\1/gi, "");
      }

      const parsedDocument = new DOMParser().parseFromString(`<div data-ll-output-picture-cleaner>${rawValue}</div>`, "text/html");
      const wrapper = parsedDocument.querySelector("[data-ll-output-picture-cleaner]");
      if (!wrapper) {
        return rawValue;
      }

      wrapper.querySelectorAll("picture").forEach((picture) => {
        picture.querySelectorAll("source[srcset]").forEach((source) => {
          source.remove();
        });

        const image = picture.querySelector("img[src]");
        if (image) {
          image.setAttribute("src", stripOutputImageSizeVariant(image.getAttribute("src")));
        }
      });

      wrapper.querySelectorAll("[srcset]").forEach((element) => {
        element.removeAttribute("srcset");
      });

      return wrapper.innerHTML;
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

      if (tab === "bento") {
        const bentoHtml = buildBentoSectionHtml();
        if (!hasFieldValue(bentoHtml)) {
          addUniqueWarning(warnings, "Bento: HTML vazio");
        }
        collectHtmlAccessibilityWarnings(bentoHtml, "Bento").forEach((warning) => {
          addUniqueWarning(warnings, warning);
        });
        if (/<script\b/i.test(bentoHtml)) {
          addUniqueWarning(warnings, "Bento: contém script no HTML");
        }
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

      if (tab === "bento") {
        const bentoHtml = buildBentoSectionHtml();
        return [
          { ok: hasFieldValue(bentoHtml), label: "HTML do Bento preenchido" },
          { ok: !/<script\b/i.test(bentoHtml), label: "Sem script dentro do Bento" },
          { ok: !collectHtmlAccessibilityWarnings(bentoHtml, "Bento").length, label: "Imagens com alt text" },
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

    function normalizeCssColorStop(value, fallback = "#ea5b0c") {
      const rawValue = String(value || "").trim();
      if (isHexColor(rawValue)) {
        return normalizeHexColor(rawValue);
      }

      const rgbMatch = rawValue.match(/^rgba?\(\s*(\d+(?:\.\d+)?)(?:\s*,\s*|\s+)(\d+(?:\.\d+)?)(?:\s*,\s*|\s+)(\d+(?:\.\d+)?)/i);
      if (rgbMatch) {
        return `#${rgbMatch.slice(1, 4).map((part) => {
          return Math.min(255, Math.max(0, Math.round(Number(part)))).toString(16).padStart(2, "0");
        }).join("")}`;
      }

      return normalizeHexColor(fallback);
    }

    function parseCssGradient(value) {
      const rawValue = String(value || "").trim();
      const colorStop = "(#[0-9a-fA-F]{3,6}|rgba?\\([^)]*\\))";
      const match = rawValue.match(new RegExp(`^linear-gradient\\(\\s*(\\d{1,3})deg\\s*,\\s*${colorStop}\\s*,\\s*${colorStop}\\s*\\)$`, "i"));
      if (!match) {
        return null;
      }

      return {
        angle: Math.min(360, Math.max(0, Number(match[1]))),
        start: normalizeCssColorStop(match[2]),
        end: normalizeCssColorStop(match[3])
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
      const numericValue = Number(String(value || "").replace(",", "."));
      if (!Number.isFinite(numericValue)) {
        return 0.74;
      }

      return Math.min(0.95, Math.max(0, numericValue));
    }

    function normalizeCarouselCaptionOpacity(value) {
      const numericValue = Number(String(value || "").replace(",", "."));
      if (!Number.isFinite(numericValue)) {
        return 0.64;
      }

      return Math.min(0.95, Math.max(0, numericValue));
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

    function updateEditorTabs() {
      const showTools = currentPage === "conteudo" && currentEditorTab !== "dashboard" && currentEditorTab !== "template" && currentEditorTab !== "senko" && currentEditorTab !== "labbridge";
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
      const isBentoTab = currentPage === "conteudo" && currentEditorTab === "bento";
      const isSenkoTab = currentPage === "conteudo" && currentEditorTab === "senko";
      const isLabBridgeTab = currentPage === "conteudo" && currentEditorTab === "labbridge";
      const isTemplateTab = currentPage === "conteudo" && currentEditorTab === "template";
      const showHomeReturn = currentPage === "conteudo" && (!isDashboardTab || state.dashboard.view !== "layouts");
      const label = isTableTab ? "Adicionar linha" : "Adicionar pergunta";
      homeReturnButtons.forEach((button) => {
        button.classList.toggle("is-hidden", !showHomeReturn);
      });
      addButtons.forEach((button) => {
        button.classList.toggle("is-hidden", isDashboardTab || isStoriesTab || isArticleTab || isCarouselTab || isBentoTab || isSenkoTab || isLabBridgeTab || isTemplateTab);
        button.textContent = "+";
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
      });
    }

    function updateCopyButtons(config) {
      if (currentPage === "home") {
        outputTitle.textContent = "";
        htmlCopyButtons.forEach((button) => button.classList.add("is-hidden"));
        cssCopyButtons.forEach((button) => button.classList.add("is-hidden"));
        fullCopyButtons.forEach((button) => button.classList.add("is-hidden"));
        return;
      }

      const isDashboardTab = currentPage === "conteudo" && currentEditorTab === "dashboard";
      const isTemplateTab = currentPage === "conteudo" && currentEditorTab === "template";
      const isSenkoTab = currentPage === "conteudo" && currentEditorTab === "senko";
      const isLabBridgeTab = currentPage === "conteudo" && currentEditorTab === "labbridge";
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

      if (isSenkoTab) {
        outputTitle.textContent = "Montagem SenkoBridge";
      }

      if (isLabBridgeTab) {
        outputTitle.textContent = "Montagem de layouts do Lab";
      }

      htmlCopyButtons.forEach((button) => {
        button.textContent = config.copyLabel;
        button.classList.toggle("is-hidden", isDashboardTab || isSenkoTab || isLabBridgeTab);
      });

      cssCopyButtons.forEach((button) => {
        button.textContent = config.cssCopyLabel || "Copiar CSS";
        button.classList.toggle("is-hidden", currentPage !== "conteudo" || isDashboardTab || isSenkoTab || isLabBridgeTab);
      });

      fullCopyButtons.forEach((button) => {
        button.textContent = config.fullCopyLabel;
        button.classList.toggle("is-hidden", currentPage !== "conteudo" || isDashboardTab || isSenkoTab || isLabBridgeTab);
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

    function buildBlocksHtml(includeTable) {
      const blocks = [buildFaqSectionHtml()];
      const tableHtml = includeTable ? buildTableSectionHtml() : "";

      if (tableHtml) {
        blocks.push(tableHtml);
      }

      return blocks.join("\n\n");
    }

    function wrapFaqCssMarkers(css) {
      const cleanCss = String(css || "").trim();
      if (!cleanCss) {
        return "";
      }

      if (cleanCss.includes("inicio-area-de-faq") && cleanCss.includes("final-area-de-faq")) {
        return cleanCss;
      }

      return `<!-- /* inicio-area-de-faq */ -->

${cleanCss}

<!--   /* final-area-de-faq */ -->`;
    }

    function buildTabStyleWithClass(tab, styleBuilder) {
      const baseStyle = typeof styleBuilder === "function" ? styleBuilder() : "";
      const classStyle = typeof buildPreviewClassStyle === "function" ? buildPreviewClassStyle(tab) : "";
      return [baseStyle, classStyle].filter((part) => String(part || "").trim()).join("\n\n");
    }

    function buildTabOutputStyleWithClass(tab, dynamicStyleBuilder) {
      const dynamicStyle = typeof dynamicStyleBuilder === "function" ? dynamicStyleBuilder() : "";
      const classStyle = typeof buildPreviewClassStyle === "function" ? buildPreviewClassStyle(tab) : "";
      return [dynamicStyle, classStyle].filter((part) => String(part || "").trim()).join("\n\n");
    }

    const structuralStylesheetBaseUrl = "https://imgprd.martinsatacado.com.br/catalogoimg/catalogo";
    const structuralStylesheetFiles = {
      faq: "style-faq-padrao.css",
      table: "tabela.css",
      stories: "stories.css",
      article: "artigo.css",
      carousel: "carrossel.css",
      bento: "bento.css"
    };

    function getCurrentOutputLayoutKey() {
      if (currentPage === "tecnica") {
        return "faq";
      }

      return structuralStylesheetFiles[currentEditorTab] ? currentEditorTab : "";
    }

    function buildStructuralStylesheetLink(tab = getCurrentOutputLayoutKey()) {
      const fileName = structuralStylesheetFiles[tab];
      return fileName
        ? `<link rel="stylesheet" href="${structuralStylesheetBaseUrl}/${fileName}">`
        : "";
    }

    function prependStructuralStylesheet(output, tab = getCurrentOutputLayoutKey()) {
      const link = buildStructuralStylesheetLink(tab);
      const value = String(output || "").trim();

      if (!link || !value || value.includes(link)) {
        return value;
      }

      return `${link}\n\n${value}`;
    }

    const faqExternalStylesheetLink = buildStructuralStylesheetLink("faq");

    function buildFaqPreviewStylePackage(options = {}) {
      const parts = [buildTabStyleWithClass("faq", buildFaqStyle)];
      if (options.includeResponsive) {
        parts.push(buildResponsiveStyle("faq", options.responsiveOptions || {}));
      }

      return parts.filter((part) => String(part || "").trim()).join("\n\n");
    }

    function buildFaqStylePackage() {
      return faqExternalStylesheetLink;
    }

    function buildFaqOutputPackage() {
      return `${buildFaqStylePackage()}

<!-- HTML DO LAYOUT -->

${buildFaqSectionHtml()}`;
    }

    function buildFullHtml(includeTable) {
      const faqStyles = buildFaqStylePackage({ includeResponsive: true });
      const styles = includeTable && hasTableData() ? `${faqStyles}\n\n${buildTabStyleWithClass("table", buildTableStyle)}` : faqStyles;

      return `${styles}

<!-- HTML DO LAYOUT -->

${buildBlocksHtml(includeTable)}`;
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

    function buildPreviewHtml() {
      if (currentPage === "home") {
        return "";
      }

      if (currentPage === "conteudo" && currentEditorTab === "dashboard") {
        return buildDashboardPreviewHtml();
      }

      if (currentPage === "conteudo" && currentEditorTab === "table") {
        return `${buildTableSectionHtml(true)}

${buildTabStyleWithClass("table", buildTableStyle)}

${buildResponsiveStyle("table", { includeDraft: true })}`;
      }

      if (currentPage === "conteudo" && currentEditorTab === "stories") {
        return `${buildStoriesSectionHtml(getStoriesPreviewTarget())}

${buildTabStyleWithClass("stories", buildStoriesStyle)}

${buildResponsiveStyle("stories", { includeDraft: true })}`;
      }

      if (currentPage === "conteudo" && currentEditorTab === "article") {
        return `${buildArticleSectionHtml()}

${buildTabStyleWithClass("article", buildArticleStyle)}

${buildResponsiveStyle("article", { includeDraft: true })}`;
      }

      if (currentPage === "conteudo" && currentEditorTab === "carousel") {
        return `${buildCarouselSectionHtml(state.carousel.previewSlideIndex)}

${buildTabStyleWithClass("carousel", buildCarouselStyle)}

${buildResponsiveStyle("carousel", { includeDraft: true })}`;
      }

      if (currentPage === "conteudo" && currentEditorTab === "bento") {
        return `${buildBentoSectionHtml({ includeEditorSizing: true })}

${buildTabStyleWithClass("bento", buildBentoPreviewStyle)}

${buildResponsiveStyle("bento", { includeDraft: true })}`;
      }

      if (currentPage === "conteudo" && currentEditorTab === "senko") {
        return typeof buildSenkoBridgePreviewHtml === "function" ? buildSenkoBridgePreviewHtml() : "";
      }

      if (currentPage === "conteudo" && currentEditorTab === "labbridge") {
        return typeof buildLabBridgePreviewHtml === "function" ? buildLabBridgePreviewHtml() : "";
      }

      if (currentPage === "conteudo" && currentEditorTab === "template") {
        return buildTemplatePreviewHtml();
      }

      if (currentPage === "conteudo") {
        return `${buildFaqSectionHtml()}

${buildFaqPreviewStylePackage({ includeResponsive: true, responsiveOptions: { includeDraft: true } })}`;
      }

      return buildFullHtml(false);
    }

    function buildOutputHtmlRaw(copyMode = "html") {
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

        if (copyMode === "css") {
          return buildTabOutputStyleWithClass("table", buildTableDynamicStyle);
        }

        if (copyMode === "full") {
          return buildResponsivePackage("table", () => buildTableSectionHtml(true), () => buildTabOutputStyleWithClass("table", buildTableDynamicStyle));
        }

        return tableHtml;
      }

      if (currentEditorTab === "stories") {
        const storiesHtml = buildStoriesSectionHtml();

        if (copyMode === "css") {
          return buildTabOutputStyleWithClass("stories", buildStoriesDynamicStyle);
        }

        if (copyMode === "full") {
          return buildResponsivePackage("stories", () => buildStoriesSectionHtml(), () => buildTabOutputStyleWithClass("stories", buildStoriesDynamicStyle));
        }

        return storiesHtml;
      }

      if (currentEditorTab === "article") {
        const articleHtml = buildArticleSectionHtml();

        if (copyMode === "css") {
          return buildTabOutputStyleWithClass("article", buildArticleDynamicStyle);
        }

        if (copyMode === "full") {
          return buildResponsivePackage("article", () => buildArticleSectionHtml(), () => buildTabOutputStyleWithClass("article", buildArticleDynamicStyle));
        }

        return articleHtml;
      }

      if (currentEditorTab === "carousel") {
        const carouselHtml = buildCarouselSectionHtml();

        if (copyMode === "css") {
          return buildTabOutputStyleWithClass("carousel", buildCarouselDynamicStyle);
        }

        if (copyMode === "full") {
          return buildResponsivePackage("carousel", () => buildCarouselSectionHtml(), () => buildTabOutputStyleWithClass("carousel", buildCarouselDynamicStyle));
        }

        return carouselHtml;
      }

      if (currentEditorTab === "bento") {
        // Structural Bento rules live in the hosted bento.css file. The
        // exported block carries only styles changed through the editor.
        const buildBentoMarkup = () => cleanBentoOutputHtml(buildBentoSectionHtml(), {
          stripEditorSizing: true
        });
        const buildBentoExportPackage = () => buildTabOutputStyleWithClass("bento");

        if (copyMode === "css") {
          return buildBentoExportPackage();
        }

        if (copyMode === "full") {
          return buildResponsivePackage("bento", buildBentoMarkup, buildBentoExportPackage);
        }

        return buildBentoMarkup();
      }

      if (currentEditorTab === "senko") {
        if (typeof buildSenkoBridgeOutputHtml !== "function") {
          return "";
        }

        return buildSenkoBridgeOutputHtml(copyMode);
      }

      if (currentEditorTab === "labbridge") {
        if (typeof buildLabBridgeOutputHtml !== "function") {
          return "";
        }

        return buildLabBridgeOutputHtml(copyMode);
      }

      if (currentEditorTab === "template") {
        if (copyMode === "css") {
          const embeddedStyle = typeof buildTemplateEmbeddedStyle === "function" ? buildTemplateEmbeddedStyle() : "";
          return [embeddedStyle, buildTabStyleWithClass("template", buildTemplateStyle)].filter(Boolean).join("\n\n");
        }

        if (copyMode === "full" && getResponsiveVersionList("template").length) {
          return buildResponsivePackage("template", () => buildTemplateOutputHtml("html"), () => {
            const embeddedStyle = typeof buildTemplateEmbeddedStyle === "function" ? buildTemplateEmbeddedStyle() : "";
            return [embeddedStyle, buildTabStyleWithClass("template", buildTemplateStyle)].filter(Boolean).join("\n\n");
          });
        }

        return buildTemplateOutputHtml(copyMode);
      }

      const faqHtml = buildFaqSectionHtml();

      if (copyMode === "css") {
        return buildFaqStylePackage();
      }

      if (copyMode === "full") {
        return buildFaqOutputPackage();
      }

      return faqHtml;
    }

    function findCssOpeningBrace(source, startIndex = 0) {
      let quote = "";
      let inComment = false;

      for (let index = startIndex; index < source.length; index += 1) {
        const current = source[index];
        const next = source[index + 1];

        if (inComment) {
          if (current === "*" && next === "/") {
            inComment = false;
            index += 1;
          }
          continue;
        }

        if (quote) {
          if (current === "\\") {
            index += 1;
          } else if (current === quote) {
            quote = "";
          }
          continue;
        }

        if (current === "/" && next === "*") {
          inComment = true;
          index += 1;
        } else if (current === "\"" || current === "'") {
          quote = current;
        } else if (current === "{") {
          return index;
        }
      }

      return -1;
    }

    function findCssClosingBrace(source, openingIndex) {
      let depth = 0;
      let quote = "";
      let inComment = false;

      for (let index = openingIndex; index < source.length; index += 1) {
        const current = source[index];
        const next = source[index + 1];

        if (inComment) {
          if (current === "*" && next === "/") {
            inComment = false;
            index += 1;
          }
          continue;
        }

        if (quote) {
          if (current === "\\") {
            index += 1;
          } else if (current === quote) {
            quote = "";
          }
          continue;
        }

        if (current === "/" && next === "*") {
          inComment = true;
          index += 1;
        } else if (current === "\"" || current === "'") {
          quote = current;
        } else if (current === "{") {
          depth += 1;
        } else if (current === "}") {
          depth -= 1;
          if (depth === 0) return index;
        }
      }

      return -1;
    }

    function splitCssSelectors(selectorText) {
      const selectors = [];
      let start = 0;
      let quote = "";
      let parenthesisDepth = 0;
      let bracketDepth = 0;

      for (let index = 0; index < selectorText.length; index += 1) {
        const current = selectorText[index];

        if (quote) {
          if (current === "\\") {
            index += 1;
          } else if (current === quote) {
            quote = "";
          }
          continue;
        }

        if (current === "\"" || current === "'") {
          quote = current;
        } else if (current === "(") {
          parenthesisDepth += 1;
        } else if (current === ")") {
          parenthesisDepth = Math.max(0, parenthesisDepth - 1);
        } else if (current === "[") {
          bracketDepth += 1;
        } else if (current === "]") {
          bracketDepth = Math.max(0, bracketDepth - 1);
        } else if (current === "," && parenthesisDepth === 0 && bracketDepth === 0) {
          selectors.push(selectorText.slice(start, index).trim());
          start = index + 1;
        }
      }

      const finalSelector = selectorText.slice(start).trim();
      if (finalSelector) selectors.push(finalSelector);
      return selectors;
    }

    function selectorCanMatchOutput(selector, outputRoot) {
      const normalized = String(selector || "").replace(/\/\*[\s\S]*?\*\//g, "").trim();
      if (!normalized || normalized.startsWith("@")) return true;

      // Document-level and advanced selectors are intentionally retained. The
      // exporter only removes rules it can prove have no target in the output.
      if (/\b(?:html|body)\b|:root|:host|:slotted|:has\(/i.test(normalized)) {
        return true;
      }

      const query = normalized
        .replace(/::[\w-]+(?:\([^)]*\))?/g, "")
        .replace(/:(?:hover|active|focus(?:-visible|-within)?|visited|checked|disabled|enabled|target|open|closed|playing|paused|valid|invalid|in-range|out-of-range|required|optional|read-only|read-write|placeholder-shown|autofill)\b(?:\([^)]*\))?/gi, "")
        .trim();

      if (!query || query === "*") return true;

      try {
        return Boolean(outputRoot.querySelector(query));
      } catch (error) {
        // A selector the browser cannot safely evaluate should never be lost.
        return true;
      }
    }

    function pruneUnusedCssRules(cssText, outputRoot) {
      const source = String(cssText || "");
      let cursor = 0;
      let output = "";

      while (cursor < source.length) {
        const openingIndex = findCssOpeningBrace(source, cursor);
        if (openingIndex < 0) break;

        const closingIndex = findCssClosingBrace(source, openingIndex);
        if (closingIndex < 0) return source;

        const rawPrelude = source.slice(cursor, openingIndex);
        const prelude = rawPrelude.replace(/\/\*[\s\S]*?\*\//g, "").trim();
        const body = source.slice(openingIndex + 1, closingIndex);
        const atRule = prelude.match(/^@([\w-]+)/);

        if (atRule) {
          const ruleName = atRule[1].toLowerCase();
          if (["media", "supports", "container", "layer", "scope", "document"].includes(ruleName)) {
            const cleanedBody = pruneUnusedCssRules(body, outputRoot);
            if (cleanedBody.trim()) {
              output += `${prelude} {${cleanedBody}}\n`;
            }
          } else {
            output += `${prelude} {${body}}\n`;
          }
        } else {
          const matchingSelectors = splitCssSelectors(prelude)
            .filter((selector) => selectorCanMatchOutput(selector, outputRoot));

          if (matchingSelectors.length) {
            output += `${matchingSelectors.join(",\n")} {${body}}\n`;
          }
        }

        cursor = closingIndex + 1;
      }

      return output;
    }

    function pruneUnusedOutputCss(value, htmlReference) {
      const rawValue = String(value || "");
      if (!rawValue || !/<style\b/i.test(rawValue) || typeof DOMParser === "undefined") {
        return rawValue;
      }

      const parsedDocument = new DOMParser().parseFromString("<div data-ll-output-usage-root></div>", "text/html");
      const outputRoot = parsedDocument.querySelector("[data-ll-output-usage-root]");
      if (!outputRoot) return rawValue;

      outputRoot.innerHTML = String(htmlReference || "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");

      return rawValue.replace(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi, (match, attributes, cssText) => {
        const cleanedCss = pruneUnusedCssRules(cssText, outputRoot).trim();
        return cleanedCss ? `<style${attributes}>\n${cleanedCss}\n</style>` : "";
      });
    }

    function buildOutputHtml(copyMode = "html") {
      const value = buildOutputHtmlRaw(copyMode);
      const outputWithStructuralStylesheet = prependStructuralStylesheet(value);
      const cleanedValue = copyMode === "css"
        ? outputWithStructuralStylesheet
        : cleanPictureSourcesFromOutput(outputWithStructuralStylesheet);
      if (copyMode === "html") return cleanedValue;

      const htmlReference = copyMode === "css"
        ? cleanPictureSourcesFromOutput(buildOutputHtmlRaw("html"))
        : cleanedValue;
      return pruneUnusedOutputCss(cleanedValue, htmlReference);
    }

    function getPreviewTextStyle(meta) {
      const tab = getTextStyleTab(meta);
      const key = getPreviewTextStyleKey(meta);
      return cloneValue((state.textStyles && state.textStyles[tab] && state.textStyles[tab][key]) || {});
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
        bento: 1180,
        senko: 1280,
        labbridge: 1280,
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
      return currentPage === "conteudo" && currentEditorTab !== "dashboard" && currentEditorTab !== "senko" && currentEditorTab !== "labbridge";
    }

    function transferSenkoBridgeToLp() {
      if (currentEditorTab === "labbridge") {
        if (typeof buildLabBridgeTransferHtml !== "function") {
          return;
        }
        state.template.html = buildLabBridgeTransferHtml();
        state.template.status = "Montagem dos layouts do Lab transferida para o LP.";
        currentEditorTab = "template";
        renderEditor();
        return;
      }

      if (typeof buildSenkoBridgeTransferHtml !== "function") {
        return;
      }
      state.template.html = buildSenkoBridgeTransferHtml();
      state.template.status = "Montagem do SenkoBridge transferida para o LP.";
      currentEditorTab = "template";
      renderEditor();
    }

    function updateSenkoTransferPreviewButtons() {
      const showTransfer = currentPage === "conteudo" && (currentEditorTab === "senko" || currentEditorTab === "labbridge");
      const activeBridge = currentEditorTab === "labbridge" ? state.labBridge : state.senkoBridge;
      const hasBlocks = Boolean(showTransfer && activeBridge && Array.isArray(activeBridge.blocks) && activeBridge.blocks.length);
      senkoTransferPreviewButtons.forEach((button) => {
        button.hidden = !showTransfer;
        button.disabled = !hasBlocks;
        button.textContent = "Transferir pro LP";
      });
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
        return false;
      }

      return saveResponsiveDraft();
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
        updateSenkoTransferPreviewButtons();
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
      updateSenkoTransferPreviewButtons();
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

    function getEditorFocusSnapshot() {
      const activeElement = document.activeElement;
      if (!activeElement || !editor.contains(activeElement)) {
        return null;
      }

      if (!["TEXTAREA", "INPUT", "SELECT"].includes(activeElement.tagName)) {
        return null;
      }

      return {
        element: activeElement,
        start: typeof activeElement.selectionStart === "number" ? activeElement.selectionStart : null,
        end: typeof activeElement.selectionEnd === "number" ? activeElement.selectionEnd : null,
        scrollTop: activeElement.scrollTop,
        scrollLeft: activeElement.scrollLeft
      };
    }

    function restoreEditorFocusSnapshot(snapshot) {
      if (!snapshot || !snapshot.element || !document.contains(snapshot.element)) {
        return;
      }

      snapshot.element.focus({ preventScroll: true });
      if (snapshot.start !== null && typeof snapshot.element.setSelectionRange === "function") {
        snapshot.element.setSelectionRange(snapshot.start, snapshot.end);
      }
      snapshot.element.scrollTop = snapshot.scrollTop || 0;
      snapshot.element.scrollLeft = snapshot.scrollLeft || 0;
    }

    function scheduleTemplatePreviewUpdate(delay = 320) {
      window.clearTimeout(templatePreviewUpdateTimer);
      templatePreviewUpdateTimer = window.setTimeout(() => {
        updateOutput();
      }, delay);
    }

    function updateOutput(options = {}) {
      const editorFocusSnapshot = getEditorFocusSnapshot();
      const preservePreviewScroll = options.preservePreviewScroll !== false;
      const previewScrollPosition = preservePreviewScroll ? getPreviewScrollPosition() : null;
      generatedHtml.value = buildOutputHtml("html");
      updatePreviewDeviceUi();
      previewFrame.addEventListener("load", () => {
        setupPreviewEditing();
        if (previewScrollPosition) {
          restorePreviewScrollPosition(previewScrollPosition);
        }
        restoreEditorFocusSnapshot(editorFocusSnapshot);
      }, { once: true });
      previewFrame.srcdoc = buildPreviewHtml();
      restoreEditorFocusSnapshot(editorFocusSnapshot);
      copyStatus.textContent = "";
      copyStatus.classList.remove("is-warning", "is-visible");
    }

    function renderEditableFaqEditorItems() {
      return state.items.map((item, index) => `
        <details class="faq-editor__item" data-index="${index}">
          <summary class="faq-editor__bar">
            <strong>Pergunta ${index + 1}</strong>
            <button class="button button--danger icon-button" type="button" data-action="remove" aria-label="Remover pergunta ${index + 1}" title="Remover pergunta">${trashIcon()}</button>
          </summary>
          <div class="faq-editor__fields">
            <label class="field">
              <span>Pergunta</span>
              <input type="text" data-field="question" value="${escapeHtml(item.question)}">
            </label>
            <label class="field">
              <span>Resposta</span>
              <textarea data-field="answer">${escapeHtml(item.answer)}</textarea>
            </label>
          </div>
        </details>
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

        ${renderEditableFaqEditorItems()}
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
      } else if (currentPage === "conteudo" && currentEditorTab === "bento") {
        editor.innerHTML = renderBentoEditor();
      } else if (currentPage === "conteudo" && currentEditorTab === "senko") {
        editor.innerHTML = typeof renderSenkoBridgeEditor === "function" ? renderSenkoBridgeEditor() : "";
      } else if (currentPage === "conteudo" && currentEditorTab === "labbridge") {
        editor.innerHTML = typeof renderLabBridgeEditor === "function" ? renderLabBridgeEditor() : "";
      } else if (currentPage === "conteudo" && currentEditorTab === "template") {
        editor.innerHTML = renderTemplateEditor();
      } else {
        editor.innerHTML = renderFaqEditor();
      }
      setupTemplateCodeEditors(editor);
      if (currentPage === "conteudo" && currentEditorTab !== "dashboard") {
        const presetMarkup = currentEditorTab === "template" || currentEditorTab === "senko" || currentEditorTab === "labbridge" || currentEditorTab === "bento" ? "" : renderPresetPanel();
        if (presetMarkup) {
          editor.insertAdjacentHTML("afterbegin", presetMarkup);
        }
      }
      editor.scrollTop = preserveScroll ? previousScrollTop : 0;

      updateOutput();
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

    function showActionFeedback(message, button, options = {}) {
      let toast = document.querySelector("#actionFeedbackToast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "actionFeedbackToast";
        toast.className = "action-feedback-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.append(toast);
      }

      toast.textContent = message;
      toast.classList.toggle("is-warning", Boolean(options.warning));
      toast.classList.remove("is-visible");
      void toast.offsetWidth;
      toast.classList.add("is-visible");

      if (button) {
        button.classList.remove("is-action-confirmed");
        void button.offsetWidth;
        button.classList.add("is-action-confirmed");
        window.setTimeout(() => button.classList.remove("is-action-confirmed"), 520);
      }

      window.clearTimeout(actionFeedbackTimer);
      actionFeedbackTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible", "is-warning");
      }, options.warning ? 5200 : 2500);
    }

    function getCopyStatusMessage(copyMode, warnings) {
      const baseStatus = copyMode === "css" && currentPage === "conteudo"
        ? pageConfigs[currentPage].cssCopiedStatus
        : copyMode === "full" && currentPage === "conteudo"
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

    async function copyGeneratedHtml(mode = "html", button) {
      const copyMode = mode === "full" ? "full" : mode === "css" ? "css" : "html";
      if (state.responsive.dirty && copyMode === "full") {
        const shouldCopy = window.confirm("Existe uma versão responsiva com alterações não salvas. Copiar agora não inclui esse rascunho. Copiar mesmo assim?");
        if (!shouldCopy) {
          return;
        }
      }

      const rawValue = buildOutputHtml(copyMode);
      const value = copyMode === "full" || copyMode === "css" ? repairResponsiveCssOutput(rawValue) : rawValue;
      const warnings = copyMode === "css" ? [] : collectLayoutWarnings();
      const blockerPrefix = copyMode === "full" ? "HTML/CSS" : copyMode === "css" ? "CSS" : "HTML";
      const blockers = collectHtmlLocalAssetBlockers(value, blockerPrefix);
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
        showActionFeedback(getCopyBlockedStatusMessage(blockers), button, { warning: true });
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
      showActionFeedback(getCopyStatusMessage(copyMode, warnings), button, { warning: warnings.length > 0 });
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

      const senkoQueryField = event.target.dataset.senkoQuery;
      if (senkoQueryField !== undefined) {
        state.senkoBridge.query = event.target.value;
        if (typeof refreshSenkoBridgeLayoutList !== "function" || !refreshSenkoBridgeLayoutList()) {
          renderEditor(true);
        }
        return;
      }

      const labQueryField = event.target.dataset.labQuery;
      if (labQueryField !== undefined) {
        state.labBridge.query = event.target.value;
        if (typeof refreshLabBridgeLayoutList !== "function" || !refreshLabBridgeLayoutList()) {
          renderEditor(true);
        }
        return;
      }

      const senkoVariantId = event.target.dataset.senkoVariant;
      if (senkoVariantId) {
        state.senkoBridge.selectedVariants[senkoVariantId] = event.target.value;
        renderEditor(true);
        return;
      }

      markResponsiveDirty();

      const bentoField = event.target.dataset.bentoField;
      if (bentoField) {
        if (typeof updateBentoBlockField === "function" && updateBentoBlockField(event.target)) {
          return;
        }

        if (bentoField === "html") {
          state.bento.html = event.target.value;
          state.bento.status = "";
          updateOutput();
          return;
        }
      }

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
          if (carouselField === "sectionGradientEnabled") {
            state.carousel.sectionGradientEnabled = event.target.checked;
          } else if (carouselField === "showIndicators") {
            state.carousel.showIndicators = event.target.checked;
          } else if (carouselField === "showNavIcons") {
            state.carousel.showNavIcons = event.target.checked;
          } else if (["brandColor", "softColor", "sectionGradientStart", "sectionGradientEnd", "dotBackgroundColor", "dotTextColor", "dotBorderColor", "dotHoverColor", "dotHoverTextColor", "dotHoverBorderColor", "dotActiveColor", "dotActiveTextColor", "dotActiveBorderColor", "dotIconBackgroundColor", "dotIconColor", "dotIconActiveBackgroundColor", "dotIconActiveColor", "indicatorColor", "indicatorActiveColor"].includes(carouselField)) {
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

      if (event.target.matches("select") || event.target.matches('[data-article-field="shellBackgroundEnabled"], [data-article-field="overlayEnabled"], [data-article-field="tabsProtectionEnabled"], [data-carousel-field="sectionGradientEnabled"], [data-carousel-field="showNavIcons"], [data-carousel-field="showIndicators"], [data-carousel-field="reverse"], [data-carousel-field="gradientEnabled"]')) {
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
        if (["faq", "table", "stories", "article", "carousel", "bento", "senko", "template"].includes(nextDashboardTab)) {
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
      if (button.closest("summary")) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (action.includes("story") || action.includes("article") || action.includes("carousel") || action.includes("bento") || action.includes("senko") || action.includes("lab") || action.includes("template") || action.includes("responsive") || action.includes("preset")) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (action === "save-user-preset") {
        if (saveUserPreset()) {
          showActionFeedback("Preset salvo neste navegador.", button);
        }
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
        if (saveTemplateHtmlCache()) {
          showActionFeedback("Conteudo da LP salvo neste navegador.", button);
        }
        return;
      }

      if (action === "save-responsive") {
        if (saveResponsiveDraft()) {
          showActionFeedback("Versao responsiva salva.", button);
        }
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
        "add-bento-block",
        "remove-bento-block",
        "reload-senko-library",
        "add-senko-layout",
        "clear-senko-blocks",
        "remove-senko-block",
        "move-senko-block-up",
        "move-senko-block-down",
        "duplicate-senko-block",
        "transfer-senko-to-lp",
        "add-lab-layout",
        "remove-lab-block",
        "move-lab-block-up",
        "move-lab-block-down",
        "duplicate-lab-block",
        "remove-bento-block-type",
        "reset-bento-html",
        "insert-template-layout",
        "clear-template-html",
        "save-template-html-cache"
      ];
      if (mutatingActions.includes(action)) {
        markResponsiveDirty();
      }

      if (action === "reset-bento-html") {
        if (typeof recordBentoUndo === "function") {
          recordBentoUndo();
        }
        state.bento.html = "";
        state.bento.useCustomHtml = false;
        if (typeof getDefaultBentoBlocks === "function") {
          state.bento.blocks = getDefaultBentoBlocks();
        }
        state.bento.header = {
          eyebrow: "Guia visual",
          title: "Tudo que importa em uma grade so.",
          lead: "Use a secao para destacar beneficios, usos, detalhes e provas rapidas de um produto sem virar um bloco pesado de leitura."
        };
        state.bento.status = "Modelo padrão restaurado.";
        renderEditor(true);
        return;
      }

      if (action === "add-bento-block") {
        addBentoBlock(button.dataset.bentoType, { shape: button.dataset.bentoShape });
        return;
      }

      if (action === "remove-bento-block-type") {
        removeBentoBlockType(button.dataset.bentoType);
        return;
      }

      if (action === "remove-bento-block") {
        removeBentoBlock(Number(button.dataset.bentoBlock));
        return;
      }

      if (action === "reload-senko-library") {
        if (typeof loadSenkoBridgeLibrary === "function") {
          loadSenkoBridgeLibrary(true);
        }
        return;
      }

      if (action === "set-senko-source") {
        state.senkoBridge.source = button.dataset.senkoSource === "lab" ? "lab" : "senko";
        renderEditor(true);
        return;
      }

      if (action === "preview-senko-layout") {
        if (typeof previewSenkoBridgeLayout === "function") {
          previewSenkoBridgeLayout(button.dataset.senkoLayout);
        }
        return;
      }

      if (action === "add-senko-layout") {
        if (typeof addSenkoBridgeLayout === "function") {
          addSenkoBridgeLayout(button.dataset.senkoLayout);
        }
        return;
      }

      if (action === "clear-senko-blocks") {
        if (typeof clearSenkoBridgeBlocks === "function") {
          clearSenkoBridgeBlocks();
        }
        return;
      }

      if (action === "move-senko-block-up") {
        if (typeof moveSenkoBridgeBlock === "function") {
          moveSenkoBridgeBlock(Number(button.dataset.senkoBlock), -1);
        }
        return;
      }

      if (action === "move-senko-block-down") {
        if (typeof moveSenkoBridgeBlock === "function") {
          moveSenkoBridgeBlock(Number(button.dataset.senkoBlock), 1);
        }
        return;
      }

      if (action === "duplicate-senko-block") {
        if (typeof duplicateSenkoBridgeBlock === "function") {
          duplicateSenkoBridgeBlock(Number(button.dataset.senkoBlock));
        }
        return;
      }

      if (action === "remove-senko-block") {
        if (typeof removeSenkoBridgeBlock === "function") {
          removeSenkoBridgeBlock(Number(button.dataset.senkoBlock));
        }
        return;
      }

      if (action === "transfer-senko-to-lp") {
        transferSenkoBridgeToLp();
        return;
      }

      if (action === "add-lab-layout") {
        addLabBridgeLayout(button.dataset.labLayout);
        return;
      }

      if (action === "move-lab-block-up") {
        moveLabBridgeBlock(Number(button.dataset.labBlock), -1);
        return;
      }

      if (action === "move-lab-block-down") {
        moveLabBridgeBlock(Number(button.dataset.labBlock), 1);
        return;
      }

      if (action === "duplicate-lab-block") {
        duplicateLabBridgeBlock(Number(button.dataset.labBlock));
        return;
      }

      if (action === "remove-lab-block") {
        removeLabBridgeBlock(Number(button.dataset.labBlock));
        return;
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

    editor.addEventListener("dragstart", (event) => {
      const senkoBuilderItem = event.target.closest("[data-senko-builder-block]");
      if (senkoBuilderItem && currentEditorTab === "senko") {
        if (event.target.closest("button, input, select, textarea")) {
          event.preventDefault();
          return;
        }

        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("application/layout-lab-senko-block", senkoBuilderItem.dataset.senkoBuilderBlock);
        senkoBuilderItem.classList.add("is-dragging");
        return;
      }

      const senkoCard = event.target.closest("[data-senko-layout-card]");
      if (senkoCard && currentEditorTab === "senko") {
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData("text/plain", senkoCard.dataset.senkoLayoutCard);
        event.dataTransfer.setData("application/layout-lab-senko-layout", senkoCard.dataset.senkoLayoutCard);
        senkoCard.classList.add("is-dragging");
        previewCanvas.classList.add("is-senko-drag-active");
        return;
      }

      const labCard = event.target.closest("[data-lab-layout-card]");
      if (labCard && currentEditorTab === "labbridge") {
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData("text/plain", labCard.dataset.labLayoutCard);
        event.dataTransfer.setData("application/layout-lab-lab-layout", labCard.dataset.labLayoutCard);
        labCard.classList.add("is-dragging");
        previewCanvas.classList.add("is-lab-drag-active");
      }
    });

    editor.addEventListener("dragend", (event) => {
      const senkoCard = event.target.closest("[data-senko-layout-card]");
      const senkoBuilderItem = event.target.closest("[data-senko-builder-block]");
      const labCard = event.target.closest("[data-lab-layout-card]");
      if (senkoCard) {
        senkoCard.classList.remove("is-dragging");
      }
      if (senkoBuilderItem) {
        senkoBuilderItem.classList.remove("is-dragging");
      }
      editor.querySelectorAll("[data-senko-builder-block]").forEach((item) => {
        item.classList.remove("is-drop-before", "is-drop-after");
      });
      if (labCard) {
        labCard.classList.remove("is-dragging");
      }
      previewCanvas.classList.remove("is-senko-drag-active");
      previewCanvas.classList.remove("is-senko-drop-target");
      previewCanvas.classList.remove("is-lab-drag-active");
      previewCanvas.classList.remove("is-lab-drop-target");
    });

    editor.addEventListener("dragover", (event) => {
      if (currentEditorTab !== "senko") {
        return;
      }

      const transferTypes = Array.from(event.dataTransfer.types || []);
      if (!transferTypes.includes("application/layout-lab-senko-block")) {
        return;
      }

      const stack = event.target.closest(".senko-builder__stack");
      if (!stack) {
        return;
      }

      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      const targetItem = event.target.closest("[data-senko-builder-block]");
      stack.querySelectorAll("[data-senko-builder-block]").forEach((item) => {
        item.classList.remove("is-drop-before", "is-drop-after");
      });

      if (targetItem) {
        const rect = targetItem.getBoundingClientRect();
        const after = event.clientY > rect.top + rect.height / 2;
        targetItem.classList.add(after ? "is-drop-after" : "is-drop-before");
      }
    });

    editor.addEventListener("drop", (event) => {
      if (currentEditorTab !== "senko") {
        return;
      }

      const fromIndex = Number(event.dataTransfer.getData("application/layout-lab-senko-block"));
      if (!Number.isInteger(fromIndex) || typeof reorderSenkoBridgeBlock !== "function") {
        return;
      }

      const stack = event.target.closest(".senko-builder__stack");
      if (!stack) {
        return;
      }

      event.preventDefault();
      const targetItem = event.target.closest("[data-senko-builder-block]");
      let toIndex = stack.querySelectorAll("[data-senko-builder-block]").length;
      if (targetItem) {
        const rect = targetItem.getBoundingClientRect();
        toIndex = Number(targetItem.dataset.senkoBuilderBlock);
        if (event.clientY > rect.top + rect.height / 2) {
          toIndex += 1;
        }
      }

      stack.querySelectorAll("[data-senko-builder-block]").forEach((item) => {
        item.classList.remove("is-drop-before", "is-drop-after");
      });
      reorderSenkoBridgeBlock(fromIndex, toIndex);
    });

    previewCanvas.addEventListener("dragover", (event) => {
      const transferTypes = Array.from(event.dataTransfer.types || []);
      const isSenkoDrop = currentEditorTab === "senko"
        && (transferTypes.includes("application/layout-lab-senko-layout") || transferTypes.includes("text/plain"));
      const isLabDrop = currentEditorTab === "labbridge"
        && (transferTypes.includes("application/layout-lab-lab-layout") || transferTypes.includes("text/plain"));
      if (!isSenkoDrop && !isLabDrop) {
        return;
      }

      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
      previewCanvas.classList.toggle("is-senko-drop-target", isSenkoDrop);
      previewCanvas.classList.toggle("is-lab-drop-target", isLabDrop);
    });

    previewCanvas.addEventListener("dragleave", (event) => {
      if (!previewCanvas.contains(event.relatedTarget)) {
        previewCanvas.classList.remove("is-senko-drop-target");
        previewCanvas.classList.remove("is-lab-drop-target");
      }
    });

    previewCanvas.addEventListener("drop", (event) => {
      if (currentEditorTab === "senko") {
        const layoutId = event.dataTransfer.getData("application/layout-lab-senko-layout") || event.dataTransfer.getData("text/plain");
        if (!layoutId || typeof addSenkoBridgeLayout !== "function") {
          return;
        }

        event.preventDefault();
        previewCanvas.classList.remove("is-senko-drag-active");
        previewCanvas.classList.remove("is-senko-drop-target");
        addSenkoBridgeLayout(layoutId);
        return;
      }

      if (currentEditorTab === "labbridge") {
        const layoutId = event.dataTransfer.getData("application/layout-lab-lab-layout") || event.dataTransfer.getData("text/plain");
        if (!layoutId || typeof addLabBridgeLayout !== "function") {
          return;
        }

        event.preventDefault();
        previewCanvas.classList.remove("is-lab-drag-active");
        previewCanvas.classList.remove("is-lab-drop-target");
        addLabBridgeLayout(layoutId);
      }
    });

    window.addEventListener("message", (event) => {
      if (event.source !== previewFrame.contentWindow) {
        return;
      }

      const data = event.data || {};
      const blockIndex = Number(data.index);
      if (!Number.isInteger(blockIndex)) {
        return;
      }

      if (data.type === "layout-lab:senko-remove-preview-block") {
        if (currentPage === "conteudo" && currentEditorTab === "senko" && typeof removeSenkoBridgeBlock === "function") {
          removeSenkoBridgeBlock(blockIndex);
        }
        return;
      }

      if (data.type === "layout-lab:lab-remove-preview-block") {
        if (currentPage === "conteudo" && currentEditorTab === "labbridge" && typeof removeLabBridgeBlock === "function") {
          removeLabBridgeBlock(blockIndex);
        }
      }
    });

    editorTabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const requestedTab = button.dataset.editorTab;
        const nextEditorTab = ["faq", "table", "stories", "article", "carousel", "bento", "senko", "template"].includes(requestedTab) ? requestedTab : "faq";
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
    [...htmlCopyButtons, ...cssCopyButtons, ...fullCopyButtons].forEach((button) => {
      button.addEventListener("click", () => {
        copyGeneratedHtml(button.dataset.copyMode, button);
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
        if (saveResponsivePreviewVersion()) {
          showActionFeedback("Versao responsiva salva.", button);
        }
      });
    });
    responsivePreviewRemoveButtons.forEach((button) => {
      button.addEventListener("click", () => {
        removeResponsivePreviewVersion();
      });
    });
    senkoTransferPreviewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        transferSenkoBridgeToLp();
      });
    });

    window.addEventListener("keydown", (event) => {
      const isBentoUndo = (event.ctrlKey || event.metaKey)
        && !event.shiftKey
        && event.key.toLowerCase() === "z"
        && currentPage === "conteudo"
        && currentEditorTab === "bento";
      const target = event.target;
      const isNativeTextEdit = target instanceof Element
        && Boolean(target.closest("input, textarea, select, [contenteditable='true']"));

      if (isBentoUndo && !isNativeTextEdit && typeof undoBentoChange === "function" && undoBentoChange()) {
        event.preventDefault();
        return;
      }

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
    document.body.classList.remove("app-loading");
    loadTabAssets().finally(() => {
      renderEditor(true);
    });
