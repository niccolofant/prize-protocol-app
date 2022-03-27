import { Avatar, Badge, Divider, Skeleton, Statistic, Typography } from 'antd'
import { gql, useQuery } from 'urql'
import { getDrawingDate } from '../../utils/functions'
import { useMoralis } from 'react-moralis'
import { Compound, CUSDT, USDT } from '../Images/Images'
import Link from 'next/link'
import { n4 } from '../../utils/formatters'
import Countdown from '../Countdown/Countdown'

const query = gql`
  query {
    prizeProtocols(first: 1) {
      name
      address
      drawingPeriod
      minimumDeposit
      token
      tokenName
      tokenSymbol
      cToken
      cTokenName
      cTokenSymbol
      lotteries(orderBy: id, orderDirection: desc, first: 1) {
        id
        state
        startTimestamp
        amountDeposited
        reserve
        prizePool
        players {
          id
        }
      }
    }
  }
`

const LotteryWidget = () => {
  const { Moralis } = useMoralis()
  const [{ fetching, data }] = useQuery({ query })

  const protocolInfo = data?.prizeProtocols[0]
  const lotteryInfo = protocolInfo?.lotteries[0]

  if (fetching) return <Skeleton />
  return (
    <div className="rounded-xl border p-10 shadow-xl">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <Avatar.Group>
            <Avatar src={<CUSDT />} />
            <Avatar src={<USDT />} />
          </Avatar.Group>
          <p className="text-xl font-semibold text-prize-dark-gray">
            Lottery #{lotteryInfo.id}
          </p>
          <Badge status="processing" color="green" />
        </div>
      </div>

      <Divider />

      <div className="flex items-center justify-evenly space-x-10">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-prize-light-gray">Prize Pool</p>
          <p className="text-5xl font-semibold text-slate-800">
            <span className="text-xl font-normal text-slate-500">$ </span>
            {n4.format(
              parseFloat(Moralis.Units.FromWei(lotteryInfo.prizePool))
            )}
          </p>
        </div>
      </div>

      <Divider />

      <div className="flex items-center justify-evenly">
        <div className="text-center">
          <p className="text-prize-light-gray">Yield protocol</p>
          <Avatar src={<Compound />} />
        </div>
        <Link href={`/${protocolInfo.address}/deposit`}>
          <button className="border px-10">Deposit</button>
        </Link>
      </div>
    </div>
  )
}

export default LotteryWidget
