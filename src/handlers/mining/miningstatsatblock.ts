import { Request as IttyRequest } from 'itty-router'
import { getMiningStatsAtBlock } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities';
import { MiningStatsAtBlock } from "../../types/mining";

const MiningStatsAtBlock = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  if (city === undefined || blockHeight === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // verify block height is valid
  const blockHeightValue = parseInt(blockHeight)
  if (isNaN(blockHeightValue)) {
    return new Response(`Block height not specified or invalid`, { status: 400 })
  }
  // get mining stats at block height
  const miningStatsAtBlock: MiningStatsAtBlock = await getMiningStatsAtBlock(cityConfig, blockHeightValue);
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  if (miningStatsAtBlock === null) {
    return new Response(`Mining stats not found at block height: ${blockHeightValue}`, { status: 404 })
  }
  return new Response(JSON.stringify(miningStatsAtBlock), { headers })
}

export default MiningStatsAtBlock
