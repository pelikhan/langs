const dir = __dirname

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

async function postinstall() {
  const parser = path.join(dir, 'parser.so')
  if (fs.existsSync(parser)) {
    return
  }
  // resolve parser path
  const prebuild = resolvePrebuild()
  if (prebuild) {
    fs.copyFileSync(prebuild, parser)
  } else {
    // build parser
    execSync('npm run build')
  }
}

function resolvePrebuild() {
  const os = process.platform
  const arch = process.arch
  throw new Error(`TODO: ${os} ${arch}`)
}

postinstall()
