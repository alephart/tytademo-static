import Head from 'next/head';

const SEO = (props) => {
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;
  const {
    pageTitle = 'Featuring You Lunay X Toyota',
    description = 'Take a selfie and be part of “Todo o Nada” with Lunay and the Corolla Apex.',
    currentURL = siteURL,
    previewImage = `${siteURL}/toyota-lunay-feature-you.jpg`,
    siteName = 'Featuring You Lunay X Toyota',
    videoPath,
  } = props;

  return(
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description}></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="facebook-domain-verification" content="x7oiizt4spq3btbnsskbccxdhp6gvg" key="fbdv" />
      <link rel="icon" href="/favicon.png" />
      
      {/* Open Graph */}
      <meta property="og:url" content={currentURL} key="ogurl" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:type" content={!!videoPath ? "video.other" : "website"} />
      <meta property="og:image" content={previewImage} key="ogthumb" />
      <meta property="fb:app_id" content="1421975721482769" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" key="player" />
      <meta name="twitter:site" content="@Toyota" />
      <meta name="twitter:creator" content="@Toyota" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:domain" content="Toyota"/>
      <meta name="twitter:image" content={previewImage} />

      {/* Open Graph Video - use on video pages */}
      {!!videoPath && <meta property="og:video" content={videoPath} />}
      {!!videoPath && <meta property="og:video:url" content={videoPath} />}
      {!!videoPath && <meta property="og:video:secure_url" content={videoPath} />}
      {!!videoPath && <meta property="og:video:type" content="video/mp4" />}
      {!!videoPath && <meta property="og:video:width" content="1280" />}
      {!!videoPath && <meta property="og:video:height" content="720" />}

    </Head>
  )
}

export default SEO;