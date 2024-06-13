import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { tailwind } from './configuration.${state.extension}'

export default tailwind`

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `tailwind.config.${state.extension === 'json' ? 'js' : state.extension}`, contents }
}
