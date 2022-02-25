import { Request as IttyRequest } from 'itty-router'
import { hasMinedAtBlock } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const HasMinedAtBlock = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  let blockHeight = request.params?.blockheight ?? undefined
  const userId = request.params?.userid ?? undefined
  if (city === undefined || blockHeight === undefined || userId === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // get current block height if specified
  if (blockHeight === 'current') {
    blockHeight = await getStacksBlockHeight()
  } else {
    // verify block height is valid number
    if (!isStringAllDigits(blockHeight)) {
      return new Response(`Block height not specified or invalid`, { status: 400 })
    }
  }
  // verify user ID is valid
  if (!isStringAllDigits(userId)) {
    return new Response(`User ID not specified or invalid`, { status: 400 })
  }
  // check if user mined at block
  const minedAtBlock = await hasMinedAtBlock(cityConfig, blockHeight, userId)
  if (minedAtBlock === null) {
    return new Response(`Mining record for ${userId} not found at block height: ${blockHeight}`, { status: 404 })
  }
  // return response
  const response: SingleValue = await createSingleValue(minedAtBlock)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default HasMinedAtBlock
