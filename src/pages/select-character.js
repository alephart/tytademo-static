import { useState, useEffect } from 'react';
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { useLocation } from '@/components/hooks';
import { geolocationDb } from '@/utils/geolocationDB';
import { PROCESS_ENUM } from '@/helpers/globals';
import { CharacterChoose } from '@/components/FlowExperience';
import { TytaProgress } from '@/components/Anims';
import { getUA } from 'react-device-detect';
import CopyLink from '@/components/CopyLink';
import { useRouter } from 'next/router';

const geoDbKey = process.env.NEXT_PUBLIC_GEODB_API_KEY;

const SelectCharacter = () => {
  const { loading, location, error } = useLocation(geolocationDb(geoDbKey));
  const [process, setProcess] = useState(PROCESS_ENUM.character);
  const [progress, setProgress] = useState(0);
  const [character, setCharacter] = useState(null);

  const router = useRouter();
  const locale = router.locale;

  const contextValues = {
    process, setProcess,
    character, setCharacter,
    progress, setProgress,
    locale,
  };

  useEffect(() => {
    switch (process) {
      case PROCESS_ENUM.character:
        setProgress(20);
        break;
      default:
        setProgress(0);
        break;
    }
  }, [process]);

  if(loading) {
    return <><Layout /></>;
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

  const metaData = {
    pageTitle: 'Experience - Select Character'
  };

  return (
    <Layout {...metaData}>
      {getUA.includes("Instagram") ? (
        <CopyLink />

      ) : (
        <ExperienceContext.Provider value={contextValues}>

          <TytaProgress progress={progress}/>

          {process === PROCESS_ENUM.character && (
            <CharacterChoose />
          )}

        </ExperienceContext.Provider>
      )}

    </Layout>
  )
}

export default SelectCharacter;