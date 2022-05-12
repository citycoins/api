import { Request as IttyRequest } from 'itty-router'
import { getFirstStacksBlockInRewardCycle, getRewardCycle } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'

const GetFirstStacksBlockInRewardCycle = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let firstBlockInCycle: string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  let cycle = request.params?.cycleid ?? undefined
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
    firstBlockInCycle = await getFirstStacksBlockInRewardCycle(cityConfig, cycle)
    if (firstBlockInCycle === null) {
      return new Response(`Reward cycle not found: ${cycle}`, { status: 404 })
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
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
