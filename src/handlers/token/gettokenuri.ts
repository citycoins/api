import { Request as IttyRequest } from 'itty-router'
import { getTokenUri } from '../../lib/citycoins'
import { createSingleValue } from '../../lib/common'
import { getCityConfig } from '../../types/cities'

const GetTokenUri = async (request: IttyRequest): Promise<Response> => {
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
  // get SIP-010 token uri
  const tokenUri = await getTokenUri(cityConfig)
  // return response
  const response = await createSingleValue(tokenUri)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetTokenUri
