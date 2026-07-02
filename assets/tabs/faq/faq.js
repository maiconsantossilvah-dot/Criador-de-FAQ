/**
 * Modulo oficial da aba FAQ.
 * Carregado antes de assets/js/layout-lab.js.
 * Este arquivo contem a logica que antes ficava direto no motor central.
 */

    const faqStyle = `<style>
    #faq-section {
        width: 100%;
        padding: 0 16px;
        box-sizing: border-box;
        margin: 0 auto 24px;
        font-family: sans-serif;
    }

    #faq-section__header {
        color: #f1f1f1;
        margin: 0 0 12px;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.15px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "Noto Sans", "Liberation Sans", Arial, sans-serif;
        font-weight: 400;
        text-decoration: none;
    }

    #faq-section__title {
        text-align: center;
        align-items: flex-start;
        background: rgb(0, 157, 255);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        display: flex;
        flex-direction: row;
        height: 40px;
        margin: 0 0 8px;
        padding: 8px;
        width: 100%;
        box-sizing: border-box;
    }

    #faq-section__list {
        list-style: none;
        margin: 0 auto;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    #faq-section__item {
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 12px;
        overflow: hidden;
    }

    #faq-section__summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 16px;
        cursor: pointer;
        list-style: none;
        transition: background 0.15s ease;
    }

    #faq-section__summary::-webkit-details-marker {
        display: none;
    }

    #faq-section__summary:hover {
        background: #f9f9f9;
    }

    #faq-section__summary:focus-visible {
        outline: 2px solid #ea5b0c;
        outline-offset: -2px;
        border-radius: 12px;
    }

    #faq-section__q-text {
        font-size: clamp(0.875rem, 1.2vw, 1rem);
        font-weight: bold;
        color: #333;
        flex: 1;
        margin: 0;
        transition: color 0.15s ease;
        overflow-wrap: anywhere;
    }

    #faq-section__icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        position: relative;
    }

    #faq-section__icon::before,
    #faq-section__icon::after {
        content: '';
        position: absolute;
        background: rgb(46, 53, 56);
        border-radius: 2px;
        transition: transform 0.25s ease, opacity 0.25s ease;
    }

    #faq-section__icon::before {
        width: 12px;
        height: 1.5px;
        top: 9px;
        left: 4px;
    }

    #faq-section__icon::after {
        width: 1.5px;
        height: 12px;
        top: 4px;
        left: 9px;
    }

    #faq-section__details[open] #faq-section__icon::after {
        transform: rotate(90deg);
        opacity: 0;
    }

    #faq-section__a-inner {
        padding: 16px;
        border-top: 1px solid #e5e5e5;
    }

    #faq-section__a-text {
        font-size: clamp(0.75rem, 1vw, 0.875rem);
        color: rgb(46, 53, 56);
        line-height: 1.6;
        margin: 0;
        overflow-wrap: anywhere;
    }
</style>`;

    function buildFaqStyle() {
      return getTabStyleAsset("faq", faqStyle);
    }

    function formatAnswer(value) {
      return escapeHtml(value.trim()).replace(/\r?\n/g, "<br>");
    }

    function renderFaqItem(item, index) {
      const question = escapeHtml(item.question.trim());
      const answer = formatAnswer(item.answer);

      return `        <!-- Cole aqui as perguntas e respostas -->
        <li id="faq-section__item">
<details id="faq-section__details">
<summary id="faq-section__summary">
<h3 id="faq-section__q-text"${previewTextStyleAttr({ scope: "faq", index, field: "question" })}> ${question} </h3>
<span id="faq-section__icon" aria-hidden="true"></span>
</summary>
<div id="faq-section__a-inner">
<p id="faq-section__a-text"${previewTextStyleAttr({ scope: "faq", index, field: "answer" })}> ${answer} </p>
</div>
</details>
</li>
        <!-------------------------->`;
    }

    function buildFaqSectionHtml() {
      const items = state.items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.question.trim() || item.answer.trim())
        .map(({ item, index }) => renderFaqItem(item, index))
        .join("\n\n");

      const template = getTabHtmlAsset("faq", "");
      if (template && typeof DOMParser !== "undefined") {
        const doc = new DOMParser().parseFromString(template, "text/html");
        const section = doc.querySelector("#faq-section");
        const list = section ? section.querySelector("#faq-section__list") : null;
        const title = section ? section.querySelector("#faq-section__title, #faq-section-title") : null;

        if (section && list) {
          section.setAttribute("aria-labelledby", "faq-section__title");
          if (title) {
            title.id = "faq-section__title";
            title.textContent = "Dúvidas Frequentes";
          }
          list.innerHTML = items;
          return section.outerHTML;
        }
      }

      return `<section id="faq-section" aria-labelledby="faq-section__title">
<div id="faq-section__header">
<h2 id="faq-section__title">Dúvidas Frequentes</h2>
</div>
<ul id="faq-section__list" role="list">
${items}
</ul>
</section>`;
    }

    function renderFaqEditorItems() {
      return state.items.map((item, index) => `
        <details class="faq-editor__item" data-index="${index}" open>
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

    window.renderFaqEditorItems = renderFaqEditorItems;

    function parseBulkFaq(value) {
      const normalized = value.replace(/\r\n?/g, "\n");
      const items = [];
      const pattern = /<Q>([\s\S]*?)<\/Q>[\s\S]*?<A>([\s\S]*?)<\/A>/gi;
      let match;

      while ((match = pattern.exec(normalized)) !== null) {
        const question = match[1].replace(/\s+/g, " ").trim();
        const answer = match[2].trim();

        if (question || answer) {
          items.push({ question, answer });
        }
      }

      return items;
    }

    function fillFromBulk() {
      const parsedItems = parseBulkFaq(state.faqBulkInput);

      if (!parsedItems.length) {
        state.faqBulkStatus = "Não encontrei perguntas no formato <Q>Pergunta</Q> <A>Resposta</A>";
        renderEditor();
        return;
      }

      state.items = parsedItems;
      state.faqBulkStatus = `${parsedItems.length} pergunta${parsedItems.length === 1 ? "" : "s"} preenchida${parsedItems.length === 1 ? "" : "s"}.`;
      renderEditor();
    }

    function addItem() {
      state.items.push({ question: "", answer: "" });
      renderEditor();
      const lastItem = editor.querySelector(`.faq-editor__item[data-index="${state.items.length - 1}"] input`);
      if (lastItem) {
        lastItem.focus();
      }
    }
