import { fetchReadOnlyFunction } from 'micro-stacks/api'
import { STACKS_NETWORK } from './common'

export async function getMiaTotalSupply<T>(): Promise<T> {
  return fetchReadOnlyFunction({
    contractAddress: 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27',
    contractName: 'miamicoin-token',
    functionName: 'get-total-supply',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27',
  }, true)
}
