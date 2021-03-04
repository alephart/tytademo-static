import {useState, useEffect, useCallback} from 'react';
import FlipCamera from './Icons/FlipCamera';

const SelectDevice = (props) => {
  const { onCamera, mode, setMode } = props;
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
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
  },
  [devices]);

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  const changeCamera = () => {
    console.log({devices});
    console.log({mode});
    //setDeviceId(deviceId);
    //onCamera(device, mode);
    console.log(cantCameras);
    setMode(mode==='user' ? 'environment' : 'user');
  }

  if (cantCameras === 0) return null; // seleccionar archivo
  //if (cantCameras === 1) return null; // directo a la camara

  return (
    <>
      {devices && cantCameras > 1 && (
        <div className="zone-cameras">
          <FlipCamera onClick={changeCamera} />
        </div>
      )}
    </>
  );
};

export default SelectDevice;