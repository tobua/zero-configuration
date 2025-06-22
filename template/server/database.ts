import { neon } from '@neondatabase/serverless'
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

let database: NeonHttpDatabase<typeof schema>

export function connect() {
  if (database) {
    return database
  }

  try {
    database = drizzle(neon(process.env.DATABASE_URL as string), { schema })
  } catch (_error) {
    console.error('Failed to connect to drizzle database.')
  }
  return database
}
