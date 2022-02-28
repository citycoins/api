export interface CityConfig {
  deployer: string,
  authContract: string,
  coreContract: string,
  tokenContract: string,
  tokenDisplayName: string,
  tokenName: string,
  tokenSymbol: string,
}

const emptyConfig: CityConfig = {
  deployer: '',
  authContract: '',
  coreContract: '',
  tokenContract: '',
  tokenDisplayName: '',
  tokenName: '',
  tokenSymbol: '',
}

const miaConfig: CityConfig = {
  deployer: "SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27",
  authContract: "miamicoin-auth",
  coreContract: "miamicoin-core-v1",
  tokenContract: "miamicoin-token",
  tokenDisplayName: "MiamiCoin",
  tokenName: "miamicoin",
  tokenSymbol: "MIA",
};

const nycConfig: CityConfig = {
  deployer: "SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5",
  authContract: "newyorkcitycoin-auth",
  coreContract: "newyorkcitycoin-core-v1",
  tokenContract: "newyorkcitycoin-token",
  tokenDisplayName: "NewYorkCityCoin",
  tokenName: "newyorkcitycoin",
  tokenSymbol: "NYC",
};

export async function getCityConfig(city: string): Promise<CityConfig> {
  switch (city.toLowerCase()) {
    case "mia":
      return miaConfig
    case "nyc":
      return nycConfig
    default:
      return emptyConfig
  }
}

/* IDEAS

interface CitySettings {
  config: CityConfig,
  cityName: string;
  cityWallet: string;
  deployed: boolean;
  activated: boolean;
  startBlock?: number;
}
// cityLogo: imported SVG?
// https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript

// another name: CityDetails

*/