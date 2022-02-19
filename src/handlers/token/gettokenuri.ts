import { Request as IttyRequest } from 'itty-router'
import { getTokenUri } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'

const GetTokenUri = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  if (city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // get SIP-010 token uri
  const tokenUri: string = await getTokenUri(cityConfig)
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(tokenUri, { headers })
}

export default GetTokenUri
