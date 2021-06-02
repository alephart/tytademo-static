import { useState, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/layouts/StartPage';
import DialogTyta from '@/components/DialogsTyta';
import { VideoBg } from '@/components/Anims';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '@/components/Context';

const Home = () => {
  const { locale } = useContext(GlobalContext);
  const { t, i18n } = useTranslation();
  i18n.changeLanguage(locale);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <Layout>
      <div dangerouslySetInnerHTML={VideoBg('video', 'video.mp4', false)}></div>
      <div dangerouslySetInnerHTML={VideoBg('video2', 'videoloop.mp4', true)}></div>

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
        {t('start.copyFooter1')} <a onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">{t('start.copyFooterLink')}</a> {t('start.copyFooter2')}
      </div>
      <DialogTyta dialog='terms' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />

    </Layout>
  )
}

export default Home;