import { expect, test } from 'bun:test'
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

test('Lints a project, reports and fixes errors.', async () => {
  const fixturePath = './test/fixture/biome'

  writeFileSync(
    join(fixturePath, 'index.ts'),
    `const count = 10
let result = count * 2;`,
  )

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'biome.json'))).toBe(true)
  expect(existsSync(join(fixturePath, '.gitignore'))).toBe(true)
  const gitignoreFile = await Bun.file(join(fixturePath, '.gitignore')).text()
  expect(gitignoreFile).toContain('biome.json')

  const output = execSync('bun run lint', {
    cwd: fixturePath,
    stdio: 'pipe',
    encoding: 'utf-8',
  })

  expect(output).toContain('- index.ts')
  expect(output).toContain('Checked 3 files') // Time can vary.
  expect(output).toContain('Fixed 2 files.')
  expect(output).toContain('Found 1 warning.')

  const fixedContent = readFileSync(join(fixturePath, 'index.ts'), 'utf-8')

  expect(fixedContent).not.toContain('let')
  expect(fixedContent).not.toContain(';')
})
