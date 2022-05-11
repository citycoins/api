import { Request as IttyRequest } from 'itty-router'
import { getCoinbaseThresholds } from '../../lib/citycoins'
import { getCityConfig } from '../../types/cities'

const GetCoinbaseThresholds = async (request: IttyRequest): Promise<Response> => {
  let cityConfig
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  if (version === undefined || city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  try {
    cityConfig = await getCityConfig(city, version)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // get coinbase thresholds
  const coinbaseThresholds = await getCoinbaseThresholds(cityConfig)
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
