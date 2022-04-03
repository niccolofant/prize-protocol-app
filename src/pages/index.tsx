import { useCallback, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Layout from '../components/Layout/Layout'
import LotteryEndBanner from '../components/LotteryEndBanner/LotteryEndBanner'
import LotteryWidget from '../components/LotteryWidget/LotteryWidget'
import PlayerStats from '../components/PlayerStats/PlayerStats'

const Home = () => {
  const [isLotteryFinished, setIsLotteryFinished] = useState(false)
  const { account } = useMoralis()

  const handleLotteryEnd = useCallback(() => {
    setIsLotteryFinished(true)
  }, [])

  return (
    <Layout>
      <div className="flex-col space-y-10">
        {isLotteryFinished && <LotteryEndBanner />}
        {account && <PlayerStats account={account} />}
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-semibold text-prize-dark-gray dark:text-white md:text-4xl">
              Lotteries
            </h1>
            <h3 className="text-prize-light-gray">
              Choose a lottery and try your luck! 🎰
            </h3>
          </div>
          <LotteryWidget onLotteryEnd={handleLotteryEnd} />
        </div>
      </div>
    </Layout>
  )
}

export default Home
