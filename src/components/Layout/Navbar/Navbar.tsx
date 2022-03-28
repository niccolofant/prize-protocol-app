import Link from 'next/link'
import { useMoralis } from 'react-moralis'
import { UserOutlined, TrophyOutlined } from '@ant-design/icons'
import Logo from '../../Logo/Logo'

const Navbar = () => {
  const { account } = useMoralis()
  return (
    <div className="hidden flex-col border-r p-5 text-prize-dark-gray shadow-xl md:inline-flex md:w-40 lg:w-52">
      <Logo />
      <nav className="my-5">
        <ul className="space-y-2">
          <li className="flex">
            <Link href="/">
              <button
                className="flex flex-grow items-center space-x-4 
                rounded-lg px-3 py-2 font-medium hover:bg-gray-100"
              >
                <TrophyOutlined />
                <span>Pools</span>
              </button>
            </Link>
          </li>
          <li className="flex">
            <Link href={`/${account}/overview`}>
              <button
                className="flex flex-grow items-center space-x-4 
                rounded-lg px-3 py-2 font-medium hover:bg-gray-100"
              >
                <UserOutlined />
                <span>Account</span>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
