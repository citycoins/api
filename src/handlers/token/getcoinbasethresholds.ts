import { Request as IttyRequest } from 'itty-router'
import { getCoinbaseThresholds } from '../../lib/citycoins'
import { CityConfig, getCityConfig } from '../../types/cities'
import { CoinbaseThresholds } from '../../types/token'

const GetCoinbaseThresholds = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let coinbaseThresholds: CoinbaseThresholds
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  if (version === undefined || city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    coinbaseThresholds = await getCoinbaseThresholds(cityConfig)
    if (coinbaseThresholds === null) {
      return new Response(`Coinbase thresholds not found for city: ${city}`, { status: 404 })
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(coinbaseThresholds))
}

export default GetCoinbaseThresholds
