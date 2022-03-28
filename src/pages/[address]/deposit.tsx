import { Avatar } from 'antd'
import { NextPage } from 'next'
import React, { useCallback, useState } from 'react'
import DepositModal from '../../components/DepositModal/DepositModal'
import DepositorStats from '../../components/DepositorStats/DepositorStats'
import DepositStats from '../../components/DepositStats/DepositStats'
import { CUSDT, USDT } from '../../components/Images/Images'
import Layout from '../../components/Layout/Layout'
import LotteryStats from '../../components/LotteryStats/LotteryStats'
import PrizeStats from '../../components/PrizeStats/PrizeStats'

const deposit: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleButtonClick = useCallback(() => {
    setIsModalVisible(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsModalVisible(false)
  }, [])

  return (
    <Layout>
      <div>
        <div className="space-y-10">
          <div className="grid grid-cols-1 space-y-5 bg-red-300 sm:grid-cols-2">
            <div className="flex items-center justify-center space-x-4 sm:justify-start">
              <Avatar.Group>
                <Avatar src={<CUSDT />} />
                <Avatar src={<USDT />} />
              </Avatar.Group>
              <h1 className="text-2xl font-semibold text-prize-dark-gray md:text-4xl">
                Prize Lottery USDT
              </h1>
            </div>
            <div className="">
              <button
                className="rounded-lg bg-prize-red px-16 py-3 font-semibold text-white shadow-xl"
                onClick={handleButtonClick}
              >
                Deposit
              </button>
              <button
                className="rounded-lg border bg-white px-16 py-3 
              font-semibold text-prize-dark-gray shadow-xl"
              >
                Redeem
              </button>
            </div>
          </div>
          <LotteryStats />
          <PrizeStats />
          <DepositStats />
          <DepositorStats />
        </div>
        <DepositModal visible={isModalVisible} handleClose={handleClose} />
      </div>
    </Layout>
  )
}

export default deposit
