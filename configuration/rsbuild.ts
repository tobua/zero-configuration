import { fileExtension } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { rsbuild } from './configuration.${fileExtension()}'

export default rsbuild`

  if (typeof configuration === 'object') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `rsbuild.config.${fileExtension()}`, contents }
}
