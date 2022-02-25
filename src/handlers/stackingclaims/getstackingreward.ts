import { Request as IttyRequest } from 'itty-router'
import { getRewardCycle, getStackingReward } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetStackingReward = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const cycle = request.params?.cycleid ?? undefined
  const userId = request.params?.userid ?? undefined
  if (city === undefined || cycle === undefined || userId === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // verify target cycle is a valid value
  if (!isStringAllDigits(cycle) && cycle !== 'current') {
    return new Response(`Cycle ID not specified or invalid`, { status: 400 })
  }
  // get current cycle
  const currentBlockHeight = await getStacksBlockHeight()
  const currentCycle = await getRewardCycle(cityConfig, currentBlockHeight)
  // check that cycle is in the past
  if (+cycle >= +currentCycle || cycle === 'current') {
    return new Response(`Invalid request, cycle still active or in future`, { status: 400 })
  }
  // verify user ID is valid
  if (!isStringAllDigits(userId)) {
    return new Response(`User ID not specified or invalid`, { status: 400 })
  }
  // get stacking reward for user at cycle
  const stackingReward = await getStackingReward(cityConfig, cycle, userId)
  // return response
  const response: SingleValue = await createSingleValue(stackingReward)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetStackingReward
