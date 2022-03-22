import Link from 'next/link'
import { BsTrophy } from 'react-icons/bs'
import { useMoralis } from 'react-moralis'
import { AiOutlineUser } from 'react-icons/ai'

const Navbar = () => {
  const { account } = useMoralis()
  return (
    <div className="hidden flex-col bg-slate-50 p-5 py-6 text-slate-500 lg:inline-flex xl:w-48">
      <nav className="my-6">
        <ul className="space-y-2">
          <li className="flex">
            <Link href="/">
              <button
                className="flex flex-grow items-center space-x-4 
                rounded-lg px-3 py-2 font-medium hover:bg-slate-100"
              >
                <BsTrophy />
                <span>Pools</span>
              </button>
            </Link>
          </li>
          <li className="flex">
            <Link href={`/${account}/overview`}>
              <button
                className="flex flex-grow items-center space-x-4 
                rounded-lg px-3 py-2 font-medium hover:bg-slate-100"
              >
                <AiOutlineUser />
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
