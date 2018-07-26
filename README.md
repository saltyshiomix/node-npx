<a href="https://www.npmjs.com/package/node-npx"><img src="https://img.shields.io/npm/v/node-npx.svg"></a>
<a href="https://www.npmjs.com/package/node-npx"><img src="https://img.shields.io/npm/dt/node-npx.svg"></a>

Execute **local** npm package binaries like a `npx` for Node.js.

## Install

```bash
$ npm install --save node-npx
```

## Usage

By default, `node-npx` executes a command asynchronously:

```js
import npx from 'node-npx'

// kill port 8080 process by `fkill-cli`
npx('fkill', ['-f', ':8080'])

// clear dist folder and show contens were deleted
npx('rimraf', ['dist'])
npx.sync('glob', ['dist/**/*'], {
  cwd: process.cwd(),
  stdio: 'inherit'
})
```

## API

### `npx(command, args?, options?)`

#### `command: string`

#### `args?: ReadonlyArray<string>`

#### `options?: { cwd: string, stdio: string }`
