import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useMoralis, useChain } from 'react-moralis'
import { Dropdown, notification, Badge } from 'antd'
import menuItems from './menuItems'

const openNotification = (err: Error) => {
  notification['error']({
    message: err.message,
    description: `We weren't able to process the transaction - Reason: ${err.message}`,
    duration: 5,
  })
}

export interface MenuItem {
  key: string
  value: string
  icon: JSX.Element
  name: string
  link: string
}

const Chains: FunctionComponent = () => {
  const { switchNetwork, chainId } = useChain()
  const { Moralis } = useMoralis()
  const [selected, setSelected] = useState<MenuItem>()

  useEffect(() => {
    if (!chainId) return
    const newSelected = menuItems.find((item) => item.key === chainId)
    setSelected(newSelected)
  }, [chainId])

  const handleMenuClick = useCallback(async (key: string) => {
    await Moralis.enableWeb3()
    switchNetwork(key).catch((err) => openNotification(err))
  }, [])

  const menu = (
    <div className="flex flex-col rounded-lg border bg-white p-2 font-gilroy shadow-xl">
      {menuItems.map(({ key, icon, value }) => (
        <button
          onClick={() => handleMenuClick(key)}
          key={key}
          className={`hover:bg-gray-10 my-1 rounded-lg px-2 py-1.5 
          text-sm font-semibold tracking-wide text-prize-dark-gray
          ${chainId === key ? 'bg-slate-100 dark:bg-slate-800' : null}`}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="flex w-28 flex-grow items-center justify-between">
              {value}
              {chainId === key && <Badge status="processing" color="green" />}
            </div>
          </div>
        </button>
      ))}
    </div>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <button
        className="flex items-center space-x-2 rounded-lg border bg-white py-1.5 px-2
          text-sm font-semibold text-prize-dark-gray"
      >
        {selected?.icon}
        <span className="ml-2 hidden sm:inline">{selected?.value}</span>
      </button>
    </Dropdown>
  )
}

export default Chains
