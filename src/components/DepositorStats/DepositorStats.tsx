import { Skeleton } from 'antd'
import { useMoralis } from 'react-moralis'
import { gql, useQuery } from 'urql'
import { n2 } from '../../utils/formatters'
import Address from '../Address'
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
  const { Moralis } = useMoralis()

  const depositors: Depositor[] = data?.players

  if (!data) return <Skeleton />
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
        <div className="grid grid-cols-3">
          <h3 className="text-left text-prize-light-gray">Address</h3>
          <h3 className="text-center text-prize-light-gray">Balance</h3>
        </div>
        {depositors.map((deposit) => (
          <div className="grid grid-cols-3" key={deposit.address}>
            <Address address={deposit.address} size={5} />

            <p className="text-center font-medium text-prize-dark-gray">
              {n2.format(parseFloat(Moralis.Units.FromWei(deposit.balance)))}
              <span className="text-sm font-normal text-prize-light-gray">
                {' '}
                USDT
              </span>
            </p>
            <Link href={`/players/${deposit.address}`}>
              <a className="text-right font-medium text-prize-dark-gray hover:text-prize-dark-gray">
                View
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DepositorStats
