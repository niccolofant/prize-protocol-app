import { FunctionComponent, useEffect } from 'react'
import { useCountdown } from '../../hooks/useCountdown'

export interface CountdownProps {
  targetDate: Date
  onTargetReached?: () => void
}

export interface DateTimeDisplayProps {
  value: number
  type?: string
  isDanger?: boolean
}

export interface ShowCounterProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const Countdown: FunctionComponent<CountdownProps> = ({
  targetDate,
  onTargetReached,
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  useEffect(() => {
    if (days + hours + minutes + seconds <= 0 && onTargetReached)
      onTargetReached()
  }, [days, hours, minutes, seconds])

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    )
  }
}

export default Countdown

export const ShowCounter: FunctionComponent<ShowCounterProps> = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  return (
    <div className="flex items-center justify-center tracking-widest">
      <DateTimeDisplay value={days} type={'Day'} />
      <p className="text-prize-light-gray">:</p>
      <DateTimeDisplay value={hours} type={'Hr'} />
      <p className="text-prize-light-gray">:</p>
      <DateTimeDisplay value={minutes} type={'Min'} />
      <p className="text-prize-light-gray">:</p>
      <DateTimeDisplay value={seconds} type={'Sec'} />
    </div>
  )
}

export const ExpiredNotice: FunctionComponent = () => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-medium text-prize-dark-gray">
        Awarding winner! 🎉
      </h3>
      <p className="text-sm text-prize-light-gray">
        Check your profile to see if you've won or not!
      </p>
    </div>
  )
}

export const DateTimeDisplay: FunctionComponent<DateTimeDisplayProps> = ({
  value,
}) => {
  return <p className="text-2xl font-medium text-prize-dark-gray">{value}</p>
}
