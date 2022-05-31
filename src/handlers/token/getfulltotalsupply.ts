import { Request as IttyRequest } from 'itty-router'
import { getTotalSupply } from '../../lib/citycoins'
import { createSingleValue, MICRO_UNITS } from '../../lib/common'
import { getCityConfig, getCityInfo } from '../../types/cities'

const GetFullTotalSupply = async (request: IttyRequest): Promise<Response> => {
  let totalSupply = 0
  // check inputs
  const city = request.params?.cityname ?? undefined
  if (city === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, {
      status: 400,
    })
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
    console.log(`totalSupply: ${totalSupply}`)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(
    (totalSupply / MICRO_UNITS).toFixed(6),
  )
  return new Response(JSON.stringify(response))
}

export default GetFullTotalSupply
