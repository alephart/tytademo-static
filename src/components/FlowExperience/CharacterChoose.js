import React, { useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import { useTranslation } from 'next-i18next';
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, x: 200, y: 40 }}
      animate={{ opacity: 1, x: 0, y: 40 }}
      exit={{ opacity: 0, x: -200, y: 40 }}
      transition={{ duration: 0.7 }}
    >
      <div className="chooseCharacter"> 
        <div className="BoxchooseCharacter">
          <div className='selectCopy'>{t("characterChoose.selectCopy")}</div>
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
          

          <Button
            disabled={!character}
            className='buttonPhoto'
            variant='contained'
            onClick={() => setProcess(PROCESS_ENUM.photoTake)}
          >
            {t("characterChooses.buttonPhoto")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterChoose;
