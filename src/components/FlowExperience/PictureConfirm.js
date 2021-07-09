import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM, MESSAGE_DIALOG } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import { useTranslation } from 'next-i18next';
import { Help } from '@/components/DialogsTyta';
import { Loading } from '@/components/Anims';
import { isIOS, mobileVendor, mobileModel } from 'react-device-detect';

const PictureConfirm = () => {
  console.log('mobileVendor', mobileVendor);
  console.log('mobileModel', mobileModel);
  const { t } = useTranslation('common');
  const { imgSrc, character, setData, process, setProcess } = useContext(ExperienceContext);
  const [isLoading, setIsLoading] = useState(false);
  const [deepFake, setDeepFake] = useState(true);
  const [help, setHelp] = useState(false);

  const motorola = mobileVendor.toLowerCase() === 'motorola' && mobileModel.toLowerCase() === 'one vision';
  console.log('motorola', motorola);

  const sendPicture = async (payload) => {
    try {
      const response = await fetch('/api/photo_valid', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
  
      const json = await response.json();
  
      if(json.success) {
        setIsLoading(false);
        setData(json.data);
        setProcess(PROCESS_ENUM.register);
        
      } else { // not success
        setIsLoading(false);
        setHelp(true);
        
        setDeepFake(json.success);
      }      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(!deepFake && !help) {
      setProcess(PROCESS_ENUM.photoTake);
    }
  }, [deepFake, help]);

  const handlePhotoValid = () => {
    setIsLoading(true);

    const payload = {
      photo: imgSrc,
      process,
      character,
    };

    sendPicture(payload);
  };

  return (
    <>
      <div className='likePicture'>
        <div className={isIOS ? 'ios boxPhoto' : motorola ? 'motorola boxPhoto': 'boxPhoto'}>
          <img src={imgSrc} />
        </div>
        <div className='paddingCanvas' /> 
        <div className='bgdegrade' />
        <div
          className='boxIframe'
          dangerouslySetInnerHTML={{
            __html: "<div class='bgPhotoDegrade'></div><div class='boxAnimation'><iframe src='/face/new-vectors.html' /></div>",
          }}
        />
        <div className='copyLike'>{!isLoading ? t("pictureConfirm.copyLike") : ' '}</div>
        {!isLoading ? (
          <>
            {deepFake && (
              <Button
                id='btnLikePhoto'
                className='yesContinue'
                variant='contained'
                onClick={handlePhotoValid}
              >
                {t("pictureConfirm.yesContinue")}
              </Button>
            )}

            <Button
              id='btnBackPhoto'
              className='againPhoto' 
              variant='contained'
              onClick={() => setProcess(PROCESS_ENUM.photoTake)}
            >
              {t("pictureConfirm.againPhoto")}
            </Button>
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Help id='invalidPhotoTryAgain' isOpen={help} setIsOpen={setHelp} message={MESSAGE_DIALOG.rememberPhoto} />
    </>
  );
};

export default PictureConfirm;
