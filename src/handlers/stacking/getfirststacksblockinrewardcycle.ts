import { Request as IttyRequest } from 'itty-router'
import { getFirstStacksBlockInRewardCycle } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities';

const GetFirstStacksBlockInRewardCycle = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const cycle = request.params?.cycleid ?? undefined
  if (city === undefined || cycle === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // verify target cycle is valid
  const cycleValue = parseInt(cycle)
  if (isNaN(cycleValue)) {
    return new Response(`Target cycle not specified or invalid`, { status: 400 })
  }
  // get first stacks block in reward cycle
  const firstBlockInCycle: string = await getFirstStacksBlockInRewardCycle(cityConfig, cycleValue);
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  if (firstBlockInCycle === null) {
    return new Response(`Reward cycle not found at block height: ${cycleValue}`, { status: 404 })
  }
  return new Response(firstBlockInCycle, { headers })
}

export default GetFirstStacksBlockInRewardCycle
