export const templates = {
  recommended: {
    compilerOptions: {
      strict: true,
    },
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object) {
  return { name: 'tsconfig.json', contents: JSON.stringify(configuration, null, 2) }
}
