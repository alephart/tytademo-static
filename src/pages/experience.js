import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layouts/StartPage';
import Button from '@material-ui/core/Button';
import FlowExperience from '';
const Experience = () => {

  return (
    <Layout>

      <Link href="/start/chooseCharacter">
          <Button className="buttonStart" variant="contained">comenzar</Button>
      </Link>

    </Layout>
  )
}

export default Experience;