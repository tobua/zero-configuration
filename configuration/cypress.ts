import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { cypress } from './configuration.${state.extension}'

export default cypress`

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `cypress.config.${state.extension === 'json' ? 'js' : state.extension}`, contents }
}
