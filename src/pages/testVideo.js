import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import ViewVideo from '@/components/TakePhoto/ViewVideo'

export default function testVideo() {
  const data = {
    response: "success", 
    photo: "https://mds-tyta.s3.amazonaws.com/photos/photo-000a7nxcsglcmq4.png", 
    video: "/videos/528825497"
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>DeepFake Toyota</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Test preview video</h1>

        <ViewVideo data={data} /> 
      </main>

      <footer className={styles.footer}>
        Copyright Toyota
      </footer>

    </div>
  )
}
