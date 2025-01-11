const { setup } = require('@ast-grep/nursery')
const toml = require('./index')

setup({
  name: 'toml',
  packageName: '@tree-sitter-grammars/tree-sitter-toml',
  testConfig: {
    languageRegistration: toml,
    code: `
    $NAME = "toml"
    `
  }
})
