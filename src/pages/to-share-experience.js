import { useState, useEffect, useContext } from 'react';
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { ShareExperience } from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/helpers/globals';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ToShareExp = () => {
  const [process, setProcess] = useState(PROCESS_ENUM.share);

  useEffect(() => {
    if (process !== PROCESS_ENUM.share) {
      // return to correct process
      console.log(process);
      //setProcess(PROCESS_ENUM.share);
    }
  }, []);

  const contextValues = {
    process,
    setProcess,
  };

  return (
    <Layout>
      <ExperienceContext.Provider value={contextValues}>
        {process === PROCESS_ENUM.share && (
          <ShareExperience setProcess={setProcess} />
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

export default ToShareExp;