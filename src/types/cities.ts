// CONFIGURATION

export interface CityList {
  [name: string]: CityInfo
}

export interface CityInfo {
  fullName: string
  logo: string
  versions: string[]
  currentVersion: string
}

export interface CityVersions {
  [version: string]: CityConfig
}

export interface CityConfig {
  cityName: string
  deployed: boolean
  deployer: string
  auth: AuthContract
  core: CoreContract
  token: TokenContract
}

export interface AuthContract {
  name: string
  initialized: boolean
}

export interface CoreContract {
  name: string
  activated: boolean
  startBlock?: number
  shutdown: boolean
  shutdownBlock?: number
}

export interface TokenContract {
  name: string
  activated: true
  activationBlock?: number
  displayName: string
  tokenName: string
  symbol: string
  decimals: number
  logo: string
  uri: string
}

// MIAMICOIN

const miaInfo: CityInfo = {
  fullName: 'Miami',
  logo: 'https://cdn.citycoins.co/brand/MIA_Miami/Coins/SVG/MiamiCoin_StandAlone_Coin.svg',
  versions: ['v1', 'v2'],
  currentVersion: 'v2',
}

const miaConfig: CityVersions = {
  v1: {
    cityName: 'Miami',
    deployed: true,
    deployer: 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27',
    auth: {
      name: 'miamicoin-auth',
      initialized: true,
    },
    core: {
      name: 'miamicoin-core-v1',
      activated: false,
      startBlock: 24497,
      shutdown: true,
      shutdownBlock: 58917,
    },
    token: {
      name: 'miamicoin-token',
      activated: true,
      activationBlock: 24497,
      displayName: 'MiamiCoin',
      tokenName: 'miamicoin',
      symbol: 'MIA',
      decimals: 0,
      logo: 'https://cdn.citycoins.co/logos/miamicoin.png',
      uri: 'https://cdn.citycoins.co/metadata/miamicoin.json',
    },
  },
  v2: {
    cityName: 'Miami',
    deployed: true,
    deployer: 'SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R',
    auth: {
      name: 'miamicoin-auth-v2',
      initialized: true,
    },
    core: {
      name: 'miamicoin-core-v2',
      activated: true,
      startBlock: 58921,
      shutdown: false,
    },
    token: {
      name: 'miamicoin-token-v2',
      activated: true,
      activationBlock: 24497,
      displayName: 'MiamiCoin',
      tokenName: 'miamicoin',
      symbol: 'MIA',
      decimals: 6,
      logo: 'https://cdn.citycoins.co/logos/miamicoin.png',
      uri: 'https://cdn.citycoins.co/metadata/miamicoin.json',
    },
  },
}

// NEWYORKCITYCOIN

const nycInfo: CityInfo = {
  fullName: 'New York City',
  logo: 'https://cdn.citycoins.co/brand/NYC_NewYorkCity/Coins/SVG/CC_NYCCoin_StandAloneCoin.svg',
  versions: ['v1', 'v2'],
  currentVersion: 'v2',
}

const nycConfig: CityVersions = {
  v1: {
    cityName: 'New York City',
    deployed: true,
    deployer: 'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5',
    auth: {
      name: 'newyorkcitycoin-auth',
      initialized: true,
    },
    core: {
      name: 'newyorkcitycoin-core-v1',
      activated: false,
      startBlock: 37449,
      shutdown: true,
      shutdownBlock: 58922,
    },
    token: {
      name: 'newyorkcitycoin-token',
      activated: true,
      activationBlock: 37449,
      displayName: 'NewYorkCityCoin',
      tokenName: 'newyorkcitycoin',
      symbol: 'NYC',
      decimals: 0,
      logo: 'https://cdn.citycoins.co/logos/newyorkcitycoin.png',
      uri: 'https://cdn.citycoins.co/metadata/newyorkcitycoin.json',
    },
  },
  v2: {
    cityName: 'New York City',
    deployed: true,
    deployer: 'SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11',
    auth: {
      name: 'newyorkcitycoin-auth-v2',
      initialized: true,
    },
    core: {
      name: 'newyorkcitycoin-core-v2',
      activated: true,
      startBlock: 58925,
      shutdown: false,
    },
    token: {
      name: 'newyorkcitycoin-token-v2',
      activated: true,
      activationBlock: 37449,
      displayName: 'NewYorkCityCoin',
      tokenName: 'newyorkcitycoin',
      symbol: 'NYC',
      decimals: 6,
      logo: 'https://cdn.citycoins.co/logos/newyorkcitycoin.png',
      uri: 'https://cdn.citycoins.co/metadata/newyorkcitycoin.json',
    },
  },
}

// GETTERS

export const cityList = ['mia', 'nyc']

export async function getCityList(): Promise<string[]> {
  return cityList
}

export async function getCityInfo(city: string): Promise<CityInfo> {
  switch (city) {
    case 'mia':
      return miaInfo
    case 'nyc':
      return nycInfo
    default:
      throw new Error(`Invalid city name: ${city}`)
  }
}

export async function getFullCityInfo(): Promise<CityList> {
  return {
    mia: miaInfo,
    nyc: nycInfo,
  }
}

export async function getCityConfig(
  city: string,
  version: string,
): Promise<CityConfig> {
  version = version.toLowerCase()
  switch (city.toLowerCase()) {
    case 'mia':
      if (Object.prototype.hasOwnProperty.call(miaConfig, version))
        return miaConfig[version]
      break
    case 'nyc':
      if (Object.prototype.hasOwnProperty.call(nycConfig, version))
        return nycConfig[version]
      break
  }
  throw new Error(`Invalid city name or version: ${city} ${version}`)
}

export async function getFullCityConfig(city: string): Promise<CityVersions> {
  switch (city.toLowerCase()) {
    case 'mia':
      return miaConfig
    case 'nyc':
      return nycConfig
    default:
      throw new Error(`Invalid city name: ${city}`)
  }
}
