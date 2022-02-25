import { Router } from 'itty-router'
import Landing from './handlers/landing'
import Documentation from './handlers/documentation'
import GetActivationBlock from './handlers/activation/getactivationblock'
import GetRegisteredUsersNonce from './handlers/activation/getregisteredusersnonce'
import GetUser from './handlers/activation/getuser'
import GetUserId from './handlers/activation/getuserid'
import GetMinerAtBlock from './handlers/mining/getmineratblock'
import GetMiningStatsAtBlock from './handlers/mining/getminingstatsatblock'
import GetFirstStacksBlockInRewardCycle from './handlers/stacking/getfirststacksblockinrewardcycle'
import GetRewardCycle from './handlers/stacking/getrewardcycle'
import GetStackerAtCycle from './handlers/stacking/getstackeratcycle'
import GetStackingStatsAtCycle from './handlers/stacking/getstackingstatsatcycle'
import GetStacksBlockHeight from './handlers/stacks/getstacksblockheight'
import GetCoinbaseAmount from './handlers/token/getcoinbaseamount'
import GetCoinbaseThresholds from './handlers/token/getcoinbasethresholds'
import GetTotalSupply from './handlers/token/gettotalsupply'
import GetName from './handlers/token/getname'
import GetSymbol from './handlers/token/getsymbol'
import GetDecimals from './handlers/token/getdecimals'
import GetTokenUri from './handlers/token/gettokenuri'
import GetBalance from './handlers/token/getbalance'
import GetTokenUriJson from './handlers/token/gettokenurijson'
import GetBnsName from './handlers/stacks/getbnsname'
import GetStxBalance from './handlers/stacks/getstxbalance'
import HasMinedAtBlock from './handlers/mining/hasminedatblock'
import GetLastHighValueAtBlock from './handlers/mining/getlasthighvalueatblock'
import GetBlockWinnerId from './handlers/mining/getblockwinnerid'
import StackingActiveAtCycle from './handlers/stacking/stackingactiveatcycle'
import IsBlockWinner from './handlers/miningclaims/isblockwinner'
import CanClaimMiningReward from './handlers/miningclaims/canclaimminingreward'
import GetStackingReward from './handlers/stacking-claims/getstackingreward'

const router = Router()

router
  .get('/', Landing)
  .get('/docs', Documentation)
  .get('/stacks/get-block-height', GetStacksBlockHeight)
  .get('/stacks/get-bns-name/:address', GetBnsName)
  .get('/stacks/get-stx-balance/:address', GetStxBalance)
  .get('/activation/get-activation-block/:cityname', GetActivationBlock)
  .get('/activation/get-registered-users-nonce/:cityname', GetRegisteredUsersNonce)
  .get('/activation/get-user/:cityname/:userid', GetUser)
  .get('/activation/get-user-id/:cityname/:address', GetUserId)
  .get('/mining/get-block-winner-id/:cityname/:blockheight', GetBlockWinnerId)
  .get('/mining/get-mining-stats-at-block/:cityname/:blockheight', GetMiningStatsAtBlock)
  .get('/mining/get-miner-at-block/:cityname/:blockheight/:userid', GetMinerAtBlock)
  .get('/mining/get-last-high-value-at-block/:cityname/:blockheight', GetLastHighValueAtBlock)
  .get('/mining/has-mined-at-block/:cityname/:blockheight/:userid', HasMinedAtBlock)
  .get('/mining-claims/can-claim-mining-reward/:cityname/:blockheight/:address', CanClaimMiningReward)
  .get('/mining-claims/is-block-winner/:cityname/:blockheight/:address', IsBlockWinner)
  .get('/stacking/get-stacking-stats-at-cycle/:cityname/:cycleid', GetStackingStatsAtCycle)
  .get('/stacking/get-stacker-at-cycle/:cityname/:cycleid/:userid', GetStackerAtCycle)
  .get('/stacking/get-reward-cycle/:cityname/:blockheight', GetRewardCycle)
  .get('/stacking/get-first-stacks-block-in-reward-cycle/:cityname/:cycleid', GetFirstStacksBlockInRewardCycle)
  .get('/stacking/stacking-active-at-cycle/:cityname/:cycleid', StackingActiveAtCycle)
  .get('/stacking-claims/get-stacking-reward/:cityname/:cycleid/:userid', GetStackingReward)
  .get('/token/get-coinbase-amount/:cityname/:blockheight', GetCoinbaseAmount)
  .get('/token/get-coinbase-thresholds/:cityname', GetCoinbaseThresholds)
  .get('/token/get-name/:cityname', GetName)
  .get('/token/get-symbol/:cityname', GetSymbol)
  .get('/token/get-decimals/:cityname', GetDecimals)
  .get('/token/get-balance/:cityname/:address', GetBalance)
  .get('/token/get-total-supply/:cityname', GetTotalSupply)
  .get('/token/get-token-uri/:cityname', GetTokenUri)
  .get('/token/get-token-uri-json/:cityname', GetTokenUriJson)
  .get('*', () => new Response("Resource not found, please check the URL.", { status: 404 }))

export const handleRequest = (request: Request):Response => router.handle(request)
