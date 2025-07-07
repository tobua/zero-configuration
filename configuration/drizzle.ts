import process from 'node:process'
import { state } from '../state'

export const templates = {
  basic: {
    dialect: 'postgresql',
    schema: './schema.ts',
    out: './drizzle',
    dbCredentials: {
      url: process.env.DATABASE_URL,
    },
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object | string) {
  let contents = `import { drizzle } from './configuration.${state.extension}'

export default drizzle`

  if (typeof configuration === 'object' && state.extension === 'json') {
    contents = `export default ${JSON.stringify(configuration, null, 2)}`
  }

  return { name: `drizzle.config.${state.extension === 'json' ? 'js' : state.extension}`, contents }
}
