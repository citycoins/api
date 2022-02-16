import { Router } from 'itty-router'
import StacksBlockHeight from './handlers/stacksblockheight'

const router = Router()

router
  .get('/stacks-block-height', StacksBlockHeight)
  .get('*', () => new Response("Not found", { status: 404 }))

export const handleRequest = (request: Request): string => router.handle(request)
