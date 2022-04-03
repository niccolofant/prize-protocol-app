import { Avatar } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { gql, useQuery } from 'urql'
import DepositModal from '../../components/DepositModal/DepositModal'
import DepositorStats from '../../components/DepositorStats/DepositorStats'
import DepositStats from '../../components/DepositStats/DepositStats'
import { CUSDT, USDT } from '../../components/Images/Images'
import Layout from '../../components/Layout/Layout'
import LotteryStats from '../../components/LotteryStats/LotteryStats'
import PrizeStats from '../../components/PrizeStats/PrizeStats'
import { getEllipsisTxt } from '../../utils/formatters'

const protocolNameQuery = gql`
  query {
    prizeProtocols(first: 1) {
      address
    }
  }
`

const deposit: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [{ data }] = useQuery({ query: protocolNameQuery })

  const address: string = data?.prizeProtocols[0].address

  const handleButtonClick = useCallback(() => {
    setIsModalVisible(true)
  }, [])

  const onClose = useCallback(() => {
    setIsModalVisible(false)
  }, [])

  return (
    <Layout>
      <div>
        <div className="space-y-10">
          <div className="grid grid-cols-1 items-center justify-between space-y-5 sm:grid-cols-3 sm:space-y-0">
            <div className="col-span-2 flex items-center justify-start space-x-4 sm:justify-start">
              <Avatar.Group>
                <Avatar src={<CUSDT />} />
                <Avatar src={<USDT />} />
              </Avatar.Group>
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-prize-dark-gray dark:text-white md:text-4xl">
                  Prize Lottery USDT
                </h1>
                <h3>
                  <span className="text-prize-light-gray">Address: </span>
                  {address && (
                    <Link
                      href={`https://rinkeby.etherscan.io/address/${address}`}
                    >
                      <a
                        className="font-medium text-prize-dark-gray hover:text-prize-dark-gray dark:text-white"
                        target="_blank"
                      >
                        {getEllipsisTxt(address, 6)}
                      </a>
                    </Link>
                  )}
                </h3>
              </div>
            </div>
            <button
              className="rounded-lg bg-prize-red py-2 px-10 text-sm font-semibold text-white shadow-xl sm:text-base"
              onClick={handleButtonClick}
            >
              Deposit
            </button>
          </div>
          <LotteryStats />
          <PrizeStats />
          <DepositStats />
          <DepositorStats />
        </div>
        <DepositModal visible={isModalVisible} onClose={onClose} />
      </div>
    </Layout>
  )
}

export default deposit
