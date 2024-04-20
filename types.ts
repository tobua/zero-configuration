export type Template<T = object> = { [key: string]: T }

export type PackageJson = { name: string; author?: string | { name: string } }

export type Configuration = {
  name: string
  alias?: string
  configuration: {
    templates?: Template | ((packageJson: PackageJson) => string)
    // biome-ignore lint/suspicious/noExplicitAny: Will be specified in file explicitly.
    createFile: (value?: any) => { name: string; contents: string }
    extension?: (path: string) => object
  }
}
