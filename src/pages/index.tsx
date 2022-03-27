import { useCallback, useState } from 'react'
import Layout from '../components/Layout/Layout'
import LotteryEndBanner from '../components/LotteryEndBanner/LotteryEndBanner'
import LotteryWidget from '../components/LotteryWidget/LotteryWidget'
import PlayerStats from '../components/PlayerStats/PlayerStats'

const Home = () => {
  const [isLotteryFinshed, setIsLotteryFinished] = useState(false)

  const handleLotteryEnd = useCallback(() => {
    setIsLotteryFinished(true)
  }, [])

  return (
    <Layout>
      <div className="flex-col space-y-10">
        {isLotteryFinshed && <LotteryEndBanner />}
        <PlayerStats />
        <LotteryWidget onLotteryEnd={handleLotteryEnd} />
      </div>
    </Layout>
  )
}

export default Home
