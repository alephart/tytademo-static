import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const Meta = (props) => {
  const { t } = useTranslation('common');
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;
  const pageTitle = t("meta.tags.title");
  const description = t("meta.tags.description");
  const currentURL = siteURL;
  const previewImage = `${siteURL}/toyota-lunay-feature-you.png`;
  const siteName = t("meta.tags.title");
  const videoPath = `${siteURL}/videos/featureYouToyota.mp4`;

  return(
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description}></meta>
      <link rel="canonical" href={`${siteURL}/`} />
      <link rel="alternate" href={`${siteURL}/`} hreflang="en" />
      <link rel="alternate" href={`${siteURL}/es/`} hreflang="es" />

    {/* Open Graph Video - use on video pages */}
      <meta property="og:video" content={videoPath} />
      <meta property="og:video:url" content={videoPath} />
      <meta property="og:video:secure_url" content={videoPath} />
      <meta property="og:video:type" content="video/mp4" />
      <meta property="og:video:width" content="1280" />
      <meta property="og:video:height" content="720" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" key="player" />
      <meta name="twitter:site" content="@Toyota" />
      <meta name="twitter:creator" content="@Toyota" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:domain" content="Toyota"/>
      <meta name="twitter:image" content={previewImage} />

    </Head>
  )
}

export default Meta;
