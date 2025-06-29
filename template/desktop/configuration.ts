import { defineConfig as definePlaywrightConfig } from '@playwright/test'
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export const gitignore = ['node_modules', 'bun.lock', 'dist', 'executable', 'test-results', 'test/screenshots']
export const vscode = 'biome'
export const biome = {
  extends: 'recommended',
  linter: { rules: { correctness: { noNodejsModules: 'off' } } },
  files: { includes: ['**/*', '!executable'] },
}
export const typescript = { extends: 'web', compilerOptions: { types: ['@rsbuild/core/types'] }, include: ['index.tsx'] }

export const rsbuild = defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './index.tsx',
    },
  },
  html: {
    title: 'Electron ESM Template',
    tags: [
      {
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'",
        },
      },
    ],
  },
  output: {
    // Required especially for Electron as it's using the file:// protocol without a domain.
    assetPrefix: './',
  },
})

export const playwright = definePlaywrightConfig({
  testDir: './test',
})
