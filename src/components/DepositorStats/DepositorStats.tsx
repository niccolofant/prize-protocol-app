import { Skeleton } from 'antd'
import { useMoralis } from 'react-moralis'
import { gql, useQuery } from 'urql'
import Address from '../Address'

export interface Depositor {
  address: string
  balance: string
}

const depositorsQuery = gql`
  query {
    players {
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
    <div className="space-y-5 rounded-xl border bg-white p-10 shadow-xl">
      <div>
        <h1>Depositors</h1>
        <h3>{depositors.length}</h3>
      </div>
      <div>
        {depositors.map((deposit) => (
          <div className="grid grid-cols-3 text-right" key={deposit.address}>
            <Address address={deposit.address} size={5} />
            <p>{Moralis.Units.FromWei(deposit.balance)} USDT</p>
            <p>View player</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DepositorStats
