import { Lottery, Player, PrizeProtocol } from '.'

export interface Win {
  id: string
  timestamp: string
  winner: Player
  amount: string
  protocol: PrizeProtocol
  lottery: Lottery
}
