import type { ConfigurationKeys } from './configuration'

export type Template<T> = { [key: string]: T | (() => T) }

type Dependencies = { [key: string]: string }

export type PackageJson = {
  name: string
  author?: string | { name: string }
  localDependencies?: Dependencies
  configuration?: { [key: string]: string | object | string[] }
}

export type File = { name: string; contents: string; commitFile?: boolean }

export type Configuration = {
  name: ConfigurationKeys
  alias?: ConfigurationKeys
  configuration: {
    templates?: Template<string | object | string[]>
    // biome-ignore lint/suspicious/noExplicitAny: Will be specified in file explicitly.
    createFile: (value?: any) => File | (File | undefined)[] | undefined
    extension?: (path: string) => object
  }
}

export type Option = string | { extends?: string; folder?: string } | true
export type Options = Option | Option[]

export interface State {
  options: { [Key in ConfigurationKeys]?: Options }
  // Where does the configuration come from package.json => configuration: json
  extension: 'ts' | 'js' | 'json' | 'cjs' | 'mjs'
  packageJson: PackageJson
  directory: string
  root: boolean
  pendingIgnores: string[]
}
