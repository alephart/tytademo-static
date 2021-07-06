import React, { useEffect, useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import { useTranslation } from 'next-i18next';

const CharacterChoose = () => {
  const { t } = useTranslation('common');
  const { character, setCharacter, setProcess, setMessage } = useContext(ExperienceContext);
  const [isActive, setActive] = useState(false);

  useEffect(() =>{
    setMessage('');
  }, []);

  const handleSelectCharacter = (event) => {
    event.preventDefault();
    const dataset = event.currentTarget.dataset; 
    setCharacter(dataset.character);
  };

  const handleAdvance = () => {
    setActive(!isActive);
    setTimeout(() => {
      setProcess(PROCESS_ENUM.photoTake);
    }, 2500);
  };


  return (
      <div className={isActive ? 'active chooseCharacter': 'chooseCharacter'}> 
        <div className={isActive ? 'active selectCopy': 'selectCopy'}>{t("characterChoose.selectCopy")}</div>
        <div className="BoxchooseCharacter">
          <div
            className={`selectCharacter2 normal ${character === 'female' ? 'selected' : ''}`}
            data-character='female'
            onClick={handleSelectCharacter}
          >
            <img src='/images/silueta-femenina.png' alt='' />
          </div>
          <div
            className={`selectCharacter1 normal ${character === 'male' ? 'selected' : ''}`}
            data-character='male'
            onClick={handleSelectCharacter}
            >
            <img src='/images/silueta-masculino.png' alt='' />
          </div>
        </div>
        <Button
            disabled={!character}
            className={isActive ? 'active buttonPhoto': 'buttonPhoto'}
            variant='contained'
            onClick={handleAdvance}
          >
            {t("characterChooses.buttonPhoto")}
        </Button>
      </div>
  );
};

export default CharacterChoose;
