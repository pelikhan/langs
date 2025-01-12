import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

/**
 * Log to console
 */
function log(...args: unknown[]) {
  console.debug(`@ast-grep/lang:`, ...args)
}

/**
 * Move prebuild or build parser
 */
async function postinstall(dir: string) {
  const parser = path.join(dir, 'parser.so')
  if (fs.existsSync(parser)) {
    log('parser already exists, skipping build')
    return
  }
  const prebuild = resolvePrebuild(dir)
  if (prebuild) {
    log('copying prebuild parser')
    fs.copyFileSync(prebuild, parser)
    return
  }
  log('building parser')
  try {
    execSync('npm run build')
  } catch (e: unknown) {
    log('build failed, please ensure tree-sitter-cli is installed as peer dependency')
    log(e)
  }
}

const PLATFORM_MAP: Record<string, string> = {
  darwin: 'macOS',
  linux: 'Linux',
  win32: 'Windows',
}

const ARCH_MAP: Record<string, string> = {
  x64: 'x64',
  arm64: 'ARM64',
}

/**
 * Resolve prebuild path
 */
function resolvePrebuild(dir: string) {
  const os = PLATFORM_MAP[process.platform]
  const arch = ARCH_MAP[process.arch]
  const prebuild = path.join(dir, 'prebuilds', `prebuild-${os}-${arch}`, 'parser.so')
  if (!os || !arch || !fs.existsSync(prebuild)) {
    log(`no prebuild for ${os} ${arch}`)
    return undefined
  }
  log(`found prebuild for ${os} ${arch}`)
  return prebuild
}

export { postinstall }
