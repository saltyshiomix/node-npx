import { existsSync } from 'fs';
import {
  ChildProcess,
  SpawnOptions,
  SpawnSyncOptions,
} from 'child_process';
import spawn from 'cross-spawn';
import resolve from 'resolve-as-bin';
import delay from 'delay';

const bin = (command: string): string => {
  const possibleBin: string = resolve(command);
  return existsSync(possibleBin) ? possibleBin : command;
}

const detectCode = (code: number, signal: string): number => {
  if (code !== null) {
    return code;
  }
  if (signal) {
    if (signal === 'SIGKILL') {
      return 137;
    }
    return 1;
  }
  return 0;
}

const exit = (code?: number) => {
  if (code) {
    process.exit(code);
  }
}

const npx = (command: string, args?: string[], options?: SpawnOptions): ChildProcess => {
  const proc: ChildProcess = spawn(bin(command), args, options);

  proc.on('close', (code: number, signal: string) => {
    const _code: number = detectCode(code, signal)
    if (_code !== 0) {
      exit(_code);
    }
    exit();
  });

  proc.on('error', (err: any) => {
    throw err;
  });

  const wrapper = (): void => {
    if (proc) {
      proc.kill();
    }
  }
  process.on('SIGINT', wrapper);
  process.on('SIGTERM', wrapper);
  process.on('exit', wrapper);

  return proc;
}

const npxSync = async (command: string, args?: string[], options?: SpawnSyncOptions): Promise<void> => {
  let closed: boolean = false;

  const proc: ChildProcess = spawn(bin(command), args, options);

  proc.on('close', (code: number, signal: string) => {
    const _code: number = detectCode(code, signal);
    if (_code !== 0) {
      exit(_code);
    }
    exit();
  });

  proc.on('error', (err: any) => {
    throw err;
  });

  const wrapper = (): void => {
    if (proc) {
      proc.kill();
    }
  }
  process.on('SIGINT', wrapper);
  process.on('SIGTERM', wrapper);
  process.on('exit', wrapper);

  while (true) {
    await delay(50);
    if (closed) {
      break;
    }
  }
}

// require support
module.exports = npx;
module.exports.default = npx;

export {
  npx,
  npxSync,
};
