import { Request as IttyRequest } from 'itty-router'
import {
  getFirstStacksBlockInRewardCycle,
  getRewardCycle,
} from '../../lib/citycoins'
import { createResponse, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const GetFirstStacksBlockInRewardCycle = async (
  request: IttyRequest,
): Promise<Response> => {
  let cityConfig: CityConfig
  let firstBlockInCycle: string
  let response: SingleValue | boolean | number | string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  let cycle = request.params?.cycleid ?? undefined
  if (version === undefined || city === undefined || cycle === undefined) {
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
    firstBlockInCycle = await getFirstStacksBlockInRewardCycle(
      cityConfig,
      cycle,
    )
    if (firstBlockInCycle === null) {
      return new Response(`Reward cycle not found: ${cycle}`, { status: 404 })
    }
    response = await createResponse(firstBlockInCycle, format)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default GetFirstStacksBlockInRewardCycle
