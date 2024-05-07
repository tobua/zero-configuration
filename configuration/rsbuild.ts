import { fileExtension, state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { rsbuild } from './configuration.${fileExtension()}'
import { extendConfiguration } from 'zero-configuration'

export default extendConfiguration('rsbuild', rsbuild)`

  if (typeof configuration === 'object' && state.language === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `rsbuild.config.${fileExtension()}`, contents }
}
