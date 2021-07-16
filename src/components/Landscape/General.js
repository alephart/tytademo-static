import { useTranslation } from 'next-i18next';

const LandscapeGeneral = () => {
  const { t } = useTranslation('common');
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;
  return (
    <div className='landscape'>
      <div className='notAvailable'>
        <div className='boxItemsNotAvailable'>
          <div className='copyNotAvailable'>
            <img
              className='logoToyota desktop'
              src='/images/logo-toyota.png'
              alt=''
            />
            <hr className='desktop' />
            <img
              className='rotate mobile'
              src='/images/RotatedYourPhone.png'
              alt=''
            />
            <h2 className='desktop'>{t('desktop')}</h2>
            <p className='desktop'>{t('desktop.QR')}</p>
            <img className='QR desktop' src='/images/DesktopHome.png' alt='' />
            <a className='desktop' href={siteURL}>
              lunayxtoyota.com
            </a>
            <h2 className='mobile'>{t('landscape')}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandscapeGeneral;