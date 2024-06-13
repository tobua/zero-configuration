import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { vite } from './configuration.${state.extension}'

export default vite`

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `vite.config.${state.extension === 'json' ? 'ts' : state.extension}`, contents }
}
