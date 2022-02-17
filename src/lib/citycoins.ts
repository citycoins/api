import { fetchReadOnlyFunction } from 'micro-stacks/api'
import { uintCV } from 'micro-stacks/clarity'
import { CityConfig } from '../types/cities'
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

export async function getMiaMiningStatsAtBlock(cityConfig: CityConfig, blockHeight: number): Promise<MiningStatsAtBlock> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-mining-stats-at-block',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}
