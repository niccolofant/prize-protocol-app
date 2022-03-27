import { useERC20Balances, useMoralis } from 'react-moralis'
import { LoadingOutlined } from '@ant-design/icons'
import { IoIosWallet } from 'react-icons/io'
import { notification } from 'antd'
import { n4 } from '../utils/formatters'

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
      <div className="flex items-center space-x-1 text-prize-dark-gray">
        <IoIosWallet />
        <p className="text-lg font-medium">
          {!erc20Balances && !erc20BalancesError && <LoadingOutlined />}
          {erc20Balances &&
            erc20Balances
              .filter((erc20Balance) => erc20Balance.token_address === address)
              .map((erc20) =>
                n4.format(parseFloat(Moralis.Units.FromWei(erc20.balance)))
              )}
          <span className="text-base font-normal text-prize-light-gray">
            {' '}
            {name}
          </span>
        </p>
      </div>
    </div>
  )
}

export default ERC20Balance
