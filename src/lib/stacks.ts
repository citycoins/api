import { STACKS_NETWORK } from './common'

/**
 * @async
 * @function getBlockHeight
 * @description Returns the current Stacks block height
 * @returns {integer}
 */
export async function getStacksBlockHeight<T>(): Promise<T> {
  const url = `${STACKS_NETWORK.getCoreApiUrl()}/v2/info`
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      return response.json() as Promise<{ stacks_tip_height: T }>
    })
    .then(data => { return data.stacks_tip_height })
}
