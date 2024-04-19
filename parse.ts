import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { it } from 'avait'
import type { Configuration } from './types'

const isExtension = async (value: string) => {
  // NOTE dynamic import in tests will resolve relative to project node_modules and not fixture.
  const { error } = await it(import(value))
  if (!error) return true
  const paths = [value, join(process.cwd(), value), join(process.cwd(), 'node_modules', value)]
  const fileExists = paths.some(existsSync)
  if (fileExists) return true
  return false
}

export async function parse(value: string | object | boolean, configuration: Configuration['configuration']) {
  // Template.
  if (typeof value === 'string' && Object.hasOwn(configuration.templates, value)) {
    const configurationTemplate = configuration.templates[value as keyof typeof configuration.templates]
    return configuration.createFile(configurationTemplate)
  }

  // File extension.
  if (typeof value === 'string' && (await isExtension(value)) && typeof configuration.extension === 'function') {
    return configuration.createFile(configuration.extension(value))
  }

  if (typeof value === 'object') {
    return configuration.createFile(value)
  }

  if (value === true) {
    return configuration.createFile()
  }
}
