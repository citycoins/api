const StacksBlockHeight = ():Response => {
  const currentBlockHeight = JSON.stringify({'stacks-block-height': 49000})
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(currentBlockHeight, { headers })
}

export default StacksBlockHeight
