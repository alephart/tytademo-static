import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import Webcam from 'react-webcam';
import ButtonTake from '@/components/ButtonTake';
//import SelectDevice from '@/components/SelectDevice';
import { PROCESS_ENUM, MESSAGE_DIALOG } from '@/helpers/globals';
import { ExperienceContext } from '@/components/Context';
import { Help } from '@/components/DialogsTyta';
import { useTranslation } from 'next-i18next';

const PhotoTake = () => {
  const { t } = useTranslation('common');
  const { facingMode, setFacingMode, setImgSrc, setProcess } = useContext(ExperienceContext);
  const [help, setHelp] = useState(false);
  const webcamRef = useRef(null);

  let constraints = {
    /* info
      width: { min: 480, ideal: 1080, max: 1920 },
      height: { min: 360, ideal: 1440, max: 1440 },
      deviceId: deviceId,
      groupId: groupId, 
    */
    width: 1080,
    height: 1440,
    aspectRatio: 1.333333,
    facingMode: facingMode,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setProcess(PROCESS_ENUM.photoConfirm);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <div className='zoneTakePhoto'>
        <div className="bgFace"></div>
        <Webcam
          audio={false}
          height='100%'
          width='100%'
          ref={webcamRef}
          screenshotFormat='image/png'
          videoConstraints={constraints}
          mirrored={facingMode === 'user' ? true : false}
        />

        <ButtonTake id='btnPhotoTake' onClick={capture} />

        {/* <SelectDevice mode={facingMode} setMode={setFacingMode} /> */}
        <div className="zone-cameras">
          <p>{t("Take.Photo")}</p>
        </div>
      </div>

      <Help id='invalidPhotoTryAgain' isOpen={help} setIsOpen={setHelp} message={MESSAGE_DIALOG.rememberPhoto} />
    </>
  )
}

export default PhotoTake;