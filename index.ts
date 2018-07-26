import { join } from 'path'
import {
  ChildProcess,
  SpawnSyncReturns,
  SpawnOptions,
  SpawnSyncOptions,
  SpawnSyncOptionsWithStringEncoding,
  SpawnSyncOptionsWithBufferEncoding
} from 'child_process'
import * as spawn from 'cross-spawn'

const bin = (name: string): string => {
  const isWin: boolean = /^win/.test(process.platform)
  const binPath: string = spawn.sync('npm', ['bin'], { cwd: process.cwd() }).stdout.toString().trim()
  return join(binPath, isWin ? `${name}.cmd` : name)
}

async function npx(command: string, args?: ReadonlyArray<string>, options?: SpawnOptions): Promise<ChildProcess> {
  const childProcess: ChildProcess = spawn(bin(command), args, options)

  childProcess.on('close', (code: number, signal: string) => {
    if (code !== null) {
      process.exit(code)
    }
    if (signal) {
      if (signal === 'SIGKILL') {
        process.exit(137)
      }
      process.exit(1)
    }
    process.exit(0)
  })

  childProcess.on('error', (err: string) => {
    console.error(err)
    process.exit(1)
  })

  const wrapper = (): void => {
    if (childProcess) {
      childProcess.kill()
    }
  }
  process.on('SIGINT', wrapper)
  process.on('SIGTERM', wrapper)
  process.on('exit', wrapper)

  return childProcess
}

function npxSync(command: string, args?: ReadonlyArray<string>, options?: SpawnSyncOptions|SpawnSyncOptionsWithStringEncoding|SpawnSyncOptionsWithBufferEncoding): SpawnSyncReturns<string|Buffer> {
  return spawn.sync(bin(command), args, options)
}

module.exports = npx
module.exports.default = npx
module.exports.sync = npxSync
