import Head from 'next/head';

const Meta = (props) => {
  const { 
    siteURL,
    pageTitle,
    description,
    currentURL,
    previewImage,
    siteName,
    videoPath,
   } = props;
  
  return(
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description}></meta>
      <link rel="canonical" href={`${siteURL}/`} />
      <link rel="alternate" href={`${siteURL}/`} hreflang="en" />
      <link rel="alternate" href={`${siteURL}/es/`} hreflang="es" />

      {/* // Open Graph
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentURL} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:locale" content="en" />
      <meta property="og:locale:alternate" content="es" /> */}

    {/* Open Graph Video - use on video pages */}
      <meta property="og:video" content={videoPath} key="video" />
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
