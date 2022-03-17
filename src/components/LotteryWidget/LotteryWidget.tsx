import { Card, Skeleton, Statistic } from 'antd'
import { gql, useQuery } from 'urql'
import { getDrawingDate } from '../../utils/functions'

const query = gql`
  query getLastLottery {
    prizeProtocols(first: 1) {
      name
      drawingPeriod
      minimumDeposit
      token
      tokenName
      tokenSymbol
      cToken
      cTokenName
      cTokenSymbol
      lotteries(last: 1) {
        id
        state
        startTimestamp
        amountDeposited
        reserve
        prizePool
      }
    }
  }
`

const LotteryWidget = () => {
  const [{ fetching, data }] = useQuery({ query })

  const info = data?.prizeProtocols[0]

  if (fetching) return <Skeleton />
  return (
    <Card>
      {data && JSON.stringify(info)}
      <Statistic.Countdown
        title="Day Level"
        value={getDrawingDate(
          info.lotteries[0].startTimestamp,
          info.drawingPeriod
        ).toDateString()}
        format="D  H  m  s "
      />
    </Card>
  )
}

export default LotteryWidget
