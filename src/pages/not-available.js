import Layout from '@/components/layouts/General';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NotAvailable = () => {
  const { t } = useTranslation('common');
  return (
    <div className='landscape not'>
      <div className="notAvailable">
          <div className="boxItemsNotAvailable">
              <div className="copyNotAvailable">
                  <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                  <h2 className="desktopNot">
                    {t("notAvailable.copyNotAvailable")}
                  </h2>
                  <h2 className="mobile">
                    {t("notAvailable.copyNotAvailable")}
                  </h2>
                  <p>
                    {t("notAvailable.copyNotAvailableParagrah")}:{' '}
                    <a href={t("notAvailable.href")}>{t("notAvailable.link")}</a>
                  </p>
              </div>
          </div>
      </div>
  </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default NotAvailable;
