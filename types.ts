export type Template<T = object> = { [key: string]: T }

export type Configuration = {
  name: string
  alias?: string
  configuration: {
    templates: Template
    // biome-ignore lint/suspicious/noExplicitAny: Will be specified in file explicitly.
    createFile: (value?: any) => { name: string; contents: string }
    extension?: (path: string) => object
  }
}
