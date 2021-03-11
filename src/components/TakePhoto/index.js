import React, { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import ButtonTake from './ButtonTake';
import ViewVideo from './ViewVideo';
import SelectDevice from '@/components/SelectDevice'

const TakePhoto = (props) => {
  const { facingMode, setFacingMode } = props;
  //const { deviceId, groupId } = props.device;

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [takePhoto, setTakePhoto] = useState(false);
  const [confirmTakePhoto, setConfirmTakePhoto] = useState(false);
  const [process, setProcess] = useState(null);

  let constraints = {
    //width: { min: 480, ideal: 1080, max: 1920 },
    //height: { min: 360, ideal: 1440, max: 1440 },
    width: 640,
    height: 480,
    aspectRatio: 1.333333,
    //deviceId: deviceId,
    //groupId: groupId,
    facingMode: facingMode,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setTakePhoto(true);
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    if (confirmTakePhoto) {
      //const formData = new FormData();
      //formData.append('photo', imgSrc);

      fetch('/api/processPhoto', {
        method: 'POST',
        body: imgSrc,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            setProcess(data);
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [confirmTakePhoto]);

  const handleConfirmTakePhoto = (e) => {
    const response = e.target.dataset;
    if (response.confirm === 'true') {
      setConfirmTakePhoto(true);
    } else {
      setTakePhoto(false);
    }
  };

  const handleBackTakePhoto = () => {
    setProcess(null);
    setImgSrc(null);
    setTakePhoto(false);
    setConfirmTakePhoto(false);
  };

  console.log(constraints);

  return (
    <>
      {!takePhoto && (
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
      )}

      {imgSrc && takePhoto && !confirmTakePhoto && (
        <div className='zone-photo'>
          <img src={imgSrc} />
          <div className='buttons'>
            <button
              className='blue'
              data-confirm='true'
              onClick={handleConfirmTakePhoto}
            >
              Yes, continue
            </button>
            <button data-confirm='false' onClick={handleConfirmTakePhoto}>
              Take photo again
            </button>
          </div>
        </div>
      )}

      {confirmTakePhoto && (
        <div className='zone-process'>
          {!process ? (
            <span>Process...</span>
          ) : (
            <div className='oneColunm'>
              <ViewVideo data={process} />
              <a onClick={handleBackTakePhoto}>Back</a>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .buttons {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        button {
          flex: 1;
          display: block;
          background-color: #d5dbdb;
          min-width: 160px;
          min-height: 40px;
          border: none;
          border-radius: 50px;
          text-transform: uppercase;
          margin: 5px;
        }

        .blue {
          background-color: #3498db;
          color: white;
        }

        .oneColunm {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .zone-take-photo,
        .zone-photo,
        .zone-process {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          max-width: 480px;
          margin: 20px auto;
        }

        .zone-take-photo::before {
          content: 'Activating camera...';
          position: absolute;
          color: lightgray;
          z-index: -1;
        }
        /*
        .zone-take-photo::after {
          content: " ";
          position: absolute;
          color: lightgray;
          width: 256px;
          height: 256px;
          z-index: 2;
        }
*/
        .zone-photo img {
          width: 100%;
          height: auto;
        }

        .zone-process {
          color: lightgray;
          background-color: white;
          margin: 0 auto;
          padding: 10px;
          z-index: 1;
        }

        .zone-process a {
          color: #3498db;
          text-decoration: none;
        }
        .zone-process a:hover {
          color: #2980b9;
        }
      `}</style>
    </>
  );
};

export default TakePhoto;
