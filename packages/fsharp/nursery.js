const { setup } = require('@ast-grep/nursery')
const fsharp = require('./index')
const assert = require('node:assert')

setup({
  dirname: __dirname,
  name: 'fsharp',
  treeSitterPackage: 'tree-sitter-fsharp',
  languageRegistration: fsharp,
  testRunner: (parse) => {
    const sg = parse('let x = 42')
    const root = sg.root()
    // Check that we can parse F# code correctly
    assert.equal(root.kind(), 'file')
    
    // Get the first child which should be the value declaration
    const children = root.children()
    assert.equal(children.length, 1)
    assert.equal(children[0].kind(), 'value_declaration')
  }
})