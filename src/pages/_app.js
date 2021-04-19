import '../styles/globals.css'
import '../styles/general.scss'

import { Provider } from "next-auth/client"

function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
