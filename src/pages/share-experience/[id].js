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
    <Layout>
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
  // Fetch data from external API
  //const res = await fetch(`https://.../data`)
  //const data = await res.json()
  //const urlVideo = 'https://mds-tyta.s3.amazonaws.com/videos/video-ckow41n6g0000bdnxgrzb6wsv_final.mp4';

  console.log({params});

  const url = process.env.NEXT_PUBLIC__URL_SITE;

  const data = {
    success: true,
    urlVideo: 'https://mds-tyta.s3.amazonaws.com/videos/video-ckow41n6g0000bdnxgrzb6wsv_final.mp4',
    urlShare: `${url}/share-experience/ckow41n6g0000bdnxgrzb6wsv`,
    urlJoin: `${url}/join-experience/ckow41n6g0000bdnxgrzb6wsv`,
    userId: 'ckow41n6g0000bdnxgrzb6wsv',
  };

  // Pass data to the page via props
  return { props: { 
    ...await serverSideTranslations(locale, ['common']),
    data
  }, }
};

export default ToShareExp;