import { LoadingOutlined } from '@ant-design/icons'
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
              <div className="text-5xl">
                <LoadingOutlined />
              </div>
              <p>Transaction broadcast</p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b p-6">
              <button
                className="flex flex-grow justify-center rounded bg-emerald-500 px-6 py-3 text-sm 
                text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="button"
              >
                View on Etherscan
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </div>
  )
}

export default TransactionPending
