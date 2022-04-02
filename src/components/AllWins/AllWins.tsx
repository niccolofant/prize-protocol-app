import { Skeleton } from 'antd'
import { FunctionComponent, useMemo } from 'react'
import { useMoralis } from 'react-moralis'
import { gql, useQuery } from 'urql'
import { getEllipsisTxt, n2, n4 } from '../../utils/formatters'

export interface Win {
  timestamp: string
  winner: {
    id: string
  }
  amount: number
  lottery: {
    id: string
  }
}

export const winsQuery = gql`
  query {
    wins(orderBy: timestamp, orderDirection: desc, first: 3) {
      timestamp
      winner {
        id
      }
      amount
      lottery {
        id
      }
    }
  }
`

const AllWins: FunctionComponent = () => {
  const [{ data }] = useQuery({ query: winsQuery })
  const { account, Moralis } = useMoralis()

  const wins: Win[] = useMemo(
    () =>
      data?.wins.map(({ timestamp, winner, amount, lottery }: Win) => ({
        timestamp: new Date(parseInt(timestamp) * 1000).toDateString(),
        winner: winner,
        amount: parseFloat(Moralis.Units.FromWei(amount)),
        lottery: lottery.id,
      })),
    [data]
  )

  return (
    <>
      {data && data.wins && (
        <div className="space-y-2 rounded-lg bg-gradient-to-r from-prize-blue to-prize-red p-2 text-center shadow-xl">
          <h1 className="text-sm font-medium text-white">Past lotteries</h1>
          <div className="space-y-2 text-left">
            {wins.map(({ timestamp, winner, amount, lottery }) => (
              <div
                key={timestamp}
                className="space-y-1 rounded-lg bg-white p-2 text-sm"
              >
                <h1 className="font-medium text-prize-dark-gray">
                  <span className="text-prize-light-gray">Lottery </span>#
                  {lottery}
                </h1>
                <hr />
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xs text-prize-light-gray">Winner</h2>
                    <p className="font-semibold text-prize-dark-gray">
                      {winner.id === account
                        ? 'You 🥳'
                        : `${getEllipsisTxt(winner.id, 3)} `}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-right text-xs text-prize-light-gray">
                      Amount
                    </h2>
                    <p className="font-semibold text-prize-dark-gray">
                      ${n4.format(amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default AllWins
