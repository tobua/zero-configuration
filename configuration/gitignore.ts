import type { Template } from '../types'

const base = ['node_modules', 'bun.lockb', '.env']

export const templates: Template<string[]> = {
  recommended: base,
  bundle: [...base, 'dist'],
  numic: [...base, '.numic', 'android', 'ios', 'android-bundle.aab'],
}

export function createFile(values: string[]) {
  if (values.length > 0 && values[0]?.startsWith('extends:')) {
    const templateName = values[0].split(':')[1]
    values.shift()
    if (templateName && templates[templateName]) {
      // biome-ignore lint/style/noParameterAssign: Seems fine.
      values = [...(templates[templateName] as string[]), ...values]
    }
  }

  return { name: '.gitignore', contents: `${values.join('\n')}\n` }
}
