import { staticPlugin } from '@elysiajs/static'
import { Elysia } from 'elysia'

const { server } = new Elysia().use(staticPlugin({ prefix: '/' })).listen(3000)

console.log(`Serving /public on ${server.url.href}`)
