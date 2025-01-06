const { cp } = require('fs').promises

const path = require('path')
const src = path.join(__dirname, 'node_modules', '@tree-sitter-grammars/tree-sitter-toml',  'src')

async function build() {
  await cp(src, 'src', { recursive: true })
}

build()
