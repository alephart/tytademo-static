import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import { useTranslation } from 'next-i18next';
import { Help } from '@/components/DialogsTyta';
import { Loading } from '@/components/Anims';

const PictureConfirm = () => {
  const { t } = useTranslation('common');
  const { imgSrc, character, setData, process, setProcess, setMessage } = useContext(ExperienceContext);
  const [isLoading, setIsLoading] = useState(false);
  const [deepFake, setDeepFake] = useState(true);
  const [help, setHelp] = useState(false);

  useEffect(() =>{
    setMessage('');
  }, []);

  const sendPicture = async (payload) => {
    await fetch('/api/photo_valid', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);

        // check status 500
        //console.log(json);
        
        if(json.success) {
          setData(json.data);
          setIsLoading(false);
          setProcess(PROCESS_ENUM.register);
      
        } else { // not success
          console.log(json.message);
          setMessage(json.message);
          
          setDeepFake(json.success);

          //continue by now
          setProcess(PROCESS_ENUM.register);

          // if(!json.deepFake){
          //   setDeepFake(false);

      
          // } else if(!json.data) {
          //   // not faces or many faces then try again
          //   // Show message and button to go again.
          //   setDeepFake(false);
          // }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        <div className='copyLike'>{t("pictureConfirm.copyLike")}</div>
        {!isLoading ? (
          <>
          {deepFake && (
            <Button
              className='yesContinue'
              variant='contained'
              onClick={handlePhotoValid}
            >
              {t("pictureConfirm.yesContinue")}
            </Button>
          )}

            <Button
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
      <Help isOpen={help} setIsOpen={setHelp} />
    </>
  );
};

export default PictureConfirm;
