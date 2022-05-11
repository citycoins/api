# CityCoins API

## Probably Nothing

CF Workers + IttyRouter + micro-stacks + TypeScript

**...and it feels _good!_**

## Things to Note

- uses simple typed responses and provides detailed error messages
- all CityCoin contract routes start with `:version` and `:cityname`
  - e.g. `/v1/mia/mining/get-mining-stats-at-block/57934`
- `:version` accepts the major CityCoins contract version, e.g. v1, v2
- `:cityname` routes accept three letter city names, e.g. mia, nyc
- all additional parameters follow the order of operations below
  - `:blockheight > :cycleid > :userid > :address`
- routes are structured the same as the contract functions and documentation

## Implementation

If you want to use this for your project, build a copy for yourself, or have any questions, please join the [CityCoins Discord](https://discord.gg/citycoins) or [file a GitHub Issue](https://github.com/citycoins/api/issues/new) and reach out!

## Development

Static assets in the `/static` folder are pushed to Cloudflare Workers KV store automatically, but require a custom match to the URL path in order to serve files from `index.ts`.

All other paths are passed to the IttyRouter in `handler.ts`.

The API is divided into three main sections:

- handlers: individual endpoints that get/caculate a value and return the result
- lib: libraries to get or calculate data for handlers
- types: type definitions for utilities and responses

### How to Add a City

- add new city config as constant in `/src/types/cities.ts`
- update getCityConfig in `cities.ts` with case for new city
- update enum in `/static/openapi.yml` for reusable parameters

### How to Add an Endpoint

- create a new handler file in `/src/handlers`
  - all inputs must be checked or 400
  - city config must resolve or 404
  - any integers verified with `isStringAllDigits` or 400
  - response from getter or calcualation checked or 404
  - returns successful response
- (optional) add new getters in `/lib`
- (optional) add new types in `/types`
- add new handler file and route to `/src/handler.ts`
  - if querying city data, starts with: `:version/:cityname/`
  - order of operations: `:blockheight > :cycleid > :userid > :address`
- add new endpoint to `/static/openapi.yml`
  - routes get added to the corresponding section
    - routes get tagged by their category (matches directory)
    - routes always use ref for parameters and responses
  - reusable parameters and responses are at the bottom of the file

**Special case:** if the response is a custom type, e.g. `MiningStatsAtBlock`, an example for the responses must be added manually to `/static/openapi.yml`

### Deployment

Local development is possible with `wrangler`:

- install with NPM: `npm i @cloudflare/wrangler -g` (or [cargo](https://developers.cloudflare.com/workers/cli-wrangler/install-update/))
- run `wrangler dev` to start up the development server
- navigate to `http://127.0.0.1:8787` to see the API

Any pull requests should point to the `develop` branch.

Any pushes to the `develop` branch are automatically built and [available here for testing](https://citycoins-api.citycoins.workers.dev).

Any pushes to the `main` branch are automatically built and [available on the main site](https://api.citycoins.co).

This project uses [SemVer](https://semver.org/) for versioning.

Version numbers should be updated in `/package.json` and `/static/openapi.yml`.

## Endpoint Examples

A full list of routes and responses can be found in the [OpenAPI documentation](https://api.citycoins.co/docs).

Some quick examples:

- [Get the current Stacks block height](https://api.citycoins.co/stacks/get-block-height)
- [Get the activation block height for MIA](https://api.citycoins.co/v1/mia/activation/get-activation-block)
- [Get the mining stats at block 49000 for MIA](https://api.citycoins.co/v1/mia/mining/get-mining-stats-at-block/49000)
- [Get the total supply for MIA](https://api.citycoins.co/v2/mia/token/get-total-supply)

> “Continuous effort, not strength or intelligence
> is the key to unlocking our potential.”
>
> Winston Churchill
