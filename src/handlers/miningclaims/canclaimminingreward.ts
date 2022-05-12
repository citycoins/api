import { Request as IttyRequest } from 'itty-router'
import { canClaimMiningReward } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { getCityConfig } from '../../types/cities'

const CanClaimMiningReward = async (request: IttyRequest): Promise<Response> => {
  let cityConfig
  let canClaimReward
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  const user = request.params?.address ?? undefined
  if (version === undefined || city === undefined || blockHeight === undefined || user === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  try {
    cityConfig = await getCityConfig(city, version)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // verify block height is valid value
  if (!isStringAllDigits(blockHeight) && blockHeight !== 'current') {
    return new Response(`Block height not specified or invalid`, { status: 400 })
  }
  // get current block height
  const currentBlockHeight = await getStacksBlockHeight()
  // check that maturity window has passed
  // or will default to false regardless of status
  if (+blockHeight > +currentBlockHeight - 100 || blockHeight === 'current') {
    return new Response(`Invalid request, maturity window of 100 blocks has not passed`, { status: 400 })
  }
  // check if user won at given block height and can claim reward
  try {
    canClaimReward = await canClaimMiningReward(cityConfig, user, blockHeight)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(canClaimReward)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default CanClaimMiningReward