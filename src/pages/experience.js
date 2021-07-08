import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { useLocation } from '@/components/hooks';
import { geolocationDb } from '@/utils/geolocationDB';
import { PROCESS_ENUM } from '@/helpers/globals';
import { 
  PhotoTake,
  PictureConfirm,
  RegisterInfo,
  ShareExperience,
} from '@/components/FlowExperience';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TytaProgress } from '@/components/Anims';

const geoDbKey = process.env.NEXT_PUBLIC_GEODB_API_KEY;

const Experience = ({ userEmail }) => {
  const { loading, location, error } = useLocation(geolocationDb(geoDbKey));
  const [process, setProcess] = useState(null);
  const [progress, setProgress] = useState(0);
  const [character, setCharacter] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [imgSrc, setImgSrc] = useState(null);
  const [data, setData] = useState(null);
  const [swap, setSwap] = useState(null);

  const router = useRouter();
  const locale = router.locale;

  const contextValues = {
    process, setProcess,
    character, setCharacter, 
    facingMode, setFacingMode,
    imgSrc, setImgSrc,
    data, setData,
    swap, setSwap,
    progress, setProgress,
    locale,
  };

  useEffect(() => {
    const typeCharacter = localStorage.getItem('character');

    if(typeCharacter === undefined || typeCharacter === 'null') {
      router.push('/select-character');
    } else {
      setCharacter(localStorage.getItem('character'));
      setProcess(PROCESS_ENUM.photoTake);
    }
  }, []);

  useEffect(() => {
    switch (process) {
      case PROCESS_ENUM.photoTake:
        setProgress(40);
        break;
      case PROCESS_ENUM.photoConfirm:
        setProgress(60);
        break;
      case PROCESS_ENUM.register:
        setProgress(80);
        break;
      case PROCESS_ENUM.share:
        setProgress(100);
        break;
        
      default:
        setProgress(20);
        break;
    }
  }, [process]);
  
  // useEffect(() => {
  //   if(!isMobile) {
  //     router.push('/toyota-experience');
  //   }
  // }, []);

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

  return (
    <Layout>
      <ExperienceContext.Provider value={contextValues}>

        <TytaProgress progress={progress}/>

        {process === PROCESS_ENUM.photoTake && (
          <PhotoTake />
        )}

        {imgSrc && process === PROCESS_ENUM.photoConfirm && (
          <PictureConfirm />
        )}

        {process === PROCESS_ENUM.register && (
          <RegisterInfo userEmail={userEmail} />
        )}

        {process === PROCESS_ENUM.share && (
          <ShareExperience />
        )}

      </ExperienceContext.Provider>

    </Layout>
  )
}

export const getServerSideProps = async ({ req, locale }) => {
  return { props: { 
    ...await serverSideTranslations(locale, ['common']),
    userEmail: req.cookies.userEmail || null,
  }, }
};

export default Experience;