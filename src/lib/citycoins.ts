import { fetchReadOnlyFunction } from 'micro-stacks/api'
import { uintCV } from 'micro-stacks/clarity'
import { MiningStatsAtBlock } from '../types/mining'
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

export async function getMiaMiningStatsAtBlock(blockHeight: number): Promise<MiningStatsAtBlock> {
  return fetchReadOnlyFunction({
    contractAddress: 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27',
    contractName: 'miamicoin-core-v1',
    functionName: 'get-mining-stats-at-block',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27',
  }, true)
}
