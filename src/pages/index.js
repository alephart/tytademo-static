import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layouts/StartPage';
import { Rules } from '@/components/DialogsTyta';
import { VideoBg } from '@/components/Anims';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useLocation } from '@/components/hooks';
import { geolocationDb } from '@/utils/geolocationDB';
import { isMobile } from 'react-device-detect';

const geoDbKey = process.env.NEXT_PUBLIC_GEODB_API_KEY;

const Home = () => {
  const { loading, location, error } = useLocation(geolocationDb(geoDbKey));
  const { t } = useTranslation('common');
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isActive, setActive] = useState(false);
  const router = useRouter();
  
  console.log('isMobile', isMobile);
  
  if(loading) {
    return (<></>);
  }

  console.log(location);

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
                  {t('start.subCopyStart')}
                </span>
            </div>

            <Button id='btnStartExperience' onClick={handleAdvance} className="buttonStart" variant="contained">
              {t('start.buttonStart')}
            </Button>
          
            <div className="copyFooter">
              {t('start.copyFooter1')} {t('start.copyFooter2')} <a href="/landing-tyc" id="termsAndConditions" >{t('start.copyFooterLink')}</a>
            </div>
            <Rules dialog='terms' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
          </div>
        </div>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Home;