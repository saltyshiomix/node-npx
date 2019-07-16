/// <reference types="node" />
import { ChildProcess, SpawnOptions, SpawnSyncOptions } from 'child_process';
declare const npx: (command: string, args?: string[] | undefined, options?: SpawnOptions | undefined) => ChildProcess;
declare const npxSync: (command: string, args?: string[] | undefined, options?: SpawnSyncOptions | undefined) => Promise<void>;
export { npx, npxSync };
export default npx;
