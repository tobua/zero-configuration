import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export const rsbuild = defineConfig({
  // @ts-ignore Defaults added by zero-configuration.
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
  tools: {
    rspack: {
      resolve: {
        alias: {
          react: 'epic-jsx',
          'react/jsx-runtime': 'epic-jsx',
          'react/jsx-dev-runtime': 'epic-jsx',
        },
      },
    },
  },
})

export const gitignore = 'bundle'
export const vscode = 'biome'
export const biome = {
  extends: 'epic',
  linter: {
    rules: {
      correctness: {
        noUndeclaredDependencies: 'off', // Absolute imports.
      },
    },
  },
  files: {
    ignore: ['dist', 'rsbuild.config.ts'],
  },
}

export const typescript = {
  extends: 'web',
  compilerOptions: {
    paths: {
      react: ['./node_modules/epic-jsx'],
      'react/jsx-runtime': ['./node_modules/epic-jsx'],
      'react/jsx-dev-runtime': ['./node_modules/epic-jsx'],
    },
  },
  include: ['index.tsx'],
}
