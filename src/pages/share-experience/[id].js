import { useState, useEffect, useContext } from 'react';
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { ShareExperience } from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/helpers/globals';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ToShareExp = ({data}) => {
  const [process, setProcess] = useState(PROCESS_ENUM.share);
  const [swap, setSwap] = useState(data);

  useEffect(() => {
    if (process !== PROCESS_ENUM.share) {
      // return to correct process
      console.log(process);
      //setProcess(PROCESS_ENUM.share);
    }
  }, []);

  const contextValues = {
    process, setProcess,
    swap, setSwap,
  };

  return (
    <Layout className="especial">
      <ExperienceContext.Provider value={contextValues}>
        {process === PROCESS_ENUM.share && (
          <ShareExperience />
        )}
      </ExperienceContext.Provider>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { params, locale } = context;
  const urlAdmin = process.env.NEXT_PUBLIC_TYTA_API;
  const urlSite = process.env.NEXT_PUBLIC_URL_SITE;

  // Fetch data from external API
  const res = await fetch(`${urlAdmin}/participant/${params.id}`);
  const json = await res.json();
  console.log(json);

  const pathLocale = locale === 'es' ? '/es/' : '/';
  const data = {
    success: true,
    urlVideo: json.url_video,
    urlShare: `${urlSite}${pathLocale}share-experience/${params.id}`,
    urlJoin: `${urlSite}${pathLocale}join-experience/${params.id}`,
    userId: params.id,
  };

  // Pass data to the page via props
  return { props: { 
    ...await serverSideTranslations(locale, ['common']),
    data
  }, }
};

export default ToShareExp;