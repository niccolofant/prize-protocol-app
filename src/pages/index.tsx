import Layout from '../components/Layout/Layout'
import LotteryWidget from '../components/LotteryWidget/LotteryWidget'
import PlayerStats from '../components/PlayerStats/PlayerStats'

const Home = () => {
  return (
    <Layout>
      <div className="flex-col space-y-10">
        <PlayerStats />
        <LotteryWidget />
      </div>
    </Layout>
  )
}

export default Home
