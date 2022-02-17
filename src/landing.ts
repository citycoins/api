
const landingPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CityCoins API</title>
</head>
<body style="text-align: center; max-width: 600px; margin: 0 auto">
<h1>Probably Nothing</h1>
<p>CF Workers + IttyRouter + micro-stacks + TypeScript</p>
<p style="font-weight: bold">...and it feels <span style="font-style: italic;">good!</span></p>
<hr />
<h2>Things to Note</h2>
<ul style="max-width: fit-content; text-align: left; margin: 0 auto;">
  <li>use simple responses with plain text for values and JSON for tuples</li>
  <li>all :cityname routes accept three letter city names, e.g. mia, nyc</li>
  <li>all :blockheight routes always follow :cityname routes when required</li>
  <li>all additional parameters follow :cityname and :blockheight routes</li>
  <li>routes are structured the same as the contract functions and documentation</li>
</ul>
<p style="font-weight: bold">This is an early stage experiment and will be open-sourced soon!</p>
<h2>Endpoint Examples</h2>
<div style="max-width: fit-content; text-align: left; margin: 0 auto;">
  <a href="https://api.citycoins.co/stacks-block-height" target="_blank" rel="noreferrer">Get the current Stacks block height</a><br />
  <a href="https://api.citycoins.co/activation/get-activation-block/mia" target="_blank" rel="noreferrer">Get the activation block height for MIA</a><br />
  <a href="https://api.citycoins.co/activation/get-registered-users-nonce/mia" target="_blank" rel="noreferrer">Get total registered users for MIA</a><br />
  <a href="https://api.citycoins.co/activation/get-user/nyc/682" target="_blank" rel="noreferrer">Get an address using ID for NYC</a><br />
  <a href="https://api.citycoins.co/activation/get-user-id/nyc/SP1FJ0MY8M18KZF43E85WJN48SDXYS1EC4BCQW02S" target="_blank" rel="noreferrer">Get an ID using an address for NYC</a><br />
  <a href="https://api.citycoins.co/mining/mining-stats-at-block/mia/49000" target="_blank" rel="noreferrer">Get the mining stats at block 49000 for MIA</a><br />
  <a href="https://api.citycoins.co/mining/miner-at-block/nyc/49000/SP1FJ0MY8M18KZF43E85WJN48SDXYS1EC4BCQW02S" target="_blank" rel="noreferrer">Get the miner info for an address at block 49000 for NYC</a><br />
  <a href="https://api.citycoins.co/token/total-supply/mia" target="_blank" rel="noreferrer">Get the total supply for MIA</a><br />
</div>
<hr />
<blockquote>
  “Continuous effort, not strength or intelligence<br />
  is the key to unlocking our potential.”<br /><br />
  Winston Churchill
</blockquote>
</body>
</html>
`

const Landing = async (): Promise<Response> => {
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(landingPage, { headers })
}

export default Landing
