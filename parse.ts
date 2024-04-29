import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { it } from 'avait'
import { merge } from 'ts-deepmerge'
import type { Configuration, Options } from './types'

const isExtension = async (value: string) => {
  // NOTE dynamic import in tests will resolve relative to project node_modules and not fixture.
  const { error } = await it(import(value))
  if (!error) return true
  const paths = [value, join(process.cwd(), value), join(process.cwd(), 'node_modules', value)]
  const fileExists = paths.some(existsSync)
  if (fileExists) return true
  return false
}

function extendTemplate(value: Options, configuration: Configuration['configuration']) {
  if (
    typeof value !== 'object' ||
    !(typeof value.extends === 'string' && configuration.templates && Object.hasOwn(configuration.templates, value.extends))
  ) {
    return value
  }

  let template = configuration.templates[value.extends]

  if (typeof template === 'string') {
    value.extends = template
  }
  if (typeof template === 'function') {
    template = template()
  }
  if (typeof template === 'object') {
    // biome-ignore lint/performance/noDelete: We don't want the key to show up in the user configuration.
    delete value.extends
    return merge(template, value)
  }

  return value
}

export async function parse(value: Options, configuration: Configuration['configuration']) {
  // Template.
  if (typeof value === 'string' && configuration.templates && Object.hasOwn(configuration.templates, value)) {
    const template = configuration.templates[value as keyof typeof configuration.templates]
    const configurationTemplate = typeof template === 'function' ? template() : template
    return configuration.createFile(configurationTemplate)
  }

  // File extension.
  if (typeof value === 'string' && (await isExtension(value)) && typeof configuration.extension === 'function') {
    return configuration.createFile(configuration.extension(value))
  }

  if (value === true) {
    return configuration.createFile(configuration.templates?.recommended)
  }

  // biome-ignore lint/style/noParameterAssign: Easier in this case.
  value = extendTemplate(value, configuration)

  return configuration.createFile(value)
}
