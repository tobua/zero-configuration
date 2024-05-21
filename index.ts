#!/usr/bin/env bun
import { configurations } from './configuration'
import { findConfiguration, getWorkspaces, installLocalDependencies, writeFile, writeGitIgnore } from './helper'
import { log } from './log'
import { parse } from './parse'
import { reset, state } from './state'
import type { File } from './types'

async function configureProject() {
  const ignores: string[] = []

  await findConfiguration()

  for (const { name, alias, configuration } of configurations) {
    const value = state.options[name] ?? (alias && state.options[alias])
    if (!value) continue
    const files = await parse(value, configuration)
    if (!files) continue
    if (Array.isArray(files)) {
      for (const file of files.filter((item) => item?.name)) {
        const name = await writeFile(file as File)
        ignores.push(name)
      }
    } else {
      const name = await writeFile(files as File)
      ignores.push(name)
    }
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
