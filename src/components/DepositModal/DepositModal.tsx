import { Avatar } from 'antd'
import { FunctionComponent, useCallback, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { CUSDT, USDT } from '../Images/Images'
import {
  ModalBackground,
  ModalContentWrapper,
  ModalFooterWrapper,
  ModalHeaderWrapper,
  ModalInnerWrapper,
  ModalOuterWrapper,
} from './DepositModal.style'
import ApproveView from './Views/ApproveView/ApproveView'
import DepositView from './Views/DepositView/DepositView'
import SuccessView from './Views/SuccessView/SuccessView'

export interface DepositModalProps {
  visible: boolean
  onClose: () => void
}

const DepositModal: FunctionComponent<DepositModalProps> = ({
  visible,
  onClose,
}) => {
  const [step, setStep] = useState(1)
  const [amountToDeposit, setAmountToDeposit] = useState('')

  const handleFinish = useCallback((amount: string) => {
    setAmountToDeposit(amount)
    setStep((step) => step + 1)
  }, [])

  const handleClose = useCallback(() => {
    setStep(1)
    onClose()
  }, [])

  return (
    <>
      {visible && (
        <>
          <ModalOuterWrapper>
            <ModalInnerWrapper>
              <ModalHeaderWrapper>
                <div className="flex justify-end">
                  <button onClick={handleClose}>
                    <GrClose />
                  </button>
                </div>
                <Avatar.Group>
                  <Avatar src={<CUSDT />} />
                  <Avatar src={<USDT />} />
                </Avatar.Group>
                <h3 className="text-xl font-medium">Deposit USDT</h3>
                <h4 className="text-prize-light-gray">Step: {step} of 3</h4>
              </ModalHeaderWrapper>
              <ModalContentWrapper>
                {step === 1 && (
                  <ApproveView
                    onFinish={handleFinish}
                    handleClose={handleClose}
                  />
                )}
                {step === 2 && (
                  <DepositView
                    amountToDeposit={amountToDeposit}
                    onFinish={handleFinish}
                    handleClose={handleClose}
                  />
                )}
                {step === 3 && <SuccessView handleClose={handleClose} />}
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

export default DepositModal
