import { isSerializable, log } from '../log'
import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { next } from './configuration.${state.extension}'

export default next`

  if (state.extension === 'ts') {
    if (typeof configuration === 'object' && isSerializable(configuration)) {
      contents = `export default ${JSON.stringify(configuration, null, 2)}`
    } else {
      log("next configuration doesn't support TypeScript", 'warning')
      return
    }
  }

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: 'next.config.js', contents }
}
