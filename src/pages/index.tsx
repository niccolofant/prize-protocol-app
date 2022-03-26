import LotteryWidget from '../components/LotteryWidget/LotteryWidget'
import PlayerStats from '../components/PlayerStats/PlayerStats'

const Home = () => {
  return (
    <div className="flex-col space-y-10">
      <PlayerStats />
      <LotteryWidget />
      <LotteryWidget />
    </div>
  )
}

export default Home
