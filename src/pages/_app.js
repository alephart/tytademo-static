import '@/styles/globals.css'
import '@/styles/general.scss'

import { Provider as SessionProvider } from "next-auth/client"
import TytaProvider from '@/context/state'


const MyApp = ({ Component, pageProps }) => {
  return (
    <TytaProvider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </TytaProvider>
  )
}
export default MyApp
