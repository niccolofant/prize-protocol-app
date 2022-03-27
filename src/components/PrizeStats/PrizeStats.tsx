import { gql, useQuery } from 'urql'
import prize1 from '../../assets/images/prize-1.png'
import prize2 from '../../assets/images/prize-2.png'
import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import { n4 } from '../../utils/formatters'
import { FunctionComponent } from 'react'
import {
  PrizeStatsCardWrapper,
  PrizeStatsContentWrapper,
  PrizeStatsHighlightText,
  PrizeStatsText,
  PrizeStatsTitle,
} from './PrizeStats.style'
import { Skeleton } from 'antd'
import Countdown from '../Countdown/Countdown'
import { getDrawingDate } from '../../utils/functions'

export interface LotteryInfo {
  id: string
  state: string
  startTimestamp: string
  amountDeposited: string
  prizePool: string
  reserve: string
  players: string[]
}

export interface ProtocolInfo {
  drawingPeriod: string
  lotteries: LotteryInfo[]
}

export const lotteryInfoQuery = gql`
  query {
    prizeProtocols(first: 1) {
      drawingPeriod
      lotteries(orderBy: id, orderDirection: desc, first: 1) {
        id
        state
        startTimestamp
        amountDeposited
        prizePool
        reserve
        players {
          id
        }
      }
    }
  }
`

const PrizeStats: FunctionComponent = () => {
  const [{ data }] = useQuery({ query: lotteryInfoQuery })
  const { Moralis } = useMoralis()

  const protocolInfo: ProtocolInfo = data?.prizeProtocols[0]
  const lotteryInfo: LotteryInfo = protocolInfo?.lotteries[0]

  if (!data) return <Skeleton />
  return (
    <PrizeStatsCardWrapper>
      <PrizeStatsTitle>USDT Prize #{lotteryInfo.id}</PrizeStatsTitle>
      <div className="my-2">
        <PrizeStatsText>Will be awarded in</PrizeStatsText>
        <Countdown
          targetTimestamp={getDrawingDate(
            lotteryInfo.startTimestamp,
            protocolInfo.drawingPeriod
          )}
        />
      </div>
      <PrizeStatsContentWrapper>
        <div>
          <Image src={prize1} width="200" height="200" />
          <PrizeStatsHighlightText>
            {n4.format(
              parseFloat(Moralis.Units.FromWei(lotteryInfo.prizePool))
            )}
            <span className="text-lg text-prize-light-gray"> USDT</span>
          </PrizeStatsHighlightText>
          <PrizeStatsText>Prize Pool</PrizeStatsText>
        </div>
        <span className="text-6xl text-prize-dark-gray">+</span>
        <div>
          <Image src={prize2} width="200" height="200" />
          <PrizeStatsHighlightText>
            {n4.format(parseFloat(Moralis.Units.FromWei(lotteryInfo.reserve)))}
            <span className="text-lg text-prize-light-gray"> USDT</span>
          </PrizeStatsHighlightText>
          <PrizeStatsText>Reserve</PrizeStatsText>
        </div>
      </PrizeStatsContentWrapper>
    </PrizeStatsCardWrapper>
  )
}

export default PrizeStats
