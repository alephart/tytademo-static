import { useState } from 'react';
import Layout from '@/components/layouts/General';
import { ExperienceContext } from '@/components/Context';
import { PROCESS_ENUM } from '@/helpers/globals';
import useTranslation from 'next-translate/useTranslation';

const ProcessYouVideo = () => {
  const [process, setProcess] = useState(PROCESS_ENUM.waitProcess);
  const { t } = useTranslation('common');

  const contextValues = {
    process, setProcess,
  };

  const metaData = {
    pageTitle: `${t("meta_tags_title")} - Process video`,
  };

  return (
    <Layout {...metaData}>
      <ExperienceContext.Provider value={contextValues}>
          <div className="problem">
            <div>
              <h2>{t("stop")}</h2>
              <p>{t("stop_Texts")}</p>
            </div>
          </div>
      </ExperienceContext.Provider>
    </Layout>
  )
}

export default ProcessYouVideo;