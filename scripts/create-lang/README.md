# @ast-grep/create-lang

## Usage

```bash
# create a new language package in current directory
pnpm create @ast-grep/lang
# create package in a specific directory
pnpm create @ast-grep/lang some-dir
```

You will be prompted to enter the language name, the language file extension, package name and tree-sitter grammar package.

Note the tree-sitter grammar package is different from the package name. package name is the repo you create, tree-sitter package should be a package already published on npm.


## Commands
After the package is created, you can use these commands:

```bash
pnpm source # copy tree-sitter grammar files to the src folder
pnpm build # build the tree-sitter grammar files to dynamic lib
pnpm test # test the tree-sitter grammar files
```

### Test file

You can edit `nursery.js` to add test case for your language.
