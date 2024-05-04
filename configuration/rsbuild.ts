import { fileExtension, state } from '../state'
import type { Template } from '../types'

export const templates: Template<object> = {
  web: {
    output: {
      overrideBrowserslist: ['last 2 versions', '> 3%', 'not dead'],
      legalComments: 'none',
    },
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { rsbuild } from './configuration.${fileExtension()}'

export default rsbuild`

  if (typeof configuration === 'object' && state.language === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `rsbuild.config.${fileExtension()}`, contents }
}
