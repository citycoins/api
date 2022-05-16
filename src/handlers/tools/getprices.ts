import { Request as IttyRequest } from 'itty-router'
import { getCGPrice } from '../../lib/prices'
import { CityConfig, getCityConfig } from '../../types/cities'
import { Prices } from '../../types/common'

const GetPrices = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let tokenName: string
  let prices: Prices
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const currency = request.params?.currency ?? undefined
  if (version === undefined || city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    if (city === 'stx') {
      tokenName = 'blockstack'
    } else {
      cityConfig = await getCityConfig(city, version)
      tokenName = cityConfig.token.tokenName
    }
    prices = await getCGPrice(tokenName, currency)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(prices))
}

export default GetPrices
