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

By default, `node-npx` executes a command asynchronously:

```js
import npx from 'node-npx'

npx('fkill', ['-f', ':8080']) // ./node_module/.bin/fkill -f ':8080'
```

Support `async/await` or sync function:

```js
(async () => {
  await npx('rimraf', ['dist'])

  npx.sync('glob', ['dist/**/*'], {
    cwd: process.cwd(),
    stdio: 'inherit'
  })
})()
```

## API

### `npx(command, args, options)`

Same as `child_process.spawn(command, args, options)`.

### `npx.sync(command, args, options)`

Same as `child_process.spawnSync(command, args, options)`.
