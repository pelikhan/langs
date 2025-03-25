const { setup } = require('@ast-grep/nursery')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'C++',
  treeSitterPackage: 'tree-sitter-cpp',
  languageRegistration,
  testRunner: (parse) => {
    // add test here
  }
})
