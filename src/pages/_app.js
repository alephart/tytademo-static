import '@/styles/globals.css'
import '@/styles/general.scss'

import { Provider as SessionProvider } from "next-auth/client"
import { Provider } from '@/context/state'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}
export default MyApp
