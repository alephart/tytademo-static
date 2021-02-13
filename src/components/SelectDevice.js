
import {useState, useEffect, useCallback} from 'react';
import Webcam from 'react-webcam'

const SelectDevice = () => {
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);

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
      if (devices.length > 0) {
        console.log(devices);
      }
    },
    [devices]);



  return (
    <>
      {devices.map((device, key) => (
          <div key={key}>
            <div>
              {device.deviceId} - {device.label || `Device ${key + 1}`}
            </div>
          </div>
        ))}
    </>
  );
};

export default SelectDevice;