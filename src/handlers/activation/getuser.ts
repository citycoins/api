import { Request as IttyRequest } from 'itty-router'
import { getUser } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { CityConfig, getCityConfig } from '../../types/cities'

const GetUser = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let userAddress: string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const userId = request.params?.userid ?? undefined
  if (version === undefined || city === undefined || userId === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    if (!isStringAllDigits(userId)) {
      return new Response(`User ID not specified or invalid`, { status: 400 })
    }
    userAddress = await getUser(cityConfig, userId)
    if (userAddress === null) {
      return new Response(`User ID not found: ${userId}`, { status: 404 })
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(userAddress)
  return new Response(JSON.stringify(response))
}

export default GetUser
