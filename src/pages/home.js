import { useState } from 'react';
import Layout from '@/components/Layout';
import DialogTerms from '@/components/dialogs/Terms'; 

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  

  return (
    <Layout>
      <div>Prueba!!!!</div>

      <div className="copyFooter">
          Haz <a onClick={() => setIsOpen(!isOpen)} role="button">click aquí</a> para ver las reglas y condiciones.
      </div>
      <DialogTerms dialog='terms' isOpen={isOpen} />
    </Layout>
  )
}

export default Home;