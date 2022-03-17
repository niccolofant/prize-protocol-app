import { Lottery, Player, Win } from '.'

export interface PrizeProtocol {
  id: string
  address: string
  name: string
  owner: string
  controller: string
  drawingPeriod: string
  minimumDeposit: string
  token: string
  tokenName: string
  tokenSymbol: string
  cToken: string
  cTokenName: string
  cTokenSymbol: string
  nativeToken: string
  nativeTokenName: string
  nativeTokenSymbol: string
  ticket: string
  ticketName: string
  ticketSymbol: string
  amountDeposited: string
  reserve: string
  prizePool: string
  lotteries: Lottery[]
  players: Player[]
  wins: Win[]
}
