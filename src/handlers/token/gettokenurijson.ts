import { Request as IttyRequest } from 'itty-router'
import { getTokenUri } from '../../lib/citycoins'
import { getCityConfig } from '../../types/cities'

const GetTokenUriJson = async (request: IttyRequest): Promise<Response> => {
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
  // get SIP-010 token uri URL
  const tokenUri = await getTokenUri(cityConfig)
  // get JSON from URL
  const tokenUriJson = await fetch(tokenUri).then(res => res.json())
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(tokenUriJson), { headers })
}

export default GetTokenUriJson
