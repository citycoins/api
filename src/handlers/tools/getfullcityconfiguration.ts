import { Request as IttyRequest } from 'itty-router'
import { CityVersions, getFullCityConfig } from '../../types/cities'

const GetFullCityConfiguration = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityVersions
  // check inputs
  const city = request.params?.cityname ?? undefined
  if (city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getFullCityConfig(city)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(cityConfig), { headers })
}

export default GetFullCityConfiguration
