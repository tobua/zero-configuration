import { existsSync, lstatSync, mkdirSync, symlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { it } from 'avait'
import Bun from 'bun'
import glob from 'fast-glob'
import { parse } from 'parse-gitignore'
import { merge } from 'ts-deepmerge'
import { z } from 'zod'
import { configurations, ignore } from './configuration'
import { log } from './log'
import { root, state } from './state'

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
  const { value: typeScriptModuleContents } = await it(import(root('./configuration.ts')))
  const { value: javaScriptModuleContents } = await it(import(root('./configuration.js')))

  if (!(typeScriptModuleContents || javaScriptModuleContents || Object.hasOwn(state.packageJson, 'configuration'))) {
    log('No configuration found', 'error')
  }

  if (typeScriptModuleContents) {
    state.language = 'typescript'
  } else if (javaScriptModuleContents) {
    state.language = 'javascript'
  } else {
    state.language = 'json'
  }

  const multipleConfigurations = (typeScriptModuleContents || javaScriptModuleContents) && state.packageJson.configuration
  const userConfiguration = multipleConfigurations
    ? // Merge package configuration onto file configuration.
      merge(typeScriptModuleContents ?? javaScriptModuleContents, state.packageJson.configuration)
    : state.packageJson.configuration ?? typeScriptModuleContents ?? javaScriptModuleContents

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

const removeDuplicates = (input: string[]) => Array.from(new Set(input))

export async function writeGitIgnore(ignores: string[]) {
  // Add wildcard to ignore in workspace directories as well.
  // biome-ignore lint/style/noParameterAssign: Easier in this case.
  ignores = ignores.map((ignore) => (ignore.includes('/') ? `**/${ignore}` : ignore))

  let userIgnores = state.options.ignore ?? state.options.gitignore ?? ([] as string[])

  if (typeof userIgnores === 'string' && Object.hasOwn(ignore.templates, userIgnores)) {
    userIgnores = ignore.templates[userIgnores] as string[]
  }

  if (!(userIgnores && Array.isArray(userIgnores))) {
    log('Invalid gitignore configuration, must be an array', 'error')
    return false
  }

  userIgnores = removeDuplicates([...userIgnores, ...ignores, ...(state.root ? state.pendingIgnores : [])])

  const file = ignore.createFile(userIgnores as string[])

  // .gitignore file creation is only forced in root.
  if (existsSync(root(file.name))) {
    await addAdditionalGitignoreEntries(file)
  } else if (state.root) {
    await Bun.write(root(file.name), file.contents)
  } else {
    state.pendingIgnores.push(...userIgnores)
  }

  return Object.hasOwn(state.options, 'ignore') || Object.hasOwn(state.options, 'gitignore')
}

export async function getWorkspaces() {
  const packageJson = await Bun.file(root('./package.json')).json()
  const workspaces: { path: string; root: boolean }[] = []

  if (Array.isArray(packageJson.workspaces)) {
    for (const workspaceGlob of packageJson.workspaces) {
      const files = await glob(workspaceGlob, {
        cwd: root('/'),
        dot: false,
        onlyFiles: false,
        followSymbolicLinks: false,
        ignore: ['node_modules'],
      })
      for await (const file of files) {
        if (lstatSync(root(file)).isDirectory()) {
          workspaces.push({ path: file, root: false })
        }
      }
    }
  }

  workspaces.push({ path: '/', root: true }) // Always run in root, root should run last.

  return workspaces
}

function findNearestNodeModules() {
  let currentDirectory = root('.')
  while (true) {
    const nodeModulesPath = join(currentDirectory, 'node_modules')
    if (existsSync(nodeModulesPath)) {
      return nodeModulesPath
    }
    const parentDirectory = dirname(currentDirectory)
    if (parentDirectory === currentDirectory) {
      break
    }
    currentDirectory = parentDirectory
  }

  const localModuleDirectory = root('node_modules')

  mkdirSync(localModuleDirectory, { recursive: true })
  return localModuleDirectory
}

export function installLocalDependencies() {
  const { localDependencies } = state.packageJson
  if (!localDependencies || typeof localDependencies !== 'object' || Object.keys(localDependencies).length === 0) {
    return
  }

  for (const [name, folder] of Object.entries(localDependencies)) {
    const absolutePath = root(folder)
    const targetPath = join(findNearestNodeModules(), name)
    if (existsSync(absolutePath) && !existsSync(targetPath)) {
      try {
        symlinkSync(absolutePath, targetPath)
      } catch (_error) {
        // Symlinks only allowed for administrators on Windows.
        log(`Failed to create symlink for localDependency ${name}`, 'warning')
      }
    } else if (!existsSync(absolutePath)) {
      log(`localDependency "${name}" is pointing to a non-existing location: ${absolutePath}`, 'warning')
    }
  }
}
