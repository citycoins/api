import { Request as IttyRequest } from 'itty-router'
import { getLastHighValueAtBlock } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'

const GetLastHighValueAtBlock = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let highValue: string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  let blockHeight = request.params?.blockheight ?? undefined
  if (version === undefined || city === undefined || blockHeight === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    // get current block height if specified
    if (blockHeight === 'current') {
      blockHeight = await getStacksBlockHeight()
    } else {
      // verify block height is valid number
      if (!isStringAllDigits(blockHeight)) {
        return new Response(`Block height not specified or invalid`, { status: 400 })
      }
    }
    // get last high value at block height
    highValue = await getLastHighValueAtBlock(cityConfig, blockHeight)
    if (highValue === null) {
      return new Response(`High value not found at block height: ${blockHeight}`, { status: 404 })
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(highValue)
  return new Response(JSON.stringify(response))
}

export default GetLastHighValueAtBlock
