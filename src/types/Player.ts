export interface Player {
  id: string
  address: string
  balance: string
  protocol: PrizeProtocol
  lottery: Lottery
  deposits: Deposit[]
  redeems?: Redeem[]
}
