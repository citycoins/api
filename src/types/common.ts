
export interface SingleValue {
  value: string
}

export interface Prices {
  [key: string]: number
}

export interface CGSimplePrice {
  [key: string]: {
    [key: string]: number
  }
}
