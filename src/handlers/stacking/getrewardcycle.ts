import { Request as IttyRequest } from 'itty-router'
import { getRewardCycle } from '../../lib/citycoins'
import { createResponse, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetRewardCycle = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let rewardCycle: string
  let response: SingleValue | boolean | number | string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  let blockHeight = request.params?.blockheight ?? undefined
  if (
    version === undefined ||
    city === undefined ||
    blockHeight === undefined
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
    if (blockHeight === 'current') {
      blockHeight = await getStacksBlockHeight()
    } else {
      if (!isStringAllDigits(blockHeight)) {
        return new Response(`Block height not specified or invalid`, {
          status: 400,
        })
      }
    }
    rewardCycle = await getRewardCycle(cityConfig, blockHeight)
    if (rewardCycle === null) {
      return new Response(
        `Reward cycle not found at block height: ${blockHeight}`,
        { status: 404 },
      )
    }
    response = await createResponse(rewardCycle, format)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default GetRewardCycle
