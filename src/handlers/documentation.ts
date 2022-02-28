const docsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!-- Title and Description -->
  <title>CityCoins API Documentation</title>
  <meta name="title" content="CityCoins API Documentation" />
  <meta name="description" content="The OpenAPI specification and documentation for the CityCoins API." />
  <meta name="keywords" content="API, Cloudflare, Stacks" />
  <!-- Google / Search Engine Meta Tags -->
  <meta itemprop="name" content="CityCoins API Documentation" />
  <meta itemprop="description" content="The OpenAPI specification and documentation for the CityCoins API." />
  <meta itemprop="image" content="/citycoins-api-logo.png" />
  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://api.citycoins.co" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="CityCoins API Documentation" />
  <meta property="og:description" content="The OpenAPI specification and documentation for the CityCoins API." />
  <meta property="og:image" content="/citycoins-api-logo.png" />
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="CityCoins API Documentation" />
  <meta name="twitter:description" content="The OpenAPI specification and documentation for the CityCoins API." />
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
</head>
<body style="margin: 0; padding: 0;">
<redoc spec-url='/openapi.yml'></redoc>
<script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js"> </script>
</body>
</html>
`

const Documentation = async (): Promise<Response> => {
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8',
  }
  return new Response(docsHtml, { headers })
}

export default Documentation
