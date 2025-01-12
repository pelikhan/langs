const { postinstall } = require('@ast-grep/setup-lang')
postinstall({
  directory: __dirname,
  treeSitterPackage: '@tree-sitter-grammars/tree-sitter-toml',
})
