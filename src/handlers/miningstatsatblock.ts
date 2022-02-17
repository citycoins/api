import { Request as IttyRequest } from 'itty-router'
import { getMiaMiningStatsAtBlock } from "../lib/citycoins"
import { MiningStatsAtBlock } from "../types/mining";

const MiningStatsAtBlock = async (request: IttyRequest): Promise<Response> => {
  const blockHeight = request.params?.blockheight || undefined
  if (blockHeight === undefined) {
    return new Response(`Block height not specified or invalid`, { status: 400 })
  }
  const blockHeightValue = parseInt(blockHeight)
  if (isNaN(blockHeightValue)) {
    return new Response(`Block height not specified or invalid`, { status: 400 })
  }
  const miningStatsAtBlock: MiningStatsAtBlock = await getMiaMiningStatsAtBlock(blockHeightValue);
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
