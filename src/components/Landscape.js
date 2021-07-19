import useTranslation from 'next-translate/useTranslation';

const Landscape = () => {
  const { t } = useTranslation('common');
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;
  return (
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
                    {t("desktop_QR")}
                    </p>
                    <img className="QR desktop" src="/images/DesktopHome2.png" alt=""/>
                    <a className="desktop" href={siteURL}>lunayxtoyota.com</a>
                    <h2 className="mobile">
                      {t("landscape")}
                    </h2>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Landscape;