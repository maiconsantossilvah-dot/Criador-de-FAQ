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

    function getSenkoBridgeDashboardSection() {
      const blockCount = state.senkoBridge && state.senkoBridge.blocks ? state.senkoBridge.blocks.length : 0;
      return {
        tab: "senko",
        icon: "SK",
        title: "SenkoBridge",
        summary: "Monte blocos do SenkoLib ou do Layout Lab e transfira a montagem para o modo LP.",
        meta: blockCount ? `${blockCount} bloco${blockCount === 1 ? "" : "s"} montado${blockCount === 1 ? "" : "s"}` : "Biblioteca de layouts"
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