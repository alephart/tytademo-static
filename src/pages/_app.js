import '@/styles/globals.css'
import '@/styles/general.scss'

import { appWithTranslation } from 'next-i18next';

import { Provider as SessionProvider } from "next-auth/client";
import { useMediaQuery } from 'react-responsive';

const MyApp = ({ Component, pageProps }) => {
  const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <div className={isLandscape ? 'landscape' : 'portrait'}>
        <div className="notAvailable">
            <div className="boxItemsNotAvailable">
                <div className="copyNotAvailable">
                    <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                    <h2>
                      gira tu celular para seguir con la experiencia
                    </h2>
                </div>
            </div>
        </div>
      </div>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp);
