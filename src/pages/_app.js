import '@/styles/globals.css'
import '@/styles/general.scss'

import { appWithTranslation } from 'next-i18next';

import { Provider as SessionProvider } from "next-auth/client";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp);
