import { Request as IttyRequest } from 'itty-router'
import { getUser } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'

const GetUser = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const userId = request.params?.id ?? undefined
  if (city === undefined || userId === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // get user STX address
  const userAddress = await getUser(cityConfig, userId).catch(() => { return ''})
  if (userAddress === '') {
    return new Response(`User ID not found: ${userId}`, { status: 404 })
  }
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(userAddress, { headers })
}

export default GetUser
