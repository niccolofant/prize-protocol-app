import { Skeleton } from 'antd'
import { FunctionComponent, useMemo } from 'react'
import { useMoralis } from 'react-moralis'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { gql, useQuery } from 'urql'
import { CustomTooltip } from '../DepositStats/DepositStats'

export interface PlayerDepositsProps {
  account: string
}

export interface Deposit {
  id: string
  timestamp: string
  amount: string | number
}

export interface Lottery {
  id: string
  startTimestamp: string
}

export const playerDepositsQuery = gql`
  query ($id: String) {
    player(id: $id) {
      deposits(orderBy: timestamp) {
        id
        timestamp
        amount
      }
    }
    lotteries(orderDirection: desc, orderBy: id, first: 1) {
      id
      startTimestamp
    }
  }
`

const PlayerDeposits: FunctionComponent<PlayerDepositsProps> = ({
  account: address,
}) => {
  const { account, Moralis } = useMoralis()
  const [{ data }] = useQuery({
    query: playerDepositsQuery,
    variables: { id: address },
  })

  const lottery: Lottery = useMemo(() => data?.lotteries[0], [data])

  const deposits: Deposit[] = useMemo(() => {
    if (data)
      return [
        {
          id: '',
          timestamp: lottery?.startTimestamp,
          amount: '0',
        },
        ...data.player.deposits.map(({ id, timestamp, amount }: Deposit) => ({
          id,
          timestamp,
          amount: parseFloat(Moralis.Units.FromWei(amount)),
        })),
      ]
    return []
  }, [data])

  if (!data || !deposits) return <Skeleton />
  return (
    <div className="space-y-5 rounded-xl border bg-white p-5 shadow-xl dark:border-prize-dark-gray dark:bg-gray-800 sm:p-10">
      <div>
        <h1 className="text-2xl font-semibold text-prize-dark-gray dark:text-white">
          Deposits
        </h1>
        <h3 className="my-2 text-base text-prize-light-gray">
          Here you can check all {address === account ? 'your' : "the player's"}{' '}
          deposits over time!
        </h3>
      </div>
      <div>
        <ResponsiveContainer width="99%" aspect={3}>
          <LineChart data={deposits}>
            <defs>
              <linearGradient id="colorUv" x1="1" y1="0" x2="0" y2="0">
                <stop offset="20%" stopColor="#FE045B" stopOpacity={0.8} />
                <stop offset="80%" stopColor="#0EB1FE" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="amount"
              dot={false}
              stroke="url(#colorUv)"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PlayerDeposits
