import { TrophyOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { useMoralis } from 'react-moralis'

const Tabbar: FunctionComponent = () => {
  const { account } = useMoralis()

  return (
    <nav className="fixed bottom-0 z-50 w-screen border-t bg-white p-5 dark:border-prize-dark-gray dark:bg-gray-800 md:hidden">
      <ul className="flex justify-around">
        <li>
          <Link href="/">
            <button className="flex flex-grow items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:text-prize-dark-gray dark:hover:text-white">
              <TrophyOutlined />
              <span>Pools</span>
            </button>
          </Link>
        </li>
        <li>
          <Link href={`/players/${account}`}>
            <button className="flex flex-grow items-center space-x-4 rounded-lg px-3 py-2 text-prize-light-gray hover:text-prize-dark-gray dark:hover:text-white">
              <UserOutlined />
              <span>Account</span>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Tabbar
