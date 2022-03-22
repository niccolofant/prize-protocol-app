import { MenuItem } from './Chains'
import { ETHLogo } from './Logos'

const menuItems: MenuItem[] = [
  {
    key: '0x4',
    value: 'Rinkeby',
    icon: <ETHLogo />,
    name: 'Etherscan',
    link: 'https://rinkeby.etherscan.io/',
  },
]

export default menuItems
