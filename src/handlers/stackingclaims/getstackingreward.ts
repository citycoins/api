import { Request as IttyRequest } from 'itty-router'
import { getRewardCycle, getStackingReward } from '../../lib/citycoins'
import { createResponse, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetStackingReward = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let stackingReward: string
  let response: SingleValue | boolean | number | string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const cycle = request.params?.cycleid ?? undefined
  const userId = request.params?.userid ?? undefined
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
  // check response output format
  let format = 'json'
  const { query } = request
  if (Object.prototype.hasOwnProperty.call(query, 'format')) {
    if (query?.format !== undefined) format = query.format
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    if (!isStringAllDigits(cycle) && cycle !== 'current') {
      return new Response(`Cycle ID not specified or invalid`, { status: 400 })
    }
    const currentBlockHeight = await getStacksBlockHeight()
    const currentCycle = await getRewardCycle(cityConfig, currentBlockHeight)
    if (
      (+cycle >= +currentCycle || cycle === 'current') &&
      !cityConfig.core.shutdown
    ) {
      return new Response(`Invalid request, cycle still active or in future`, {
        status: 400,
      })
    }
    if (!isStringAllDigits(userId)) {
      return new Response(`User ID not specified or invalid`, { status: 400 })
    }
    stackingReward = await getStackingReward(cityConfig, cycle, userId)
    response = await createResponse(stackingReward, format)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default GetStackingReward
