import { Avatar, Button, Typography } from 'antd'
import React, { useCallback, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { gql, useQuery } from 'urql'
import ERC20Balance from '../../components/ERC20Balance'
import { CUSDT, USDT } from '../../components/Images/Images'
import PlayerStats from '../../components/PlayerStats/PlayerStats'
import PrizeStats from '../../components/PrizeStats/PrizeStats'
import { prizeProtocolABI } from '../../utils/abis/prizeProtocolABI'
import { usdtABI } from '../../utils/abis/usdtABI'
import {
  PROTOCOL_ADDRESS,
  USDT_ADDRESS,
  USDT_NAME,
} from '../../utils/constants'
import { getWinningOdds } from '../../utils/functions'

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
  const [amountToDeposit, setAmountToDeposit] = useState('')
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [isDepositLoading, setIsDepositLoading] = useState(false)
  const [winningOdds, setWinningOdds] = useState('-')

  const [{ data }] = useQuery({ query: lotteryInfoQuery })
  const { Moralis } = useMoralis()

  const protocolInfo = data?.prizeProtocols[0]
  const lotteryInfo = protocolInfo?.lotteries[0]

  const { error: approveDepositError, runContractFunction: approveDeposit } =
    useWeb3Contract({
      abi: usdtABI,
      contractAddress: USDT_ADDRESS,
      functionName: 'approve',
      params: {
        _spender: PROTOCOL_ADDRESS,
        amount: amountToDeposit ? Moralis.Units.ETH(amountToDeposit) : null,
      },
    })

  const { error: depositError, runContractFunction: deposit } = useWeb3Contract(
    {
      abi: prizeProtocolABI,
      contractAddress: PROTOCOL_ADDRESS,
      functionName: 'deposit',
      params: {
        _amount: amountToDeposit ? Moralis.Units.ETH(amountToDeposit) : null,
      },
    }
  )

  const handleDepositClick = async () => {
    setIsApproveLoading(true)
    await approveDeposit({
      onSuccess: async (tx: any) => {
        await tx.wait(1)
        setIsApproveLoading(false)
        setIsDepositLoading(true)
        await deposit({
          onSuccess: async (tx: any) => {
            await tx.wait(1)
            setIsDepositLoading(false)
          },
        })
      },
    })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWinningOdds(
      getWinningOdds(
        e.target.value,
        Moralis.Units.FromWei(lotteryInfo?.amountDeposited),
        2
      )
    )
    setAmountToDeposit(e.target.value)
  }

  return (
    <>
      {data && (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar.Group>
                <Avatar src={<CUSDT />} />
                <Avatar src={<USDT />} />
              </Avatar.Group>
              <h1 className="text-4xl font-semibold text-prize-dark-gray">
                {protocolInfo.name}
              </h1>
            </div>
            <button className="rounded-lg bg-prize-red px-16 py-3 font-semibold text-white shadow-xl">
              Deposit
            </button>
          </div>
          <PrizeStats />
          <ERC20Balance address={USDT_ADDRESS} name={USDT_NAME} />
          <input
            className="border"
            type="number"
            value={amountToDeposit}
            placeholder="Enter amount"
            onChange={handleFormChange}
          />
          <Button
            disabled={isApproveLoading || isDepositLoading}
            onClick={handleDepositClick}
          >
            Deposit
          </Button>
          <div>winning odds: {winningOdds}%</div>
        </div>
      )}
    </>
  )
}

export default deposit
