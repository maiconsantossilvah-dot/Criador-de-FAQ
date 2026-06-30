# Tabs do Layout Lab

Cada pasta abaixo concentra os arquivos de uma aba do app:

- `dashboard/`
- `faq/`
- `tabela/`
- `stories/`
- `artigo/`
- `carrossel/`
- `bento/`
- `lp-container/`

Dentro de cada pasta existem tres arquivos principais:

- `<aba>.html`: estrutura base do layout. O app tenta carregar esse arquivo no inicio; hoje ele ja e molde real para `faq/`, `tabela/` e `bento/`.
- `<aba>.css`: estilo do layout/output. O app tenta carregar esse arquivo no inicio e usa fallback interno se o navegador bloquear leitura local.
- `<aba>.js`: modulo oficial da aba, carregado pela pagina antes do core.

O core central fica em `assets/js/layout-lab.js` e cuida da orquestracao geral. A logica especifica de cada layout deve ficar dentro da pasta da propria aba.

Observacao: em `stories/`, `artigo/` e `carrossel/`, o HTML final ainda e montado pelo JS porque depende de estado, repeticoes, slides, abas e variacoes responsivas. Nesses casos, o CSS da pasta ja e fonte real; o HTML serve como referencia estrutural ate a aba ganhar templates por componente.

Para refazer a separacao a partir de uma versao monolitica limpa, use `tools/split-layout-lab.cjs`.
