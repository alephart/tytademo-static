import React from 'react'
import Webcam from "react-webcam";

const videoConstraints = {
  width: 480,
  height: 640,
  facingMode: "user"
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

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

        <div className="container-circles">
          <div className="outer-circle">
            <div className="inner-circle" onClick={capture}></div>
          </div>
        </div>

        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}

        <style jsx>{`
          .container-circles {
            position: absolute;
            left: 50%;
            bottom: 20px;
            cursor: pointer;
          }

          .outer-circle {
            position: absolute;
            left: -37px;

            height: 75px;
            width: 75px;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            z-index: 1;
          }

          .inner-circle {
            position: absolute;
            left: 50%;
            top: 38px;
            height: 44px;
            width: 44px;
            background: white;
            border-radius: 50%;
            /*
            Offset the position correctly with
            minus half of the width and minus half of the height
            */
            margin: -22px 0px 0px -22px;

            /*
              On the top of outer-circle
            */
            z-index: 2;
          }

          .inner-circle.is-clicked, 
          .inner-circle:hover {
            height: 38px;
            width: 38px;
            margin: -19px 0px 0px -19px;
          }
      `}</style>
      </>
    )
}

export default WebcamCapture