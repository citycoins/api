
export interface MiningStatsAtBlock {
  minersCount: number,
  amount: number,
  amountToCity: number,
  amountToStackers: number,
  rewardClaimed: boolean,
}

export interface MinerAtBlock {
  ustx: number,
  lowValue: number,
  highValue: number,
  winner: boolean,
}
