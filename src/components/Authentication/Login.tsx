import { useMoralis } from 'react-moralis'
import { Modal } from 'antd'
import { useState } from 'react'
import Address from '../Address'
import { connectors } from './config'
import { CheckCircleOutlined } from '@ant-design/icons'
import { CopyOutlined } from '@ant-design/icons'
import { getEllipsisTxt } from '../../utils/formatters'
import { Web3ProviderType } from '../Layout/Header/Header'

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const { authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis()

  if (!isAuthenticated || !account) {
    return (
      <div>
        <button
          onClick={() => setIsAuthModalVisible(true)}
          className="rounded-xl border bg-white px-5 py-1.5 font-semibold text-blue-500"
        >
          Connect Wallet
        </button>

        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          width="380px"
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-10 font-gilroy dark:border dark:border-slate-700 dark:bg-[#1d1d1d]">
            <div className="flex flex-col items-center py-5">
              <h1 className="font-gilroy text-2xl font-semibold text-slate-800 dark:text-white">
                Connect Wallet
              </h1>
              <p className="font-gilroy text-base text-slate-400 dark:text-slate-500">
                to start using Pryze
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 ">
              {connectors.map(({ title, icon, connectorId }, key) => (
                <button
                  key={key}
                  className="mx-auto flex w-full cursor-pointer flex-col 
                items-center justify-center rounded-xl border border-slate-200 p-5 
                pt-7 hover:border-slate-300 hover:shadow-lg 
                dark:border-slate-700"
                  onClick={async () => {
                    try {
                      await authenticate({
                        provider: connectorId as Web3ProviderType,
                        signingMessage: 'Enjoy Pryze!',
                      })
                      window.localStorage.setItem('connectorId', connectorId)
                      setIsAuthModalVisible(false)
                    } catch (e) {
                      console.error(e)
                    }
                  }}
                >
                  <div>
                    {icon}
                    {/*<Image height="30" width="30" src={icon} alt={title} />*/}
                  </div>

                  <p className="font-sm text-slate-400 dark:text-slate-500">
                    {title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    )
  }
  return (
    <div>
      <button
        onClick={() => {
          setIsModalVisible(true)
        }}
        className="rounded-xl border bg-white px-5 py-1.5 font-semibold text-blue-500"
      >
        {getEllipsisTxt(account, 6)}
      </button>

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width="340px"
      >
        <h1 className="font-gilroy text-xl text-slate-800">Account</h1>

        <div className="rounded-lg border border-slate-200 p-3 font-gilroy">
          <div className="space-b flex items-center">
            <div className="text-md flex-grow text-slate-400">Connected</div>
            <button
              className="rounded-full bg-red-500 px-2 text-xs text-white"
              onClick={async () => {
                await logout()
                window.localStorage.removeItem('connectorId')
                setIsModalVisible(false)
              }}
            >
              Disconnect
            </button>
          </div>

          <div>
            <Address size={6} />
            <div
              className="flex justify-between"
              onClick={() => {
                navigator.clipboard.writeText(account)
                setIsCopied(true)
                setTimeout(() => {
                  setIsCopied(false)
                }, 1000)
              }}
            >
              {!isCopied ? (
                <a className="flex items-center gap-1">
                  <CopyOutlined />
                  Copy Address
                </a>
              ) : (
                <span className="flex items-center gap-1 text-[#1990FF]">
                  <CheckCircleOutlined />
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Login
