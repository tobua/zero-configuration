import { isSerializable, log } from '../log'
import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `export { postcss as default } from './configuration.${state.extension}'`

  if (state.extension === 'ts') {
    if (typeof configuration === 'object' && isSerializable(configuration)) {
      contents = `export default ${JSON.stringify(configuration, null, 2)}`
    } else {
      log("postcss configuration doesn't support TypeScript", 'warning')
      return
    }
  }

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `postcss.config.${state.extension === 'json' ? 'js' : state.extension}`, contents }
}
