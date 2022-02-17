import { Router } from 'itty-router'

import MinerAtBlock from './handlers/mineratblock'
import MiningStatsAtBlock from './handlers/miningstatsatblock'
import StacksBlockHeight from './handlers/stacksblockheight'
import TotalSupply from './handlers/totalsupply'

const router = Router()

router
  .get('/stacks-block-height', StacksBlockHeight)
  .get('/mining-stats-at-block', MiningStatsAtBlock)
  .get('/mining-stats-at-block/:cityname/:blockheight', MiningStatsAtBlock)
  .get('/miner-at-block/:cityname/:blockheight/:address', MinerAtBlock)
  .get('/total-supply/:cityname', TotalSupply)
  .get('*', () => new Response("Not found", { status: 404 }))

export const handleRequest = (request: Request):Response => router.handle(request)
