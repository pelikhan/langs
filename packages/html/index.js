const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ['html', 'htm', 'xhtml'],
  languageSymbol: 'tree_sitter_html',
  expandoChar: 'z',
}
