// CONFIGURATION

export interface CityConfig {
  [version: string]: CityVersion
}

export interface CityVersion {
  cityName: string,
  contracts: CityContracts,
  status: CityStatus,
  token: CityToken,
}

export interface CityContracts {
  auth: string,
  core: string,
  token: string,
  deployer: string,
}

export interface CityStatus {
  activated: boolean,
  startBlock?: number,
  deployed: boolean,
  shutdown: boolean,
  shutdownBlock?: number,
}

export interface CityToken {
  activationBlock?: number,
  displayName: string,
  name: string,
  symbol: string,
  decimals: number,
  logo: string,
  uri: string,
}

// MIAMICOIN

const miaConfig: CityConfig = {
  'v1': {
    cityName: 'Miami',
    contracts: {
      auth: 'miamicoin-auth',
      core: 'miamicoin-core-v1',
      token: 'miamicoin-token',
      deployer: 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27',
    },
    status: {
      activated: false,
      deployed: false,
      shutdown: false,
    },
    token: {
      displayName: 'MiamiCoin',
      name: 'miamicoin',
      symbol: 'MIA',
      decimals: 0,
      logo: 'https://cdn.citycoins.co/logos/miamicoin.png',
      uri: 'https://cdn.citycoins.co/metadata/miamicoin.json',
    }
  },
  'v2': {
    cityName: 'Miami',
    contracts: {
      auth: 'miamicoin-auth-v2',
      core: 'miamicoin-core-v2',
      token: 'miamicoin-token-v2',
      deployer: 'SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R',
    },
    status: {
      activated: false,
      deployed: false,
      shutdown: false,
    },
    token: {
      displayName: 'MiamiCoin',
      name: 'miamicoin',
      symbol: 'MIA',
      decimals: 6,
      logo: 'https://cdn.citycoins.co/logos/miamicoin.png',
      uri: 'https://cdn.citycoins.co/metadata/miamicoin.json',
    }
  }
}

// NEWYORKCITYCOIN

const nycConfig: CityConfig = {
  'v1': {
    cityName: 'New York City',
    contracts: {
      auth: 'newyorkcitycoin-auth',
      core: 'newyorkcitycoin-core-v1',
      token: 'newyorkcitycoin-token',
      deployer: 'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5',
    },
    status: {
      activated: false,
      deployed: false,
      shutdown: false,
    },
    token: {
      displayName: 'NewYorkCityCoin',
      name: 'newyorkcitycoin',
      symbol: 'NYC',
      decimals: 0,
      logo: '',
      uri: '',
    }
  },
  'v2': {
    cityName: 'New York City',
    contracts: {
      auth: 'newyorkcitycoin-auth-v2',
      core: 'newyorkcitycoin-core-v2',
      token: 'newyorkcitycoin-token-v2',
      deployer: 'SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11',
    },
    status: {
      activated: false,
      deployed: false,
      shutdown: false,
    },
    token: {
      displayName: 'NewYorkCityCoin',
      name: 'newyorkcitycoin',
      symbol: 'NYC',
      decimals: 6,
      logo: '',
      uri: '',
    }
  }
}

export async function getCityConfig(city: string, version: string): Promise<CityVersion> {
  version = version.toLowerCase()
  switch (city.toLowerCase()) {
    case "mia":
      if (Object.prototype.hasOwnProperty.call(miaConfig, version)) return miaConfig[version]
      throw new Error(`Invalid city name or version ${city} ${version}`)
    case "nyc":
      if (Object.prototype.hasOwnProperty.call(nycConfig, version)) return nycConfig[version]
      throw new Error(`Invalid city name or version ${city} ${version}`)
    default:
      throw new Error(`Invalid city name or version ${city} ${version}`)
  }
}
