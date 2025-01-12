const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * Log to console
 * @param  {...string} args
 */
function log(...args) {
  console.debug(`@ast-grep/lang:`, ...args)
}

/**
 * Move prebuild or build parser
 * @param {string} dir
 */
async function postinstall(dir) {
  const parser = path.join(dir, 'parser.so')
  if (fs.existsSync(parser)) {
    log('parser already exists, skipping build')
    return
  }
  const prebuild = resolvePrebuild()
  if (prebuild) {
    log('copying prebuild parser')
    fs.copyFileSync(prebuild, parser)
    return
  }
  log('building parser')
  try {
    execSync('npm run build')
  } catch (e) {
    log('build failed, please ensure tree-sitter-cli is installed as peer dependency')
    log(e)
  }
}

const PLATFORM_MAP = {
  darwin: 'macOS',
  linux: 'Linux',
  win32: 'Windows',
}

const ARCH_MAP = {
  x64: 'x64',
  arm64: 'ARM64',
}

/**
 * Resolve prebuild path
 * @param {string} dir
 */
function resolvePrebuild(dir) {
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

exports.postinstall = postinstall
