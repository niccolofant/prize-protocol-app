import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Skeleton,
  Statistic,
  Tooltip,
  Typography,
} from 'antd'
import { gql, useQuery } from 'urql'
import { getCompoundApy, getDrawingDate } from '../../utils/functions'
import {
  useWeb3ExecuteFunction,
  useMoralis,
  useMoralisQuery,
  useApiContract,
  useChain,
} from 'react-moralis'
import { c2, n4, n6 } from '../../utils/formatters'
import { Compound, CUSDT, USDT } from '../Images/Images'
import { useCallback, useEffect } from 'react'
import { prizeProtocolABI } from '../../utils/abis/prizeProtocolABI'
import { usdtABI } from '../../utils/abis/usdtABI'
import { cUsdtABI } from '../../utils/abis/cUsdtABI'
import Link from 'next/link'

const query = gql`
  query getLastLottery {
    prizeProtocols(first: 1) {
      name
      address
      drawingPeriod
      minimumDeposit
      token
      tokenName
      tokenSymbol
      cToken
      cTokenName
      cTokenSymbol
      lotteries(orderBy: id, orderDirection: desc, first: 1) {
        id
        state
        startTimestamp
        amountDeposited
        reserve
        prizePool
        players {
          id
        }
      }
    }
  }
`

const LotteryWidget = () => {
  const { Moralis } = useMoralis()
  const [{ fetching, data }] = useQuery({ query })
  const { chainId } = useChain()

  const protocolInfo = data?.prizeProtocols[0]
  const lotteryInfo = protocolInfo?.lotteries[0]

  const {
    runContractFunction,
    data: supplyRate,
    error,
    isLoading,
    isFetching,
  } = useApiContract({
    address: protocolInfo?.cToken,
    functionName: 'supplyRatePerBlock',
    abi: cUsdtABI,
    chain: '0x4',
  })

  console.log(data)

  if (fetching) return <Skeleton />
  return (
    <Card className="rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar.Group>
            <Avatar src={<CUSDT />} />
            <Avatar src={<USDT />} />
          </Avatar.Group>
          <Typography className="text-xl font-semibold text-slate-700">
            Lottery #{lotteryInfo.id}
          </Typography>
          <Badge status="processing" color="green" />
        </div>
      </div>

      <Divider />

      <div className="flex items-center justify-between space-x-10">
        <div className="flex flex-col items-center space-y-2">
          <Typography className="text-slate-500">Prize Pool</Typography>
          <Typography className="text-5xl font-semibold text-slate-800">
            <span className="text-xl font-normal text-slate-500">$ </span>
            {n4.format(parseInt(Moralis.Units.FromWei(lotteryInfo.prizePool)))}
          </Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography className="text-slate-500">Time Left</Typography>
          <Statistic.Countdown
            className="font-medium"
            value={getDrawingDate(
              lotteryInfo.startTimestamp,
              protocolInfo.drawingPeriod
            ).toISOString()}
            format="DD HH mm ss"
          />
        </div>
      </div>

      <Divider />

      <div className="flex items-center justify-between">
        <div className="text-center">
          <Typography className="text-slate-500">Yield protocol</Typography>
          <Avatar src={<Compound />} />
        </div>
        <Link href={`/${protocolInfo.address}/deposit`}>
          <button className="border px-10">Deposit</button>
        </Link>
      </div>
    </Card>
  )
}

export default LotteryWidget
