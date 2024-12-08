import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  text: varchar('title', { length: 140 }),
  uid: varchar('uid', { length: 36 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
