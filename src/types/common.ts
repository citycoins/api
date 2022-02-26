
export interface SingleValue {
  value: string | boolean
}

export interface Prices {
  [key: string]: number
}

export interface CGSimplePrice {
  [key: string]: {
    [key: string]: number
  }
}
