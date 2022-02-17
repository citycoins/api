import { getMiaTotalSupply } from "../lib/citycoins"

const TotalSupply = async (): Promise<Response> => {
  const totalSupply: string = await getMiaTotalSupply()
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(totalSupply, { headers })
}

export default TotalSupply