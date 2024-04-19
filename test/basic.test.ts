import { expect, test } from 'bun:test'
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

test('Adds configuration files for basic package setup.', () => {
  const fixturePath = './test/fixture/package'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'prettier.config.js'))).toBe(true)
  expect(existsSync(join(fixturePath, 'biome.json'))).toBe(true)
})

test('Adds configuration files for basic file setup.', () => {
  const fixturePath = './test/fixture/file'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'prettier.config.js'))).toBe(true)
})

test('Extends existing configurations.', () => {
  const fixturePath = './test/fixture/extends'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'eslint.config.js'))).toBe(true)
  expect(existsSync(join(fixturePath, 'tsconfig.json'))).toBe(true)
})
