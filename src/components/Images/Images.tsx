import Image from 'next/image'

export const USDT = () => {
  return (
    <Image
      src={require('../../assets/images/usdt-logo.svg')}
      width="50"
      height="50"
    />
  )
}

export const CUSDT = () => {
  return (
    <Image
      src={require('../../assets/images/cusdt-logo.svg')}
      width="50"
      height="50"
    />
  )
}

export const Compound = () => {
  return (
    <Image
      src={require('../../assets/images/compound-no-text-logo.svg')}
      width="50"
      height="50"
    />
  )
}

export const MetaMask = () => {
  return (
    <Image
      src={require('../../assets/images/metamask-logo.svg')}
      width="50"
      height="50"
    />
  )
}

export const WalletConnect = () => {
  return (
    <Image
      src={require('../../assets/images/walletconnect-logo.svg')}
      width="50"
      height="50"
    />
  )
}
