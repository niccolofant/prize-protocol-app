import { NextPage } from 'next'
import Link from 'next/link'

const Custom404: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-5 text-center">
        <div className="flex">
          <h1 className="border-r p-5 text-4xl font-extrabold text-prize-red md:text-6xl">
            404
          </h1>
          <div className="space-y-2 p-5 text-left">
            <h2 className="text-2xl font-extrabold tracking-wider text-black sm:text-4xl md:text-6xl">
              Page not found
            </h2>
            <h4 className="text-lg font-light text-prize-light-gray">
              Please check the URL in the address bar and try again.
            </h4>
          </div>
        </div>
        <Link href="/">
          <button className="rounded-lg bg-prize-red px-16 py-3 font-semibold text-white shadow-xl">
            Go back Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Custom404
