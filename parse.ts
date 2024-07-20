import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { it } from 'avait'
import { merge } from 'ts-deepmerge'
import type { Configuration, File, Option, Options } from './types'

const isExtension = async (value: string) => {
  // NOTE dynamic import in tests will resolve relative to project node_modules and not fixture.
  const { error } = await it(import(value))
  if (!error) return true
  const paths = [value, join(process.cwd(), value), join(process.cwd(), 'node_modules', value)]
  const fileExists = paths.some(existsSync)
  if (fileExists) return true
  return false
}

function extendTemplate(option: Option, configuration: Configuration['configuration']) {
  if (
    typeof option !== 'object' ||
    !(typeof option.extends === 'string' && configuration.templates && Object.hasOwn(configuration.templates, option.extends))
  ) {
    if (typeof option === 'object' && Object.hasOwn(option, 'folder')) {
      option.folder = undefined
    }
    return option
  }

  let template = configuration.templates[option.extends]

  if (typeof template === 'function') {
    template = template(option)
  }
  if (typeof template === 'string') {
    option.extends = template
  }
  if (typeof template === 'object') {
    const optionWithoutPluginProperties = Object.fromEntries(Object.entries(option).filter(([key]) => !['extends', 'folder'].includes(key)))
    return merge(template, optionWithoutPluginProperties)
  }

  return option
}

function addFolderToFile(file: File | undefined, folder?: string | false) {
  if (file?.name && folder) {
    file.name = join(folder, file.name)
  }

  return file
}

async function getFiles(option: Option, configuration: Configuration['configuration']) {
  // Template.
  if (typeof option === 'string' && configuration.templates && Object.hasOwn(configuration.templates, option)) {
    const template = configuration.templates[option as keyof typeof configuration.templates]
    const configurationTemplate = typeof template === 'function' ? template(option) : template
    return configuration.createFile(configurationTemplate)
  }

  if (typeof option === 'string' && (await isExtension(option)) && typeof configuration.extension === 'function') {
    // File extension.
    return configuration.createFile(configuration.extension(option))
  }

  if (option === true) {
    return configuration.createFile(configuration.templates?.recommended)
  }

  return configuration.createFile(extendTemplate(option, configuration))
}

async function parseOption(option: Option, configuration: Configuration['configuration']) {
  const folder = typeof option === 'object' && option.folder
  let files: File | (File | undefined)[] | undefined = await getFiles(option, configuration)

  if (Array.isArray(files)) {
    files = files.map((file) => {
      return addFolderToFile(file, folder)
    })
  } else if (typeof files === 'object') {
    files = addFolderToFile(files, folder)
  }

  if (folder) {
    for (const file of Array.isArray(files) ? files : [files]) {
      if (file) {
        file.folder = true
      }
    }
  }

  return files
}

const unnestFileArray = (values: (File | (File | undefined)[] | undefined)[]): File[] => {
  if (values.length === 1 && !values[0]) {
    return []
  }

  return values.reduce((result, value) => {
    if (value === undefined) return result
    if (Array.isArray(value)) {
      const nestedClean = value.filter((innerValue): innerValue is File => innerValue !== undefined)
      return (result as File[]).concat(nestedClean)
    }
    return (result as File[]).concat(value)
  }, []) as File[]
}

export async function parse(options: Options, configuration: Configuration['configuration']): Promise<File[]> {
  if (!Array.isArray(options)) {
    return unnestFileArray([await parseOption(options, configuration)])
  }

  return unnestFileArray(await Promise.all(options.map((option) => parseOption(option, configuration))))
}
