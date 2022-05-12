import { Request as IttyRequest } from 'itty-router'
import { getBalance } from '../../lib/citycoins'
import { createSingleValue } from '../../lib/common'
import { CityConfig, getCityConfig } from '../../types/cities'

const GetBalance = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let balance: string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const user = request.params?.address ?? undefined
  if (version === undefined || city === undefined || user === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    balance = await getBalance(cityConfig, user)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(balance)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetBalance
