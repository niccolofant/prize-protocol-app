import {
  BodyWrapper,
  InnerHeaderWrapper,
  OuterHeaderWrapper,
  OuterLayoutWrapper,
} from './Layout.style'
import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import { FunctionComponent } from 'react'
import Footer from './Footer/Footer'

export interface LayoutProps {
  children: FunctionComponent | JSX.Element
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <OuterLayoutWrapper>
      <Navbar />
      <OuterHeaderWrapper>
        <InnerHeaderWrapper>
          <Header />
          <BodyWrapper>{children}</BodyWrapper>
          <div className="fixed z-50">ciao</div>
          <Footer />
        </InnerHeaderWrapper>
      </OuterHeaderWrapper>
    </OuterLayoutWrapper>
  )
}

export default Layout
