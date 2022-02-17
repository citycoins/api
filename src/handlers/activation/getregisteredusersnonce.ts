import { Request as IttyRequest } from 'itty-router'
import { getRegisteredUsersNonce } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'

const GetRegisteredUsersNonce = async (request: IttyRequest): Promise<Response> => {
  const city = request.params?.cityname ?? undefined
  if (city === undefined) {
    return new Response(`Invalid request`, { status: 400 })
  }
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City ${city} not found`, { status: 404 })
  }
  const registeredUsers = await getRegisteredUsersNonce(cityConfig)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(registeredUsers, { headers })
}

export default GetRegisteredUsersNonce
