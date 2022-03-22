import { useEffect, useState } from 'react'
import { useMoralis, useChain } from 'react-moralis'
import { Dropdown, notification, Badge } from 'antd'
import { BiChevronDown } from 'react-icons/bi'
import menuItems from './menuItems'

const openNotification = (err: any) => {
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

const Chains = () => {
  const { switchNetwork, chainId } = useChain()
  const { Moralis } = useMoralis()
  const [selected, setSelected] = useState<MenuItem>()

  useEffect((): void => {
    if (!chainId) return
    const newSelected = menuItems.find((item) => item.key === chainId)
    setSelected(newSelected)
  }, [chainId])

  const handleMenuClick = async (key: string) => {
    await Moralis.enableWeb3()
    switchNetwork(key).catch((err) => openNotification(err))
  }

  const menu = (
    <div
      className="flex flex-col rounded-xl border border-slate-200 bg-white
      p-2 font-gilroy shadow-lg dark:border-slate-700 dark:bg-[#1d1d1d]"
    >
      {menuItems.map(({ key, icon, value }) => (
        <button
          onClick={() => handleMenuClick(key)}
          key={key}
          className={`my-1 rounded-lg px-2 py-1.5 text-sm 
          font-medium tracking-wide text-slate-800 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800 
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
        className="flex items-center space-x-2 rounded-xl border bg-white px-2
          py-1.5 text-sm font-medium text-slate-800"
      >
        {selected?.icon}
        <span className="ml-2">{selected?.value}</span>
        <BiChevronDown />
      </button>
    </Dropdown>
  )
}

export default Chains
