import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TakePhoto from '@/components/TakePhoto'
import SelectDevice from '@/components/SelectDevice'

export default function Home() {
  const [device, setDevice] = useState(null);
  const [camName, setCamName] = useState('');
  const [cameraOn, setCameraOn] = useState(false);

  const handleOnCamera = (device, name) => {
    console.log(device, name);
    setCameraOn(!cameraOn);
    setCamName(name);
    setDevice(device);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DeepFake Toyota</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Toyota DeepFake</h1>

        { cameraOn || <SelectDevice onCamera={handleOnCamera} /> }
        { device && <TakePhoto device={device} camName={camName} /> }
      </main>

      <footer className={styles.footer}>
        Copyright Toyota
      </footer>

    </div>
  )
}
