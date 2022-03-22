export const getDrawingDate = (
  startTimestamp: string,
  drawingPeriod: string
): Date => {
  return new Date((parseInt(startTimestamp) + parseInt(drawingPeriod)) * 1000)
}

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
