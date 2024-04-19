export const templates = {
  recommended: {
    extends: ['eslint:recommended'],
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object) {
  return { name: 'eslint.config.js', contents: `export default [${JSON.stringify(configuration, null, 2)}]` }
}
