import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM } from '@/helpers/globals';
import ExperienceContext from '@/context/ExperienceContext';

const PictureConfirm = () => {
  const { imgSrc, setProcess } = useContext(ExperienceContext);
  return (
    <div className='likePicture'>
      <div className='boxPhoto'>
        <img src={imgSrc} />
      </div>
      <div className='paddingCanvas' />
      <div className='bgdegrade' />
      <div
        className='boxIframe'
        dangerouslySetInnerHTML={{
          __html: "<iframe src='/face/new-vectors.html' />",
        }}
      />
      <div className='copyLike'>¿TE GUSTA ESTA FOTO?</div>
      <Button 
        className='yesContinue'
        variant='contained'
        onClick={() => setProcess(PROCESS_ENUM.register)}
      >
        ¡SÍ!
      </Button>
      <Button 
        className='againPhoto' 
        variant='contained'
        onClick={() => setProcess(PROCESS_ENUM.character)}
      >
        VOLVER A TOMAR
      </Button>
    </div>
  );
};

export default PictureConfirm;
