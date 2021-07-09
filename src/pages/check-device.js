import Layout from '@/components/layouts/Desktop';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { mobileVendor, mobileModel } from 'react-device-detect';

const ToyotaExperience = () => {
  const { t } = useTranslation('common');

  console.log('mobileVendor', mobileVendor);
  console.log('mobileModel', mobileModel);
  return (
    <Layout>
        <div className='videoDesktop'>
            </div>
            <div className='copydesktop'>
            <img className='logoToyota' src='/images/logo-toyota.png' alt='' />
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
