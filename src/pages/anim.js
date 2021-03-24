import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import You from '@/components/You';

const Anim = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DeepFake Toyota</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="box">
          <You />
        </div>
      </main>

      <footer className={styles.footer}>
        Copyright Toyota
      </footer>
      <style jsx>{`
        .box {
          width: 295px;
          height: 100vh;
          background: url(images/test.png) no-repeat;

        }
      `}</style>
    </div>
  )
}

export default Anim;