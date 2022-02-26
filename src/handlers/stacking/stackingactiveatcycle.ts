import { Request as IttyRequest } from 'itty-router'
import { getRewardCycle, stackingActiveAtCycle } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const StackingActiveAtCycle = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  let cycle = request.params?.cycleid ?? undefined
  if (city === undefined || cycle === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // get current reward cycle if specified
  if (cycle === 'current') {
    const blockHeight = await getStacksBlockHeight()
    cycle = await getRewardCycle(cityConfig, blockHeight)
  } else {
    // verify target cycle is valid
    if (!isStringAllDigits(cycle)) {
      return new Response(`Target cycle not specified or invalid`, { status: 400 })
    }
  }
  // check if stacking is active at cycle
  const activeAtCycle = await stackingActiveAtCycle(cityConfig, cycle)
  if (activeAtCycle === null) {
    return new Response(`Stacking info not found at cycle: ${cycle}`, { status: 404 })
  }
  // return response
  const response: SingleValue = await createSingleValue(activeAtCycle)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default StackingActiveAtCycle