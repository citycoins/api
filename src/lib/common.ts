import { StacksMainnet } from 'micro-stacks/network'
import { SingleValue } from '../types/common'

export const STACKS_NETWORK = new StacksMainnet()

export const MICRO_UNITS = 1000000

// converts "value" into "value: value"
export async function createSingleValue(
  value: boolean | number | string,
): Promise<SingleValue> {
  return { value: value }
}

// formatter for responses in all handlers
export async function createResponse(
  value: boolean | number | string,
  format = 'json',
): Promise<SingleValue | boolean | number | string> {
  // return only the value
  if (format === 'raw') {
    return value
  }
  // default, return value: value
  if (format === 'json') {
    return await createSingleValue(value)
  }
  throw new Error(`Unrecognized output format: ${format}`)
}

// fix for isNaN not being reliable
export function isStringAllDigits(value: string): boolean {
  return value.match(/^[0-9]+$/g) !== null
}
