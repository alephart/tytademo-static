import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM, MESSAGE_DIALOG } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import { Help } from '@/components/DialogsTyta';
import { Loading } from '@/components/Anims';
import { isIOS, mobileVendor, mobileModel } from 'react-device-detect';

const PictureConfirm = () => {
  const { imgSrc, character, setData, process, setProcess } = useContext(ExperienceContext);
  const [isLoading, setIsLoading] = useState(false);
  const [deepFake, setDeepFake] = useState(true);
  const [help, setHelp] = useState(false);

  const motorola = mobileVendor.toLowerCase() === 'motorola' && mobileModel.toLowerCase() === 'one vision';
  
  const sendPicture = async (payload) => {
    try {
      // const response = await fetch('/api/photo_valid', {
      //   method: 'POST',
      //   body: JSON.stringify(payload),
      // });
  
      // const json = await response.json();
  
      const json = {
        success: true,
        data: { 
        userId: '421b47ffd946ca083b65cd668c6b17e6',
        faceId: 'd5ca322453f2986b752e58b11af83d96',
        nameFilePhoto: 'image.png',
        pathFinalPhoto: 'path/image.png',
        character,
      }};

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
        <div className='copyLike'>{!isLoading ? 'DO YOU LIKE THIS PHOTO?' : ' '}</div>
        {!isLoading ? (
          <>
            {deepFake && (
              <Button
                id='likePhoto'
                className='yesContinue'
                variant='contained'
                onClick={handlePhotoValid}
              >
              YES!
              </Button>
            )}

            <Button
              id='btnBackPhoto'
              className='againPhoto' 
              variant='contained'
              onClick={() => setProcess(PROCESS_ENUM.photoTake)}
            >
              TRY AGAIN
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
