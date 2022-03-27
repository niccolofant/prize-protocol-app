import { FunctionComponent } from 'react'
import Image from 'next/image'
import checkmark from '../../../../assets/images/checkmark.png'

export interface SuccessViewProps {
  handleClose: () => void
}

const SuccessView: FunctionComponent<SuccessViewProps> = ({ handleClose }) => {
  return (
    <div>
      <Image src={checkmark} width="150" height="150" />
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-prize-dark-gray">
            Deposit Successful!
          </h1>
          <h3 className="text-prize-light-gray">
            You are now eligible to win the prize pool!
          </h3>
        </div>
        <button
          className="rounded-lg bg-prize-red px-16 py-3 font-semibold text-white shadow-xl"
          onClick={handleClose}
        >
          Ok
        </button>
      </div>
    </div>
  )
}

export default SuccessView
