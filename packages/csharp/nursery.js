const { setup } = require('@ast-grep/nursery')
const languageRegistration = require('./index')

setup({
  dirname: __dirname,
  name: 'CSharp',
  treeSitterPackage: 'tree-sitter-c-sharp',
  languageRegistration,
  testRunner: (parse) => {
    const sg = parse('var a = 123;')
    const root = sg.root()
    const node = root.find('var $A = 123')
    assert.equal(node.kind(), 'variable_declaration')
  }
})
