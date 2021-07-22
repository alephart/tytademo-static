import React, { useEffect, useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router'

const CharacterChoose = () => {
  const { t } = useTranslation('common');
  const { character, setCharacter, setProcess } = useContext(ExperienceContext);
  const [isActive, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('character', character);
  }, [character]);

  const handleSelectCharacter = (event) => {
    event.preventDefault();
    const dataset = event.currentTarget.dataset; 
    setCharacter(dataset.character);
  };

  const handleAdvance = () => {
    setActive(!isActive);
    setTimeout(() => {
      setProcess(PROCESS_ENUM.photoTake);
      router.push('/experience');
    }, 2500);
  };

  return (
      <div className={isActive ? 'active chooseCharacter': 'chooseCharacter'}> 
        <div className={isActive ? 'active selectCopy': 'selectCopy'}>{t("characterChoose_selectCopy")}</div>
        <div className={`BoxchooseCharacter  ${character  ? 'selected' : ''}`}>
          <div
            className={`selectCharacter2  ${character === 'female' ? 'selected' : ''}`}
            data-character='female'
            onClick={handleSelectCharacter}
          >
            <img src='/images/silueta-femenina.png' alt='' />
          </div>
          <div
            className={`selectCharacter1  ${character === 'male' ? 'selected' : ''}`}
            data-character='male'
            onClick={handleSelectCharacter}
            >
            <img src='/images/silueta-masculino.png' alt='' />
          </div>
        </div>
        <Button
            id='takePicture'
            disabled={!character}
            className={isActive ? 'active buttonPhoto': 'buttonPhoto'}
            variant='contained'
            onClick={handleAdvance}
          >
            {t("characterChoose_buttonPhoto")}
        </Button>
      </div>
  );
};

export default CharacterChoose;
