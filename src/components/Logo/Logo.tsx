import Image from 'next/image'
import { FunctionComponent } from 'react'
import logo from '../../assets/images/logo-no-text-white.png'

export interface LogoProps {
  size?: string
}

const Logo: FunctionComponent<LogoProps> = ({ size = '100' }) => (
  <Image src={logo} width={size} height={size} />
)

export default Logo
