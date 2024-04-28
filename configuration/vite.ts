import { fileExtension, state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { vite } from './configuration.${fileExtension()}'

export default vite`

  if (typeof configuration === 'object' && state.language === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `vite.config.${fileExtension()}`, contents }
}