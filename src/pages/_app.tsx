import 'antd/dist/antd.css'
import '../assets/styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import type { AppProps } from 'next/app'
import { createClient, Provider } from 'urql'
import Layout from '../components/Layout/Layout'

const MORALIS_APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID
const MORALIS_SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
const THE_GRAPH_QUERY_URL = process.env.NEXT_PUBLIC_THE_GRAPH_QUERY_URL

const client = createClient({
  url: THE_GRAPH_QUERY_URL!,
})

const App = ({ Component, pageProps }: AppProps) => {
  const isServerInfo = MORALIS_APP_ID && MORALIS_SERVER_URL ? true : false

  if (!MORALIS_APP_ID || !MORALIS_SERVER_URL)
    throw new Error(
      'Missing Moralis Application ID or Server URL. Make sure to set your .env file.'
    )
  if (isServerInfo)
    return (
      <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
        <Provider value={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </MoralisProvider>
    )
}

export default App
