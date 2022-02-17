import { getStacksBlockHeight } from "../../lib/stacks"

const StacksBlockHeight = async (): Promise<Response> => {
  // get Stacks block height from API
  const currentBlockHeight: string = await getStacksBlockHeight()
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(currentBlockHeight, { headers })
}

export default StacksBlockHeight
