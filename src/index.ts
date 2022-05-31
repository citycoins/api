import { Router } from 'itty-router'
import {
  getAssetFromKV,
  MethodNotAllowedError,
  NotFoundError,
} from '@cloudflare/kv-asset-handler'
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

// prettier-ignore
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
  .get('/:version/:cityname/mining/get-miner-at-block/:blockheight/:userid/:default?', Mining.GetMinerAtBlock)
  .get('/:version/:cityname/mining/get-mining-stats-at-block/:blockheight/:default?', Mining.GetMiningStatsAtBlock)
  .get('/:version/:cityname/mining/has-mined-at-block/:blockheight/:userid', Mining.HasMinedAtBlock)
  // Mining claim functions
  .get('/:version/:cityname/mining-claims/can-claim-mining-reward/:blockheight/:address', MiningClaims.CanClaimMiningReward)
  .get('/:version/:cityname/mining-claims/is-block-winner/:blockheight/:address', MiningClaims.IsBlockWinner)
  // Stacking functions
  .get('/:version/:cityname/stacking/get-first-stacks-block-in-reward-cycle/:cycleid', Stacking.GetFirstStacksBlockInRewardCycle)
  .get('/:version/:cityname/stacking/get-reward-cycle/:blockheight', Stacking.GetRewardCycle)
  .get('/:version/:cityname/stacking/get-stacker-at-cycle/:cycleid/:userid/:default?', Stacking.GetStackerAtCycle)
  .get('/:version/:cityname/stacking/get-stacking-stats-at-cycle/:cycleid/:default?', Stacking.GetStackingStatsAtCycle)
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
  .get('/token/get-total-supply/:cityname', Token.GetFullTotalSupply) // legacy route for old API integrations
  .get('/:cityname/token/get-total-supply', Token.GetFullTotalSupply)
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
  .all('*', (request) => new Response(`Resource not found, please check the URL: ${request.url}`, { status: 404 }))

export const handleRequest = async (request: Request): Promise<Response> => {
  const response: Response = await router.handle(request)
  const newResponse = new Response(response.body, response)
  newResponse.headers.append('Access-Control-Allow-Origin', '*')
  newResponse.headers.append(
    'Access-Control-Allow-Methods',
    'GET, HEAD, POST, OPTIONS',
  )
  newResponse.headers.append('Access-Control-Max-Age', '86400')
  newResponse.headers.append('CityCoins-API', '2.0.0')
  return newResponse
}

// returns true if the URL matches a given string
function matchDownload(target: string): boolean {
  const url = new URL(target)
  const validExt = ['.png', '.xml', '.ico', '.yml', '.json']
  let isDownload = false
  // check if the URL is at the base path
  if (url.pathname.split('/').length === 2) {
    // check if the file extension matches
    isDownload = validExt.some((value) => {
      return url.pathname.endsWith(value)
    })
  }
  return isDownload
}

// returns the response from KV for the asset
async function returnDownload(event: FetchEvent): Promise<Response> {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    if (e instanceof NotFoundError) {
      const pathname = new URL(event.request.url).pathname
      return new Response(`Resource not found at ${pathname}`, { status: 404 })
    } else if (e instanceof MethodNotAllowedError) {
      return new Response('Access denied or invalid request', { status: 403 })
    } else {
      return new Response('An unexpected error occurred', { status: 500 })
    }
  }
}

addEventListener('fetch', (event) => {
  if (matchDownload(event.request.url)) {
    // check if item should be downloaded from KV
    event.respondWith(returnDownload(event))
  } else {
    // then route the request to itty-router
    console.info(event.respondWith(handleRequest(event.request)))
  }
})
