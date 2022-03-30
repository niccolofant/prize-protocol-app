import Link from 'next/link'
import { useMoralis } from 'react-moralis'
import { UserOutlined, TrophyOutlined, GithubOutlined } from '@ant-design/icons'
import Logo from '../../Logo/Logo'

const Navbar = () => {
  const { account } = useMoralis()
  return (
    <div className="hidden border-r text-prize-dark-gray shadow-xl md:inline md:w-40 lg:w-52">
      <div className="flex h-screen flex-col space-y-2 p-5">
        <div className="text-center">
          <Logo size="100" />
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
              <Link href={`/${account}/overview`}>
                <button className="flex flex-grow items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:bg-gray-100 hover:text-prize-dark-gray">
                  <UserOutlined />
                  <span>Account</span>
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="rounded-lg border p-2"></div>
        <Link href="/">
          <button className="flex items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:bg-gray-100 hover:text-prize-dark-gray">
            <GithubOutlined />
            <span>GitHub</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
