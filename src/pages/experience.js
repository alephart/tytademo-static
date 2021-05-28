import { useState } from 'react';
import Layout from '@/components/layouts/General';
import { 
  CharacterChoose, 
  PhotoTake, 
  PictureConfirm,
  RegisterInfo,
  ShareExperience,
} from '@/components/FlowExperience';
import ExperienceContext from '@/context/ExperienceContext';
import { PROCESS_ENUM } from '@/utils/globals';

const Experience = () => {
  const [process, setProcess] = useState(PROCESS_ENUM.character);
  const [character, setCharacter] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [imgSrc, setImgSrc] = useState(null);
  
  const contextValues = {
    process,
    setProcess,
    character, 
    setCharacter, 
    facingMode, 
    setFacingMode,
    imgSrc, 
    setImgSrc,
  };
  
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

        {process === PROCESS_ENUM.share && (
          <ShareExperience setProcess={setProcess} />
          )}
      </ExperienceContext.Provider>
    </Layout>
  )
}

export default Experience;