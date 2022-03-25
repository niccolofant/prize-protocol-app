import { LoadingOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { gql, useQuery } from 'urql'
import { prizeProtocolABI } from '../../utils/abis/prizeProtocolABI'
import { PROTOCOL_ADDRESS } from '../../utils/constants'
import {
  PlayerCardBodyWrapper,
  PlayerCardButton,
  PlayerCardHeaderWrapper,
  PlayerCardLink,
  PlayerCardText,
  PlayerCardTitle,
  PlayerStatsCardWrapper,
} from './PlayerStats.style'

const openNotification = (err: Error) => {
  notification['error']({
    message: err.message,
    description: `We weren't able to process the transaction - Reason: ${err.message}`,
    duration: 5,
  })
}

export interface PlayerInfo {
  player: {
    balance: string
  }
}

const playerInfoQuery = gql`
  query playerInfo($id: String) {
    player(id: $id) {
      balance
    }
  }
`

const PlayerStats = () => {
  const [isRedeemLoading, setIsRedeemLoading] = useState<boolean>(false)
  const { account, Moralis } = useMoralis()
  const [{ data }] = useQuery<PlayerInfo>({
    query: playerInfoQuery,
    variables: { id: account },
  })

  const { runContractFunction: redeem } = useWeb3Contract({
    abi: prizeProtocolABI,
    contractAddress: PROTOCOL_ADDRESS,
    functionName: 'redeem',
    params: {
      _tokenAmount: data ? data.player.balance : null,
    },
  })

  const handleRedeemClick = async () => {
    setIsRedeemLoading(true)

    await redeem({
      onSuccess: async (tx: any) => {
        await tx.wait(1)
        setIsRedeemLoading(false)
      },
      onError: (err) => {
        openNotification(err)
        setIsRedeemLoading(false)
      },
    })
  }

  return (
    <PlayerStatsCardWrapper>
      <PlayerCardHeaderWrapper>
        <PlayerCardTitle>Dashboard</PlayerCardTitle>
        <Link href={`/players/${account}`}>
          <PlayerCardLink>Go to player's profile</PlayerCardLink>
        </Link>
      </PlayerCardHeaderWrapper>
      <PlayerCardBodyWrapper>
        <div>
          <h3 className="text-white">Redeemable balance</h3>
          <PlayerCardText>
            {data ? Moralis.Units.FromWei(data.player.balance) : '0'}
            <span className="text-xl"> USDT </span>🎉
          </PlayerCardText>
        </div>
        <PlayerCardButton onClick={handleRedeemClick}>
          {isRedeemLoading ? <LoadingOutlined /> : 'Redeem Balance'}
        </PlayerCardButton>
      </PlayerCardBodyWrapper>
    </PlayerStatsCardWrapper>
  )
}

export default PlayerStats
