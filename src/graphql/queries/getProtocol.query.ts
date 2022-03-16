import { gql } from 'urql'

export const PROTOCOL_QUERY = gql`
  query getProtocol {
    prizeProtocols(first: 1) {
      id
      address
      name
      owner
      controller
      drawingPeriod
      minimumDeposit
      token
      tokenName
      tokenSymbol
      cToken
      cTokenName
      cTokenSymbol
      nativeToken
      nativeTokenName
      nativeTokenSymbol
      ticket
      ticketName
      ticketSymbol
      amountDeposited
      reserve
      prizePool
      lotteries {
        id
      }
      players {
        id
      }
      wins {
        id
      }
    }
  }
`
