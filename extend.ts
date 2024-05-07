import { merge } from 'ts-deepmerge'
import type { Template } from './types'

export const templates: { [key: string]: Template<object> } = {
  rsbuild: {
    web: {
      output: {
        overrideBrowserslist: ['last 2 versions', '> 3%', 'not dead'],
        legalComments: 'none',
      },
    },
  },
}

function removeMatchingKeys(first: object, second: object) {
  if (!(first && second)) {
    return
  }
  for (const key of Object.keys(first)) {
    if (Object.hasOwn(second, key) && typeof second[key] !== 'object') {
      delete first[key]
    } else if (typeof first[key] === 'object' && second[key] && typeof second[key] === 'object') {
      removeMatchingKeys(first[key], second[key])
    }
  }
}

export function extendConfiguration(type: string, configuration: { extends?: string }) {
  if (typeof type === 'string' && Object.keys(templates).includes(type) && Object.keys(templates[type]).includes(configuration.extends)) {
    const template = templates[type][configuration.extends as string]
    // biome-ignore lint/performance/noDelete: Properties will be added, extends might cause issues.
    delete configuration.extends
    // Avoid overriding colliding values from configuration.
    removeMatchingKeys(template, configuration)
    // Merge template, preserving complex types.
    return merge(configuration, template)
  }

  return configuration
}
