import type { State } from './types'

export const state: State = {
  options: {},
  language: 'json',
  packageJson: { name: 'missing-package-name' },
}

export const fileExtension = () => (state.language === 'javascript' ? 'js' : 'ts')
