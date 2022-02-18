import { Router } from 'itty-router'
import Landing from './landing'
import GetActivationBlock from './handlers/activation/getactivationblock'
import GetRegisteredUsersNonce from './handlers/activation/getregisteredusersnonce'
import GetUser from './handlers/activation/getuser'
import GetUserId from './handlers/activation/getuserid'
import MinerAtBlock from './handlers/mining/mineratblock'
import MiningStatsAtBlock from './handlers/mining/miningstatsatblock'
import StackerAtCycle from './handlers/stacking/stackeratcycle'
import StackingStatsAtCycle from './handlers/stacking/stackingstatsatcycle'
import StacksBlockHeight from './handlers/stacks/stacksblockheight'
import TotalSupply from './handlers/token/totalsupply'

const router = Router()

router
  .get('/', Landing)
  .get('/stacks-block-height', StacksBlockHeight)
  .get('/activation/get-activation-block/:cityname', GetActivationBlock)
  .get('/activation/get-registered-users-nonce/:cityname', GetRegisteredUsersNonce)
  .get('/activation/get-user/:cityname/:userid', GetUser)
  .get('/activation/get-user-id/:cityname/:address', GetUserId)
  .get('/mining/mining-stats-at-block/:cityname/:blockheight', MiningStatsAtBlock)
  .get('/mining/miner-at-block/:cityname/:blockheight/:address', MinerAtBlock)
  .get('/stacking/stacking-stats-at-cycle/:cityname/:cycleid', StackingStatsAtCycle)
  .get('/stacking/stacker-at-cycle/:cityname/:cycleid/:userid', StackerAtCycle)
  .get('/token/total-supply/:cityname', TotalSupply)
  .get('*', () => new Response("Resource not found, please check the URL.", { status: 404 }))

export const handleRequest = (request: Request):Response => router.handle(request)
