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
export const getCompoundApy = (supplyRate: string): string => {
  const ethMantissa = 1e18
  const rinkebyBlocksPerDay = 5760 // ~15 secs per block
  const daysPerYear = 365

  const supplyApy =
    (Math.pow(
      (parseInt(supplyRate as string) / ethMantissa) * rinkebyBlocksPerDay + 1,
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
 * @returns The winning odds with a specified precisione
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
