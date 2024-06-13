import { log } from '../log'
import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  if (state.extension === 'ts') {
    log('Using babel configuration requires the a JavaScript file (configuration.js)', 'warning')
    return
  }

  let contents = `const { babel } = require('./configuration.${state.extension}')

module.exports = babel`

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `module.exports = ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `babel.config.${state.extension}`, contents }
}
