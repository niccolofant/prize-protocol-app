import Moralis from 'moralis'
import Web3 from 'web3'
import { cUsdtABI } from './abis/cUsdtABI'
import { CUSDT_ADDRESS } from './constants'

/**
 * Returns the date of the lottery end
 *
 * @param startTimestamp The timestamp of the lottery start
 * @param drawingPeriod The length of the current lottery run
 * @returns The date of the lottery end
 */
export const getDrawingDate = (
  startTimestamp: string,
  drawingPeriod: string
): Date => {
  return new Date((parseInt(startTimestamp) + parseInt(drawingPeriod)) * 1000)
}

/**
 * Returns the Compound APY given a specified supply rate
 *
 * @param supplyRate The supply rate of a certain cToken
 * @returns The Compound APY
 */
export const getCompoundApy = async (): Promise<string> => {
  const ethMantissa = 1e18
  const rinkebyBlocksPerDay = 5760 // ~15 secs per block
  const daysPerYear = 365

  await Moralis.enableWeb3()
  const web3Js = new Web3(Moralis.provider as any)

  const cToken = new web3Js.eth.Contract(cUsdtABI as any, CUSDT_ADDRESS)
  const supplyRatePerBlock = await cToken.methods.supplyRatePerBlock().call()
  const supplyApy =
    (Math.pow(
      (supplyRatePerBlock / ethMantissa) * rinkebyBlocksPerDay + 1,
      daysPerYear
    ) -
      1) *
    100

  return supplyApy.toString()
}

/**
 * Return the winning odds given an amount to deposit and a total amount deposited
 *
 * @param amountToDeposit The amount to deposit
 * @param totalAmountDeposited The total amount already deposited
 * @param precision The precision of the returned odds
 * @returns The winning odds with a specified precision
 */
export const getWinningOdds = (
  amountToDeposit: string,
  totalAmountDeposited: string,
  precision: number
): string => {
  if (!amountToDeposit) return '0'
  if (totalAmountDeposited === '0') return '100'
  return (
    (parseInt(amountToDeposit) /
      (parseInt(totalAmountDeposited) + parseInt(amountToDeposit))) *
    100
  )
    .toFixed(precision)
    .toString()
}
