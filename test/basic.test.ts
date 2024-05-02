import { expect, test } from 'bun:test'
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import Bun from 'bun'

// To include additional files in fixtures remove the ignore entries temporarly from .gitignore in root and fixtures and add the specific files needed.

test('Adds configuration files for basic package setup.', () => {
  const fixturePath = './test/fixture/package'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'prettier.config.js'))).toBe(true)
  expect(existsSync(join(fixturePath, 'biome.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'LICENSE.md'))).toBe(true)
})

test('Adds configuration files for basic file setup.', async () => {
  const fixturePath = './test/fixture/file'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'prettier.config.js'))).toBe(true)
  expect(existsSync(join(fixturePath, 'playwright.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'biome.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'vitest.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'cypress.config.ts'))).toBe(true)
  // TODO should not work with TS.
  expect(existsSync(join(fixturePath, 'eslint.config.js'))).toBe(true)

  expect(await Bun.file(join(fixturePath, 'biome.json')).text()).not.toContain('recommended')

  const cypressConfig = await import(join('..', fixturePath, 'cypress.config.ts'))
  // Configuration not serialized.
  expect(typeof cypressConfig.default.e2e.dynamic === 'function').toBe(true)
})

test('Also parses JavaScript configuration.', async () => {
  const fixturePath = './test/fixture/file-javascript'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, '.gitignore'))).toBe(true)
  expect(await Bun.file(join(fixturePath, '.gitignore')).text()).toContain('please-ignore.js')
})

test('Extends existing configurations.', async () => {
  const fixturePath = './test/fixture/extends'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'eslint.config.js'))).toBe(true)
  expect(existsSync(join(fixturePath, 'tsconfig.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'biome.json'))).toBe(true)

  const biome = await Bun.file(join(fixturePath, 'biome.json')).json()

  expect(biome.files.ignore[2]).toBe('test/fixture')
  expect(biome.linter.rules.all).toBe(true)
  expect(biome.linter.rules.style.useBlockStatements).toBe('off')

  const tsconfig = await Bun.file(join(fixturePath, 'tsconfig.json')).json()

  expect(tsconfig.extends).toContain('my-shared-tsconfig')
})

test('Empty project will exit and not add default gitignore.', () => {
  const fixturePath = './test/fixture/empty'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, '.gitignore'))).toBe(false)
})

test('Creates configuration files for various build-tool configurations.', () => {
  const fixturePath = './test/fixture/build'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'next.config.js'))).toBe(true)
  expect(existsSync(join(fixturePath, 'rsbuild.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'vite.config.ts'))).toBe(true)
})

test('Creates configuration files in all workspaces including the root.', async () => {
  const fixturePath = './test/fixture/workspaces'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'tsconfig.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'demo/react/tsconfig.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'plugin/tsconfig.json'))).toBe(true)

  // Ignores are merged into root and not duplicated.
  const gitignore = await Bun.file(join(fixturePath, '.gitignore')).text()
  expect(gitignore.match(/tsconfig\.json/g)).toHaveLength(1)
  expect(gitignore.match(/vite\.config\.ts/g)).toHaveLength(1)
  expect(gitignore.match(/\*\*\/\.vscode\/settings\.json/g)).toHaveLength(1)
  expect(gitignore.match(/dist/g)).toHaveLength(1)
  expect(gitignore.match(/node_modules/g)).toHaveLength(1)
})

test('Will also install local dependencies if listed.', () => {
  const fixturePath = './test/fixture/local-dependencies'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'tsconfig.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'node_modules/keep/package.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'node_modules/empty-dependency/package.json'))).toBe(true)
})
