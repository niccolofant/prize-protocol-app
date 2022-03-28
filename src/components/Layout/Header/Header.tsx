import { NextPage } from 'next'
import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import Login from '../../Authentication/Login'
import Chains from '../../Chains/Chains'
import { HeaderWrapper } from './Header.style'

export type Web3ProviderType =
  | 'metamask'
  | 'walletconnect'
  | 'walletConnect'
  | 'wc'
  | 'magicLink'
  | 'web3Auth'

const Header: NextPage = () => {
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
      <div className="hidden md:inline-flex">
        {isAuthenticated && <Chains />}
      </div>
      <Login />
    </HeaderWrapper>
  )
}

export default Header
