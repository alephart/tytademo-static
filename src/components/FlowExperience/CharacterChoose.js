import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM } from '@/helpers/globals';
import ExperienceContext from '@/context/ExperienceContext';

const CharacterChoose = () => {
  const { character, setCharacter, setProcess } = useContext(ExperienceContext);
  
  const handleSelectCharacter = (event) => {
    event.preventDefault();
    const dataset = event.currentTarget.dataset;
    setCharacter(dataset.character);
  };

  return (
    <>
      <div className='selectCopy'>ELIGE TU PERSONAJE</div>
      <div
        className={`selectCharacter1 ${character === 'male' ? 'selected' : ''}`}
        data-character='male'
        onClick={handleSelectCharacter}
        >
        <img src='/images/masculino.png' alt='' />
      </div>
      <div
        className={`selectCharacter2 ${character === 'female' ? 'selected' : ''}`}
        data-character='female'
        onClick={handleSelectCharacter}
      >
        <img src='/images/femenino.png' alt='' />
      </div>

      <Button
        disabled={!character}
        className='buttonPhoto'
        variant='contained'
        onClick={() => setProcess(PROCESS_ENUM.photoTake)}
      >
        TOMAR FOTO
      </Button>
    </>
  );
};

export default CharacterChoose;
