const { postinstall } = require('@ast-grep/setup-lang')
postinstall({
  dirname: __dirname,
  treeSitterPackage: '@tree-sitter-grammars/tree-sitter-toml',
})
