import { LoadingOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { FunctionComponent } from 'react'

export interface TransactionPendingProps {
  txHash?: string
  isVisible: boolean
}

const TransactionPending: FunctionComponent<TransactionPendingProps> = ({
  txHash,
  isVisible,
}) => {
  return (
    <div className={`${isVisible ? 'relative' : 'hidden'}`}>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-96">
          <div className="relative flex w-full flex-col rounded-xl border bg-white py-3 shadow-xl outline-none focus:outline-none dark:border-prize-dark-gray dark:bg-gray-800">
            <div className="rounded-t border-b border-solid p-5 text-center dark:border-prize-dark-gray">
              <h3 className="text-2xl font-medium text-prize-dark-gray dark:text-white">
                Transaction Pending
              </h3>
            </div>
            <div className="relative space-y-5 p-6 text-center">
              <div className="text-7xl text-prize-red">
                <LoadingOutlined />
              </div>
              <p className="text-prize-light-gray">
                Your transaction is being recorded to the blockchain and it will
                be reflected here shortly.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-b p-6">
              <Link href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                <a
                  className="rounded-lg border bg-white px-10 py-3 text-sm font-medium text-prize-dark-gray shadow-xl hover:text-prize-dark-gray dark:border-prize-dark-gray dark:bg-gray-900 dark:text-white"
                  type="button"
                  target="_blank"
                >
                  View on Etherscan
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
    </div>
  )
}

export default TransactionPending
