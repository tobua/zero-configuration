import { log } from '../log'

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object) {
  if (typeof configuration !== 'object') {
    log('Configuration for "react-native" (app.json) must be an object', 'warning')
    return
  }

  return { name: 'app.json', contents: JSON.stringify(configuration, null, 2) }
}
