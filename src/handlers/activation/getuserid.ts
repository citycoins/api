import { Request as IttyRequest } from 'itty-router'
import { getUserId } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'

const GetUserId = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const user = request.params?.address ?? undefined
  if (city === undefined || user === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // get user ID
  const userId = await getUserId(cityConfig, user).catch(() => { return '' })
  if (userId === '') {
    return new Response(`User not found: ${user}`, { status: 404 })
  }
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(userId, { headers })
}

export default GetUserId
