import React, { useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import { useTranslation } from 'next-i18next';

const CharacterChoose = () => {
  const { t } = useTranslation('common');
  const { character, setCharacter, setProcess, setMessage } = useContext(ExperienceContext);
  
  useEffect(() =>{
    setMessage('');
  }, []);

  const handleSelectCharacter = (event) => {
    event.preventDefault();
    const dataset = event.currentTarget.dataset;
    setCharacter(dataset.character);
  };

  return (
    <>
      <div className='selectCopy'>{t("characterChoose.selectCopy")}</div>
      <div
        className={`selectCharacter1 ${character === 'male' ? 'selected' : ''}`}
        data-character='male'
        onClick={handleSelectCharacter}
        >
        <img src='/images/silueta-masculino.png' alt='' />
      </div>
      <div
        className={`selectCharacter2 ${character === 'female' ? 'selected' : ''}`}
        data-character='female'
        onClick={handleSelectCharacter}
      >
        <img src='/images/silueta-femenina.png' alt='' />
      </div>

      <Button
        disabled={!character}
        className='buttonPhoto'
        variant='contained'
        onClick={() => setProcess(PROCESS_ENUM.photoTake)}
      >
        {t("characterChoose.selectCopy")}
      </Button>
    </>
  );
};

export default CharacterChoose;
