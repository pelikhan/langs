const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ['md'],
  languageSymbol: 'tree_sitter_markdown',
  expandoChar: '$',
}
