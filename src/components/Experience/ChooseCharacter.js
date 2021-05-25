import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const ChooseCharacter = () => {
  const [character, setCharacter] = useState(undefined);

  const handleSelectCharacter = (character) => {
    setCharacter(character);
  };

  return (
    <>
      <div className='selectCopy'>ELIGE TU PERSONAJE</div>
      <div
        className={`selectCharacter1 ${character === 'male' ? 'selected' : ''}`}
        onClick={() => handleSelectCharacter('male')}
      >
        <img src='/images/masculino.png' alt='' />
      </div>
      <div
        className={`selectCharacter2 ${character === 'female' ? 'selected' : ''}`}
        onClick={() => handleSelectCharacter('female')}
      >
        <img src='/images/femenino.png' alt='' />
      </div>
      <Link href='/start/likePicture'>
        <Button
          disabled={!character}
          className='buttonPhoto'
          variant='contained'
        >
          TOMAR FOTO
        </Button>
      </Link>
    </>
  );
};

export default ChooseCharacter;
