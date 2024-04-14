import type { Template } from '../types'

/** @type {import("prettier").Config} */
export const templates: Template = {
  recommended: {
    semi: false,
    singleQuote: true,
    printWidth: 120,
  },
}

export function createFile(configuration: object) {
  // TODO use prettier to format the whole file.
  return { name: 'prettier.config.js', contents: `export default ${JSON.stringify(configuration, null, 2)}` }
}
