import { Request as IttyRequest } from 'itty-router'
import { getRewardCycle } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities';

const GetRewardCycle = async (request: IttyRequest): Promise<Response> => {
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
  // verify target cycle is valid
  const blockHeightValue = parseInt(blockHeight)
  if (isNaN(blockHeightValue)) {
    return new Response(`Target cycle not specified or invalid`, { status: 400 })
  }
  // get reward cycle at block height
  const rewardCycle: string = await getRewardCycle(cityConfig, blockHeightValue);
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  if (rewardCycle === null) {
    return new Response(`Reward cycle not found at block height: ${blockHeightValue}`, { status: 404 })
  }
  return new Response(rewardCycle, { headers })
}

export default GetRewardCycle
