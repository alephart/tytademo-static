import { useState } from 'react';
import Layout from '@/components/layouts/General';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CopyLink = () => {
  const { t } = useTranslation('common');
  const [state, setState] = useState({
    value: process.env.NEXT_PUBLIC_URL_SITE,
    copied: false,
  });

  return (
    <Layout>
      <div>
        <img className='logoToyota' src='images/logo-toyota.png' alt='' />
        {/* aqui iria el video.... pero cual video? */}
        <div className='copyJoin'>
          ve el video de tu <br />
          amigo y crea el tuyo.
          <span>
            Para participar copia el link, luego desde el menú busca la opción
            abrir desde navegador.
          </span>
        </div>
        <img className='' src='images/copyLink.png' alt='Instagram' />

        <CopyToClipboard 
          text={state.value}
          onCopy={() => setState({copied: true})}
        >
          <Button className='linkVideo' variant='contained'>
            ¡COPY LINK!
          </Button>
        </CopyToClipboard>

      </div>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default CopyLink;
