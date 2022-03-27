import { LoadingOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { FunctionComponent, useCallback, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { gql, useQuery } from 'urql'
import { usdtABI } from '../../../../utils/abis/usdtABI'
import {
  PROTOCOL_ADDRESS,
  USDT_ADDRESS,
  USDT_NAME,
} from '../../../../utils/constants'
import { getWinningOdds } from '../../../../utils/functions'
import ERC20Balance from '../../../ERC20Balance'

const openNotification = (err: Error) => {
  notification['error']({
    message: err.message,
    description: `We weren't able to process the transaction - Reason: ${err.message}`,
    duration: 5,
  })
}

export interface ApproveViewProps {
  onFinish: (amount: string) => void
  handleClose: () => void
}

export const prizePoolQuery = gql`
  query {
    lotteries(orderBy: id, orderDirection: desc, first: 1) {
      amountDeposited
    }
  }
`

const ApproveView: FunctionComponent<ApproveViewProps> = ({
  onFinish,
  handleClose,
}) => {
  const [amountToApprove, setAmountToApprove] = useState('')
  const [isAmountValid, setIsAmountValid] = useState(false)
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [winningOdds, setWinningOdds] = useState('-')
  const [{ data }] = useQuery({ query: prizePoolQuery })
  const { Moralis } = useMoralis()

  const amountDeposited: string = data?.lotteries[0].amountDeposited

  const { runContractFunction: approveDeposit } = useWeb3Contract({
    abi: usdtABI,
    contractAddress: USDT_ADDRESS,
    functionName: 'approve',
    params: {
      _spender: PROTOCOL_ADDRESS,
      amount: amountToApprove && Moralis.Units.ETH(amountToApprove),
    },
  })

  const handleApproveClick = useCallback(async () => {
    setIsApproveLoading(true)
    await approveDeposit({
      onSuccess: async (tx: any) => {
        await tx.wait(1)
        setIsApproveLoading(false)
        onFinish(amountToApprove)
      },
      onError: (err) => {
        openNotification(err)
        setIsApproveLoading(false)
        handleClose()
      },
    })
  }, [amountToApprove, amountDeposited])

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value || Number(e.target.value) < 1) setIsAmountValid(false)
      else setIsAmountValid(true)
      setAmountToApprove(e.target.value)
      setWinningOdds(
        getWinningOdds(
          e.target.value,
          Moralis.Units.FromWei(amountDeposited),
          2
        )
      )
    },
    [amountToApprove, amountDeposited]
  )

  return (
    <div>
      <div className="space-y-10">
        <div>
          <div className="flex justify-between">
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Amount
            </label>
            <ERC20Balance address={USDT_ADDRESS} name={USDT_NAME} />
          </div>
          <input
            type="number"
            id="amount"
            className="block w-full rounded-lg border
          p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 
          dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
          dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="1.0"
            value={amountToApprove}
            onChange={handleFormChange}
            min="1"
            required
          />
          {!isAmountValid && (
            <p className="mt-2 flex justify-start text-sm font-medium text-prize-red">
              Minimum deposit is 1 USDT
            </p>
          )}
        </div>

        <button
          className="flex-auto rounded-lg bg-prize-red px-16 py-3 font-semibold text-white shadow-xl"
          onClick={handleApproveClick}
          disabled={isApproveLoading || !isAmountValid}
        >
          {isApproveLoading ? <LoadingOutlined /> : 'Approve Deposit'}
        </button>
        <div>
          <h4>Your winning odds:</h4>
          <p>{winningOdds}%</p>
        </div>
      </div>
    </div>
  )
}

export default ApproveView
