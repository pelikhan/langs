const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: [".cpp",".cc",".cxx"],
  languageSymbol: 'tree_sitter_cpp',
  expandoChar: '_',
}
