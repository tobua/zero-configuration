import { join } from 'node:path'
import type { State } from './types'

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

export const reset = ({ path, root }: { path: string; root: boolean }) => {
  state.options = {}
  state.language = 'json'
  state.packageJson = { name: 'missing-package-name' }
  state.directory = path
  state.root = root
}
