import { Request as IttyRequest } from 'itty-router'
import { getCGPrice } from '../../lib/prices'
import { getCityConfig } from '../../types/cities'

const GetPrices = async (request: IttyRequest): Promise<Response> => {
  let cityConfig
  let tokenName
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const currency = request.params?.currency ?? undefined
  if (version === undefined || city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // hack to allow for stx
  if (city === 'stx') {
    tokenName = 'blockstack'
  } else {
    // get city configuration object
    try {
      cityConfig = await getCityConfig(city, version)
    } catch (err) {
      if (err instanceof Error) return new Response(err.message, { status: 404 })
      return new Response(String(err), { status: 404 })
    }
    tokenName = cityConfig.token.tokenName
  }
  // get CoinGecko price
  const prices = await getCGPrice(tokenName, currency)
    .catch(() => { return {
      "coingecko": 0,
    }})
  if (prices.coingecko === 0 || prices.coingecko === undefined) {
    return new Response(`CoinGecko price not found for city: ${city} and currency: ${currency}`, { status: 404 })
  }
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(prices), { headers })
}

export default GetPrices
