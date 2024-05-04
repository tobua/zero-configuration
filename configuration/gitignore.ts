import type { Template } from '../types'

const recommended = ['node_modules', 'bun.lockb', '.env']

export const templates: Template<string[]> = {
  recommended: recommended,
  bundle: [...recommended, 'dist'],
}

export function createFile(values: string[]) {
  return { name: '.gitignore', contents: `${values.join('\n')}\n` }
}
