import { cp } from 'fs/promises'
import { parse, registerDynamicLanguage, SgRoot, DynamicLangRegistrations } from '@ast-grep/napi'
import path from 'path'

async function copySrc(packageName: string) {
  const src = path.join(process.cwd(), 'node_modules', packageName,  'src')
  await cp(src, 'src', { recursive: true })
}

/** Setup ast-grep/lang package's pre-release
 *
 **/
interface SetupConfig {
  name: string
  languageRegistration: DynamicLangRegistrations[string]
  packageName: string
  testRunner: (parse: (c: string) => SgRoot) => void
}

function test(setupConfig: SetupConfig) {
  const { name, languageRegistration, testRunner } = setupConfig
  registerDynamicLanguage({ [name]: languageRegistration })
  testRunner((code) => parse(name, code))
}

/** Setup ast-grep/lang package's pre-release build and test */
export function setup(setupConfig: SetupConfig) {
  const arg = process.argv[2]
  if (arg === 'copy') {
    copySrc(setupConfig.packageName)
  } else if (arg === 'test') {
    test(setupConfig)
  }
}
