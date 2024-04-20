#!/usr/bin/env bun
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { it } from 'avait'
import Bun from 'bun'
import { configurations, ignore } from './configuration'
import { log, validate } from './helper'
import { parse } from './parse'

const ignores: string[] = []

const packageJson = await Bun.file('./package.json').json()
const { value: moduleContents } = await it(import(join(process.cwd(), './configuration.ts')))

if (!(moduleContents || Object.hasOwn(packageJson, 'configuration'))) {
  log('No configurations detected', 'error')
}

const userConfiguration = packageJson.configuration ?? moduleContents

validate(userConfiguration)

for (const { name, alias, configuration } of configurations) {
  const value = userConfiguration[name] ?? (alias && userConfiguration[alias])
  if (!value) continue
  const file = await parse(value, configuration, packageJson)
  if (!file) continue
  await Bun.write(file.name, file.contents)
  ignores.push(file.name)
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
