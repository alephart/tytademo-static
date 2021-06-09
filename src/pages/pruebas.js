import { useState } from 'react';
import Layout from '@/components/layouts/General';
import { Help } from '@/components/DialogsTyta';
import { Loading } from '@/components/Anims';
import { Button } from '@material-ui/core/';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Pruebas = () => {
  const [help, setHelp] = useState(false);

  return(
    <Layout>
      <p>Loading</p>
      <Loading />

      <p>Modal</p>

      <Button onClick={() => setHelp(!help)}>Active Modal!</Button>

      <Help isOpen={help} setIsOpen={setHelp} message={MESSAGE_DIALOG.rememberPhoto} />

    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default Pruebas;