import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

const SEO = (props) => {
  console.log('props in Meta', props);
  const { t } = useTranslation('common');
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;
  const {
    pageTitle = t("meta_tags_title"),
    description = t("meta_tags_description"),
    currentURL = siteURL,
    previewImage = `${siteURL}/toyota-lunay-feature-you.png`,
    siteName = t("meta_tags_title"),
    videoPath = `${siteURL}/videos/featureYouToyota.mp4`,
  } = props;
  return(
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description}></meta>
      
      {/* Open Graph */}
      <meta property="og:url" content={currentURL} key="ogurl" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:type" content="video.movie" />
      <meta property="og:image" content={previewImage} key="ogthumb" />
      <meta property="fb:app_id" content="1421975721482769" />

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

export default SEO;