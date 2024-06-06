import { log } from '../log'
import type { Template } from '../types'

export const templates: Template<object> = {
  biome: {
    settings: {
      'editor.defaultFormatter': 'biomejs.biome',
      'editor.codeActionsOnSave': {
        'quickfix.biome': 'explicit',
        'source.organizeImports.biome': 'explicit',
      },
      'editor.formatOnSave': true,
    },
  },
  'prettier-eslint': {
    settings: {
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': 'always',
      },
      'editor.formatOnSave': true,
    },
  },
}

export function createFile(configuration: { settings?: object; extensions?: object }) {
  const files = []
  if (configuration.settings) {
    files.push({ name: '.vscode/settings.json', contents: JSON.stringify(configuration.settings, null, 2) })
  }

  if (configuration.extensions) {
    files.push({ name: '.vscode/extensions.json', contents: JSON.stringify(configuration.extensions, null, 2) })
  }

  if (files.length === 0) {
    log('vscode, no files to create configured.', 'warning')
  }

  return files
}
