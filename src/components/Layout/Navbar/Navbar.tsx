import Link from 'next/link'
import { useMoralis } from 'react-moralis'
import { UserOutlined, TrophyOutlined, GithubOutlined } from '@ant-design/icons'
import Logo from '../../Logo/Logo'
import WinSmallCard from '../../WinSmallCard/WinSmallCard'
import logo from '../../../assets/images/logo-white-text.png'
import AllWins from '../../AllWins/AllWins'

const Navbar = () => {
  const { account } = useMoralis()

  return (
    <div className="hidden border-r text-prize-dark-gray shadow-xl md:inline md:w-40 lg:w-60">
      <div className="flex h-screen flex-col space-y-2 p-5">
        <div className="relative h-20">
          <Logo src={logo} />
        </div>
        <nav className="flex-1 py-5">
          <ul className="space-y-2">
            <li className="flex">
              <Link href="/">
                <button className="flex flex-grow items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:bg-gray-100 hover:text-prize-dark-gray">
                  <TrophyOutlined />
                  <span>Pools</span>
                </button>
              </Link>
            </li>
            <li className="flex">
              <Link href={`/players/${account}`}>
                <button className="flex flex-grow items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:bg-gray-100 hover:text-prize-dark-gray">
                  <UserOutlined />
                  <span>Account</span>
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden space-y-5 lg:inline">
          <AllWins />
          <WinSmallCard />
        </div>
        <Link href="https://github.com/ocintnaf/prize-protocol-core">
          <button className="flex items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:text-prize-dark-gray">
            <GithubOutlined />
            <span>GitHub</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
