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

export interface LotteryInfo {
  id: string
  state: string
  startTimestamp: string
  amountDeposited: string
  prizePool: string
  reserve: string
  players: string[]
}

const lotteryInfoQuery = gql`
  query {
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
`

const PrizeStats: FunctionComponent = () => {
  const [{ data }] = useQuery({ query: lotteryInfoQuery })
  const { Moralis } = useMoralis()

  const lotteryInfo: LotteryInfo = data?.lotteries[0]

  return (
    <>
      {data && (
        <PrizeStatsCardWrapper>
          <PrizeStatsTitle>USDT Prize #{lotteryInfo.id}</PrizeStatsTitle>
          <PrizeStatsText>Awarded every 10 days</PrizeStatsText>
          <PrizeStatsContentWrapper>
            <div>
              <Image src={prize1} width="250" height="250" />
              <PrizeStatsHighlightText>
                {n4.format(
                  parseInt(Moralis.Units.FromWei(lotteryInfo.prizePool))
                )}
                <span className="text-lg text-prize-light-gray"> USDT</span>
              </PrizeStatsHighlightText>
              <PrizeStatsText>Prize Pool</PrizeStatsText>
            </div>
            <span className="text-6xl text-prize-dark-gray">+</span>
            <div>
              <Image src={prize2} width="250" height="250" />
              <PrizeStatsHighlightText>
                {n4.format(
                  parseInt(Moralis.Units.FromWei(lotteryInfo.reserve))
                )}
                <span className="text-lg text-prize-light-gray"> USDT</span>
              </PrizeStatsHighlightText>
              <PrizeStatsText>Reserve</PrizeStatsText>
            </div>
          </PrizeStatsContentWrapper>
        </PrizeStatsCardWrapper>
      )}
    </>
  )
}

export default PrizeStats
