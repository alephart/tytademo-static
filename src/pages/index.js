import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Layout from '@/components/layouts/StartPage';
import { Rules } from '@/components/DialogsTyta';
import { VideoBg } from '@/components/Anims';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { isMobile } from 'react-device-detect';

const Home = () => {
  console.log('isMobile', isMobile);

  const { t } = useTranslation('common');
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isActive, setActive] = useState(false);
  const router = useRouter();

  const handleAdvance = () => {
    setActive(!isActive);
    setTimeout(() => {
      router.push('/experience');
    }, 1200);
  };

  return (
      <Layout>
        <div className={isActive ? 'animationStart': null} dangerouslySetInnerHTML={VideoBg('video', 'video.mp4', false)}></div>
        <div className={isActive ? 'animationStart': null} dangerouslySetInnerHTML={VideoBg('video2', 'videoloop.mp4', true)}></div>
        <div className="degrade"></div>
          <div className={isActive ? 'containerSpecial animationExit': 'containerSpecial'}>
            <div>
              <div className="copyStart ">
                  {t("start.copyStart")}
                  <span>
                    {t('start.subCopyStart')}
                  </span>
              </div>

              <Button onClick={handleAdvance} className="buttonStart" variant="contained">
                {t('start.buttonStart')}
              </Button>
            
              <div className="copyFooter">
                {t('start.copyFooter1')} {t('start.copyFooter2')} <a onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">{t('start.copyFooterLink')}</a>
              </div>
              <Rules dialog='terms' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
            </div>
          </div>
      </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Home;