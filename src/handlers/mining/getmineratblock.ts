import { Request as IttyRequest } from 'itty-router'
import { getMinerAtBlock, getUserId } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities';
import { MinerAtBlock } from "../../types/mining";

const GetMinerAtBlock = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  const address = request.params?.address ?? undefined
  if (city === undefined || blockHeight === undefined || address === undefined) {
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
  // get user ID
  const userId = await getUserId(cityConfig, address).catch(() => {
    return ''
  })
  if (userId === '') {
    return new Response(`User ID not found for address: ${address}`, { status: 404 })
  }
  // get miner info at block height
  const minerAtBlock: MinerAtBlock = await getMinerAtBlock(cityConfig, blockHeightValue, userId);
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  if (minerAtBlock === null) {
    return new Response(`Mining stats not found at block height: ${blockHeightValue}`, { status: 404 })
  }
  return new Response(JSON.stringify(minerAtBlock), { headers })
}

export default GetMinerAtBlock
