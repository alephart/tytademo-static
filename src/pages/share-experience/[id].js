import { useState } from 'react';
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { ShareExperience } from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/helpers/globals';

const ToShareExp = ({data}) => {
  const [process, setProcess] = useState(PROCESS_ENUM.share);
  const [swap, setSwap] = useState(data);

  const contextValues = {
    process, setProcess,
    swap, setSwap,
  };

  const metaData = {
    pageTitle: 'Share Experience',
    videoPath: data.urlVideo,
    currentURL: data.urlShare,
  };

  return (
    <Layout className="especial" {...metaData}>
      <ExperienceContext.Provider value={contextValues}>
        {process === PROCESS_ENUM.share && (
          <ShareExperience />
        )}
      </ExperienceContext.Provider>
    </Layout>
  )
}

// ::SERVER::
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
  };

  // Pass data to the page via props
  return { props: { 
    data
  }, }
};

export default ToShareExp;