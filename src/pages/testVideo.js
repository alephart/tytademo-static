import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import ViewVideo from '@/components/TakePhoto/ViewVideo'

export default function testVideo() {

  const swap = {
    "success": true,
    "data": [
        "https://mds-tyta.s3.amazonaws.com/photos/photo-ckn7q22n5000046nx776f4rla.png",
        "https://mds-tyta.s3.amazonaws.com/videos/video-ckn7q22n5000046nx776f4rla_final.mp4",
        "https://mds-tyta.s3.amazonaws.com/videos/59efb3bf-57d6-4d6b-934b-273661278025_up.mp4",
        "https://mds-tyta.s3.amazonaws.com/videos/3fade84b-565d-4901-88e0-50be8078552e.mp4"
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

        <ViewVideo data={swap.data} /> 
      </main>

      <footer className={styles.footer}>
        Copyright Toyota
      </footer>

    </div>
  )
}
