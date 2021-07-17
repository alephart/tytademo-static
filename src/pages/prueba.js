import Layout from '@/components/layouts/StartPage';
import { LandscapeGeneral } from '@/components/Landscape';
import { isMobile } from 'react-device-detect';
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

// export const getStaticProps = async (context) => {
//   const { params, locale } = context;
//   const urlAdmin = process.env.NEXT_PUBLIC_TYTA_API;
//   const urlSite = process.env.NEXT_PUBLIC_URL_SITE;

//   // Fetch data from external API
//   // const res = await fetch(`${urlAdmin}/participant/${params.id}`);
//   // const json = await res.json();
//   // console.log(json);

//   // const pathLocale = locale === 'es' ? '/es/' : '/';
//   // const data = {
//   //   success: true,
//   //   urlVideo: json.url_video,
//   //   urlShare: `${urlSite}${pathLocale}share-experience/${params.id}`,
//   //   urlJoin: `${urlSite}${pathLocale}join-experience/${params.id}`,
//   //   userId: params.id,
//   // };

//   const data = {
//     success: true,
//     urlSite,
//     urlAdmin,
//   }

//   // Pass data to the page via props
//   return { props: { 
//     ...await serverSideTranslations(locale, ['common']),
//     data
//   }, }

// };

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Prueba;