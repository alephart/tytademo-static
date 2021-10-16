import '@/styles/globals.css'
import '@/styles/general.css'

//import { useEffect } from 'react';
//import TagManager from 'react-gtm-module';

const MyApp = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   TagManager.initialize({ gtmId: 'GTM-5H22NDS' });
  // }, []);

  return <Component {...pageProps} />
}

export default MyApp;