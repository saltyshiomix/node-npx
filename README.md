<a href="https://www.npmjs.com/package/node-npx"><img src="https://img.shields.io/npm/v/node-npx.svg"></a>
<a href="https://www.npmjs.com/package/node-npx"><img src="https://img.shields.io/npm/dt/node-npx.svg"></a>

Execute **local** npm package binaries like a `npx` for Node.js.

## Install

```bash
$ npm install --save node-npx
```

## Usage

```js
// default import (asynchronously)
import npx from 'node-npx'

// named import is also supported
import { npx, npxSync } from 'node-npx'


// kill port 8080
const childProcess = npx('fkill', ['-f', ':8080'])
childProcess.on('exit', () => {
  console.log('port 8080 was killed!')
})

// remove dist folder and list contents
npxSync('rimraf', ['dist'])
npxSync('glob', ['dist/**/*'], {
  cwd: process.cwd(),
  stdio: 'inherit'
})
```
