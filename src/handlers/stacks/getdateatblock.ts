import { Request as IttyRequest } from 'itty-router'
import { createResponse, isStringAllDigits } from '../../lib/common'
import { getDateAtBlock, getStacksBlockHeight } from '../../lib/stacks'
import { SingleValue } from '../../types/common'

const GetDateAtBlock = async (request: IttyRequest): Promise<Response> => {
  let dateAtBlock: string
  let response: SingleValue | boolean | number | string
  // check inputs
  let blockHeight = request.params?.blockHeight ?? undefined
  if (blockHeight === undefined) {
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
    if (blockHeight === 'current') {
      blockHeight = await getStacksBlockHeight()
    } else {
      if (!isStringAllDigits(blockHeight)) {
        return new Response(`Block height not specified or invalid`, {
          status: 400,
        })
      }
    }
    dateAtBlock = await getDateAtBlock(blockHeight)
    response = await createResponse(dateAtBlock, format)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default GetDateAtBlock
