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
