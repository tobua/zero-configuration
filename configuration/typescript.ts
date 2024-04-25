export const templates = {
  recommended: {
    compilerOptions: {
      strict: true,
    },
  },
  plugin: {
    compilerOptions: {
      strict: true,
      skipLibCheck: true,
      target: 'ES2020',
      lib: ['DOM', 'ES2020'],
      module: 'Preserve',
    },
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object) {
  return { name: 'tsconfig.json', contents: JSON.stringify(configuration, null, 2) }
}
