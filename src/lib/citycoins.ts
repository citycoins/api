import { fetchReadOnlyFunction } from 'micro-stacks/api'
import { standardPrincipalCV, uintCV } from 'micro-stacks/clarity'
import { CityConfig } from '../types/cities'
import { MinerAtBlock, MiningStatsAtBlock } from '../types/mining'
import { STACKS_NETWORK } from './common'

export async function getTotalSupply(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.tokenContract,
    functionName: 'get-total-supply',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getMiningStatsAtBlock(cityConfig: CityConfig, blockHeight: number): Promise<MiningStatsAtBlock> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-mining-stats-at-block',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getMinerAtBlock(cityConfig: CityConfig, blockHeight: number, userId: number): Promise<MinerAtBlock> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-miner-at-block',
    functionArgs: [uintCV(blockHeight), uintCV(userId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getUserId(cityConfig: CityConfig, address: string): Promise<number> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-user-id',
    functionArgs: [standardPrincipalCV(address)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}
