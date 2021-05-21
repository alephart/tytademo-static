import React, { useState } from 'react'
import Head from 'next/head'
import { signIn, signOut, useSession } from "next-auth/client"
import styles from '../styles/Home.module.scss'
import TakePhoto from '@/components/TakePhoto'

export default function Home() {
  const [session, loading] = useSession();
  const [facingMode, setFacingMode] = useState('user');

  if (loading) {
    return <p style={{color: '#000' }}>Loading...</p>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DeepFake Toyota</title>
      </Head>

      <header>
        <h1>Toyota DeepFake</h1>
        {session && (
          <>
            Signed in as {session.user.name}  <button onClick={signOut}>Sign out</button>
          </>
        )}
        {!session && (
          <>
            <button onClick={signIn}>Sign in Toyota Experience DEMO</button>
          </>
        )}
      </header>

      <main className={styles.main}>
        {session && (
          <>
            <TakePhoto facingMode={facingMode} setFacingMode={setFacingMode} />
          </>
        )}

      </main>
      <footer className={styles.footer}>
        Copyright Toyota
      </footer>
    </div>
  )
}
