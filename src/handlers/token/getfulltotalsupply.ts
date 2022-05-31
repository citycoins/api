import { Request as IttyRequest } from 'itty-router'
import { getTotalSupply } from '../../lib/citycoins'
import { createResponse, MICRO_UNITS } from '../../lib/common'
import { getCityConfig, getCityInfo } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetFullTotalSupply = async (request: IttyRequest): Promise<Response> => {
  let totalSupply = 0
  let response: SingleValue | boolean | number | string
  // check inputs
  const city = request.params?.cityname ?? undefined
  if (city === undefined) {
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
    const cityInfo = await getCityInfo(city)
    for await (const version of cityInfo.versions) {
      const config = await getCityConfig(city, version)
      const supply = await getTotalSupply(config)
      console.log(city, version, supply)
      totalSupply += version === 'v1' ? +supply * MICRO_UNITS : +supply
    }
    response = await createResponse(
      (totalSupply / MICRO_UNITS).toFixed(6),
      format,
    )
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default GetFullTotalSupply
