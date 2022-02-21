import { handleRequest } from './handler'
import { getAssetFromKV, MethodNotAllowedError, NotFoundError } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', (event) => {
  // check if item should be downloaded from KV
  if (matchDownload(event.request.url)) {
    console.log(event.request.url)
    event.respondWith(returnDownload(event))
  } else {
    // otherwise route the request to itty-router
    event.respondWith(handleRequest(event.request))
  }
})

// returns true if the URL matches a given string
function matchDownload(target: string): boolean {
  const url = new URL(target)
  if (url.pathname === '/openapi.yml') {
    return true
  }
  return false
}

// returns the response from KV for the asset
async function returnDownload(event: FetchEvent): Promise<Response> {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    if (e instanceof NotFoundError) {
      const pathname = new URL(event.request.url).pathname
      return new Response(`Resource not found at ${pathname}`, { status: 404 })
    } else if (e instanceof MethodNotAllowedError) {
      return new Response('Access denied or invalid request', { status: 403 })
    } else {
      return new Response('An unexpected error occurred', { status: 500 })
    }
  }
}
