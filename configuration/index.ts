import type { Configuration } from '../types'
import * as biome from './biome'
import * as cypress from './cypress'
import * as eslint from './eslint'
import * as ignore from './gitignore'
import * as license from './license'
import * as next from './next'
import * as playwright from './playwright'
import * as postcss from './postcss'
import * as prettier from './prettier'
import * as rsbuild from './rsbuild'
import * as tailwind from './tailwind'
import * as typescript from './typescript'
import * as vercel from './vercel'
import * as vite from './vite'
import * as vitest from './vitest'
import * as vscode from './vscode'

export { ignore }

export type ConfigurationKeys =
  | 'typescript'
  | 'tsconfig'
  | 'biome'
  | 'eslint'
  | 'prettier'
  | 'vscode'
  | 'playwright'
  | 'vite'
  | 'rsbuild'
  | 'next'
  | 'vitest'
  | 'cypress'
  | 'tailwind'
  | 'tailwindcss'
  | 'postcss'
  | 'vercel'
  | 'license'
  // Require separate logic, not found in configuraitons below.
  | 'ignore'
  | 'gitignore'

export const configurations: Configuration[] = [
  {
    name: 'typescript',
    alias: 'tsconfig',
    configuration: typescript,
  },
  {
    name: 'biome',
    configuration: biome,
  },
  {
    name: 'eslint',
    configuration: eslint,
  },
  {
    name: 'prettier',
    configuration: prettier,
  },
  {
    name: 'vscode',
    configuration: vscode,
  },
  {
    name: 'playwright',
    configuration: playwright,
  },
  {
    name: 'vite',
    configuration: vite,
  },
  {
    name: 'rsbuild',
    configuration: rsbuild,
  },
  {
    name: 'next',
    configuration: next,
  },
  {
    name: 'vitest',
    configuration: vitest,
  },
  {
    name: 'cypress',
    configuration: cypress,
  },
  {
    name: 'tailwind',
    alias: 'tailwindcss',
    configuration: tailwind,
  },
  {
    name: 'postcss',
    configuration: postcss,
  },
  {
    name: 'vercel',
    configuration: vercel,
  },
  {
    name: 'license',
    configuration: license,
  },
]
