import { Request as IttyRequest } from 'itty-router'
import { filterMiningTxs } from '../../lib/citycoins';
import { isStringAllDigits } from '../../lib/common';
import { getTxsAtBlock } from '../../lib/stacks';
import { getCityConfig } from '../../types/cities';
import { MiningDataAtBlock } from '../../types/mining';

const GetMiningDataAtBlock = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const blockHeight = request.params?.blockheight ?? undefined
  if (city === undefined || blockHeight === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // verify block height is valid
  if (!isStringAllDigits(blockHeight)) {
    return new Response(`Block height not specified or invalid`, { status: 400 })
  }
  
  // TODO: check if blockheight is between contract startBlock and current block

  // get all transactions at block height
  const txs = await getTxsAtBlock(blockHeight)
  const results = txs.results

  // filter to match mining tx for selected city
  const miningTxs = await filterMiningTxs(cityConfig, results)

  // build data to return
  
  // issue: how to know block data is "complete" from past mine-manys?

  // idea: have a flag that confirms the last n blocks are complete
  // n could be 200 to capture all mine manys previous
  // have cron script build initial data 200 blocks at a time
  // could use metadata on KV to avoid modifying object
  // cron script could continue updating block data on slower intervals
  // also can list/target/use metadata value for data consistency
  
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  return new Response(JSON.stringify(miningTxs), { headers })
}

export default GetMiningDataAtBlock
