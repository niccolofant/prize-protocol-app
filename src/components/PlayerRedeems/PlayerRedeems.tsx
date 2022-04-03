import { Skeleton } from 'antd'
import { FunctionComponent, useMemo } from 'react'
import { useMoralis } from 'react-moralis'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { gql, useQuery } from 'urql'
import { CustomTooltip } from '../DepositStats/DepositStats'
import { Lottery } from '../PlayerDeposits/PlayerDeposits'

export interface PlayerRedeemsProps {
  account: string
}

export interface Redeem {
  id: string
  timestamp: string
  amount: string | number
}

export const playerRedeemsQuery = gql`
  query ($id: String) {
    player(id: $id) {
      redeems(orderBy: timestamp) {
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

const PlayerRedeems: FunctionComponent<PlayerRedeemsProps> = ({
  account: address,
}) => {
  const { account, Moralis } = useMoralis()
  const [{ data }] = useQuery({
    query: playerRedeemsQuery,
    variables: { id: address },
  })

  const lottery: Lottery = useMemo(() => data?.lotteries[0], [data])

  console.log(data)

  const redeems: Redeem[] = useMemo(() => {
    if (data && data.player.redeems.length > 0)
      return [
        {
          id: '',
          timestamp: lottery?.startTimestamp,
          amount: '0',
        },
        ...data?.player.redeems.map(({ id, timestamp, amount }: Redeem) => ({
          id,
          timestamp,
          amount: parseFloat(Moralis.Units.FromWei(amount)),
        })),
      ]
    return []
  }, [data])

  if (!data || !redeems) return <Skeleton />
  return (
    <div className="space-y-5 rounded-xl border bg-white p-5 shadow-xl dark:border-prize-dark-gray dark:bg-gray-800 sm:p-10">
      <div>
        <h1 className="text-2xl font-semibold text-prize-dark-gray dark:text-white">
          Redeems
        </h1>
        <h3 className="my-2 text-base text-prize-light-gray">
          Here you can check all {address === account ? 'your' : "the player's"}{' '}
          redeems over time!
        </h3>
      </div>
      <div>
        {redeems.length > 0 ? (
          <ResponsiveContainer width="99%" aspect={3}>
            <LineChart data={redeems}>
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
        ) : (
          <p className="my-10 text-center text-sm text-prize-light-gray">
            {address === account ? 'You' : 'The player'} have not redeemed any
            tokens yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default PlayerRedeems
