# ast-grep napi language for F#

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-fsharp
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import fsharp from '@ast-grep/lang-fsharp'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ fsharp })

const sg = parse('fsharp', `let x = 42`)
sg.root().kind()
```

## Supported File Extensions

- `.fs` - F# source files
- `.fsi` - F# signature files
- `.fsx` - F# script files
- `.fsscript` - F# script files