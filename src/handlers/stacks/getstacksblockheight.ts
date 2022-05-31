import { Request as IttyRequest } from 'itty-router'
import { createResponse } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { SingleValue } from '../../types/common'

const GetStacksBlockHeight = async (
  request: IttyRequest,
): Promise<Response> => {
  let currentBlockHeight: string
  let response: SingleValue | boolean | number | string
  // check response output format
  let format = 'json'
  const { query } = request
  if (Object.prototype.hasOwnProperty.call(query, 'format')) {
    if (query?.format !== undefined) format = query.format
  }
  // get Stacks block height from API
  try {
    currentBlockHeight = await getStacksBlockHeight()
    response = await createResponse(currentBlockHeight, format)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default GetStacksBlockHeight
