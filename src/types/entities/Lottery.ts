import { Deposit, Player, PrizeProtocol, Redeem, Win } from '.'

export interface Lottery {
  id: string
  protocol: PrizeProtocol
  state: string
  startTimestamp: string
  endTimestamp: string | null
  amountDeposited: string
  reserve: string
  prizePool: string
  win: Win | null
  players: Player[]
  deposits: Deposit[]
  redeems: Redeem[]
}
