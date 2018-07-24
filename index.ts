import { join } from 'path'
import { spawnSync } from 'child_process'

const bin = (name: string): string => {
  const isWin: boolean = /^win/.test(process.platform)
  const binPath: string = spawnSync('npm',['bin'],{cwd: process.cwd()}).stdout.toString().trim()
  return join(binPath, isWin ? `${name}.cmd` : name)
}

export default function(cmd: string, args?: string[], options?: object) {
  spawnSync(bin(cmd), args, options)
}
