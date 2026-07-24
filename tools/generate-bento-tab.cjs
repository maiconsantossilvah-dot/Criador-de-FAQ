const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "bento-grid-section.html");
const targetDir = path.join(root, "assets", "tabs", "bento");

const source = fs.readFileSync(sourcePath, "utf8");
const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/i);
const sectionMatch = source.match(/(<section class="ll-bento"[\s\S]*<\/section>)\s*$/i);

if (!styleMatch || !sectionMatch) {
  throw new Error("Nao encontrei <style> ou <section class=\"ll-bento\"> em bento-grid-section.html.");
}

let css = styleMatch[1].trim();
css = css
  .replace(/:root\s*\{([\s\S]*?)\}/, ".ll-bento {$1}")
  .replace(/\n\s*\*\s*\{[\s\S]*?\n\s*\}\s*/g, "\n\n")
  .replace(/\n\s*body\s*\{[\s\S]*?\n\s*\}\s*/g, "\n\n")
  .replace(/\n\s*\.demo-shell\s*\{[\s\S]*?\n\s*\}\s*/g, "\n\n");

css = css.replace(
  /(\.ll-bento\s*\{[\s\S]*?\n\s*\})/,
  `$1

    .ll-bento,
    .ll-bento * {
      box-sizing: border-box;
    }`
);

const html = sectionMatch[1].trim();
const styleWrapped = `<style>\n${css}\n</style>`;

const js = `/**
 * Modulo oficial da aba Bento.
 * Carregado antes de assets/js/layout-lab.js.
 * O HTML/CSS base vem de bento-grid-section.html.
 */

    const defaultBentoHtml = ${JSON.stringify(html)};
    const bentoStyle = ${JSON.stringify(styleWrapped)};

    function getDefaultBentoHtml() {
      return defaultBentoHtml.trim();
    }

    function buildBentoStyle() {
      return bentoStyle;
    }

    function buildBentoSectionHtml() {
      const customHtml = state.bento && typeof state.bento.html === "string" ? state.bento.html.trim() : "";
      return customHtml || getDefaultBentoHtml();
    }

    function renderBentoEditor() {
      const currentHtml = state.bento && state.bento.html ? state.bento.html : getDefaultBentoHtml();
      const status = state.bento && state.bento.status ? \`<span class="bulk-status" aria-live="polite">\${escapeHtml(state.bento.status)}</span>\` : "";

      return \`
        <section class="article-editor bento-editor" aria-label="Editor Bento grid">
          <div class="editor-section-title">
            <div>
              <h3>Bento grid</h3>
              <p>Prepare uma grade visual com cards, imagem principal, imagem circular e blocos curtos.</p>
            </div>
          </div>

          <details class="stories-guide article-image-guide" open>
            <summary class="stories-guide__summary">
              <strong>Guia rapido do Bento</strong>
              <span aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="stories-guide__body">
              <p><strong>Uso:</strong> ideal para destacar beneficios, usos, detalhes e provas rapidas sem virar um bloco longo.</p>
              <p><strong>Imagem hero:</strong> use imagem horizontal forte, preferencialmente entre 1200x800 e 1600x1000.</p>
              <p><strong>Imagem circular:</strong> use um recorte simples e centralizado; o layout corta em formato circular.</p>
              <p><strong>Tablet e mobile:</strong> o layout usa duas colunas compactas dentro da LP para evitar cards gigantes e muitas dobras.</p>
              <p><strong>Proximo passo:</strong> esta aba ja nasce com HTML editavel. Depois podemos transformar cada card em campos proprios.</p>
            </div>
          </details>

          <details class="article-tab-editor article-base-editor bento-code-panel" open>
            <summary class="article-tab-editor__summary">
              <strong>HTML do Bento</strong>
              <span class="article-tab-editor__meta">Base editavel</span>
              <span class="article-tab-editor__chevron" aria-hidden="true">&rsaquo;</span>
            </summary>
            <div class="article-editor__body">
              <label class="field">
                <span>HTML da secao</span>
                <textarea class="bulk-input bento-editor__textarea" data-bento-field="html" spellcheck="false">\${escapeHtml(currentHtml)}</textarea>
              </label>
              <div class="bento-editor__actions">
                <button class="button button--soft" type="button" data-action="reset-bento-html">Restaurar modelo padrao</button>
                \${status}
              </div>
            </div>
          </details>
        </section>
      \`;
    }
`;

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(path.join(targetDir, "bento.css"), css + "\n", "utf8");
fs.writeFileSync(path.join(targetDir, "bento.html"), html + "\n", "utf8");
fs.writeFileSync(path.join(targetDir, "bento.js"), js, "utf8");
fs.writeFileSync(
  path.join(targetDir, "README.md"),
  "# Aba Bento\n\nArquivos oficiais da aba Bento grid.\n\n- `bento.html`: HTML base do layout.\n- `bento.css`: CSS de saida do layout, sem estilos globais de demo como `body` e `.demo-shell`.\n- `bento.js`: modulo carregado pela pagina de Qualidade Conteudo e usado pelo core do Layout Lab.\n\nFonte visual inicial: `bento-grid-section.html` na raiz do projeto.\n",
  "utf8"
);
