import Header from './Header'
import Navbar from './Navbar'

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex h-screen font-gilroy text-base">
      <Navbar />
      <div className="flex w-screen flex-1 overflow-hidden">
        <div className="scrollbar-hide flex-1 overflow-y-scroll">
          <Header />
          <div className="mx-auto max-w-4xl py-10">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
