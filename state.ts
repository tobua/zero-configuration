import { join } from 'node:path'
import process from 'node:process'
import Bun from 'bun'
import type { State } from './types'

export const state: State = {
  options: {},
  extension: 'json',
  packageJson: { name: 'missing-package-name' },
  directory: '/',
  root: true,
  pendingIgnores: [],
}

export const root = (file: string) => {
  if (process.cwd().includes('node_modules')) {
    const inFrontFirstNodeModules = process.cwd().split('node_modules')[0]
    return join(inFrontFirstNodeModules ?? process.env.INIT_CWD ?? process.cwd(), state.directory, file)
  }

  return join(process.cwd(), state.directory, file)
}

export async function reset({ path, root: isRoot }: { path: string; root: boolean }) {
  state.options = {}
  state.extension = 'json'
  state.directory = path
  state.root = isRoot

  const packageJson = await Bun.file(root('./package.json')).json()

  state.packageJson = packageJson
}
