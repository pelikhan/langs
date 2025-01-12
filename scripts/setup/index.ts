import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

/**
 * Log to console
 */
function log(...args: unknown[]) {
  console.debug(`@ast-grep/lang:`, ...args)
}

interface SetupConfig {
  /** Directory of the lang package. e.g. __dirname */
  directory: string
  /** Package name of tree-sitter package. e.g. tree-sitter-css */
  treeSitterPackage: string
}

/**
 * Move prebuild or build parser
 */
function postinstall(config: SetupConfig) {
  const dir = config.directory
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
  buildDynamicLib(config)
}

function buildDynamicLib(config: SetupConfig) {
  log('building parser')
  try {
    copySrcIfNeeded(config)
    execSync('npm run build')
  } catch (e: unknown) {
    log('build failed, please ensure tree-sitter-cli is installed as peer dependency')
    log(e)
  }
}

function copySrcIfNeeded(config: SetupConfig) {
  const { directory, treeSitterPackage } = config
  const existing = path.join(directory, 'src')
  const src = path.join(directory, 'node_modules', treeSitterPackage,  'src')
  if (fs.existsSync(existing)) {
    log('src exists, skipping copy')
    return
  }
  log('copying tree-sitter src')
  fs.cpSync(src, 'src', { recursive: true })
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
