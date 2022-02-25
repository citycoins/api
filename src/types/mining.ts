
// matches contract map
export interface MiningStatsAtBlock {
  minersCount: number,
  amount: number,
  amountToCity: number,
  amountToStackers: number,
  rewardClaimed: boolean,
}

// matches contract map
export interface MinerAtBlock {
  ustx: number,
  lowValue: number,
  highValue: number,
  winner: boolean,
}

// custom format, inspired by Jamil's
// miamining.com/mining.nyc blocks endpoint

export interface BlockWinner {
  miner: string
  commitment: number
  reward: number
}

export interface MiningDataAtBlock {
  miners: {
    // address: commitment
    [key: string]: number
  },
  claimed: boolean,
  winner: BlockWinner,
}
/*
{
    "miners": {
      "address": "ustx",
      "address": "ustx",
      "address": "ustx",
      "address": "ustx"
    },
    "claimed": "boolean",
    "winner": {
      "miner": "address",
      "commitment": "ustx",
      "reward": "citycoins"
    }
  }
  */
