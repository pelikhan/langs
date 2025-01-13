import prompts from 'prompts'

function required(s: string): string | true {
  if (s.length === 0) {
    return 'This value is required'
  }
  return true
}

function askConfiguration() {
  return prompts([
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
      validate: required,
    },
    {
      type: 'list',
      name: 'extension',
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

async function copyTemplate() {
}

function removeDotFiles() {
}
function renameFiles() {
  // Rename files
}

async function main() {
  const config = await askConfiguration()
  await copyTemplate()
  if (process.argv.slice(2).includes('--skip-dot-files')) {
    removeDotFiles()
  }
  renameFiles()
}

main()

