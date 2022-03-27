import Image from 'next/image'
import { FunctionComponent } from 'react'

export interface ImageProps {
  size?: string
}

export const USDT: FunctionComponent<ImageProps> = ({ size }) => {
  return (
    <Image
      src={require('../../assets/images/usdt-logo.svg')}
      width={size ? size : '50'}
      height={size ? size : '50'}
    />
  )
}

export const CUSDT: FunctionComponent<ImageProps> = ({ size }) => {
  return (
    <Image
      src={require('../../assets/images/cusdt-logo.svg')}
      width={size ? size : '50'}
      height={size ? size : '50'}
    />
  )
}

export const Compound: FunctionComponent<ImageProps> = ({ size }) => {
  return (
    <Image
      src={require('../../assets/images/compound-no-text-logo.svg')}
      width={size ? size : '50'}
      height={size ? size : '50'}
    />
  )
}

export const MetaMask: FunctionComponent<ImageProps> = ({ size }) => {
  return (
    <Image
      src={require('../../assets/images/metamask-logo.svg')}
      width={size ? size : '50'}
      height={size ? size : '50'}
    />
  )
}

export const WalletConnect: FunctionComponent<ImageProps> = ({ size }) => {
  return (
    <Image
      src={require('../../assets/images/walletconnect-logo.svg')}
      width={size ? size : '50'}
      height={size ? size : '50'}
    />
  )
}
