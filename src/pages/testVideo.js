import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import ViewVideo from '@/components/TakePhoto/ViewVideo'

export default function testVideo() {

  const data = {
    response: "success", 
    footage: [
      'https://mds-tyta.s3.amazonaws.com/photos/photo-000qqnx5p1z80b9.png',
      'https://mds-tyta.s3.amazonaws.com/videos/video-000qqnx5p1z80b9.mp4',
      'https://mds-tyta.s3.amazonaws.com/videos/abaf3f2f-a70a-483b-93d2-0f05c647be91.mp4',
      'https://mds-tyta.s3.amazonaws.com/videos/b0270c1d-6956-4c9f-bc63-8cffae39429e.mp4',
      'https://mds-tyta.s3.amazonaws.com/videos/5bb1354d-bbf1-4c24-a07e-c88683d49d80.mp4'
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
