import { Lottery, PrizeProtocol } from '.'

export interface Redeem {
  id: string
  timestamp: string
  protocol: PrizeProtocol
  lottery: Lottery
  from: string
  amount: string
}
