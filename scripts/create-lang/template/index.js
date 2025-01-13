const path = require('node:path')
const libPath = path.join(__dirname, 'parser.so')

module.exports = {
  libraryPath: libPath,
  extensions: $$EXTENSIONS$$,
  languageSymbol: $$LANGUAGE_SYMBOL$$,
  expandoChar: '_',
}
