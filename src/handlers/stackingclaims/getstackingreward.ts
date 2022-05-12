import { Request as IttyRequest } from 'itty-router'
import { getRewardCycle, getStackingReward } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'

const GetStackingReward = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let stackingReward: string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const cycle = request.params?.cycleid ?? undefined
  const userId = request.params?.userid ?? undefined
  if (version === undefined || city === undefined || cycle === undefined || userId === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    if (!isStringAllDigits(cycle) && cycle !== 'current') {
      return new Response(`Cycle ID not specified or invalid`, { status: 400 })
    }
    const currentBlockHeight = await getStacksBlockHeight()
    const currentCycle = await getRewardCycle(cityConfig, currentBlockHeight)
    if ((+cycle >= +currentCycle || cycle === 'current') && !cityConfig.core.shutdown) {
      return new Response(`Invalid request, cycle still active or in future`, { status: 400 })
    }
    if (!isStringAllDigits(userId)) {
      return new Response(`User ID not specified or invalid`, { status: 400 })
    }
    stackingReward = await getStackingReward(cityConfig, cycle, userId)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(stackingReward)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetStackingReward
