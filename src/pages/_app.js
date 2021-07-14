import '@/styles/globals.css'
import '@/styles/general.scss'

import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { Provider as SessionProvider } from "next-auth/client";
//import TagManager from 'react-gtm-module';

const MyApp = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   TagManager.initialize({ gtmId: 'GTM-5H22NDS' });
  // }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp);
