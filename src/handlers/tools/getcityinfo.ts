import { Request as IttyRequest } from 'itty-router'
import { CityInfo, getCityInfo } from '../../types/cities'

const GetCityInfo = async (request: IttyRequest): Promise<Response> => {
  let cityInfo: CityInfo
  // check inputs
  const city = request.params?.cityname ?? undefined
  if (city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityInfo = await getCityInfo(city)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(cityInfo))
}

export default GetCityInfo
