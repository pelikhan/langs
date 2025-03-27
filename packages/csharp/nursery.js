const { setup } = require('@ast-grep/nursery')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'csharp',
  treeSitterPackage: 'tree-sitter-c-sharp',
  languageRegistration,
  testRunner: (parse) => {
    // add test here
  }
})
