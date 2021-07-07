import { useState, useContext } from 'react';
import DialogTyta from '@/components/DialogsTyta';
import { useTranslation } from 'next-i18next';
import { ExperienceContext } from '@/components/Context';
import Share from '@/components/Share';
import ReactPlayer from 'react-player';

const ShareExperience = () => {
  const { t } = useTranslation('common');
  const { setProcess, swap } = useContext(ExperienceContext);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;

  console.log('swap into ShareExperience', swap);

  return (
    <div className='sharedExperience'>
      <img className='logoToyota' src='/images/logo-toyota.png' alt='' />

      <ReactPlayer
        className="react-player"
        url={swap.urlVideo}
        controls={true}
        playing={true}
        width='100%'
        height='100%'
      />

      <div className='copyThanks'>
        <div className='copyLunay'>{t("shareExperience.copyLunay")}</div>
        <span>
          {t("shareExperience.copyLunaySpan")}
        </span>
      </div>

      <Share url={swap.urlJoin} />

      <a
        className='buttonThanks'
        //download="this-is-my-experience-toyota.mp4"
        href={`${siteURL}/api/download_video?filename=${swap.urlVideo}`}>
          {t("shareExperience.buttonThanks")}
      </a>

      {/* <div className="copyFooter">
          {t('shareExperience.copyFooter1')} <a onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">{t('shareExperience.copyFooterLink')}</a> {t('shareExperience.copyFooter2')}
      </div>
      <DialogTyta dialog='policies' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} /> */}

    </div>
  );
};

export default ShareExperience;