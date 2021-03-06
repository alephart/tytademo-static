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

  const changeCamera = () => {
    //setDeviceId(deviceId);
    //onCamera(device, mode);
    setMode(mode==='user' ? 'environment' : 'user');
  }

  if (cantCameras === 0) return null; // seleccionar archivo

  return (
    <>
      {devices && cantCameras > 0 && (
        <div className="zone-cameras">
          <FlipCamera onClick={changeCamera} />
        </div>
      )}
    </>
  );
};

export default SelectDevice;