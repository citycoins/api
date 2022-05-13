import { fetchReadOnlyFunction } from 'micro-stacks/api'
import { validateStacksAddress } from "micro-stacks/crypto"
import { standardPrincipalCV, uintCV } from 'micro-stacks/clarity'
import { CityConfig } from '../types/cities'
import { MinerAtBlock, MiningStatsAtBlock } from '../types/mining'
import { StackerAtCycle, StackingStatsAtCycle } from '../types/stacking'
import { CoinbaseAmounts, CoinbaseThresholds } from '../types/token'
import { STACKS_NETWORK } from './common'
import { getStacksBlockHeight } from './stacks'

//////////////////////////////////////////////////
// ACTIVATION FUNCTIONS
//////////////////////////////////////////////////

export async function getActivationBlock(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-activation-block',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer
  }, true)
}

export async function getActivationTarget(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-activation-target',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer
  }, true)
}

export async function getCityWallet(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.auth.name,
    functionName: 'get-city-wallet',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer
  }, true)
}

export async function getRegisteredUsersNonce(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-registered-users-nonce',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer
  }, true)
}

export async function getUser(cityConfig: CityConfig, id: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-user',
    functionArgs: [uintCV(id)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getUserId(cityConfig: CityConfig, address: string): Promise<string> {
  if (!validateStacksAddress(address)) {
    throw new Error(`Invalid Stacks address: ${address}`)
  }
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-user-id',
    functionArgs: [standardPrincipalCV(address)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

//////////////////////////////////////////////////
// MINING FUNCTIONS
//////////////////////////////////////////////////

export async function getBlockWinnerId(cityConfig: CityConfig, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-block-winner-id',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getMiningStatsAtBlock(cityConfig: CityConfig, blockHeight: string): Promise<MiningStatsAtBlock> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-mining-stats-at-block',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getMinerAtBlock(cityConfig: CityConfig, blockHeight: string, userId: string): Promise<MinerAtBlock> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-miner-at-block',
    functionArgs: [uintCV(blockHeight), uintCV(userId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getLastHighValueAtBlock(cityConfig: CityConfig, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-last-high-value-at-block',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function hasMinedAtBlock(cityConfig: CityConfig, blockHeight: string, userId: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'has-mined-at-block',
    functionArgs: [uintCV(blockHeight), uintCV(userId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

//////////////////////////////////////////////////
// MINING CLAIM FUNCTIONS
//////////////////////////////////////////////////

export async function canClaimMiningReward(cityConfig: CityConfig, address: string, blockHeight: string): Promise<string> {
  if (!validateStacksAddress(address)) {
    throw new Error(`Invalid Stacks address: ${address}`)
  }
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'can-claim-mining-reward',
    functionArgs: [standardPrincipalCV(address), uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function isBlockWinner(cityConfig: CityConfig, address: string, blockHeight: string): Promise<string> {
  if (!validateStacksAddress(address)) {
    throw new Error(`Invalid Stacks address: ${address}`)
  }
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'is-block-winner',
    functionArgs: [standardPrincipalCV(address), uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

//////////////////////////////////////////////////
// STACKING FUNCTIONS
//////////////////////////////////////////////////

export async function getStackingStatsAtCycle(cityConfig: CityConfig, cycleId: string): Promise<StackingStatsAtCycle> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-stacking-stats-at-cycle',
    functionArgs: [uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getStackerAtCycle(cityConfig: CityConfig, cycleId: string, userId: string): Promise<StackerAtCycle> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-stacker-at-cycle',
    functionArgs: [uintCV(cycleId), uintCV(userId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getRewardCycle(cityConfig: CityConfig, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-reward-cycle',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getFirstStacksBlockInRewardCycle(cityConfig: CityConfig, cycleId: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-first-stacks-block-in-reward-cycle',
    functionArgs: [uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function stackingActiveAtCycle(cityConfig: CityConfig, cycleId: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'stacking-active-at-cycle',
    functionArgs: [uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

//////////////////////////////////////////////////
// STACKING CLAIM FUNCTIONS
//////////////////////////////////////////////////

export async function getStackingReward(cityConfig: CityConfig, cycleId: string, userId: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-stacking-reward',
    functionArgs: [uintCV(userId), uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

//////////////////////////////////////////////////
// TOKEN FUNCTIONS
//////////////////////////////////////////////////

export async function getCoinbaseAmounts(cityConfig: CityConfig): Promise<CoinbaseAmounts> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-coinbase-amounts',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getCoinbaseThresholds(cityConfig: CityConfig): Promise<CoinbaseThresholds> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.token.name,
    functionName: 'get-coinbase-thresholds',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getCoinbaseAmount(cityConfig: CityConfig, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.core.name,
    functionName: 'get-coinbase-amount',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getName(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.token.name,
    functionName: 'get-name',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getSymbol(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.token.name,
    functionName: 'get-symbol',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getDecimals(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.token.name,
    functionName: 'get-decimals',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getBalance(cityConfig: CityConfig, address: string): Promise<string> {
  if (!validateStacksAddress(address)) {
    throw new Error(`Invalid Stacks address: ${address}`)
  }
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.token.name,
    functionName: 'get-balance',
    functionArgs: [standardPrincipalCV(address)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getTotalSupply(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.token.name,
    functionName: 'get-total-supply',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

export async function getTokenUri(cityConfig: CityConfig): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.deployer,
    contractName: cityConfig.token.name,
    functionName: 'get-token-uri',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.deployer,
  }, true)
}

//////////////////////////////////////////////////
// UTILITY FUNCTIONS
//////////////////////////////////////////////////

export async function getProofOfHodl(cityConfig: CityConfig, address: string): Promise<boolean> {
  let userId: string
  let balance: string
  let stacker: StackerAtCycle
  if (!validateStacksAddress(address)) {
    throw new Error(`Invalid Stacks address: ${address}`)
  }
  try {
    // check if user has a balance
    userId = await getUserId(cityConfig, address)
    if (userId === null) {
      throw new Error(`Address not found: ${address}`)
    }
    balance = await getBalance(cityConfig, address)
    if (+balance > 0) return true
    const currentBlock = await getStacksBlockHeight()
    const currentCycle = await getRewardCycle(cityConfig, currentBlock)
    // check if user is stacking at current cycle
    stacker = await getStackerAtCycle(cityConfig, currentCycle, userId)
    if (stacker === null) { return false } else { return true }
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message)
    throw new Error(String(err))
  }
}
