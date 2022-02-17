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
