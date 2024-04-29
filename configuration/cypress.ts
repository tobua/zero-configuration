import { fileExtension, state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { cypress } from './configuration.${fileExtension()}'

export default cypress`

  if (typeof configuration === 'object' && state.language === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `cypress.config.${fileExtension()}`, contents }
}
