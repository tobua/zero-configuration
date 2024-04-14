export const templates = {
  recommended: {
    extends: ['eslint:recommended'],
  },
}

export function createFile(configuration: object) {
  return { name: 'eslint.config.js', contents: `export default [${configuration}]` }
}
