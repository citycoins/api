import { Request as IttyRequest } from 'itty-router'
import { getMiningStatsAtBlock } from '../../lib/citycoins'
import { isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'
import { MiningStatsAtBlock } from '../../types/mining'

const GetMiningStatsAtBlock = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let miningStatsAtBlock: MiningStatsAtBlock
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
    if (blockHeight === 'current') {
      blockHeight = await getStacksBlockHeight()
    } else {
      if (!isStringAllDigits(blockHeight)) {
        return new Response(`Block height not specified or invalid`, { status: 400 })
      }
    }
    miningStatsAtBlock = await getMiningStatsAtBlock(cityConfig, blockHeight)
    if (miningStatsAtBlock === null) {
      return new Response(`Mining stats not found at block height: ${blockHeight}`, { status: 404 })
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(miningStatsAtBlock))
}

export default GetMiningStatsAtBlock
