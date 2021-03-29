import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import ViewVideo from '@/components/TakePhoto/ViewVideo'

export default function testVideo() {

  const data = {
    response: "success", 
    footage: [
      "https://mds-tyta.s3.amazonaws.com/photos/photo-000y7nxdzhj0ee7.png",
      "https://mds-tyta.s3.amazonaws.com/videos/video-000y7nxdzhj0ee7_final.mp4",
      "https://mds-tyta.s3.amazonaws.com/videos/ba030a6a-735d-45ef-a246-1f8562be8b73_up.mp4",
      "https://mds-tyta.s3.amazonaws.com/videos/79a27f84-3dbe-47f6-98c9-19db52057960.mp4"
    ]
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
