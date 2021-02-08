import React from 'react'
import Webcam from 'react-webcam'
import ButtonTake from 'ButtonTake'

const videoConstraints = {
  width: 480,
  height: 640,
  facingMode: "user"
};

const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

  console.log(imgSrc);

  return (
    <>
      <Webcam
        audio={true}
        height={640}
        width={480}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        mirrored
      />

     <ButtonTake capture={capture} />

      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </>
  )
}

export default WebcamCapture