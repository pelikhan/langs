const path = require('path')
const libPath = path.join(__dirname, 'parser.so')
module.exports = {
  libraryPath: libPath,
  extensions: ['toml'],
  languageSymbol: 'tree_sitter_toml',
  expandoChar: '_',
}
