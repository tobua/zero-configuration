import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `export { vite as default } from './configuration.${state.extension}'`

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `vite.config.${state.extension === 'json' ? 'ts' : state.extension}`, contents }
}
