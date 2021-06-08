import Meta from './Meta';
import { isAndroid } from 'react-device-detect';
import { useTranslation } from 'next-i18next';

const Layout = ({ children }) => {
  const { t } = useTranslation('common');
  const meta = {
    pageTitle: 'Featuring You Lunay X Toyota',
    description: '',
    currentURL: 'https://tytademo.devmds.com/',
    previewImage: 'feature-you-toyota-lunay.png',
    siteName: 'Toyota Featuring You',
    videoName: 'featureYouToyota.mp4',
  };
  return (
    <>
      <Meta meta={meta} />
      <div className={`container ${isAndroid ? 'android' : ''}`}>
        {children}
        {/* aqui va version desktop */}
        <div className='landscape'>
            <div className="notAvailable">
                <div className="boxItemsNotAvailable">
                    <div className="copyNotAvailable">
                        <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                        <h2 className="desktop">
                          {t("desktop")}
                        </h2>
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
