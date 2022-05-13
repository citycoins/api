import { CityList, getFullCityInfo } from '../../types/cities'

const GetFullCityInfo = async (): Promise<Response> => {
  let cityInfo: CityList
  // get/calculate response
  try {
    cityInfo = await getFullCityInfo()
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(cityInfo), { headers })
}

export default GetFullCityInfo
