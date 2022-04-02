import { useMoralis } from 'react-moralis'
import { Badge } from 'antd'
import { useState } from 'react'
import { connectors } from './config'
import { getEllipsisTxt } from '../../utils/formatters'
import { Web3ProviderType } from '../Layout/Header/Header'
import {
  ModalBackground,
  ModalContentWrapper,
  ModalFooterWrapper,
  ModalHeaderWrapper,
  ModalOuterWrapper,
} from '../DepositModal/DepositModal.style'
import { IoIosClose } from 'react-icons/io'

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false)
  const { authenticate, isAuthenticated, account, logout } = useMoralis()

  if (!isAuthenticated || !account) {
    return (
      <>
        <button
          onClick={() => setIsAuthModalVisible(true)}
          className="rounded-lg border bg-white px-5 py-1.5 font-medium text-prize-dark-gray dark:border-prize-dark-gray dark:bg-gray-800 dark:text-white"
        >
          Connect Wallet
        </button>
        {isAuthModalVisible && (
          <>
            <ModalOuterWrapper>
              <div
                className="relative my-6 mx-2 flex w-screen flex-col 
                rounded-xl border bg-white shadow-xl outline-none focus:outline-none
                dark:border-prize-dark-gray dark:bg-gray-800 sm:w-2/3 lg:w-1/3"
              >
                <ModalHeaderWrapper>
                  <div className="flex justify-end">
                    <button onClick={() => setIsAuthModalVisible(false)}>
                      <span className="text-2xl text-prize-light-gray">
                        <IoIosClose />
                      </span>
                    </button>
                  </div>
                  <h1 className="text-2xl font-medium text-prize-dark-gray dark:text-white">
                    Connect Wallet
                  </h1>
                  <p className="text-center text-base text-slate-400 dark:text-slate-500">
                    to start using Prize and get the chance to win big! 🏆
                  </p>
                </ModalHeaderWrapper>

                <ModalContentWrapper>
                  <div className="grid grid-cols-2 gap-5">
                    {connectors.map(({ title, icon, connectorId }, key) => (
                      <button
                        key={key}
                        className="mx-auto flex w-full cursor-pointer flex-col 
                        items-center justify-center rounded-xl border p-5 
                        pt-7 dark:border-prize-dark-gray dark:bg-gray-900"
                        onClick={async () => {
                          try {
                            await authenticate({
                              provider: connectorId as Web3ProviderType,
                              signingMessage: 'Enjoy Prize!',
                            })
                            window.localStorage.setItem(
                              'connectorId',
                              connectorId
                            )
                            setIsAuthModalVisible(false)
                          } catch (e) {
                            console.error(e)
                          }
                        }}
                      >
                        <div>{icon}</div>
                        <p className="font-sm text-prize-dark-gray dark:text-white">
                          {title}
                        </p>
                      </button>
                    ))}
                  </div>
                </ModalContentWrapper>
                <ModalFooterWrapper />
              </div>
            </ModalOuterWrapper>
            <ModalBackground />
          </>
        )}
      </>
    )
  }
  return (
    <div>
      <button
        onClick={() => {
          setIsModalVisible(true)
        }}
        className="rounded-lg border bg-white px-5 py-1.5 font-medium text-prize-dark-gray dark:border-prize-dark-gray dark:bg-gray-800 dark:text-white"
      >
        {getEllipsisTxt(account, 5)}
      </button>

      {isModalVisible && (
        <>
          <ModalOuterWrapper>
            <div
              className="relative my-6 mx-2 flex w-screen flex-col 
                rounded-xl border bg-white shadow-xl outline-none focus:outline-none
                dark:border-prize-dark-gray dark:bg-gray-800 sm:w-2/3 lg:w-1/3"
            >
              <ModalHeaderWrapper>
                <div className="flex justify-end">
                  <button onClick={() => setIsModalVisible(false)}>
                    <span className="text-2xl text-prize-light-gray">
                      <IoIosClose />
                    </span>
                  </button>
                </div>
                <h1 className="text-2xl font-medium text-prize-dark-gray dark:text-white">
                  Account
                </h1>
              </ModalHeaderWrapper>
              <ModalContentWrapper>
                <div className="space-y-5 rounded-lg border p-3 dark:border-prize-dark-gray">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-prize-light-gray">Connected</p>
                      <Badge status="processing" color="green" />
                    </div>
                    <button
                      className="rounded-full bg-prize-red px-5 text-xs font-medium text-white"
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
                    <h1 className="text-left text-lg font-medium text-prize-dark-gray dark:text-white">
                      {getEllipsisTxt(account, 5)}
                    </h1>
                  </div>
                </div>
              </ModalContentWrapper>
              <ModalFooterWrapper />
            </div>
          </ModalOuterWrapper>
          <ModalBackground />
        </>
      )}
    </div>
  )
}
export default Login
