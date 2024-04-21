import type { Template } from '../types'

export const templates: Template<object> = {
  recommended: {
    'editor.defaultFormatter': 'biomejs.biome',
    'editor.codeActionsOnSave': {
      'quickfix.biome': 'explicit',
      'source.organizeImports.biome': 'explicit',
    },
    'editor.formatOnSave': true,
  },
}

export function createFile(configuration: object) {
  return { name: '.vscode/settings.json', contents: JSON.stringify(configuration, null, 2) }
}
