#!/usr/bin/env bun
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { it } from 'avait'
import Bun from 'bun'
import { create } from 'logua'
import * as biome from './configuration/biome'
import * as eslint from './configuration/eslint'
import * as ignore from './configuration/gitignore'
import * as playwright from './configuration/playwright'
import * as prettier from './configuration/prettier'
import * as typescript from './configuration/typescript'
import * as vscode from './configuration/vscode'
import type { Configuration } from './types'

const log = create('zero-configuration', 'blue')

// TODO validate inputs with zod.

const configurations: Configuration[] = [
  {
    name: 'typescript',
    alias: 'tsconfig',
    configuration: typescript,
  },
  {
    name: 'biome',
    configuration: biome,
  },
  {
    name: 'eslint',
    configuration: eslint,
  },
  {
    name: 'prettier',
    configuration: prettier,
  },
  {
    name: 'vscode',
    configuration: vscode,
  },
  {
    name: 'playwright',
    configuration: playwright,
  },
]

const ignores: string[] = []

const packageJson = await Bun.file('./package.json').json()
// @ts-ignore
const { value: moduleContents } = await it(import(join(process.cwd(), './configuration.ts')))

if (!(moduleContents || Object.hasOwn(packageJson, 'configuration'))) {
  log('No configurations detected', 'error')
}

const userConfiguration = packageJson.configuration ?? moduleContents

for (const { name, alias, configuration } of configurations) {
  const value = userConfiguration[name] ?? (alias && userConfiguration[alias])
  if (!value) continue

  if (typeof value === 'string' && Object.hasOwn(configuration.templates, value)) {
    const configurationTemplate = configuration.templates[value as keyof typeof configuration.templates]
    const file = configuration.createFile(configurationTemplate)
    await Bun.write(file.name, file.contents)
    ignores.push(file.name)
  }

  if (typeof value === 'object') {
    const file = configuration.createFile(value)
    await Bun.write(file.name, file.contents)
    ignores.push(file.name)
  }

  if (value === true) {
    const file = configuration.createFile()
    await Bun.write(file.name, file.contents)
    ignores.push(file.name)
  }
}

if (ignores.length === 0) {
  log('No configurations detected', 'error')
}

let userIgnores: string[] = userConfiguration.ignore ?? userConfiguration.gitignore ?? []

if (typeof userIgnores === 'string' && Object.hasOwn(ignore.templates, userIgnores)) {
  userIgnores = ignore.templates[userIgnores]
}

if (userIgnores && Array.isArray(userIgnores)) {
  userIgnores.push(...ignores)
}

if (!existsSync('./.gitignore')) {
  const file = ignore.createFile(userIgnores)
  await Bun.write(file.name, file.contents)
}
