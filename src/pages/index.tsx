import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { createClient, gql } from 'urql'
import { PROTOCOL_QUERY } from '../graphql/queries/getProtocol.query'
import { PrizeProtocol } from '../types'

const Home: NextPage<PrizeProtocol> = ({ id }) => {
  return (
    <div>
      <h1>{JSON.stringify(id)}</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const THE_GRAPH_QUERY_URL = process.env.NEXT_PUBLIC_THE_GRAPH_QUERY_URL

  const client = createClient({
    url: THE_GRAPH_QUERY_URL!,
  })

  const res = await client.query(PROTOCOL_QUERY).toPromise()

  return {
    props: {
      ...res.data.prizeProtocols[0],
    },
  }
}

export default Home
