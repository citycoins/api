import { Request as IttyRequest } from 'itty-router'
import { getCGPrice } from '../../lib/prices'
import { getCityConfig } from '../../types/cities'
import { Prices } from '../../types/common'

const GetPrices = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const currency = request.params?.currency ?? undefined
  let cityConfig
  let tokenName
  if (city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // hack to allow for stx
  if (city === 'stx') {
    tokenName = 'blockstack'
  } else {
    // get city configuration object
    cityConfig = await getCityConfig(city)
    if (cityConfig.deployer === '') {
      return new Response(`City name not found: ${city}`, { status: 404 })
    }
    tokenName = cityConfig.tokenName
  }
  // get CoinGecko price
  const prices: Prices = await getCGPrice(tokenName, currency)
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
