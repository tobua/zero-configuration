import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { playwright } from './configuration.${state.extension}'

export default playwright`

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `playwright.config.${state.extension === 'json' ? 'js' : state.extension}`, contents }
}
