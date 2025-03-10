import { isSerializable, log } from '../log'
import { state } from '../state'

export const templates = {
  'react-native': {
    resolver: {
      // biome-ignore lint/style/useNamingConvention: This is the required spelling for metro.
      unstable_enablePackageExports: false,
    },
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  if (state.extension === 'ts') {
    log('Using metro configuration requires the a JavaScript file (configuration.js)', 'warning')
    return
  }

  let contents = `const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const { metro } = require('./configuration.${state.extension}')

module.exports = mergeConfig(getDefaultConfig(__dirname), metro)`

  if (typeof configuration === 'object' && (state.extension === 'json' || isSerializable(configuration))) {
    contents = `const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

module.exports = mergeConfig(getDefaultConfig(__dirname), ${JSON.stringify(configuration, null, 2)})`
  }

  return { name: `metro.config.${state.extension === 'json' ? 'js' : state.extension}`, contents }
}
