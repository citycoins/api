import { Request as IttyRequest } from 'itty-router'
import { getBnsNames } from "../../lib/stacks"

const GetBnsNames = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const address = request.params?.address ?? undefined
  if (address === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get Stacks block height from API
  const bnsNames: string = await getBnsNames(address)
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(bnsNames, { headers })
}

export default GetBnsNames
