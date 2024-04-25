import { existsSync, lstatSync } from 'node:fs'
import { it } from 'avait'
import Bun, { Glob } from 'bun'
import { create } from 'logua'
import { parse } from 'parse-gitignore'
import { z } from 'zod'
import { configurations, ignore } from './configuration'
import { root, state } from './state'

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
  const packageJson = await Bun.file(root('./package.json')).json()
  const { value: typeScriptModuleContents } = await it(import(root('./configuration.ts')))
  const { value: javaScriptModuleContents } = await it(import(root('./configuration.js')))

  if (!(typeScriptModuleContents || javaScriptModuleContents || Object.hasOwn(packageJson, 'configuration'))) {
    log('No configuration found', 'error')
  }

  if (!packageJson.configuration && typeScriptModuleContents) {
    state.language = 'typescript'
  } else if (!packageJson.configuration && javaScriptModuleContents) {
    state.language = 'javascript'
  }

  const userConfiguration = packageJson.configuration ?? typeScriptModuleContents ?? javaScriptModuleContents
  validate(userConfiguration)
  state.options = userConfiguration
}

async function addAdditionalGitignoreEntries(file: { name: string; contents: string }) {
  const addedIgnores: string[] = []
  const existingFileContents = await Bun.file(root(file.name)).text()
  const { patterns: existingIgnores } = parse(existingFileContents)
  const { patterns: updatedIgnores } = parse(file.contents)

  for (const pattern of updatedIgnores) {
    if (!(existingIgnores.includes(pattern) || existingIgnores.includes(`!${pattern}`))) {
      addedIgnores.push(pattern)
    }
  }

  if (addedIgnores.length) {
    await Bun.write(
      root(file.name),
      `${existingFileContents}${existingFileContents.endsWith('\n') ? '' : '\n'}${addedIgnores.join('\n')}\n`,
    )
  }
}

export async function writeGitIgnore(ignores: string[]) {
  let userIgnores = state.options.ignore ?? state.options.gitignore ?? ([] as string[])

  if (typeof userIgnores === 'string' && Object.hasOwn(ignore.templates, userIgnores)) {
    userIgnores = ignore.templates[userIgnores] as string[]
  }

  if (userIgnores && Array.isArray(userIgnores)) {
    userIgnores.push(...ignores)
  }

  const file = ignore.createFile(userIgnores as string[])

  if (existsSync(root(file.name))) {
    await addAdditionalGitignoreEntries(file)
  } else if (state.root) {
    await Bun.write(root(file.name), file.contents)
  }

  return Object.hasOwn(state.options, 'ignore') || Object.hasOwn(state.options, 'gitignore')
}

export async function getWorkspaces() {
  const packageJson = await Bun.file(root('./package.json')).json()
  const workspaces: { path: string; root: boolean }[] = []

  if (Array.isArray(packageJson.workspaces)) {
    for (const workspaceGlob of packageJson.workspaces) {
      const glob = new Glob(workspaceGlob)
      for await (const file of glob.scan({ cwd: root('/'), dot: false, onlyFiles: false })) {
        if (lstatSync(file).isDirectory()) {
          workspaces.push({ path: file, root: false })
        }
      }
    }
  }

  workspaces.push({ path: '/', root: true }) // Always run in root, root should run last.

  return workspaces
}
