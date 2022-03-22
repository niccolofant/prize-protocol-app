import { MetaMask, WalletConnect } from '../Images/Images'

export const connectors = [
  {
    title: 'Metamask',
    icon: <MetaMask />,
    connectorId: 'injected',
    priority: 1,
  },
  {
    title: 'WalletConnect',
    icon: <WalletConnect />,
    connectorId: 'walletconnect',
    priority: 2,
  },
]
