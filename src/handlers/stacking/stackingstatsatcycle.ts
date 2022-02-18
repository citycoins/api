import { Request as IttyRequest } from 'itty-router'
import { getStackingStatsAtCycle } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities';
import { StackingStatsAtCycle } from "../../types/stacking";

const StackingStatsAtCycle = async (request: IttyRequest): Promise<Response> => {
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
  // get stacking stats at cycle
  const stackingStatsAtCycle: StackingStatsAtCycle = await getStackingStatsAtCycle(cityConfig, cycleValue);
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  if (stackingStatsAtCycle === null) {
    return new Response(`Stacking stats not found at reward cycle: ${cycleValue}`, { status: 404 })
  }
  return new Response(JSON.stringify(stackingStatsAtCycle), { headers })
}

export default StackingStatsAtCycle
