import { useState, useEffect, useContext } from 'react';
import Layout from '@/components/layouts/General';
import { useRouter } from 'next/router';
import { ExperienceContext } from '@/components/Context';
import { RegisterInfo } from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/helpers/globals';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RegisterDemo = ({ userEmail }) => {
  console.log(userEmail);
  const [process, setProcess] = useState(PROCESS_ENUM.register);
  const [character, setCharacter] = useState(null);
  const [data, setData] = useState(null);
  const [swap, setSwap] = useState(null);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const locale = router.locale;

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
    locale
  };

  return (
    <Layout>
      <ExperienceContext.Provider value={contextValues}>
        {process === PROCESS_ENUM.register && (
          <RegisterInfo userEmail={userEmail} />
        )}
      </ExperienceContext.Provider>
    </Layout>
  )
}

export const getServerSideProps = async ({ req, locale }) => {
  return { props: { 
    ...await serverSideTranslations(locale, ['common']),
    userEmail: req.cookies.userEmail || null,
  }, }
};

export default RegisterDemo;