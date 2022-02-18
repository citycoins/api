# CityCoins API

## Probably Nothing

CF Workers + IttyRouter + micro-stacks + TypeScript

**...and it feels _good!_**

## Things to Note

- use simple responses with plain text for values and JSON for tuples
- all `:cityname` routes accept three letter city names, e.g. mia, nyc
- all `:blockheight` routes always follow `:cityname` routes when required
- all additional parameters follow `:cityname` and `:blockheight` routes
- routes are structured the same as the contract functions and documentation

**This is an early stage experiment and will be open-sourced soon!**

## Implementation

If you would like to use this with an app, please file an issue or reach out in the [CityCoins Discord](https://discord.gg/citycoins) and let us know, we'd love to credit you here!

If you'd like to request an endpoint, please [file an isssue](https://github.com/citycoins/api/issues/new) and let us know, this API is meant to evolve!

## Endpoint Examples

- [Get the current Stacks block height](https://api.citycoins.co/stacks-block-height)
- [Get the activation block height for MIA](https://api.citycoins.co/activation/get-activation-block/mia)
- [Get total registered users for MIA](https://api.citycoins.co/activation/get-registered-users-nonce/mia)
- [Get an address using ID for NYC](https://api.citycoins.co/activation/get-user/nyc/682)
- [Get an ID using an address for NYC](https://api.citycoins.co/activation/get-user-id/nyc/SP1FJ0MY8M18KZF43E85WJN48SDXYS1EC4BCQW02S)
- [Get the mining stats at block 49000 for MIA](https://api.citycoins.co/mining/mining-stats-at-block/mia/49000)
- [Get the miner info for an address at block 49000 for NYC](https://api.citycoins.co/mining/miner-at-block/nyc/49000/SP1FJ0MY8M18KZF43E85WJN48SDXYS1EC4BCQW02S)
- [Get the total supply for MIA](https://api.citycoins.co/token/total-supply/mia)

> “Continuous effort, not strength or intelligence
> is the key to unlocking our potential.”
>
> Winston Churchill
