import { Request as IttyRequest } from 'itty-router'
import { getCoinbaseThresholds } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'
import { CoinbaseThresholds } from '../../types/token'

const GetCoinbaseThresholds = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  if (city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // get coinbase thresholds
  const coinbaseThresholds: CoinbaseThresholds = await getCoinbaseThresholds(cityConfig)
  if (coinbaseThresholds === null) {
    return new Response(`Coinbase thresholds not found for city: ${city}`, { status: 404 })
  }
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(coinbaseThresholds), { headers })
}

export default GetCoinbaseThresholds
