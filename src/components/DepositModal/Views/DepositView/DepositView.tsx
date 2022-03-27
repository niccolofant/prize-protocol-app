import { notification } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { prizeProtocolABI } from '../../../../utils/abis/prizeProtocolABI'
import { PROTOCOL_ADDRESS } from '../../../../utils/constants'
import prize1 from '../../../../assets/images/prize-1.png'
import Image from 'next/image'
import { LoadingOutlined } from '@ant-design/icons'

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
  const [isDepositLoading, setIsDepositLoading] = useState(false)
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
        setIsDepositLoading(true)
        await tx.wait(1)
        setIsDepositLoading(false)
        onFinish(amountToDeposit)
      },
      onError: (err) => {
        openNotification(err)
        setIsDepositLoading(false)
        handleClose()
      },
    })
  }

  useEffect(() => {
    handleDeposit()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <Image src={prize1} width="250" height="250" />
      {isDepositLoading && (
        <div className="space-y-5">
          <LoadingOutlined />
          <p>Wait until your deposit of {amountToDeposit} USDT has finished!</p>
        </div>
      )}
    </div>
  )
}

export default DepositView
