const { setup } = require('@ast-grep/nursery')
const toml = require('./index')
const assert = require('node:assert')

setup({
  name: 'toml',
  languageRegistration: toml,
  testRunner: (parse) => {
    const sg = parse('name = "Tom"')
    const root = sg.root()
    const pair = root.find('$NAME = "Tom"')
    assert.equal(pair.kind(), 'pair')
  }
})
