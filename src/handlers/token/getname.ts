import { Request as IttyRequest } from 'itty-router'
import { getName } from '../../lib/citycoins'
import { createResponse } from '../../lib/common'
import { CityConfig, getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetName = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let name: string
  let response: SingleValue | boolean | number | string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  if (version === undefined || city === undefined) {
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
    name = await getName(cityConfig)
    response = await createResponse(name, format)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default GetName
