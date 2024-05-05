import { staticPlugin } from '@elysiajs/static'
import { Elysia } from 'elysia'

new Elysia().use(staticPlugin({ assets: 'dist' })).listen(3000)
