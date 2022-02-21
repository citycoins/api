# CityCoins API

## Probably Nothing

CF Workers + IttyRouter + micro-stacks + TypeScript

**...and it feels _good!_**

## Things to Note

- uses simple responses with plain text for values and JSON for tuples
- all `:cityname` routes accept three letter city names, e.g. mia, nyc
- all `:blockheight` routes always follow `:cityname` routes when required
- all additional parameters follow `:cityname` and `:blockheight` routes
- routes are structured the same as the contract functions and documentation

**This is an early stage experiment in alpha and endpoints may change.**

## Implementation

If you would like to use this with an app, please file an issue or reach out in the [CityCoins Discord](https://discord.gg/citycoins) and let us know, we'd love to credit you here!

If you want to use this for your project, build a copy for yourself, or have any questions, please join the [CityCoins Discord](https://discord.gg/citycoins) or [file a GitHub Issue](https://github.com/citycoins/api/issues/new) and reach out!

## Development

Static assets in the `/static` folder are pushed to Cloudflare Workers KV store automatically, but require a custom match to the URL path in order to serve files from `index.ts`.

All other paths are controlled by the IttyRouter in `handler.ts`.

Any pushes to the `develop` branch are automatically built and [available here for testing](https://citycoins-api.citycoins.workers.dev).

Any pushes to the `main` branch are automatically built and [available on the main site](https://api.citycoins.co).

## Endpoint Examples

A full list of routes and responses can be found in the [OpenAPI documentation](https://api.citycoins.co/docs).

Some quick examples:

- [Get the current Stacks block height](https://api.citycoins.co/stacks/get-block-height)
- [Get the activation block height for MIA](https://api.citycoins.co/activation/get-activation-block/mia)
- [Get the mining stats at block 49000 for MIA](https://api.citycoins.co/mining/get-mining-stats-at-block/mia/49000)
- [Get the total supply for MIA](https://api.citycoins.co/token/get-total-supply/mia)

> “Continuous effort, not strength or intelligence
> is the key to unlocking our potential.”
>
> Winston Churchill
