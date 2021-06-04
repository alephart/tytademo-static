import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const Meta = (props) => {
  const {
    pageTitle = 'Featuring You Lunay X Toyota',
    description = '',
    currentURL = 'https://tytademo.devmds.com/',
    previewImage = 'feature-you-toyota-lunay.png',
    siteName = 'Toyota Featuring You',
    videoName = 'featureYouToyota.mp4'
  } = props;
  return(
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description}></meta>

      {/* Twitter */}
      <meta name="twitter:card" content="summary" key="player" />
      <meta name="twitter:site" content="@Toyota" />
      <meta name="twitter:creator" content="@Toyota" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:domain" content="Toyota"/>
      <meta name="twitter:image" content={currentURL+previewImage} />
      
      {/* Open Graph */}
      <meta property="og:url" content={currentURL} key="ogurl" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      
      <meta property="og:type" content="video.movie" />

      <meta property="og:image:type" content="image/png" />
      <meta property="og:image" content={currentURL+previewImage} key="ogimage" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="og:video:url" content={`${currentURL}videos/${videoName}`} />
      <meta property="og:video:secure_url" content={`${currentURL}videos/${videoName}`} />
      <meta property="og:video:type" content="video/mp4" />
      <meta property="og:video:width" content="1280" />
      <meta property="og:video:height" content="720" />
    </Head>
  )
}

export default Meta;

