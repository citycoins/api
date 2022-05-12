import { Request as IttyRequest } from 'itty-router'
import { getCoinbaseAmounts } from '../../lib/citycoins'
import { getCityConfig } from '../../types/cities'

const GetCoinbaseAmounts = async (request: IttyRequest): Promise<Response> => {
  let cityConfig
  let coinbaseAmounts
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
  // get coinbase amounts
  try {
    coinbaseAmounts = await getCoinbaseAmounts(cityConfig)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 400 })
    return new Response(String(err), { status: 400 })
  }
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(coinbaseAmounts), { headers })
}

export default GetCoinbaseAmounts
