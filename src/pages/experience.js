import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Layout from '@/components/layouts/General';
import ExperienceContext from '@/context/ExperienceContext';
import { useLocation } from '@/components/hooks';
import { geolocationDb } from '@/utils/geolocationDB';
import { PROCESS_ENUM } from '@/helpers/globals';
import { 
  CharacterChoose, 
  PhotoTake, 
  PictureConfirm,
  RegisterInfo,
  ShareExperience,
} from '@/components/FlowExperience';

const ENV = 'development';
const mockDetector = () => 'US';
const geoDbKey = process.env.NEXT_PUBLIC_GEODB_API_KEY;

const Experience = () => {
  const { loading, location, error } = useLocation( 
    ENV !== 'development' ? geolocationDb(geoDbKey) : mockDetector
  );

  const [process, setProcess] = useState(PROCESS_ENUM.character);
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
  };

  useEffect(() => {
    if(process === PROCESS_ENUM.share) {
      router.push('/to-share-experience');
    }
  }, [process])

  if(loading) {
    return (<div>loading...</div>);
  }
  
  if(error) {
    return (<div>No se pudo detectar ubicación: {error.toString()}</div>);
  }
  
  if(location !== 'US') {
    router.push('/not-available');
  }
  
  console.log('location', location);
  console.log('Actual process', process);

  return (
    <Layout>
      <ExperienceContext.Provider value={contextValues}>
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
          <RegisterInfo />
        )}

        {message && (
          <div className='zoneMessage'><p>{message}</p></div>
        )}
      </ExperienceContext.Provider>

      

    </Layout>
  )
}

export default Experience;