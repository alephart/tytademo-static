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