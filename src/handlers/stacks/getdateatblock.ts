import { Request as IttyRequest } from 'itty-router'
import { createSingleValue, isStringAllDigits } from '../../lib/common'
import { getDateAtBlock, getStacksBlockHeight } from '../../lib/stacks'

const GetDateAtBlock = async (request: IttyRequest): Promise<Response> => {
  let dateAtBlock: string
  // check inputs
  let blockHeight = request.params?.blockHeight ?? undefined
  if (blockHeight === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    if (blockHeight === 'current') {
      blockHeight = await getStacksBlockHeight()
    } else {
      if (!isStringAllDigits(blockHeight)) {
        return new Response(`Block height not specified or invalid`, { status: 400 })
      }
    }
    dateAtBlock = await getDateAtBlock(blockHeight)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(dateAtBlock)
  return new Response(JSON.stringify(response))
}

export default GetDateAtBlock