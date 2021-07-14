import Meta from './Meta';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const Layout = ({ children, ...props }) => {
  const { t } = useTranslation('common');
  return (
    <div>
      <Head>
      {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentURL} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={previewImage} />
        <meta property="og:locale" content="en" />
        <meta property="og:locale:alternate" content="es" />
      </Head>
      <div className="startPage">
        {children}
        <div className='landscape'>
            <div className="notAvailable">
                <div className="boxItemsNotAvailable">
                    <div className="copyNotAvailable">
                        <img className="logoToyota desktop" src="/images/logo-toyota.png" alt=""/>
                        <hr className="desktop"/>
                        <img className="rotate mobile" src="/images/RotatedYourPhone.png" alt=""/>
                        <h2 className="desktop">
                          {t("desktop")}
                        </h2>
                        <p className="desktop">
                        {t("desktop.QR")}
                        </p>
                        <img className="QR desktop" src="/images/DesktopHome.png" alt=""/>
                        <a className="desktop" href="https://lunayxtoyota.com">lunayxtoyota.com</a>
                        <h2 className="mobile">
                          {t("landscape")}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
};

export default Layout;