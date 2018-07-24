import { join } from 'path'
import {
  ChildProcess,
  SpawnSyncReturns,
  SpawnOptions,
  SpawnSyncOptions,
  SpawnSyncOptionsWithStringEncoding,
  SpawnSyncOptionsWithBufferEncoding
} from 'child_process'
import spawn from 'cross-spawn'

const bin = (name: string): string => {
  const isWin: boolean = /^win/.test(process.platform)
  const binPath: string = spawn.sync('npm', ['bin'], { cwd: process.cwd() }).stdout.toString().trim()
  return join(binPath, isWin ? `${name}.cmd` : name)
}

export function npxAsync(command: string, args?: ReadonlyArray<string>, options?: SpawnOptions): ChildProcess {
  return spawn(bin(command), args, options)
}

export function npxSync(command: string, args?: ReadonlyArray<string>, options?: SpawnSyncOptions|SpawnSyncOptionsWithStringEncoding|SpawnSyncOptionsWithBufferEncoding): SpawnSyncReturns<string|Buffer> {
  return spawn.sync(bin(command), args, options)
}

export default npxSync
