import { Request as IttyRequest } from 'itty-router'
import { getUser } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'

const GetUser = async (request: IttyRequest): Promise<Response> => {
  const city = request.params?.cityname ?? undefined
  const userId = request.params?.id ?? undefined
  if (city === undefined || userId === undefined) {
    return new Response(`Invalid request`, { status: 400 })
  }
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City ${city} not found`, { status: 404 })
  }
  const userAddress = await getUser(cityConfig, parseInt(userId)).catch(() => { return ''})
  if (userAddress === '') {
    return new Response(`User ID not found ${userId}`, { status: 404 })
  }
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(userAddress, { headers })
}

export default GetUser
