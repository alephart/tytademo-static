import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layouts/StartPage';
import DialogTyta from '@/components/Dialogs';
import { videoBg } from '@/components/Anims';
import Button from '@material-ui/core/Button';

const Home = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <Layout>
      <div dangerouslySetInnerHTML={videoBg('video', 'video.mp4', false)}></div>
      <div dangerouslySetInnerHTML={videoBg('video2', 'videoloop.mp4', true)}></div>

      <div className="copyStart">
          TÓMATE UNA SELFIE Y SÉ PARTE DEL VIDEO DE LUNAY
          <span>
              Regístrate y podrías ganar una charla virtual con Lunay y más premios increíbles.
          </span>
      </div>

      <Link href="/start/chooseCharacter">
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