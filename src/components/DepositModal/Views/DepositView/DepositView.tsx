import { notification } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { prizeProtocolABI } from '../../../../utils/abis/prizeProtocolABI'
import { PROTOCOL_ADDRESS } from '../../../../utils/constants'
import { LoadingOutlined } from '@ant-design/icons'
import Link from 'next/link'

const openNotification = (err: Error) => {
  notification['error']({
    message: err.message,
    description: `We weren't able to process the transaction - Reason: ${err.message}`,
    duration: 5,
  })
}

export interface DepositViewProps {
  amountToDeposit: string
  onFinish: (amount: string) => void
  handleClose: () => void
}

const DepositView: FunctionComponent<DepositViewProps> = ({
  amountToDeposit,
  onFinish,
  handleClose,
}) => {
  const [txHash, setTxHash] = useState('')
  const { Moralis } = useMoralis()

  const { runContractFunction: deposit } = useWeb3Contract({
    abi: prizeProtocolABI,
    contractAddress: PROTOCOL_ADDRESS,
    functionName: 'deposit',
    params: {
      _amount: amountToDeposit && Moralis.Units.ETH(amountToDeposit),
    },
  })

  const handleDeposit = async () => {
    await deposit({
      onSuccess: async (tx: any) => {
        setTxHash(tx.hash)
        await tx.wait(1)
        onFinish(amountToDeposit)
      },
      onError: (err) => {
        openNotification(err)
        handleClose()
      },
    })
  }

  useEffect(() => {
    handleDeposit()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-prize-dark-gray">
          Deposit Pending
        </h3>
        <div className="relative space-y-5 p-6 text-center ">
          <div className="text-7xl text-prize-red">
            <LoadingOutlined />
          </div>
          <p className="text-prize-light-gray">
            Wait until your deposit of {amountToDeposit} USDT has finished!
            <br />
            Your transaction is being recorded to the blockchain and it will be
            reflected here shortly.
          </p>
        </div>
        <div className="flex items-center justify-center rounded-b p-6">
          <Link href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
            <a
              className="rounded-lg border px-10 py-3 text-sm font-medium 
              text-prize-dark-gray shadow-xl hover:text-prize-dark-gray"
              type="button"
              target="_blank"
            >
              View on Etherscan
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DepositView
