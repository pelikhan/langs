const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: $$EXTENSIONS$$,
  languageSymbol: 'tree_sitter_$$NAME$$',
  expandoChar: '$$EXPANDO_CHAR$$',
}
