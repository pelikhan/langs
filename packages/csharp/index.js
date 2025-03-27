const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ["cs"],
  languageSymbol: 'tree_sitter_CSharp',
  expandoChar: 'µ',
}
