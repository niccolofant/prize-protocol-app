import { Skeleton } from 'antd'
import { FunctionComponent, useMemo } from 'react'
import { useMoralis } from 'react-moralis'
import { gql, useQuery } from 'urql'
import { n4 } from '../../utils/formatters'

export interface PlayerWinsProps {
  account: string
}

export interface Win {
  id: string
  timestamp: string
  winner: {
    address: string
  }
  amount: string
  lottery: {
    id: string
  }
}

export const winsQuery = gql`
  query ($player: String) {
    wins(where: { winner_contains: $player }) {
      id
      timestamp
      winner {
        address
      }
      amount
      lottery {
        id
      }
    }
  }
`

const PlayerWins: FunctionComponent<PlayerWinsProps> = ({
  account: address,
}) => {
  const { account, Moralis } = useMoralis()
  const [{ data }] = useQuery({
    query: winsQuery,
    variables: { player: address },
  })

  const wins: Win[] = useMemo(() => data?.wins, [data])

  if (!data || !wins) return <Skeleton />
  return (
    <div className="space-y-2 rounded-xl border bg-white p-5 shadow-xl dark:border-prize-dark-gray dark:bg-gray-800 sm:p-10">
      <h1 className="text-2xl font-semibold text-prize-dark-gray dark:text-white">
        Winnings 🎉
      </h1>
      {wins.length === 0 ? (
        <p className="my-2 text-prize-light-gray">
          {address === account ? 'You' : 'The player'} have yet to win. <br />
          {address === account && 'Keep your deposits in the pools to win!'}
        </p>
      ) : (
        wins.map(({ id, timestamp, amount, lottery }: Win) => (
          <div
            key={id}
            className="space-y-2 rounded-lg border bg-white p-5 dark:border-prize-dark-gray dark:bg-gray-800"
          >
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2">
              <div className="space-y-2">
                <h2 className="font-medium text-prize-light-gray">
                  Lottery #{lottery.id}
                </h2>
                <p className="font-medium text-prize-dark-gray dark:text-white">
                  {new Date(parseInt(timestamp) * 1000).toDateString()}
                </p>
              </div>
              <div className="sm:text-right">
                <h2 className="text-sm text-prize-light-gray">Amount</h2>
                <p className="text-2xl font-medium text-prize-dark-gray dark:text-white">
                  {n4.format(parseFloat(Moralis.Units.FromWei(amount)))}{' '}
                  <span className="text-base font-normal text-prize-light-gray">
                    USDT
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default PlayerWins
