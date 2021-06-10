import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { useLocation } from '@/components/hooks';
import { geolocationDb } from '@/utils/geolocationDB';
import { isMobile } from 'react-device-detect';
import { PROCESS_ENUM } from '@/helpers/globals';
import { 
  CharacterChoose,
  PhotoTake,
  PictureConfirm,
  RegisterInfo,
  ShareExperience,
} from '@/components/FlowExperience';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TytaProgress } from '@/components/Anims';
import { Loading } from '@/components/Anims';

const mockDetector = () => 'US';
const ENV = process.env.NODE_ENV;
const geoDbKey = process.env.NEXT_PUBLIC_GEODB_API_KEY;

const Experience = ({ userEmail }) => {
  const { loading, location, error } = useLocation(
    ENV !== 'development' ? geolocationDb(geoDbKey) : mockDetector
  );

  const [process, setProcess] = useState(PROCESS_ENUM.character);
  const [progress, setProgress] = useState(0);
  const [character, setCharacter] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [imgSrc, setImgSrc] = useState(null);
  const [data, setData] = useState(null);
  const [swap, setSwap] = useState(null);

  const [message, setMessage] = useState('');

  const router = useRouter();
  
  const contextValues = {
    process,
    setProcess,
    character, 
    setCharacter, 
    facingMode, 
    setFacingMode,
    imgSrc, 
    setImgSrc,
    data,
    setData,
    swap,
    setSwap,
    setMessage,
    progress,
    setProgress,
  };

  useEffect(() => {
    switch (process) {
      case PROCESS_ENUM.character:
        setProgress(20);
        break;
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
        setProgress(10);
        break;
    }
    //if(process === PROCESS_ENUM.share) {
      //router.push('/to-share-experience');
    //}
  }, [process]);

  // if(!isMobile) {
  //   router.push('/toyota-experience');
  // }

  if(loading) {
    return (<Loading />);
  }
  
  if(location !== 'US' || error) {
    router.push('/not-available');
  }
  
  return (
    <Layout>
      <ExperienceContext.Provider value={contextValues}>

        <TytaProgress progress={progress}/>

        {process === PROCESS_ENUM.character && (
          <CharacterChoose />
        )}

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

        {message && (
          <div className='zoneMessage'><p>{message}</p></div>
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