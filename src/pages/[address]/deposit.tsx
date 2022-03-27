import { Avatar, Button, Statistic, Typography } from 'antd'
import React, { useCallback, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { gql, useQuery } from 'urql'
import Countdown from '../../components/Countdown/Countdown'
import DepositModal from '../../components/DepositModal/DepositModal'
import DepositStats from '../../components/DepositStats/DepositStats'
import { CUSDT, USDT } from '../../components/Images/Images'
import PrizeStats from '../../components/PrizeStats/PrizeStats'
import { getDrawingDate } from '../../utils/functions'

const lotteryInfoQuery = gql`
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
          balance
        }
      }
    }
  }
`

const deposit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [{ data }] = useQuery({ query: lotteryInfoQuery })

  const protocolInfo = data?.prizeProtocols[0]
  const lotteryInfo = data?.prizeProtocols[0].lotteries[0]

  const handleButtonClick = useCallback(() => {
    setIsModalVisible(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsModalVisible(false)
  }, [])

  return (
    <>
      {data && (
        <>
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4">
                  <Avatar.Group>
                    <Avatar src={<CUSDT />} />
                    <Avatar src={<USDT />} />
                  </Avatar.Group>
                  <h1 className="text-4xl font-semibold text-prize-dark-gray">
                    Prize Lottery USDT
                  </h1>
                </div>
              </div>
              <div className="flex space-x-5">
                <button
                  className="rounded-lg bg-prize-red px-16 py-3 font-semibold text-white shadow-xl"
                  onClick={handleButtonClick}
                >
                  Deposit
                </button>
                <button className="hidden rounded-lg border bg-white px-16 py-3 font-semibold text-prize-dark-gray shadow-xl md:inline">
                  Redeem
                </button>
              </div>
            </div>
            <PrizeStats />
            <DepositStats />
          </div>
          <DepositModal visible={isModalVisible} handleClose={handleClose} />
        </>
      )}
    </>
  )
}

export default deposit
