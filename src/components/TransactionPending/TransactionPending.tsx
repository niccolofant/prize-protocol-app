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
          <div className="relative flex w-full flex-col rounded-xl border-0 bg-white py-3 shadow-xl outline-none focus:outline-none">
            {/*header*/}
            <div className="rounded-t border-b border-solid border-gray-200 p-5 text-center">
              <h3 className="text-xl font-medium">Transaction Pending</h3>
            </div>
            {/*body*/}
            <div className="relative space-y-5 p-6 text-center ">
              <div className="text-5xl text-prize-blue">
                <LoadingOutlined />
              </div>
              <p className="text-prize-light-gray">Transaction broadcast</p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b p-6">
              <Link href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                <a
                  className="flex flex-grow justify-center rounded bg-prize-blue px-6 
                py-3 text-sm font-medium text-white shadow transition-all duration-150 ease-linear hover:text-white hover:shadow-lg"
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
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </div>
  )
}

export default TransactionPending
