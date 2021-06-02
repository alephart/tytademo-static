import { useState, useContext } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import DialogTyta from '@/components/DialogsTyta';
import { useTranslation } from 'react-i18next';
import { GlobalContext, ExperienceContext } from '@/components/Context';

const ShareExperience = () => {
  const { locale } = useContext(GlobalContext);
  const { t, i18n } = useTranslation();
  i18n.changeLanguage(locale);
  const { setProcess, swap } = useContext(ExperienceContext);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  console.log('swap into ShareExperience', swap);

  return (
    <div className='sharedExperience'>
      <img className='logoToyota' src='/images/logo-toyota.png' alt='' />
      <div
        dangerouslySetInnerHTML={{
          __html: `
                <video class="videoGeneral" controls="" playsinline="" id="">
                    <source
                        src="/videos/output1.mp4"
                        type="video/mp4"
                    />
                </video>`,
        }}
      ></div>
      <div className='copyThanks'>
        <br />
        <div className='copyLunay'>{t("shareExperience.copyLunay")}</div>
        <span>
          {t("shareExperience.copyLunaySpan")}
        </span>
      </div>
      <div className='sharedSocial'>
        {t("shareExperience.sharedSocial")} <br />
        <div className='iconSocial'>
          <a href=''>
            <img src='/images/twitter.svg' alt='' />
          </a>
          <a href=''>
            <img src='/images/facebook.svg' alt='' />
          </a>
        </div>
      </div>
      <a
        className='buttonThanks'
        download="this-is-my-experience-toyota.mp4"
        href="https://mds-tyta.s3.amazonaws.com/videos/video-ckow41n6g0000bdnxgrzb6wsv_final.mp4">
          {t("shareExperience.buttonThanks")}
      </a>

      <div className="copyFooter">
          {t('shareExperience.copyFooter1')} <a onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">{t('shareExperience.copyFooterLink')}</a> {t('shareExperience.copyFooter2')}
      </div>
      <DialogTyta dialog='policies' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />

    </div>
  );
};

export default ShareExperience;
