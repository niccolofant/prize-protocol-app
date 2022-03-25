import { LoadingOutlined, RightOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React, { useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { gql, useQuery } from 'urql'
import { prizeProtocolABI } from '../../utils/abis/prizeProtocolABI'
import { PROTOCOL_ADDRESS } from '../../utils/constants'
import Address from '../Address'

interface PlayerInfo {
  players: {
    balance: string
    lottery: {
      id: string
    }
  }[]
}

const playerInfoQuery = gql`
  query playerInfo($id: String) {
    players(id: $id) {
      balance
      lottery {
        id
      }
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

  const handleRedeemClick = async () => {
    const { error: redeemError, runContractFunction: redeem } = useWeb3Contract(
      {
        abi: prizeProtocolABI,
        contractAddress: PROTOCOL_ADDRESS,
        functionName: 'redeem',
        params: {
          _tokenAmount: data ? data?.players[0]?.balance : null,
        },
      }
    )

    setIsRedeemLoading(true)

    await redeem({
      onSuccess: async (tx: any) => {
        await tx.wait(1)

        setIsRedeemLoading(false)
      },
    })
  }

  return (
    <div className="space-y-2 rounded-xl bg-gradient-to-r from-green-300 to-sky-400 p-10 shadow-xl">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium text-white">Dashboard</h1>
        <Link href="/">
          <p className="text-md flex cursor-pointer items-center font-medium text-white">
            Go to player's profile <RightOutlined />
          </p>
        </Link>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-white">Redeemable balance</h3>
          <p className="text-3xl font-medium text-white">
            {data && data.players[0]
              ? Moralis.Units.FromWei(data.players[0].balance)
              : '0'}
            <span> USDT</span>
          </p>
        </div>
        <button
          className="rounded-lg bg-white py-2 px-10 font-semibold text-slate-700"
          onClick={handleRedeemClick}
        >
          {isRedeemLoading ? <LoadingOutlined /> : 'Redeem Balance'}
        </button>
      </div>
    </div>
  )
}

export default PlayerStats
