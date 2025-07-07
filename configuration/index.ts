import { state } from '../state'
import type { Configuration } from '../types'
import * as babel from './babel'
import * as biome from './biome'
import * as cypress from './cypress'
import * as drizzle from './drizzle'
import * as eslint from './eslint'
import * as ignore from './gitignore'
import * as license from './license'
import * as metro from './metro'
import * as next from './next'
import * as playwright from './playwright'
import * as postcss from './postcss'
import * as prettier from './prettier'
import * as reactNative from './react-native'
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
  | 'farm'
  | 'next'
  | 'vitest'
  | 'cypress'
  | 'tailwind'
  | 'tailwindcss'
  | 'postcss'
  | 'babel'
  | 'metro'
  | 'react-native'
  | 'reactNative'
  | 'drizzle'
  | 'vercel'
  | 'license'
  // Require separate logic, not found in configuraitons below.
  | 'ignore'
  | 'gitignore'

const createFileConfiguration = (name: string) => ({
  extension: (path: string) => ({ extends: path }),
  createFile(configuration: object | string) {
    let contents = `import { ${name} } from './configuration.${state.extension}'
import { extendConfiguration } from 'zero-configuration'

export default extendConfiguration('${name}', ${name})`

    if (typeof configuration === 'object' && state.extension === 'json') {
      contents = `export default ${JSON.stringify(configuration, null, 2)}`
    }

    return { name: `${name}.config.${state.extension === 'json' ? 'js' : state.extension}`, contents }
  },
})

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
    configuration: createFileConfiguration('rsbuild'),
  },
  {
    name: 'farm',
    configuration: createFileConfiguration('farm'),
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
    name: 'babel',
    configuration: babel,
  },
  {
    name: 'metro',
    configuration: metro,
  },
  {
    name: 'drizzle',
    configuration: drizzle,
  },
  {
    name: 'react-native',
    alias: 'reactNative',
    configuration: reactNative,
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
