import { Request as IttyRequest } from 'itty-router'
import { getTotalSupply } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities'

const TotalSupply = async (request: IttyRequest): Promise<Response> => {
  const city = request.params?.cityname ?? undefined
  if (city === undefined) {
    return new Response(`Invalid request`, { status: 400 })
  }
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City ${city} not found`, { status: 404 })
  }
  const totalSupply: string = await getTotalSupply(cityConfig)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(totalSupply, { headers })
}

export default TotalSupply
