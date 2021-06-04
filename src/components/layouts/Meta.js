import Head from 'next/head';

const Meta = (props) => {
  const {
    pageTitle = 'Featuring You Lunay X Toyota',
    description = '',
    currentURL = 'https://tytademo.devmds.com/',
    previewImage = 'feature-you-toyota.png',
    siteName = 'Toyota Featuring You',
    videoName = 'featureYouToyota.mp4'
  } = props;
  return(
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description}></meta>

      {/* Twitter */}
      <meta name="twitter:card" content="summary" key="twcard" />
      {/* <meta name="twitter:creator" content={twitterHandle} key="twhandle" /> */}

      {/* Open Graph */}
      <meta property="og:url" content={currentURL} key="ogurl" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      
      <meta property="og:image" content={currentURL+previewImage} key="ogimage" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="og:video:type" content="" key="ogvideotype" />
      <meta property="og:video:width" content="1280" key="ogvideo" />
      <meta property="og:video:height" content="720" key="ogvideo" />
      <meta property="og:video" content={`${currentURL}videos/${videoName}`} key="ogvideo" />
    </Head>
  )
}

export default Meta;

