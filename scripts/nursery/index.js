const { cp } = require('fs').promises
const { parse, registerDynamicLanguage } = require('@ast-grep/napi')

const path = require('path')

async function copySrc(packageName) {
  const src = path.join(process.cwd(), 'node_modules', packageName,  'src')
  await cp(src, 'src', { recursive: true })
}

function test(name, lang, code) {
  registerDynamicLanguage({ [name]: lang })
  const tree = parse(name, code)
  const root = tree.root()
  const node = root.find('$NAME = "toml"')
  console.log(node.kind())
}

// jsdoc for setupConfig
// @param {Object} setupConfig
// @param {string} setupConfig.packageName
// @param {string} setupConfig.name
// @param {Object} setupConfig.testConfig
// @param {Object} setupConfig.testConfig.languageRegistration
// @param {string} setupConfig.testConfig.code
//
//
exports.setup = function setup(setupConfig){
  const arg = process.argv[2]
  if (arg === 'copy') {
    copySrc(setupConfig.packageName)
  } else if (arg === 'test') {
    const testConfig = setupConfig.testConfig
    test(setupConfig.name, testConfig.languageRegistration, testConfig.code)
  }
}
