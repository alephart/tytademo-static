import { useState, useEffect } from 'react';
import Layout from '@/components/layouts/StartPage';
import { Rules } from '@/components/DialogsTyta';
import { VideoBg } from '@/components/Anims';
import Button from '@material-ui/core/Button';
import useTranslation from 'next-translate/useTranslation';
import { useLocation } from '@/components/hooks';
import CookieConsent from '@/components/CookieConsent';
import { geolocationDb } from '@/utils/geolocationDB';
import { useRouter } from 'next/router';
import useSWR from 'swr';

/// ::API::
const fetcher = (url) => fetch(url).then((r) => r.json());

const geoDbKey = process.env.NEXT_PUBLIC_GEODB_API_KEY;

const Home = () => {
  const { t } = useTranslation('common');
  const { data: cookie_consent, error: swr_error } = useSWR('/api/get_cookie', fetcher);
  const { loading, location, error } = useLocation(geolocationDb(geoDbKey));
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [disabledExperience, setDisabledExperience] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [isActive, setActive] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if(!!cookie_consent) {
      setDisabledExperience(!!cookie_consent.TOYOTA_COOKIE_CONSENT ? false : true);
    }
  }, [cookie_consent]);

  useEffect(() => {
    if(disabledExperience) {
      setTimeout(() => {
        setShowCookie(disabledExperience);
      }, 1800);
    }
  }, [disabledExperience]);

  if(loading || !cookie_consent || swr_error) {
    return <><Layout /></>;
  }

  let noAvaliable;

  switch (location) {
    case 'US':
      noAvaliable = false;
      break;
    case 'PR':
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
              {t("start_copyStart")}
              <span>
                {t('start_subCopyStart')} <br/>
                {t('start_subCopyStart2')}
              </span>
            </div>

              <Button
                disabled={disabledExperience}
                id='startExperience'
                onClick={handleAdvance}
                className="buttonStart"
                variant="contained">
                {t('start_buttonStart')}
              </Button>
          
            <div className="copyFooter">
              {t('start_copyFooter1')} {t('start_copyFooter2')} <a id="termsAndConditions" onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">{t('start_copyFooterLink')}</a>
            </div>
            <Rules isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
          </div>
        </div>

        {(disabledExperience && showCookie) && <CookieConsent setDisabledExperience={setDisabledExperience} />}
    </Layout>
  )
}

export default Home;