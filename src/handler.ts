import { Router } from 'itty-router'
import Landing from './landing'
import GetActivationBlock from './handlers/activation/getactivationblock'
import GetRegisteredUsersNonce from './handlers/activation/getregisteredusersnonce'
import GetUser from './handlers/activation/getuser'
import GetUserId from './handlers/activation/getuserid'
import GetMinerAtBlock from './handlers/mining/getmineratblock'
import GetMiningStatsAtBlock from './handlers/mining/getminingstatsatblock'
import GetRewardCycle from './handlers/stacking/getrewardcycle'
import GetStackerAtCycle from './handlers/stacking/getstackeratcycle'
import GetStackingStatsAtCycle from './handlers/stacking/getstackingstatsatcycle'
import StacksBlockHeight from './handlers/stacks/stacksblockheight'
import GetTotalSupply from './handlers/token/gettotalsupply'

const router = Router()

router
  .get('/', Landing)
  .get('/stacks-block-height', StacksBlockHeight)
  .get('/activation/get-activation-block/:cityname', GetActivationBlock)
  .get('/activation/get-registered-users-nonce/:cityname', GetRegisteredUsersNonce)
  .get('/activation/get-user/:cityname/:userid', GetUser)
  .get('/activation/get-user-id/:cityname/:address', GetUserId)
  .get('/mining/get-mining-stats-at-block/:cityname/:blockheight', GetMiningStatsAtBlock)
  .get('/mining/get-miner-at-block/:cityname/:blockheight/:address', GetMinerAtBlock)
  .get('/stacking/get-stacking-stats-at-cycle/:cityname/:cycleid', GetStackingStatsAtCycle)
  .get('/stacking/get-stacker-at-cycle/:cityname/:cycleid/:userid', GetStackerAtCycle)
  .get('/stacking/get-reward-cycle/:cityname/:blockheight', GetRewardCycle)
  .get('/token/get-total-supply/:cityname', GetTotalSupply)
  .get('*', () => new Response("Resource not found, please check the URL.", { status: 404 }))

export const handleRequest = (request: Request):Response => router.handle(request)
