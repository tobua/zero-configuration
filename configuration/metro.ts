import { log } from '../log'
import { state } from '../state'

export const templates = {
  'react-native': {
    resolver: {
      // biome-ignore lint/style/useNamingConvention: This is the required spelling for metro.
      unstable_enablePackageExports: true,
    },
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  if (state.language === 'typescript') {
    log('Using metro configuration requires the a JavaScript file (configuration.js)', 'warning')
    return
  }

  let contents = `const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const { metro } = require('./configuration.js')

module.exports = mergeConfig(getDefaultConfig(__dirname), metro)`

  if (typeof configuration === 'object' && state.language === 'json') {
    contents = `const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

module.exports = mergeConfig(getDefaultConfig(__dirname), ${JSON.stringify(configuration, null, 2)})`
  }

  return { name: 'metro.config.cjs', contents }
}
