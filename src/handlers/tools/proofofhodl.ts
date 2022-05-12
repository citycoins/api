import { Request as IttyRequest } from 'itty-router'
import { getProofOfHodl } from '../../lib/citycoins'
import { createSingleValue } from '../../lib/common'
import { getCityConfig } from '../../types/cities'

const ProofOfHodl = async (request: IttyRequest): Promise<Response> => {
  let cityConfig
  let hodl
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const user = request.params?.address ?? undefined
  if (version === undefined || city === undefined || user === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    // get city configuration object
    cityConfig = await getCityConfig(city, version)
    // check if user is hodling
    hodl = await getProofOfHodl(cityConfig, user)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(hodl)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default ProofOfHodl
