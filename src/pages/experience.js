import { useState } from 'react';
import Layout from '@/components/layouts/General';
import { 
  CharacterChoose, 
  PhotoTake, 
  ConfirmPicture,
} from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/utils/globals';

const Experience = () => {
  const [process, setProcess] = useState(PROCESS_ENUM.character);
  const [character, setCharacter] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [imgSrc, setImgSrc] = useState(null);

  console.log('Actual process', process);

  return (
    <Layout>
      {process === PROCESS_ENUM.character && (
        <CharacterChoose character={character} setCharacter={setCharacter} setProcess={setProcess} />
      )}

      {process === PROCESS_ENUM.photoTake && (
        <PhotoTake
          facingMode={facingMode}
          setFacingMode={setFacingMode}
          setImg={setImgSrc}
          setProcess={setProcess} />
      )}

      {imgSrc && process === PROCESS_ENUM.photoConfirm && (
        <ConfirmPicture imgSrc={imgSrc} setProcess={setProcess} />
      )}
    </Layout>
  )
}

export default Experience;