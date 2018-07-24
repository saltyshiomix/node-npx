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

```js
import { npxAsync, npxSync } from 'node-npx'

// use `node-npx` like `child_process.spawn`
const proc = npxAsync('rimraf', ['dist', 'node_modules'], { cwd: '.' })

// Support `child_process.spawnSync`
npxSync('glob', ['*'], { stdio: 'inherit' })

...

import npx from 'node-npx'

// default import acts as `npxSync`
npx('fkill', ['-f', ':8080'])
```
