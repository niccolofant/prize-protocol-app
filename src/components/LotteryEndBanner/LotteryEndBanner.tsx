import { FunctionComponent } from 'react'

const LotteryEndBanner: FunctionComponent = () => {
  return (
    <div className="rounded-xl border bg-white py-5 px-10">
      <h1>The current lottery has ended!</h1>
      <h3>Check your profile to see if you've won or not! 🎉</h3>
    </div>
  )
}

export default LotteryEndBanner
