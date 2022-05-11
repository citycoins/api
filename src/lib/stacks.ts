import { STACKS_NETWORK } from './common'

export async function getStacksBlockHeight(): Promise<string> {
  const url = `${STACKS_NETWORK.getCoreApiUrl()}/v2/info`
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      return response.json() as Promise<{ stacks_tip_height: string }>
    })
    .then(data => { return data.stacks_tip_height })
}

export async function getStxBalance(address: string): Promise<string> {
  const url = `${STACKS_NETWORK.getCoreApiUrl()}/extended/v1/address/${address}/stx`
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      return response.json() as Promise<{ balance: string }>
    })
    .then(data => { return data.balance })
}

export async function getBnsName(address: string): Promise<string> {
  const url = `${STACKS_NETWORK.getCoreApiUrl()}/v1/addresses/stacks/${address}`
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      return response.json() as Promise<{ names: string }>
    })
    .then(data => { return String(data.names[0]) })
}

export async function getDateAtBlock(blockHeight: string): Promise<string> {
  const url = `${STACKS_NETWORK.getCoreApiUrl()}/extended/v1/block/by_height/${blockHeight}`
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      return response.json() as Promise<{ burn_block_time_iso: string }>
    })
    .then(data => { return data.burn_block_time_iso })
}