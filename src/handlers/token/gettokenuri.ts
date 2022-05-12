import { Request as IttyRequest } from 'itty-router'
import { getTokenUri } from '../../lib/citycoins'
import { createSingleValue } from '../../lib/common'
import { CityConfig, getCityConfig } from '../../types/cities'

const GetTokenUri = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let tokenUri: string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  if (version === undefined || city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    tokenUri = await getTokenUri(cityConfig)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(tokenUri)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetTokenUri
