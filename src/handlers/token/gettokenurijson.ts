import { Request as IttyRequest } from 'itty-router'
import { getTokenUri } from '../../lib/citycoins'
import { CityConfig, getCityConfig } from '../../types/cities'

const GetTokenUriJson = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let tokenUri: string
  let tokenUriJson: string
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
    tokenUriJson = await fetch(tokenUri).then(res => res.json())
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(tokenUriJson))
}

export default GetTokenUriJson
