import { expect, test } from 'bun:test'
import { execSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import Bun from 'bun'

// To include additional files in fixtures remove the ignore entries temporarly from .gitignore in root and fixtures and add the specific files needed.

test('Adds configuration files for basic package setup.', async () => {
  const fixturePath = './test/fixture/package'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'prettier.config.js'))).toBe(true)
  expect(existsSync(join(fixturePath, '.prettierignore'))).toBe(true)
  expect(existsSync(join(fixturePath, 'biome.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'LICENSE.md'))).toBe(true)
  expect(existsSync(join(fixturePath, 'vercel.json'))).toBe(true)
  expect(existsSync(join(fixturePath, '.gitignore'))).toBe(true)

  const gitignoreFile = await Bun.file(join(fixturePath, '.gitignore')).text()

  expect(gitignoreFile.includes('vercel.json')).toBe(false)
  expect(gitignoreFile).toContain('biome.json')
})

test('Adds configuration files for basic file setup.', async () => {
  const fixturePath = './test/fixture/file'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'prettier.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, '.prettierignore'))).toBe(true)
  expect(existsSync(join(fixturePath, 'playwright.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'biome.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'vitest.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'cypress.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'drizzle.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'app.json'))).toBe(true)
  // TODO should not work with TS.
  expect(existsSync(join(fixturePath, 'eslint.config.js'))).toBe(true)

  expect(await Bun.file(join(fixturePath, 'biome.json')).text()).not.toContain('recommended')

  const cypressConfig = await import(join('..', fixturePath, 'cypress.config.ts'))
  // Configuration not serialized.
  expect(typeof cypressConfig.default.e2e.dynamic === 'function').toBe(true)

  const prettierIgnoreFile = await Bun.file(join(fixturePath, '.prettierignore')).text()
  expect(prettierIgnoreFile).toContain('dist')
  expect(prettierIgnoreFile).toContain('test')
})

test('Also parses JavaScript configuration.', async () => {
  const fixturePath = './test/fixture/file-javascript'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, '.gitignore'))).toBe(true)
  expect(await Bun.file(join(fixturePath, '.gitignore')).text()).toContain('please-ignore.js')
  expect(existsSync(join(fixturePath, 'babel.config.js'))).toBe(true)
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
  expect(existsSync(join(fixturePath, '.vscode/settings.json'))).toBe(true)
  expect(existsSync(join(fixturePath, '.vscode/extensions.json'))).toBe(true)

  const biome = await Bun.file(join(fixturePath, 'biome.json')).json()

  expect(biome.files.ignore[3]).toBe('test/fixture')
  expect(biome.linter.rules.all).toBe(true)
  expect(biome.linter.rules.style.useBlockStatements).toBe('off')

  const tsconfig = await Bun.file(join(fixturePath, 'tsconfig.json')).json()

  expect(tsconfig.extends).toContain('my-shared-tsconfig')

  const gitignore = await Bun.file(join(fixturePath, '.gitignore')).text()

  expect(gitignore.match(/test-results/g)).toHaveLength(1)
  expect(gitignore.match(/dist/g)).toHaveLength(1)
  expect(gitignore.match(/node_modules/g)).toHaveLength(1)
  expect(gitignore.match(/extends:bundle/g)).toBe(null)
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

  expect(existsSync(join(fixturePath, 'rsbuild.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'vite.config.ts'))).toBe(true)
  expect(existsSync(join(fixturePath, 'tailwind.config.ts'))).toBe(true)
  // Only work with JavaScript configuration or serializable configuration.
  // Not serializable in this case.
  expect(existsSync(join(fixturePath, 'next.config.js'))).toBe(false)
  // JavaScript only, but defined in package.json.
  expect(existsSync(join(fixturePath, 'postcss.config.ts'))).toBe(true)
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
  expect(gitignore.match(/\.vscode/g)).toHaveLength(1)
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

test("Doesn't add deployment files to gitignore in CI.", async () => {
  const fixturePath = './test/fixture/package'

  // TODO existing ignores should not be taken over.
  rmSync(join(fixturePath, '.gitignore'))

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
    env: {
      ...process.env,
      // biome-ignore lint/style/useNamingConvention: Casing used by Node.js.
      CI: 'true',
    },
  })

  expect(existsSync(join(fixturePath, 'vercel.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'metro.config.js'))).toBe(true)
  expect(existsSync(join(fixturePath, '.gitignore'))).toBe(true)
  expect(existsSync(join(fixturePath, 'app.json'))).toBe(true)

  const gitignoreFile = await Bun.file(join(fixturePath, '.gitignore')).text()

  expect(gitignoreFile).not.toContain('vercel.json')
  expect(gitignoreFile).toContain('biome.json')
})

test('Also parses JavaScript configuration.', async () => {
  const fixturePath = './test/fixture/file-commonjs'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, '.gitignore'))).toBe(true)
  expect(await Bun.file(join(fixturePath, '.gitignore')).text()).toContain('numic')
  expect(existsSync(join(fixturePath, 'babel.config.cjs'))).toBe(true)
  expect(existsSync(join(fixturePath, 'metro.config.cjs'))).toBe(true)
  expect(existsSync(join(fixturePath, 'tsconfig.json'))).toBe(true)
  expect(await Bun.file(join(fixturePath, 'tsconfig.json')).text()).toContain('react-native')
  expect(existsSync(join(fixturePath, 'app.json'))).toBe(true)

  const metroFile = await Bun.file(join(fixturePath, 'metro.config.cjs')).text()

  expect(metroFile).toContain('unstable_enablePackageExports')
})

test('Can add multiple files.', async () => {
  const fixturePath = './test/fixture/multiple'

  execSync('bun ./../../../index.ts', {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  expect(existsSync(join(fixturePath, 'tsconfig.json'))).toBe(true)
  expect(await Bun.file(join(fixturePath, 'tsconfig.json')).text()).toContain('"strict": true')
  expect(existsSync(join(fixturePath, 'test/tsconfig.json'))).toBe(true)
  expect(await Bun.file(join(fixturePath, 'test/tsconfig.json')).text()).toContain('noUncheckedIndexedAccess')
  expect(existsSync(join(fixturePath, 'demo/web/tsconfig.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'demo/mobile/tsconfig.json'))).toBe(true)
  expect(existsSync(join(fixturePath, 'api/tsconfig.json'))).toBe(true)
  // Make sure folders are removed.
  expect(await Bun.file(join(fixturePath, 'demo/web/tsconfig.json')).text()).not.toContain('demo/web')
  expect(await Bun.file(join(fixturePath, 'api/tsconfig.json')).text()).not.toContain('api')
  // Can use regular extend of file as well.
  expect(await Bun.file(join(fixturePath, 'demo/mobile/tsconfig.json')).text()).toContain('"extends": "../tsconfig.json"')
})
