import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const siteURL = process.env.NEXT_PUBLIC_URL_SITE;
    const metaData = {
      pageTitle: 'Featuring You Lunay X Toyota',
      description: 'Take a selfie to be a part of LUNAY’s video and Corolla Apex',
      currentURL: siteURL,
      previewImage: `${siteURL}/toyota-lunay-feature-you.png`,
      videoPath: `${siteURL}/videos/featureYouToyota.mp4`,
    };
    return (
      <Html>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="facebook-domain-verification" content="63zvanycz01c5njw5jrt0op3hb06ij" />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href={`${siteURL}/`} />
        <link rel="alternate" href={`${siteURL}/`} hreflang="en" />
        <link rel="alternate" href={`${siteURL}/es/`} hreflang="es" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteURL} />
        <meta property="og:site_name" content={metaData.pageTitle} />
        <meta property="og:title" content={metaData.pageTitle} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.previewImage} />
        <meta property="og:locale" content="en" />
        <meta property="og:locale:alternate" content="es" />

        {/* Open Graph Video - use on video pages */}
        <meta property="og:video" content={metaData.videoPath} key="video" />
        <meta property="og:video:url" content={metaData.videoPath} />
        <meta property="og:video:secure_url" content={metaData.videoPath} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="player" />
        <meta name="twitter:site" content="@Toyota" />
        <meta name="twitter:creator" content="@Toyota" />
        <meta name="twitter:title" content={metaData.pageTitle} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:domain" content="Toyota"/>
        <meta name="twitter:image" content={metaData.previewImage} />

        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument