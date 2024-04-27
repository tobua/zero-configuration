import type { Template } from '../types'

export const templates: Template<string[]> = {
  recommended: ['node_modules', 'bun.lockb'],
  bundle: ['node_modules', 'bun.lockb', 'dist'],
}

export function createFile(values: string[]) {
  return { name: '.gitignore', contents: `${values.join('\n')}\n` }
}
