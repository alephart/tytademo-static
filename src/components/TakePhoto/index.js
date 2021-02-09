import React from 'react'
import Webcam from 'react-webcam'
import ButtonTake from './ButtonTake'

const videoConstraints = {
  width: 480,
  height: 640,
  facingMode: "user"
};

const TakePhoto = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [takePhoto, setTakePhoto] = React.useState(false);
  const [confirmTakePhoto, setConfirmTakePhoto] = React.useState(false);

  const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setTakePhoto(true);

    }, [webcamRef, setImgSrc]);

    React.useEffect(() => {
      if(confirmTakePhoto) {
        //const formData = new FormData();
        //formData.append('photo', imgSrc);
  
        fetch('/api/savePhoto', {
          method: 'POST',
          body: imgSrc
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error(error)
        });
      }
    }, [confirmTakePhoto]);

    const handleConfirmTakePhoto = (e) => {
      const response = e.target.dataset;
      if(response.confirm === 'true') {
        setConfirmTakePhoto(true);
      } else {
        setTakePhoto(false);
      }
    }

    const handleReturn = () => {
      setImgSrc(null);
      setTakePhoto(false);
      setConfirmTakePhoto(false);
    }

  return (
    <>
      {!takePhoto && (
        <div className="zone-take-photo">
          <Webcam
            audio={true}
            height={640}
            width={480}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            mirrored
          />

          <ButtonTake onClick={capture} />
        </div>
      )}

      {(imgSrc && takePhoto && !confirmTakePhoto) && (
        <div className="zone-photo">
          <div>
            <img
              src={imgSrc}
              />
          </div>
            <button data-confirm="true" onClick={handleConfirmTakePhoto}>Si continuar</button>
            <button data-confirm="false" onClick={handleConfirmTakePhoto}>Volver a tomar</button>
        </div>
      )}

      {confirmTakePhoto && (
        <div className="zone-process">
          Procesando...
          <button onClick={handleReturn}>Volver</button>
        </div>

      )}

      <style jsx>{`
        button {
          display: block;
        }

        .zone-take-photo, .zone-photo, .zone-process {
          position: relative;
          width: 480px;
          margin: 0 auto;
        }

        .zone-take-photo::before {
          content: "Activando camara...";
          position: absolute;
          left: 100px;
          top: 300px;
          color: lightgray;
        }

        .zone-process {
          color: lightgray;
          width: 480px;
          height: 240px;
          background-color: white;
          margin: 0 auto;
          padding-left: 200px;
          padding-top: 120px;
          z-index: 1;
        }
      `}</style>
    </>
  )
}

export default TakePhoto