import { Router } from 'itty-router'
import StacksBlockHeight from './handlers/stacksblockheight'
import TotalSupply from './handlers/totalsupply'

const router = Router()

router
  .get('/stacks-block-height', StacksBlockHeight)
  .get('/mia-total-supply', TotalSupply)
  .get('*', () => new Response("Not found", { status: 404 }))

export const handleRequest = (request: Request):Response => router.handle(request)
