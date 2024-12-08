import { expect, test } from 'bun:test'
import { client } from 'eipiai'
import type { routes } from './index'
import { seed } from './seed'
import './index' // Start server.

const { uid } = await seed()

const server = client<typeof routes>({
  url: 'http://localhost:3000/data',
  context: { uid },
})

test('Initially there are two posts.', async () => {
  const { data } = await server.posts()
  expect(data.length).toBe(2)
}, 10000) // Generous initial timeout for external database to wake up.

test('Inserts a new post.', async () => {
  const { data: id } = await server.addPost({ text: 'Third post?' })

  expect(id).toBeNumber()

  const { data: posts } = await server.posts()

  expect(posts.length).toBe(3)
  expect(posts[2].text).toBe('Third post?')
})
