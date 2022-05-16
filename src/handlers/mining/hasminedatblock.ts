import { Request as IttyRequest } from 'itty-router'
import { hasMinedAtBlock } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'

const HasMinedAtBlock = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let minedAtBlock: string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  let blockHeight = request.params?.blockheight ?? undefined
  const userId = request.params?.userid ?? undefined
  if (version === undefined || city === undefined || blockHeight === undefined || userId === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    if (blockHeight === 'current') {
      blockHeight = await getStacksBlockHeight()
    } else {
      if (!isStringAllDigits(blockHeight)) {
        return new Response(`Block height not specified or invalid`, { status: 400 })
      }
    }
    if (!isStringAllDigits(userId)) {
      return new Response(`User ID not specified or invalid`, { status: 400 })
    }
    minedAtBlock = await hasMinedAtBlock(cityConfig, blockHeight, userId)
    if (minedAtBlock === null) {
      return new Response(`Mining record for ${userId} not found at block height: ${blockHeight}`, { status: 404 })
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(minedAtBlock)
  return new Response(JSON.stringify(response))
}

export default HasMinedAtBlock
