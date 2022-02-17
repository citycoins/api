import { Request as IttyRequest } from 'itty-router'
import { getMiaMiningStatsAtBlock } from "../lib/citycoins"
import { getCityConfig } from '../types/cities';
import { MiningStatsAtBlock } from "../types/mining";

const MiningStatsAtBlock = async (request: IttyRequest): Promise<Response> => {
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  if (blockHeight === undefined || city === undefined) {
    return new Response(`Invalid request`, { status: 400 })
  }
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City ${city} not found`, { status: 404 })
  }
  const blockHeightValue = parseInt(blockHeight)
  if (isNaN(blockHeightValue)) {
    return new Response(`Block height not specified or invalid`, { status: 400 })
  }
  const miningStatsAtBlock: MiningStatsAtBlock = await getMiaMiningStatsAtBlock(cityConfig, blockHeightValue);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  if (miningStatsAtBlock === null) {
    return new Response(`Mining stats not found at block height ${blockHeightValue}`, { status: 404 })
  }
  return new Response(JSON.stringify(miningStatsAtBlock), { headers })
}

export default MiningStatsAtBlock
