import { FunctionComponent } from 'react'
import { gql, useQuery } from 'urql'
import Layout from '../../components/Layout/Layout'
import PlayerStats from '../../components/PlayerStats/PlayerStats'

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
  const [{ data }] = useQuery<PlayerInfo>({
    query: playerInfoQuery,
    variables: { id: query.address },
  })

  return (
    <Layout>
      <div>
        <div className="space-y-10">
          <div>
            <h1 className="text-2xl font-semibold text-prize-dark-gray md:text-4xl">
              My Account
            </h1>
            <h3 className="text-prize-light-gray">Account overview</h3>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ query }: PlayerProps) => {
  return {
    props: { query },
  }
}

export default Player
