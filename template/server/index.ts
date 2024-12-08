import { cors } from '@elysiajs/cors'
import { eq } from 'drizzle-orm'
import { api, route } from 'eipiai'
import { eipiai } from 'eipiai/elysia'
import { Elysia } from 'elysia'
import { z } from 'zod'
import { connect } from './database'
import * as schema from './schema'

export const routes = api({
  posts: route()(async ({ context: { uid } }) => {
    return await connect().query.posts.findMany({
      columns: {
        id: true,
        text: true,
      },
      where: eq(schema.posts.uid, uid),
    })
  }),
  addPost: route(
    z.object({
      text: z.string().max(140),
    }),
  )(async ({ error, context: { uid } }, { text }) => {
    if (typeof uid !== 'string' || uid.length !== 36) {
      return error('Invalid UID!')
    }
    const posts = await connect()?.insert(schema.posts).values({ text, uid }).returning({ id: schema.posts.id })
    return posts[0].id
  }),
})

const port = 3000

new Elysia()
  .use(cors())
  .use(eipiai(routes, { path: 'data' }))
  .listen(port)

console.log(`Server running on port ${port}!`)
