#!/usr/bin/env bun
import Bun from 'bun'
import { configurations } from './configuration'
import { findConfiguration, getWorkspaces, installLocalDependencies, writeGitIgnore } from './helper'
import { log } from './log'
import { parse } from './parse'
import { reset, root, state } from './state'

async function configureProject() {
  const ignores: string[] = []

  await findConfiguration()

  for (const { name, alias, configuration } of configurations) {
    const value = state.options[name] ?? (alias && state.options[alias])
    if (!value) continue
    const file = await parse(value, configuration)
    if (!file) continue
    await Bun.write(root(file.name), file.contents)
    ignores.push(file.name)
  }

  const gitUserConfigured = await writeGitIgnore(ignores)

  if (!gitUserConfigured && ignores.length === 0) {
    log('No configuration to add', 'warning')
  }

  installLocalDependencies()
}

for (const workspace of await getWorkspaces()) {
  await reset(workspace)
  await configureProject()
}
