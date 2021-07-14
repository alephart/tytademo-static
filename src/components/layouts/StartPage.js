import SEO from '../SEO';
import { useTranslation } from 'next-i18next';

const Layout = ({ children }) => {
  const { t } = useTranslation('common');
  
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;

  const metaData = {
    siteURL,
    pageTitle: t("meta.tags.title"),
    description: t("meta.tags.description"),
    currentURL: siteURL,
    previewImage: `${siteURL}/toyota-lunay-feature-you.png`,
    siteName: t("meta.tags.title"),
    videoPath: `${siteURL}/videos/featureYouToyota.mp4`,
  };

  return (
    <>
      <SEO {...metaData} />
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
    </>
  )
};

export default Layout;