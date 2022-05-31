import { Request as IttyRequest } from 'itty-router'
import { getUserId } from '../../lib/citycoins'
import { createResponse } from '../../lib/common'
import { CityConfig, getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetUserId = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let userId: string
  let response: SingleValue | boolean | number | string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const user = request.params?.address ?? undefined
  if (version === undefined || city === undefined || user === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, {
      status: 400,
    })
  }
  // check response output format
  let format = 'json'
  const { query } = request
  if (Object.prototype.hasOwnProperty.call(query, 'format')) {
    if (query?.format !== undefined) format = query.format
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    userId = await getUserId(cityConfig, user)
    if (userId === null) {
      return new Response(`Address not found: ${user}`, { status: 404 })
    }
    response = await createResponse(userId, format)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default GetUserId
