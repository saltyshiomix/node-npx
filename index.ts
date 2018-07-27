import { ChildProcess } from 'child_process'
import { spawn } from 'cross-spawn'
import bin from 'resolve-as-bin'
import * as delay from 'delay'

const createNpx = (isSync: boolean): (command: string, args?: ReadonlyArray<string>, options?: any) => Promise<void|ChildProcess> => {
  return async (command: string, args?: ReadonlyArray<string>, options?: any): Promise<void|ChildProcess> => {
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

    if (isSync) {
      while (true) {
        await delay(50)
        if (closed) {
          break
        }
      }
    } else {
      return childProcess
    }
  }
}

module.exports = createNpx(false)
module.exports.default = createNpx(false)
module.exports.npx = createNpx(false)
module.exports.npxSync = createNpx(true)
