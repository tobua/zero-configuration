import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export const rsbuild = defineConfig({
  extends: 'web',
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './index.tsx',
    },
  },
  html: {
    title: 'zero-configuration Template',
  },
})

export const gitignore = 'bundle'
export const vscode = 'biome'
export const biome = {
  extends: 'recommended',
  linter: {
    rules: {
      style: {
        useFilenamingConvention: 'off',
        noImplicitBoolean: 'off',
        useNamingConvention: 'off',
      },
    },
  },
  files: {
    ignore: ['dist', 'rsbuild.config.ts'],
  },
}

export const typescript = {
  extends: 'web',
  include: ['index.tsx'],
}
