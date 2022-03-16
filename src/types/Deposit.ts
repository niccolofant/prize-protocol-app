export interface Deposit {
  id: string
  timestamp: string
  protocol: PrizeProtocol
  lottery: Lottery
  from: string
  amount: string
}
