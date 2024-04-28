import type { ConfigurationKeys } from './configuration'

export type Template<T> = { [key: string]: T | (() => T) }

type Dependencies = { [key: string]: string }

export type PackageJson = {
  name: string
  author?: string | { name: string }
  localDependencies?: Dependencies
  configuration?: { [key: string]: string | object | string[] }
}

export type Configuration = {
  name: ConfigurationKeys
  alias?: ConfigurationKeys
  configuration: {
    templates?: Template<string | object | string[]>
    // biome-ignore lint/suspicious/noExplicitAny: Will be specified in file explicitly.
    createFile: (value?: any) => { name: string; contents: string }
    extension?: (path: string) => object
  }
}

export type Options = string | { extends?: string } | true

export interface State {
  options: { [Key in ConfigurationKeys]?: Options }
  // Where does the configuration come from package.json => configuration: JSON
  // configuration.js: JavaScript, configuration.ts: TypeScript
  language: 'json' | 'javascript' | 'typescript'
  packageJson: PackageJson
  directory: string
  root: boolean
  pendingIgnores: string[]
}
