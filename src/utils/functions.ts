export const getDrawingDate = (
  startTimestamp: string,
  drawingPeriod: string
): Date => {
  return new Date((parseInt(startTimestamp) + parseInt(drawingPeriod)) * 1000)
}
