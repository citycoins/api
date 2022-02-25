import { Request as IttyRequest } from 'itty-router'
import { getTotalSupply } from '../../lib/citycoins'
import { createSingleValue } from '../../lib/common'
import { getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetTotalSupply = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  if (city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // get total supply
  const totalSupply: string = await getTotalSupply(cityConfig)
  // return response
  const response: SingleValue = await createSingleValue(totalSupply)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetTotalSupply
