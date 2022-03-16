import '../assets/styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import type { AppProps } from 'next/app'

const MORALIS_APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID
const MORALIS_SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL

console.log(MORALIS_APP_ID)

const App = ({ Component, pageProps }: AppProps) => {
  const isServerInfo = MORALIS_APP_ID && MORALIS_SERVER_URL ? true : false

  if (!MORALIS_APP_ID || !MORALIS_SERVER_URL)
    throw new Error(
      'Missing Moralis Application ID or Server URL. Make sure to set your .env file.'
    )
  if (isServerInfo)
    return (
      <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
        <Component {...pageProps} />
      </MoralisProvider>
    )
}

export default App
