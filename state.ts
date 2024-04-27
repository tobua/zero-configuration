import { join } from 'node:path'
import type { PackageJson, State } from './types'

export const state: State = {
  options: {},
  language: 'json',
  packageJson: { name: 'missing-package-name' },
  directory: '/',
  root: true,
}

export const fileExtension = () => (state.language === 'javascript' ? 'js' : 'ts')

export const root = (file: string) =>
  process.cwd().includes('node_modules') ? join(process.cwd(), '../..', state.directory, file) : join(process.cwd(), state.directory, file)

export const reset = ({ path, root }: { path: string; root: boolean }, packageJson: PackageJson) => {
  state.options = {}
  state.language = 'json'
  state.packageJson = packageJson
  state.directory = path
  state.root = root
}
