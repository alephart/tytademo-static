import { useState } from 'react';
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { PROCESS_ENUM } from '@/helpers/globals';

const ProcessYouVideo = () => {
  const [process, setProcess] = useState(PROCESS_ENUM.waitProcess);

  const contextValues = {
    process, setProcess,
  };

  const metaData = {
    pageTitle: 'Featuring You Lunay X Toyota - Process video',
  };

  return (
    <Layout {...metaData}>
      <ExperienceContext.Provider value={contextValues}>
          <div className="problem">
            <div>
              <h2>stop</h2>
              <p>Your video is being processed and it will be sent to you by email once this process is completed.</p>
            </div>
          </div>
      </ExperienceContext.Provider>
    </Layout>
  )
}

export default ProcessYouVideo;