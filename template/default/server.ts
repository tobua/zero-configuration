import { staticPlugin } from '@elysiajs/static'
import { Elysia } from 'elysia'

new Elysia().use(staticPlugin({ prefix: '/' })).listen(3000)

console.log('Serving /public on localhost:3000')
