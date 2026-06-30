/**
 * Modulo oficial da aba Tabela.
 * Carregado antes de assets/js/layout-lab.js.
 * Este arquivo contem a logica que antes ficava direto no motor central.
 */

    const tableStyle = `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .table-container-custom {
    background-color: #fff;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    margin: 0 auto 24px;
    display: block;
    overflow-x: auto;
  }

  .table-design-custom {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
  }

  .table-head-custom {
    color: rgb(255, 255, 255);
    border-radius: 10px;
  }

  .table-text-custom {
    padding: 8px 16px;
    text-align: left;
    border-bottom: 1px solid #979797;
    font-family: sans-serif;
    font-size: clamp(0.75rem, 1vw, 0.875rem);
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  .table-tr-custom:hover {
    background-color: #f1f1f1;
    filter: brightness(0.9);
  }

  .table-th-custom {
    background: var(--table-header-color, #ea5b0c);
    color: #fff;
    font-weight: bold;
    text-align: left;
  }

  .table-th-custom--first {
    border-radius: 10px 0 0 0;
  }

  .table-th-custom--last {
    border-radius: 0 10px 0 0;
  }

  .table-th-custom--single {
    border-radius: 10px 10px 0 0;
  }

  .table-td-custom {
    color: #555;
  }

  .table-tr-custom:nth-child(even) {
    background-color: #f1f1f1;
  }
__TABLE_HEADER_COLORS__
</style>`;

    function buildTableStyle() {
      const columnRules = getTableColumns().map((column, index) => {
        return `
  .table-th-custom--col-${index + 1} {
    --table-header-color: ${getTableHeaderColor(index)};
  }`;
      }).join("");

      return injectTabDynamicStyle(
        getTabStyleAsset("table", tableStyle),
        "__TABLE_HEADER_COLORS__",
        columnRules
      );
    }

    function getTableHeaderColor(index = 0) {
      return normalizeCssColorValue(state.table.headerColors[index] || state.table.headerColor);
    }

    function normalizeTableHeaderColors() {
      const columns = getTableColumns();
      state.table.headerColors = columns.map((column, index) => {
        return normalizeCssColorValue(state.table.headerColors[index] || state.table.headerColor);
      });
    }

    function getTableColumns() {
      return state.table.columns.length ? state.table.columns : ["SKU", "TÍTULO"];
    }

    function getVisibleTableRows() {
      return state.table.rows.filter((row) => row.some((cell) => cell.trim()));
    }

    function hasTableData() {
      return getVisibleTableRows().length > 0;
    }

    function getHeaderRadius(index, total) {
      if (total === 1) {
        return "10px 10px 0 0";
      }

      if (index === 0) {
        return "10px 0 0 0";
      }

      if (index === total - 1) {
        return "0 10px 0 0";
      }

      return "";
    }

    function renderTableHeaderCell(label, index, total) {
      const radiusClass = total === 1
        ? " table-th-custom--single"
        : index === 0
          ? " table-th-custom--first"
          : index === total - 1
            ? " table-th-custom--last"
            : "";
      const headerText = escapeHtml(label.trim() || `COLUNA ${index + 1}`);

      return `                 <th class="table-text-custom table-th-custom table-th-custom--col-${index + 1}${radiusClass}" scope="col">${headerText}
                 </th>`;
    }

    function renderTableRow(row, rowIndex) {
      const columns = getTableColumns();
      const cells = columns.map((column, index) => {
        const cellClass = index === 0 ? "table-td-custom-title" : "table-td-custom-sub";
        return `                 <td class="table-text-custom ${cellClass}">${escapeHtml((row[index] || "").trim())}</td>`;
      }).join("\n");

      return `               <tr class="table-tr-custom">
${cells}
               </tr>`;
    }

    function buildTableFromTemplate(caption, headers, rows) {
      const template = getTabHtmlAsset("table", "");
      if (!template || typeof DOMParser === "undefined") {
        return "";
      }

      const doc = new DOMParser().parseFromString(template, "text/html");
      const section = doc.querySelector(".table-container-custom");
      const table = section ? section.querySelector(".table-design-custom") : null;
      const captionNode = table ? table.querySelector("#table-desc, caption") : null;
      const headerRow = table ? table.querySelector("thead tr") : null;
      const tbody = table ? table.querySelector("tbody") : null;

      if (!section || !table || !captionNode || !headerRow || !tbody) {
        return "";
      }

      section.setAttribute("aria-label", "tabela contendo produtos relacionados e citados dentro deste conteúdo");
      table.setAttribute("aria-describedby", "table-desc");
      captionNode.id = "table-desc";
      captionNode.innerHTML = caption;
      headerRow.innerHTML = headers;
      tbody.innerHTML = rows;

      return section.outerHTML;
    }

    function buildTableSectionHtml(forcePreview = false) {
      if (!forcePreview && !hasTableData()) {
        return "";
      }

      const columns = getTableColumns();
      const caption = escapeHtml(state.table.caption.trim() || "produtos relacionados");
      const headers = columns.map(renderTableHeaderCell).join("\n");
      const visibleRows = getVisibleTableRows();
      const previewRows = visibleRows.length ? visibleRows : [createEmptyTableRow()];
      const rows = (forcePreview ? previewRows : visibleRows).map(renderTableRow).join("\n");
      const templateHtml = buildTableFromTemplate(caption, headers, rows);

      if (templateHtml) {
        return templateHtml;
      }

      return `<section class="table-container-custom" aria-label="tabela contendo produtos relacionados e citados dentro deste conteúdo">
          <table class="table-design-custom" aria-describedby="table-desc">
            <caption id="table-desc" class="sr-only">
          ${caption}
          </caption>
            <thead class="table-head-custom">
               <tr class="table-tr-custom">
${headers}
               </tr>
             </thead>
             <tbody>
${rows}
             </tbody>
           </table>
         </section>`;
    }

    function renderTableEditor() {
      if (currentPage !== "conteudo") {
        return "";
      }

      normalizeTableHeaderColors();
      const columns = getTableColumns();
      const columnFields = columns.map((column, index) => `
              <div class="table-editor__column">
                ${renderColorControl({ value: getTableHeaderColor(index), label: `Cor do cabeçalho da coluna ${index + 1}`, scope: "table", field: "columnHeaderColor", columnIndex: index, allowGradient: true, className: "table-header-color" })}
                <label class="field">
                  <span>Coluna ${index + 1}</span>
                  <input type="text" value="${escapeHtml(column)}" data-table-field="column" data-column-index="${index}" autocomplete="off">
                </label>
              </div>
            `).join("");

      const rows = state.table.rows.map((row, rowIndex) => `
        <article class="table-row-editor" data-table-row="${rowIndex}">
          <div class="faq-editor__bar">
            <strong>Linha ${rowIndex + 1}</strong>
            <button class="button button--danger icon-button" type="button" data-action="remove-table-row" aria-label="Remover linha ${rowIndex + 1}" title="Remover linha">${trashIcon()}</button>
          </div>
          <div class="table-row-editor__cells">
            ${columns.map((column, cellIndex) => `
              <label class="field">
                <span>${escapeHtml(column.trim() || `Coluna ${cellIndex + 1}`)}</span>
                <input type="text" value="${escapeHtml(row[cellIndex] || "")}" data-table-field="cell" data-row-index="${rowIndex}" data-cell-index="${cellIndex}" autocomplete="off">
              </label>
            `).join("")}
          </div>
        </article>
      `).join("");

      return `
        <section class="table-editor" aria-label="Editor da tabela">
          <div class="editor-section-title">
            <div class="table-editor__title">
              <div>
                <h3>Tabela</h3>
                <p>Cole da planilha ou edite as células abaixo.</p>
              </div>
            </div>
          </div>

          <article class="table-editor__box table-settings">
            <div class="table-settings__head">
              <strong>Configurações</strong>
              <div class="table-settings__controls">
                <button class="button button--soft icon-button" type="button" data-action="add-table-column" aria-label="Adicionar coluna" title="Adicionar coluna">+</button>
              </div>
            </div>
            <div class="table-settings__body">
              <label class="field">
                <span>Caption de Acessibilidade</span>
                <input type="text" value="${escapeHtml(state.table.caption)}" data-table-field="caption" autocomplete="off" placeholder="tamanhos de chinelos disponíveis">
              </label>
              <div class="table-editor__columns">
${columnFields}
              </div>
            </div>
          </article>

          <article class="table-editor__box table-editor__box--sheet">
            <div class="table-editor__box-body">
              <label class="field sheet-field">
                <span>Colar conteúdo de planilha ou .txt</span>
                <textarea class="bulk-input sheet-paste" data-table-field="bulk" spellcheck="false" placeholder="SKU&#9;TÍTULO&#10;1225007&#9;HAVAIANAS TOP.BASIC BRANCO/BRANCO/VERDE 37/8&#10;1225008&#9;HAVAIANAS KIDS ATHLETIC VERDE PATRIA 25/6">${escapeHtml(state.table.bulkInput)}</textarea>
              </label>
              <div class="bulk-actions">
                <button class="button button--soft" type="button" data-action="fill-table-bulk">Preencher tabela</button>
                <span class="bulk-status" aria-live="polite">${escapeHtml(state.table.status)}</span>
              </div>
            </div>
          </article>

${rows}
        </section>
      `;
    }

    function createEmptyTableRow() {
      return getTableColumns().map(() => "");
    }

    function normalizeTableRows() {
      const columns = getTableColumns();
      state.table.rows = state.table.rows.map((row) => columns.map((column, index) => row[index] || ""));

      if (!state.table.rows.length) {
        state.table.rows.push(createEmptyTableRow());
      }
    }

    function parseBulkTableHtml(value) {
      const html = value.includes("<table") ? value : `<table>${value}</table>`;
      const documentValue = new DOMParser().parseFromString(html, "text/html");
      const headerCells = Array.from(documentValue.querySelectorAll("thead th"));
      const columns = headerCells.map((cell) => cell.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
      let rowElements = Array.from(documentValue.querySelectorAll("tbody tr"));

      if (!rowElements.length) {
        rowElements = Array.from(documentValue.querySelectorAll("tr")).filter((row) => row.querySelector("td"));
      }

      const rows = rowElements
        .map((row) => Array.from(row.querySelectorAll("td")).map((cell) => cell.textContent.replace(/\s+/g, " ").trim()))
        .filter((row) => row.some(Boolean));

      return { columns, rows };
    }

    function parseBulkTableText(value) {
      const lines = value
        .replace(/\r\n?/g, "\n")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const rows = lines.map((line) => {
        if (line.includes("\t")) {
          return line.split("\t").map((cell) => cell.trim());
        }

        if (line.includes(";")) {
          return line.split(";").map((cell) => cell.trim());
        }

        const skuAndTitle = line.match(/^(\S+)\s+(.+)$/);
        return skuAndTitle ? [skuAndTitle[1], skuAndTitle[2]] : [line];
      }).filter((row) => row.some(Boolean));

      const firstRow = rows[0] || [];
      const firstRowLooksLikeHeader = rows.length > 1 && firstRow.some((cell) => /sku|t[ií]tulo|produto|descri[cç][aã]o/i.test(cell));

      return {
        columns: firstRowLooksLikeHeader ? firstRow : [],
        rows: firstRowLooksLikeHeader ? rows.slice(1) : rows
      };
    }

    function parseBulkTableHtml(value) {
      const html = value.includes("<table") ? value : `<table>${value}</table>`;
      const documentValue = new DOMParser().parseFromString(html, "text/html");
      const headerCells = Array.from(documentValue.querySelectorAll("thead th"));
      const columns = headerCells.map((cell) => cell.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
      let rowElements = Array.from(documentValue.querySelectorAll("tbody tr"));

      if (!rowElements.length) {
        rowElements = Array.from(documentValue.querySelectorAll("tr")).filter((row) => row.querySelector("td"));
      }

      const rows = rowElements
        .map((row) => Array.from(row.querySelectorAll("td")).map((cell) => cell.textContent.replace(/\s+/g, " ").trim()))
        .filter((row) => row.some(Boolean));

      return { columns, rows };
    }

    function fillTableFromBulk() {
      const parsedTable = parseBulkTable(state.table.bulkInput);

      if (!parsedTable.rows.length) {
        state.table.status = "Não encontrei linhas para preencher.";
        renderEditor();
        return;
      }

      const maxColumns = Math.max(
        parsedTable.columns.length,
        state.table.columns.length,
        ...parsedTable.rows.map((row) => row.length)
      );

      state.table.columns = Array.from({ length: maxColumns }, (item, index) => {
        return parsedTable.columns[index] || state.table.columns[index] || `COLUNA ${index + 1}`;
      });
      state.table.headerColors = Array.from({ length: maxColumns }, (item, index) => {
        return normalizeCssColorValue(state.table.headerColors[index] || state.table.headerColor);
      });

      state.table.rows = parsedTable.rows.map((row) => {
        return Array.from({ length: maxColumns }, (item, index) => row[index] || "");
      });

      state.table.status = `${state.table.rows.length} linha${state.table.rows.length === 1 ? "" : "s"} preenchida${state.table.rows.length === 1 ? "" : "s"}.`;
      renderEditor();
    }

    function addTableColumn() {
      state.table.columns.push("");
      state.table.headerColors.push(normalizeCssColorValue(state.table.headerColor));
      state.table.rows.forEach((row) => row.push(""));
      state.table.status = "";
      renderEditor();
    }

    function removeTableColumn(index) {
      if (state.table.columns.length <= 1) {
        return;
      }

      state.table.columns.splice(index, 1);
      state.table.headerColors.splice(index, 1);
      state.table.rows.forEach((row) => row.splice(index, 1));
      state.table.status = "";
      normalizeTableRows();
      normalizeTableHeaderColors();
      renderEditor();
    }

    function addTableRow() {
      state.table.rows.push(createEmptyTableRow());
      state.table.status = "";
      renderEditor();
      const lastRowInput = editor.querySelector(`[data-table-row="${state.table.rows.length - 1}"] input`);
      if (lastRowInput) {
        lastRowInput.focus();
      }
    }

    function removeTableRow(index) {
      state.table.rows.splice(index, 1);
      state.table.status = "";
      normalizeTableRows();
      renderEditor();
    }
