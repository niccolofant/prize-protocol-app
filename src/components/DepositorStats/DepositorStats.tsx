import { Skeleton } from 'antd'
import { useMoralis } from 'react-moralis'
import { gql, useQuery } from 'urql'
import { getEllipsisTxt, n2 } from '../../utils/formatters'
import Link from 'next/link'

export interface Depositor {
  address: string
  balance: string
}

const depositorsQuery = gql`
  query {
    players(orderBy: balance, orderDirection: desc) {
      address
      balance
    }
  }
`

const DepositorStats = () => {
  const [{ data }] = useQuery({ query: depositorsQuery })
  const { account, Moralis } = useMoralis()

  const depositors: Depositor[] = data?.players

  if (!depositors) return <Skeleton />
  return (
    <div className="space-y-5 rounded-xl border bg-white p-5 shadow-xl sm:p-10">
      <div>
        <h1 className="text-2xl font-semibold text-prize-dark-gray">
          Depositors
        </h1>
        <h3 className="my-2 text-base text-prize-light-gray">
          {depositors.length}
        </h3>
      </div>
      <div>
        <div className="grid grid-cols-2 space-y-2 sm:grid-cols-3">
          <h3 className="text-left text-prize-light-gray">Address</h3>
          <h3 className="text-right text-prize-light-gray sm:text-center">
            Balance
          </h3>
        </div>
        {depositors.map((depositor) => (
          <div
            className="grid grid-cols-2 space-y-1 sm:grid-cols-3"
            key={depositor.address}
          >
            <Link href={`/players/${depositor.address}`}>
              <a className="font-semibold text-prize-dark-gray hover:text-prize-dark-gray">
                {account === depositor.address
                  ? 'You'
                  : getEllipsisTxt(depositor.address, 5)}
              </a>
            </Link>
            <p className="text-right font-semibold text-prize-dark-gray sm:text-center">
              {n2.format(parseFloat(Moralis.Units.FromWei(depositor.balance)))}
              <span className="text-sm font-medium text-prize-light-gray">
                {' '}
                USDT
              </span>
            </p>
            <div className="hidden text-right sm:inline">
              <Link href={`/players/${depositor.address}`}>
                <a className="font-medium text-prize-dark-gray hover:text-prize-dark-gray">
                  View Player
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DepositorStats
