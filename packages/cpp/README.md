# ast-grep napi language for C++

## Installation

In a pnpm project, run:

```bash
pnpm install @ast-grep/lang-cpp
pnpm install @ast-grep/napi
# install the tree-sitter-cli if no prebuild is available
pnpm install @tree-sitter/cli --save-dev
```

## Usage

```js
import Cpp from '@ast-grep/lang-cpp'
import { registerDynamicLanguage, parse } from '@ast-grep/napi'

registerDynamicLanguage({ Cpp })

const sg = parse('C++', `your code`)
sg.root().kind()
```
