import { useEffect, useContext } from 'react';
import Layout from '@/components/layouts/General';
import { GlobalContext, ExperienceContext } from '@/components/Context';
import { ShareExperience } from '@/components/FlowExperience';
import { PROCESS_ENUM } from '@/helpers/globals';

const ToShareExp = () => {
  const { process, setProcess } = useContext(ExperienceContext);

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