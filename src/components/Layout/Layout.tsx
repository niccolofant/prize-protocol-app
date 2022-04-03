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
import Tabbar from './Tabbar/Tabbar'

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
          <Footer />
        </InnerHeaderWrapper>
      </OuterHeaderWrapper>
      <Tabbar />
    </OuterLayoutWrapper>
  )
}

export default Layout
