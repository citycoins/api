import { Request as IttyRequest } from 'itty-router'
import { isBlockWinner } from '../../lib/citycoins'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { getCityConfig } from '../../types/cities'
import { SingleValue } from '../../types/common'

const IsBlockWinner = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  const user = request.params?.address ?? undefined
  if (city === undefined || blockHeight === undefined || user === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
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
  // check if user won at given block height
  const blockWinner = await isBlockWinner(cityConfig, user, blockHeight)
  // return response
  const response: SingleValue = await createSingleValue(blockWinner)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default IsBlockWinner