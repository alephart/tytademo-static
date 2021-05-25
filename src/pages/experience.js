import { useState } from 'react';
import Layout from '@/components/layouts/General';
import { CharacterChoose } from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/utils/globals';

const Experience = () => {
  const [process, setProcess] = useState(PROCESS_ENUM.character);
  const [character, setCharacter] = useState(null);

  return (
    <Layout>
      {process === PROCESS_ENUM.character && (
        <CharacterChoose character={character} setCharacter={setCharacter} setProcess={setProcess} />
      )}


    </Layout>
  )
}

export default Experience;