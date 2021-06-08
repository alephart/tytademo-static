import Layout from '@/components/layouts/Desktop';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { VideoBg } from '@/components/Anims';

const ToyotaExperience = () => {
  return (
    <Layout>
        <div className='videoDesktop'>
            <div dangerouslySetInnerHTML={VideoBg('', 'output1.mp4', true)}></div>
            </div>
            <div className='copydesktop'>
            <img className='logoToyota' src='/images/logo-toyota.png' alt='' />
            <h2>y tú, ¿ya participaste?</h2>
            <p>
                Ingresa desde tu celular, tómate la foto y se parte del video de
                Lunay
            </p>
        </div>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default ToyotaExperience;
