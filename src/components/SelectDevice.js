
import {useState, useEffect, useCallback} from 'react';

const SelectDevice = (props) => {
  const { onCamera } = props;
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [cantCameras, setCantCameras] = useState(0);

  const handleDevices = useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]);

  useEffect(() => {
    setCantCameras(devices.length);
    console.log(devices);

    // if (devices.length > 0) {
    //   // de momento para capturar cadena en label. 
    //   // Esto puede sobrar si no se utiliza esta cadena
    //   const devicesTemp = devices.map((device, idx, arr) => {
    //     const image = device.label.trim().split(' ').splice(-1)[0];
    //     arr = {
    //       deviceId: device.deviceId,
    //       groupId: device.groupId,
    //       kind: device.groupId,
    //       label: device.label, 
    //       image
    //     };
    //     return arr;
    //   });
      
    //   setCameras(devicesTemp);
    // }
  },
  [devices]);

  const handleCantCameras = (e, device) => {
    setDeviceId(deviceId);
    onCamera(device);
    console.log(cantCameras);
  }

  if (cantCameras === 0) return null; // seleccionar archivo
  //if (cantCameras === 1) return null; // directo a la camara

  return (
    <>
      {devices && (
        <div className="zone-cameras">
          <p>Selecciona tu camara:</p>

          <div className="selection">
            {devices.map((device, key) => {
              const image = key === 0 ? '/images/camera-front.png' : '/images/camera-back.png';
              return (
                <div className="btn" key={key} onClick={(e) => handleCantCameras(e, device)}>
                  <img src={image} width="60" alt={device.label} />
                  <p>{key === 0 ? 'Front' : 'Back'}</p>
                </div>
              )}
              )}
          </div>

        </div>
      )}
      <style>{`
        .zone-cameras {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .selection {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .btn {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default SelectDevice;