import { Request as IttyRequest } from 'itty-router'
import { getSymbol } from '../../lib/citycoins'
import { createSingleValue } from '../../lib/common'
import { CityConfig, getCityConfig } from '../../types/cities'

const GetSymbol = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let symbol: string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  if (version === undefined || city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    symbol = await getSymbol(cityConfig)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(symbol)
  return new Response(JSON.stringify(response))
}

export default GetSymbol
