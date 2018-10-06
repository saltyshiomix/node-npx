import { existsSync } from 'fs'
import { ChildProcess } from 'child_process'
import { spawn } from 'cross-spawn'
import resolve from 'resolve-as-bin'
import delay from 'delay'

const bin = (command: string): string => {
  const possibleBin: string = resolve(command)
  return existsSync(possibleBin) ? possibleBin : command
}

const npx = (command: string, args?: ReadonlyArray<string>, options?: any): ChildProcess => {
  const childProcess: ChildProcess = spawn(bin(command), args, options)

  const exit = (code?: number) => {
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

  return childProcess
}

const npxSync = async (command: string, args?: ReadonlyArray<string>, options?: any): Promise<void> => {
  let closed: boolean = false

  const childProcess: ChildProcess = spawn(bin(command), args, options)

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
module.exports.npx = npx
module.exports.npxSync = npxSync
