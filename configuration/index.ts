import type { Configuration } from '../types'
import * as biome from './biome'
import * as eslint from './eslint'
import * as ignore from './gitignore'
import * as license from './license'
import * as playwright from './playwright'
import * as prettier from './prettier'
import * as rsbuild from './rsbuild'
import * as typescript from './typescript'
import * as vite from './vite'
import * as vscode from './vscode'

export { ignore }

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
    name: 'license',
    configuration: license,
  },
]
