import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `export { vitest as default } from './configuration.${state.extension}'`

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `vitest.config.${state.extension === 'json' ? 'js' : state.extension}`, contents }
}
