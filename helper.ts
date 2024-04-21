import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { it } from 'avait'
import Bun from 'bun'
import { create } from 'logua'
import { z } from 'zod'
import { configurations, ignore } from './configuration'
import { state } from './state'

export const log = create('zero-configuration', 'blue')

const keys = Object.fromEntries(configurations.map((current) => [current.name, z.union([z.string(), z.object({}), z.boolean()])]))

for (const configuration of configurations) {
  if (configuration.alias) {
    keys[configuration.alias] = z.union([z.string(), z.object({}), z.boolean()])
  }
}

const schema = z.object(keys).partial().strip()

export const validate = (configuration: unknown) => {
  try {
    return schema.parse(configuration)
  } catch (error) {
    log(`Invalid configuration provided: ${error}`, 'error')
  }
}

export async function findConfiguration() {
  const packageJson = await Bun.file('./package.json').json()
  const { value: moduleContents } = await it(import(join(process.cwd(), './configuration.ts')))

  if (!(moduleContents || Object.hasOwn(packageJson, 'configuration'))) {
    log('No configurations detected', 'error')
  }

  const userConfiguration = packageJson.configuration ?? moduleContents

  validate(userConfiguration)

  state.options = userConfiguration
}

export async function writeGitIgnore(ignores: string[]) {
  let userIgnores = state.options.ignore ?? state.options.gitignore ?? []

  if (typeof userIgnores === 'string' && Object.hasOwn(ignore.templates, userIgnores)) {
    userIgnores = ignore.templates[userIgnores]
  }

  if (userIgnores && Array.isArray(userIgnores)) {
    userIgnores.push(...ignores)
  }

  if (!existsSync('./.gitignore')) {
    const file = ignore.createFile(userIgnores as string[])
    await Bun.write(file.name, file.contents)
  }
}
