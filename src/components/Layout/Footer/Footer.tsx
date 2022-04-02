import { FunctionComponent } from 'react'
import Image from 'next/image'
import footer from '../../../assets/images/footer.png'

const Footer: FunctionComponent = () => {
  return (
    <footer className="mt-40 text-center">
      <div className="relative">
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-b from-gray-100 to-transparent" />
        <Image src={footer} layout="responsive" objectFit="cover" />
      </div>
    </footer>
  )
}

export default Footer
