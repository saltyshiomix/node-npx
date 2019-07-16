<p align="center">
  <a href="https://www.npmjs.com/package/node-npx"><img src="https://img.shields.io/npm/v/node-npx.svg"></a>
  <a href="https://www.npmjs.com/package/node-npx"><img src="https://img.shields.io/npm/dt/node-npx.svg"></a>
</p>
<p align="center">Execute <b>local</b> npm package binaries like a <code>npx</code> for Node.js</p>

## Install

```bash
$ npm install --save node-npx
```

## Usage

```js
// default import (asynchronously)
import npx from 'node-npx';

// named import is also supported
import { npx, npxSync } from 'node-npx';

// kill port 8080
const childProcess = npx('fkill', ['-f', ':8080'])
childProcess.on('exit', () => {
  console.log('port 8080 was killed!')
})

// remove dist folder and list contents
npxSync('rimraf', ['dist']);
npxSync('glob', ['dist/**/*'], {
  cwd: process.cwd(),
  stdio: 'inherit',
});

// both relative and absolute paths are also supported
npxSync('./relative/path/to/my-binary');
npxSync('/absolute/path/to/my-binary');
```
