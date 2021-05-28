import React, { useCallback, useRef, useContext } from 'react';
import Webcam from 'react-webcam';
import ButtonTake from '@/components/TakePhoto/ButtonTake';
import SelectDevice from '@/components/SelectDevice';
import { PROCESS_ENUM } from '@/helpers/globals';
import ExperienceContext from '@/context/ExperienceContext';

const PhotoTake = () => {
  const { facingMode, setFacingMode, setImgSrc, setProcess } = useContext(ExperienceContext);

  const webcamRef = useRef(null);

  let constraints = {
    //width: { min: 480, ideal: 1080, max: 1920 },
    //height: { min: 360, ideal: 1440, max: 1440 },
    //deviceId: deviceId,
    //groupId: groupId,
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
    <div className='zone-take-photo'>
    <Webcam
      audio={false}
      height='100%'
      width='100%'
      ref={webcamRef}
      screenshotFormat='image/png'
      videoConstraints={constraints}
      mirrored={facingMode === 'user' ? true : false}
    />

    <ButtonTake onClick={capture} />

    <SelectDevice mode={facingMode} setMode={setFacingMode} />

  </div>
  )
}

export default PhotoTake;