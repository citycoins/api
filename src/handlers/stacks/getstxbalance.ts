import { Request as IttyRequest } from 'itty-router'
import { createSingleValue } from '../../lib/common'
import { getStxBalance } from '../../lib/stacks'
import { SingleValue } from '../../types/common'

const GetStxBalance = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const address = request.params?.address ?? undefined
  if (address === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get Stacks balance in uSTX from API
  const stxBalance: string = await getStxBalance(address)
    .catch(() => { return '' })
  if (stxBalance === '') {
    return new Response(`Stacks balance not found for address: ${address}`, { status: 404 })
  }
  // return response
  const response: SingleValue = await createSingleValue(stxBalance)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetStxBalance
