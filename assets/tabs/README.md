# Tabs do Layout Lab

Cada pasta abaixo concentra os arquivos de uma aba do app:

- `dashboard/`
- `faq/`
- `tabela/`
- `stories/`
- `artigo/`
- `carrossel/`
- `lp-container/`

Dentro de cada pasta existem tres arquivos principais:

- `<aba>.html`: estrutura do layout.
- `<aba>.css`: estilo do layout/output.
- `<aba>.js`: modulo oficial da aba, carregado pela pagina antes do core.

O core central fica em `assets/js/layout-lab.js` e cuida da orquestracao geral. A logica especifica de cada layout deve ficar dentro da pasta da propria aba.

Para refazer a separacao a partir de uma versao monolitica limpa, use `tools/split-layout-lab.cjs`.
