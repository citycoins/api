import { CGSimplePrice, Prices } from "../types/common";

export async function getCGPrice(tokenName: string, currency?: string): Promise<Prices> {
  currency = currency ?? "usd";
  // https://www.coingecko.com/api/documentations/v3#/simple/get_simple_price
  const tokenId = tokenName === 'newyorkcitycoin' ? 'nycccoin' : tokenName
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=${currency}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }
  const json: CGSimplePrice = await response.json()
  const prices: Prices = {
    "coingecko": json[tokenId][currency]
  }
  return prices
}
