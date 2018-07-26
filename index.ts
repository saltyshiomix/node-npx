import { join } from 'path'
import { ChildProcess } from 'child_process'
import { spawn } from 'cross-spawn'
import * as delay from 'delay'

const bin = (name: string): string => {
  const isWin: boolean = /^win/.test(process.platform)
  const binPath: string = spawn.sync('npm', ['bin'], { cwd: process.cwd() }).stdout.toString().trim()
  return join(binPath, isWin ? `${name}.cmd` : name)
}

const npx = async (command: string, args?: ReadonlyArray<string>, options?: { cwd: string, stdio: string }): Promise<void> => {
  const childProcess: ChildProcess = spawn(bin(command), args, options)

  let closed: boolean = false
  const exit = (code?: number) => {
    closed = true
    if (code) {
      process.exit(code)
    }
  }

  const detectCode = (code: number, signal: string): number => {
    if (code !== null) {
      return code
    }
    if (signal) {
      if (signal === 'SIGKILL') {
        return 137
      }
      return 1
    }
    return 0
  }

  childProcess.on('close', (code: number, signal: string) => {
    const _code: number = detectCode(code, signal)
    if (_code !== 0) {
      exit(_code)
    }
    exit()
  })

  childProcess.on('error', (err: string) => {
    console.error(err)
    exit(1)
  })

  const wrapper = (): void => {
    if (childProcess) {
      childProcess.kill()
    }
  }
  process.on('SIGINT', wrapper)
  process.on('SIGTERM', wrapper)
  process.on('exit', wrapper)

  while (true) {
    await delay(50)
    if (closed) {
      break
    }
  }
}

module.exports = npx
module.exports.default = npx
