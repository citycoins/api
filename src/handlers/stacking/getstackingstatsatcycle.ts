import { Request as IttyRequest } from 'itty-router'
import { getRewardCycle, getStackingStatsAtCycle } from '../../lib/citycoins'
import { isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'
import { StackingStatsAtCycle } from '../../types/stacking'

const GetStackingStatsAtCycle = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let stackingStatsAtCycle: StackingStatsAtCycle
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  let cycle = request.params?.cycleid ?? undefined
  const defaultStats = request.params?.default === 'true' ? true : false
  if (version === undefined || city === undefined || cycle === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    if (cycle === 'current') {
      const blockHeight = await getStacksBlockHeight()
      cycle = await getRewardCycle(cityConfig, blockHeight)
    } else {
      if (!isStringAllDigits(cycle)) {
        return new Response(`Target cycle not specified or invalid`, { status: 400 })
      }
    }
    stackingStatsAtCycle = await getStackingStatsAtCycle(cityConfig, cycle, defaultStats)
    if (stackingStatsAtCycle === null) {
      return new Response(`Stacking stats not found at reward cycle: ${cycle}`, { status: 404 })
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(stackingStatsAtCycle))
}

export default GetStackingStatsAtCycle
