import { Request as IttyRequest } from 'itty-router'
import { getStackerAtCycle } from "../../lib/citycoins"
import { getCityConfig } from '../../types/cities';
import { StackerAtCycle } from "../../types/stacking";

const GetStackerAtCycle = async (request: IttyRequest): Promise<Response> => {
  // check inputs
  const city = request.params?.cityname ?? undefined
  const cycle = request.params?.cycleid ?? undefined
  const userId = request.params?.userid ?? undefined
  if (city === undefined || cycle === undefined || userId === undefined) {
    return new Response(`Invalid request, missing parameter(s)`, { status: 400 })
  }
  // get city configuration object
  const cityConfig = await getCityConfig(city)
  if (cityConfig.deployer === '') {
    return new Response(`City name not found: ${city}`, { status: 404 })
  }
  // verify target cycle is valid
  const cycleValue = parseInt(cycle)
  if (isNaN(cycleValue)) {
    return new Response(`Target cycle not specified or invalid`, { status: 400 })
  }
  // verify user ID is valid
  const userIdValue = parseInt(userId)
  if (isNaN(userIdValue)) {
    return new Response(`User ID not specified or invalid`, { status: 400 })
  }
  // get stacker stats at cycle
  const stackerAtCycle: StackerAtCycle = await getStackerAtCycle(cityConfig, cycleValue, userIdValue);
  // return response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
  if (stackerAtCycle === null) {
    return new Response(`Stacker ${userIdValue} not found at reward cycle: ${cycleValue}`, { status: 404 })
  }
  return new Response(JSON.stringify(stackerAtCycle), { headers })
}

export default GetStackerAtCycle
