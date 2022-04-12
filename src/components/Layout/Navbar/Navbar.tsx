import Link from 'next/link'
import { useMoralis } from 'react-moralis'
import { UserOutlined, TrophyOutlined, GithubOutlined } from '@ant-design/icons'
import Logo from '../../Logo/Logo'
import WinSmallCard from '../../WinSmallCard/WinSmallCard'
import logoLight from '../../../assets/images/logo-text-white.png'
import logoDark from '../../../assets/images/logo-text-dark.png'
import AllWins from '../../AllWins/AllWins'
import { FunctionComponent } from 'react'

const Navbar: FunctionComponent = () => {
  const { account } = useMoralis()

  return (
    <div className="hidden border-r text-prize-dark-gray shadow-xl dark:border-prize-dark-gray dark:bg-gray-800 md:inline md:w-40 lg:w-60">
      <div className="light:bg-red-200 flex h-screen flex-col space-y-2 p-5">
        <div className="relative ml-2 mt-2 hidden h-12 dark:inline">
          <Logo src={logoDark} />
        </div>
        <div className="relative ml-2 h-12 dark:hidden">
          <Logo src={logoLight} />
        </div>
        <nav className="flex-1 py-5">
          <ul className="space-y-2">
            <li className="flex">
              <Link href="/">
                <button className="flex flex-grow items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:bg-gray-100 hover:text-prize-dark-gray dark:hover:bg-prize-dark-gray dark:hover:text-white">
                  <TrophyOutlined />
                  <span>Pools</span>
                </button>
              </Link>
            </li>
            <li className="flex">
              <Link href={`/players/${account}`}>
                <button className="flex flex-grow items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:bg-gray-100 hover:text-prize-dark-gray dark:hover:bg-prize-dark-gray dark:hover:text-white">
                  <UserOutlined />
                  <span>Account</span>
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden space-y-5 lg:inline">
          <WinSmallCard />
        </div>
        <Link href="https://github.com/ocintnaf/prize-protocol-core">
          <button className="flex items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:text-prize-dark-gray dark:hover:text-white">
            <GithubOutlined />
            <span>GitHub</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
