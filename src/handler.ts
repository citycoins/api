import { Router } from 'itty-router'
import Landing from './handlers/landing'
import Documentation from './handlers/documentation'
import * as Stacks from './handlers/stacks'
import * as Activation from './handlers/activation'
import * as Mining from './handlers/mining'
import * as MiningClaims from './handlers/miningclaims'
import * as Stacking from './handlers/stacking'
import * as StackingClaims from './handlers/stackingclaims'
import * as Token from './handlers/token'
import * as Tools from './handlers/tools'

const router = Router()

router
  // main landing pages
  .get('/', Landing)
  .get('/docs', Documentation)
  // Stacks API wrappers
  .get('/stacks/get-block-height', Stacks.GetStacksBlockHeight)
  .get('/stacks/get-bns-name/:address', Stacks.GetBnsName)
  .get('/stacks/get-stx-balance/:address', Stacks.GetStxBalance)
  .get('/stacks/get-date-at-block/:blockHeight', Stacks.GetDateAtBlock)
  // Activation functions
  .get('/:version/:cityname/activation/get-activation-block', Activation.GetActivationBlock)
  .get('/:version/:cityname/activation/get-activation-target', Activation.GetActivationTarget)
  .get('/:version/:cityname/activation/get-city-wallet', Activation.GetCityWallet)
  .get('/:version/:cityname/activation/get-registered-users-nonce', Activation.GetRegisteredUsersNonce)
  .get('/:version/:cityname/activation/get-user/:userid', Activation.GetUser)
  .get('/:version/:cityname/activation/get-user-id/:address', Activation.GetUserId)
  // Mining functions
  .get('/:version/:cityname/mining/get-block-winner-id/:blockheight', Mining.GetBlockWinnerId)
  .get('/:version/:cityname/mining/get-last-high-value-at-block/:blockheight', Mining.GetLastHighValueAtBlock)
  .get('/:version/:cityname/mining/get-miner-at-block/:blockheight/:userid', Mining.GetMinerAtBlock)
  .get('/:version/:cityname/mining/get-mining-stats-at-block/:blockheight', Mining.GetMiningStatsAtBlock)
  .get('/:version/:cityname/mining/has-mined-at-block/:blockheight/:userid', Mining.HasMinedAtBlock)
  // Mining claim functions
  .get('/:version/:cityname/mining-claims/can-claim-mining-reward/:blockheight/:address', MiningClaims.CanClaimMiningReward)
  .get('/:version/:cityname/mining-claims/is-block-winner/:blockheight/:address', MiningClaims.IsBlockWinner)
  // Stacking functions
  .get('/:version/:cityname/stacking/get-first-stacks-block-in-reward-cycle/:cycleid', Stacking.GetFirstStacksBlockInRewardCycle)
  .get('/:version/:cityname/stacking/get-reward-cycle/:blockheight', Stacking.GetRewardCycle)
  .get('/:version/:cityname/stacking/get-stacker-at-cycle/:cycleid/:userid', Stacking.GetStackerAtCycle)
  .get('/:version/:cityname/stacking/get-stacking-stats-at-cycle/:cycleid', Stacking.GetStackingStatsAtCycle)
  .get('/:version/:cityname/stacking/stacking-active-at-cycle/:cycleid', Stacking.StackingActiveAtCycle)
  // Stacking claim functions
  .get('/:version/:cityname/stacking-claims/get-stacking-reward/:cycleid/:userid', StackingClaims.GetStackingReward)
  // Token functions
  .get('/:version/:cityname/token/get-balance/:address', Token.GetBalance)
  .get('/:version/:cityname/token/get-coinbase-amount/:blockheight', Token.GetCoinbaseAmount)
  .get('/:version/:cityname/token/get-coinbase-amounts', Token.GetCoinbaseAmounts)
  .get('/:version/:cityname/token/get-coinbase-thresholds', Token.GetCoinbaseThresholds)
  .get('/:version/:cityname/token/get-decimals', Token.GetDecimals)
  .get('/:version/:cityname/token/get-name', Token.GetName)
  .get('/:version/:cityname/token/get-symbol', Token.GetSymbol)
  .get('/:version/:cityname/token/get-token-uri', Token.GetTokenUri)
  .get('/:version/:cityname/token/get-token-uri-json', Token.GetTokenUriJson)
  .get('/:version/:cityname/token/get-total-supply', Token.GetTotalSupply)
  // Tools
  .get('/tools/get-city-list', Tools.GetCityList)
  .get('/:cityname/tools/get-city-info', Tools.GetCityInfo)
  .get('/tools/get-full-city-info', Tools.GetFullCityInfo)
  .get('/:version/:cityname/tools/get-city-configuration', Tools.GetCityConfiguration)
  .get('/:cityname/tools/get-full-city-configuration', Tools.GetFullCityConfiguration)
  .get('/:version/:cityname/tools/get-prices/:currency?', Tools.GetPrices)
  .get('/:version/:cityname/tools/proof-of-hodl/:address', Tools.ProofOfHodl)
  .get('/:version/:cityname/tools/proof-of-hold/:address', Tools.ProofOfHodl)
  // Default route
  .get('*', (request) => new Response(`Resource not found, please check the URL: ${request.url}`, { status: 404 }))

export const handleRequest = (request: Request):Response => router.handle(request)
