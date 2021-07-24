import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

const Layout = ({ children, ...props }) => {
  const { t } = useTranslation('common');
  const {
    pageTitle = t("meta_tags_title"),
  } = props;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="facebook-domain-verification" content="x7oiizt4spq3btbnsskbccxdhp6gvg" key="fbdv" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container">
        {children}
      </div>
    </>
  )
};

export default Layout;
