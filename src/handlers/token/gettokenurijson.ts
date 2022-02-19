import { Request as IttyRequest } from 'itty-router'
import { getTokenUri } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'
import { TokenUri } from '../../types/token'

const GetTokenUriJson = async (request: IttyRequest): Promise<Response> => {
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
  // get SIP-010 token uri URL
  const tokenUri: string = await getTokenUri(cityConfig)
  // get JSON from URL
  const tokenUriJson: TokenUri = await fetch(tokenUri).then(res => res.json())
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(tokenUriJson), { headers })
}

export default GetTokenUriJson
