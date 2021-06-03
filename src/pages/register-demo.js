import { useState, useEffect, useContext } from 'react';
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { RegisterInfo } from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/helpers/globals';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RegisterDemo = () => {
  const [process, setProcess] = useState(PROCESS_ENUM.register);
  const [progress, setProgress] = useState(0);
  const [character, setCharacter] = useState(null);
  const [data, setData] = useState(null);
  const [swap, setSwap] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    
  }, []);

  const contextValues = {
    process,
    setProcess,
    data,
    character,
    setMessage,
    swap,
    setSwap,
  };

  return (
    <Layout>
      <ExperienceContext.Provider value={contextValues}>
        {process === PROCESS_ENUM.register && (
          <RegisterInfo />
        )}
      </ExperienceContext.Provider>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default RegisterDemo;