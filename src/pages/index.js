import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TakePhoto from '@/components/TakePhoto'
import SelectDevice from '@/components/SelectDevice'

export default function Home() {
  const [facingMode, setFacingMode] = useState('user');
  const [cameraOn, setCameraOn] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>DeepFake Toyota</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Toyota DeepFake</h1>

        <TakePhoto facingMode={facingMode} />
        <SelectDevice mode={facingMode} setMode={setFacingMode} />
      </main>

      <footer className={styles.footer}>
        Copyright Toyota
      </footer>

    </div>
  )
}
