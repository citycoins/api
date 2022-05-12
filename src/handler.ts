import { Router } from 'itty-router'
import Landing from './handlers/landing'
import Documentation from './handlers/documentation'
import GetStacksBlockHeight from './handlers/stacks/getstacksblockheight'
import GetBnsName from './handlers/stacks/getbnsname'
import GetStxBalance from './handlers/stacks/getstxbalance'
import GetDateAtBlock from './handlers/stacks/getdateatblock'
import GetActivationBlock from './handlers/activation/getactivationblock'
import GetRegisteredUsersNonce from './handlers/activation/getregisteredusersnonce'
import GetUser from './handlers/activation/getuser'
import GetUserId from './handlers/activation/getuserid'
import GetBlockWinnerId from './handlers/mining/getblockwinnerid'
import GetLastHighValueAtBlock from './handlers/mining/getlasthighvalueatblock'
import GetMinerAtBlock from './handlers/mining/getmineratblock'
import GetMiningStatsAtBlock from './handlers/mining/getminingstatsatblock'
import HasMinedAtBlock from './handlers/mining/hasminedatblock'
import CanClaimMiningReward from './handlers/miningclaims/canclaimminingreward'
import IsBlockWinner from './handlers/miningclaims/isblockwinner'
import GetFirstStacksBlockInRewardCycle from './handlers/stacking/getfirststacksblockinrewardcycle'
import GetRewardCycle from './handlers/stacking/getrewardcycle'
import GetStackerAtCycle from './handlers/stacking/getstackeratcycle'
import GetStackingStatsAtCycle from './handlers/stacking/getstackingstatsatcycle'
import StackingActiveAtCycle from './handlers/stacking/stackingactiveatcycle'
import GetStackingReward from './handlers/stackingclaims/getstackingreward'
import GetBalance from './handlers/token/getbalance'
import GetCoinbaseAmount from './handlers/token/getcoinbaseamount'
import GetCoinbaseAmounts from './handlers/token/getcoinbaseamounts'
import GetCoinbaseThresholds from './handlers/token/getcoinbasethresholds'
import GetTotalSupply from './handlers/token/gettotalsupply'
import GetDecimals from './handlers/token/getdecimals'
import GetName from './handlers/token/getname'
import GetSymbol from './handlers/token/getsymbol'
import GetTokenUri from './handlers/token/gettokenuri'
import GetTokenUriJson from './handlers/token/gettokenurijson'
import GetCityConfiguration from './handlers/tools/getcityconfiguration'
import GetPrices from './handlers/tools/getprices'
import ProofOfHodl from './handlers/tools/proofofhodl'

const router = Router()

router
  // main landing pages
  .get('/', Landing)
  .get('/docs', Documentation)
  // Stacks API wrappers
  .get('/stacks/get-block-height', GetStacksBlockHeight)
  .get('/stacks/get-bns-name/:address', GetBnsName)
  .get('/stacks/get-stx-balance/:address', GetStxBalance)
  .get('/stacks/get-date-at-block/:blockHeight', GetDateAtBlock)
  // Activation functions
  .get('/:version/:cityname/activation/get-activation-block', GetActivationBlock)
  .get('/:version/:cityname/activation/get-registered-users-nonce', GetRegisteredUsersNonce)
  .get('/:version/:cityname/activation/get-user/:userid', GetUser)
  .get('/:version/:cityname/activation/get-user-id/:address', GetUserId)
  // Mining functions
  .get('/:version/:cityname/mining/get-block-winner-id/:blockheight', GetBlockWinnerId)
  .get('/:version/:cityname/mining/get-last-high-value-at-block/:blockheight', GetLastHighValueAtBlock)
  .get('/:version/:cityname/mining/get-miner-at-block/:blockheight/:userid', GetMinerAtBlock)
  .get('/:version/:cityname/mining/get-mining-stats-at-block/:blockheight', GetMiningStatsAtBlock)
  .get('/:version/:cityname/mining/has-mined-at-block/:blockheight/:userid', HasMinedAtBlock)
  // Mining claim functions
  .get('/:version/:cityname/mining-claims/can-claim-mining-reward/:blockheight/:address', CanClaimMiningReward)
  .get('/:version/:cityname/mining-claims/is-block-winner/:blockheight/:address', IsBlockWinner)
  // Stacking functions
  .get('/:version/:cityname/stacking/get-first-stacks-block-in-reward-cycle/:cycleid', GetFirstStacksBlockInRewardCycle)
  .get('/:version/:cityname/stacking/get-reward-cycle/:blockheight', GetRewardCycle)
  .get('/:version/:cityname/stacking/get-stacker-at-cycle/:cycleid/:userid', GetStackerAtCycle)
  .get('/:version/:cityname/stacking/get-stacking-stats-at-cycle/:cycleid', GetStackingStatsAtCycle)
  .get('/:version/:cityname/stacking/stacking-active-at-cycle/:cycleid', StackingActiveAtCycle)
  // Stacking claim functions
  .get('/:version/:cityname/stacking-claims/get-stacking-reward/:cycleid/:userid', GetStackingReward)
  // Token functions
  .get('/:version/:cityname/token/get-balance/:address', GetBalance)
  .get('/:version/:cityname/token/get-coinbase-amount/:blockheight', GetCoinbaseAmount)
  .get('/:version/:cityname/token/get-coinbase-amounts', GetCoinbaseAmounts)
  .get('/:version/:cityname/token/get-coinbase-thresholds', GetCoinbaseThresholds)
  .get('/:version/:cityname/token/get-decimals', GetDecimals)
  .get('/:version/:cityname/token/get-name', GetName)
  .get('/:version/:cityname/token/get-symbol', GetSymbol)
  .get('/:version/:cityname/token/get-token-uri', GetTokenUri)
  .get('/:version/:cityname/token/get-token-uri-json', GetTokenUriJson)
  .get('/:version/:cityname/token/get-total-supply', GetTotalSupply)
  // Tools
  .get('/:version/:cityname/tools/get-city-configuration', GetCityConfiguration)
  .get('/:version/:cityname/tools/prices/:currency?', GetPrices)
  .get('/:version/:cityname/tools/proof-of-hodl/:address', ProofOfHodl)
  .get('/:version/:cityname/tools/proof-of-hold/:address', ProofOfHodl)
  // Default route
  .get('*', (request) => new Response(`Resource not found, please check the URL: ${request.url}`, { status: 404 }))

export const handleRequest = (request: Request):Response => router.handle(request)
