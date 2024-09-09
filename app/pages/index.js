import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReturnCode from '../components/Code/ReturnCode';
import Parameters from '../components/Code/Parameters';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { query } = useRouter();

  useEffect(() => {
    // Verificar se o código atual é diferente do código salvo no localStorage
    if (query.code && localStorage.getItem('savedCode') !== query.code) {
      saveCode(query.code);
    }
  }, [query.code]);

  async function saveCode(code) {
    try {
      const response = await fetch('/api/saveCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      console.log('Code saved successfully:', data);

      // Atualizar o localStorage com o novo código
      localStorage.setItem('savedCode', code);
    } catch (error) {
      console.error('Error saving code:', error);
    }
  }

  const ParametersResult = () => {
    if (query.code) {
      return <ReturnCode />;
    }
    return <Parameters />;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>PimentaGroup Development</title>
        <meta name="description" content="PimentaGroup Internal Development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h4 className={styles.title}>
          <Link href="/">Test Deutschebank - API</Link>
        </h4>
        <small>PimentaGroup - Internal Development</small>
        {ParametersResult()}
      </main>
    </div>
  );
}
