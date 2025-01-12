const { cp } = require('fs').promises
const { parse, registerDynamicLanguage } = require('@ast-grep/napi')

const path = require('path')

async function copySrc(packageName) {
  const src = path.join(process.cwd(), 'node_modules', packageName,  'src')
  await cp(src, 'src', { recursive: true })
}

function test(setupConfig) {
  const { name, languageRegistration, testRunner } = setupConfig
  registerDynamicLanguage({ [name]: languageRegistration })
  testRunner((code) => parse(name, code))
}

/** Setup ast-grep/lang package's pre-release and
 * @param {Object} setupConfig
 * @param {string} setupConfig.name
 * @param {string} setupConfig.packageName
 * @param {Function} setupConfig.testRunner
 * @returns {void}
 */
function setup(setupConfig){
  const arg = process.argv[2]
  if (arg === 'copy') {
    copySrc(setupConfig.packageName)
  } else if (arg === 'test') {
    test(setupConfig)
  }
}

exports.setup = setup
