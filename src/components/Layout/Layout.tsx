import {
  BodyWrapper,
  InnerHeaderWrapper,
  OuterHeaderWrapper,
  OuterLayoutWrapper,
} from './Layout.style'
import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import { FunctionComponent } from 'react'

export interface LayoutProps {
  children: FunctionComponent
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <OuterLayoutWrapper>
      <Navbar />
      <OuterHeaderWrapper>
        <InnerHeaderWrapper>
          <Header />
          <BodyWrapper>{children}</BodyWrapper>
        </InnerHeaderWrapper>
      </OuterHeaderWrapper>
    </OuterLayoutWrapper>
  )
}

export default Layout
