#!/usr/bin/env bun
import Bun from 'bun'
import { configurations } from './configuration'
import { findConfiguration, log, writeGitIgnore } from './helper'
import { parse } from './parse'
import { state } from './state'

const ignores: string[] = []

await findConfiguration()

for (const { name, alias, configuration } of configurations) {
  const value = state.options[name] ?? (alias && state.options[alias])
  if (!value) continue
  const file = await parse(value, configuration)
  if (!file) continue
  await Bun.write(file.name, file.contents)
  ignores.push(file.name)
}

const gitUserConfigured = await writeGitIgnore(ignores)

if (!gitUserConfigured && ignores.length === 0) {
  log('No configuration to add', 'warning')
}
