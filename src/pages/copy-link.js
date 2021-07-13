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
        <span>
          Para participar puedes:<br />
          <ul>
            <li>Copia el vínculo de Lunay por Toyota.</li>
            <li>Desde el menú busca la opción abrir desde navegador.</li>
            <li> Pega el vínculo.</li>
          </ul>
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
