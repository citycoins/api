import { Request as IttyRequest } from 'itty-router'
import { getUserId } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'

const GetUserId = async (request: IttyRequest): Promise<Response> => {
  const city = request.params?.cityname ?? undefined
  const user = request.params?.address ?? undefined
  if (city === undefined || user === undefined) {
    return new Response(`Invalid request`, { status: 400 })
  }
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City ${city} not found`, { status: 404 })
  }
  const userId = await getUserId(cityConfig, user).catch(() => { return '' })
  if (userId === '') {
    return new Response(`User not found ${user}`, { status: 404 })
  }
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(userId, { headers })
}

export default GetUserId
