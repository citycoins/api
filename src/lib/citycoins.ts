import { fetchReadOnlyFunction } from 'micro-stacks/api'
import { standardPrincipalCV, uintCV } from 'micro-stacks/clarity'
import { CityVersion } from '../types/cities'
import { MinerAtBlock, MiningStatsAtBlock } from '../types/mining'
import { StackerAtCycle, StackingStatsAtCycle } from '../types/stacking'
import { CoinbaseThresholds } from '../types/token'
import { STACKS_NETWORK } from './common'
import { getStacksBlockHeight } from './stacks'

//////////////////////////////////////////////////
// ACTIVATION FUNCTIONS
//////////////////////////////////////////////////

export async function getActivationBlock(cityConfig: CityVersion): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-activation-block',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer
  }, true)
}

export async function getRegisteredUsersNonce(cityConfig: CityVersion): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-registered-users-nonce',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer
  }, true)
}

export async function getUser(cityConfig: CityVersion, id: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-user',
    functionArgs: [uintCV(id)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getUserId(cityConfig: CityVersion, address: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-user-id',
    functionArgs: [standardPrincipalCV(address)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

//////////////////////////////////////////////////
// MINING FUNCTIONS
//////////////////////////////////////////////////

export async function getBlockWinnerId(cityConfig: CityVersion, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-block-winner-id',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getMiningStatsAtBlock(cityConfig: CityVersion, blockHeight: string): Promise<MiningStatsAtBlock> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-mining-stats-at-block',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getMinerAtBlock(cityConfig: CityVersion, blockHeight: string, userId: string): Promise<MinerAtBlock> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-miner-at-block',
    functionArgs: [uintCV(blockHeight), uintCV(userId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getLastHighValueAtBlock(cityConfig: CityVersion, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-last-high-value-at-block',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function hasMinedAtBlock(cityConfig: CityVersion, blockHeight: string, userId: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'has-mined-at-block',
    functionArgs: [uintCV(blockHeight), uintCV(userId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

//////////////////////////////////////////////////
// MINING CLAIM FUNCTIONS
//////////////////////////////////////////////////

export async function canClaimMiningReward(cityConfig: CityVersion, address: string, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'can-claim-mining-reward',
    functionArgs: [standardPrincipalCV(address), uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function isBlockWinner(cityConfig: CityVersion, address: string, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'is-block-winner',
    functionArgs: [standardPrincipalCV(address), uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

//////////////////////////////////////////////////
// STACKING FUNCTIONS
//////////////////////////////////////////////////

export async function getStackingStatsAtCycle(cityConfig: CityVersion, cycleId: string): Promise<StackingStatsAtCycle> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-stacking-stats-at-cycle',
    functionArgs: [uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getStackerAtCycle(cityConfig: CityVersion, cycleId: string, userId: string): Promise<StackerAtCycle> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-stacker-at-cycle',
    functionArgs: [uintCV(cycleId), uintCV(userId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getRewardCycle(cityConfig: CityVersion, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-reward-cycle',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getFirstStacksBlockInRewardCycle(cityConfig: CityVersion, cycleId: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-first-stacks-block-in-reward-cycle',
    functionArgs: [uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function stackingActiveAtCycle(cityConfig: CityVersion, cycleId: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'stacking-active-at-cycle',
    functionArgs: [uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

//////////////////////////////////////////////////
// STACKING CLAIM FUNCTIONS
//////////////////////////////////////////////////

export async function getStackingReward(cityConfig: CityVersion, cycleId: string, userId: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-stacking-reward',
    functionArgs: [uintCV(userId), uintCV(cycleId)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

//////////////////////////////////////////////////
// TOKEN FUNCTIONS
//////////////////////////////////////////////////

export async function getCoinbaseThresholds(cityConfig: CityVersion): Promise<CoinbaseThresholds> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.token,
    functionName: 'get-coinbase-thresholds',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getCoinbaseAmount(cityConfig: CityVersion, blockHeight: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.core,
    functionName: 'get-coinbase-amount',
    functionArgs: [uintCV(blockHeight)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getName(cityConfig: CityVersion): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.token,
    functionName: 'get-name',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getSymbol(cityConfig: CityVersion): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.token,
    functionName: 'get-symbol',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getDecimals(cityConfig: CityVersion): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.token,
    functionName: 'get-decimals',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getBalance(cityConfig: CityVersion, address: string): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.token,
    functionName: 'get-balance',
    functionArgs: [standardPrincipalCV(address)],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getTotalSupply(cityConfig: CityVersion): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.token,
    functionName: 'get-total-supply',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

export async function getTokenUri(cityConfig: CityVersion): Promise<string> {
  return fetchReadOnlyFunction({
    contractAddress: cityConfig.contracts.deployer,
    contractName: cityConfig.contracts.token,
    functionName: 'get-token-uri',
    functionArgs: [],
    network: STACKS_NETWORK,
    senderAddress: cityConfig.contracts.deployer,
  }, true)
}

//////////////////////////////////////////////////
// UTILITY FUNCTIONS
//////////////////////////////////////////////////

export async function getProofOfHodl(cityConfig: CityVersion, address: string): Promise<boolean> {
  // check if the user has a balance
  // if so, return true
  const balance = await getBalance(cityConfig, address)
    .catch(() => { return '' })
  if (+balance > 0) {
    return true
  } else {
    // check if the user is stacking in the current cycle
    // if so, return true
    const userId = await getUserId(cityConfig, address)
      .catch(() => { return '' })
    if (userId === null || userId === '') { return false }
    const currentBlock = await getStacksBlockHeight()
    const currentCycle = await getRewardCycle(cityConfig, currentBlock)
    const stacker = await getStackerAtCycle(cityConfig, currentCycle, userId)
    if (stacker === null) { return false } else { return true }
  }
}
