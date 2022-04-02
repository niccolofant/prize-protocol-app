import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useMoralis, useChain } from 'react-moralis'
import { VscError } from 'react-icons/vsc'
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
    <div className="flex flex-col rounded-lg border bg-white p-2 font-gilroy shadow-xl dark:border-prize-dark-gray dark:bg-gray-800">
      {menuItems.map(({ key, icon, value }) => (
        <button
          onClick={() => handleMenuClick(key)}
          key={key}
          className={`rounded-lg p-2 text-sm font-medium text-prize-dark-gray hover:bg-gray-100 dark:hover:bg-prize-dark-gray
          ${chainId === key ? 'bg-slate-100 dark:bg-prize-dark-gray' : null}`}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="flex w-28 flex-grow items-center justify-between tracking-wider text-prize-light-gray">
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
        className="flex items-center
          font-gilroy text-sm font-medium text-prize-dark-gray"
      >
        {chainId !== '0x4' ? (
          <span className="flex items-center space-x-1 rounded-lg border bg-white p-2 text-prize-red dark:border-prize-dark-gray dark:bg-gray-800">
            <VscError />
            <span className="hidden sm:inline">Wrong Network</span>
          </span>
        ) : (
          <span className="p-2">{selected?.icon}</span>
        )}
        <span className="hidden tracking-wider text-prize-dark-gray dark:text-white sm:inline">
          {selected?.value}
        </span>
      </button>
    </Dropdown>
  )
}

export default Chains
