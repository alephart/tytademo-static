import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PROCESS_ENUM } from '@/utils/globals';
import Webcam from 'react-webcam';
import ButtonTake from './ButtonTake';
import ViewVideo from './ViewVideo';
import SelectDevice from '@/components/SelectDevice';

const TakePhoto = (props) => {
  const { facingMode, setFacingMode } = props;
  //const { deviceId, groupId } = props.device;

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [takePhoto, setTakePhoto] = useState(false);
  const [confirmPhoto, setConfirmPhoto] = useState(false);
  const [process, setProcess] = useState(PROCESS_ENUM.take);
  const [swap, setSwap] = useState(null);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');
  const [character, setCharacter] = useState(null);

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

  const sendData = (payload) => {
    fetch('/api/processPhoto', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        // check status 500

        // check success
        if(json.success) {
          setSwap(json.data);

        } else { // not success
          setMessage(json.message);

          if(json.data === undefined) {
            // not faces or more faces then try again
            handleBackTakePhoto();
          }
        }

      })
      .catch((error) => {
        console.error(error);
      });
  }

  const capture = useCallback(() => {
    setMessage('');
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setTakePhoto(true);
  }, [webcamRef, setImgSrc]);

  useEffect(() =>{
    console.log('data:::', data);
  }, [data]);

  useEffect(() => {
    console.log('check confirm photo!!!');

    if (confirmPhoto) {

      const payload = {
        photo: imgSrc,
        process,
        character: character,
        data,
      };

      setMessage('Processing...');
      sendData(payload);
    }
  }, [confirmPhoto]);

  // const handleAlert = () => {

  // };

  const handleSelectCharacter = (event) => {
    event.preventDefault();
    console.log('event', event);
    const dataset = event.currentTarget.dataset;
    setCharacter(dataset.character);
  };

  const handleBackTakePhoto = () => {
    setProcess(PROCESS_ENUM.take);
    setImgSrc(null);
    setTakePhoto(false);
    setConfirmPhoto(false);
  };
  
  const handleConfirmTakePhoto = (event) => {
    event.preventDefault();
    console.log('event', event);
    const dataset = event.currentTarget.dataset;
    const {confirm, face_id} = dataset;

    console.log(dataset);
    console.log({confirm}, {face_id});

    if (confirm === 'true') {
      if(process === PROCESS_ENUM.select) {
        setData({
          ...data,
          faceId: face_id,
        });
      }
      setConfirmPhoto(true);

    } else {
      setMessage('');
      handleBackTakePhoto();
    }
  };
  
  const handleSelectPhoto = (data) => {
    setData(data);
    setFaces(data.faces);
    setProcess(PROCESS_ENUM.select);
    setConfirmPhoto(false);

  };

  console.log(constraints);

  return (
    <>
      {!character && (
        <div className="oneColunm">
          <h3>
            Select character?
          </h3>

          <div className="zone-select">
            <button className="button red" data-character='woman' onClick={handleSelectCharacter}>
              Woman
            </button>
            <button className="button red" data-character='man' onClick={handleSelectCharacter}>
              Man
            </button>
          </div>
        </div>
      )}

      {!takePhoto && character && (
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

      {imgSrc && takePhoto && !confirmPhoto && (
        <div className='zone-photo'>
          <img src={imgSrc} />
        </div>
      )}

      {confirmPhoto && (
        <div className='zone-process'>
          {!swap ? (
            <span>...</span>
          ) : (
            <div className='oneColunm'>
              <ViewVideo data={swap} />
              <button onClick={handleBackTakePhoto}> Back </button>
            </div>
          )}
        </div>
      )}

      {imgSrc && takePhoto && !confirmPhoto && (
        <div className='zone-photo'>
          <div className='buttons'>
            {process !== PROCESS_ENUM.select && (
              <button
                className='button blue'
                data-confirm={true}
                onClick={handleConfirmTakePhoto}
              >
                Yes, continue
              </button>
            )}

            <button className="button" data-confirm={false} onClick={handleConfirmTakePhoto}>
              Take photo again
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className='zone-message'>{message}</div>
      )}

      <style jsx>{`
        .buttons {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .button {
          flex: 1;
          display: block;
          background-color: #d5dbdb;
          min-width: 160px;
          min-height: 40px;
          border: none;
          border-radius: 50px;
          text-transform: uppercase;
          margin: 5px;
          cursor: pointer;
        }

        .blue {
          background-color: #3498db;
          color: white;
        }

        .red {
          background-color: #B9293F;
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

        .zone-select {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .select {
          width: 140px;
          height: 140px;
          border: 2px solid transparent;
          border-radius: 0;
          cursor: pointer;
          background: transparent;
          padding: 2px;
        }

        .select:hover {
          border: 2px solid orange;
        }

        .select img {
          width: 100%; 
          height:auto;
        }
      `}</style>
    </>
  );
};

export default TakePhoto;
