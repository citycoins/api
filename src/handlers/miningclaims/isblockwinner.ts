import { Request as IttyRequest } from 'itty-router'
import { isBlockWinner } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { CityConfig, getCityConfig } from '../../types/cities'

const IsBlockWinner = async (request: IttyRequest): Promise<Response> => {
  let cityConfig: CityConfig
  let blockWinner: string
  // check inputs
  const version = request.params?.version ?? undefined
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  const user = request.params?.address ?? undefined
  if (version === undefined || city === undefined || blockHeight === undefined || user === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    cityConfig = await getCityConfig(city, version)
    if (!isStringAllDigits(blockHeight) && blockHeight !== 'current') {
      return new Response(`Block height not specified or invalid`, { status: 400 })
    }
    const currentBlockHeight = await getStacksBlockHeight()
    // check that maturity window has passed
    // or will default to false regardless of status
    if (+blockHeight > +currentBlockHeight - 100 || blockHeight === 'current') {
      return new Response(`Invalid request, maturity window of 100 blocks has not passed`, { status: 400 })
    }
    blockWinner = await isBlockWinner(cityConfig, user, blockHeight)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(blockWinner)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default IsBlockWinner