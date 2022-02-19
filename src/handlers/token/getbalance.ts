import { Request as IttyRequest } from 'itty-router'
import { getBalance } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'

const GetBalance = async (request: IttyRequest): Promise<Response> => {
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
  const balance = await getBalance(cityConfig, user).catch(() => { return '' })
  if (balance === '') {
    return new Response(`User not found: ${user}`, { status: 404 })
  }
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(balance, { headers })
}

export default GetBalance
