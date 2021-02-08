import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TakePhoto from '@/components/TakePhoto'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DeepFake Toyota</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Toyota DeepFake</h1>

        <TakePhoto />

      </main>

      <footer className={styles.footer}>
        Copyright Toyota
      </footer>

    </div>
  )
}
