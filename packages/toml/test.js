const { parse, registerDynamicLanguage } = require('@ast-grep/napi')
const toml = require('./index')

registerDynamicLanguage({ toml })

const code = `
$NAME = "toml"
`

const tree = parse('toml', code)
const root = tree.root()
const name = root.find('$NAME = "toml"')
console.log(name.kind())
