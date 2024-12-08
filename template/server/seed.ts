import { randomUUID } from 'node:crypto'
import { connect } from './database'
import * as schema from './schema'

// Prefix test UIDs with "test"
const generateTestUid = () => `test${randomUUID().slice(4)}`

export async function seed() {
  await clear()

  console.log('Seeding database...')

  const db = connect()
  const uid = generateTestUid()

  await db.insert(schema.posts).values({
    text: 'First post',
    uid,
  })

  await db.insert(schema.posts).values({
    text: 'Second post!',
    uid,
  })

  console.log('Database seeded!')

  return { uid }
}

export async function clear() {
  console.log('Clearing database...')

  const db = connect()
  const schemas = Object.keys(schema)
    // Relations do not represent actual databases.
    .filter((item) => !item.toLowerCase().includes('relation'))
    // posts table must be deleted last due to dependencies.
    .sort((a, b) => (a === 'posts' ? 1 : b === 'posts' ? -1 : 0))

  for (const name of schemas) {
    await db.delete(schema[name])
  }

  console.log('Database cleared!')
}
