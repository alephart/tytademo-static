import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layouts/StartPage';
import DialogTyta from '@/components/DialogsTyta';
import { VideoBg } from '@/components/Anims';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next'
import '../i18n'

const Home = () => {
  const { t } = useTranslation();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <Layout>
      <div dangerouslySetInnerHTML={VideoBg('video', 'video.mp4', false)}></div>
      <div dangerouslySetInnerHTML={VideoBg('video2', 'videoloop.mp4', true)}></div>

      <div className="copyStart">
          {t('start.copyStart')}
          <span>
              Regístrate y podrías ganar una charla virtual con Lunay y más premios increíbles.
          </span>
      </div>

      <Link href="/experience">
          <Button className="buttonStart" variant="contained">comenzar</Button>
      </Link>

      <div className="copyFooter">
          Haz <a onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">click aquí</a> para ver las reglas y condiciones.
      </div>
      <DialogTyta dialog='terms' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />

    </Layout>
  )
}

export default Home;