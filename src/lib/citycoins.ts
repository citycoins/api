import { fetchReadOnlyFunction } from 'micro-stacks/api'
import { standardPrincipalCV, uintCV } from 'micro-stacks/clarity'
import { CityConfig } from '../types/cities'
import { MinerAtBlock, MiningStatsAtBlock } from '../types/mining'
import { StackerAtCycle, StackingStatsAtCycle } from '../types/stacking'
import { CoinbaseThresholds } from '../types/token'
import { STACKS_NETWORK } from './common'

//////////////////////////////////////////////////
// ACTIVATION FUNCTIONS
//////////////////////////////////////////////////

export async function getActivationBlock(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-activation-block',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer
  }, true)
}

export async function getRegisteredUsersNonce(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-registered-users-nonce',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer
  }, true)
}

export async function getUser(cityConfig: CityConfig, id: number): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-user',
    functionArgs: [uintCV(id)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getUserId(cityConfig: CityConfig, address: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-user-id',
    functionArgs: [standardPrincipalCV(address)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

//////////////////////////////////////////////////
// MINING FUNCTIONS
//////////////////////////////////////////////////

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

export async function getMinerAtBlock(cityConfig: CityConfig, blockHeight: number, userId: string): Promise<MinerAtBlock> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-miner-at-block',
    functionArgs: [uintCV(blockHeight), uintCV(userId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

//////////////////////////////////////////////////
// STACKING FUNCTIONS
//////////////////////////////////////////////////

export async function getStackingStatsAtCycle(cityConfig: CityConfig, cycleId: number): Promise<StackingStatsAtCycle> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-stacking-stats-at-cycle',
    functionArgs: [uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getStackerAtCycle(cityConfig: CityConfig, cycleId: number, userId: number): Promise<StackerAtCycle> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-stacker-at-cycle',
    functionArgs: [uintCV(cycleId), uintCV(userId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getRewardCycle(cityConfig: CityConfig, blockHeight: number): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-reward-cycle',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getFirstStacksBlockInRewardCycle(cityConfig: CityConfig, cycleId: number): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-first-stacks-block-in-reward-cycle',
    functionArgs: [uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

//////////////////////////////////////////////////
// TOKEN FUNCTIONS
//////////////////////////////////////////////////

export async function getCoinbaseThresholds(cityConfig: CityConfig): Promise<CoinbaseThresholds> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.tokenContract,
    functionName: 'get-coinbase-thresholds',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getCoinbaseAmount(cityConfig: CityConfig, blockHeight: number): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.coreContract,
    functionName: 'get-coinbase-amount',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getName(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.tokenContract,
    functionName: 'get-name',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getSymbol(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.tokenContract,
    functionName: 'get-symbol',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getDecimals(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.tokenContract,
    functionName: 'get-decimals',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getBalance(cityConfig: CityConfig, address: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.tokenContract,
    functionName: 'get-balance',
    functionArgs: [standardPrincipalCV(address)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

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

export async function getTokenUri(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.tokenContract,
    functionName: 'get-token-uri',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}
