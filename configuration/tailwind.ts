import { fileExtension, state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { tailwind } from './configuration.${fileExtension()}'

export default tailwind`

  if (typeof configuration === 'object' && state.language === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `tailwind.config.${fileExtension()}`, contents }
}
