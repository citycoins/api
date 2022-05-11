import { Request as IttyRequest } from 'itty-router'
import { getFirstStacksBlockInRewardCycle, getRewardCycle } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { getCityConfig } from '../../types/cities'

const GetFirstStacksBlockInRewardCycle = async (request: IttyRequest): Promise<Response> => {
  let cityConfig
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  let cycle = request.params?.cycleid ?? undefined
  if (version === undefined || city === undefined || cycle === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  try {
    cityConfig = await getCityConfig(city, version)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
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
  // get first stacks block in reward cycle
  const firstBlockInCycle = await getFirstStacksBlockInRewardCycle(cityConfig, cycle)
  if (firstBlockInCycle === null) {
    return new Response(`Reward cycle not found: ${cycle}`, { status: 404 })
  }
  // return response
  const response = await createSingleValue(firstBlockInCycle)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetFirstStacksBlockInRewardCycle
