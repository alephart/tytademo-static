import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyLink = () => {
  const { t } = useTranslation('common');
  const [state, setState] = useState({
    value: process.env.NEXT_PUBLIC_URL_SITE,
    copied: false,
  });

  return (
    <div className='copyLink'>
      <br />
      <img className='logoToyota' src='images/logo-toyota.png' alt='' />
      <div className='copyThanks'>
        <div className='copyLunay'>
          <br />
          <p>Para participar puedes:</p> <br />
          <span>Desde el menú busca la opción abrir desde navegador.</span>

          <img className='' src='images/copyLink.png' alt='Instagram' />
          <br />
          <span>Copia el vínculo de Lunay por Toyota, ve a un explorador distinto y pega el vínculo.</span>
        </div>
      </div>
        <br />
        <CopyToClipboard 
          text={state.value}
          onCopy={() => setState({copied: true})}
        >
          <Button className='linkVideo' variant='contained'>
            ¡COPIAR VINCULO!
          </Button>
        </CopyToClipboard>
        {state.copied ? (
          <div className='copyThanks'>
            <div className='copyLunay'><span>¡Vínculo copiado!.</span></div>
          </div>
        ) : (
          null
        )}
    </div>
  );
};

export default CopyLink;