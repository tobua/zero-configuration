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
      verbatimModuleSyntax: true,
      target: 'ES2020',
      lib: ['DOM', 'ES2020'],
      module: 'Preserve',
      noEmit: true,
    },
  },
  web: {
    compilerOptions: {
      skipLibCheck: true,
      baseUrl: '.',
      target: 'ESNext',
      lib: ['DOM', 'ESNext'],
      module: 'Preserve',
      jsx: 'react-jsx',
      noEmit: true,
    },
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object) {
  return { name: 'tsconfig.json', contents: JSON.stringify(configuration, null, 2) }
}
