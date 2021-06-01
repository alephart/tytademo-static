import { useState, useContext } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import DialogTyta from '@/components/DialogsTyta';
import { useTranslation } from 'react-i18next';
import ExperienceContext from '@/context/ExperienceContext';

const ShareExperience = () => {
  const { t } = useTranslation();
  const { setProcess } = useContext(ExperienceContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

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
      <Link href='/friends-video'>
        <Button className='buttonThanks' variant='contained'>
          {t("shareExperience.buttonThanks")}
        </Button>
      </Link>

      <div className="copyFooter">
          {t('shareExperience.copyFooter1')} <a onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">{t('shareExperience.copyFooterLink')}</a> {t('shareExperience.copyFooter2')}
      </div>
      <DialogTyta dialog='policies' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />

    </div>
  );
};

export default ShareExperience;
