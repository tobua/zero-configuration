export const templates = {
  recommended: {
    compilerOptions: {
      strict: true,
    },
  },
  plugin: {
    compilerOptions: {
      // Maximum strictness for compatibility.
      strict: true,
      noUncheckedIndexedAccess: true,
      noImplicitOverride: true,
      // Many existing definitions will error.
      skipLibCheck: true,
      // Force type annotations for imports.
      verbatimModuleSyntax: true,
      // Reasonably current target.
      target: 'ES2020',
      lib: ['DOM', 'ES2020'],
      // Implies module resolution through bundler.
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
  'react-native': {
    extends: '@react-native/typescript-config/tsconfig.json',
    compilerOptions: {
      module: 'Preserve',
      moduleResolution: 'Bundler',
    },
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object) {
  return { name: 'tsconfig.json', contents: JSON.stringify(configuration, null, 2) }
}
