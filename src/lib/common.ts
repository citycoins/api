import { StacksMainnet } from "micro-stacks/network"
import { SingleValue } from "../types/common";

export const STACKS_NETWORK = new StacksMainnet();

export async function createSingleValue(value: string): Promise<SingleValue> {
  return { value: value }
}

// fix for isNaN not being reliable
export function isStringAllDigits(value: string): boolean {
  return value.match(/^[0-9]+$/g) !== null
}
