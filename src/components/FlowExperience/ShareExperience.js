import { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { ExperienceContext } from '@/components/Context';
import Share from '@/components/Share';
import ReactPlayer from 'react-player';
import { isMobile } from 'react-device-detect';

const ShareExperience = () => {
  const { t } = useTranslation('common');
  const { setProcess, swap } = useContext(ExperienceContext);
  const [download, setDownload] = useState(false);
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;

  useEffect(() => {
    localStorage.setItem('character', null);
  }, []);
  
  return (
    <>
    <div className='sharedExperience'>
      <img className='logoToyota gif' src='/images/giflogo.gif' alt='lunayxtoyota.com' />

      <ReactPlayer
        className="react-player"
        url={swap.urlVideo}
        controls={true}
        playing={isMobile ? true : false}
        width='100%'
        height='100%'
      />
      

      <div className='copyThanks'>
        <div className='copyLunay'>{t("shareExperience.copyLunay")}</div>
        <span>
          {t("shareExperience.copyLunaySpan")}
        </span>
      </div>

      <Share url={swap.urlJoin} setShare={setDownload} />

      {download && (
        <a
          id='downloadVideoExperience'
          className='buttonThanks'
          href={`${siteURL}/api/download_video?filename=${swap.urlVideo}`}>
            {t("shareExperience.buttonThanks")}
        </a>
      )}
      <div className='copyThanks'>
        <span>
        {t("shareExperience.legal")}{' '}<a href={t("registerInfo.link")} target="_blank">{t("registerInfo.linkLegal")}</a>{' '}{t("shareExperience.legal2")}
        </span>
      </div>
    </div>
    <div className="indexDesktop">
        <div className="boxItemsDesktop">
            <div className="videoDesktop">
                <ReactPlayer
                    className="react-player"
                    url={swap.urlVideo}
                    controls={true}
                    playing={isMobile ? false : true}
                    width='100%'
                    height='100%'
                />
            </div>
            <div className="copydesktop">
                <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                <h2>
                  {t("shareExperience.copyLunay")}
                </h2>
                <p>
                  {t("shareExperience.copyLunaySpan")}
                </p>
                <a
                  id='downloadVideoDesktop'
                  className='buttonThanks'
                  href={`${siteURL}/api/download_video?filename=${swap.urlVideo}`}>
                    {t("shareExperience.buttonThanks")}
                </a>
            </div>
        </div>
    </div>
    </>
  );
};

export default ShareExperience;
