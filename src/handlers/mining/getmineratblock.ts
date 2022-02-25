import { Request as IttyRequest } from 'itty-router'
import { getMinerAtBlock } from '../../lib/citycoins'
import { isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { getCityConfig } from '../../types/cities'
import { MinerAtBlock } from '../../types/mining'

const GetMinerAtBlock = async (request: IttyRequest): Promise<Response> => {
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
  // get miner info at block height
  const minerAtBlock: MinerAtBlock = await getMinerAtBlock(cityConfig, blockHeight, userId)
  if (minerAtBlock === null) {
    return new Response(`Miner ${userId} not found at block height: ${blockHeight}`, { status: 404 })
  }
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(minerAtBlock), { headers })
}

export default GetMinerAtBlock
