import { Router } from 'itty-router'

const router = Router()

router
  .get('/stacks-block-height')
  .get('/totalsupply')
  .get('/blockreward')
  .get('*', () => new Response("Not found", { status: 404 }))

export const handleRequest = (request: Request): string => router.handle(request)
