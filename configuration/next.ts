import { state } from '../state'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  if (state.language === 'typescript') {
    // TODO importing log will fail here (cycle or sth).
    // log("next configuration doesn't support TypeScript", 'warning')
    // TODO change text to // return
  }

  let contents = `import { next } from './configuration.js'

export default next`

  if (typeof configuration === 'object' && state.language === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: 'next.config.js', contents }
}
