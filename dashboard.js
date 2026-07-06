/**
 * Modulo oficial da aba Dashboard / guias.
 * Carregado antes de assets/js/layout-lab.js.
 * Este arquivo contem a logica que antes ficava direto no motor central.
 */

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
        },
        {
          tab: "bento",
          icon: "BEN",
          title: "Bento",
          summary: "Grade visual de cards",
          badge: "&#9881;",
          meta: state.bento && state.bento.html.trim() ? "HTML editado" : "Modelo padrão"
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
        title: "Modo LP container",
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

      return `<section class="dashboard-home" aria-label="Hub do Layout Lab">
        <div class="dashboard-home__hero">
          <p class="dashboard-home__eyebrow">Layout Lab</p>
          <h3>Central de criação de conteúdo.</h3>
          <p>Use o painel da direita para abrir layouts. Aqui ficam os guias de apoio para consultar quando precisar de direção visual, textual ou estratégica.</p>
        </div>
        <p class="dashboard-home__section-title">
          <strong>Guias de apoio</strong>
          <span>Consulta rápida para montar layouts com mais intenção.</span>
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
        const badge = section.badge ? `<small class="ll-dashboard__badge" title="Em producao" aria-label="Em producao">${section.badge}</small>` : "";
        return `<button class="ll-dashboard__card" type="button" data-dashboard-preview-tab="${section.tab}" aria-label="Abrir ${escapeHtml(section.title)}">
          <span>${escapeHtml(section.icon)}</span>
          ${badge}
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
    <h1>Central do Layout Lab</h1>
    <small>Abra um layout, edite o conteúdo e copie o bloco no formato certo. Os guias ficam na coluna lateral para consulta.</small>
  </div>
  <p class="ll-dashboard__section-label">Layouts disponíveis</p>
  <div class="ll-dashboard__grid">
${cards}
  </div>
  <p class="ll-dashboard__section-label ll-dashboard__section-label--lp">LP e integração</p>
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
    position: relative;
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

  .ll-dashboard__badge {
    position: absolute;
    top: 18px;
    right: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    min-height: 38px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    color: #101010;
    background: #ffeb00;
    box-shadow: 0 8px 18px rgba(255, 235, 0, 0.2);
    font-size: 19px;
    font-weight: 900;
    line-height: 1;
  }

  .ll-dashboard__card em {
    color: ${colors.muted};
    font-size: 13px;
    font-style: normal;
    line-height: 1.35;
  }

  .ll-dashboard__card small:not(.ll-dashboard__badge) {
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
