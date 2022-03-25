import { useERC20Balances, useMoralis } from 'react-moralis'
import { LoadingOutlined, WalletOutlined } from '@ant-design/icons'
import { notification } from 'antd'

export interface ERC20BalanceProps {
  address: string
  name?: string
}

const openErrorNotification = (erc20BalancesError: Error) => {
  notification['error']({
    message: 'Error',
    description: erc20BalancesError.message,
  })
}

const ERC20Balance = ({ address, name }: ERC20BalanceProps) => {
  const { Moralis } = useMoralis()
  const { data: erc20Balances, error: erc20BalancesError } = useERC20Balances()

  return (
    <div>
      {erc20BalancesError && openErrorNotification(erc20BalancesError)}
      <div className="flex items-center space-x-1">
        <WalletOutlined />
        <div>
          {!erc20Balances && !erc20BalancesError && <LoadingOutlined />}
          {erc20Balances &&
            erc20Balances
              .filter((erc20Balance) => erc20Balance.token_address === address)
              .map((erc20) => Moralis.Units.FromWei(erc20.balance))}
          <span> {name}</span>
        </div>
      </div>
    </div>
  )
}

export default ERC20Balance
