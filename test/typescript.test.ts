import { expect, test } from 'bun:test'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

test('Typechecks a project.', async () => {
  const fixturePath = './test/fixture/typescript'

  writeFileSync(join(fixturePath, 'first.ts'), 'export const first = 1')
  mkdirSync(join(fixturePath, 'modules'), { recursive: true })
  writeFileSync(join(fixturePath, 'modules/second.ts'), 'export const second = "2"')

  writeFileSync(
    join(fixturePath, 'index.ts'),
    `import { first } from 'first'
import { second } from '@/second'

let result = first * second`,
  )

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'tsconfig.json'))).toBe(true)
  const tsconfigFile = await Bun.file(join(fixturePath, 'tsconfig.json')).json()
  expect(tsconfigFile.compilerOptions.paths['*']).toEqual(['./*'])
  expect(tsconfigFile.compilerOptions.paths['@/*']).toEqual(['./modules/*'])

  let output: string
  try {
    output = execSync('bun types', {
      cwd: fixturePath,
      stdio: 'pipe', // Captures stdout/stderr instead of just printing it
      encoding: 'utf8', // Returns a string instead of a Buffer
    })
  } catch (error) {
    output = error.stdout
  }

  // Cannot multiply a string by a number.
  expect(output).toContain('arithmetic operation')
  expect(output).toContain("'number'")
})
