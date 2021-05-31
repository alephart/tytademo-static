import '@/styles/globals.css'
import '@/styles/general.scss'
import '@/i18n/index';

import { Provider as SessionProvider } from "next-auth/client"

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
export default MyApp
