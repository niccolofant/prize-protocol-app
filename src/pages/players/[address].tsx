import { Skeleton } from 'antd'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { gql, useQuery } from 'urql'
import Layout from '../../components/Layout/Layout'
import PlayerDeposits from '../../components/PlayerDeposits/PlayerDeposits'
import PlayerRedeems from '../../components/PlayerRedeems/PlayerRedeems'
import PlayerStats from '../../components/PlayerStats/PlayerStats'
import RedeemModal from '../../components/RedeemModal/RedeemModal'
import { getEllipsisTxt } from '../../utils/formatters'

export interface PlayerProps {
  query: {
    address: string
  }
}

export interface PlayerInfo {
  player: {
    balance: string
  }
  wins: {
    id: string
    timestamp: string
    winner: {
      address: string
    }
    amount: string
  }[]
}

const playerInfoQuery = gql`
  query ($id: String) {
    player(id: $id) {
      balance
    }
    wins(orderBy: timestamp, orderDirection: desc, first: 1) {
      id
      timestamp
      winner {
        address
      }
      amount
    }
  }
`

const Player: FunctionComponent<PlayerProps> = ({ query }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { account } = useMoralis()
  const [{ data }] = useQuery<PlayerInfo>({
    query: playerInfoQuery,
    variables: { id: query.address },
  })

  const handleButtonClick = useCallback(() => {
    setIsModalVisible(true)
  }, [])

  return (
    <>
      {data && (
        <Layout>
          <div>
            <div className="space-y-10">
              <div className="grid grid-cols-1 items-center justify-between space-y-5 sm:grid-cols-3 sm:space-y-0">
                <div className="col-span-2 flex items-center justify-start space-x-4 sm:justify-start">
                  <div>
                    <h1 className="text-2xl font-semibold text-prize-dark-gray md:text-4xl">
                      {query.address === account
                        ? 'My Account'
                        : `Player: ${getEllipsisTxt(query.address, 5)}`}
                    </h1>
                    <h3 className="text-prize-light-gray">Account overview</h3>
                  </div>
                </div>
                {query.address === account && (
                  <button
                    className="rounded-lg bg-prize-red py-2 px-10 text-sm font-semibold text-white shadow-xl sm:text-base"
                    onClick={handleButtonClick}
                  >
                    Redeem
                  </button>
                )}
              </div>
              <PlayerStats profileLink={false} button={false} />
              <div className="grid grid-cols-1 gap-5 space-y-5 sm:grid-cols-2 sm:space-y-0">
                <PlayerDeposits account={query.address} />
                <PlayerRedeems account={query.address} />
              </div>
            </div>
            <RedeemModal
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              balance={data.player.balance}
            />
          </div>
        </Layout>
      )}
    </>
  )
}

export const getServerSideProps = async ({ query }: PlayerProps) => {
  return {
    props: { query },
  }
}

export default Player
