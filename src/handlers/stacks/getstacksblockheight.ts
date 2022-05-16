import { createSingleValue } from '../../lib/common'
import { getStacksBlockHeight } from '../../lib/stacks'

const GetStacksBlockHeight = async (): Promise<Response> => {
  // get Stacks block height from API
  const currentBlockHeight = await getStacksBlockHeight()
    .catch(() => { return '' })
  if (currentBlockHeight === '') {
    return new Response(`Stacks block height not found, please try again`, { status: 404 })
  }
  // return response
  const response = await createSingleValue(currentBlockHeight)
  return new Response(JSON.stringify(response))
}

export default GetStacksBlockHeight
