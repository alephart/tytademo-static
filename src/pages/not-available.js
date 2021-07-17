import Layout from '@/components/layouts/General';
import useTranslation from 'next-translate/useTranslation';

const NotAvailable = () => {
  const { t } = useTranslation('common');
  return (
    <div className='landscape not'>
      <div className="notAvailable">
          <div className="boxItemsNotAvailable">
              <div className="copyNotAvailable">
                  <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                  <h2 className="desktopNot">
                    {t("notAvailable_copyNotAvailable")}
                  </h2>
                  <h2 className="mobile">
                    {t("notAvailable_copyNotAvailable")}
                  </h2>
                  <p>
                    {t("notAvailable_copyNotAvailableParagrah")}:{' '}
                    <a href={t("notAvailable_href")}>{t("notAvailable_link")}</a>
                  </p>
              </div>
          </div>
      </div>
  </div>
  );
};

export default NotAvailable;
