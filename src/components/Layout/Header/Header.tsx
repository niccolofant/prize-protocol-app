import { FunctionComponent, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import Login from '../../Authentication/Login'
import Chains from '../../Chains/Chains'
import Logo from '../../Logo/Logo'
import { HeaderWrapper } from './Header.style'
import logo from '../../../assets/images/logo-no-text-white.png'
import Switcher from '../../Theme/Switcher'

export type Web3ProviderType =
  | 'metamask'
  | 'walletconnect'
  | 'walletConnect'
  | 'wc'
  | 'magicLink'
  | 'web3Auth'

const Header: FunctionComponent = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(
      'connectorId'
    ) as Web3ProviderType
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId })
  }, [isAuthenticated, isWeb3Enabled])

  return (
    <HeaderWrapper>
      <div className="md:opacity-0">
        <div className="relative h-12 w-12">
          <Logo src={logo} />
        </div>
      </div>
      <div className="flex items-center gap-5">
        {isAuthenticated && <Chains />}
        <Login />
        <Switcher />
      </div>
    </HeaderWrapper>
  )
}

export default Header
