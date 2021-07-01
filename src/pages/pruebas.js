import { useState } from 'react';
import Layout from '@/components/layouts/General';
import { Help } from '@/components/DialogsTyta';
import { Loading } from '@/components/Anims';
import { Button } from '@material-ui/core/';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MESSAGE_DIALOG } from '@/helpers/globals';

const Pruebas = () => {
  const [help, setHelp] = useState(false);

  const share = `fb://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`;

  return(
    <Layout>
      <p>Loading</p>
      <Loading />

      <p>Modal</p>

      <Button onClick={() => setHelp(!help)}>Active Modal!</Button>

      <Help isOpen={help} setIsOpen={setHelp} message={MESSAGE_DIALOG.rememberPhoto} />
      <br />
      <a href={share}>Compartir</a>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default Pruebas;