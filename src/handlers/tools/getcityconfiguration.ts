import { Request as IttyRequest } from 'itty-router'
import { CityConfig, getCityConfig } from '../../types/cities'

const GetCityConfiguration = async (
  request: IttyRequest,
): Promise<Response> => {
  let cityConfig: CityConfig
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  if (version === undefined || city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, {
      status: 400,
    })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(cityConfig))
}

export default GetCityConfiguration
