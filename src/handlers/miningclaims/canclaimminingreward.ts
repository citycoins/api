import { Request as IttyRequest } from 'itty-router'
import { canClaimMiningReward } from '../../lib/citycoins'
import { createResponse, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const CanClaimMiningReward = async (
  request: IttyRequest,
): Promise<Response> => {
  let cityConfig: CityConfig
  let canClaimReward: string
  let response: SingleValue | boolean | number | string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  const user = request.params?.address ?? undefined
  if (
    version === undefined ||
    city === undefined ||
    blockHeight === undefined ||
    user === undefined
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
    if (!isStringAllDigits(blockHeight) && blockHeight !== 'current') {
      return new Response(`Block height not specified or invalid`, {
        status: 400,
      })
    }
    const currentBlockHeight = await getStacksBlockHeight()
    // check that maturity window has passed
    // or will default to false regardless of status
    if (+blockHeight > +currentBlockHeight - 100 || blockHeight === 'current') {
      return new Response(
        `Invalid request, maturity window of 100 blocks has not passed`,
        { status: 400 },
      )
    }
    canClaimReward = await canClaimMiningReward(cityConfig, user, blockHeight)
    response = await createResponse(canClaimReward, format)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default CanClaimMiningReward
