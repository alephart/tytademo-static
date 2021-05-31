import React from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';

const NotAvailable = () => {
  const { t } = useTranslation();
  return (
    <div className='notAvailable'>
      <div className='boxItemsNotAvailable'>
        <div className='copyNotAvailable'>
          <img className='logoToyota' src='/images/logo-toyota.png' alt='' />
          <h2>{t("notAvailable.copyNotAvailable")}</h2>
          <p>
            {t("notAvailable.copyNotAvailableParagrah")}:{' '}
            <a href='https://www.toyota.com/corolla/'>www.toyota.com/corolla</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotAvailable;
