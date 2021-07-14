import Layout from '@/components/layouts/Desktop';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Prueba = () => {
  const { t } = useTranslation('common');
  
  return (
    <Layout>
      <div>{t("meta.tags.title")}</div>
    </Layout>

  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default Prueba;