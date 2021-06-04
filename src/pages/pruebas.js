import { useState } from 'react';
import Layout from '@/components/layouts/General';
import { Help } from '@/components/DialogsTyta';
import { Loading } from '@/components/Anims';
import { Button } from '@material-ui/core/';

const Pruebas = () => {
  const [help, setHelp] = useState(false);

  return(
    <Layout>
      <p>Loading</p>
      <Loading />

      <Button onClick={() => setHelp(!help)}>Active Modal!</Button>

      <Help isOpen={help} setIsOpen={setHelp} />

    </Layout>
  )
}
export default Pruebas;