<p align="center">
  <a href="https://www.npmjs.com/package/node-npx"><img src="https://img.shields.io/npm/v/node-npx.svg"></a>
  <a href="https://www.npmjs.com/package/node-npx"><img src="https://img.shields.io/npm/dt/node-npx.svg"></a>
</p>

Execute **local** npm package binaries like a `npx` for Node.js.

## Install

```bash
$ npm install --save node-npx
```

## Usage

**default import**

```js
import npx from 'node-npx'

// synchronously execute `./node_module/.bin/fkill -f ':8080'`
npx('fkill', ['-f', ':8080'])
```

**named import**

```js
import { npxAsync, npxSync } from 'node-npx'

// use `node-npx` like `child_process.spawn` or `child_process.spawnSync`
const proc = npxAsync('rimraf', ['dist', 'node_modules'], { cwd: '.' })
npxSync('glob', ['*'], { stdio: 'inherit' })
```
