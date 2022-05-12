import { Request as IttyRequest } from 'itty-router'
import { createSingleValue } from '../../lib/common'
import { getBnsName } from '../../lib/stacks'

const GetBnsName = async (request: IttyRequest): Promise<Response> => {
  let bnsNames: string
  // check inputs
  const address = request.params?.address ?? undefined
  if (address === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get/calculate response
  try {
    bnsNames = await getBnsName(address)
    if (bnsNames === 'undefined') {
      return new Response(`BNS name(s) not found for address: ${address}`, { status: 404 })
    }
  } catch (err) {
    if (err instanceof Error) return new Response(err.message, { status: 404 })
    return new Response(String(err), { status: 404 })
  }
  // return response
  const response = await createSingleValue(bnsNames)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetBnsName
