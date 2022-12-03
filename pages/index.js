import Head from 'next/head'
import { useRouter } from 'next/router';
import ReturnCode from '../components/Code/ReturnCode';
import Parameters from '../components/Code/Parameters';
import styles from '../styles/Home.module.css'

export default function Home() {

  const { query } = useRouter();

  const ParametersResult = () => {
    if (query.code) {
      return <ReturnCode />
    }
    return <Parameters />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>PimentaGroup Development</title>
        <meta name="description" content="PimentaGroup Internal Development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h4 className={styles.title}><a href="\">Test Deutschebank - API</a></h4>
        <small>PimentaGroup - Internal Development</small>
        {ParametersResult()}
      </main >

    </div>
  )
}
