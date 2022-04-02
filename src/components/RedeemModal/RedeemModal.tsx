import { LoadingOutlined } from '@ant-design/icons'
import { Avatar, notification } from 'antd'
import { FunctionComponent, useCallback, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { IoIosWallet } from 'react-icons/io'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { prizeProtocolABI } from '../../utils/abis/prizeProtocolABI'
import { PROTOCOL_ADDRESS } from '../../utils/constants'
import { n2 } from '../../utils/formatters'
import {
  ModalBackground,
  ModalContentWrapper,
  ModalFooterWrapper,
  ModalHeaderWrapper,
  ModalInnerWrapper,
  ModalOuterWrapper,
} from '../DepositModal/DepositModal.style'
import { CUSDT, USDT } from '../Images/Images'

const openNotification = (err: Error) => {
  notification['error']({
    message: err.message,
    description: `We weren't able to process the transaction - Reason: ${err.message}`,
    duration: 5,
  })
}

export interface RedeemModalProps {
  visible: boolean
  onClose: () => void
  balance: string
}

const RedeemModal: FunctionComponent<RedeemModalProps> = ({
  visible,
  onClose,
  balance,
}) => {
  const [amountToRedeem, setAmountToRedeem] = useState('')
  const [isAmountValid, setIsAmountValid] = useState(true)
  const [isRedeemLoading, setIsRedeemLoading] = useState(false)
  const { Moralis } = useMoralis()

  const { runContractFunction: redeem } = useWeb3Contract({
    abi: prizeProtocolABI,
    contractAddress: PROTOCOL_ADDRESS,
    functionName: 'redeem',
    params: {
      _tokenAmount: amountToRedeem && Moralis.Units.ETH(amountToRedeem),
    },
  })

  const handleRedeemClick = useCallback(async () => {
    setIsRedeemLoading(true)
    await redeem({
      onSuccess: async (tx: any) => {
        await tx.wait(1)
        setIsRedeemLoading(false)
        onClose()
      },
      onError: (err) => {
        openNotification(err)
        setIsRedeemLoading(false)
        onClose()
      },
    })
  }, [amountToRedeem])

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        !e.target.value ||
        parseFloat(e.target.value) > parseFloat(Moralis.Units.FromWei(balance))
      )
        setIsAmountValid(false)
      else setIsAmountValid(true)
      setAmountToRedeem(e.target.value)
    },
    [amountToRedeem]
  )

  return (
    <>
      {visible && (
        <>
          <ModalOuterWrapper>
            <ModalInnerWrapper>
              <ModalHeaderWrapper>
                <div className="flex justify-end">
                  <button onClick={onClose}>
                    <GrClose />
                  </button>
                </div>
                <Avatar.Group>
                  <Avatar src={<CUSDT />} />
                  <Avatar src={<USDT />} />
                </Avatar.Group>
                <h3 className="text-xl font-medium">Redeem USDT</h3>
                <h4 className="text-prize-light-gray">
                  You will convert your ptUSDTc to USDT
                </h4>
              </ModalHeaderWrapper>
              <ModalContentWrapper>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium text-prize-dark-gray">
                      <span>Balance</span>
                      <button
                        onClick={() => {
                          setAmountToRedeem(Moralis.Units.FromWei(balance))
                          handleFormChange
                        }}
                      >
                        <span className="flex items-center space-x-1 text-prize-dark-gray">
                          <IoIosWallet />
                          <span className="text-base font-medium">
                            {n2.format(
                              parseFloat(Moralis.Units.FromWei(balance))
                            )}
                            <span className="text-base font-normal text-prize-light-gray">
                              {' '}
                              USDT
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>
                    <input
                      type="number"
                      className="block w-full rounded-lg border
                      p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                    dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="1.0"
                      value={amountToRedeem}
                      onChange={handleFormChange}
                      min="1"
                      required
                    />
                    {!isAmountValid ? (
                      <p className="mt-2 flex justify-start text-sm font-medium text-prize-red">
                        Invalid amount
                      </p>
                    ) : (
                      <p className="mt-2 text-sm font-medium text-white">.</p>
                    )}
                  </div>
                  <button
                    className="w-full rounded-lg bg-prize-red py-2 text-sm font-semibold text-white shadow-xl sm:w-1/2 sm:text-base"
                    onClick={handleRedeemClick}
                    disabled={isRedeemLoading || !isAmountValid}
                  >
                    {isRedeemLoading ? <LoadingOutlined /> : 'Redeem'}
                  </button>
                </div>
              </ModalContentWrapper>
              <ModalFooterWrapper />
            </ModalInnerWrapper>
          </ModalOuterWrapper>
          <ModalBackground />
        </>
      )}
    </>
  )
}

export default RedeemModal
