import { useState } from 'react';
import Layout from '@/components/Layout';
import DialogTyta from '@/components/Dialogs'; 

const Home = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <Layout>
      <div>Prueba!!!!</div>

      <div className="copyFooter">
          Haz <a className="" onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">click aquí</a> para ver las reglas y condiciones.
      </div>
      <DialogTyta dialog='terms' isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
    </Layout>
  )
}

export default Home;