import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layouts/StartPage';
import { Rules } from '@/components/DialogsTyta';
import { VideoBg } from '@/components/Anims';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useLocation } from '@/components/hooks';
import CookieConsent from '@/components/CookieConsent';
import { geolocationDb } from '@/utils/geolocationDB';
//import { getUA } from 'react-device-detect';

const geoDbKey = process.env.NEXT_PUBLIC_GEODB_API_KEY;

const Home = ({TOYOTA_COOKIE_CONSENT}) => {
  const { loading, location, error } = useLocation(geolocationDb(geoDbKey));
  const { t } = useTranslation('common');
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [disabledExperience, setDisabledExperience] = useState(true);
  const [isActive, setActive] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setDisabledExperience(!!TOYOTA_COOKIE_CONSENT ? false : true);

    // if(getUA.includes("Instagram")) {
    //   router.push('/copy-link');
    // }
  }, []);
    
  if(loading) {
    return (<></>);
  }

  let noAvaliable;

  switch (location) {
    case 'US':
      noAvaliable = false;
      break;
    case 'CO':
      noAvaliable = false;
      break;
  
    default:
      noAvaliable = true;
      break;
  }

  if(!!error) noAvaliable = true;

  if(noAvaliable) {
    router.push('/not-available');
  }

  const handleAdvance = () => {
    setActive(!isActive);
    setTimeout(() => {
      router.push('/select-character');
    }, 1200);
  };

  return (
    <Layout>
      <div className={isActive ? 'animationStart positionAbsolute': 'positionAbsolute'} dangerouslySetInnerHTML={VideoBg('video', 'video.mp4', false)}></div>
      <div className={isActive ? 'animationStart positionAbsolute': 'positionAbsolute'} dangerouslySetInnerHTML={VideoBg('video2', 'videoloop.mp4', true)}></div>
      <div className={isActive ? 'degrade animationStart': 'degrade'}></div>
        <div className={isActive ? 'containerSpecial animationExit': 'containerSpecial'}>
          <div>
            <div className="copyStart ">
              {t("start.copyStart")}
              <span>
                {t('start.subCopyStart')} <br/>
                {t('start.subCopyStart2')}
              </span>
            </div>

              <Button
                disabled={disabledExperience}
                id='btndisabledExperience'
                onClick={handleAdvance}
                className="buttonStart"
                variant="contained">
                {t('start.buttonStart')}
              </Button>
          
            <div className="copyFooter">
              {t('start.copyFooter1')} {t('start.copyFooter2')} <a id="termsAndConditions" onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">{t('start.copyFooterLink')}</a>
            </div>
            <Rules dialog='terms' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
          </div>
        </div>

        {!TOYOTA_COOKIE_CONSENT && <CookieConsent setDisabledExperience={setDisabledExperience} />}
    </Layout>
  )
}

// SERVER
export const getServerSideProps = async ({ req, locale }) => {
  return { props: { 
    ...await serverSideTranslations(locale, ['common']),
    TOYOTA_COOKIE_CONSENT: req.cookies.TOYOTA_COOKIE_CONSENT || null,
  }, }
};

export default Home;