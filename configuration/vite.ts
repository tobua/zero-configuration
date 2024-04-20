export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object) {
  return { name: 'vite.config.js', contents: `export default ${JSON.stringify(configuration, null, 2)}` }
}
