import { NextPage } from 'next'
import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

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
    <header className="flex items-center justify-end space-x-4 bg-slate-100 py-8 px-16">
      ciao
    </header>
  )
}

export default Header
