const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: ['fs', 'fsi', 'fsx', 'fsscript'],
  languageSymbol: 'tree_sitter_fsharp',
  expandoChar: '$',
}