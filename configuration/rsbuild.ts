import { checkDependency } from '../helper'
import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  checkDependency('@rsbuild/core')
  let contents = `import { rsbuild } from './configuration.${state.extension}'
import { extendConfiguration } from 'zero-configuration'

export default extendConfiguration('rsbuild', rsbuild)`

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `rsbuild.config.${state.extension === 'json' ? 'js' : state.extension}`, contents }
}
