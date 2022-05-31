import { Request as IttyRequest } from 'itty-router'
import { getRewardCycle, getStackerAtCycle } from '../../lib/citycoins'
import { isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'
import { StackerAtCycle } from '../../types/stacking'

const GetStackerAtCycle = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let stackerAtCycle: StackerAtCycle
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  let cycle = request.params?.cycleid ?? undefined
  const userId = request.params?.userid ?? undefined
  const defaultStats = request.params?.default === 'true' ? true : false
  if (
    version === undefined ||
    city === undefined ||
    cycle === undefined ||
    userId === undefined
  ) {
    return new Response(`Invalid request, missing parameter(s)`, {
      status: 400,
    })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    if (cycle === 'current') {
      const blockHeight = await getStacksBlockHeight()
      cycle = await getRewardCycle(cityConfig, blockHeight)
    } else {
      if (!isStringAllDigits(cycle)) {
        return new Response(`Target cycle not specified or invalid`, {
          status: 400,
        })
      }
    }
    if (!isStringAllDigits(userId)) {
      return new Response(`User ID not specified or invalid`, { status: 400 })
    }
    stackerAtCycle = await getStackerAtCycle(
      cityConfig,
      cycle,
      userId,
      defaultStats,
    )
    if (stackerAtCycle === null) {
      return new Response(
        `Stacker ${userId} not found at reward cycle: ${cycle}`,
        { status: 404 },
      )
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(stackerAtCycle))
}

export default GetStackerAtCycle
