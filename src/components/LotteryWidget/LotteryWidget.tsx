import { Avatar, Badge, Divider, Skeleton } from 'antd'
import { gql, useQuery } from 'urql'
import { useMoralis } from 'react-moralis'
import { CUSDT, USDT } from '../Images/Images'
import Link from 'next/link'
import { n4 } from '../../utils/formatters'
import Countdown from '../Countdown/Countdown'
import { FunctionComponent } from 'react'
import { getDrawingDate } from '../../utils/functions'

export interface LotteryWidgetProps {
  onLotteryEnd: () => void
}

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

const LotteryWidget: FunctionComponent<LotteryWidgetProps> = ({
  onLotteryEnd,
}) => {
  const { Moralis } = useMoralis()
  const [{ fetching, data }] = useQuery({ query })

  const protocolInfo = data?.prizeProtocols[0]
  const lotteryInfo = protocolInfo?.lotteries[0]

  if (fetching) return <Skeleton />
  return (
    <div className="rounded-xl border bg-white p-5 shadow-xl md:p-10 lg:px-32">
      <div className="flex items-center">
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-left text-xs font-normal text-prize-light-gray sm:text-base">
            Prize Pool
          </p>
          <p className="flex items-center gap-1 text-2xl font-semibold text-prize-dark-gray sm:text-3xl md:text-5xl">
            <span className="text-lg font-normal text-prize-light-gray sm:text-xl">
              $
            </span>
            {n4.format(
              parseFloat(Moralis.Units.FromWei(lotteryInfo.prizePool))
            )}
          </p>
        </div>
        <div>
          <p className="text-right text-xs font-normal text-prize-light-gray sm:text-base">
            Time left
          </p>
          <Countdown
            targetDate={getDrawingDate(
              lotteryInfo.startTimestamp,
              protocolInfo.drawingPeriod
            )}
            onTargetReached={onLotteryEnd}
          />
        </div>
      </div>
      <Divider />
      <div className="flex justify-center">
        <Link href={`/${protocolInfo.address}/deposit`}>
          <button className="w-full rounded-lg bg-prize-red py-2 text-sm font-semibold text-white shadow-xl sm:w-1/2 sm:text-base">
            Deposit
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LotteryWidget
