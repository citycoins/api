import { Request as IttyRequest } from 'itty-router'
import { getCoinbaseAmounts } from '../../lib/citycoins'
import { CityConfig, getCityConfig } from '../../types/cities'
import { CoinbaseAmounts } from '../../types/token'

const GetCoinbaseAmounts = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let coinbaseAmounts: CoinbaseAmounts
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  if (version === undefined || city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    coinbaseAmounts = await getCoinbaseAmounts(cityConfig)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(coinbaseAmounts))
}

export default GetCoinbaseAmounts
