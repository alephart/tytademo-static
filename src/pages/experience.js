import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { useLocation } from '@/components/hooks';
import { geoIP } from '@/utils/geoIP';
import { PROCESS_ENUM } from '@/helpers/globals';
import { 
  PhotoTake,
  PictureConfirm,
  RegisterInfo,
  ShareExperience,
} from '@/components/FlowExperience';
import { TytaProgress } from '@/components/Anims';
import { getUA } from 'react-device-detect';
import CopyLink from '@/components/CopyLink';

const geoIPKey = process.env.NEXT_PUBLIC_GEODB_API_KEY;

const Experience = ({ userEmail }) => {
  const { loading, location, error } = useLocation(geoIP(geoIPKey));
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
      setCharacter(typeCharacter);
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


  if(loading) {
    return <><Layout /></>;
  }

  if(!location || !!error) {
    router.push('/not-available');
  }

  const metaData = {
    pageTitle: 'Experience - Take Photo & Register',
  }

  return (
    <Layout {...metaData}>
      {getUA.includes("Instagram") ? (
        <CopyLink />

      ) : (
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

        </ExperienceContext.Provider>

      )}
      
    </Layout>
  )
}

export const getServerSideProps = async ({ req }) => {
  return { props: { 
    userEmail: await req.cookies.userEmail || null,
  }, }
};

export default Experience;