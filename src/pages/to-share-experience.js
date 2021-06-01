import { useState, useEffect } from 'react';
import Layout from '@/components/layouts/General';
import { ShareExperience } from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/helpers/globals';

const ToShareExp = () => {
  const [process, setProcess] = useState(PROCESS_ENUM.share);
  console.log('page: to-share: actual process', process);

  useEffect(() => {
    if (process !== PROCESS_ENUM.share) {
      // return to correct process
      console.log(process);
    }
  }, []);

  return (
    <Layout>
      {process === PROCESS_ENUM.share && (
        <ShareExperience setProcess={setProcess} />
      )}

    </Layout>
  )
}

export default ToShareExp;