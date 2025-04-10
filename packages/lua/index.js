const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  treeSitterPackage: '@tree-sitter-grammars/tree-sitter-lua',
  extensions: ['lua'],
  languageSymbol: 'tree_sitter_lua',
  expandoChar: '$',
}
