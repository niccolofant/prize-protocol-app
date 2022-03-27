import { FunctionComponent } from 'react'
import { gql, useQuery } from 'urql'
import {
  AreaChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { useMoralis } from 'react-moralis'

export interface Deposit {
  id: string
  timestamp: string
  amount: string | number
}

export const depositsQuery = gql`
  query {
    lotteries(orderBy: id, orderDirection: desc, first: 1) {
      amountDeposited
      deposits {
        id
        timestamp
        amount
      }
    }
  }
`

const DepositStats: FunctionComponent = () => {
  const [{ data }] = useQuery({ query: depositsQuery })
  const { Moralis } = useMoralis()

  const deposits: Deposit[] = data?.lotteries[0].deposits

  deposits?.forEach(
    (deposit) =>
      (deposit.amount = parseInt(
        Moralis.Units.FromWei(deposit.amount as string)
      ))
  )

  return (
    <>
      {data && (
        <div className="rounded-xl border bg-white p-10 text-center shadow-xl">
          <div>
            <h1 className="text-2xl font-semibold text-prize-dark-gray">
              Total Deposits
            </h1>
            <h3 className="text-base text-prize-light-gray">
              Current deposit balance:{' '}
              {Moralis.Units.FromWei(data?.lotteries[0].amountDeposited)} USDT
            </h3>
          </div>
          <ResponsiveContainer width="99%" aspect={3}>
            <LineChart data={deposits}>
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#374151" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  )
}

export default DepositStats
