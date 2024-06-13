import type { Template } from '../types'

const base = ['node_modules', 'bun.lockb', '.env']

export const templates: Template<string[]> = {
  recommended: base,
  bundle: [...base, 'dist'],
  numic: [...base, '.numic', 'android', 'ios', 'android-bundle.aab'],
}

export function createFile(values: string[]) {
  return { name: '.gitignore', contents: `${values.join('\n')}\n` }
}
