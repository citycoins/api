import { createSingleValue } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'
import { SingleValue } from '../../types/common'

const GetStacksBlockHeight = async (): Promise<Response> => {
  // get Stacks block height from API
  const currentBlockHeight: string = await getStacksBlockHeight()
    .catch(() => { return '' })
  if (currentBlockHeight === '') {
    return new Response(`Stacks block height not found, please try again`, { status: 404 })
  }
  // return response
  const response: SingleValue = await createSingleValue(currentBlockHeight)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(response), { headers })
}

export default GetStacksBlockHeight
