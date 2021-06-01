import { useState, useEffect, useContext } from 'react';
import Layout from '@/components/layouts/General';
import ExperienceContext from '@/context/ExperienceContext';
import { ShareExperience } from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/helpers/globals';

const ToShareExp = () => {
  const { process, setProcess } = useContext(ExperienceContext);
  //const [process, setProcess] = useState(PROCESS_ENUM.share);
  console.log('page: to-share: actual process', process);

  useEffect(() => {
    if (process !== PROCESS_ENUM.share) {
      // return to correct process
      console.log(process);
    }
  }, []);

  return (
    <Layout>
      <ExperienceContext.Provider>
        {process === PROCESS_ENUM.share && (
          <ShareExperience setProcess={setProcess} />
        )}
      </ExperienceContext.Provider>
    </Layout>
  )
}

export default ToShareExp;