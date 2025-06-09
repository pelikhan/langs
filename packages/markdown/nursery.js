const { setup } = require('@ast-grep/nursery')
const assert = require('node:assert')
const languageRegistration = require('./index')
const path = require('node:path')

setup({
  dirname: __dirname,
  name: 'markdown',
  treeSitterPackage: '@tree-sitter-grammars/tree-sitter-markdown',
  src: path.join('tree-sitter-markdown', 'src'),
  languageRegistration,
  testRunner: parse => {
    const sg = parse('# 123')
    const root = sg.root()
    const node = root.find('# $A')
    assert.equal(node.kind(), 'atx_heading')
  },
})
