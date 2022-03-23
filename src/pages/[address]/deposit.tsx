import { Button } from 'antd'
import React, { useCallback, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { gql, useQuery } from 'urql'
import { prizeProtocolABI } from '../../utils/abis/prizeProtocolABI'
import { usdtABI } from '../../utils/abis/usdtABI'
import { n4 } from '../../utils/formatters'
import { getWinningOdds } from '../../utils/functions'

const query = gql`
  query getLastLottery {
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
  const [amountToDeposit, setAmountToDeposit] = useState<string>('0')
  const [isApproveLoading, setIsApproveLoading] = useState<boolean>(false)
  const [isDepositLoading, setIsDepositLoading] = useState<boolean>(false)
  const [winningOdds, setWinningOdds] = useState<string>('-')

  const [{ fetching, data }] = useQuery({ query })
  const { Moralis } = useMoralis()

  const protocolInfo = data?.prizeProtocols[0]
  const lotteryInfo = protocolInfo?.lotteries[0]

  const { error: approveDepositError, runContractFunction: approveDeposit } =
    useWeb3Contract({
      abi: usdtABI,
      contractAddress: protocolInfo?.token,
      functionName: 'approve',
      params: {
        _spender: protocolInfo?.address,
        amount: amountToDeposit ? Moralis.Units.ETH(amountToDeposit) : null,
      },
    })

  const { error: depositError, runContractFunction: deposit } = useWeb3Contract(
    {
      abi: prizeProtocolABI,
      contractAddress: protocolInfo?.address,
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
    <div>
      <input
        className="border"
        type="number"
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
  )
}

export default deposit
