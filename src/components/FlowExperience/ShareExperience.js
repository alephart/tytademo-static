import { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogTyta from '@/components/Dialogs';
import Link from 'next/link';

const SharedExperience = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <div className='sharedExperience'>
      <img className='logoToyota' src='/images/logo-toyota.png' alt='' />
      <div
        dangerouslySetInnerHTML={{
          __html: `
                <video class="videoGeneral" controls="" playsinline="" id="">
                    <source
                        src="/output-1.mp4"
                        type="video/mp4"
                    />
                </video>`,
        }}
      ></div>
      <div className='copyThanks'>
        <br />
        <div className='copyLunay'>¡Ya eres parte del video de LUNAY!</div>
        <span>
          Ahora descárgalo y compártelo con el mundo. Podrías ganar una charla
          online con Lunay y otros premios increíbles.
        </span>
      </div>
      <div className='sharedSocial'>
        compartir video <br />
        <div className='iconSocial'>
          <a href=''>
            <img src='/images/twitter.svg' alt='' />
          </a>
          <a href=''>
            <img src='/images/facebook.svg' alt='' />
          </a>
        </div>
      </div>
      <Link href='/start/checkVideoFinal'>
        <Button className='buttonThanks' variant='contained'>
          descargar video
        </Button>
      </Link>

      <div className="copyFooter">
          Haz <a onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">click aquí</a> para ver las reglas y condiciones.
      </div>
      <DialogTyta dialog='terms' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />

    </div>
  );
};

export default SharedExperience;
