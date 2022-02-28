
const landingHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="utf-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="title" content="CityCoins API" />
  <meta name="description" content="A simple API to interact with Stacks and CityCoins data." />
  <meta name="keywords" content="API, Cloudflare, Stacks" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="English" />
  <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
  <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
  <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
  <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
  <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
  <meta name="theme-color" content="#ffffff" />
  <title>CityCoins API</title>
</head>
<body style="text-align: center; max-width: 600px; margin: 0 auto; padding: 1em">
<img src="/citycoins-api-logo.png" alt="CityCoins API Logo" style="width: 100%; max-width: 300px; margin: 0 auto;">
<p>CF Workers + IttyRouter + micro-stacks + TypeScript</p>
<p style="font-weight: bold">...and it feels <span style="font-style: italic;">good!</span></p>
<hr />
<h2>Things to Note</h2>
<ul style="max-width: fit-content; text-align: left; margin: 0 auto;">
  <li>uses simple typed responses and provides detailed error messages</li>
  <li>all <code>:cityname</code> routes accept three letter city names, e.g. mia, nyc</li>
  <li>all <code>:blockheight</code> routes always follow <code>:cityname</code> routes when required</li>
  <li>all additional parameters follow <code>:cityname</code> and <code>:blockheight</code> routes</li>
  <li>routes are structured the same as the contract functions and documentation</li>
</ul>
<p>If you want to use this for your project, build a copy for yourself, or have any questions, please join the <a href="https://discord.gg/citycoins" target="_blank" rel="noreferrer">CityCoins Discord</a> or <a href="https://github.com/citycoins/api/issues/new" target="_blank" rel="noreferrer">file a GitHub Issue</a> and reach out!</p>
<h2>Endpoint Examples</h2>
<p>A full list of routes and responses can be found in the <a href="/docs" rel="noreferrer">OpenAPI documentation</a>.</p>
<div style="max-width: fit-content; text-align: left; margin: 0 auto;">
  <p>Some quick examples:</p>
  <a href="https://api.citycoins.co/stacks/get-block-height" target="_blank" rel="noreferrer">Get the current Stacks block height</a><br />
  <a href="https://api.citycoins.co/activation/get-activation-block/mia" target="_blank" rel="noreferrer">Get the activation block height for MIA</a><br />
  <a href="https://api.citycoins.co/mining/get-mining-stats-at-block/mia/49000" target="_blank" rel="noreferrer">Get the mining stats at block 49000 for MIA</a><br />
  <a href="https://api.citycoins.co/token/get-total-supply/mia" target="_blank" rel="noreferrer">Get the total supply for MIA</a><br />
  <p> Source code is <a href="https://github.com/citycoins/api" target="_blank" rel="noreferrer">available on GitHub!</a></p>
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
  return new Response(landingHtml, { headers })
}

export default Landing
