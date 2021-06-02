import '@/styles/globals.css'
import '@/styles/general.scss'
import '@/i18n/index';
import ConfigContext from '@/components/Context/GlobalContext';
import { Provider as SessionProvider } from "next-auth/client";

import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const { locale } = router;
  
  const values = {
    locale,
  }
  return (
    <ConfigContext.Provider value={values}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ConfigContext.Provider>
  )
}
export default MyApp;
