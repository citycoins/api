import { Request as IttyRequest } from 'itty-router'
import { getMinerAtBlock, getUserId } from "../lib/citycoins"
import { getCityConfig } from '../types/cities';
import { MinerAtBlock } from "../types/mining";

const MinerAtBlock = async (request: IttyRequest): Promise<Response> => {
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  const address = request.params?.address ?? undefined
  if (city === undefined || blockHeight === undefined || address === undefined) {
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
  const userId = await getUserId(cityConfig, address).catch(() => {
    return 0
  })
  if (userId === 0) {
    return new Response(`User ID not found for address: ${address}`, { status: 404 })
  }
  const minerAtBlock: MinerAtBlock = await getMinerAtBlock(cityConfig, blockHeightValue, userId);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  if (minerAtBlock === null) {
    return new Response(`Mining stats not found at block height: ${blockHeightValue}`, { status: 404 })
  }
  return new Response(JSON.stringify(minerAtBlock), { headers })
}

export default MinerAtBlock
