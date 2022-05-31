import { Request as IttyRequest } from 'itty-router'
import { createResponse } from '../../lib/common'
import { getBnsName } from '../../lib/stacks'
import { SingleValue } from '../../types/common'

const GetBnsName = async (request: IttyRequest): Promise<Response> => {
  let bnsNames: string
  let response: SingleValue | boolean | number | string
  // check inputs
  const address = request.params?.address ?? undefined
  if (address === undefined) {
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
    bnsNames = await getBnsName(address)
    if (bnsNames === 'undefined') {
      return new Response(`BNS name(s) not found for address: ${address}`, {
        status: 404,
      })
    }
    response = await createResponse(bnsNames, format)
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  return new Response(JSON.stringify(response))
}

export default GetBnsName
