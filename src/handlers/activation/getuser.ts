import { Request as IttyRequest } from 'itty-router'
import { getUser } from "../../lib/citycoins"
import { createSingleValue } from '../../lib/common'
import { getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetUser = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const userId = request.params?.userid ?? undefined
  if (city === undefined || userId === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // get user STX address
  const userAddress = await getUser(cityConfig, userId)
    .catch(() => { return '' })
  if (userAddress === '' || userAddress === null) {
    return new Response(`User ID not found: ${userId}`, { status: 404 })
  }
  // return response
  const response: SingleValue = await createSingleValue(userAddress)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetUser
