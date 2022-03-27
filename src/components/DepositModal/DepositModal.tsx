import { Avatar } from 'antd'
import { FunctionComponent, useCallback, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { CUSDT, USDT } from '../Images/Images'
import {
  DepositModalBackground,
  DepositModalContentWrapper,
  DepositModalFooterWrapper,
  DepositModalHeaderWrapper,
  DepositModalInnerWrapper,
  DepositModalOuterWrapper,
} from './DepositModal.style'
import ApproveView from './Views/ApproveView/ApproveView'
import DepositView from './Views/DepositView/DepositView'
import SuccessView from './Views/SuccessView/SuccessView'

export interface DepositModalProps {
  visible: boolean
  handleClose: () => void
}

const DepositModal: FunctionComponent<DepositModalProps> = ({
  visible,
  handleClose,
}) => {
  const [step, setStep] = useState(1)
  const [amountToDeposit, setAmountToDeposit] = useState('')

  const handleFinish = useCallback((amount: string) => {
    setAmountToDeposit(amount)
    setStep((step) => step + 1)
  }, [])

  return (
    <>
      {visible && (
        <>
          <DepositModalOuterWrapper>
            <DepositModalInnerWrapper>
              <DepositModalHeaderWrapper>
                <div className="mr-5 flex justify-end">
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
              </DepositModalHeaderWrapper>
              <DepositModalContentWrapper>
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
              </DepositModalContentWrapper>
              <DepositModalFooterWrapper />
            </DepositModalInnerWrapper>
          </DepositModalOuterWrapper>
          <DepositModalBackground />
        </>
      )}
    </>
  )
}

export default DepositModal
