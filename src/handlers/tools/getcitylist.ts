import { getCityList } from '../../types/cities'

const GetCityList = async (): Promise<Response> => {
  let cityList: string[]
  // get/calculate response
  try {
    cityList = await getCityList()
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(cityList))
}

export default GetCityList
