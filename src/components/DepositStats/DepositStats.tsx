import { FunctionComponent, useMemo } from 'react'
import { gql, useQuery } from 'urql'
import { Line, ResponsiveContainer, LineChart, Tooltip } from 'recharts'
import { useMoralis } from 'react-moralis'
import { Skeleton } from 'antd'
import { getEllipsisTxt, n2 } from '../../utils/formatters'

export interface Deposit {
  id: string
  timestamp: string
  amount: string | number
}

export const depositsQuery = gql`
  query {
    lotteries(orderBy: id, orderDirection: desc, first: 1) {
      amountDeposited
      deposits(orderBy: timestamp) {
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

  const deposits: Deposit[] = useMemo(() => {
    const temp: Deposit[] = data?.lotteries[0].deposits
    temp?.forEach((deposit: Deposit) => {
      deposit.amount = parseFloat(
        Moralis.Units.FromWei(deposit.amount as string)
      )
    })
    return temp
  }, [data])

  if (!data) return <Skeleton />
  return (
    <div className="rounded-xl border bg-white p-5 shadow-xl sm:p-10">
      <div>
        <h1 className="text-2xl font-semibold text-prize-dark-gray">
          Total Deposits
        </h1>
        <h3 className="my-2 text-base text-prize-light-gray">
          Deposits:{' '}
          <span className="font-semibold text-prize-dark-gray">
            {Moralis.Units.FromWei(data?.lotteries[0].amountDeposited)}
          </span>{' '}
          USDT
        </h3>
      </div>
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
  )
}

export interface CustomTooltipProps {
  active?: boolean
  payload?: Array<any>
}

export const CustomTooltip: FunctionComponent<CustomTooltipProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    console.log()
    return (
      <div className="border bg-white p-5 shadow-xl">
        <p className="font-semibold text-prize-dark-gray">
          <span className="font-normal text-prize-light-gray">Tx Hash: </span>
          {getEllipsisTxt(payload[0].payload.id)}
        </p>
        <p className="font-semibold text-prize-dark-gray">
          <span className="font-normal text-prize-light-gray">Date: </span>
          {new Date(payload[0].payload.timestamp * 1000).toDateString()}
        </p>
        <p className="font-semibold text-prize-dark-gray">
          <span className="font-normal text-prize-light-gray">Amount: </span>
          {n2.format(parseFloat(payload[0].payload.amount))}
          <span className="font-normal text-prize-light-gray"> USDT</span>
        </p>
      </div>
    )
  }

  return null
}
export default DepositStats
