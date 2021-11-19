import { sql_query } from '../../lib/db';

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
    pageTitle: 'Featuring You Lunay X Toyota - Share Experience',
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
  const urlSite = process.env.NEXT_PUBLIC_URL_SITE;

  const result = await sql_query(`
    SELECT url_video FROM participants
    WHERE participant_id = '${params.id}';
  `);

  const participant = JSON.parse(JSON.stringify(result));

  console.log('participant', participant);

  const urlVideo = participant.length > 0
    ? participant[0].url_video
    : 'https://mds-tyta.s3.amazonaws.com/videos/video-58349558309583490503_final.mp4';

  const pathLocale = locale === 'es' ? '/es/' : '/';
  const data = {
    success: true,
    urlVideo,
    urlShare: `${urlSite}${pathLocale}share-experience/${params.id}`,
    urlJoin: `${urlSite}${pathLocale}join-experience/${params.id}`,
  };

  // Pass data to the page via props
  return { props: { 
    data
  }, }
};

export default ToShareExp;