import { StacksMainnet } from "micro-stacks/network"
import { SingleValue } from "../types/common";

export const STACKS_NETWORK = new StacksMainnet();

export async function createSingleValue(value: string): Promise<SingleValue> {
  return { value: value }
}
