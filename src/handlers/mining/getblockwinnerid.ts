import { Request as IttyRequest } from 'itty-router'
import { getBlockWinnerId } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetBlockWinnerId = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  let blockHeight = request.params?.blockheight ?? undefined
  if (city === undefined || blockHeight === undefined) {
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
  // get the block winner ID
  const winnerId = await getBlockWinnerId(cityConfig, blockHeight)
  if (winnerId === null) {
    return new Response(`Block winner ID not found at block height: ${blockHeight}`, { status: 404 })
  }
  // return response
  const response: SingleValue = await createSingleValue(winnerId)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetBlockWinnerId