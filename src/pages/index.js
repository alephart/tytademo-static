import { useState, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/layouts/StartPage';
import { Rules } from '@/components/DialogsTyta';
import { VideoBg } from '@/components/Anims';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { isMobile } from 'react-device-detect';

const Home = () => {
  const { t } = useTranslation('common');
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  console.log('isMobile', isMobile);

  return (
    <Layout>
      <div dangerouslySetInnerHTML={VideoBg('video', 'video.mp4', false)}></div>
      <div dangerouslySetInnerHTML={VideoBg('video2', 'videoloop.mp4', true)}></div>
      <div className="degrade"></div>
      <div className="copyStart">
          {t("start.copyStart")}
          <span>
            {t('start.subCopyStart')}
          </span>
      </div>

      <Link href="/experience">
          <Button className="buttonStart" variant="contained">{t('start.buttonStart')}</Button>
      </Link>

      <div className="copyFooter">
        {t('start.copyFooter1')} {t('start.copyFooter2')} <a onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">{t('start.copyFooterLink')}</a>
      </div>
      <Rules dialog='terms' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />

    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Home;