import { FunctionComponent } from 'react'
import Image from 'next/image'
import checkmark from '../../../../assets/images/checkmark.png'

export interface SuccessViewProps {
  handleClose: () => void
}

const SuccessView: FunctionComponent<SuccessViewProps> = ({ handleClose }) => {
  return (
    <div className="space-y-10">
      <Image src={checkmark} width="125" height="125" />
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-xl font-medium text-prize-dark-gray dark:text-white sm:text-2xl">
            Deposit Successful!
          </h1>
          <h3 className="text-prize-light-gray">
            You are now eligible to win the prize pool!
          </h3>
        </div>
        <button
          className="w-full rounded-lg bg-prize-red py-2 text-sm font-semibold text-white shadow-xl sm:w-1/2 sm:text-base"
          onClick={handleClose}
        >
          Ok
        </button>
      </div>
    </div>
  )
}

export default SuccessView
