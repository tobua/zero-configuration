import { state } from '../state'
import type { Template } from '../types'

/** @type {import("prettier").Config} */
export const templates: Template<object> = {
  recommended: {
    semi: false,
    singleQuote: true,
    printWidth: 120,
    ignore: ['dist'],
  },
}

// biome-ignore lint/suspicious/noExplicitAny: Various configuration options.
export function createFile(configuration: Record<string, any>) {
  const ignores = configuration.ignore
  configuration.ignore = undefined

  const files = [
    // TODO use prettier to format the whole file.
    {
      name: `prettier.config.${state.extension === 'json' ? 'js' : state.extension}`,
      contents: `export default ${JSON.stringify(configuration, null, 2)}`,
    },
  ]

  if (Array.isArray(ignores) && ignores.length > 0) {
    files.push({ name: '.prettierignore', contents: ignores.join('\n') })
  }

  return files
}
