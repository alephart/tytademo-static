import { useTranslation } from 'next-i18next';
import { isAndroid } from 'react-device-detect';

const Layout = ({ children, ...props }) => {
  const { className = null } = props;
  const { t } = useTranslation('common');

  return (
    <>
      <div className={`container ${className && className} ${isAndroid ? 'android' : ''}`}>
        {children}
        {/* aqui va version desktop */}
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
