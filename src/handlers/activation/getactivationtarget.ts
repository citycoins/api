import { Request as IttyRequest } from 'itty-router'
import { getActivationTarget } from '../../lib/citycoins'
import { createSingleValue } from '../../lib/common'
import { getCityConfig } from '../../types/cities'

const GetActivationTarget = async (request: IttyRequest): Promise<Response> => {
  let cityConfig
  let activationTarget
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  if (version === undefined || city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  try {
    cityConfig = await getCityConfig(city, version)
    activationTarget = await getActivationTarget(cityConfig)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(activationTarget)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetActivationTarget
