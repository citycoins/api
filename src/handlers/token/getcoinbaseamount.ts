import { Request as IttyRequest } from 'itty-router'
import { getCoinbaseAmount } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'

const GetCoinbaseAmount = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  if (city === undefined || blockHeight === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // verify block height is valid
  const blockHeightValue = parseInt(blockHeight)
  if (isNaN(blockHeightValue)) {
    return new Response(`Block height not specified or invalid`, { status: 400 })
  }
  // get coinbase thresholds
  const coinbaseAmount: string = await getCoinbaseAmount(cityConfig, blockHeightValue)
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  if (coinbaseAmount === null) {
    return new Response(`Coinbase amount not found at block height: ${blockHeightValue}`, { status: 404 })
  }
  return new Response(coinbaseAmount, { headers })
}

export default GetCoinbaseAmount
