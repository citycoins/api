import { Request as IttyRequest } from 'itty-router'
import { getMinerAtBlock } from '../../lib/citycoins'
import { isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'
import { MinerAtBlock } from '../../types/mining'

const GetMinerAtBlock = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let minerAtBlock: MinerAtBlock
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
    minerAtBlock = await getMinerAtBlock(cityConfig, blockHeight, userId)
    if (minerAtBlock === null) {
      return new Response(`Miner ${userId} not found at block height: ${blockHeight}`, { status: 404 })
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(minerAtBlock))
}

export default GetMinerAtBlock
