import React from 'react'
import Webcam from 'react-webcam'
import ButtonTake from './ButtonTake'
import ViewPhoto from './ViewPhoto'

const constraints = {
  //width: { min: 480, ideal: 1080, max: 1920 },
  //height: { min: 360, ideal: 1440, max: 1440 },
  width: 640,
  height: 480,
  aspectRatio: 1.333333,
  facingMode: "user"
};

const TakePhoto = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [takePhoto, setTakePhoto] = React.useState(false);
  const [confirmTakePhoto, setConfirmTakePhoto] = React.useState(false);
  const [process, setProcess] = React.useState(null);

  const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot({width: 1920, height: 1440});
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
          console.log(data);
          setTimeout(() => {
            setProcess(data);
          }, 1000);
        })
        .catch(error => {
          console.error(error);
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
      setProcess(null);
      setImgSrc(null);
      setTakePhoto(false);
      setConfirmTakePhoto(false);
    }

  return (
    <>
      {!takePhoto && (
        <div className="zone-take-photo">
          <span>
            <Webcam
              audio={false}
              height='100%'
              width='100%'
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={constraints}
              mirrored
            />
          </span>

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
            <button className="blue" data-confirm="true" onClick={handleConfirmTakePhoto}>Si continuar</button>
            <button data-confirm="false" onClick={handleConfirmTakePhoto}>Volver a tomar</button>
        </div>
      )}

      {confirmTakePhoto && (
        <div className="zone-process">
          {!process ? (
            <span>Procesando...</span>
          ) : (
            <ViewPhoto image={process.photo} />
          )}
          <button onClick={handleReturn}>Volver</button>
        </div>

      )}

      <style jsx>{`
        button {
          display: block;
          background-color: #D5DBDB;
          min-width: 160px;
          min-height: 40px;
          border: none;
          border-radius: 50px;
          text-transform: uppercase;
          margin: 5px;
        }

        .blue {
          background-color: #3498DB;
          color: white;
        }

        .zone-take-photo, .zone-photo, .zone-process {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 480px;
          margin: 0 auto;
        }
  
        .zone-take-photo::before {
          content: "Activando camara...";
          position: absolute;
          color: lightgray;
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
          max-width: 100%;
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
          color: #3498DB;
          text-decoration: none;
        } 
        .zone-process a:hover {
          color: #2980B9;
        } 
      `}</style>
    </>
  )
}

export default TakePhoto