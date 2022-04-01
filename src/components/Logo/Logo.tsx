import Image from 'next/image'
import { FunctionComponent } from 'react'

export interface LogoProps {
  src: StaticImageData
}

const Logo: FunctionComponent<LogoProps> = ({ src }) => (
  <Image src={src} layout="fill" objectFit="contain" />
)

export default Logo
