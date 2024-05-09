import { isSerializable, log } from '../log'
import { fileExtension, state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { postcss } from './configuration.${fileExtension()}'

export default postcss`

  if (state.language === 'typescript') {
    if (typeof configuration === 'object' && isSerializable(configuration)) {
      contents = `export default ${JSON.stringify(configuration, null, 2)}`
    } else {
      log("postcss configuration doesn't support TypeScript", 'warning')
      return
    }
  }

  if (typeof configuration === 'object' && state.language === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: 'postcss.config.js', contents }
}
