
const landingHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!-- Title and Description -->
  <title>CityCoins API</title>
  <meta name="title" content="CityCoins API" />
  <meta name="description" content="A simple API to interact with Stacks and CityCoins data." />
  <meta name="keywords" content="API, Cloudflare, Stacks" />
  <!-- Google / Search Engine Meta Tags -->
  <meta itemprop="name" content="CityCoins API" />
  <meta itemprop="description" content="A simple API to interact with Stacks and CityCoins data." />
  <meta itemprop="image" content="/citycoins-api-logo.png" />
  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://api.citycoins.co" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="CityCoins API" />
  <meta property="og:description" content="A simple API to interact with Stacks and CityCoins data." />
  <meta property="og:image" content="/citycoins-api-logo.png" />
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="CityCoins API" />
  <meta name="twitter:description" content="A simple API to interact with Stacks and CityCoins data." />
  <meta name="twitter:image" content="/citycoins-api-logo.png" />
  <!-- Meta Tags Above Generated via http://heymeta.com -->
  <meta name="robots" content="index, follow" />
  <meta name="language" content="English" />
  <!-- Favicons and code below from https://favicon-generator.org -->
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
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
    }
    li {
      margin-bottom: 10px;
    }
  </style>
</head>
<body style="text-align: center; max-width: 600px; margin: 0 auto; padding: 1em">
<img src="/citycoins-api-logo.png" alt="CityCoins API Logo" style="width: 100%; max-width: 300px; margin: 0 auto;">
<p>CF Workers + IttyRouter + micro-stacks + TypeScript</p>
<p style="font-weight: bold">...and it feels <span style="font-style: italic;">good!</span></p>
<hr />
<h2>Things to Note</h2>
<ul style="max-width: fit-content; text-align: left; margin: 0 auto;">
  <li>uses simple typed responses and provides detailed error messages</li>
  <li>
    all CityCoin contract routes start with <code>:version</code> and <code>:cityname</code><br />
    e.g. <code>/v1/mia/mining/get-mining-stats-at-block/57934</code>
  </li>
  <li><code>:version</code> accepts the major CityCoins contract version, e.g. v1, v2</li>
  <li><code>:cityname</code> routes accept three letter city names, e.g. mia, nyc</li>
  <li>
    all additional parameters follow the order of operations below<br />
    <code>:blockheight > :cycleid > :userid > :address</code>
  </li>
  <li>routes are structured the same as the contract functions and documentation</li>
</ul>
<p>If you want to use this for your project, build a copy for yourself, or have any questions, please join the <a href="https://discord.gg/citycoins" target="_blank" rel="noreferrer">CityCoins Discord</a> or <a href="https://github.com/citycoins/api/issues/new" target="_blank" rel="noreferrer">file a GitHub Issue</a> and reach out!</p>
<h2>Endpoint Examples</h2>
<p>A full list of routes and responses can be found in the <a href="/docs" rel="noreferrer">OpenAPI documentation</a>.</p>
<div style="max-width: fit-content; text-align: left; margin: 0 auto;">
  <p>Some quick examples:</p>
  <a href="/stacks/get-block-height" target="_blank" rel="noreferrer">Get the current Stacks block height</a><br />
  <a href="/v2/mia/activation/get-activation-block" target="_blank" rel="noreferrer">Get the activation block height for MIA</a><br />
  <a href="/v1/mia/mining/get-mining-stats-at-block/49000" target="_blank" rel="noreferrer">Get the mining stats at block 49000 for MIA</a><br />
  <a href="/v2/mia/token/get-total-supply" target="_blank" rel="noreferrer">Get the total supply for MIA</a><br />
  <p>Source code is <a href="https://github.com/citycoins/api" target="_blank" rel="noreferrer">available on GitHub!</a></p>
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
