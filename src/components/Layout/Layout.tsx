import {
  BodyWrapper,
  InnerHeaderWrapper,
  OuterHeaderWrapper,
  OuterLayoutWrapper,
} from './Layout.style'
import Navbar from './Navbar/Navbar'
import Header from './Header/Header'

export interface LayoutProps {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
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
