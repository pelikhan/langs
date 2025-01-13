const { setup } = require('@ast-grep/nursery')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: '$$NAME$$',
  treeSitterPackage: '$$TREE_SITTER_PACKAGE$$',
  languageRegistration,
  testRunner: (parse) => {
    // add test here
  }
})
