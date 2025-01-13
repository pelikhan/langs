import prompts from 'prompts'
import path from 'node:path'
import fs from 'node:fs/promises'
import { execSync } from 'node:child_process'

function required(s: string): string | true {
  if (s.length === 0) {
    return 'This value is required'
  }
  return true
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  ) || 'Invalid package name'
}


function askConfiguration() {
  return prompts([
    {
      type: 'text',
      name: 'packageName',
      message: 'Package name',
      validate: isValidPackageName,
    },
    {
      type: 'text',
      name: 'name',
      message: 'Language name',
      validate: required,
    },
    {
      type: 'text',
      name: 'treeSitterPackage',
      message: 'Tree-sitter package to use',
      validate: isValidPackageName,
    },
    {
      type: 'list',
      name: 'extensions',
      message: 'File extensions used by the language, comma separated',
      separator: ',',
      validate: required,
    },
    {
      type: 'text',
      name: 'expandoChar',
      message: 'Expando char used in pattern',
      initial: '$',
      validate: (value) => {
        return value.length === 1 ? true : 'Expando char must be a single character'
      }
    }
  ])
}

type Answers = Awaited<ReturnType<typeof askConfiguration>>

function copyTemplate(targetDir: string) {
  const templateDir = path.join(__dirname, 'template')
  return fs.cp(templateDir, targetDir, { recursive: true })
}

function removeDotFiles() {
}

async function renameFiles(dir: string, answer: Answers) {
  const name: Record<string, string> = {
    $$PACKAGE_NAME$$: answer.packageName,
    $$NAME$$: answer.name,
    $$TREE_SITTER_PACKAGE$$: answer.name,
    $$EXTENSIONS$$: JSON.stringify(answer.extensions),
    $$EXPANDO_CHAR$$: JSON.stringify(answer.expandoChar),
  }
  for (const file of await fs.readdir(dir)) {
    const filePath = path.join(dir, file)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      renameFiles(filePath, answer)
    } else {
      const content = await fs.readFile(filePath, 'utf-8')
      const newContent = content.replace(/(\$\$[A-Z_]+\$\$)/g, (match) => {
        return name[match] || match
      })
      await fs.writeFile(filePath, newContent)
    }
  }
}
function installTreeSitterPackage(answer: Answers) {
  execSync(`pnpm install ${answer.treeSitterPackage} --save-dev`)
}

async function main() {
  const cwd = process.cwd()
  const config = await askConfiguration()
  await copyTemplate(cwd)
  if (process.argv.slice(2).includes('--skip-dot-files')) {
    removeDotFiles()
  }
  await renameFiles(cwd, config)
}

main()

